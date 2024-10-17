import React from 'react'
import { useFormContext } from 'react-hook-form'
import type { FieldError } from 'react-hook-form'

type BaseFormFieldProps = {
  label: string
  id: string
  validation?: string
  children: React.ReactNode
}

export const BaseFormField: React.FC<BaseFormFieldProps> = ({ label, id, validation = id, children }) => {
  const {
    formState: { errors },
  } = useFormContext()
  const error = errors[validation] as FieldError

  // 子要素に<label>タグが含まれているかチェック
  const childrenHasLabel = React.Children.toArray(children).some(
    (child) =>
      React.isValidElement(child) && child.type === 'label'
  )

  if (label != '' && childrenHasLabel) {
    return (
      <fieldset className="form-control w-full">
        <legend className="label label-text">{label}</legend>
        <div className="relative">{children}</div>
        {error?.message && <span className="label label-text-alt text-error">{error.message}</span>}
      </fieldset>
    )
  }

  return (
    <div className="form-control w-full">
      {!childrenHasLabel && <label htmlFor={id} className="label label-text">{label}</label>}
      <div className="relative">{children}</div>
      {error?.message && <span className="label label-text-alt text-error">{error.message}</span>}
    </div>
  )
}
