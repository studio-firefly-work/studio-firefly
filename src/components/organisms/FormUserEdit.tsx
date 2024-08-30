import React, { useEffect, useState } from 'react'
import * as AutoKana from 'vanilla-autokana'
import { useForm, useFormContext, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { utils } from '@/utils'
import { FormField, FieldInput } from '@/components/molecules/FormField'
import { api } from '@/api'

let autokanaFamilyName: AutoKana.AutoKana
let autokanaGivenName: AutoKana.AutoKana
const userDataSchema = utils.schema.pick({
  familyName: true,
  givenName: true,
  familyNameKana: true,
  givenNameKana: true,
  email: true,
})
type FormUserDataType = z.infer<typeof userDataSchema>

export default function FormUserData() {
  const methods = useForm<FormUserDataType>({ mode: 'onChange', resolver: zodResolver(userDataSchema) })
  const [formStatus, setFormStatus] = useState<'edit' | 'confirm' | 'complete'>('edit')

  // button type='submit' 押下時
  const onSubmit = async (data: FormUserDataType) => {
    switch (formStatus) {
      case 'edit':
        // 編集画面で押下された場合は確認画面へ遷移
        setFormStatus('confirm')
        break
      case 'confirm':
        // 確認画面で押下された場合はユーザー情報更新
        const res = await api.user.updateUser(data)
        if (res?.ok) {
          // ユーザー情報更新に成功した場合は完了画面へ遷移
          setFormStatus('complete')
        }
        break
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {formStatus === 'edit' && <FormUserDataEdit />}
        {formStatus === 'confirm' && <FormUserDataConfirm setFormStatus={setFormStatus} />}
        {formStatus === 'complete' && <FormUserDataComplete />}
      </form>
    </FormProvider>
  )
}

const FormUserDataEdit = () => {
  const { setValue, formState: { errors, isSubmitting, isValid }, reset } = useFormContext()
  const [user, setUser] = useState<FormUserDataType>()

  // ユーザー情報 取得
  const getUser = async () => {
    const userData = await api.user.getUser()
    setUser(userData)
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
      <FormField label='お名前' id='family-name' error={errors.familyName?.message ?? errors.givenName?.message}>
        <FieldInput id='family-name' name='familyName' placeholder='姓' autoComplete='family-name' onInput={handleFamilyNameInput} />
        <FieldInput id='given-name' name='givenName' placeholder='名' autoComplete='given-name' onInput={handleGivenNameInput} />
      </FormField>

      <FormField label='フリガナ' id='family-name-kana' error={errors.familyNameKana?.message ?? errors.givenNameKana?.message}>
        <FieldInput id='family-name-kana' name='familyNameKana' placeholder='セイ' />
        <FieldInput id='given-name-kana' name='givenNameKana' placeholder='メイ' />
      </FormField>

      <FormField label='メールアドレス' id='email'>
        <FieldInput id='email' name='email' type='email' placeholder='email@example.com' autoComplete='' />
      </FormField>

      <button type="submit" className={`btn btn-primary ${!isValid || isSubmitting ? 'btn-disabled' : ''}`} aria-disabled={!isValid || isSubmitting}>入力内容の確認</button>
    </div>
  )
}

const FormUserDataConfirm = ({ setFormStatus }: any) => {
  const { getValues } = useFormContext()
  const values = getValues()

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="label-text">お名前</p>
        <p>{values.familyName}({values.familyNameKana}) {values.givenName}({values.givenNameKana})</p>
      </div>

      <div>
        <p className="label-text">メールアドレス</p>
        <p>{values.email}</p>
      </div>

      <button type="button" className="btn" onClick={() => setFormStatus('edit')}>入力内容の修正</button>
      <button type="submit" className="btn btn-accent">お客様情報を更新</button>
    </div>
  )
}

const FormUserDataComplete = () => {
  return (
    <div className="flex flex-col gap-4">
      <p>更新が正常に完了しました</p>
      <a href="/user/" className='btn btn-neutral'>お客様情報ページへ戻る</a>
    </div>

  )
}