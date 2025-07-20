import React from 'react';
import logoImg from '../../public/Favicon.png';

function Logo({ width = '50px' }) {
  return (
    <div className="flex items-center gap-2">
      <img
        src={logoImg}
        alt="Logo"
        style={{ width, height: 'auto' }}
        className="object-contain"
      />
      <span className="text-xl font-bold text-gray-800 tracking-wide">Write Wave</span>
    </div>
  );
}

export default Logo;