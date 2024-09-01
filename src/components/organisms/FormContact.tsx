import React, { useEffect, useState } from 'react'
import * as AutoKana from 'vanilla-autokana'
import { z } from 'zod'
import { api } from '@/api'
import { utils } from '@/utils'
import { BaseForm } from '@/components/molecules/BaseForm'
import { FormFieldText } from '@/components/molecules/FormFieldText'
import { FormFieldTextarea } from '@/components/molecules/FormFieldTextarea'

const schema = z.object({
  name: utils.schema.name,
  kana: utils.schema.kana,
  email: utils.schema.email,
  message: utils.schema.message,
})

type FormContactDataType = z.infer<typeof schema>

let kana: AutoKana.AutoKana

export const FormContact = () => {
  const [formStatus, setFormStatus] = useState<'edit' | 'confirm' | 'complete'>('edit')

  const onSubmit = async (data: FormContactDataType) => {
    if (formStatus === 'edit') {
      setFormStatus('confirm')
    } else if (formStatus === 'confirm') {
      const res = await api.mail.sendMail(data)
      if (res?.ok) {
        setFormStatus('complete')
      }
    }
  }

  return (
    <BaseForm<FormContactDataType> onSubmit={onSubmit} schema={schema}>
      {({ formState: { isSubmitting, isValid }, setValue, getValues }) => {
        useEffect(() => {
          if (formStatus === 'edit') {
            kana = AutoKana.bind('#name', '#kana', { katakana: true })
          }
        }, [formStatus])

        const handleNameInput = () => {
          if (formStatus === 'edit') {
            setValue('kana', kana.getFurigana())
          }
        }

        return (
          <div className="flex flex-col gap-4">
            {formStatus === 'edit' && (
              <>
                <FormFieldText label="お名前" id="name" placeholder="山田太郎" autoComplete="name" icon="icon-user" onInput={handleNameInput} />

                <FormFieldText label="フリガナ" id="kana" placeholder="ヤマダタロウ" />

                <FormFieldText label="メールアドレス" id="email" type="email" placeholder="email@example.com" autoComplete="email" icon="icon-envelope" />

                <FormFieldTextarea label="お問い合わせ内容" id="message" placeholder="お問い合わせ内容を入力してください" />

                <button type="submit" className={`btn btn-primary ${!isValid || isSubmitting ? 'btn-disabled' : ''}`} aria-disabled={!isValid || isSubmitting}>
                  入力内容の確認
                </button>
              </>
            )}

            {formStatus === 'confirm' && (
              <>
                <div>
                  <p className="label-text">お名前</p>
                  <p>
                    {getValues('name')}({getValues('kana')})
                  </p>
                </div>

                <div>
                  <p className="label-text">メールアドレス</p>
                  <p>{getValues('email')}</p>
                </div>

                <div>
                  <p className="label-text">お問い合わせ内容</p>
                  <p>{getValues('message')}</p>
                </div>

                <button type="button" className="btn" onClick={() => setFormStatus('edit')}>
                  入力内容の修正
                </button>
                <button type="submit" className="btn btn-accent">
                  お問い合わせを送信
                </button>
              </>
            )}

            {formStatus === 'complete' && (
              <div className="flex flex-col gap-4">
                <p>送信が正常に完了しました</p>
                <a href="/" className="btn btn-neutral">
                  HOMEへ戻る
                </a>
              </div>
            )}
          </div>
        )
      }}
    </BaseForm>
  )
}
