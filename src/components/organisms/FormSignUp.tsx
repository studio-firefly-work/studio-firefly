import React, { useState } from 'react'
import { useForm, useFormContext, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  email: z.string().min(1, { message: 'メールアドレスを入力してください。' }).email({ message: 'メールアドレスの形式で入力してください。' }),
  password: z.string().min(1, { message: 'パスワードを入力してください。' }),
})
type FormSignUpDataType = z.infer<typeof schema>

export default function FormSignUp() {
  const methods = useForm<FormSignUpDataType>({ mode: 'onChange', resolver: zodResolver(schema) })
  const [isConfirming, setIsConfirming] = useState(false)

  const onSubmit = async (data: FormSignUpDataType) => {
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

      try {
        const res = await fetch(`${import.meta.env.PUBLIC_API_BASE_URL}/users/me/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formDataObj),
        })

        if (!res.ok) {
          console.error('サーバーエラー')
        } else {
          console.log('新規登録が正常に完了しました')
        }
      } catch (error) {
        console.error('通信に失敗しました', error)
      }
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{!isConfirming ? <FormSignUpInput /> : <FormSignUpConfirm setIsConfirming={setIsConfirming} />}</form>
    </FormProvider>
  )
}

const FormSignUpInput = () => {
  const {
    register,
    formState: { errors, isSubmitting, isValid },
  } = useFormContext()

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label htmlFor="email-sign-up" className="label-text">
          メールアドレス
        </label>
        <FieldHasIcon name="email-sign-up">
          <input {...register('email')} id="email-sign-up" className="input input-bordered w-full pr-14" autoComplete="email" type="email" placeholder="example@studio-firefly.co.jp" />
        </FieldHasIcon>
        {errors.email && <p className="text-error">{(errors.email as any).message}</p>}
      </div>

      <div>
        <label htmlFor="password-sign-up" className="label-text">
          パスワード
        </label>
        <FieldHasIcon name="password-sign-up">
          <input {...register('password')} id="password-sign-up" className="input input-bordered w-full pr-14" autoComplete="current-password" type="password" />
        </FieldHasIcon>
        {errors.password && <p className="text-error">{(errors.password as any).message}</p>}
      </div>

      <button type="submit" className={`btn btn-primary ${!isValid || isSubmitting ? 'btn-disabled' : ''}`} aria-disabled={!isValid || isSubmitting}>
        入力内容の確認
      </button>
    </div>
  )
}

const FormSignUpConfirm = ({ setIsConfirming }) => {
  const { getValues } = useFormContext()
  const values = getValues()

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="label-text">メールアドレス</p>
        <p>{values.email}</p>
      </div>

      <div>
        <p className="label-text">パスワード</p>
        <p>{values.password}</p>
      </div>

      <button type="button" className="btn" onClick={() => setIsConfirming(false)}>
        入力内容の修正
      </button>
      <button type="submit" className="btn btn-accent">
        新規登録
      </button>
    </div>
  )
}

const FieldHasIcon = ({ name, children }: any) => {
  const {
    watch,
    formState: { errors },
  } = useFormContext()
  const text = watch(name)

  return (
    <div className="relative flex-1">
      {children}
      {(() => {
        if (errors[name]?.message) {
          // ×アイコン
          return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute right-4 top-2/4 size-6 -translate-y-1/2 transform text-error">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          )
        } else if (text) {
          // ✓アイコン
          return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute right-4 top-2/4 size-6 -translate-y-1/2 transform text-success">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          )
        }
      })()}
    </div>
  )
}
