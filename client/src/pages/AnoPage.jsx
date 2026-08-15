import React from 'react';
import { Shield, Phone, Mail, MapPin, CheckCircle2, Award, BookOpen, Calendar, Edit3 } from 'lucide-react';

export default function AnoPage({ ano = {}, isAuthenticated, setActiveTab }) {
  const handleNav = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-12 pb-16 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-army-900 text-white py-14 px-4 sm:px-6 lg:px-8 border-b-4 border-gold-500 relative">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 bg-army-800 px-3.5 py-1.5 rounded-full border border-gold-500/40 text-gold-400 text-xs font-bold uppercase tracking-wider">
            <Shield className="w-4 h-4" />
            <span>Unit Command & Leadership</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-white">Associate NCC Officer (ANO)</h1>
          <p className="text-gold-400 text-base sm:text-lg font-medium">31 (TN) INDEP COY NCC • CSI College of Engineering</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Officer Portrait & Card Sidebar */}
            <div className="lg:col-span-5 bg-army-950 p-8 sm:p-12 text-white flex flex-col items-center justify-between space-y-6 relative">
              <div className="text-center space-y-4 w-full">
                <div className="relative inline-block">
                  <img 
                    src={ano.photoUrl || '/assets/ano_portrait.jpg'} 
                    alt={ano.name} 
                    className="w-56 h-56 sm:w-64 sm:h-64 object-cover rounded-2xl border-4 border-gold-500 shadow-2xl mx-auto"
                  />
                  <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gold-500 text-army-950 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg whitespace-nowrap">
                    Rank: Lieutenant (Lt.)
                  </span>
                </div>

                <div className="pt-4 space-y-1">
                  <h2 className="font-serif font-extrabold text-2xl text-white">{ano.name || 'Lt. Dr. Manoj Prabhakar B.S.'}</h2>
                  <p className="text-xs font-bold text-gold-400 uppercase tracking-widest">{ano.designation || 'Associate NCC Officer (ANO)'}</p>
                  <p className="text-xs text-gray-300 font-medium">{ano.unit || '31 (TN) INDEP COY NCC'}</p>
                </div>
              </div>

              {/* Quick Contact Info */}
              <div className="w-full bg-army-900/80 p-4 rounded-xl border border-army-800 space-y-3 text-xs">
                <div className="flex items-center space-x-2 text-gray-300">
                  <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span>CSI College of Engineering, Ketti, Ooty</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <a href={`tel:${ano.phone || '9345099378'}`} className="hover:text-gold-400 transition-colors font-semibold">
                    {ano.phone || '9345099378 / 0423-2517474'}
                  </a>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <a href={`mailto:${ano.email || 'office@csice.edu.in'}`} className="hover:text-gold-400 transition-colors font-semibold">
                    {ano.email || 'office@csice.edu.in'}
                  </a>
                </div>
              </div>

              {isAuthenticated && (
                <button
                  onClick={() => handleNav('admin')}
                  className="w-full py-2.5 bg-gold-500 text-army-950 font-bold text-xs rounded-xl hover:bg-gold-400 transition-colors flex items-center justify-center space-x-1.5"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Officer Details in Admin</span>
                </button>
              )}

            </div>

            {/* Biography & Responsibilities Column */}
            <div className="lg:col-span-7 p-8 sm:p-12 space-y-8 flex flex-col justify-between">
              
              {/* Biography */}
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 text-gold-600 font-bold text-xs uppercase tracking-widest">
                  <BookOpen className="w-4 h-4 text-army-800" />
                  <span>Officer Profile & Academic Background</span>
                </div>
                <h3 className="text-2xl font-serif font-extrabold text-army-900">Biography & Leadership Record</h3>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  {ano.biography || 'Lt. Dr. Manoj Prabhakar B.S. serves as the Associate NCC Officer leading 31 (TN) INDEP COY NCC at CSI College of Engineering. He underwent rigorous Officer Training Academy (OTA) Commissioning Course at Kamptee / Gwalior and has been instrumental in instilling military discipline, physical endurance, and national integration among engineering students.'}
                </p>
              </div>

              {/* Responsibilities */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h4 className="font-serif font-bold text-lg text-army-900 flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-gold-600" />
                  <span>Command & Officer Responsibilities</span>
                </h4>

                <div className="space-y-3">
                  {(ano.responsibilities || [
                    'Commanding and administering the 31 (TN) INDEP COY NCC unit at CSI College of Engineering.',
                    'Planning and supervising weekly drill parades, weapon training, map reading, and fieldcraft modules.',
                    'Shortlisting and mentoring cadets for Republic Day Camp (RDC) New Delhi, Thal Sainik Camp (TSC), and EBSB camps.',
                    'Conducting voluntary blood donation drives, environmental tree plantations, and district disaster response drills.'
                  ]).map((item, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-army-50/60 rounded-xl border border-army-100 text-xs sm:text-sm text-gray-800">
                      <CheckCircle2 className="w-4 h-4 text-army-800 flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-gray-100 flex flex-wrap gap-4">
                <button
                  onClick={() => handleNav('contact')}
                  className="px-6 py-3 rounded-xl bg-army-800 hover:bg-army-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors flex items-center space-x-2"
                >
                  <Mail className="w-4 h-4 text-gold-400" />
                  <span>Send Message to ANO Office</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
