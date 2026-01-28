
import React, { useState, useEffect } from 'react';
import { Page, SiteSettings } from './types';
import { SETTINGS_KEY, DEFAULT_SETTINGS } from './constants';
import Layout from './components/Layout';
import Home from './components/Home';
import Admin from './components/Admin';
import AIDesigner from './components/AIDesigner';
import ChatBot from './components/ChatBot';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>(Page.HOME);
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) {
      try {
        setSettings(JSON.parse(raw));
      } catch (e) {
        console.error("Failed to parse settings", e);
      }
    }
  }, []);

  const renderContent = () => {
    switch (activePage) {
      case Page.HOME:
        return <Home settings={settings} />;
      case Page.AI_DESIGNER:
        return <AIDesigner />;
      case Page.ADMIN:
        return <Admin settings={settings} setSettings={setSettings} />;
      case Page.SERVICES:
        return (
          <div className="py-24 px-4 max-w-7xl mx-auto">
            <h2 className="text-4xl font-heading font-bold mb-12 text-center">Comprehensive Printing Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {['Business Cards', 'Brochures', 'Posters', 'Banner Printing', 'Magazine Printing', 'Custom Packaging', 'Labels & Stickers', 'Invitation Cards', 'Calendar Printing'].map((s, i) => (
                <div key={i} className="p-8 bg-white rounded-3xl border shadow-sm hover:shadow-lg transition-all border-slate-100 group">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    {i + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{s}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Premium quality {s.toLowerCase()} solutions with rapid turnaround times and precision color matching.
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      case Page.CONTACT:
        return (
          <div className="py-24 px-4 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-heading font-bold mb-6">Let's Print Something Great</h2>
              <p className="text-slate-600 mb-10 text-lg">Visit us at our studio or reach out through any of the channels below.</p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div>
                    <h4 className="font-bold">Address</h4>
                    <p className="text-slate-500">{settings.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  </div>
                  <div>
                    <h4 className="font-bold">Email</h4>
                    <p className="text-slate-500">{settings.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </div>
                  <div>
                    <h4 className="font-bold">Business Hours</h4>
                    <p className="text-slate-500">{settings.timing}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-10 rounded-3xl shadow-2xl border">
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <textarea className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500 h-32"></textarea>
                </div>
                <button className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20">
                  Send Inquiry
                </button>
              </form>
            </div>
          </div>
        );
      default:
        return <Home settings={settings} />;
    }
  };

  return (
    <Layout activePage={activePage} setActivePage={setActivePage} brandName="SAMPURNA ENTERPRISE">
      {renderContent()}
      <ChatBot />
    </Layout>
  );
};

export default App;
