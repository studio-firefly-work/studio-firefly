import React, { useEffect, useState } from 'react'
import * as AutoKana from 'vanilla-autokana'
import { useForm, useFormContext, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '@/api'
import { utils } from '@/utils'
import { FormFieldText } from '@/components/molecules/FormFieldText'

const schema = z.object({
  name: utils.schema.name,
  kana: utils.schema.kana,
  email: utils.schema.email,
})
type FormUserDataType = z.infer<typeof schema>

let kana: AutoKana.AutoKana

export default function FormUserData() {
  const methods = useForm<FormUserDataType>({ mode: 'onChange', resolver: zodResolver(schema) })
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
  const handleNameInput = () => { setValue('kana', kana.getFurigana()) }

  // ユーザー情報 取得
  const getUser = async () => {
    const userData = await api.user.getUser()
    setUser(userData)
  }

  useEffect(() => {
    kana = AutoKana.bind('#name', '#kana', { katakana: true })
    getUser()
  }, [])

  useEffect(() => {
    reset(user)
  }, [reset, user])

  return (
    <div className="flex flex-col gap-4">
      <FormFieldText
        label='お名前'
        id='name'
        placeholder='山田太郎'
        autoComplete='name'
        icon='icon-user'
        onInput={handleNameInput} />

      <FormFieldText
        label='フリガナ'
        id='kana'
        placeholder='ヤマダタロウ' />

      <FormFieldText
        label='メールアドレス'
        id='new-email'
        validation='email'
        type='email'
        placeholder='email@example.com'
        autoComplete='email'
        icon='icon-envelope' />

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
        <p>{values.name}({values.kana})</p>
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