import { mutationGeneric as mutation, queryGeneric as query } from 'convex/server'
import { v } from 'convex/values'

const editableDetailsValidator = v.object({
  date: v.optional(v.string()),
  contact1: v.string(),
  contact1Phone: v.string(),
  contact2: v.string(),
  contact2Phone: v.string(),
  hostName: v.string(),
  docsLink: v.optional(v.string()),
  address: v.string(),
  mapLink: v.string(),
})

type ProjectDetailsRecord = {
  date?: string
  contact1: string
  contact1Phone: string
  contact2: string
  contact2Phone: string
  hostName: string
  docsLink?: string
  address: string
  mapLink: string
  imageUrls: string[]
  imageStorageIds?: string[]
}

type StorageUrlReader = {
  storage: {
    getUrl(storageId: string): Promise<string | null>
  }
}

async function hydrateProject<T extends {
  details?: ProjectDetailsRecord
}>(ctx: StorageUrlReader, project: T) {
  const legacyImages = project.details?.imageUrls ?? []
  const storageIds = project.details?.imageStorageIds ?? []
  const uploadedImages = await Promise.all(
    storageIds.map(async (storageId) => {
      const url = await ctx.storage.getUrl(storageId)
      return url ? { url, storageId } : null
    }),
  )

  return {
    ...project,
    details: {
      date: project.details?.date,
      contact1: project.details?.contact1 ?? '',
      contact1Phone: project.details?.contact1Phone ?? '',
      contact2: project.details?.contact2 ?? '',
      contact2Phone: project.details?.contact2Phone ?? '',
      hostName: project.details?.hostName ?? '',
      docsLink: project.details?.docsLink,
      address: project.details?.address ?? '',
      mapLink: project.details?.mapLink ?? '',
      images: [
        ...legacyImages.map((url) => ({ url })),
        ...uploadedImages.filter((image) => image !== null),
      ],
    },
  }
}

export const listProjects = query({
  args: {},
  handler: async (ctx) => {
    const projects = await ctx.db.query('eventOpsProjects').withIndex('by_created_at').collect()
    const hydrated = await Promise.all(projects.map((project) => hydrateProject(ctx, project)))
    return hydrated.sort((a, b) => a.name.localeCompare(b.name))
  },
})

export const getProject = query({
  args: {
    projectId: v.id('eventOpsProjects'),
  },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.projectId)
    if (!project) {
      return null
    }

    return await hydrateProject(ctx, project)
  },
})

export const createProject = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const name = args.name.trim()
    if (!name) {
      throw new Error('Project name is required.')
    }

    const existing = await ctx.db
      .query('eventOpsProjects')
      .withIndex('by_name', (q) => q.eq('name', name))
      .first()

    if (existing) {
      return existing._id
    }

    const now = Date.now()
    return await ctx.db.insert('eventOpsProjects', {
      name,
      checked: {},
      values: {},
      details: {
        date: '',
        contact1: '',
        contact1Phone: '',
        contact2: '',
        contact2Phone: '',
        hostName: '',
        docsLink: '',
        address: '',
        mapLink: '',
        imageUrls: [],
        imageStorageIds: [],
      },
      createdAt: now,
      updatedAt: now,
    })
  },
})

export const deleteProject = mutation({
  args: {
    projectId: v.id('eventOpsProjects'),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.projectId)
    return null
  },
})

export const toggleItem = mutation({
  args: {
    projectId: v.id('eventOpsProjects'),
    itemId: v.string(),
  },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.projectId)
    if (!project) {
      throw new Error('Project not found.')
    }

    await ctx.db.patch(args.projectId, {
      checked: {
        ...project.checked,
        [args.itemId]: !project.checked[args.itemId],
      },
      updatedAt: Date.now(),
    })

    return null
  },
})

export const setValue = mutation({
  args: {
    projectId: v.id('eventOpsProjects'),
    itemId: v.string(),
    value: v.string(),
  },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.projectId)
    if (!project) {
      throw new Error('Project not found.')
    }

    await ctx.db.patch(args.projectId, {
      values: {
        ...project.values,
        [args.itemId]: args.value,
      },
      updatedAt: Date.now(),
    })

    return null
  },
})

export const setDetails = mutation({
  args: {
    projectId: v.id('eventOpsProjects'),
    details: editableDetailsValidator,
  },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.projectId)
    if (!project) {
      throw new Error('Project not found.')
    }

    await ctx.db.patch(args.projectId, {
      details: {
        ...project.details,
        ...args.details,
      },
      updatedAt: Date.now(),
    })

    return null
  },
})

export const generateImageUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl()
  },
})

export const addUploadedImage = mutation({
  args: {
    projectId: v.id('eventOpsProjects'),
    storageId: v.id('_storage'),
  },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.projectId)
    if (!project) {
      throw new Error('Project not found.')
    }

    await ctx.db.patch(args.projectId, {
      details: {
        ...project.details,
        imageStorageIds: [...(project.details.imageStorageIds ?? []), args.storageId],
      },
      updatedAt: Date.now(),
    })

    return null
  },
})

export const removeImage = mutation({
  args: {
    projectId: v.id('eventOpsProjects'),
    storageId: v.optional(v.id('_storage')),
    legacyUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.projectId)
    if (!project) {
      throw new Error('Project not found.')
    }

    if (args.storageId) {
      await ctx.storage.delete(args.storageId)
      await ctx.db.patch(args.projectId, {
        details: {
          ...project.details,
          imageStorageIds: (project.details.imageStorageIds ?? []).filter((storageId) => storageId !== args.storageId),
        },
        updatedAt: Date.now(),
      })
      return null
    }

    if (typeof args.legacyUrl === 'string') {
      await ctx.db.patch(args.projectId, {
        details: {
          ...project.details,
          imageUrls: project.details.imageUrls.filter((url) => url !== args.legacyUrl),
        },
        updatedAt: Date.now(),
      })
      return null
    }

    throw new Error('Image reference is required.')
  },
})

export const repairMissingDetails = mutation({
  args: {},
  handler: async (ctx) => {
    const projects = await ctx.db.query('eventOpsProjects').withIndex('by_created_at').collect()
    let repaired = 0

    for (const project of projects) {
      if (project.details) continue

      const inferredDate = project.name.match(/^\d{4}-\d{2}-\d{2}/)?.[0] ?? ''
      const inferredHostName = project.name.replace(/^\d{4}-\d{2}-\d{2}\s*-\s*/, '')

      await ctx.db.patch(project._id, {
        details: {
          date: inferredDate,
          contact1: '',
          contact1Phone: '',
          contact2: '',
          contact2Phone: '',
          hostName: inferredHostName,
          docsLink: '',
          address: '',
          mapLink: '',
          imageUrls: [],
          imageStorageIds: [],
        },
        updatedAt: Date.now(),
      })
      repaired += 1
    }

    return { repaired }
  },
})
