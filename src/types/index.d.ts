declare namespace Theme {
  namespace Page {
    interface Config {
      title: string
      description: string
      permalink: string
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
        link?: Partial<Link>[]
        meta?: Partial<Meta>[]
      }
      schemaOrg?: Array[]
    }

    interface Link extends Omit<HTMLLinkElement, 'sizes'> {
      prefetch: boolean;
      crossorigin: string;
      sizes: string;
    }

    interface Meta extends HTMLMetaElement {
      property: string;
    }
  }
}