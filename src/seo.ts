import { useEffect } from 'react'

const SITE_URL = 'https://www.artofwoo.org'
const DEFAULT_IMAGE = `${SITE_URL}/images/church-of-woo-notel-event.jpg`

type SeoConfig = {
  title: string
  description: string
  canonicalPath: string
  image?: string
  robots?: string
  type?: 'website' | 'article'
  schema?: Record<string, unknown> | Array<Record<string, unknown>>
}

function absoluteUrl(path: string) {
  return path.startsWith('http') ? path : `${SITE_URL}${path}`
}

function upsertMeta(
  attribute: 'name' | 'property',
  value: string,
  content: string,
) {
  let tag = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${value}"]`,
  )

  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, value)
    document.head.appendChild(tag)
  }

  tag.setAttribute('content', content)
}

function upsertCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')

  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }

  link.setAttribute('href', href)
}

function upsertSchema(schema: SeoConfig['schema']) {
  const id = 'page-seo-schema'
  const existing = document.getElementById(id)

  if (!schema) {
    existing?.remove()
    return
  }

  const script = existing ?? document.createElement('script')
  script.id = id
  script.setAttribute('type', 'application/ld+json')
  script.textContent = JSON.stringify(schema)

  if (!existing) {
    document.head.appendChild(script)
  }
}

export function useDocumentSeo({
  title,
  description,
  canonicalPath,
  image = DEFAULT_IMAGE,
  robots = 'index, follow',
  type = 'website',
  schema,
}: SeoConfig) {
  useEffect(() => {
    const canonicalUrl = absoluteUrl(canonicalPath)
    const imageUrl = absoluteUrl(image)

    document.title = title

    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', robots)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:url', canonicalUrl)
    upsertMeta('property', 'og:image', imageUrl)
    upsertMeta('property', 'og:image:alt', title)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', imageUrl)

    upsertCanonical(canonicalUrl)
    upsertSchema(schema)
  }, [canonicalPath, description, image, robots, schema, title, type])
}
