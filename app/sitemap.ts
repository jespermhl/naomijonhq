import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://naomijonhq.com'

  const routes = [
    '/strawberry',
    '/strawberry-album',
    '/strawberry-tour',
    '/newsletter',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  return routes
}
