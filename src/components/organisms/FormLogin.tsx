import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  email: z.string().min(1, { message: 'メールアドレスを入力してください。' }).email({ message: 'メールアドレスの形式で入力してください。' }),
  password: z.string().min(1, { message: 'パスワードを入力してください。' }),
})
type FormLoginDataType = z.infer<typeof schema>

export default function FormLogin() {
  const methods = useForm<FormLoginDataType>({ mode: 'onChange', resolver: zodResolver(schema) })
  const {
    register,
    formState: { errors, isSubmitting, isValid },
  } = methods

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
        window.location.href = '/user/'
      }
    } catch (error) {
      console.error('通信に失敗しました', error)
    }
  }

  return (
    <form onSubmit={methods.handleSubmit(login)}>
      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="email-login" className="label-text">
            メールアドレス
          </label>
          <input {...register('email')} id="email-login" className="input input-bordered w-full pr-14" autoComplete="email" type="email" placeholder="example@studio-firefly.co.jp" />
          {errors.email && <p className="text-error">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password-login" className="label-text">
            パスワード
          </label>
          <input {...register('password')} id="password-login" className="input input-bordered w-full pr-14" autoComplete="new-password" type="password" />
          {errors.password && <p className="text-error">{errors.password.message}</p>}
        </div>

        <button type="submit" className={`btn btn-primary ${!isValid || isSubmitting ? 'btn-disabled' : ''} `} aria-disabled={!isValid || isSubmitting}>
          ログイン
        </button>
      </div>
    </form>
  )
}
