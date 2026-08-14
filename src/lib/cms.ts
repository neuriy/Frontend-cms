const CMS_URL = 'http://localhost:3001'

export async function fetchCMS<T>(path: string, options: RequestInit = {}): Promise<T | null> {
  try {
    const res = await fetch(`${CMS_URL}/api${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      next: { revalidate: 60 }, // Cache for 1 minute
    })

    if (!res.ok) {
      console.error(`CMS fetch failed for ${path}: ${res.statusText}`)
      return null
    }

    const json = await res.json()
    return json as T
  } catch (err) {
    console.error(`CMS fetch error for ${path}:`, err)
    return null
  }
}

export interface CMSLink {
  label: string
  url: string
}

export interface CMSFooterGroup {
  label: string
  links: CMSLink[]
}

export interface CMSFooter {
  groups: CMSFooterGroup[]
}

export interface CMSPost {
  title: string
  slug: string
  author: string
  publishedDate: string
  category: 'research' | 'business'
  styling?: {
    accentColor?: string
    logoText?: string
    cardType?: 'gradient' | 'solid' | 'image-overlay'
  }
  content: any
}

export async function getCMSFooter() {
  const data = await fetchCMS<CMSFooter>('/globals/footer')
  return data
}

export async function getCMSPosts(limit: number = 3, category?: string) {
  const url = `/posts?limit=${limit}&sort=-publishedDate${category ? `&where[category][equals]=${category}` : ''}`
  const data = await fetchCMS<{ docs: CMSPost[] }>(url)
  return data?.docs || []
}
