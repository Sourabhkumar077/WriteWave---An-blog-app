
import React, { forwardRef, useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = '',
    ...props
}, ref) {
    const id = useId();
    return (
        <div className='w-full'>
            {label && <label
                className='inline-block mb-1 pl-1' htmlFor={id}>
                {label}
            </label>}
            <input
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 ${className}`}
                id={id}
                type={type}
                ref={ref}
                {...props}
            />
        </div>
    )
})

export default forwardRef(Input);