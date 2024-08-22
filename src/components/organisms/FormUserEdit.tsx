import * as AutoKana from 'vanilla-autokana'
import React, { useEffect, useState } from 'react'
import { useForm, useFormContext, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const kana = /^[\u30A0-\u30FF\uFF66-\uFF9F]+$/
let autokanaFamilyName: AutoKana.AutoKana
let autokanaGivenName: AutoKana.AutoKana

const schema = z.object({
  familyName: z.string().min(1, { message: 'お名前を入力してください。' }),
  givenName: z.string().min(1, { message: 'お名前を入力してください。' }),
  familyNameKana: z.string().min(1, { message: 'フリガナを入力してください。' }).regex(kana, { message: 'カタカナで入力してください。' }),
  givenNameKana: z.string().min(1, { message: 'フリガナを入力してください。' }).regex(kana, { message: 'カタカナで入力してください。' }),
  email: z.string().min(1, { message: 'メールアドレスを入力してください。' }).email({ message: 'メールアドレスの形式で入力してください。' }),
})
type FormUserEditDataType = z.infer<typeof schema>

export default function FormUserEdit() {
  const methods = useForm<FormUserEditDataType>({ mode: 'onChange', resolver: zodResolver(schema) })
  const [isConfirming, setIsConfirming] = useState(false)

  const onSubmit = async (data: FormUserEditDataType) => {
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
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(formDataObj),
        })

        if (!res.ok) {
          console.error('サーバーエラー')
        } else {
          console.log('お客様情報の更新が正常に完了しました')
        }
      } catch (error) {
        console.error('通信に失敗しました', error)
      }
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {!isConfirming ? <FormUserEditInput /> : <FormUserEditConfirm setIsConfirming={setIsConfirming} />}</form>
    </FormProvider>
  )
}

const FormUserEditInput = () => {
  const {
    register,
    setValue,
    formState: { errors, isSubmitting, isValid },
    reset
  } = useFormContext()
  const [user, setUser] = useState<FormUserEditDataType>()

  // ユーザー情報 取得
  const getUser = async () => {
    try {
      const res = await fetch(`${import.meta.env.PUBLIC_API_BASE_URL}/users/me/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      const data = await res.json()
      setUser(data)
    } catch (error) {
    }
  }

  useEffect(() => {
    autokanaFamilyName = AutoKana.bind('#family-name', '#family-name-kana', { katakana: true })
    autokanaGivenName = AutoKana.bind('#given-name', '#given-name-kana', { katakana: true })
    getUser()
  }, [])

  useEffect(() => {
    reset(user)
  }, [reset, user])

  const handleFamilyNameInput = () => {
    setValue('familyNameKana', autokanaFamilyName.getFurigana())
  }
  const handleGivenNameInput = () => {
    setValue('givenNameKana', autokanaGivenName.getFurigana())
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label htmlFor="family-name" className="label-text">
          お名前
        </label>
        <div className="flex flex-col gap-4 md:flex-row">
          <FieldHasIcon name="familyName">
            <input {...register('familyName')} onInput={handleFamilyNameInput} id="family-name" className="input input-bordered w-full" autoComplete="family-name" placeholder="姓" />
          </FieldHasIcon>
          <FieldHasIcon name="givenName">
            <input {...register('givenName')} onInput={handleGivenNameInput} id="given-name" className="input input-bordered w-full" autoComplete="given-name" placeholder="名" />
          </FieldHasIcon>
        </div>
        {(errors.familyName || errors.givenName) && <p className="text-error">{(errors.familyName as any)?.message ?? (errors.givenName as any)?.message}</p>}
      </div>

      <div>
        <label htmlFor="family-name-kana" className="label-text">
          フリガナ
        </label>
        <div className="flex flex-col gap-4 md:flex-row">
          <FieldHasIcon name="familyNameKana">
            <input {...register('familyNameKana')} id="family-name-kana" className="input input-bordered w-full" placeholder="セイ" />
          </FieldHasIcon>
          <FieldHasIcon name="givenNameKana">
            <input {...register('givenNameKana')} id="given-name-kana" className="input input-bordered w-full" placeholder="メイ" />
          </FieldHasIcon>
        </div>
        {(errors.familyNameKana || errors.givenNameKana) && <p className="text-error">{(errors.familyNameKana as any)?.message ?? (errors.givenNameKana as any)?.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="label-text">
          メールアドレス
        </label>
        <FieldHasIcon name="email">
          <input {...register('email')} id="email" className="input input-bordered w-full pr-14" autoComplete="email" type="email" placeholder="example@studio-firefly.co.jp" />
        </FieldHasIcon>
        {errors.email && <p className="text-error">{(errors.email as any).message}</p>}
      </div>

      <button type="submit" className={`btn btn-primary ${!isValid || isSubmitting ? 'btn-disabled' : ''}`} aria-disabled={!isValid || isSubmitting}>
        入力内容の確認
      </button>
    </div>
  )
}

const FormUserEditConfirm = ({ setIsConfirming }: any) => {
  const { getValues } = useFormContext()
  const values = getValues()

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="label-text">お名前</p>
        <p>
          {values.familyName}({values.familyNameKana}) {values.givenName}({values.givenNameKana})
        </p>
      </div>

      <div>
        <p className="label-text">メールアドレス</p>
        <p>{values.email}</p>
      </div>

      <button type="button" className="btn" onClick={() => setIsConfirming(false)}>
        入力内容の修正
      </button>
      <button type="submit" className="btn btn-accent">
        お客様情報を更新
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
