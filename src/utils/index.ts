import { schema } from '@/utils/schema'

/**
 * 指定されたパスに基づいて/src/assets/iamges/フォルダ内の画像を取得する関数
 * @param {string} path - /src/assets/iamges/以降の画像のパス
 * @returns {Promise<ImageMetadata>} - 画像のメタデータを含むPromise
 * @throws {Error} - 指定されたパスの画像が存在しない場合にエラーを投げる
 */
export const getAssetsImage = (path: string): Promise<{ default: ImageMetadata; }> => {
  const images = import.meta.glob<{ default: ImageMetadata }>('/src/assets/images/**/*.{jpeg,jpg,png,gif}')
  const fullPath = `/src/assets/images/${path}`
  if (!images[fullPath]) {
    throw new Error(`"${fullPath}" does not exist in glob: "/src/assets/images/**/*.{jpeg,jpg,png,gif}"`)
  }
  return images[fullPath]()
}

/**
 * yyyy-mm-dd形式の日付をyyyy年mm月dd日形式に変換する関数
 * @param {string} dateString - 変換する日付の文字列（yyyy-mm-dd形式）
 * @returns {string} - 変換後の日付（yyyy年mm月dd日形式）
 */
export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', };
  return new Date(dateString).toLocaleDateString('ja-JP', options)
}

export const utils = {
  getAssetsImage,
  formatDate,
  schema,
}
