import React, { useId } from 'react'


function Select({
    options,
    label,
    className = "",
    ...props
}, ref) {
    const id = useId();
    return (
        <div className='w-full'>
            {label && <label htmlFor={id} className=""></label>}
            <select {...props}
                id=""
                ref={ref}
                className={`${className} w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 `}
            >
                {options?.map((Option) => (
                    <Option key={Option.value} value={Option}>
                        {Option}
                    </Option>
                ))}
            </select>
        </div>
    )
}

export default Select