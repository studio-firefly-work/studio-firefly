/**
 * 電話番号から記号を取り除く
 * @param telNumber 電話番号
 * @returns 記号を取り除いた電話番号
 */
export function normalizeTelNumber(telNumber: string): string {
  // 数字と記号以外の文字が含まれているかチェック
  if (!/^[\d()-]+$/.test(telNumber)) {
    throw new Error('Invalid tel number format. Only digits, hyphens, and parentheses are allowed.')
  }

  // 電話番号から数字以外の文字を取り除く
  const normalizedTelNumber = telNumber.replace(/\D/g, '')

  return normalizedTelNumber
}
