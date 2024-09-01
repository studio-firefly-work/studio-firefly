import React from 'react'
import { useFormContext } from 'react-hook-form'
import type { FieldError } from 'react-hook-form'

type BaseFormFieldProps = {
  label: string
  id: string
  validation?: string
  noLabel?: boolean
  children: React.ReactNode
}

export const BaseFormField: React.FC<BaseFormFieldProps> = ({ label, id, validation = id, noLabel, children }) => {
  const {
    formState: { errors },
  } = useFormContext()
  const error = errors[validation] as FieldError

  if (noLabel) {
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
      <label htmlFor={id} className="label label-text">
        {label}
      </label>
      <div className="relative">{children}</div>
      {error?.message && <span className="label label-text-alt text-error">{error.message}</span>}
    </div>
  )
}
