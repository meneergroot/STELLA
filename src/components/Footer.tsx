import React from 'react';
import { Cpu, ArrowRight, Lock, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-nt-black text-nt-white pt-20 pb-12 px-6 border-t border-nt-charcoal relative overflow-hidden nt-dot-grid-dark">
      {/* Decorative top red LED cue */}
      <div className="absolute top-0 left-10 md:left-24 transform -translate-y-1/2 flex items-center gap-2 bg-nt-dark px-4 py-1.5 border border-nt-charcoal rounded-full text-xs font-mono tracking-wider text-nt-gray">
        <span className="w-2.5 h-2.5 rounded-full bg-nt-red animate-led-blink inline-block" />
        <span className="text-[10px]">SYSSTATUS: DEV_ONLINE_2026</span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Logo Column */}
          <div className="p-6 bg-nt-dark/85 border border-nt-charcoal rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-nt-white rounded flex items-center justify-center text-nt-black shadow-md">
                  <Cpu size={16} />
                </div>
                <span className="text-sm font-dot uppercase tracking-widest text-nt-white">STELLA MONTIS</span>
              </div>
              <p className="text-nt-gray font-mono text-xs leading-relaxed mb-6">
                Custom web application architecture and native Android app engineering driven by state-of-the-art AI systems with pristine, industrial-grade software design.
              </p>
            </div>
            <div className="text-[10px] font-mono text-nt-gray border-t border-nt-charcoal/50 pt-4 flex items-center gap-2">
              <span>EST: 2026</span>
              <span>•</span>
              <span>LOC: EU_BENELUX</span>
            </div>
          </div>

          {/* Nav column 1 */}
          <div className="p-6 bg-nt-dark/40 border border-nt-charcoal rounded-2xl">
            <h4 className="font-display uppercase tracking-widest text-xs text-nt-gray mb-6 font-bold border-b border-nt-charcoal pb-2">Explore</h4>
            <ul className="flex flex-col gap-3 text-xs font-mono">
              <li>
                <Link to="/" className="text-nt-white hover:text-nt-red transition-colors flex items-center justify-between group">
                  <span>Showcase</span>
                  <span className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity">01</span>
                </Link>
              </li>
              <li>
                <Link to="/apparatuur" className="text-nt-white hover:text-nt-red transition-colors flex items-center justify-between group">
                  <span>Tech Stack</span>
                  <span className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity">02</span>
                </Link>
              </li>
              <li>
                <Link to="/" className="text-nt-white hover:text-nt-red transition-colors flex items-center justify-between group">
                  <span>Case Studies</span>
                  <span className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity">03</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Nav column 2 */}
          <div className="p-6 bg-nt-dark/40 border border-nt-charcoal rounded-2xl">
            <h4 className="font-display uppercase tracking-widest text-xs text-nt-gray mb-6 font-bold border-b border-nt-charcoal pb-2">Services</h4>
            <ul className="flex flex-col gap-2.5 text-xs font-mono">
              <li>
                <Link to="/services/websites" className="text-nt-white hover:text-nt-red transition-colors flex items-center justify-between group">
                  <span>Websites</span>
                  <span className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity">01</span>
                </Link>
              </li>
              <li>
                <Link to="/services/mobile-apps" className="text-nt-white hover:text-nt-red transition-colors flex items-center justify-between group">
                  <span>Android Apps</span>
                  <span className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity">02</span>
                </Link>
              </li>
              <li>
                <Link to="/services/custom-software" className="text-nt-white hover:text-nt-red transition-colors flex items-center justify-between group">
                  <span>AI & Software</span>
                  <span className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity">03</span>
                </Link>
              </li>
              <li>
                <Link to="/services/drone-fotografie" className="text-nt-white hover:text-nt-red transition-colors flex items-center justify-between group">
                  <span>Drone Photography</span>
                  <span className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity">04</span>
                </Link>
              </li>
              <li>
                <Link to="/services/drone-videografie" className="text-nt-white hover:text-nt-red transition-colors flex items-center justify-between group">
                  <span>Drone Videography</span>
                  <span className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity">05</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="p-6 bg-nt-dark/85 border border-nt-charcoal rounded-2xl flex flex-col justify-between">
            <div>
              <h4 className="font-display uppercase tracking-widest text-xs text-nt-gray mb-4 font-bold">DEV_LOGS</h4>
              <p className="text-nt-gray font-mono text-[11px] leading-relaxed mb-6">Subscribe to our engineering newsletters and system release archives.</p>
            </div>
            <div className="space-y-2">
              <div className="flex gap-2 bg-nt-black border border-nt-charcoal rounded px-3 py-2 items-center focus-within:border-nt-white transition-colors">
                <input 
                  type="email" 
                  placeholder="E-mail" 
                  className="bg-transparent text-xs text-nt-white max-w-[130px] md:max-w-none flex-1 focus:outline-none placeholder:text-nt-gray/50 font-mono"
                  id="footer-email-shared"
                />
                <button className="text-nt-white hover:text-nt-red transition-colors shrink-0">
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Outer footer strip */}
        <div className="border-t border-nt-charcoal pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-mono text-nt-gray">
          <p>© 2026 STELLA MONTIS. ALL RIGHTS RESERVED. DESIGN INSPIRED BY NOTHING (R)</p>
          <div className="flex gap-6">
            <Link to="/legal/privacybeleid" className="hover:text-nt-white transition-all uppercase tracking-wider">Privacy Policy</Link>
            <Link to="/legal/servicevoorwaarden" className="hover:text-nt-white transition-all uppercase tracking-wider">Terms of Service</Link>
            <Link to="/admin" className="hover:text-nt-white transition-all flex items-center gap-1 uppercase tracking-wider">
              <Lock size={10} /> Admin
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded border border-nt-charcoal flex items-center justify-center hover:bg-nt-white hover:text-nt-black transition-all cursor-pointer">
              <Globe size={12} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
