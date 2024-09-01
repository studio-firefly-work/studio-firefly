import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import type { FieldValues, UseFormReturn } from 'react-hook-form'
import { ZodType } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

type BaseFormProps<TFormValues extends FieldValues> = {
  onSubmit: (values: TFormValues) => void
  schema: ZodType<TFormValues>
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode
}

export const BaseForm = <TFormValues extends FieldValues>({ onSubmit, schema, children }: BaseFormProps<TFormValues>) => {
  const methods = useForm<TFormValues>({ resolver: zodResolver(schema), mode: 'onChange' })

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children(methods)}</form>
    </FormProvider>
  )
}
