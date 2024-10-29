import React from 'react';

const Alert = ({ message, type, visible, onClose }) => {
  if (!visible) return null; 

  return (
    <div 
      className={`fixed bottom-4 right-4 z-50 p-4 pt-1 pb-1 rounded-md border border-05 bg-customdark ${
        type === "success" ? "border-success text-success" : "border-danger text-danger"
      }`}
    >
      <div className="flex justify-between">
        <span >{message}</span>
        <button onClick={onClose} className="ml-4 text-xl">✖</button>
      </div>
    </div>
  );
};

export default Alert;
