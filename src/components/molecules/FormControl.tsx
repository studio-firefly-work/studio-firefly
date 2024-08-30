import React from 'react'
import { useFormContext } from 'react-hook-form'


export const FormControl = ({ label, id, error, children }: any) => {
  const { formState: { errors } } = useFormContext()
  const name = kebabToCamelCase(id)
  const errorMessage = error || errors[name]?.message
  const borderStyle = errorMessage ? 'input-error' : 'input-success'

  return (
    <div className="form-control w-full">
      <label>
        <span className="label label-text">{label}</span>
        <div className={`input input-bordered flex items-center gap-2 ${borderStyle}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
            <path fill-rule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clip-rule="evenodd"></path>
          </svg>
          <input type="password" className="grow" value="" />
        </div>
      </label >
      {errorMessage && <span className='label label-text-alt text-error'>{errorMessage}</span>}
    </div >
  )
}

function kebabToCamelCase(name: string): string {
  return name.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}