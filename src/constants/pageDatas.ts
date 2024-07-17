export type PageData = {
  permalink: string
  title: Title
  description: string
  keyword: string
  noindex?: boolean
}

export type Title = {
  jp: string
  en: string
}

export const pageDatas: PageData[] = [
  {
    permalink: '/',
    title: { jp: 'ホーム', en: 'Home' },
    description: 'description test',
    keyword: 'keyword test',
  },
  {
    permalink: '/profile',
    title: { jp: '自己紹介', en: 'Profile' },
    description: 'description test',
    keyword: 'keyword test',
  },
  {
    permalink: '/skill',
    title: { jp: '技術', en: 'Skill' },
    description: 'description test',
    keyword: 'keyword test',
  },
  {
    permalink: '/works',
    title: { jp: '制作実績', en: 'Works' },
    description: 'description test',
    keyword: 'keyword test',
  },
  {
    permalink: '/contact',
    title: { jp: 'お問い合わせ', en: 'Contact' },
    description: 'description test',
    keyword: 'keyword test',
  },
  {
    permalink: '/thanks',
    title: { jp: '', en: 'Thanks' },
    description: 'description test',
    keyword: 'keyword test',
    noindex: true,
  },
  {
    permalink: '/test',
    title: { jp: 'テスト', en: 'Test' },
    description: 'description test',
    keyword: 'keyword test'
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
