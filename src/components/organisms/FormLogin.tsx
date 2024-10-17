import React from 'react'
import classNames from 'classnames'
import { z } from 'zod'
import { api } from '@/api'
import { utils } from '@/utils'
import { BaseForm } from '@/components/molecules/BaseForm'
import { FormFieldText } from '@/components/molecules/FormFieldText'

const schema = z.object({
  email: utils.schema.email,
  password: utils.schema.password,
})

type FormLoginDataType = z.infer<typeof schema>

export const FormLogin = () => {
  const onSubmit = async (data: FormLoginDataType) => {
    // ログイン
    const res = await api.auth.login(data.email, data.password)
    if (res?.ok) {
      // 成功したらユーザー画面へ
      window.location.href = '/user/'
    }
  }

  return (
    <BaseForm<FormLoginDataType> onSubmit={onSubmit} schema={schema}>
      {({ formState: { isSubmitting, isValid } }) => (
        <div className="flex flex-col gap-4">
          <FormFieldText label="メールアドレス" id="email" type="email" placeholder="email@example.com" autoComplete="email" icon="icon-envelope" />

          <FormFieldText label="パスワード" id="password" type="password" autoComplete="current-password" icon="icon-key" />

          <button type="submit" className={classNames('btn btn-primary', { 'btn-disabled': !isValid || isSubmitting })} aria-disabled={!isValid || isSubmitting}>
            ログイン
          </button>
        </div>
      )}
    </BaseForm>
  )
}
