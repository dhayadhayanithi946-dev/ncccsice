import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Lightbox from './components/Lightbox';
import Toast from './components/Toast';

import Home from './pages/Home';
import About from './pages/About';
import AnoPage from './pages/AnoPage';
import Cadets from './pages/Cadets';
import Events from './pages/Events';
import GalleryPage from './pages/GalleryPage';
import Achievements from './pages/Achievements';
import Announcements from './pages/Announcements';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

const API_BASE = import.meta.env.VITE_API_URL || '';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [toast, setToast] = useState(null);
  
  // Auth state
  const [token, setToken] = useState(localStorage.getItem('ncc_token') || '');
  const [user, setUser] = useState(null);

  // Data states
  const [stats, setStats] = useState({ totalCadets: 104, nccEvents: 42, achievements: 28, campsParticipated: 16 });
  const [ano, setAno] = useState({});
  const [cadets, setCadets] = useState([]);
  const [events, setEvents] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  // Lightbox state
  const [lightboxState, setLightboxState] = useState({ isOpen: false, images: [], currentIndex: 0 });

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  // Fetch API data
  const fetchData = useCallback(async () => {
    try {
      const [resStats, resAno, resCadets, resEvents, resGallery, resAch, resAnn] = await Promise.all([
        fetch(`${API_BASE}/api/stats`).then(r => r.json()).catch(() => ({})),
        fetch(`${API_BASE}/api/ano`).then(r => r.json()).catch(() => ({})),
        fetch(`${API_BASE}/api/cadets`).then(r => r.json()).catch(() => []),
        fetch(`${API_BASE}/api/events`).then(r => r.json()).catch(() => []),
        fetch(`${API_BASE}/api/gallery`).then(r => r.json()).catch(() => []),
        fetch(`${API_BASE}/api/achievements`).then(r => r.json()).catch(() => []),
        fetch(`${API_BASE}/api/announcements`).then(r => r.json()).catch(() => [])
      ]);

      if (resStats && resStats.totalCadets) setStats(resStats);
      if (resAno && resAno.name) setAno(resAno);
      if (Array.isArray(resCadets)) setCadets(resCadets);
      if (Array.isArray(resEvents)) setEvents(resEvents);
      if (Array.isArray(resGallery)) setGallery(resGallery);
      if (Array.isArray(resAch)) setAchievements(resAch);
      if (Array.isArray(resAnn)) setAnnouncements(resAnn);
    } catch (err) {
      console.error('Error fetching portal data:', err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Token Verification
  useEffect(() => {
    if (token) {
      fetch(`${API_BASE}/api/auth/verify`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(r => r.json())
      .then(data => {
        if (data.valid) {
          setUser(data.user);
        } else {
          setToken('');
          localStorage.removeItem('ncc_token');
        }
      })
      .catch(() => {
        setToken('');
        localStorage.removeItem('ncc_token');
      });
    }
  }, [token]);

  const handleLoginSuccess = (newToken, userData) => {
    setToken(newToken);
    setUser(userData);
    localStorage.setItem('ncc_token', newToken);
    setActiveTab('admin');
  };

  const handleLogout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('ncc_token');
    showToast('Logged out of Admin Portal', 'info');
    setActiveTab('home');
  };

  const handleOpenLightbox = (images, index = 0) => {
    setLightboxState({ isOpen: true, images, currentIndex: index });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans selection:bg-army-800 selection:text-gold-400">
      
      {/* Navigation Header */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isAuthenticated={!!token}
        onLogout={handleLogout}
      />

      {/* Main Page Render */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <Home 
            stats={stats}
            ano={ano}
            events={events}
            announcements={announcements}
            achievements={achievements}
            cadets={cadets}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'about' && <About setActiveTab={setActiveTab} />}

        {activeTab === 'ano' && (
          <AnoPage 
            ano={ano} 
            isAuthenticated={!!token} 
            setActiveTab={setActiveTab} 
          />
        )}

        {activeTab === 'cadets' && <Cadets cadets={cadets} />}

        {activeTab === 'events' && (
          <Events 
            events={events} 
            onOpenLightbox={handleOpenLightbox}
          />
        )}

        {activeTab === 'gallery' && (
          <GalleryPage 
            gallery={gallery} 
            onOpenLightbox={handleOpenLightbox}
          />
        )}

        {activeTab === 'achievements' && <Achievements achievements={achievements} />}

        {activeTab === 'announcements' && <Announcements announcements={announcements} />}

        {activeTab === 'contact' && <Contact showToast={showToast} />}

        {activeTab === 'login' && (
          <Login 
            onLoginSuccess={handleLoginSuccess}
            showToast={showToast}
          />
        )}

        {activeTab === 'admin' && (
          token ? (
            <AdminDashboard 
              token={token}
              showToast={showToast}
              refreshData={fetchData}
              stats={stats}
              ano={ano}
              cadets={cadets}
              events={events}
              gallery={gallery}
              achievements={achievements}
              announcements={announcements}
            />
          ) : (
            <Login 
              onLoginSuccess={handleLoginSuccess}
              showToast={showToast}
            />
          )
        )}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Lightbox Modal */}
      <Lightbox 
        isOpen={lightboxState.isOpen}
        images={lightboxState.images}
        currentIndex={lightboxState.currentIndex}
        onClose={() => setLightboxState({ ...lightboxState, isOpen: false })}
        onNavigate={(idx) => setLightboxState({ ...lightboxState, currentIndex: idx })}
      />

      {/* Toast Notifications */}
      <Toast toast={toast} onClose={() => setToast(null)} />

    </div>
  );
}
