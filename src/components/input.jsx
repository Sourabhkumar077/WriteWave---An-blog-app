
import React, { forwardRef, useId } from 'react';

const Input = React.forwardRef(function Input({
  label,
  type = 'text',
  className = '',
  ...props
}, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          className="inline-block mb-2 pl-1 text-sm font-medium text-gray-700"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition placeholder-gray-400 ${className}`}
        id={id}
        type={type}
        ref={ref}
        {...props}
      />
    </div>
  );
});

export default Input;