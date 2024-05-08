export type PageData = {
  url: string;
  title: string;
  description: string;
  keyword: string;
  noindex?: boolean;
}

export const pageDatas: PageData[] = [
  {
    url: '/',
    title: 'Home',
    description: 'description test',
    keyword: 'keyword test',
  },
  {
    url: '/about',
    title: 'About',
    description: 'description test',
    keyword: 'keyword test',
  },
  {
    url: '/skill',
    title: 'Skill',
    description: 'description test',
    keyword: 'keyword test',
  },
  {
    url: '/works',
    title: 'Works',
    description: 'description test',
    keyword: 'keyword test',
  },
  {
    url: '/contact',
    title: 'Contact',
    description: 'description test',
    keyword: 'keyword test',
  },
  {
    url: '/thanks',
    title: 'Thanks',
    description: 'description test',
    keyword: 'keyword test',
    noindex: true,
  },
]

export function getPageDatasAll() {
  return pageDatas;
}

export function getPageDatasExceptNoindex() {
  return pageDatas.filter(page => !page.noindex);
}

export function getPageDataByUrl(url: string) {
  const pageData = pageDatas.find((page) => page.url === url);
  if (pageData === undefined) {
    throw new Error();
  }
  return pageData;
}
