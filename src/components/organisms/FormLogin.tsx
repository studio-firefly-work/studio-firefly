import React from 'react'
import classNames from 'classnames'
import { z } from 'zod'
import { api } from '@/api'
import { utils } from '@/utils'
import { BaseForm } from '@/components/molecules/BaseForm'
import { FormFieldText } from '@/components/molecules/FormFieldText'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const schema = z.object({
  email: utils.schema.email,
  password: utils.schema.password,
})
type FormSchemaType = z.infer<typeof schema>

export const FormLogin = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const onSubmit = async (data: FormSchemaType) => {
    if (!executeRecaptcha) {
      alert('Recaptcha is not ready');
      return;
    }
    const recaptchaToken = await executeRecaptcha('contact');
    const res = await api.auth.login(data.email, data.password)
    if (res?.ok) window.location.href = '/user/' // ユーザー画面へ
  }

  return (
    <BaseForm<FormSchemaType> onSubmit={onSubmit} schema={schema}>
      {({ formState: { isSubmitting, isValid } }) => (
        <>
          <FormFieldText label="メールアドレス" id="email" type="email" placeholder="email@example.com" autoComplete="email" icon="icon-envelope" />
          <FormFieldText label="パスワード" id="password" type="password" autoComplete="current-password" icon="icon-key" />

          <button type="submit" className={classNames('btn btn-primary', { 'btn-disabled': !isValid || isSubmitting })} aria-disabled={!isValid || isSubmitting}>
            ログイン
          </button>
        </>
      )}
    </BaseForm>
  )
}
