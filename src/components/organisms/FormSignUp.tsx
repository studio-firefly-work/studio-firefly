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
  password: utils.schema.password,
})
type FormSignUpDataType = z.infer<typeof schema>

let kana: AutoKana.AutoKana

export const FormSignUp = () => {
  const methods = useForm<FormSignUpDataType>({ mode: 'onChange', resolver: zodResolver(schema) })
  const [formStatus, setFormStatus] = useState<'edit' | 'confirm' | 'complete'>('edit')

  // button type='submit' 押下時
  const onSubmit = async (data: FormSignUpDataType) => {
    switch (formStatus) {
      case 'edit':
        // 編集画面で押下された場合は確認画面へ遷移
        setFormStatus('confirm')
        break
      case 'confirm':
        // 確認画面で押下された場合は新規仮ユーザー作成
        const res = await api.user.createUser(data)
        if (res?.ok) {
          // 新規仮ユーザー作成に成功した場合は完了画面へ遷移
          setFormStatus('complete')
        }
        break
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
  const {
    setValue,
    formState: { isSubmitting, isValid },
  } = useFormContext()
  const handleNameInput = () => {
    setValue('kana', kana.getFurigana())
  }

  useEffect(() => {
    kana = AutoKana.bind('#name', '#kana', { katakana: true })
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <FormFieldText label="お名前" id="name" placeholder="山田太郎" autoComplete="name" icon="icon-user" onInput={handleNameInput} />

      <FormFieldText label="フリガナ" id="kana" placeholder="ヤマダタロウ" />

      <FormFieldText label="メールアドレス" id="new-email" validation="email" type="email" placeholder="email@example.com" autoComplete="email" icon="icon-envelope" />

      <FormFieldText label="パスワード" id="new-password" validation="password" type="password" autoComplete="new-password" icon="icon-key" />

      <button type="submit" className={`btn btn-primary ${!isValid || isSubmitting ? 'btn-disabled' : ''}`} aria-disabled={!isValid || isSubmitting}>
        入力内容の確認
      </button>
    </div>
  )
}

const FormSignUpConfirm = ({ setFormStatus }: any) => {
  const { getValues } = useFormContext()
  const values = getValues()

  const formFields = [
    { label: 'お名前', type: 'text', value: `${values.name}(${values.kana})` },
    { label: 'メールアドレス', type: 'email', value: values.email },
    { label: 'パスワード', type: 'password', value: values.password },
  ]

  return (
    <div className="flex flex-col gap-4">
      {formFields.map((field, index) => (
        <div key={index} className="form-control w-full">
          <label className="label label-text">{field.label}</label>
          <input type={field.type} className="input" value={field.value} disabled />
        </div>
      ))}

      <button type="button" className="btn" onClick={() => setFormStatus('edit')}>
        入力内容の修正
      </button>
      <button type="submit" className="btn btn-accent">
        新規登録
      </button>
    </div>
  )
}

const FormSignUpComplete = () => {
  return (
    <div className="flex flex-col gap-4">
      <p>ユーザー登録が正常に完了しました</p>
      <a href="/" className="btn btn-neutral">
        HOMEへ戻る
      </a>
    </div>
  )
}
