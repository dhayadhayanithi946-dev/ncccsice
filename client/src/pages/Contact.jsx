import React, { useState } from 'react';
import { MapPin, Phone, Mail, Globe, Send, Shield, ExternalLink, CheckCircle2, MessageSquare } from 'lucide-react';

export default function Contact({ showToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (res.ok) {
        showToast('Your message has been submitted to 31 (TN) INDEP COY NCC Office!', 'success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        showToast(data.error || 'Failed to submit message', 'error');
      }
    } catch (err) {
      showToast('Error connecting to server', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 pb-16 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-army-900 text-white py-14 px-4 sm:px-6 lg:px-8 border-b-4 border-gold-500">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 bg-army-800 px-3.5 py-1.5 rounded-full border border-gold-500/40 text-gold-400 text-xs font-bold uppercase tracking-wider">
            <Shield className="w-4 h-4" />
            <span>Unit Contact Desk</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-white">Contact 31 (TN) INDEP COY NCC</h1>
          <p className="text-gray-300 max-w-2xl text-sm sm:text-base font-light">
            Connect with our Associate NCC Officer and unit headquarters at CSI College of Engineering, Ketti, Ooty.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Quick Contact Buttons Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <a
            href="tel:9345099378"
            className="military-card p-6 rounded-2xl flex items-center space-x-4 hover:border-gold-500 transition-all group"
          >
            <div className="p-3.5 bg-army-100 text-army-800 rounded-xl group-hover:bg-army-800 group-hover:text-gold-400 transition-colors">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Phone Call</div>
              <div className="text-sm font-bold text-army-900">9345099378</div>
              <div className="text-[11px] text-gray-500">0423-2517474</div>
            </div>
          </a>

          <a
            href="mailto:office@csice.edu.in"
            className="military-card p-6 rounded-2xl flex items-center space-x-4 hover:border-gold-500 transition-all group"
          >
            <div className="p-3.5 bg-gold-100 text-gold-700 rounded-xl group-hover:bg-gold-500 group-hover:text-army-900 transition-colors">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Official Email</div>
              <div className="text-sm font-bold text-army-900 truncate">office@csice.edu.in</div>
              <div className="text-[11px] text-gray-500">CSI College Office</div>
            </div>
          </a>

          <a
            href="http://www.csice.edu.in/"
            target="_blank"
            rel="noreferrer"
            className="military-card p-6 rounded-2xl flex items-center space-x-4 hover:border-gold-500 transition-all group"
          >
            <div className="p-3.5 bg-army-100 text-army-800 rounded-xl group-hover:bg-army-800 group-hover:text-gold-400 transition-colors">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">College Portal</div>
              <div className="text-sm font-bold text-army-900">www.csice.edu.in</div>
              <div className="text-[11px] text-gold-600 font-semibold flex items-center space-x-1">
                <span>Visit Main Site</span>
                <ExternalLink className="w-3 h-3" />
              </div>
            </div>
          </a>

          <div className="military-card p-6 rounded-2xl flex items-center space-x-4">
            <div className="p-3.5 bg-army-100 text-army-800 rounded-xl">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Location</div>
              <div className="text-sm font-bold text-army-900">Ketti, Ooty</div>
              <div className="text-[11px] text-gray-500">The Nilgiris – 643215</div>
            </div>
          </div>

        </div>

        {/* Contact Form & Location Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Query Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-gray-100 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 text-gold-600 font-bold text-xs uppercase tracking-widest">
                <MessageSquare className="w-4 h-4 text-army-800" />
                <span>Inquiry & Correspondence</span>
              </div>
              <h2 className="text-2xl font-serif font-extrabold text-army-900">Send a Message to NCC Office</h2>
              <p className="text-xs text-gray-600">Students, parents, cadets, and visitors can send official queries directly to the unit administration.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-army-800 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-army-800 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="Mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-army-800 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Subject *</label>
                  <input
                    type="text"
                    required
                    placeholder="Cadet enrolment, event query..."
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-army-800 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Message Detail *</label>
                <textarea
                  required
                  rows="4"
                  placeholder="Type your question or detailed message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-army-800 outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-army-800 hover:bg-army-700 text-gold-400 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? 'Submitting Message...' : 'Submit Message to NCC Desk'}</span>
              </button>
            </form>
          </div>

          {/* Location & Address Column */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-army-900 text-white p-8 rounded-3xl shadow-xl border border-gold-500/40 space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-serif font-extrabold text-white">Campus Location Address</h3>
                <p className="text-xs text-gold-400 font-bold uppercase tracking-wider">31 (TN) INDEP COY NCC Unit</p>
              </div>

              <div className="space-y-4 text-xs text-gray-300 leading-relaxed font-light">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-serif">CSI College of Engineering</strong>
                    <span>Ketti, Ooty, The Nilgiris – 643215</span><br />
                    <span>Tamil Nadu, India</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 pt-2 border-t border-army-800">
                  <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span>9345099378 / 0423-2517474</span>
                </div>

                <div className="flex items-center space-x-3 pt-1">
                  <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span>office@csice.edu.in</span>
                </div>
              </div>
            </div>

            {/* Google Map Embed Placeholder */}
            <div className="bg-white rounded-3xl p-4 shadow-xl border border-gray-100 overflow-hidden">
              <h4 className="font-serif font-bold text-xs text-army-900 uppercase tracking-wider mb-2 px-2">Map Location</h4>
              <div className="h-64 rounded-2xl overflow-hidden border border-gray-200 relative bg-gray-100">
                <iframe 
                  title="CSI College of Engineering Ketti Ooty Map Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3910.871638096336!2d76.732785!3d11.378942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8971f16efbb0b%3A0x6b1bb4a64ef8e9a2!2sCSI%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
