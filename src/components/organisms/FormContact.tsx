import { useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'

type FormContactDataType = {
  familyName: string
  givenName: string
  familyNameKana: string
  givenNameKana: string
  email: string
  message: string
}

const kana = /^[\u30A0-\u30FF\uFF66-\uFF9F]+$/
const schema = z.object({
  familyName: z
    .string()
    .min(1, { message: '入力してください。' }),
  givenName: z
    .string()
    .min(1, { message: '入力してください。' }),
  familyNameKana: z
    .string()
    .min(1, { message: '入力してください。' })
    .regex(kana, { message: 'カタカナで入力してください。' }),
  givenNameKana: z
    .string()
    .min(1, { message: '入力してください。' })
    .regex(kana, { message: 'カタカナで入力してください。' }),
  email: z
    .string()
    .min(1, { message: '入力してください。' })
    .email({ message: 'メールアドレスの形式で入力してください。' }),
  message: z
    .string()
    .min(1, { message: '入力してください。' })
})

const InputWithIcon = ({ name, errors, watch, children }: any) => {
  const value = watch(name)
  return (
    <div className="relative flex-1">
      {children}
      {(() => {
        if (errors[name]?.message) {
          return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-error absolute right-4 top-2/4 transform -translate-y-1/2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>

        } else if (value) {
          return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-success absolute right-4 top-2/4 transform -translate-y-1/2">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        }
      })()}
    </div>
  )
}

export default function ContactForm() {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting, isValid } } = useForm<FormContactDataType>({ mode: "onChange", resolver: zodResolver(schema) })

  const onSubmit = async (data: FormContactDataType) => {
    const formData = new FormData()
    formData.append('familyName', data.familyName)
    formData.append('givenName', data.givenName)
    formData.append('email', data.email)
    formData.append('message', data.message)
    const formDataObj = Object.fromEntries(formData.entries())

    try {
      await fetch(`${import.meta.env.PUBLIC_API}/mail/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataObj),
      })
        .then((response) => {
          if (!response.ok) {
            console.error('サーバーエラー')
          }
          console.log('登録が正常に完了しました')
        })

    }
    catch (error) {
      console.error('通信に失敗しました', error)
    }
  }

  return (
    <div className="Form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="family-name" className="label-text">お名前</label>
            <div className="flex gap-4 flex-col md:flex-row">
              <InputWithIcon name="familyName" watch={watch} errors={errors} >
                <input {...register('familyName')} id="family-name" className="input input-bordered w-full" autoComplete="family-name" placeholder="姓" />
              </InputWithIcon>
              <InputWithIcon name="givenName" watch={watch} errors={errors} >
                <input {...register('givenName')} id="given-name" className="input input-bordered w-full" autoComplete="given-name" placeholder="名" />
              </InputWithIcon>
            </div>
            <p className='text-error'>{errors.familyName?.message ?? errors.givenName?.message}</p>
          </div>

          <div>
            <label htmlFor="family-name-kana" className="label-text">カナ</label>
            <div className="flex gap-4 flex-col md:flex-row">
              <InputWithIcon name="familyNameKana" watch={watch} errors={errors} >
                <input {...register('familyNameKana')} id="family-name-kana" className="input input-bordered w-full" placeholder="セイ" />
              </InputWithIcon>
              <InputWithIcon name="givenNameKana" watch={watch} errors={errors} >
                <input {...register('givenNameKana')} id="given-name-kana" className="input input-bordered w-full" placeholder="メイ" />
              </InputWithIcon>
            </div>
            <p className='text-error'>{errors.familyNameKana?.message ?? errors.givenNameKana?.message}</p>
          </div>

          <div>
            <label htmlFor="email" className="label-text">メールアドレス</label>
            <InputWithIcon name="email" watch={watch} errors={errors} >
              <input {...register('email')} id="email" className="input input-bordered w-full pr-14" autoComplete="email" type='email' placeholder="example@studio-firefly.co.jp" />
            </InputWithIcon>
            <p className='text-error'>{errors.email?.message}</p>
          </div>

          <div>
            <label htmlFor="message" className="label-text">お問い合わせ内容</label>
            <InputWithIcon name="message" watch={watch} errors={errors} >
              <textarea {...register('message')} id="message" className="textarea textarea-bordered w-full" rows={4} placeholder="お問い合わせ内容を入力してください" ></textarea>
            </InputWithIcon>
            <p className='text-error'>{errors.message?.message}</p>
          </div>

          <button type="submit" className="btn btn-primary" disabled={!isValid || isSubmitting}>送信</button>
        </div>
      </form>
    </div>
  )
}
