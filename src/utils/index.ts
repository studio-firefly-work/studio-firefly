import { schema } from '@/utils/schema'

export const getAssetsImage = (path: string) => {
  const images = import.meta.glob<{ default: ImageMetadata }>('/src/assets/images/**/*.{jpeg,jpg,png,gif}');
  const fullPath = `/src/assets/images/${path}`
  if (!images[fullPath]) {
    throw new Error(`"${fullPath}" does not exist in glob: "/src/assets/images/**/*.{jpeg,jpg,png,gif}"`);
  }
  return images[fullPath]()
}

export const utils = {
  getAssetsImage,
  schema,
}
