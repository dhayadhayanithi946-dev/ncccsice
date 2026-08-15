import React, { useState, useMemo } from 'react';
import { Search, Filter, Shield, User, Award, FileCheck, Droplet, Phone, Mail, X } from 'lucide-react';

export default function Cadets({ cadets = [] }) {
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedRank, setSelectedRank] = useState('All');
  const [selectedCadetModal, setSelectedCadetModal] = useState(null);

  const departments = ['All', 'Computer Science', 'Electronics & Comm.', 'Electrical & Electronics', 'Mechanical Engg.', 'Civil Engg.', 'Information Tech.'];
  const years = ['All', 'I Year', 'II Year', 'III Year', 'IV Year'];
  const ranks = ['All', 'CDT', 'LCPL', 'CPL', 'SGT', 'CQMS', 'JUO', 'SUO'];

  const filteredCadets = useMemo(() => {
    return cadets.filter(cadet => {
      const matchesSearch = !search || 
        cadet.name.toLowerCase().includes(search.toLowerCase()) || 
        cadet.enrollmentNo.toLowerCase().includes(search.toLowerCase());
      
      const matchesDept = selectedDept === 'All' || cadet.department === selectedDept;
      const matchesYear = selectedYear === 'All' || cadet.year === selectedYear;
      const matchesRank = selectedRank === 'All' || cadet.rank === selectedRank;

      return matchesSearch && matchesDept && matchesYear && matchesRank;
    });
  }, [cadets, search, selectedDept, selectedYear, selectedRank]);

  return (
    <div className="space-y-12 pb-16 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-army-900 text-white py-14 px-4 sm:px-6 lg:px-8 border-b-4 border-gold-500">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 bg-army-800 px-3.5 py-1.5 rounded-full border border-gold-500/40 text-gold-400 text-xs font-bold uppercase tracking-wider">
            <Shield className="w-4 h-4" />
            <span>Official Cadet Directory</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-white">31 (TN) INDEP COY Cadets</h1>
          <p className="text-gray-300 max-w-2xl text-sm sm:text-base font-light">
            Search and explore our disciplined engineering cadets across ranks, departments, and years of training.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Search & Multi-Filter Control Panel */}
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* Search Input */}
            <div className="relative md:col-span-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search Cadet Name or Regt No..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-army-800 focus:bg-white transition-all outline-none"
              />
            </div>

            {/* Department Filter */}
            <div>
              <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">Department</label>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-army-800 outline-none"
              >
                {departments.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            {/* Rank Filter */}
            <div>
              <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">Cadet Rank</label>
              <select
                value={selectedRank}
                onChange={(e) => setSelectedRank(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-army-800 outline-none"
              >
                {ranks.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            {/* Year Filter */}
            <div>
              <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">Academic Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-army-800 outline-none"
              >
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>

          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs text-gray-500">
            <span>Showing <strong className="text-army-900">{filteredCadets.length}</strong> cadets</span>
            {(search || selectedDept !== 'All' || selectedYear !== 'All' || selectedRank !== 'All') && (
              <button
                onClick={() => { setSearch(''); setSelectedDept('All'); setSelectedYear('All'); setSelectedRank('All'); }}
                className="text-gold-600 hover:underline font-semibold"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </div>

        {/* Cadet Cards Grid */}
        {filteredCadets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCadets.map((cadet) => (
              <div 
                key={cadet._id || cadet.id} 
                onClick={() => setSelectedCadetModal(cadet)}
                className="military-card rounded-2xl p-6 flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="relative">
                      <img 
                        src={cadet.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'} 
                        alt={cadet.name} 
                        className="w-20 h-20 rounded-2xl object-cover border-2 border-gold-500 shadow-md group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute -bottom-2 -right-2 bg-army-900 text-gold-400 font-extrabold text-[10px] px-2 py-0.5 rounded-md border border-gold-500 shadow">
                        {cadet.rank}
                      </span>
                    </div>

                    <div className="space-y-1 flex-1">
                      <h3 className="font-serif font-bold text-base text-army-900 group-hover:text-gold-600 transition-colors">
                        {cadet.name}
                      </h3>
                      <p className="text-xs font-semibold text-gray-700">{cadet.department}</p>
                      <p className="text-[11px] text-gray-500">{cadet.year}</p>
                      <p className="text-[11px] font-mono text-army-800 font-bold bg-army-50 px-2 py-0.5 rounded inline-block">
                        {cadet.enrollmentNo}
                      </p>
                    </div>
                  </div>

                  {/* Blood Group & Badges */}
                  <div className="grid grid-cols-2 gap-2 text-xs py-3 border-t border-gray-100 text-gray-600">
                    <div className="flex items-center space-x-1.5">
                      <Droplet className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                      <span>Blood Group: <strong className="text-gray-900">{cadet.bloodGroup || 'O+'}</strong></span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <Award className="w-3.5 h-3.5 text-gold-600 flex-shrink-0" />
                      <span className="truncate">Certs: <strong className="text-gray-900">{cadet.certificates ? cadet.certificates.length : 0}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-army-800 font-bold group-hover:text-gold-600">
                  <span>View Cadet Profile</span>
                  <span>→</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center shadow border border-gray-100 space-y-3">
            <User className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="text-lg font-serif font-bold text-gray-800">No Cadets Found</h3>
            <p className="text-xs text-gray-500 max-w-md mx-auto">No cadet records matched your search query or criteria. Try adjusting your filters.</p>
          </div>
        )}

      </div>

      {/* Cadet Detail Modal View */}
      {selectedCadetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative border border-gray-100 space-y-6 max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setSelectedCadetModal(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-2 rounded-full bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-5">
              <img 
                src={selectedCadetModal.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'} 
                alt={selectedCadetModal.name} 
                className="w-24 h-24 rounded-2xl object-cover border-4 border-gold-500 shadow-lg"
              />
              <div className="space-y-1">
                <span className="bg-army-900 text-gold-400 font-extrabold text-xs px-2.5 py-1 rounded border border-gold-500">
                  Rank: {selectedCadetModal.rank}
                </span>
                <h3 className="text-2xl font-serif font-bold text-army-900 pt-1">{selectedCadetModal.name}</h3>
                <p className="text-xs font-semibold text-gray-600">{selectedCadetModal.department} • {selectedCadetModal.year}</p>
                <p className="text-xs font-mono text-gold-600 font-bold">Enrollment: {selectedCadetModal.enrollmentNo}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-army-50 p-4 rounded-xl text-xs text-army-900 font-medium">
              <div>
                <span className="text-gray-500">Blood Group:</span> <strong className="text-rose-600">{selectedCadetModal.bloodGroup || 'O+'}</strong>
              </div>
              <div>
                <span className="text-gray-500">Unit:</span> <strong>31 (TN) INDEP COY NCC</strong>
              </div>
            </div>

            {selectedCadetModal.achievements && selectedCadetModal.achievements.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-serif font-bold text-sm text-army-900 flex items-center space-x-1.5">
                  <Award className="w-4 h-4 text-gold-600" />
                  <span>Cadet Achievements & Medals</span>
                </h4>
                <ul className="space-y-1 text-xs text-gray-700">
                  {selectedCadetModal.achievements.map((ach, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-gold-600 font-bold">•</span>
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selectedCadetModal.certificates && selectedCadetModal.certificates.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-serif font-bold text-sm text-army-900 flex items-center space-x-1.5">
                  <FileCheck className="w-4 h-4 text-army-800" />
                  <span>NCC Qualifications & Certificates</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCadetModal.certificates.map((cert, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-800 text-xs px-2.5 py-1 rounded-lg border border-gray-200 font-medium">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
