import React, { useState } from 'react';
import { Lock, Mail, Shield, Key, CheckCircle2 } from 'lucide-react';

export default function Login({ onLoginSuccess, showToast }) {
  const [email, setEmail] = useState('admin@csice.edu.in');
  const [password, setPassword] = useState('NccCsice2026!');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (res.ok && data.token) {
        showToast('Admin authentication successful! Access granted.', 'success');
        onLoginSuccess(data.token, data.user);
      } else {
        showToast(data.error || 'Authentication failed', 'error');
      }
    } catch (err) {
      showToast('Server connectivity error', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12 animate-fade-in">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 sm:p-10 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex p-3 bg-army-900 text-gold-400 rounded-2xl border border-gold-500 shadow-lg">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-serif font-extrabold text-army-900">Admin Portal Login</h2>
          <p className="text-xs text-gray-500 font-medium">31 (TN) INDEP COY NCC • CSI College of Engineering</p>
        </div>

        {/* Credentials Note */}
        <div className="bg-army-50 p-4 rounded-xl border border-army-100 text-xs space-y-1">
          <div className="font-bold text-army-900 flex items-center space-x-1">
            <Shield className="w-3.5 h-3.5 text-gold-600" />
            <span>Default Administrator Credentials</span>
          </div>
          <p className="text-gray-600">Email: <strong className="text-army-900 font-mono">admin@csice.edu.in</strong></p>
          <p className="text-gray-600">Password: <strong className="text-army-900 font-mono">NccCsice2026!</strong></p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-army-800 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Security Password</label>
            <div className="relative">
              <Key className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-army-800 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-army-800 hover:bg-army-700 text-gold-400 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
          >
            <Lock className="w-4 h-4" />
            <span>{loading ? 'Authenticating...' : 'Sign In to Admin Dashboard'}</span>
          </button>
        </form>

      </div>
    </div>
  );
}
