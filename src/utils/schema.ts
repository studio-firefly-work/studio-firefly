import { z } from 'zod'

const kana = /^[\u30A0-\u30FF\uFF66-\uFF9F]+$/

export const schema = {
  name: z.string().min(1, { message: 'お名前を入力してください。' }),
  kana: z.string().min(1, { message: 'フリガナを入力してください。' }).regex(kana, { message: 'カタカナで入力してください。' }),
  email: z.string().min(1, { message: 'メールアドレスを入力してください。' }).email({ message: 'メールアドレスの形式で入力してください。' }),
  message: z.string().min(1, { message: 'お問い合わせ内容を入力してください。' }),
  password: z.string().min(1, { message: 'パスワードを入力してください。' }),
  privacy: z.boolean().refine((val) => val === true, { message: 'プライバシーポリシーに同意いただく必要があります。' }),
}
