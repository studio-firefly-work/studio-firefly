import React from 'react'
import { tv } from 'tailwind-variants'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string
  className?: string
}

const Icon: React.FC<IconProps> = ({ name, className = '', ...rest }) => {
  const style = tv({
    base: `h-5 w-5 ${className || ''}`,
  })

  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={style()} {...rest}>
      <use href={`#${name}`} />
    </svg>
  )
}

export default Icon
