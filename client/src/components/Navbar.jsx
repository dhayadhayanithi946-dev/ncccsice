import React, { useState } from 'react';
import { Menu, X, Shield, Phone, Mail, Award, Lock, LogOut } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, isAuthenticated, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About NCC' },
    { id: 'cadets', label: 'Our Cadets' },
    { id: 'ano', label: 'ANO' },
    { id: 'events', label: 'Events' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'announcements', label: 'Announcements' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNav = (id) => {
    setActiveTab(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 shadow-xl">
      {/* Top Banner Bar */}
      <div className="bg-army-900 text-gray-200 text-xs py-2 px-4 border-b border-army-700">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-1 md:space-y-0">
          <div className="flex items-center space-x-4">
            <span className="font-semibold text-gold-400 flex items-center space-x-1">
              <Shield className="w-3.5 h-3.5" />
              <span>31 (TN) INDEP COY NCC</span>
            </span>
            <span className="hidden sm:inline text-gray-400">|</span>
            <span className="hidden sm:inline text-gray-300">CSI College of Engineering, Ketti, Ooty</span>
          </div>

          <div className="flex items-center space-x-5 text-xs text-gray-300">
            <a href="tel:9345099378" className="hover:text-gold-400 flex items-center space-x-1 transition-colors">
              <Phone className="w-3 h-3 text-gold-400" />
              <span>9345099378 / 0423-2517474</span>
            </a>
            <a href="mailto:office@csice.edu.in" className="hover:text-gold-400 flex items-center space-x-1 transition-colors">
              <Mail className="w-3 h-3 text-gold-400" />
              <span>office@csice.edu.in</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-army-800 text-white border-b border-gold-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logos & Branding */}
            <div 
              onClick={() => handleNav('home')}
              className="flex items-center space-x-4 cursor-pointer group py-2"
            >
              <div className="bg-white p-1.5 rounded-xl border border-gold-500/40 shadow-sm group-hover:scale-105 transition-transform flex items-center">
                <img 
                  src="/assets/csice_logo.png" 
                  alt="CSICE College Logo" 
                  className="h-10 sm:h-12 w-auto object-contain" 
                />
              </div>
              <img 
                src="/assets/ncc_crest.png" 
                alt="NCC Crest" 
                className="h-12 sm:h-14 w-auto object-contain filter drop-shadow-md group-hover:scale-105 transition-transform" 
              />
              <div className="flex flex-col border-l border-gold-500/30 pl-3">
                <span className="font-serif font-extrabold text-xl leading-tight text-white tracking-wider group-hover:text-gold-400 transition-colors">
                  CSICE NCC
                </span>
                <span className="text-[11px] font-semibold text-gold-400 tracking-wider uppercase">
                  31 (TN) INDEP COY • CSI COLLEGE OF ENGINEERING
                </span>
              </div>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === link.id
                      ? 'bg-army-700 text-gold-400 border border-gold-500/40 shadow-inner'
                      : 'text-gray-200 hover:text-white hover:bg-army-700/60'
                  }`}
                >
                  {link.label}
                </button>
              ))}

              {isAuthenticated ? (
                <div className="flex items-center space-x-2 ml-3">
                  <button
                    onClick={() => handleNav('admin')}
                    className={`px-3.5 py-2 rounded-lg text-sm font-bold flex items-center space-x-1 border ${
                      activeTab === 'admin'
                        ? 'bg-gold-500 text-army-900 border-gold-400'
                        : 'bg-gold-500/20 text-gold-400 border-gold-500/50 hover:bg-gold-500/30'
                    }`}
                  >
                    <Shield className="w-4 h-4" />
                    <span>Dashboard</span>
                  </button>
                  <button
                    onClick={onLogout}
                    title="Logout Admin"
                    className="p-2 text-rose-300 hover:text-rose-100 hover:bg-rose-900/50 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleNav('login')}
                  className="ml-3 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider bg-gold-500 text-army-900 hover:bg-gold-400 transition-colors shadow-md flex items-center space-x-1.5"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Admin Login</span>
                </button>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="lg:hidden flex items-center space-x-2">
              {isAuthenticated && (
                <button
                  onClick={() => handleNav('admin')}
                  className="px-2.5 py-1.5 bg-gold-500 text-army-900 rounded text-xs font-bold"
                >
                  Admin
                </button>
              )}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 rounded-lg text-gray-200 hover:text-white hover:bg-army-700 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="lg:hidden bg-army-900 border-t border-army-700 px-4 pt-3 pb-6 space-y-2 animate-fade-in">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-base font-medium ${
                  activeTab === link.id
                    ? 'bg-army-700 text-gold-400 font-bold border border-gold-500/30'
                    : 'text-gray-300 hover:text-white hover:bg-army-800'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-3 border-t border-army-800">
              {isAuthenticated ? (
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleNav('admin')}
                    className="w-3/4 text-center py-2.5 rounded-lg font-bold bg-gold-500 text-army-900 text-sm"
                  >
                    Admin Dashboard
                  </button>
                  <button
                    onClick={() => { onLogout(); setIsOpen(false); }}
                    className="p-2.5 text-rose-400 hover:bg-rose-900/40 rounded-lg"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleNav('login')}
                  className="w-full text-center py-2.5 rounded-lg font-bold uppercase text-xs tracking-wider bg-gold-500 text-army-900 hover:bg-gold-400"
                >
                  Admin Portal Login
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
