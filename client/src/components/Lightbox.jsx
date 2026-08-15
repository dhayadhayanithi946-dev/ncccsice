import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar, Tag } from 'lucide-react';

export default function Lightbox({ isOpen, images = [], currentIndex = 0, onClose, onNavigate }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % images.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images, onClose, onNavigate]);

  if (!isOpen || images.length === 0) return null;

  const current = images[currentIndex] || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in">
      <button 
        onClick={onClose}
        className="absolute top-5 right-5 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all z-10"
      >
        <X className="w-6 h-6" />
      </button>

      {images.length > 1 && (
        <>
          <button 
            onClick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
            className="absolute left-5 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all z-10"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button 
            onClick={() => onNavigate((currentIndex + 1) % images.length)}
            className="absolute right-5 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all z-10"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </>
      )}

      <div className="max-w-5xl w-full flex flex-col items-center max-h-[90vh]">
        <div className="relative overflow-hidden rounded-2xl shadow-2xl max-h-[70vh] flex items-center justify-center">
          <img 
            src={current.imageUrl || current} 
            alt={current.title || 'NCC Event Photo'} 
            className="max-h-[70vh] w-auto object-contain rounded-xl"
          />
        </div>

        {(current.title || current.category || current.description) && (
          <div className="mt-4 bg-gray-900/80 backdrop-blur-md border border-white/10 text-white p-5 rounded-2xl max-w-2xl w-full text-center shadow-xl">
            {current.title && <h3 className="text-xl font-bold font-serif text-gold-400 mb-1">{current.title}</h3>}
            
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-300 mb-2">
              {current.category && (
                <span className="flex items-center space-x-1 bg-army-800/80 px-2.5 py-1 rounded-full border border-army-600">
                  <Tag className="w-3 h-3 text-gold-400" />
                  <span>{current.category}</span>
                </span>
              )}
              {current.date && (
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3 text-gold-400" />
                  <span>{current.date}</span>
                </span>
              )}
            </div>

            {current.description && (
              <p className="text-sm text-gray-200 font-light leading-relaxed">{current.description}</p>
            )}
          </div>
        )}

        <div className="text-xs text-white/50 mt-2 font-mono">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}
