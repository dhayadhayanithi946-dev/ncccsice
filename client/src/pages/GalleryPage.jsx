import React, { useState, useMemo } from 'react';
import { Image as ImageIcon, Shield, Maximize2, Tag, Calendar } from 'lucide-react';

export default function GalleryPage({ gallery = [], onOpenLightbox }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Parade', 'Camp', 'Drill', 'Training', 'Community Service', 'Cultural', 'Award Ceremony'];

  const filteredPhotos = useMemo(() => {
    if (selectedCategory === 'All') return gallery;
    return gallery.filter(item => item.category === selectedCategory);
  }, [gallery, selectedCategory]);

  return (
    <div className="space-y-12 pb-16 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-army-900 text-white py-14 px-4 sm:px-6 lg:px-8 border-b-4 border-gold-500">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 bg-army-800 px-3.5 py-1.5 rounded-full border border-gold-500/40 text-gold-400 text-xs font-bold uppercase tracking-wider">
            <Shield className="w-4 h-4" />
            <span>Visual Archive</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-white">NCC Photo Gallery</h1>
          <p className="text-gray-300 max-w-2xl text-sm sm:text-base font-light">
            Moments of discipline, parade precision, camp camaraderie, and award achievements captured on lens.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 bg-white p-3 rounded-2xl shadow border border-gray-100">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-army-800 text-gold-400 shadow-md'
                  : 'text-gray-600 hover:text-army-900 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photos Grid */}
        {filteredPhotos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPhotos.map((photo, index) => (
              <div 
                key={photo._id || photo.id || index}
                onClick={() => onOpenLightbox(filteredPhotos, index)}
                className="group relative h-64 rounded-2xl overflow-hidden shadow-lg border border-gray-200 cursor-pointer bg-army-950"
              >
                <img 
                  src={photo.imageUrl} 
                  alt={photo.title || 'NCC Photo'} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 text-white">
                  <div className="flex items-center justify-between">
                    <span className="bg-army-900/90 text-gold-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-gold-500/40">
                      {photo.category}
                    </span>
                    <Maximize2 className="w-4 h-4 text-gold-400" />
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-serif font-bold text-sm text-gold-400 line-clamp-1">{photo.title}</h4>
                    {photo.description && (
                      <p className="text-[11px] text-gray-300 line-clamp-2 font-light">{photo.description}</p>
                    )}
                    {photo.date && (
                      <p className="text-[10px] text-gray-400 pt-0.5">{photo.date}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center shadow border border-gray-100 space-y-3">
            <ImageIcon className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="text-lg font-serif font-bold text-gray-800">No Photos Found</h3>
            <p className="text-xs text-gray-500 max-w-md mx-auto">No gallery photos match the selected category.</p>
          </div>
        )}

      </div>
    </div>
  );
}
