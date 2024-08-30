import React, { useEffect, useState } from 'react'
import * as AutoKana from 'vanilla-autokana'
import { useForm, useFormContext, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '@/api'
import { utils } from '@/utils'
import { FormFieldText } from '@/components/molecules/FormFieldText'
import { FormFieldTextarea } from '@/components/molecules/FormFieldTextarea'

const schema = utils.schema.pick({
  name: true,
  kana: true,
  email: true,
  message: true
})
type FormContactDataType = z.infer<typeof schema>

let kana: AutoKana.AutoKana

export const FormContact = () => {
  const methods = useForm<FormContactDataType>({ mode: 'onChange', resolver: zodResolver(schema) })
  const [formStatus, setFormStatus] = useState<'edit' | 'confirm' | 'complete'>('edit')

  // button type='submit' 押下時
  const onSubmit = async (data: FormContactDataType) => {
    switch (formStatus) {
      case 'edit':
        // 編集画面で押下された場合は確認画面へ遷移
        setFormStatus('confirm')
        break
      case 'confirm':
        // 確認画面で押下された場合は問い合わせ送信
        const res = await api.mail.sendMail(data)
        if (res?.ok) {
          // 問い合わせ送信に成功した場合は完了画面へ遷移
          setFormStatus('complete')
        }
        break
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {formStatus === 'edit' && <FormContactEdit />}
        {formStatus === 'confirm' && <FormContactConfirm setFormStatus={setFormStatus} />}
        {formStatus === 'complete' && <FormContactComplete />}
      </form>
    </FormProvider>
  )
}

const FormContactEdit = () => {
  const { setValue, formState: { isSubmitting, isValid } } = useFormContext()
  const handleNameInput = () => { setValue('kana', kana.getFurigana()) }

  useEffect(() => {
    kana = AutoKana.bind('#name', '#kana', { katakana: true })
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <FormFieldText label='お名前' id='name' placeholder='山田太郎' autoComplete='name' icon='icon-user' onInput={handleNameInput} />
      <FormFieldText label='フリガナ' id='kana' placeholder='ヤマダタロウ' />
      <FormFieldText label='メールアドレス' id='email' type='email' placeholder='email@example.com' autoComplete='email' icon='icon-envelope' />
      <FormFieldTextarea label='お問い合わせ内容' id='message' placeholder='お問い合わせ内容を入力してください' />
      <button type="submit" className={`btn btn-primary ${!isValid || isSubmitting ? 'btn-disabled' : ''}`} aria-disabled={!isValid || isSubmitting}>入力内容の確認</button>
    </div>
  )
}

const FormContactConfirm = ({ setFormStatus }: any) => {
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

      <div>
        <p className="label-text">お問い合わせ内容</p>
        <p>{values.message}</p>
      </div>

      <button type="button" className="btn" onClick={() => setFormStatus('edit')}>入力内容の修正</button>
      <button type="submit" className="btn btn-accent">お問い合わせを送信</button>
    </div>
  )
}

const FormContactComplete = () => {
  return (
    <div className="flex flex-col gap-4">
      <p>送信が正常に完了しました</p>
      <a href="/" className='btn btn-neutral'>HOMEへ戻る</a>
    </div>
  )
}