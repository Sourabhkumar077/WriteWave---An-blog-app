import React from 'react';

function Button({
  children,
  type = 'button',
  bgColor = 'bg-blue-600',
  textColor = 'text-white',
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-5 py-2 rounded-3xl font-semibold shadow-sm ${bgColor} ${textColor} hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;