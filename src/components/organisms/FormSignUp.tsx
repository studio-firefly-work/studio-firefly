import React, { useEffect, useState } from 'react'
import * as AutoKana from 'vanilla-autokana'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '@/api'
import { utils } from '@/utils'
import { BaseForm } from '@/components/molecules/BaseForm'
import { FormFieldText } from '@/components/molecules/FormFieldText'
import { FormFieldCheckbox } from '@/components/molecules/FormFieldCheckbox'

const schema = z.object({
  name: utils.schema.name,
  kana: utils.schema.kana,
  email: utils.schema.email,
  password: utils.schema.password,
  privacy: utils.schema.privacy,
})
type FormSignUpDataType = z.infer<typeof schema>

let kana: AutoKana.AutoKana

export const FormSignUp = () => {
  const [formStatus, setFormStatus] = useState<'edit' | 'confirm' | 'complete'>('edit')

  const onSubmit = async (data: FormSignUpDataType) => {
    switch (formStatus) {
      case 'edit':
        setFormStatus('confirm')
        break
      case 'confirm':
        const res = await api.user.createUser(data)
        if (res?.ok) {
          setFormStatus('complete')
        }
        break
    }
  }

  return (
    <>
      <div className="text-center">
        <ul className="steps w-full">
          <li className="step step-primary">入力</li>
          <li className={`step ${formStatus !== 'edit' ? 'step-primary' : ''}`}>確認</li>
          <li className={`step ${formStatus === 'complete' ? 'step-primary' : ''}`}>完了</li>
        </ul>
      </div>

      <BaseForm<FormSignUpDataType> onSubmit={onSubmit} schema={schema}>
        {({ formState: { isSubmitting, isValid }, setValue, getValues }) => {
          useEffect(() => {
            if (formStatus === 'edit') {
              kana = AutoKana.bind('#name', '#kana', { katakana: true })
            }
          }, [formStatus])

          const handleNameInput = () => {
            if (formStatus === 'edit') {
              setValue('kana', kana.getFurigana())
            }
          }

          return (
            <div className="flex flex-col gap-4">
              {formStatus === 'edit' && (
                <>
                  <FormFieldText label="お名前" id="name" placeholder="山田太郎" autoComplete="name" icon="icon-user" onInput={handleNameInput} />

                  <FormFieldText label="フリガナ" id="kana" placeholder="ヤマダタロウ" />

                  <FormFieldText label="メールアドレス" id="new-email" validation="email" type="email" placeholder="email@example.com" autoComplete="email" icon="icon-envelope" />

                  <FormFieldText label="パスワード" id="new-password" validation="password" type="password" autoComplete="new-password" icon="icon-key" />

                  <FormFieldCheckbox label="" id="privacy" items={['<a href="/privacy/" class="link" target="_blank">プライバシーポリシー</a>に同意する']} />

                  <button type="submit" className={`btn btn-primary ${!isValid || isSubmitting ? 'btn-disabled' : ''}`} aria-disabled={!isValid || isSubmitting}>
                    入力内容の確認
                  </button></>
              )}

              {formStatus === 'confirm' && (
                <>
                  <div>
                    <p className="label-text">お名前</p>
                    <p>
                      {getValues('name')}({getValues('kana')})
                    </p>
                  </div>

                  <div>
                    <p className="label-text">メールアドレス</p>
                    <p>{getValues('email')}</p>
                  </div>

                  <div>
                    <p className="label-text">パスワード</p>
                    <p>{'•'.repeat(getValues('password').length)}</p>
                  </div>

                  <div className='flex gap-4 md:flex-row flex-col'>
                    <button type="submit" className="btn btn-accent md:w-1/2 md:order-2">
                      新規登録
                    </button>
                    <button type="button" className="btn md:w-1/2 md:order-1" onClick={() => setFormStatus('edit')}>
                      入力内容の修正
                    </button>
                  </div>
                </>
              )}

              {formStatus === 'complete' && (
                <>
                  <p>ユーザー登録が正常に完了しました</p>
                  <a href="/" className="btn btn-neutral">
                    ホームへ戻る
                  </a>
                </>
              )}
            </div>
          )
        }}
      </BaseForm>
    </>
  )
}
