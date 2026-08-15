import React, { useState, useMemo } from 'react';
import { Calendar, MapPin, Tag, Users, FileText, ExternalLink, Shield, CheckCircle2, Play, X } from 'lucide-react';

export default function Events({ events = [], onOpenLightbox }) {
  const [activeTabType, setActiveTabType] = useState('all'); // 'all', 'upcoming', 'past'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedEventModal, setSelectedEventModal] = useState(null);

  const categories = [
    'All', 'NCC Camp', 'Parade', 'Drill', 'Training', 'Community Service',
    'Blood Donation', 'Tree Plantation', 'Independence Day', 'Republic Day',
    'EBSB', 'RDC', 'YEP', 'Sports', 'Awareness Programme', 'College Event'
  ];

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesCat = selectedCategory === 'All' || event.category === selectedCategory;
      const matchesType = activeTabType === 'all' || 
        (activeTabType === 'upcoming' && event.isUpcoming) || 
        (activeTabType === 'past' && !event.isUpcoming);
      return matchesCat && matchesType;
    });
  }, [events, selectedCategory, activeTabType]);

  return (
    <div className="space-y-12 pb-16 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-army-900 text-white py-14 px-4 sm:px-6 lg:px-8 border-b-4 border-gold-500">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 bg-army-800 px-3.5 py-1.5 rounded-full border border-gold-500/40 text-gold-400 text-xs font-bold uppercase tracking-wider">
            <Shield className="w-4 h-4" />
            <span>Unit Activities & Camp Reports</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-white">NCC Events & Camps</h1>
          <p className="text-gray-300 max-w-2xl text-sm sm:text-base font-light">
            Explore past training camps, ceremonial parades, community service drives, and upcoming unit schedules.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation Tabs & Category Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4">
            
            {/* Status Type Tabs */}
            <div className="flex items-center space-x-2 bg-gray-100 p-1.5 rounded-xl text-xs font-bold">
              {[
                { id: 'all', label: 'All Events' },
                { id: 'upcoming', label: 'Upcoming Schedules' },
                { id: 'past', label: 'Completed Activities' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTabType(t.id)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activeTabType === t.id 
                      ? 'bg-army-800 text-gold-400 shadow-md' 
                      : 'text-gray-600 hover:text-army-900'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Category Filter:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-army-800 outline-none"
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

          </div>
        </div>

        {/* Events Cards Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div key={event._id || event.id} className="military-card rounded-2xl overflow-hidden flex flex-col justify-between">
                <div>
                  
                  {/* Photo Container */}
                  <div className="relative h-52 overflow-hidden bg-army-950">
                    <img 
                      src={event.photos && event.photos[0] ? event.photos[0] : '/assets/event_placeholder.jpg'} 
                      alt={event.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-army-900/90 text-gold-400 text-xs font-bold px-3 py-1 rounded-full border border-gold-500/40">
                      {event.category}
                    </span>
                    {event.isUpcoming ? (
                      <span className="absolute top-3 right-3 bg-rose-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">
                        Upcoming Schedule
                      </span>
                    ) : (
                      <span className="absolute top-3 right-3 bg-emerald-700 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">
                        Completed
                      </span>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <span className="flex items-center space-x-1 font-semibold text-army-900">
                        <Calendar className="w-3.5 h-3.5 text-gold-600" />
                        <span>{event.date}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1 truncate">
                        <MapPin className="w-3.5 h-3.5 text-army-700" />
                        <span className="truncate">{event.location}</span>
                      </span>
                    </div>

                    <h3 className="text-lg font-serif font-bold text-army-900 leading-snug line-clamp-2">
                      {event.title}
                    </h3>

                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                      {event.description}
                    </p>
                  </div>

                </div>

                {/* Footer Controls */}
                <div className="p-6 pt-0 space-y-3">
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedEventModal(event)}
                      className="text-xs font-bold text-army-800 hover:text-gold-600 flex items-center space-x-1"
                    >
                      <span>View Event Details</span>
                      <span>→</span>
                    </button>

                    {event.reportPdfUrl && (
                      <a
                        href={event.reportPdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-gold-600 hover:underline font-bold flex items-center space-x-1"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Download PDF Report</span>
                      </a>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center shadow border border-gray-100 space-y-3">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="text-lg font-serif font-bold text-gray-800">No Events Found</h3>
            <p className="text-xs text-gray-500 max-w-md mx-auto">No NCC event listings match the selected category filter.</p>
          </div>
        )}

      </div>

      {/* Event Details Modal */}
      {selectedEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative border border-gray-100 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <button 
              onClick={() => setSelectedEventModal(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-2 rounded-full bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 pr-8">
              <div className="flex items-center space-x-2 text-xs">
                <span className="bg-army-900 text-gold-400 font-bold px-2.5 py-0.5 rounded">
                  {selectedEventModal.category}
                </span>
                <span className="text-gray-500">•</span>
                <span className="font-semibold text-gray-700">{selectedEventModal.date}</span>
              </div>
              <h2 className="text-2xl font-serif font-extrabold text-army-900 leading-snug">
                {selectedEventModal.title}
              </h2>
              <p className="text-xs text-gray-500 flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-gold-600" />
                <span>{selectedEventModal.location}</span>
              </p>
            </div>

            {/* Event Photos */}
            {selectedEventModal.photos && selectedEventModal.photos.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {selectedEventModal.photos.map((photo, i) => (
                  <img 
                    key={i} 
                    src={photo} 
                    alt="Event detail" 
                    className="w-full h-44 object-cover rounded-xl border border-gray-200 cursor-pointer hover:opacity-90"
                    onClick={() => {
                      if (onOpenLightbox) {
                        onOpenLightbox(selectedEventModal.photos, i);
                      }
                    }}
                  />
                ))}
              </div>
            )}

            {/* Description */}
            <div className="space-y-2">
              <h4 className="font-serif font-bold text-sm text-army-900">Event Overview & Details</h4>
              <p className="text-sm text-gray-700 leading-relaxed font-light whitespace-pre-line">
                {selectedEventModal.description}
              </p>
            </div>

            {/* Participating Cadets */}
            {selectedEventModal.participatingCadets && selectedEventModal.participatingCadets.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <h4 className="font-serif font-bold text-xs text-army-900 uppercase tracking-wider">Participating Cadets</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedEventModal.participatingCadets.map((c, i) => (
                    <span key={i} className="bg-army-50 text-army-900 text-xs px-2.5 py-1 rounded-lg border border-army-100 font-semibold">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* YouTube Link */}
            {selectedEventModal.youtubeLink && (
              <div className="pt-2 border-t border-gray-100 space-y-2">
                <h4 className="font-serif font-bold text-xs text-army-900 uppercase tracking-wider flex items-center space-x-1">
                  <Play className="w-4 h-4 text-red-600" />
                  <span>Video Broadcast</span>
                </h4>
                <a 
                  href={selectedEventModal.youtubeLink} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-xs text-red-600 hover:underline font-bold flex items-center space-x-1"
                >
                  <span>Watch Event Video on YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            {/* PDF Report Download */}
            {selectedEventModal.reportPdfUrl && (
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-600">Official Event Report PDF document attached.</span>
                <a
                  href={selectedEventModal.reportPdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-gold-500 text-army-950 hover:bg-gold-400 font-bold text-xs rounded-xl shadow transition-colors flex items-center space-x-1.5"
                >
                  <FileText className="w-4 h-4" />
                  <span>Download PDF Report</span>
                </a>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
