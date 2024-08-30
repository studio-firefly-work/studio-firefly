import React, { useState } from 'react'
import classNames from 'classnames';
import { useFormContext } from 'react-hook-form'
import type { FieldError } from 'react-hook-form'
import { BaseFormField } from '@/components/molecules/BaseFormField'
import Icon from '@/components/atoms/Icon'

type InputType = 'text' | 'password' | 'email' | 'number' | 'tel'
type FormFieldTextProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string
  id: string
  validation?: string
  type?: InputType
  placeholder?: string
  autoComplete?: string
  icon?: string
}

/**
 * テキスト入力フォームコンポーネント。react-hook-formと統合されています。
 * 
 * @param {string} label - 入力フィールドのラベルテキスト。
 * @param {string} id - 入力フィールドのIDおよび名前。react-hook-formでの登録に使用されます。
 * @param {string} [validation] - react-hook-formで使用するバリデーションキー。デフォルトは`id`と同じ。
 * @param {string} [type='text'] - 入力フィールドのタイプ。デフォルトは'text'。
 * @param {string} [placeholder] - 入力フィールドのプレースホルダーテキスト。
 * @param {string} [icon] - 入力フィールドの左側に表示するアイコンの名前。
 */
export const FormFieldText: React.FC<FormFieldTextProps> = ({ label, id, validation = id, type = 'text', placeholder, icon, ...rest }) => {
  const { register, watch, formState: { errors } } = useFormContext()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false) // パスワード表示/非表示の状態を管理
  const error = errors[validation] as FieldError
  const inputValue = watch(validation)

  // クラス名を動的に設定。条件に応じて異なるクラスを適用。
  const className = classNames('input', 'input-bordered', 'w-full', {
    'pl-12': icon, // iconがある場合
    'input-error': error?.message, // エラーがある場合
    'input-success': !error?.message && inputValue, // エラーがなく、入力がある場合
  })

  // パスワード表示/非表示の切り替え
  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible)

  return (
    <BaseFormField label={label} id={id} validation={validation}>
      {icon && <Icon name={icon} className='h-full opacity-70 absolute left-4 inset-y-0' />}

      <input
        {...register(validation)}
        id={id}
        type={type === 'password' && isPasswordVisible ? 'text' : type}
        placeholder={placeholder}
        className={className}
        {...rest}
      />

      {type === 'password' &&
        <label className="swap absolute inset-y-0 right-4" >
          <input type="checkbox" tabIndex={-1} onChange={togglePasswordVisibility} checked={isPasswordVisible} />
          <Icon name="icon-eye" className='swap-on h-full opacity-70' />
          <Icon name="icon-eye-slash" className='swap-off h-full opacity-70' />
        </label>
      }
    </BaseFormField>
  )
}