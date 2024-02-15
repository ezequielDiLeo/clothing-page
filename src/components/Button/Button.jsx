import React from 'react'

export const Button = ({ children, className="", onClick }) => {
  return (
    <button 
    onClick={onClick} className={`bg-blue-950 text-center -justify-center p-2 m-2 rounded-lg text-white font-semibold ${className}`}>
      {children}
    </button>
  );
}
