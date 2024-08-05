import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const PassCode = new RegExp('^(?=.*[A-Z])(?=.*[.?/-])[a-zA-Z0-9.?/-]{8,24}$')

const schema = z.object({
  name: z.string().min(1, {
    message: '1文字以上入力して下さい',
  }),
  email: z
    .string()
    .email({
      message: 'メールアドレスの形式で入力して下さい',
    })
    .min(1, {
      message: '1文字以上入力して下さい',
    }),
  password: z.string().regex(PassCode, {
    message: 'アルファベット大文字とピリオド(.)、スラッシュ(/)、クエスチョンマーク(?)、ハイフン(-)のどれかを含めた、8-24文字で設定して下さい',
  }),
})

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: any, event: SubmitEvent) => {
    event.preventDefault()
    const form = new FormData()
    form.append('family-name', data.familyName)
    form.append('given-name', data.givenName)
    form.append('email', data.email)
    form.append('password', data.password)

    const apiUrl = `${import.meta.env.PUBLIC_API}/mail/send`
    await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          console.error('サーバーエラー')
        }
        // ここに成功時の処理を記述
        alert('登録が正常に完了しました')
        window.location.href = '/signin/'
      })
      .catch((error) => {
        console.error('通信に失敗しました', error)
      })
  }

  // フォームのバリデーションを行う関数
  const validateForm = () => {
    const validForm = document.querySelector('form:valid') // 有効なフォームを選択
    const submitButton = document.querySelector<HTMLButtonElement>('button[type="submit"]')

    if (submitButton) {
      // フォームが有効でない場合は送信ボタンを無効化
      submitButton.disabled = !validForm
    }
  }

  return (
    <div className="Form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <div className="flex gap-3">
            <label htmlFor="name" className="label-text">
              ユーザー名
            </label>
            <input {...register('familyName')} id="family-name" className="input input-bordered" onChange={validateForm} />
            <input {...register('givenName')} id="given-name" className="input input-bordered" onChange={validateForm} />
          </div>
          <p>{errors.familyName?.message}</p>
          <div className="flex gap-3">
            <label htmlFor="email">メールアドレス</label>
            <input {...register('email')} id="email" className="input input-bordered" />
          </div>
          <p>{errors.email?.message}</p>
          <div className="flex gap-3">
            <label htmlFor="password">パスワード</label>
            <input {...register('password')} type="password" id="password" className="input input-bordered" />
          </div>
          <p>{errors.password?.message}</p>
          <button type="submit" className="btn btn-primary" disabled>
            送信
          </button>
        </div>
      </form>
    </div>
  )
}
