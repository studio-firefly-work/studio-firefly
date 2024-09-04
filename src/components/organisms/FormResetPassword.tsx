import React, { useState } from 'react'
import { z } from 'zod'
import { api } from '@/api'
import { utils } from '@/utils'
import { BaseForm } from '@/components/molecules/BaseForm'
import { FormFieldText } from '@/components/molecules/FormFieldText'

const schema = z.object({
  password: utils.schema.password
})

type FormResetPasswordType = z.infer<typeof schema>

export const FormResetPassword = () => {
  const [formStatus, setFormStatus] = useState<'edit' | 'confirm' | 'complete'>('edit')

  const onSubmit = async (data: FormResetPasswordType) => {
    if (formStatus === 'edit') {
      const res = await api.user.resetPassword(data.password)
      if (res?.ok) {
        setFormStatus('complete')
      }
    }
  }

  return (
    <BaseForm<FormResetPasswordType> onSubmit={onSubmit} schema={schema}>
      {({ formState: { isSubmitting, isValid } }) => {
        return (
          <div className="flex flex-col gap-4">
            {formStatus === 'edit' && (
              <>
                <FormFieldText label="パスワード" id="reset-password" validation="password" type="password" autoComplete="new-password" icon="icon-key" />

                <button type="submit" className={`btn btn-primary ${!isValid || isSubmitting ? 'btn-disabled' : ''}`} aria-disabled={!isValid || isSubmitting}>
                  パスワードを変更する
                </button>
              </>
            )}

            {formStatus === 'complete' && (
              <div className="flex flex-col gap-4">
                <p>送信が正常に完了しました</p>
                <a href="/login/" className="btn btn-neutral">
                  ログイン画面へ
                </a>
              </div>
            )}
          </div>
        )
      }}
    </BaseForm>
  )
}
