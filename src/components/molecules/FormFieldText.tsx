import React, { useState } from 'react'
import classNames from 'classnames'
import { useFormContext } from 'react-hook-form'
import type { FieldError } from 'react-hook-form'
import { Icon } from '@iconify/react'
import { BaseFormField } from '@/components/molecules/BaseFormField'

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
 * @param label - 入力フィールドのラベルテキスト。
 * @param id - 入力フィールドのIDおよび名前。react-hook-formでの登録に使用されます。
 * @param validation - react-hook-formで使用するバリデーションキー。デフォルトは`id`と同じ。
 * @param type - 入力フィールドのタイプ。デフォルトは'text'。
 * @param placeholder - 入力フィールドのプレースホルダーテキスト。
 * @param icon - 入力フィールドの左側に表示するアイコンの名前。
 */
export const FormFieldText: React.FC<FormFieldTextProps> = ({ label, id, validation = id, type = 'text', placeholder, icon, ...rest }) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext()
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
      {icon && <Icon icon={icon} className="absolute inset-y-0 left-4 h-full opacity-70" width={20} height={20} />}

      <input {...register(validation)} id={id} type={type === 'password' && isPasswordVisible ? 'text' : type} placeholder={placeholder} className={className} {...rest} />

      {type === 'password' && (
        <label className="swap absolute inset-y-0 right-4">
          <input type="checkbox" tabIndex={-1} onChange={togglePasswordVisibility} checked={isPasswordVisible} />
          <Icon icon="mdi:eye" className="swap-on h-full opacity-70" width={20} height={20} />
          <Icon icon="mdi:eye-off" className="swap-off h-full opacity-70" width={20} height={20} />
        </label>
      )}
    </BaseFormField>
  )
}
