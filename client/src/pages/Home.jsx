import React from 'react';
import Hero from '../components/Hero';
import { Bell, ArrowRight, Shield, Award, Calendar, Users, MapPin, ExternalLink, Phone, Mail, FileText, CheckCircle2 } from 'lucide-react';

export default function Home({ stats, ano, events = [], announcements = [], achievements = [], cadets = [], setActiveTab }) {
  const handleNav = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pinnedAnnouncements = announcements.filter(a => a.isPinned).slice(0, 3);
  const recentEvents = events.slice(0, 3);
  const recentAchievements = achievements.slice(0, 3);
  const topCadets = cadets.slice(0, 4);

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <Hero stats={stats} setActiveTab={setActiveTab} />

      {/* Announcements Notice Ticker */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="bg-gradient-to-r from-army-900 via-army-800 to-army-900 text-white rounded-2xl shadow-xl p-6 border border-gold-500/30">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-army-700 space-y-2 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-gold-500 text-army-900 rounded-xl animate-pulse">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-gold-400">Latest NCC Notices & Announcements</h3>
                <p className="text-xs text-gray-300">Official circulars from 31 (TN) INDEP COY NCC Unit</p>
              </div>
            </div>
            <button 
              onClick={() => handleNav('announcements')}
              className="text-xs text-gold-400 hover:text-gold-300 font-bold uppercase tracking-wider flex items-center space-x-1"
            >
              <span>View All Notices</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            {pinnedAnnouncements.length > 0 ? (
              pinnedAnnouncements.map((notice) => (
                <div key={notice._id || notice.id} className="bg-army-950/60 p-4 rounded-xl border border-army-700 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-gold-400 mb-1.5">
                      <span className="font-semibold px-2 py-0.5 bg-army-800 rounded border border-army-600">{notice.category}</span>
                      <span>{notice.date}</span>
                    </div>
                    <h4 className="font-bold text-sm text-white line-clamp-2">{notice.title}</h4>
                    <p className="text-xs text-gray-300 mt-1 line-clamp-2">{notice.content}</p>
                  </div>
                  {notice.pdfUrl && (
                    <a 
                      href={notice.pdfUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center space-x-1 text-xs text-gold-400 font-semibold hover:underline"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Download Official PDF Notice</span>
                    </a>
                  )}
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-400 col-span-3">No active announcements at this time.</p>
            )}
          </div>
        </div>
      </section>

      {/* ANO Profile Card Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Image Column */}
            <div className="lg:col-span-5 relative min-h-[320px] bg-army-900 flex items-center justify-center p-6">
              <img 
                src={ano.photoUrl || '/assets/ano_portrait.jpg'} 
                alt={ano.name} 
                className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-2xl shadow-2xl border-4 border-gold-500"
              />
              <div className="absolute bottom-4 left-4 bg-army-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-gold-500/40 text-gold-400 text-xs font-bold">
                {ano.unit || '31 (TN) INDEP COY NCC'}
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center space-x-2 bg-army-100 text-army-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  <Shield className="w-3.5 h-3.5 text-gold-600" />
                  <span>Associate NCC Officer Command</span>
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-army-900">
                  {ano.name || 'Lt. Dr. Manoj Prabhakar B.S.'}
                </h2>
                
                <p className="text-sm font-semibold text-gold-600 tracking-wide">
                  {ano.designation || 'Associate NCC Officer (ANO)'} • {ano.college || 'CSI College of Engineering'}
                </p>

                <p className="text-gray-600 text-sm leading-relaxed pt-2">
                  {ano.biography}
                </p>
              </div>

              {/* Responsibilities list preview */}
              {ano.responsibilities && ano.responsibilities.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <h4 className="text-xs font-bold text-army-900 uppercase tracking-wider">Key Officer Command Responsibilities</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
                    {ano.responsibilities.slice(0, 4).map((resp, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-army-700 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{resp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 flex flex-wrap gap-4 items-center border-t border-gray-100">
                <button
                  onClick={() => handleNav('ano')}
                  className="px-6 py-2.5 rounded-xl bg-army-800 hover:bg-army-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md flex items-center space-x-2"
                >
                  <span>Full Officer Profile & Bio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={`tel:${ano.phone || '9345099378'}`}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs transition-colors flex items-center space-x-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-army-800" />
                  <span>Contact Officer</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Events Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 pb-4 border-b border-gray-200">
          <div>
            <div className="text-xs font-bold text-gold-600 uppercase tracking-widest mb-1">Activities & Parades</div>
            <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-army-900">Recent & Featured Events</h2>
          </div>
          <button
            onClick={() => handleNav('events')}
            className="mt-4 sm:mt-0 text-xs font-bold text-army-800 hover:text-gold-600 uppercase tracking-wider flex items-center space-x-1"
          >
            <span>Explore All Events</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentEvents.map((event) => (
            <div key={event._id || event.id} className="military-card rounded-2xl overflow-hidden flex flex-col justify-between">
              <div>
                <div className="relative h-48 overflow-hidden bg-army-900">
                  <img 
                    src={event.photos && event.photos[0] ? event.photos[0] : '/assets/event_placeholder.jpg'} 
                    alt={event.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-army-900/90 text-gold-400 text-[11px] font-bold px-3 py-1 rounded-full border border-gold-500/40">
                    {event.category}
                  </span>
                  {event.isUpcoming && (
                    <span className="absolute top-3 right-3 bg-rose-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Upcoming
                    </span>
                  )}
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-3 text-xs text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-army-700" />
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

              <div className="p-6 pt-0 flex items-center justify-between">
                <button
                  onClick={() => handleNav('events')}
                  className="text-xs font-bold text-army-800 hover:text-gold-600 flex items-center space-x-1"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {event.reportPdfUrl && (
                  <a
                    href={event.reportPdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-gold-600 hover:underline font-semibold flex items-center space-x-1"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>PDF Report</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cadets Preview Grid */}
      <section className="bg-army-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 pb-4 border-b border-army-700">
            <div>
              <div className="text-xs font-bold text-gold-400 uppercase tracking-widest mb-1">Honor Roll</div>
              <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-white">Our Disciplined Cadets</h2>
            </div>
            <button
              onClick={() => handleNav('cadets')}
              className="mt-4 sm:mt-0 text-xs font-bold text-gold-400 hover:text-gold-300 uppercase tracking-wider flex items-center space-x-1"
            >
              <span>View Full Directory</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topCadets.map((cadet) => (
              <div key={cadet._id || cadet.id} className="bg-army-950 rounded-2xl border border-army-700 p-5 flex flex-col items-center text-center hover:border-gold-500/50 transition-all">
                <div className="relative mb-4">
                  <img 
                    src={cadet.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'} 
                    alt={cadet.name} 
                    className="w-24 h-24 rounded-full object-cover border-2 border-gold-500 shadow-xl"
                  />
                  <span className="absolute bottom-0 right-0 bg-army-800 text-gold-400 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-gold-500">
                    {cadet.rank}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-base text-white">{cadet.name}</h3>
                <p className="text-xs text-gold-400 font-medium mt-0.5">{cadet.department} • {cadet.year}</p>
                <p className="text-[11px] text-gray-400 font-mono mt-1">{cadet.enrollmentNo}</p>

                <div className="mt-4 pt-3 border-t border-army-800 w-full flex items-center justify-between text-[11px] text-gray-300">
                  <span>Blood: <strong className="text-gold-400">{cadet.bloodGroup}</strong></span>
                  <button 
                    onClick={() => handleNav('cadets')}
                    className="text-gold-400 hover:underline font-semibold"
                  >
                    Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-gold-500 via-amber-500 to-gold-600 rounded-3xl p-8 md:p-12 text-army-950 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-1.5 bg-army-950 text-gold-400 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>National & Directorate Recognition</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-extrabold">Excellence in Drill, Shooting & Leadership</h2>
            <p className="text-sm font-medium opacity-90 leading-relaxed">
              Our cadets consistently secure top ranks in Republic Day Camp (RDC) New Delhi, All India Thal Sainik Camp (TSC), and Kovai Group competitions.
            </p>
          </div>

          <button
            onClick={() => handleNav('achievements')}
            className="px-8 py-4 rounded-xl bg-army-950 text-gold-400 hover:bg-army-900 font-bold text-sm uppercase tracking-wider shadow-2xl flex-shrink-0 transition-transform hover:scale-105"
          >
            Explore All Achievements
          </button>
        </div>
      </section>

    </div>
  );
}
