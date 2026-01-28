
import React from 'react';
import { Page } from '../types';
import { Icons } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activePage: Page;
  setActivePage: (page: Page) => void;
  brandName: string;
}

const Layout: React.FC<LayoutProps> = ({ children, activePage, setActivePage, brandName }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setActivePage(Page.HOME)}
          >
            <div className="p-2 bg-indigo-600 rounded-lg group-hover:bg-indigo-700 transition-colors">
              <Icons.Printer className="text-white w-6 h-6" />
            </div>
            <span className="font-heading font-bold text-xl tracking-tight uppercase text-slate-800">
              {brandName}
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => setActivePage(Page.HOME)}
              className={`font-medium transition-colors ${activePage === Page.HOME ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}
            >
              Home
            </button>
            <button 
              onClick={() => setActivePage(Page.AI_DESIGNER)}
              className={`font-medium flex items-center gap-1.5 transition-colors ${activePage === Page.AI_DESIGNER ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}
            >
              <Icons.Sparkles className="w-4 h-4" />
              AI Designer
            </button>
            <button 
              onClick={() => setActivePage(Page.SERVICES)}
              className={`font-medium transition-colors ${activePage === Page.SERVICES ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}
            >
              Services
            </button>
            <button 
              onClick={() => setActivePage(Page.CONTACT)}
              className={`font-medium transition-colors ${activePage === Page.CONTACT ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}
            >
              Contact
            </button>
            <button 
              onClick={() => setActivePage(Page.ADMIN)}
              className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <Icons.Settings className="w-5 h-5" />
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-white font-heading font-bold mb-4">{brandName}</h3>
            <p className="text-sm leading-relaxed">
              Leading the printing industry with innovation and precision. From traditional offset to AI-driven designs.
            </p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => setActivePage(Page.HOME)}>Home</button></li>
              <li><button onClick={() => setActivePage(Page.AI_DESIGNER)}>AI Designer</button></li>
              <li><button onClick={() => setActivePage(Page.SERVICES)}>Our Services</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Support</h4>
            <p className="text-sm mb-4">Need help with a print job? Chat with our AI assistant or call us.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors"><Icons.Phone className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Icons.MessageCircle className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-slate-800 mt-12 pt-8 text-xs text-center">
          © {new Date().getFullYear()} {brandName}. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
