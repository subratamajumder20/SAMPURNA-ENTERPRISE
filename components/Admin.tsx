
import React, { useState, useEffect } from 'react';
import { SiteSettings } from '../types';
import { ADMIN_PASSWORD, LOGIN_KEY, SETTINGS_KEY } from '../constants';

interface AdminProps {
  settings: SiteSettings;
  setSettings: (settings: SiteSettings) => void;
}

const Admin: React.FC<AdminProps> = ({ settings, setSettings }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [form, setForm] = useState<SiteSettings>(settings);

  useEffect(() => {
    const loggedIn = localStorage.getItem(LOGIN_KEY) === 'yes';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(LOGIN_KEY, 'yes');
      setIsLoggedIn(true);
    } else {
      alert("Incorrect password.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(LOGIN_KEY);
    setIsLoggedIn(false);
  };

  const handleSave = () => {
    setSettings(form);
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(form));
    alert("Settings saved successfully!");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-2xl border w-full max-w-md">
          <h2 className="text-2xl font-heading font-bold mb-6 text-center">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Admin Password</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Enter password..."
              />
            </div>
            <button className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-heading font-bold">Site Administration</h2>
        <button onClick={handleLogout} className="px-4 py-2 text-red-600 font-medium hover:bg-red-50 rounded-lg transition-colors">
          Logout
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border overflow-hidden">
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-full">
              <label className="block text-sm font-medium text-slate-600 mb-1">Hero Title</label>
              <input 
                value={form.heroTitle}
                onChange={(e) => setForm({...form, heroTitle: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div className="col-span-full">
              <label className="block text-sm font-medium text-slate-600 mb-1">Hero Subtitle</label>
              <textarea 
                value={form.heroSubtitle}
                onChange={(e) => setForm({...form, heroSubtitle: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none h-24"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Stats: Jobs Delivered</label>
              <input 
                value={form.statJobs}
                onChange={(e) => setForm({...form, statJobs: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Stats: Years</label>
              <input 
                value={form.statYears}
                onChange={(e) => setForm({...form, statYears: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Stats: Clients</label>
              <input 
                value={form.statClients}
                onChange={(e) => setForm({...form, statClients: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Phone Number</label>
              <input 
                value={form.phone}
                onChange={(e) => setForm({...form, phone: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div className="col-span-full">
              <label className="block text-sm font-medium text-slate-600 mb-1">Office Address</label>
              <input 
                value={form.address}
                onChange={(e) => setForm({...form, address: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          <div className="pt-6 border-t">
            <button 
              onClick={handleSave}
              className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-500/20 transition-all transform hover:scale-[1.02]"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
