import React from 'react';
import { Shield, Target, Award, Users, Heart, BookOpen, Flag, CheckCircle2, ChevronRight } from 'lucide-react';

export default function About({ setActiveTab }) {
  const handleNav = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 pb-16 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-army-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-b-4 border-gold-500 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-army-800 px-3.5 py-1.5 rounded-full border border-gold-500/40 text-gold-400 text-xs font-bold uppercase tracking-wider">
            <Shield className="w-4 h-4" />
            <span>Official Unit History & Overview</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-white">About National Cadet Corps (NCC)</h1>
          <p className="text-gray-300 max-w-3xl text-base sm:text-lg font-light leading-relaxed">
            Building character, comradeship, discipline, secular outlook, the spirit of adventure, and ideals of selfless service amongst young engineers.
          </p>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section 1: What is NCC & Purpose */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center space-x-2 text-gold-600 font-bold text-xs uppercase tracking-widest">
              <Target className="w-4 h-4" />
              <span>Foundational Principles</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-army-900">
              What is the National Cadet Corps?
            </h2>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              The National Cadet Corps (NCC) is the Indian military cadet corps wing of the Indian Armed Forces with its Headquarters in New Delhi. It is open to school and college students on a voluntary basis. The National Cadet Corps in India is a tri-services organization comprising the Army, Navy, and Air Force, engaged in grooming the youth of the country into disciplined and patriotic citizens.
            </p>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              The motto of NCC is <strong className="text-army-800 font-serif">"Unity and Discipline"</strong>. In living up to its motto, the NCC strives to be and is one of the greatest cohesive forces of the nation, bringing together the youth hailing from different parts of the country and molding them into united, secular, and disciplined citizens.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-army-50 rounded-xl border border-army-100 space-y-1">
                <h4 className="font-serif font-bold text-army-900 text-sm">Character & Leadership</h4>
                <p className="text-xs text-gray-600">Instilling moral integrity, team spirit, and executive decision-making capabilities.</p>
              </div>
              <div className="p-4 bg-gold-100/60 rounded-xl border border-gold-200 space-y-1">
                <h4 className="font-serif font-bold text-army-900 text-sm">Secular Integration</h4>
                <p className="text-xs text-gray-600">Fostering national unity across diverse cultural and geographic backgrounds.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-gold-500">
              <img 
                src="/assets/ncc_hero_bg.jpg" 
                alt="NCC Parade" 
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Section 2: 31 (TN) INDEP COY NCC Unit at CSI College of Engineering */}
        <div className="bg-army-900 text-white rounded-3xl p-8 md:p-12 border border-gold-500/40 shadow-2xl space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center space-x-2 bg-army-800 text-gold-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5" />
              <span>Institutional Unit Profile</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-extrabold text-white">
              31 (TN) INDEP COY NCC Unit
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              The 31 (TN) INDEP COY NCC unit of CSI College of Engineering, Ketti, Ooty functions under Kovai Group HQ, Tamil Nadu, Puducherry & Andaman Directorate. The unit has an authorized strength of senior wing (SW) and senior division (SD) cadets commanded by Associate NCC Officer Lt. Dr. Manoj Prabhakar B.S.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="bg-army-950 p-6 rounded-2xl border border-army-700 space-y-3">
              <div className="p-3 bg-army-800 text-gold-400 rounded-xl w-fit">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-gold-400">Institutional Training</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Regular weekly parade drill training, military tactics, map reading, weapon handling (.22 Deluxe rifle & SLR), fieldcraft, and battlecraft.
              </p>
            </div>

            <div className="bg-army-950 p-6 rounded-2xl border border-army-700 space-y-3">
              <div className="p-3 bg-gold-500 text-army-900 rounded-xl w-fit">
                <Flag className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-gold-400">Camp Training</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Participation in Combined Annual Training Camps (CATC), Republic Day Camp (RDC), Thal Sainik Camp (TSC), and Ek Bharat Shreshtha Bharat (EBSB).
              </p>
            </div>

            <div className="bg-army-950 p-6 rounded-2xl border border-army-700 space-y-3">
              <div className="p-3 bg-army-800 text-gold-400 rounded-xl w-fit">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-gold-400">Community & Social Service</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Voluntary blood donation drives, Swachh Bharat cleanliness campaigns, tree plantation in Nilgiris bio-reserve, disaster relief awareness.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Core Values & Cadet Benefits */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-army-900">Why Join NCC at CSICE?</h2>
            <p className="text-sm text-gray-600">Unlocking career incentives, Armed Forces commission pathways, and lifelong personal growth.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'NCC B & C Certificates',
                desc: 'Earn prestigious B & C certificates with A-Grade rating, opening direct SSB interview entry for Indian Armed Forces commission.'
              },
              {
                title: 'Defense & PSU Reservation',
                desc: 'Special bonus marks and seat reservations in UPSC examinations, Central Armed Police Forces (CAPF), and state police recruitment.'
              },
              {
                title: 'Adventure & Firing Skills',
                desc: 'Hands-on experience in small arms live firing, obstacle courses, trekking in Nilgiris hills, and survival training.'
              },
              {
                title: 'National Integration Camps',
                desc: 'Travel across India representing Tamil Nadu in cultural exchange programs, EBSB camps, and Youth Exchange Program (YEP).'
              },
              {
                title: 'Executive Leadership',
                desc: 'Hold cadet ranks (SUO, JUO, CQMS, SGT) and command platoons during official parades, developing management maturity.'
              },
              {
                title: 'Community Contribution',
                desc: 'Lead social welfare initiatives that directly benefit the local Nilgiris hill communities and tribal settlements.'
              }
            ].map((benefit, i) => (
              <div key={i} className="military-card p-6 rounded-2xl space-y-2">
                <div className="flex items-center space-x-2 text-army-800">
                  <CheckCircle2 className="w-5 h-5 text-gold-600 flex-shrink-0" />
                  <h3 className="font-serif font-bold text-base text-army-900">{benefit.title}</h3>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed pl-7">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
