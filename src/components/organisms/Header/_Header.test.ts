import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { test } from 'vitest'
import Header from './Header.astro'


test('Card with slots', async () => {
  const container = await AstroContainer.create();
  await container.renderToString(Header)
})