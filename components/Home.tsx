
import React from 'react';
import { SiteSettings } from '../types';
import { Icons } from '../constants';

interface HomeProps {
  settings: SiteSettings;
}

const Home: React.FC<HomeProps> = ({ settings }) => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-slate-900 overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/seed/printing/1920/1080')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-6xl font-heading font-bold text-white mb-6 leading-tight">
              {settings.heroTitle}
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed">
              {settings.heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-xl shadow-indigo-500/20">
                Start a Project
              </button>
              <button className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm border border-white/10">
                View Gallery
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="text-4xl font-heading font-bold text-indigo-600 mb-2">{settings.statJobs}</div>
              <div className="text-slate-500 font-medium uppercase tracking-wider text-sm">Print Jobs Delivered</div>
            </div>
            <div className="text-center p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="text-4xl font-heading font-bold text-indigo-600 mb-2">{settings.statYears}</div>
              <div className="text-slate-500 font-medium uppercase tracking-wider text-sm">Years of Excellence</div>
            </div>
            <div className="text-center p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="text-4xl font-heading font-bold text-indigo-600 mb-2">{settings.statClients}</div>
              <div className="text-slate-500 font-medium uppercase tracking-wider text-sm">Happy Clients</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 mb-4">Our Premium Services</h2>
            <div className="w-20 h-1.5 bg-indigo-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Digital Printing', desc: 'Fast, high-quality prints for documents, flyers, and small batches.', img: 'https://picsum.photos/seed/digital/800/600' },
              { title: 'Offset Printing', desc: 'Cost-effective high-volume solutions for books, catalogs, and brochures.', img: 'https://picsum.photos/seed/offset/800/600' },
              { title: 'Custom Branding', desc: 'Elevate your business with personalized packaging, business cards, and more.', img: 'https://picsum.photos/seed/branding/800/600' },
            ].map((s, idx) => (
              <div key={idx} className="group bg-white rounded-3xl overflow-hidden border border-slate-200 hover:shadow-2xl transition-all duration-500">
                <div className="h-56 overflow-hidden">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-3 text-slate-900">{s.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-6">{s.desc}</p>
                  <button className="text-indigo-600 font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                    Learn More <span>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
