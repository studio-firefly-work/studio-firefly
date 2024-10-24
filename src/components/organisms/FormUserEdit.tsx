import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { z } from 'zod'
import { api } from '@/api'
import { utils } from '@/utils'
import { BaseForm } from '@/components/molecules/BaseForm'
import { FormStep } from '@/components/molecules/FormStep'
import { FormFieldText } from '@/components/molecules/FormFieldText'

const schema = z.object({
  name: utils.schema.name,
  kana: utils.schema.kana,
  email: utils.schema.email,
})
type FormSchemaType = z.infer<typeof schema>

export const FormUserEdit = () => {
  const [user, setUser] = useState<FormSchemaType>()

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    const user = await api.user.getUser()
    setUser(user)
  }

  if (user) {
    return <Form user={user} />
  }
}

const Form = ({ user }: any) => {
  const [step, setStep] = useState(1)

  const onSubmit = async (data: FormSchemaType) => {
    if (step === 1) {
      setStep(2) // 確認画面へ
    }
    else if (step === 2) {
      const res = await api.user.updateUser(data)
      if (res?.ok) setStep(3) // 完了画面へ
    }
  }

  const inputDatas = (data: FormSchemaType) => [
    { label: 'お名前', value: `${data.name} (${data.kana})` },
    { label: 'メールアドレス', value: data.email },
  ]

  return (
    <>
      <FormStep names={['入力', '確認', '完了']} step={step} />

      <BaseForm<FormSchemaType> onSubmit={onSubmit} schema={schema}>
        {({ formState: { isSubmitting, isValid }, getValues }) => (
          <>
            {step === 1 && (
              <>
                <FormFieldText label="お名前" id="name" placeholder="山田太郎" autoComplete="name" icon="icon-user" defaultValue={user.name} />
                <FormFieldText label="フリガナ" id="kana" placeholder="ヤマダタロウ" defaultValue={user.kana} />
                <FormFieldText label="メールアドレス" id="new-email" validation="email" type="email" placeholder="email@example.com" autoComplete="email" icon="icon-envelope" defaultValue={user.email} />

                <button type="submit" className={classNames('btn btn-primary', { 'btn-disabled': !isValid || isSubmitting })} aria-disabled={!isValid || isSubmitting}>
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
                    お客様情報を更新
                  </button>
                  <button type="button" className="btn md:order-1 md:w-1/2" onClick={() => setStep(1)}>
                    入力内容の修正
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <p>更新が正常に完了しました</p>
                <a href="/user/" className="btn btn-neutral">
                  お客様情報ページへ戻る
                </a>
              </>
            )}
          </>
        )
        }
      </BaseForm>
    </>
  )
}
