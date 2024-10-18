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

type FormRequestResetPasswordType = z.infer<typeof schema>

export const FormRequestResetPassword = () => {
  const [formStatus, setFormStatus] = useState<'edit' | 'confirm' | 'complete'>('edit')

  const onSubmit = async (data: FormRequestResetPasswordType) => {
    if (formStatus === 'edit') {
      const res = await api.auth.resetPassword(data.email)
      if (res?.ok) {
        setFormStatus('complete')
      }
    }
  }

  return (
    <BaseForm<FormRequestResetPasswordType> onSubmit={onSubmit} schema={schema}>
      {({ formState: { isSubmitting, isValid } }) => {
        return (
          <div className="flex flex-col gap-4">
            {formStatus === 'edit' && (
              <>
                <FormFieldText label="メールアドレス" id="reset-email" validation="email" type="email" placeholder="email@example.com" autoComplete="email" icon="icon-envelope" />

                <button type="submit" className={classNames('btn btn-primary', { 'btn-disabled': !isValid || isSubmitting })} aria-disabled={!isValid || isSubmitting}>
                  確認メールを送信
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
