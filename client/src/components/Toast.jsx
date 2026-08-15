import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-gold-400 flex-shrink-0" />
  };

  const bgColors = {
    success: 'bg-army-900 border-emerald-500 text-white',
    error: 'bg-rose-950 border-rose-600 text-white',
    info: 'bg-army-900 border-gold-500 text-white'
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-fade-in max-w-md">
      <div className={`flex items-center space-x-3 p-4 rounded-xl border shadow-2xl ${bgColors[toast.type || 'info']}`}>
        {icons[toast.type || 'info']}
        <p className="text-sm font-medium pr-2">{toast.message}</p>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
