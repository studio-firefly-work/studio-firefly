import React from 'react'
import classNames from 'classnames'
import { useFormContext } from 'react-hook-form'
import type { FieldError } from 'react-hook-form'
import { BaseFormField } from '@/components/molecules/BaseFormField'

type FormFieldFormFieldCheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string
  id: string
  items: string[],
  validation?: string
}

/**
 * チェックボックスコンポーネント。react-hook-formと統合されています。
 *
 * @param label - 入力フィールドのラベルテキスト。
 * @param id - 入力フィールドのIDおよび名前。react-hook-formでの登録に使用されます。
 * @param validation - react-hook-formで使用するバリデーションキー。デフォルトは`id`と同じ。
 */
export const FormFieldCheckbox: React.FC<FormFieldFormFieldCheckboxProps> = ({ label, id, items, validation = id, ...rest }) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext()
  const error = errors[validation] as FieldError
  const checkboxValue = watch(id)

  // クラス名を動的に設定。条件に応じて異なるクラスを適用
  const className = classNames('checkbox', {
    'checkbox-error': error?.message, // エラーがある場合
    'checkbox-success': !error?.message && checkboxValue, // エラーがなく、入力がある場合
  })

  return (
    <BaseFormField label={label} id={id} validation={validation}>
      {items.map((item, index) => (
        <label className="label cursor-pointer justify-start gap-2 w-fit" key={index}>
          <input {...register(validation)} type="checkbox" className={className} {...rest} />
          <span className="label-text" dangerouslySetInnerHTML={{ __html: item }}></span>
        </label>
      ))}
    </BaseFormField>
  )
}
