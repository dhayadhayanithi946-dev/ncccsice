import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Delete', isDangerous = true }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 relative">
        <button 
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className={`p-3 rounded-full ${isDangerous ? 'bg-red-100 text-red-600' : 'bg-gold-100 text-gold-600'}`}>
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        </div>

        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
          {message}
        </p>

        <div className="flex items-center justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-5 py-2 text-sm font-semibold text-white rounded-lg shadow-md transition-all ${
              isDangerous 
                ? 'bg-red-600 hover:bg-red-700 shadow-red-600/20' 
                : 'bg-army-800 hover:bg-army-700'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
