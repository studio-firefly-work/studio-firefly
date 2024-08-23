import React, { useEffect, useState } from 'react'
import * as AutoKana from 'vanilla-autokana'
import { useForm, useFormContext, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { utils } from '@/utils'
import { FormField, FieldInput } from '@/components/molecules/FormField'

let autokanaFamilyName: AutoKana.AutoKana
let autokanaGivenName: AutoKana.AutoKana
const signUpSchema = utils.schema.pick({
  familyName: true,
  givenName: true,
  familyNameKana: true,
  givenNameKana: true,
  email: true,
  password: true
})
type FormSignUpDataType = z.infer<typeof signUpSchema>

export const FormSignUp = () => {
  const methods = useForm<FormSignUpDataType>({ mode: 'onChange', resolver: zodResolver(signUpSchema) })
  const [formStatus, setFormStatus] = useState<'edit' | 'confirm' | 'complete'>('edit')

  // 新規ユーザーを作成
  const createUser = async (data: FormSignUpDataType) => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })
    const formDataObj = Object.fromEntries(formData.entries())
    console.log(formDataObj)

    try {
      const res = await fetch(`${import.meta.env.PUBLIC_API_BASE_URL}/users/`, {
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

      return res
    } catch (error) {
      console.error('通信に失敗しました', error)
    }
  }

  const onSubmit = async (data: FormSignUpDataType) => {
    if (formStatus == 'edit') {
      // 入力画面から確認画面へ
      setFormStatus('confirm')
    } else if (formStatus == 'confirm') {
      // 確認画面から送信
      const res = await createUser(data)
      if (res?.ok) {
        // 成功したら完了画面へ
        setFormStatus('complete')
      }
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {formStatus === 'edit' && <FormSignUpEdit />}
        {formStatus === 'confirm' && <FormSignUpConfirm setFormStatus={setFormStatus} />}
        {formStatus === 'complete' && <FormSignUpComplete />}
      </form>
    </FormProvider>
  )
}

const FormSignUpEdit = () => {
  const { setValue, formState: { errors, isSubmitting, isValid } } = useFormContext()

  useEffect(() => {
    autokanaFamilyName = AutoKana.bind('#family-name', '#family-name-kana', { katakana: true })
    autokanaGivenName = AutoKana.bind('#given-name', '#given-name-kana', { katakana: true })
  }, [])

  const handleFamilyNameInput = () => {
    setValue('familyNameKana', autokanaFamilyName.getFurigana())
  }
  const handleGivenNameInput = () => {
    setValue('givenNameKana', autokanaGivenName.getFurigana())
  }

  return (
    <div className='flex flex-col gap-4'>
      <FormField label='お名前' id='family-name' error={errors.familyName?.message ?? errors.givenName?.message}>
        <FieldInput id='family-name' name='familyName' placeholder='姓' autoComplete='family-name' onInput={handleFamilyNameInput} />
        <FieldInput id='given-name' name='givenName' placeholder='名' autoComplete='given-name' onInput={handleGivenNameInput} />
      </FormField>

      <FormField label='フリガナ' id='family-name-kana' error={errors.familyNameKana?.message ?? errors.givenNameKana?.message}>
        <FieldInput id='family-name-kana' name='familyNameKana' placeholder='セイ' />
        <FieldInput id='given-name-kana' name='givenNameKana' placeholder='メイ' />
      </FormField>

      <FormField label='メールアドレス' id='new-email' error={errors.email?.message}>
        <FieldInput id='new-email' name='email' type='email' placeholder='email@example.com' autoComplete='' />
      </FormField>

      <FormField label='パスワード' id='new-password' error={errors.password?.message}>
        <FieldInput id='new-password' name='password' type='password' autoComplete='new-password' />
      </FormField>

      <button type='submit' className={`btn btn-primary ${!isValid || isSubmitting ? 'btn-disabled' : ''}`} aria-disabled={!isValid || isSubmitting}>入力内容の確認</button>
    </div>
  )
}

const FormSignUpConfirm = ({ setFormStatus }: any) => {
  const { getValues } = useFormContext()
  const values = getValues()

  return (
    <div className='flex flex-col gap-4'>
      <div>
        <p className='label-text'>お名前</p>
        <p>
          {values.familyName}({values.familyNameKana}) {values.givenName}({values.givenNameKana})
        </p>
      </div>

      <div>
        <p className='label-text'>メールアドレス</p>
        <p>{values.email}</p>
      </div>

      <div>
        <p className='label-text'>パスワード</p>
        <p>{values.password}</p>
      </div>

      <button type='button' className='btn' onClick={() => setFormStatus('edit')}>入力内容の修正</button>
      <button type='submit' className='btn btn-accent'>新規登録</button>
    </div>
  )
}

const FormSignUpComplete = () => {
  return (
    <div className='flex flex-col gap-4'>
      <p>送信が正常に完了しました</p>
      <a href='/' className='btn btn-neutral'>HOMEへ戻る</a>
    </div>

  )
}