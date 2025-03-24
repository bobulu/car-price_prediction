import React from 'react'

const Button = ({
    children,
    type='button',
    bgColor='bg-blue-600',
    textColor='text-white',
    className='',
    ...props

}) => {
  return (
    <button className={`px-7 py-3 rounded-lg ${className} ${bgColor}`}{...props}>
        {children}
    </button>
  )
}

export default Button