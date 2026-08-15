import React from 'react';
import { Shield, Compass, Calendar, Image as ImageIcon, Users, Award, Flag, ArrowRight } from 'lucide-react';

export default function Hero({ stats = {}, setActiveTab }) {
  const handleNav = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative bg-army-900 text-white overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/ncc_hero_bg.jpg" 
          alt="NCC Drill Parade" 
          className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-army-900 via-army-900/90 to-army-900/75" />
        <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="max-w-3xl space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-army-800/90 backdrop-blur-md px-4 py-2 rounded-full border border-gold-500/40 text-gold-400 text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-xl animate-fade-in">
            <Shield className="w-4 h-4 text-gold-400" />
            <span>Official CSICE NCC Portal</span>
          </div>

          {/* Titles */}
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-serif text-gold-400 tracking-widest font-bold uppercase">
              CSI COLLEGE OF ENGINEERING
            </h2>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-extrabold text-white tracking-tight leading-tight">
              CSICE NCC
            </h1>
            <p className="text-sm sm:text-base font-semibold text-gray-300 tracking-wider uppercase pt-1">
              31 (TN) INDEP COY NCC • KETTI, OOTY
            </p>
            <p className="text-lg sm:text-xl font-serif italic text-gold-400 pt-2 flex items-center space-x-2">
              <span className="h-0.5 w-8 bg-gold-500 inline-block"></span>
              <span>"Unity and Discipline"</span>
              <span className="h-0.5 w-8 bg-gold-500 inline-block"></span>
            </p>
          </div>

          {/* Paragraph Description */}
          <p className="text-gray-300 text-base sm:text-lg font-light leading-relaxed max-w-2xl">
            Empowering young engineers with military discipline, leadership excellence, physical endurance, and a spirit of selfless service to the nation at Ketti, Ooty.
          </p>

          {/* CTA Action Buttons */}
          <div className="pt-4 flex flex-wrap gap-4 items-center">
            <button
              onClick={() => handleNav('about')}
              className="px-6 py-3.5 rounded-xl bg-gold-500 text-army-900 hover:bg-gold-400 font-bold text-sm uppercase tracking-wider shadow-lg shadow-gold-500/20 hover:scale-105 transition-all flex items-center space-x-2"
            >
              <Compass className="w-4 h-4" />
              <span>Explore NCC</span>
            </button>

            <button
              onClick={() => handleNav('events')}
              className="px-6 py-3.5 rounded-xl bg-army-800 hover:bg-army-700 text-white font-bold text-sm uppercase tracking-wider border border-gold-500/40 hover:border-gold-400 transition-all flex items-center space-x-2"
            >
              <Calendar className="w-4 h-4 text-gold-400" />
              <span>View Events</span>
            </button>

            <button
              onClick={() => handleNav('gallery')}
              className="px-6 py-3.5 rounded-xl bg-army-950/80 hover:bg-army-900 text-gray-200 hover:text-white font-semibold text-sm border border-gray-700 transition-all flex items-center space-x-2"
            >
              <ImageIcon className="w-4 h-4 text-gold-400" />
              <span>Cadet Gallery</span>
            </button>
          </div>

        </div>
      </div>

      {/* Floating Statistics Counter Bar */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mb-16">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-gray-900">
          
          <div 
            onClick={() => handleNav('cadets')}
            className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors group"
          >
            <div className="p-3.5 bg-army-100 rounded-xl text-army-800 group-hover:bg-army-800 group-hover:text-gold-400 transition-colors">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-extrabold text-army-900">
                {stats.totalCadets || 104}+
              </div>
              <div className="text-xs sm:text-sm font-semibold text-gray-600">Total Cadets</div>
            </div>
          </div>

          <div 
            onClick={() => handleNav('events')}
            className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors group"
          >
            <div className="p-3.5 bg-gold-100 rounded-xl text-gold-600 group-hover:bg-gold-500 group-hover:text-army-900 transition-colors">
              <Calendar className="w-7 h-7" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-extrabold text-army-900">
                {stats.nccEvents || 42}+
              </div>
              <div className="text-xs sm:text-sm font-semibold text-gray-600">NCC Events</div>
            </div>
          </div>

          <div 
            onClick={() => handleNav('achievements')}
            className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors group"
          >
            <div className="p-3.5 bg-army-100 rounded-xl text-army-800 group-hover:bg-army-800 group-hover:text-gold-400 transition-colors">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-extrabold text-army-900">
                {stats.achievements || 28}+
              </div>
              <div className="text-xs sm:text-sm font-semibold text-gray-600">Achievements</div>
            </div>
          </div>

          <div 
            onClick={() => handleNav('events')}
            className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors group"
          >
            <div className="p-3.5 bg-gold-100 rounded-xl text-gold-600 group-hover:bg-gold-500 group-hover:text-army-900 transition-colors">
              <Flag className="w-7 h-7" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-extrabold text-army-900">
                {stats.campsParticipated || 16}+
              </div>
              <div className="text-xs sm:text-sm font-semibold text-gray-600">Camps Completed</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
