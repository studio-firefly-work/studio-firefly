export type SiteData = {
  name: string
  postalCode: string
  address: string
  tel: string
  fax?: string
  copy: string
}

export const siteDatas: SiteData = {
  name: 'スタジオfirefly',
  postalCode: '000-0000',
  address: '住所',
  tel: '090-0000-0000',
  copy: 'copy',
}

export function getSiteDataAll() {
  return siteDatas
}
