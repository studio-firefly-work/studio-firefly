import React from 'react'
import { useFormContext } from 'react-hook-form'

export default function ContactFormConfirm({ setIsConfirming }) {
  const { getValues } = useFormContext()
  const values = getValues()

  return (
    <div className='flex flex-col gap-4'>
      <div>
        <p className='label-text'>お名前</p>
        <p>{values.familyName}({values.familyNameKana}) {values.givenName}({values.givenNameKana})</p>
      </div>

      <div>
        <p className='label-text'>メールアドレス</p>
        <p>{values.email}</p>
      </div>

      <div>
        <p className='label-text'>お問い合わせ内容</p>
        <p>{values.message}</p>
      </div>

      <button type='button' className='btn' onClick={() => setIsConfirming(false)}>入力内容の修正</button>
      <button type='submit' className='btn btn-accent'>お問い合わせを送信</button>
    </div>
  )
}
