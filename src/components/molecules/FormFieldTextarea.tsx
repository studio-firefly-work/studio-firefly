import React from 'react'
import classNames from 'classnames';
import { useFormContext } from 'react-hook-form'
import type { FieldError } from 'react-hook-form'
import { BaseFormField } from '@/components/molecules/BaseFormField'

type FormFieldTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string
  id: string
  validation?: string
  rows?: number
  placeholder?: string
}

/**
 * テキストエリアコンポーネント。react-hook-formと統合されています。
 * 
 * @param {string} label - テキストエリアのラベルテキスト。
 * @param {string} id - テキストエリアのIDおよび名前。react-hook-formでの登録に使用されます。
 * @param {string} [validation] - react-hook-formで使用するバリデーションキー。デフォルトは`id`と同じ。
 * @param {number} [rows=4] - テキストエリアの行数。デフォルトは4。
 * @param {string} [placeholder] - テキストエリアのプレースホルダーテキスト。
 */
export const FormFieldTextarea: React.FC<FormFieldTextareaProps> = ({ label, id, validation = id, rows = 4, placeholder, ...rest }) => {
  const { register, watch, formState: { errors } } = useFormContext()
  const error = errors[validation] as FieldError
  const textareaValue = watch(id)

  // クラス名を動的に設定。条件に応じて異なるクラスを適用
  const className = classNames('textarea', 'textarea-bordered', 'w-full', {
    'textarea-error': error?.message, // エラーがある場合
    'textarea-success': !error?.message && textareaValue, // エラーがなく、入力がある場合
  })

  return (
    <BaseFormField label={label} id={id} validation={validation}>
      <textarea {...register(validation)} id={id} rows={rows} placeholder={placeholder} className={className} {...rest} ></textarea>
    </BaseFormField>
  )
}