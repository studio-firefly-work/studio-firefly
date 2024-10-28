import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import type { FieldValues, UseFormReturn } from 'react-hook-form'
import { ZodType } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

type BaseFormProps<TFormValues extends FieldValues> = {
  onSubmit: (values: TFormValues) => void
  schema: ZodType<TFormValues>
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode
}

export const BaseForm = <TFormValues extends FieldValues>({ onSubmit, schema, children }: BaseFormProps<TFormValues>) => {
  const methods = useForm<TFormValues>({ resolver: zodResolver(schema), mode: 'onChange' })

  return (
    <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY} language="ja">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">{children(methods)}</div>

          <p>
            このサイトは reCAPTCHA で保護されており、Google の <a href="https://policies.google.com/privacy">プライバシーポリシー</a>と <a href="https://policies.google.com/terms">利用規約</a>が適用されます。
          </p>
        </form>
      </FormProvider>
    </GoogleReCaptchaProvider>
  )
}
