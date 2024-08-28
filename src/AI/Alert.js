import React from 'react';

export default function Alert({ alert, onClose }) {
  if (!alert) return null;

  const alertTypeClass = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-green-400 text-green-700';
      case 'error':
        return 'bg-red-100 border-red-400 text-red-700';
      case 'warning':
        return 'bg-yellow-100 border-yellow-400 text-yellow-700';
      case 'info':
        return 'bg-blue-100 border-blue-400 text-blue-700';
      default:
        return 'bg-gray-100 border-gray-400 text-gray-700';
    }
  };

  return (
    <div
      className={`relative border-l-4 p-4 mb-4 ${alertTypeClass(alert.type)}  `}
      style={{height:'50px',width:'auto',marginTop:"60px" }}
      role="alert"
    >
      <strong>{alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}</strong>: {alert.msg}
      <button
        type="button"
        className="absolute top-0 bottom-0 right-0 px-4 py-3 text-black"
        aria-label="Close"
        onClick={onClose}
      >
        &times;
      </button>
    </div>
  );
}
