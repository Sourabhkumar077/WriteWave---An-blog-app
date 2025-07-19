import React from 'react';
import logoImg from '../assets/logo.jpg';

function Logo({ width = '100px' }) {
  return (
    <img
      src={logoImg}
      alt="Logo"
      style={{ width, height: 'auto' }}
      className="object-contain"
    />
  );
}

export default Logo;