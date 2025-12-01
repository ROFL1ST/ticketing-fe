import { useState, useEffect } from 'react';
import { registerToast } from '../utils/toast';

const Toast = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    registerToast((message, type) => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message, type }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    });
  }, []);

  const getToastStyles = (type) => {
    const baseStyles = 'p-4 rounded-lg shadow-lg text-white min-w-[300px]';
    const typeStyles = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      warning: 'bg-yellow-500',
      info: 'bg-blue-500',
    };
    return `${baseStyles} ${typeStyles[type] || typeStyles.info}`;
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={getToastStyles(toast.type)}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};

export default Toast;