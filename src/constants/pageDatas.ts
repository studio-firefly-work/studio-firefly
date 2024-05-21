export type PageData = {
  permalink: string
  title: string
  description: string
  keyword: string
  noindex?: boolean
}

export const pageDatas: PageData[] = [
  {
    permalink: '/',
    title: 'Home',
    description: 'description test',
    keyword: 'keyword test',
  },
  {
    permalink: '/about',
    title: 'About',
    description: 'description test',
    keyword: 'keyword test',
  },
  {
    permalink: '/skill',
    title: 'Skill',
    description: 'description test',
    keyword: 'keyword test',
  },
  {
    permalink: '/works',
    title: 'Works',
    description: 'description test',
    keyword: 'keyword test',
  },
  {
    permalink: '/contact',
    title: 'Contact',
    description: 'description test',
    keyword: 'keyword test',
  },
  {
    permalink: '/thanks',
    title: 'Thanks',
    description: 'description test',
    keyword: 'keyword test',
    noindex: true,
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
