import React, { useState, useMemo } from 'react';
import { Bell, Search, Shield, Calendar, FileText, Download, Pin } from 'lucide-react';

export default function Announcements({ announcements = [] }) {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');

  const categories = ['All', 'Parade Notice', 'Camp Notification', 'Training Schedule', 'Selection Notice', 'General Notice', 'Meeting'];

  const filteredAnnouncements = useMemo(() => {
    return announcements.filter(item => {
      const matchesSearch = !search || 
        item.title.toLowerCase().includes(search.toLowerCase()) || 
        item.content.toLowerCase().includes(search.toLowerCase());
      const matchesCat = selectedCat === 'All' || item.category === selectedCat;
      return matchesSearch && matchesCat;
    });
  }, [announcements, search, selectedCat]);

  return (
    <div className="space-y-12 pb-16 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-army-900 text-white py-14 px-4 sm:px-6 lg:px-8 border-b-4 border-gold-500">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 bg-army-800 px-3.5 py-1.5 rounded-full border border-gold-500/40 text-gold-400 text-xs font-bold uppercase tracking-wider">
            <Bell className="w-4 h-4" />
            <span>Official Circulars & Notices</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-white">Unit Notice Board</h1>
          <p className="text-gray-300 max-w-2xl text-sm sm:text-base font-light">
            Stay updated with parade schedules, camp selection calls, document verifications, and unit instructions.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Controls Panel */}
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search circulars or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-army-800 outline-none"
            />
          </div>

          <div className="flex items-center space-x-2 w-full md:w-auto">
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Category:</span>
            <select
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-army-800 outline-none"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

        </div>

        {/* Notices List */}
        {filteredAnnouncements.length > 0 ? (
          <div className="space-y-4">
            {filteredAnnouncements.map((notice) => (
              <div 
                key={notice._id || notice.id}
                className={`military-card rounded-2xl p-6 relative border-l-4 ${
                  notice.isPinned ? 'border-l-gold-500 bg-amber-50/30' : 'border-l-army-800'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center space-x-2">
                    {notice.isPinned && (
                      <span className="bg-gold-500 text-army-950 text-[10px] font-extrabold px-2 py-0.5 rounded flex items-center space-x-1">
                        <Pin className="w-3 h-3 fill-army-950" />
                        <span>PINNED NOTICE</span>
                      </span>
                    )}
                    <span className="bg-army-800 text-gold-400 text-xs font-bold px-2.5 py-0.5 rounded">
                      {notice.category}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1 text-xs text-gray-500 font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-army-800" />
                    <span>Issued Date: {notice.date}</span>
                  </div>
                </div>

                <h3 className="font-serif font-bold text-lg text-army-900 mb-2">{notice.title}</h3>
                
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-light whitespace-pre-line mb-4">
                  {notice.content}
                </p>

                {notice.pdfUrl && (
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-end">
                    <a
                      href={notice.pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-1.5 px-4 py-2 bg-army-800 hover:bg-army-700 text-gold-400 text-xs font-bold rounded-xl shadow transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Download Official PDF Circular</span>
                      <Download className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center shadow border border-gray-100 space-y-3">
            <Bell className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="text-lg font-serif font-bold text-gray-800">No Notices Found</h3>
            <p className="text-xs text-gray-500 max-w-md mx-auto">No announcements matched your search query or filter category.</p>
          </div>
        )}

      </div>
    </div>
  );
}
