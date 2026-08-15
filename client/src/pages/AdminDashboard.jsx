import React, { useState, useEffect } from 'react';
import { 
  Shield, Users, Calendar, Award, Bell, Image as ImageIcon, MessageSquare, 
  Plus, Trash2, Edit3, Save, Check, Upload, FileText, X, AlertTriangle, Eye 
} from 'lucide-react';
import ConfirmModal from '../components/ConfirmModal';

export default function AdminDashboard({ token, showToast, refreshData, stats, ano, cadets, events, gallery, achievements, announcements }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [contacts, setContacts] = useState([]);
  
  // Modals & Form States
  const [confirmState, setConfirmState] = useState({ isOpen: false, title: '', message: '', action: null });
  const [isCadetModalOpen, setIsCadetModalOpen] = useState(false);
  const [editingCadet, setEditingCadet] = useState(null);
  
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [isAchievementModalOpen, setIsAchievementModalOpen] = useState(false);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);

  // Editable Stats State
  const [statsForm, setStatsForm] = useState({
    totalCadets: stats.totalCadets || 104,
    nccEvents: stats.nccEvents || 42,
    achievements: stats.achievements || 28,
    campsParticipated: stats.campsParticipated || 16
  });

  // Editable ANO State
  const [anoForm, setAnoForm] = useState({
    name: ano.name || 'Lt. Dr. Manoj Prabhakar B.S.',
    designation: ano.designation || 'Associate NCC Officer (ANO)',
    unit: ano.unit || '31 (TN) INDEP COY NCC',
    college: ano.college || 'CSI College of Engineering, Ketti, Ooty',
    photoUrl: ano.photoUrl || '/assets/ano_portrait.jpg',
    biography: ano.biography || '',
    responsibilities: ano.responsibilities ? ano.responsibilities.join('\n') : '',
    phone: ano.phone || '9345099378',
    email: ano.email || 'office@csice.edu.in'
  });

  useEffect(() => {
    setStatsForm({
      totalCadets: stats.totalCadets || 104,
      nccEvents: stats.nccEvents || 42,
      achievements: stats.achievements || 28,
      campsParticipated: stats.campsParticipated || 16
    });
  }, [stats]);

  useEffect(() => {
    setAnoForm({
      name: ano.name || 'Lt. Dr. Manoj Prabhakar B.S.',
      designation: ano.designation || 'Associate NCC Officer (ANO)',
      unit: ano.unit || '31 (TN) INDEP COY NCC',
      college: ano.college || 'CSI College of Engineering, Ketti, Ooty',
      photoUrl: ano.photoUrl || '/assets/ano_portrait.jpg',
      biography: ano.biography || '',
      responsibilities: ano.responsibilities ? ano.responsibilities.join('\n') : '',
      phone: ano.phone || '9345099378',
      email: ano.email || 'office@csice.edu.in'
    });
  }, [ano]);

  // Fetch Contact Messages
  useEffect(() => {
    if (token) {
      fetch('/api/contact', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setContacts(data);
      })
      .catch(err => console.error(err));
    }
  }, [token]);

  // ----------------------------------------------------
  // Update Stats
  // ----------------------------------------------------
  const handleUpdateStats = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/stats', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(statsForm)
      });
      if (res.ok) {
        showToast('Statistics counters updated successfully!', 'success');
        refreshData();
      } else {
        showToast('Failed to update statistics', 'error');
      }
    } catch (err) {
      showToast('Error updating stats', 'error');
    }
  };

  // ----------------------------------------------------
  // Update ANO Info
  // ----------------------------------------------------
  const handleUpdateAno = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', anoForm.name);
    formData.append('designation', anoForm.designation);
    formData.append('unit', anoForm.unit);
    formData.append('college', anoForm.college);
    formData.append('biography', anoForm.biography);
    formData.append('responsibilities', JSON.stringify(anoForm.responsibilities.split('\n').filter(Boolean)));
    formData.append('phone', anoForm.phone);
    formData.append('email', anoForm.email);

    if (e.target.photoFile && e.target.photoFile.files[0]) {
      formData.append('photo', e.target.photoFile.files[0]);
    } else {
      formData.append('photoUrl', anoForm.photoUrl);
    }

    try {
      const res = await fetch('/api/ano', {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      if (res.ok) {
        showToast('ANO Profile updated successfully!', 'success');
        refreshData();
      } else {
        showToast('Failed to update ANO profile', 'error');
      }
    } catch (err) {
      showToast('Error updating ANO profile', 'error');
    }
  };

  // ----------------------------------------------------
  // Cadet CRUD
  // ----------------------------------------------------
  const handleSaveCadet = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const isEdit = !!editingCadet;
    const url = isEdit ? `/api/cadets/${editingCadet._id || editingCadet.id}` : '/api/cadets';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      if (res.ok) {
        showToast(`Cadet ${isEdit ? 'updated' : 'added'} successfully!`, 'success');
        setIsCadetModalOpen(false);
        setEditingCadet(null);
        refreshData();
      } else {
        const err = await res.json();
        showToast(err.error || 'Failed to save cadet', 'error');
      }
    } catch (err) {
      showToast('Error saving cadet record', 'error');
    }
  };

  const handleDeleteCadet = (id, name) => {
    setConfirmState({
      isOpen: true,
      title: 'Delete Cadet Record',
      message: `Are you sure you want to delete ${name}? This action cannot be undone.`,
      onConfirm: async () => {
        setConfirmState({ isOpen: false });
        try {
          const res = await fetch(`/api/cadets/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.ok) {
            showToast('Cadet record deleted', 'success');
            refreshData();
          }
        } catch (e) {
          showToast('Failed to delete cadet', 'error');
        }
      }
    });
  };

  // ----------------------------------------------------
  // Event CRUD
  // ----------------------------------------------------
  const handleSaveEvent = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const isEdit = !!editingEvent;
    const url = isEdit ? `/api/events/${editingEvent._id || editingEvent.id}` : '/api/events';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      if (res.ok) {
        showToast(`Event ${isEdit ? 'updated' : 'created'} successfully!`, 'success');
        setIsEventModalOpen(false);
        setEditingEvent(null);
        refreshData();
      } else {
        const err = await res.json();
        showToast(err.error || 'Failed to save event', 'error');
      }
    } catch (err) {
      showToast('Error saving event', 'error');
    }
  };

  const handleDeleteEvent = (id, title) => {
    setConfirmState({
      isOpen: true,
      title: 'Delete Event',
      message: `Are you sure you want to delete event "${title}"?`,
      onConfirm: async () => {
        setConfirmState({ isOpen: false });
        try {
          const res = await fetch(`/api/events/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.ok) {
            showToast('Event deleted', 'success');
            refreshData();
          }
        } catch (e) {
          showToast('Failed to delete event', 'error');
        }
      }
    });
  };

  // ----------------------------------------------------
  // Gallery CRUD
  // ----------------------------------------------------
  const handleAddGalleryPhoto = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      if (res.ok) {
        showToast('Photo added to Gallery successfully!', 'success');
        setIsGalleryModalOpen(false);
        refreshData();
      } else {
        showToast('Failed to upload photo', 'error');
      }
    } catch (e) {
      showToast('Error uploading photo', 'error');
    }
  };

  const handleDeleteGallery = (id) => {
    setConfirmState({
      isOpen: true,
      title: 'Delete Gallery Photo',
      message: 'Are you sure you want to remove this photo from the gallery?',
      onConfirm: async () => {
        setConfirmState({ isOpen: false });
        try {
          await fetch(`/api/gallery/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
          });
          showToast('Photo removed', 'success');
          refreshData();
        } catch (e) {
          showToast('Failed to delete photo', 'error');
        }
      }
    });
  };

  // ----------------------------------------------------
  // Achievement CRUD
  // ----------------------------------------------------
  const handleAddAchievement = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const res = await fetch('/api/achievements', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      if (res.ok) {
        showToast('Achievement published successfully!', 'success');
        setIsAchievementModalOpen(false);
        refreshData();
      } else {
        showToast('Failed to add achievement', 'error');
      }
    } catch (e) {
      showToast('Error adding achievement', 'error');
    }
  };

  const handleDeleteAchievement = (id) => {
    setConfirmState({
      isOpen: true,
      title: 'Delete Achievement',
      message: 'Delete this achievement record?',
      onConfirm: async () => {
        setConfirmState({ isOpen: false });
        await fetch(`/api/achievements/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        showToast('Achievement deleted', 'success');
        refreshData();
      }
    });
  };

  // ----------------------------------------------------
  // Announcement CRUD
  // ----------------------------------------------------
  const handleAddAnnouncement = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const res = await fetch('/api/announcements', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      if (res.ok) {
        showToast('Notice published on board successfully!', 'success');
        setIsNoticeModalOpen(false);
        refreshData();
      } else {
        showToast('Failed to publish notice', 'error');
      }
    } catch (e) {
      showToast('Error publishing notice', 'error');
    }
  };

  const handleDeleteNotice = (id) => {
    setConfirmState({
      isOpen: true,
      title: 'Delete Announcement',
      message: 'Delete this notice from the board?',
      onConfirm: async () => {
        setConfirmState({ isOpen: false });
        await fetch(`/api/announcements/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        showToast('Notice deleted', 'success');
        refreshData();
      }
    });
  };

  return (
    <div className="space-y-8 pb-16 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      
      {/* Top Admin Welcome Header */}
      <div className="bg-gradient-to-r from-army-900 via-army-800 to-army-900 text-white p-8 rounded-3xl shadow-xl border border-gold-500/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="p-3.5 bg-gold-500 text-army-950 rounded-2xl shadow-lg">
            <Shield className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-white">Admin Command Dashboard</h1>
            <p className="text-xs text-gold-400 font-semibold">31 (TN) INDEP COY NCC • CSI College of Engineering Portal</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs bg-army-950/80 px-4 py-2 rounded-xl border border-army-700">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>Logged in as: <strong className="text-gold-400">admin@csice.edu.in</strong></span>
        </div>
      </div>

      {/* Admin Tabs Bar */}
      <div className="bg-white rounded-2xl p-2 shadow border border-gray-100 flex flex-wrap gap-1 overflow-x-auto">
        {[
          { id: 'overview', label: 'Overview', icon: Shield },
          { id: 'stats', label: 'Stats Counters', icon: Award },
          { id: 'ano', label: 'ANO Profile', icon: Users },
          { id: 'cadets', label: 'Cadets Directory', icon: Users },
          { id: 'events', label: 'Events & Reports', icon: Calendar },
          { id: 'gallery', label: 'Photo Gallery', icon: ImageIcon },
          { id: 'achievements', label: 'Achievements', icon: Award },
          { id: 'announcements', label: 'Notices Board', icon: Bell },
          { id: 'contacts', label: `Inbox (${contacts.length})`, icon: MessageSquare }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-army-800 text-gold-400 shadow-md'
                  : 'text-gray-600 hover:text-army-900 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* TAB 1: OVERVIEW */}
      {/* ======================================================== */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Enrolled Cadets</div>
              <div className="text-3xl font-serif font-extrabold text-army-900 pt-1">{cadets.length}</div>
              <div className="text-[11px] text-army-700 font-semibold pt-1">Active in directory</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Published Events</div>
              <div className="text-3xl font-serif font-extrabold text-army-900 pt-1">{events.length}</div>
              <div className="text-[11px] text-gold-600 font-semibold pt-1">Camps & Ceremonies</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Gallery Records</div>
              <div className="text-3xl font-serif font-extrabold text-army-900 pt-1">{gallery.length}</div>
              <div className="text-[11px] text-gray-500 pt-1">High-res photos</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Public Inquiries</div>
              <div className="text-3xl font-serif font-extrabold text-army-900 pt-1">{contacts.length}</div>
              <div className="text-[11px] text-rose-600 font-semibold pt-1">Contact form messages</div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md space-y-4">
            <h3 className="font-serif font-bold text-lg text-army-900">Quick Administrative Actions</h3>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => { setEditingCadet(null); setIsCadetModalOpen(true); }}
                className="px-4 py-2.5 bg-army-800 text-gold-400 hover:bg-army-700 rounded-xl font-bold text-xs flex items-center space-x-2 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Cadet</span>
              </button>

              <button
                onClick={() => { setEditingEvent(null); setIsEventModalOpen(true); }}
                className="px-4 py-2.5 bg-gold-500 text-army-950 hover:bg-gold-400 rounded-xl font-bold text-xs flex items-center space-x-2 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Upload New Event / Report</span>
              </button>

              <button
                onClick={() => setIsGalleryModalOpen(true)}
                className="px-4 py-2.5 bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-xl font-bold text-xs flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Upload Gallery Image</span>
              </button>

              <button
                onClick={() => setIsNoticeModalOpen(true)}
                className="px-4 py-2.5 bg-army-900 text-white hover:bg-army-800 rounded-xl font-bold text-xs flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Post Official Notice</span>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: STATS COUNTERS */}
      {/* ======================================================== */}
      {activeTab === 'stats' && (
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 max-w-2xl space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-serif font-extrabold text-army-900">Homepage Statistics Counters</h3>
            <p className="text-xs text-gray-500">Edit the key highlight metrics displayed on the home page hero counter.</p>
          </div>

          <form onSubmit={handleUpdateStats} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Total Cadets</label>
                <input
                  type="number"
                  value={statsForm.totalCadets}
                  onChange={(e) => setStatsForm({ ...statsForm, totalCadets: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-army-900 focus:ring-2 focus:ring-army-800 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">NCC Events</label>
                <input
                  type="number"
                  value={statsForm.nccEvents}
                  onChange={(e) => setStatsForm({ ...statsForm, nccEvents: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-army-900 focus:ring-2 focus:ring-army-800 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Achievements Count</label>
                <input
                  type="number"
                  value={statsForm.achievements}
                  onChange={(e) => setStatsForm({ ...statsForm, achievements: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-army-900 focus:ring-2 focus:ring-army-800 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Camps Participated</label>
                <input
                  type="number"
                  value={statsForm.campsParticipated}
                  onChange={(e) => setStatsForm({ ...statsForm, campsParticipated: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-army-900 focus:ring-2 focus:ring-army-800 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-army-800 hover:bg-army-700 text-gold-400 font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-colors flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save & Publish Stats Counters</span>
            </button>
          </form>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: ANO PROFILE EDITOR */}
      {/* ======================================================== */}
      {activeTab === 'ano' && (
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 max-w-3xl space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-serif font-extrabold text-army-900">Manage ANO Officer Details</h3>
            <p className="text-xs text-gray-500">Update Officer Name, designation, portrait photo, bio, and responsibilities.</p>
          </div>

          <form onSubmit={handleUpdateAno} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">ANO Officer Name</label>
                <input
                  type="text"
                  required
                  value={anoForm.name}
                  onChange={(e) => setAnoForm({ ...anoForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-army-800 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Official Designation</label>
                <input
                  type="text"
                  required
                  value={anoForm.designation}
                  onChange={(e) => setAnoForm({ ...anoForm, designation: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-army-800 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Phone Number</label>
                <input
                  type="text"
                  value={anoForm.phone}
                  onChange={(e) => setAnoForm({ ...anoForm, phone: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-army-800 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Officer Email</label>
                <input
                  type="email"
                  value={anoForm.email}
                  onChange={(e) => setAnoForm({ ...anoForm, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-army-800 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Upload New Officer Photo</label>
              <input
                type="file"
                name="photoFile"
                accept="image/*"
                className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-army-50 file:text-army-800 hover:file:bg-army-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Biography & Officer Overview</label>
              <textarea
                rows="4"
                value={anoForm.biography}
                onChange={(e) => setAnoForm({ ...anoForm, biography: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-army-800 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Responsibilities (One per line)</label>
              <textarea
                rows="4"
                value={anoForm.responsibilities}
                onChange={(e) => setAnoForm({ ...anoForm, responsibilities: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-army-800 outline-none"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-army-800 hover:bg-army-700 text-gold-400 font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-colors flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Update ANO Profile</span>
            </button>
          </form>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: CADETS DIRECTORY MANAGEMENT */}
      {/* ======================================================== */}
      {activeTab === 'cadets' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-serif font-extrabold text-army-900">Manage Cadets Roll ({cadets.length})</h3>
            <button
              onClick={() => { setEditingCadet(null); setIsCadetModalOpen(true); }}
              className="px-4 py-2.5 bg-army-800 hover:bg-army-700 text-gold-400 font-bold text-xs rounded-xl shadow flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Cadet</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-army-900 text-gold-400 uppercase font-serif">
                <tr>
                  <th className="p-4">Photo</th>
                  <th className="p-4">Cadet Name</th>
                  <th className="p-4">Rank</th>
                  <th className="p-4">Department</th>
                  <th className="p-4">Year</th>
                  <th className="p-4">Regt. Number</th>
                  <th className="p-4">Blood</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {cadets.map((c) => (
                  <tr key={c._id || c.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <img src={c.photoUrl || '/assets/cadet_placeholder.jpg'} alt={c.name} className="w-10 h-10 rounded-full object-cover border border-gold-500" />
                    </td>
                    <td className="p-4 font-bold text-army-900">{c.name}</td>
                    <td className="p-4"><span className="bg-army-100 text-army-800 font-extrabold px-2 py-0.5 rounded">{c.rank}</span></td>
                    <td className="p-4">{c.department}</td>
                    <td className="p-4">{c.year}</td>
                    <td className="p-4 font-mono font-bold text-gray-700">{c.enrollmentNo}</td>
                    <td className="p-4 font-bold text-rose-600">{c.bloodGroup || 'O+'}</td>
                    <td className="p-4 text-right space-x-2">
                      <button 
                        onClick={() => { setEditingCadet(c); setIsCadetModalOpen(true); }}
                        className="p-1.5 bg-gray-100 hover:bg-army-100 text-army-800 rounded-lg"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteCadet(c._id || c.id, c.name)}
                        className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 5: EVENTS MANAGEMENT */}
      {/* ======================================================== */}
      {activeTab === 'events' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-serif font-extrabold text-army-900">Manage Events & Reports ({events.length})</h3>
            <button
              onClick={() => { setEditingEvent(null); setIsEventModalOpen(true); }}
              className="px-4 py-2.5 bg-gold-500 text-army-950 hover:bg-gold-400 font-bold text-xs rounded-xl shadow flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Event</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((e) => (
              <div key={e._id || e.id} className="bg-white p-6 rounded-2xl shadow border border-gray-100 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="bg-army-900 text-gold-400 font-bold px-2.5 py-0.5 rounded">{e.category}</span>
                    <span className="text-gray-500">{e.date}</span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-army-900">{e.title}</h4>
                  <p className="text-xs text-gray-600 line-clamp-2 mt-1">{e.description}</p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  {e.reportPdfUrl ? (
                    <span className="text-emerald-700 font-semibold flex items-center space-x-1">
                      <FileText className="w-3.5 h-3.5" />
                      <span>PDF Attached</span>
                    </span>
                  ) : (
                    <span className="text-gray-400">No PDF Report</span>
                  )}

                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => { setEditingEvent(e); setIsEventModalOpen(true); }}
                      className="p-1.5 bg-gray-100 text-army-800 hover:bg-army-100 rounded-lg"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteEvent(e._id || e.id, e.title)}
                      className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 6: PHOTO GALLERY MANAGEMENT */}
      {/* ======================================================== */}
      {activeTab === 'gallery' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-serif font-extrabold text-army-900">Manage Photo Gallery ({gallery.length})</h3>
            <button
              onClick={() => setIsGalleryModalOpen(true)}
              className="px-4 py-2.5 bg-army-800 text-gold-400 hover:bg-army-700 font-bold text-xs rounded-xl shadow flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Upload Gallery Image</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {gallery.map((g) => (
              <div key={g._id || g.id} className="relative group rounded-xl overflow-hidden shadow border border-gray-200 bg-army-950 h-48">
                <img src={g.imageUrl} alt={g.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between text-white">
                  <span className="text-[10px] bg-army-900 text-gold-400 px-2 py-0.5 rounded font-bold w-fit">{g.category}</span>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold truncate pr-2">{g.title}</span>
                    <button 
                      onClick={() => handleDeleteGallery(g._id || g.id)}
                      className="p-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 7: ACHIEVEMENTS MANAGEMENT */}
      {/* ======================================================== */}
      {activeTab === 'achievements' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-serif font-extrabold text-army-900">Manage Achievements ({achievements.length})</h3>
            <button
              onClick={() => setIsAchievementModalOpen(true)}
              className="px-4 py-2.5 bg-gold-500 text-army-950 font-bold text-xs rounded-xl shadow flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Publish Achievement</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((a) => (
              <div key={a._id || a.id} className="bg-white p-5 rounded-2xl shadow border border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] bg-gold-100 text-gold-800 font-extrabold px-2 py-0.5 rounded">{a.category}</span>
                  <h4 className="font-serif font-bold text-sm text-army-900 mt-1">{a.title}</h4>
                  <p className="text-xs text-gray-600 font-semibold">{a.cadetName} • {a.event}</p>
                </div>
                <button 
                  onClick={() => handleDeleteAchievement(a._id || a.id)}
                  className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 8: ANNOUNCEMENTS MANAGEMENT */}
      {/* ======================================================== */}
      {activeTab === 'announcements' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-serif font-extrabold text-army-900">Manage Notice Board ({announcements.length})</h3>
            <button
              onClick={() => setIsNoticeModalOpen(true)}
              className="px-4 py-2.5 bg-army-800 text-gold-400 hover:bg-army-700 font-bold text-xs rounded-xl shadow flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Post New Notice</span>
            </button>
          </div>

          <div className="space-y-3">
            {announcements.map((an) => (
              <div key={an._id || an.id} className="bg-white p-5 rounded-2xl shadow border border-gray-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-xs mb-1">
                    <span className="bg-army-900 text-gold-400 font-bold px-2 py-0.5 rounded">{an.category}</span>
                    <span className="text-gray-500">{an.date}</span>
                  </div>
                  <h4 className="font-serif font-bold text-sm text-army-900">{an.title}</h4>
                  <p className="text-xs text-gray-600 line-clamp-1">{an.content}</p>
                </div>
                <button 
                  onClick={() => handleDeleteNotice(an._id || an.id)}
                  className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 9: CONTACT INBOX */}
      {/* ======================================================== */}
      {activeTab === 'contacts' && (
        <div className="space-y-6">
          <h3 className="text-xl font-serif font-extrabold text-army-900">Public Contact Submissions ({contacts.length})</h3>

          {contacts.length > 0 ? (
            <div className="space-y-4">
              {contacts.map((msg) => (
                <div key={msg._id || msg.id} className="bg-white p-6 rounded-2xl shadow border border-gray-100 space-y-3">
                  <div className="flex items-center justify-between text-xs border-b border-gray-100 pb-2">
                    <div className="font-bold text-army-900">{msg.name} ({msg.email})</div>
                    <div className="text-gray-500">{new Date(msg.createdAt).toLocaleString()}</div>
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-gold-600">Subject: {msg.subject}</h4>
                    <p className="text-xs text-gray-700 leading-relaxed mt-1 font-light">{msg.message}</p>
                  </div>
                  {msg.phone && <div className="text-xs text-gray-500 font-mono">Phone: {msg.phone}</div>}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-2xl text-center shadow text-gray-500 text-xs">
              No contact form submissions in inbox.
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: ADD/EDIT CADET */}
      {/* ======================================================== */}
      {isCadetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative border border-gray-100 space-y-6 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsCadetModalOpen(false)} className="absolute top-5 right-5 text-gray-400 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-serif font-bold text-army-900">
              {editingCadet ? 'Edit Cadet Details' : 'Add New Cadet Record'}
            </h3>

            <form onSubmit={handleSaveCadet} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Cadet Name *</label>
                  <input type="text" name="name" required defaultValue={editingCadet?.name || ''} className="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs font-medium" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Cadet Rank *</label>
                  <select name="rank" defaultValue={editingCadet?.rank || 'CDT'} className="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs font-medium">
                    {['CDT', 'LCPL', 'CPL', 'SGT', 'CQMS', 'JUO', 'SUO'].map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Department *</label>
                  <select name="department" defaultValue={editingCadet?.department || 'Computer Science'} className="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs font-medium">
                    {['Computer Science', 'Electronics & Comm.', 'Electrical & Electronics', 'Mechanical Engg.', 'Civil Engg.', 'Information Tech.'].map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Academic Year *</label>
                  <select name="year" defaultValue={editingCadet?.year || 'I Year'} className="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs font-medium">
                    {['I Year', 'II Year', 'III Year', 'IV Year'].map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Enrollment No (Regt No) *</label>
                  <input type="text" name="enrollmentNo" required defaultValue={editingCadet?.enrollmentNo || ''} className="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs font-medium" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Blood Group</label>
                  <input type="text" name="bloodGroup" defaultValue={editingCadet?.bloodGroup || 'O+'} className="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs font-medium" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Cadet Photo</label>
                <input type="file" name="photo" accept="image/*" className="w-full text-xs text-gray-500" />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Achievements (Comma separated)</label>
                <input type="text" name="achievements" defaultValue={editingCadet?.achievements ? editingCadet.achievements.join(', ') : ''} className="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs" />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Certificates (Comma separated)</label>
                <input type="text" name="certificates" defaultValue={editingCadet?.certificates ? editingCadet.certificates.join(', ') : ''} className="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs" />
              </div>

              <button type="submit" className="w-full py-3 bg-army-800 text-gold-400 font-bold text-xs rounded-xl shadow uppercase">
                {editingCadet ? 'Update Cadet Record' : 'Create Cadet Record'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: ADD/EDIT EVENT */}
      {/* ======================================================== */}
      {isEventModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-gray-100 space-y-6 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsEventModalOpen(false)} className="absolute top-5 right-5 text-gray-400 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-serif font-bold text-army-900">
              {editingEvent ? 'Edit Event Details' : 'Create New NCC Event'}
            </h3>

            <form onSubmit={handleSaveEvent} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Event Title *</label>
                <input type="text" name="title" required defaultValue={editingEvent?.title || ''} className="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs font-medium" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Date *</label>
                  <input type="date" name="date" required defaultValue={editingEvent?.date || ''} className="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs font-medium" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Category *</label>
                  <select name="category" defaultValue={editingEvent?.category || 'NCC Camp'} className="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs font-medium">
                    {[
                      'NCC Camp', 'Parade', 'Drill', 'Training', 'Community Service',
                      'Blood Donation', 'Tree Plantation', 'Independence Day', 'Republic Day',
                      'EBSB', 'RDC', 'YEP', 'Sports', 'Awareness Programme', 'College Event'
                    ].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Location *</label>
                <input type="text" name="location" required defaultValue={editingEvent?.location || 'CSI College Ground, Ketti'} className="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs font-medium" />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Description *</label>
                <textarea name="description" rows="3" required defaultValue={editingEvent?.description || ''} className="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs font-medium" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Upload Event Photos (Multiple)</label>
                  <input type="file" name="photos" multiple accept="image/*" className="w-full text-xs text-gray-500" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Upload Event PDF Report</label>
                  <input type="file" name="reportPdf" accept="application/pdf" className="w-full text-xs text-gray-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Participating Cadets (Comma sep)</label>
                  <input type="text" name="participatingCadets" defaultValue={editingEvent?.participatingCadets ? editingEvent.participatingCadets.join(', ') : ''} className="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">YouTube Link (Optional)</label>
                  <input type="url" name="youtubeLink" defaultValue={editingEvent?.youtubeLink || ''} className="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs" />
                </div>
              </div>

              <div className="flex items-center space-x-6 text-xs font-bold pt-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" name="isUpcoming" value="true" defaultChecked={editingEvent?.isUpcoming} className="rounded text-army-800" />
                  <span>Mark as Upcoming Event</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" name="isPublished" value="true" defaultChecked={editingEvent?.isPublished !== false} className="rounded text-army-800" />
                  <span>Publish to Public Page</span>
                </label>
              </div>

              <button type="submit" className="w-full py-3 bg-gold-500 text-army-950 font-bold text-xs rounded-xl shadow uppercase">
                {editingEvent ? 'Update Event Record' : 'Publish Event'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: ADD GALLERY PHOTO */}
      {/* ======================================================== */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative space-y-4">
            <button onClick={() => setIsGalleryModalOpen(false)} className="absolute top-5 right-5 text-gray-400">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-serif font-bold text-army-900">Upload Gallery Image</h3>
            <form onSubmit={handleAddGalleryPhoto} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Image Title *</label>
                <input type="text" name="title" required className="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Category *</label>
                <select name="category" className="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs">
                  {['Parade', 'Camp', 'Drill', 'Training', 'Community Service', 'Cultural', 'Award Ceremony'].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Photo File *</label>
                <input type="file" name="photo" required accept="image/*" className="w-full text-xs" />
              </div>
              <button type="submit" className="w-full py-2.5 bg-army-800 text-gold-400 font-bold text-xs rounded-xl uppercase">
                Upload Photo
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      <ConfirmModal
        isOpen={confirmState.isOpen}
        title={confirmState.title}
        message={confirmState.message}
        onConfirm={confirmState.onConfirm}
        onCancel={() => setConfirmState({ isOpen: false })}
      />

    </div>
  );
}
