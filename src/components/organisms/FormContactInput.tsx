import { useEffect } from 'react'
import * as AutoKana from 'vanilla-autokana'
import { useFormContext } from 'react-hook-form'

let autokanaFamilyName: AutoKana.AutoKana
let autokanaGivenName: AutoKana.AutoKana

export default function FormContactInput() {
  const { register, setValue, formState: { errors, isSubmitting, isValid } } = useFormContext();

  useEffect(() => {
    autokanaFamilyName = AutoKana.bind('#family-name', '#family-name-kana', { katakana: true })
    autokanaGivenName = AutoKana.bind('#given-name', '#given-name-kana', { katakana: true })
  }, [])

  const handleFamilyNameInput = () => {
    setValue('familyNameKana', autokanaFamilyName.getFurigana())
  }
  const handleGivenNameInput = () => {
    setValue('givenNameKana', autokanaGivenName.getFurigana())
  }

  return (
    <div className='flex flex-col gap-4'>
      <div>
        <label htmlFor='family-name' className='label-text'>お名前</label>
        <div className='flex gap-4 flex-col md:flex-row'>
          <InputWithIcon name='familyName' >
            <input {...register('familyName')} onInput={handleFamilyNameInput} id='family-name' className='input input-bordered w-full' autoComplete='family-name' placeholder='姓' />
          </InputWithIcon>
          <InputWithIcon name='givenName' >
            <input {...register('givenName')} onInput={handleGivenNameInput} id='given-name' className='input input-bordered w-full' autoComplete='given-name' placeholder='名' />
          </InputWithIcon>
        </div>
        {(errors.familyName || errors.givenName) && <p className='text-error'>{(errors.familyName as any).message ?? (errors.givenName as any).message}</p>}
      </div>

      <div>
        <label htmlFor='family-name-kana' className='label-text'>カナ</label>
        <div className='flex gap-4 flex-col md:flex-row'>
          <InputWithIcon name='familyNameKana' >
            <input {...register('familyNameKana')} id='family-name-kana' className='input input-bordered w-full' placeholder='セイ' />
          </InputWithIcon>
          <InputWithIcon name='givenNameKana' >
            <input {...register('givenNameKana')} id='given-name-kana' className='input input-bordered w-full' placeholder='メイ' />
          </InputWithIcon>
        </div>
        {(errors.familyNameKana || errors.givenNameKana) && <p className='text-error'>{(errors.familyNameKana as any).message ?? (errors.givenNameKana as any).message}</p>}
      </div>

      <div>
        <label htmlFor='email' className='label-text'>メールアドレス</label>
        <InputWithIcon name='email' >
          <input {...register('email')} id='email' className='input input-bordered w-full pr-14' autoComplete='email' type='email' placeholder='example@studio-firefly.co.jp' />
        </InputWithIcon>
        {errors.email && <p className='text-error'>{(errors.email as any).message}</p>}
      </div>

      <div>
        <label htmlFor='message' className='label-text'>お問い合わせ内容</label>
        <InputWithIcon name='message' >
          <textarea {...register('message')} id='message' className='textarea textarea-bordered w-full' rows={4} placeholder='お問い合わせ内容を入力してください' ></textarea>
        </InputWithIcon>
        {errors.message && <p className='text-error'>{(errors.message as any).message}</p>}
      </div>

      <button type='submit' className={`btn btn-primary ${!isValid || isSubmitting ? 'btn-disabled' : ''}`} aria-disabled={!isValid || isSubmitting}>入力内容の確認</button>
    </div >
  )
}

const InputWithIcon = ({ name, children }: any) => {
  const { watch, formState: { errors } } = useFormContext()
  const text = watch(name)

  return (
    <div className='relative flex-1'>
      {children}
      {(() => {
        if (errors[name]?.message) {
          // ×アイコン
          return <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='size-6 text-error absolute right-4 top-2/4 transform -translate-y-1/2'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18 18 6M6 6l12 12' />
          </svg>

        } else if (text) {
          // ✓アイコン
          return <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='size-6 text-success absolute right-4 top-2/4 transform -translate-y-1/2'>
            <path strokeLinecap='round' strokeLinejoin='round' d='m4.5 12.75 6 6 9-13.5' />
          </svg>
        }
      })()}
    </div>
  )
}
