import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  eventOpsProjects: defineTable({
    name: v.string(),
    checked: v.record(v.string(), v.boolean()),
    values: v.record(v.string(), v.string()),
    details: v.object({
      date: v.optional(v.string()),
      contact1: v.string(),
      contact1Phone: v.string(),
      contact2: v.string(),
      contact2Phone: v.string(),
      hostName: v.string(),
      docsLink: v.optional(v.string()),
      address: v.string(),
      mapLink: v.string(),
      imageUrls: v.array(v.string()),
      imageStorageIds: v.optional(v.array(v.id("_storage"))),
    }),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_name', ['name'])
    .index('by_created_at', ['createdAt']),
})
