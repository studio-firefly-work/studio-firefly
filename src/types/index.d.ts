declare namespace Theme {
  type SEO = {
    title?: string
    description: string
    ogtype: string
    itemtype: string
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
    membersonly?: boolean
  }

  type FormFieldLabel = {
    text: string
    required: boolean
  }

  type FormFieldValidation = {
    pattern: RegExp | string
    text: string
  }

  type FormField = {
    label: FormFieldLabel | null
    id: string
    type: string
    placeholder?: string
    autocomplete?: string
    icon?: string
    items?: string[]
    validations?: FormFieldValidation[]
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
