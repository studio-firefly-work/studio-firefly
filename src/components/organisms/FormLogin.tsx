import React from 'react'
import { useForm, useFormContext, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { utils } from '@/utils'
import { FormField, FieldInput } from '@/components/molecules/FormField'

const loginSchema = utils.schema.pick({
  email: true,
  password: true
})
type FormLoginDataType = z.infer<typeof loginSchema>

export const FormLogin = () => {
  const methods = useForm<FormLoginDataType>({ mode: 'onChange', resolver: zodResolver(loginSchema) })

  // ログイン
  const login = async (data: FormLoginDataType) => {
    const email = data.email
    const password = data.password

    try {
      const res = await fetch(`${import.meta.env.PUBLIC_API_BASE_URL}/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      })

      const data = await res.json()
      if (!res.ok) {
        console.error('ログインに失敗しました：' + data.message)
      } else {
        console.log('ログインに成功しました：' + data.message)
      }

      return res
    } catch (error) {
      console.error('通信に失敗しました', error)
    }
  }

  const onSubmit = async (data: FormLoginDataType) => {
    // ログイン
    const res = await login(data)
    if (res?.ok) {
      // 成功したらユーザー画面へ
      window.location.href = '/user/'
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormLoginEdit />
      </form>
    </FormProvider>
  )
}

const FormLoginEdit = () => {
  const { formState: { errors, isSubmitting, isValid } } = useFormContext()

  return (
    <div className="flex flex-col gap-4">
      <FormField label="メールアドレス" id="email" >
        <FieldInput id="email" name="email" type='email' placeholder='email@example.com' autoComplete='email' />
      </FormField>

      <FormField label="パスワード" id="current-password" error={errors.password?.message}>
        <FieldInput id="current-password" name='password' type='password' autoComplete="current-password" />
      </FormField>

      <button type="submit" className={`btn btn-primary ${!isValid || isSubmitting ? 'btn-disabled' : ''} `} aria-disabled={!isValid || isSubmitting}>ログイン</button>
    </div>
  )
}