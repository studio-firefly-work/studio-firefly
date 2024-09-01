import React from 'react'
import { useFormContext } from 'react-hook-form'

interface FormFieldType {
  label: string
  id: string
  error?: any
  children: any
}

interface FieldInputType {
  id: string
  name: string
  type?: string
  placeholder?: string
  autoComplete?: string
  onInput?: React.FormEventHandler<HTMLInputElement>
}

interface FieldTextareaType {
  id: string
  name: string
  rows?: number
  placeholder?: string
}

/**
 * @param {string} id - ケバブケースで指定してください。
 * @param {string} [error] - error == errors[name].messageの場合、errorを省略できます。nameはidをキャメルケースに変換した文字列です。
 */
export const FormField: React.FC<FormFieldType> = ({ label, id, error, children }) => {
  if (!isKebabCase(id)) {
    throw new Error(`id "${id}" is not in kebab-case format`)
  }

  const {
    formState: { errors },
  } = useFormContext()
  const name = kebabToCamelCase(id)
  const errorMessage = error || errors[name]?.message

  return (
    <div>
      <label htmlFor={id} className="label-text">
        {label}
      </label>
      <div className="flex flex-col gap-4 md:flex-row">{children}</div>
      {errorMessage && <p className="text-error">{errorMessage}</p>}
    </div>
  )
}

/**
 * @param {string} id - ケバブケースで指定してください。
 * @param {string} name - キャメルケースで指定してください。
 */
export const FieldInput: React.FC<FieldInputType> = ({ id, name, type = 'text', placeholder = '', autoComplete = '', onInput }) => {
  if (!isKebabCase(id)) {
    throw new Error(`id "${id}" is not in kebab-case format`)
  }
  if (!isCamelCase(name)) {
    throw new Error(`name "${name}" is not in camelCase format`)
  }

  const { register } = useFormContext()

  return (
    <FieldHasIcon name={name}>
      <input {...register(name)} id={id} className="input input-bordered w-full pr-14" type={type} placeholder={placeholder} autoComplete={autoComplete} onInput={onInput} />
    </FieldHasIcon>
  )
}

/**
 * @param {string} id - ケバブケースで指定してください。
 * @param {string} name - キャメルケースで指定してください。
 */
export const FieldTextarea: React.FC<FieldTextareaType> = ({ id, name, rows = 4, placeholder = '' }) => {
  if (!isKebabCase(id)) {
    throw new Error(`id "${id}" is not in kebab-case format`)
  }
  if (!isCamelCase(name)) {
    throw new Error(`name "${name}" is not in camelCase format`)
  }

  const { register } = useFormContext()

  return (
    <FieldHasIcon name={name}>
      <textarea {...register(name)} id={id} className="textarea textarea-bordered w-full pr-14" rows={rows} placeholder={placeholder}></textarea>
    </FieldHasIcon>
  )
}

export const FieldHasIcon = ({ name, children }: any) => {
  const {
    watch,
    formState: { errors },
  } = useFormContext()
  const text = watch(name)

  return (
    <div className="relative flex-1">
      {children}
      {(() => {
        if (errors[name]?.message) {
          // ×アイコン
          return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute right-4 top-2/4 size-6 -translate-y-1/2 transform text-error">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          )
        } else if (text) {
          // ✓アイコン
          return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute right-4 top-2/4 size-6 -translate-y-1/2 transform text-success">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          )
        }
      })()}
    </div>
  )
}

function isKebabCase(str: string): boolean {
  return /^[a-z]+(-[a-z]+)*$/.test(str)
}

function isCamelCase(str: string): boolean {
  return /^[a-z]+([A-Z][a-z]*)*$/.test(str)
}

function kebabToCamelCase(name: string): string {
  return name.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
}
