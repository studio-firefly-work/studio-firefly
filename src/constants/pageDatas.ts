export type PageData = {
  permalink: string
  title: Title
  description: string
  type: string
  noindex?: boolean
}

export type Title = {
  jp: string | null
  en: string | null
}

export const pageDatas: PageData[] = [
  {
    permalink: '/',
    title: { jp: '', en: '' },
    type: "website",
    description: 'description test',
  },
  {
    permalink: '/profile',
    title: { jp: '自己紹介', en: 'Profile' },
    type: "article",
    description: 'description test',
  },
  {
    permalink: '/skill',
    title: { jp: '技術', en: 'Skill' },
    type: "article",
    description: 'description test',
  },
  {
    permalink: '/works',
    title: { jp: '制作実績', en: 'Works' },
    type: "article",
    description: 'description test',
  },
  {
    permalink: '/contact',
    title: { jp: 'お問い合わせ', en: 'Contact' },
    type: "article",
    description: 'description test',
  },
  {
    permalink: '/thanks',
    title: { jp: '', en: 'Thanks' },
    type: "article",
    description: 'description test',
    noindex: true,
  },
  {
    permalink: '/styleguide',
    title: { jp: 'スタイルガイド', en: 'Style Guide' },
    type: "article",
    description: 'description test',
  },
]

export function getPageDatasAll() {
  return pageDatas
}

export function exceptNoindex(pageDatas: PageData[]) {
  return pageDatas.filter((page) => !page.noindex)
}

export function exceptHome(pageDatas: PageData[]) {
  return pageDatas.filter((page) => page.permalink !== '/')
}

export function getPageDataByPermalink(permalink: string) {
  const pageData = pageDatas.find((page) => page.permalink === permalink)
  if (pageData === undefined) {
    throw new Error()
  }
  return pageData
}
