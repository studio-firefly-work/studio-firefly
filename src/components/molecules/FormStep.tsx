import React from 'react'
import classNames from 'classnames'

type FormStepProps = {
  names: string[]
  step: number
}

export const FormStep: React.FC<FormStepProps> = ({ names, step }) => {
  return (
    <div className="text-center">
      <ul className="steps w-full">
        {names.map((name, index) => (
          <li key={index} className={classNames('step', { 'step-primary': index + 1 <= step })}>
            {name}
          </li>
        ))}
      </ul>
    </div>
  )
}
