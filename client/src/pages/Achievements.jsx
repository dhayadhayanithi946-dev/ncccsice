import React from 'react';
import { Award, Shield, Calendar, Star, Trophy, Medal, CheckCircle2 } from 'lucide-react';

export default function Achievements({ achievements = [] }) {
  return (
    <div className="space-y-12 pb-16 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-army-900 text-white py-14 px-4 sm:px-6 lg:px-8 border-b-4 border-gold-500">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 bg-army-800 px-3.5 py-1.5 rounded-full border border-gold-500/40 text-gold-400 text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Honours & Trophies</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-white">Unit Achievements & Medals</h1>
          <p className="text-gray-300 max-w-2xl text-sm sm:text-base font-light">
            Recognizing outstanding performance in Republic Day Camp (RDC), Thal Sainik Camp (TSC), shooting championships, and best cadet selections.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Highlights Banner */}
        <div className="bg-gradient-to-r from-gold-500 via-amber-500 to-gold-600 rounded-3xl p-8 text-army-950 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-army-950 text-gold-400 rounded-2xl shadow-xl">
              <Trophy className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-2xl font-serif font-extrabold">Hall of Honor & Merit</h2>
              <p className="text-xs font-semibold opacity-90">31 (TN) INDEP COY NCC • Kovai Group HQ Excellence</p>
            </div>
          </div>
          <div className="bg-army-950/90 text-gold-400 px-5 py-2.5 rounded-2xl border border-gold-400 text-xs font-extrabold uppercase tracking-wider">
            Grade A Certified Unit
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievements.map((ach) => (
            <div key={ach._id || ach.id} className="military-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={ach.imageUrl || '/assets/csice_logo.png'} 
                      alt={ach.title} 
                      className="w-14 h-14 rounded-xl object-contain bg-army-900 p-2 border border-gold-500"
                    />
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider bg-gold-100 text-gold-800 px-2 py-0.5 rounded">
                        {ach.category || 'Best Cadet'}
                      </span>
                      <h3 className="font-serif font-bold text-lg text-army-900 pt-1 leading-snug">{ach.title}</h3>
                    </div>
                  </div>
                </div>

                <div className="bg-army-50/70 p-4 rounded-xl space-y-1.5 border border-army-100 text-xs">
                  <p className="font-semibold text-army-900">
                    Awardee: <span className="text-gold-600 font-extrabold">{ach.cadetName}</span>
                  </p>
                  <p className="text-gray-600">
                    Event: <strong>{ach.event}</strong>
                  </p>
                  <p className="text-gray-500 text-[11px]">
                    Date Awarded: {ach.date}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-light">
                  {ach.description}
                </p>

              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-army-800 font-semibold">
                <span className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
                  <span>Official Commendation</span>
                </span>
                <span className="text-gold-600 font-mono">31 (TN) INDEP COY</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
