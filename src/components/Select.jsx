import React, { useId, forwardRef } from 'react';

const Select = forwardRef(function Select({
  options = [],
  label,
  className = '',
  ...props
}, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="inline-block mb-2 pl-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        id={id}
        ref={ref}
        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value || option} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;