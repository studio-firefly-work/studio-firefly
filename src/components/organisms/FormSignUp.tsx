import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import * as AutoKana from 'vanilla-autokana'
import { z } from 'zod'
import { api } from '@/api'
import { utils } from '@/utils'
import { BaseForm } from '@/components/molecules/BaseForm'
import { FormStep } from '@/components/molecules/FormStep'
import { FormFieldText } from '@/components/molecules/FormFieldText'
import { FormFieldCheckbox } from '@/components/molecules/FormFieldCheckbox'

const schema = z.object({
  name: utils.schema.name,
  kana: utils.schema.kana,
  email: utils.schema.email,
  password: utils.schema.password,
  privacy: utils.schema.privacy,
})
type FormSchemaType = z.infer<typeof schema>

export const FormSignUp = () => {
  const [step, setStep] = useState(1)
  let kana: AutoKana.AutoKana

  useEffect(() => {
    if (step === 1) {
      kana = AutoKana.bind('#name', '#kana', { katakana: true })
    }
  }, [step])

  const onSubmit = async (data: FormSchemaType) => {
    if (step === 1) {
      setStep(2) // 確認画面へ
    } else if (step === 2) {
      const res = await api.user.createUser(data)
      if (res?.ok) setStep(3) // 完了画面へ
    }
  }

  const inputDatas = (data: FormSchemaType) => [
    { label: 'お名前', value: `${data.name} (${data.kana})` },
    { label: 'メールアドレス', value: data.email },
    { label: 'パスワード', value: '•'.repeat(data.password.length) },
  ]

  return (
    <>
      <FormStep names={['入力', '確認', '完了']} step={step} />

      <BaseForm<FormSchemaType> onSubmit={onSubmit} schema={schema}>
        {({ formState: { isSubmitting, isValid }, setValue, getValues }) => (
          <>
            {step === 1 && (
              <>
                <FormFieldText
                  label="お名前"
                  id="name"
                  placeholder="山田太郎"
                  autoComplete="name"
                  icon="mdi:user"
                  onInput={() => setValue('kana', kana.getFurigana())}
                />
                <FormFieldText label="フリガナ" id="kana" placeholder="ヤマダタロウ" />
                <FormFieldText
                  label="メールアドレス"
                  id="new-email"
                  validation="email"
                  type="email"
                  placeholder="email@example.com"
                  autoComplete="email"
                  icon="mdi:email"
                />
                <FormFieldText
                  label="パスワード"
                  id="new-password"
                  validation="password"
                  type="password"
                  autoComplete="new-password"
                  icon="mdi:key"
                />
                <FormFieldCheckbox
                  label=""
                  id="privacy"
                  items={['<a href="/privacy/" class="link" target="_blank">プライバシーポリシー</a>に同意する']}
                />

                <button
                  type="submit"
                  className={classNames('btn btn-primary', { 'btn-disabled': !isValid || isSubmitting })}
                  aria-disabled={!isValid || isSubmitting}
                >
                  入力内容の確認
                </button>
              </>
            )}

            {step === 2 && (
              <>
                {inputDatas(getValues()).map(({ label, value }, index) => (
                  <div key={index}>
                    <p className="label-text">{label}</p>
                    <p>{value}</p>
                  </div>
                ))}

                <div className="flex flex-col gap-4 md:flex-row">
                  <button type="submit" className="btn btn-accent md:order-2 md:w-1/2">
                    新規登録
                  </button>
                  <button type="button" className="btn md:order-1 md:w-1/2" onClick={() => setStep(1)}>
                    入力内容の修正
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <p>ユーザー登録が正常に完了しました</p>
                <a href="/" className="btn btn-neutral">
                  ホームへ戻る
                </a>
              </>
            )}
          </>
        )}
      </BaseForm>
    </>
  )
}
