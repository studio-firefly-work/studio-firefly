import React, { useState } from 'react'
import classNames from 'classnames'
import { z } from 'zod'
import { api } from '@/api'
import { utils } from '@/utils'
import { BaseForm } from '@/components/molecules/BaseForm'
import { FormFieldText } from '@/components/molecules/FormFieldText'

const schema = z.object({
  email: utils.schema.email,
})
type FormSchemaType = z.infer<typeof schema>

export const FormRequestResetPassword = () => {
  const [step, setStep] = useState(1)

  const onSubmit = async (data: FormSchemaType) => {
    const res = await api.auth.resetPassword(data.email)
    if (res?.ok) setStep(2) // 完了画面へ
  }

  return (
    <BaseForm<FormSchemaType> onSubmit={onSubmit} schema={schema}>
      {({ formState: { isSubmitting, isValid } }) => {
        return (
          <>
            {step === 1 && (
              <>
                <FormFieldText
                  label="メールアドレス"
                  id="reset-email"
                  validation="email"
                  type="email"
                  placeholder="email@example.com"
                  autoComplete="email"
                  icon="mdi:email"
                />

                <button
                  type="submit"
                  className={classNames('btn btn-primary', { 'btn-disabled': !isValid || isSubmitting })}
                  aria-disabled={!isValid || isSubmitting}
                >
                  確認メールを送信
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <p>送信が正常に完了しました</p>
                <a href="/" className="btn btn-neutral">
                  HOMEへ戻る
                </a>
              </>
            )}
          </>
        )
      }}
    </BaseForm>
  )
}
