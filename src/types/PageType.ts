export type PageType = {
  title: string
  description: string
  canonical: string
  type: string
  noindex?: boolean
  structuredDatas?: StructuredDataType[]
}

export type StructuredDataType = {
  '@context': string
  '@type': string
  [key: string]: any
}
