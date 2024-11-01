import Header, { links } from './Header.astro'
import Icons from '@/assets/images/common/icons.svg?raw'

describe('Header Component', () => {
  it('アイコンがicons.svgのsymbolに存在するか確認', () => {
    links.forEach(link => {
      const iconSymbolExists = Icons.includes(`<symbol id="${link.icon}">`)
      expect(iconSymbolExists, `アイコン "${link.icon}" がSVGに存在しません`).toBe(true)
    })
  })
})
