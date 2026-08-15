import React from 'react';
import { Shield, Phone, Mail, Globe, MapPin, ExternalLink, Award, ChevronRight } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  const handleNav = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-army-900 text-gray-300 border-t-4 border-gold-500">
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: College & Unit Details */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 bg-army-950/80 p-3 rounded-2xl border border-army-700 w-fit">
              <div className="bg-white p-1 rounded-lg">
                <img src="/assets/csice_logo.png" alt="CSICE Logo" className="h-8 w-auto object-contain" />
              </div>
              <img src="/assets/ncc_crest.png" alt="NCC Crest" className="h-10 w-auto object-contain" />
              <div>
                <h3 className="font-serif font-bold text-white text-xs leading-snug">CSI College of Engineering</h3>
                <p className="text-[10px] text-gold-400 font-semibold uppercase">31 (TN) INDEP COY NCC</p>
              </div>
            </div>
            
            <p className="text-xs text-gray-300 leading-relaxed font-light">
              Fostering leadership, selfless service, physical fitness, and national integration among youth through disciplined NCC training at Ketti, Ooty.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center space-x-2 bg-army-800 text-gold-400 text-xs px-3 py-1.5 rounded-full border border-gold-500/30 font-semibold tracking-wider uppercase">
                <Shield className="w-3.5 h-3.5" />
                <span>Motto: Unity and Discipline</span>
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider mb-4 border-b border-gold-500/40 pb-2 inline-block">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              {[
                { label: 'Home Page', id: 'home' },
                { label: 'About NCC & Unit History', id: 'about' },
                { label: 'Cadet Directory & Roll', id: 'cadets' },
                { label: 'ANO Profile & Command', id: 'ano' },
                { label: 'Events & Camp Reports', id: 'events' },
                { label: 'Photo & Video Gallery', id: 'gallery' },
                { label: 'Unit Achievements & Medals', id: 'achievements' },
                { label: 'Official Circulars & Notices', id: 'announcements' }
              ].map((link) => (
                <li key={link.id}>
                  <button 
                    onClick={() => handleNav(link.id)}
                    className="hover:text-gold-400 flex items-center space-x-1.5 transition-colors group"
                  >
                    <ChevronRight className="w-3 h-3 text-gold-500 group-hover:translate-x-1 transition-transform" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: ANO & Headquarters */}
          <div>
            <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider mb-4 border-b border-gold-500/40 pb-2 inline-block">
              Unit Administration
            </h4>
            <div className="bg-army-800/80 p-4 rounded-xl border border-army-700 space-y-2 text-xs">
              <p className="font-semibold text-white">Associate NCC Officer (ANO)</p>
              <p className="text-gold-400 font-bold">Lt. Dr. Manoj Prabhakar B.S.</p>
              <p className="text-gray-300">31 (TN) INDEP COY NCC</p>
              <p className="text-gray-400 text-[11px] pt-1">CSI College of Engineering, Ketti, Ooty, The Nilgiris – 643215</p>
              <button 
                onClick={() => handleNav('ano')}
                className="mt-2 text-[11px] text-gold-400 hover:text-gold-300 font-semibold underline flex items-center space-x-1"
              >
                <span>View Officer Biography</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider mb-4 border-b border-gold-500/40 pb-2 inline-block">
              College Headquarters
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">
                  CSI College of Engineering, Ketti, Ooty, The Nilgiris – 643215, Tamil Nadu, India
                </span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a href="tel:9345099378" className="hover:text-gold-400 transition-colors">
                  9345099378 / 0423-2517474
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a href="mailto:office@csice.edu.in" className="hover:text-gold-400 transition-colors">
                  office@csice.edu.in
                </a>
              </li>
              <li className="flex items-center space-x-2.5 pt-1">
                <Globe className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a 
                  href="http://www.csice.edu.in/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-army-800 text-gold-400 hover:bg-gold-500 hover:text-army-900 px-3 py-1.5 rounded-lg border border-gold-500/40 transition-all font-semibold flex items-center space-x-1"
                >
                  <span>www.csice.edu.in</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="bg-army-950 py-4 px-4 text-center border-t border-army-800 text-xs text-gray-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          <p>© 2026 CSICE NCC • CSI College of Engineering. All Rights Reserved.</p>
          <div className="flex items-center space-x-4">
            <span className="text-gray-400">31 (TN) INDEP COY NCC</span>
            <span>•</span>
            <button onClick={() => handleNav('login')} className="hover:text-gold-400 transition-colors">
              Admin Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
