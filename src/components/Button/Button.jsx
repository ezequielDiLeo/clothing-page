import React from 'react'

export const Button = ({ children, className="", onClick }) => {
  return (
    <button 
    onClick={onClick} className={'bg-sky-950 text-center -justify-center p-2 m-2 rounded-lg'}>
      {children}
    </button>
  );
}
