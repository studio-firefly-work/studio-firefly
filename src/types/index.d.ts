declare namespace Theme {
  type SEO = {
    title?: string
    description: string
    permalink?: (string | number)[]
    breadcrumb?: Breadcrumb
    noindex?: boolean
    nofollow?: boolean
    type?: string
    image?: string
    alt?: string
    article?: {
      publishedTime?: string
      modifiedTime?: string
      expirationTime?: string
      authors?: string[]
      section?: string
      tags?: string[]
    }
    twitter?: {
      card?: TwitterCardType
      site?: string
      creator?: string
    }
    extend?: {
      link?: Partial<HeadLink>[]
      meta?: Partial<HeadMeta>[]
    }
    schemaOrg?: Array[]
  }

  type Breadcrumb = {
    [key: string]: string
  }

  interface HeadLink extends Omit<HTMLLinkElement, 'sizes'> {
    prefetch: boolean
    crossorigin: string
    sizes: string
  }

  interface HeadMeta extends HTMLMetaElement {
    property: string
  }

  type Link = {
    title: string
    icon: string
    permalink: string
  }

  type Frontmatter = {
    slug: string
    title: string
    description: string
    category: string
    image: { src: string; alt: string }
    date: string
  }
}

interface ViewTransition {
  ready: Promise<void>
  finished: Promise<void>
  updateCallbackDone: Promise<void>
  skipTransition: () => undefined
}

interface Document {
  startViewTransition?: (skipTransition) => ViewTransition
}

interface CSSStyleDeclaration {
  viewTransitionName?: string
}
