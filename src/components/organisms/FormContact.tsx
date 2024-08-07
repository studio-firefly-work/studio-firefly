import React, { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import FormContactInput from '@/components/organisms/FormContactInput'
import FormContactConfirm from '@/components/organisms/FormContactConfirm'

const kana = /^[\u30A0-\u30FF\uFF66-\uFF9F]+$/
const schema = z.object({
  familyName: z
    .string()
    .min(1, { message: '入力してください。' }),
  givenName: z
    .string()
    .min(1, { message: '入力してください。' }),
  familyNameKana: z
    .string()
    .min(1, { message: '入力してください。' })
    .regex(kana, { message: 'カタカナで入力してください。' }),
  givenNameKana: z
    .string()
    .min(1, { message: '入力してください。' })
    .regex(kana, { message: 'カタカナで入力してください。' }),
  email: z
    .string()
    .min(1, { message: '入力してください。' })
    .email({ message: 'メールアドレスの形式で入力してください。' }),
  message: z
    .string()
    .min(1, { message: '入力してください。' })
})
type FormContactDataType = z.infer<typeof schema>

export default function FormContact() {
  const methods = useForm<FormContactDataType>({ mode: 'onChange', resolver: zodResolver(schema) })
  const [isConfirming, setIsConfirming] = useState(false)

  const onSubmit = (data: FormContactDataType) => {
    if (!isConfirming) {
      // 入力画面から確認画面へ
      setIsConfirming(true)

    } else {
      // 確認画面から送信
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value)
      })
      const formDataObj = Object.fromEntries(formData.entries())
      console.log(formDataObj)

      //   try {
      //     const res = await fetch(`${import.meta.env.PUBLIC_API}/mail/send`, {
      //       method: 'POST',
      //       headers: {
      //         'Content-Type': 'application/json',
      //       },
      //       body: JSON.stringify(formDataObj),
      //     })

      //     if (!res.ok) {
      //       console.error('サーバーエラー')
      //     }
      //     console.log('登録が正常に完了しました')
      //   }
      //   catch (error) {
      //     console.error('通信に失敗しました', error)
      //   }
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {!isConfirming ? (
          <FormContactInput />
        ) : (
          <FormContactConfirm setIsConfirming={setIsConfirming} />
        )}
      </form>
    </FormProvider>
  )
}
