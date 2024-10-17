import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import * as AutoKana from 'vanilla-autokana'
import { z } from 'zod'
import { api } from '@/api'
import { utils } from '@/utils'
import { BaseForm } from '@/components/molecules/BaseForm'
import { FormStep } from '@/components/molecules/FormStep'
import { FormFieldText } from '@/components/molecules/FormFieldText'
import { FormFieldTextarea } from '@/components/molecules/FormFieldTextarea'
import { FormFieldCheckbox } from '@/components/molecules/FormFieldCheckbox'

const schema = z.object({
  name: utils.schema.name,
  kana: utils.schema.kana,
  email: utils.schema.email,
  message: utils.schema.message,
  privacy: utils.schema.privacy,
})
type FormContactDataType = z.infer<typeof schema>

let kana: AutoKana.AutoKana

export const FormContact = () => {
  const [step, setStep] = useState(1)
  const formStepNames = ['入力', '確認', '完了']

  const onSubmit = async (data: FormContactDataType) => {
    switch (step) {
      case 1:
        setStep(2) // 確認画面へ
        break

      case 2:
        const res = await api.mail.sendMail(data)
        if (res?.ok) setStep(3) // 完了画面へ
        break
    }
  }

  return (
    <>
      <FormStep names={formStepNames} step={step} />

      <BaseForm<FormContactDataType> onSubmit={onSubmit} schema={schema}>
        {({ formState: { isSubmitting, isValid }, setValue, getValues }) => {
          useEffect(() => {
            if (step === 1) kana = AutoKana.bind('#name', '#kana', { katakana: true })
          }, [step])

          const handleNameInput = () => {
            if (step === 1) setValue('kana', kana.getFurigana())
          }

          return (
            <div className="flex flex-col gap-4">
              {step === 1 &&
                <>
                  <FormFieldText label="お名前" id="name" placeholder="山田太郎" autoComplete="name" icon="icon-user" onInput={handleNameInput} />

                  <FormFieldText label="フリガナ" id="kana" placeholder="ヤマダタロウ" />

                  <FormFieldText label="メールアドレス" id="email" type="email" placeholder="email@example.com" autoComplete="email" icon="icon-envelope" />

                  <FormFieldTextarea label="お問い合わせ内容" id="message" placeholder="お問い合わせ内容を入力してください" />

                  <FormFieldCheckbox label="" id="privacy" items={['<a href="/privacy/" class="link" target="_blank">プライバシーポリシー</a>に同意する']} />

                  <button type="submit" className={classNames('btn btn-primary', { 'btn-disabled': !isValid || isSubmitting })} aria-disabled={!isValid || isSubmitting}>入力内容の確認</button>
                </>
              }

              {step === 2 &&
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

                  <div className='flex gap-4 md:flex-row flex-col'>
                    <button type="submit" className="btn btn-accent md:w-1/2 md:order-2">
                      お問い合わせを送信
                    </button>
                    <button type="button" className="btn md:w-1/2 md:order-1" onClick={() => setStep(1)}>
                      入力内容の修正
                    </button>
                  </div>
                </>
              }

              {step === 3 &&
                <>
                  <p>送信が正常に完了しました</p>
                  <a href="/" className="btn btn-neutral">
                    ホームへ戻る
                  </a>
                </>
              }
            </div>
          )
        }}
      </BaseForm>
    </>
  )
}
