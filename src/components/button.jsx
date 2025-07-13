import React from 'react'

function button({
    children,
    type="button",
    bgColor="bg-blue-600",
    textColor="text-white",
    className ='',
    ...props

}) {
  return (
    // resuable button syntax 
    <button type={type} className={`px-4 py-2 rounded-3xlr${bgColor} ${textColor} ${className}`} {...props}>
        {children}
    </button>
  )
}

export default button