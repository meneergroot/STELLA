import { motion } from "motion/react";
import { Cpu, Lock, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 font-mono text-[10px] bg-nt-white border border-nt-light-gray p-0.5 rounded-md shadow-sm select-none" id="lang-switcher">
      {(['en', 'nl', 'de'] as const).map((lang) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          className={`px-2 py-1 rounded transition-all uppercase font-bold cursor-pointer text-[10px] ${
            language === lang
              ? 'bg-nt-black text-nt-white'
              : 'text-nt-gray hover:text-nt-black'
          }`}
          title={`Switch to ${lang.toUpperCase()}`}
        >
          {lang}
        </button>
      ))}
    </div>
  );
};

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-nt-white/80 backdrop-blur-md px-6 py-4 border-b border-nt-light-gray" id="navbar">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group cursor-pointer" id="nav-logo">
          <div className="w-9 h-9 bg-nt-black rounded flex items-center justify-center text-nt-white group-hover:bg-nt-red transition-colors shadow">
            <Cpu size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-dot uppercase tracking-widest text-nt-black leading-none">
              STELLA MONTIS
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-nt-red animate-led-blink" />
              <span className="text-[9px] font-mono font-medium text-nt-gray tracking-wider uppercase">BUILD_STATION_ACTIVE</span>
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 font-mono text-xs text-nt-gray" id="nav-desktop">
          <a href="/#web-portals" className="hover:text-nt-black transition-colors uppercase">{t.nav_websites}</a>
          <Link to="/services/drone-photography" className="hover:text-nt-black transition-colors uppercase">{t.nav_drone_photo}</Link>
          <Link to="/services/drone-videography" className="hover:text-nt-black transition-colors uppercase">{t.nav_drone_video}</Link>
          <Link to="/shop" className="hover:text-nt-red transition-colors uppercase font-bold border-b-2 border-transparent hover:border-nt-red px-1 py-0.5">{t.nav_shop}</Link>
          <Link to="/admin" className="hover:text-nt-black transition-colors flex items-center gap-1.5 uppercase">
            <Lock size={12} /> {t.nav_admin}
          </Link>
          <LanguageSwitcher />
          <a 
            href="mailto:meneergroot@icloud.com"
            className="bg-nt-black text-nt-white px-5 py-2 rounded text-xs hover:bg-nt-charcoal transition-all shadow-sm font-bold uppercase tracking-wider"
            id="nav-cta-email"
          >
            {t.nav_get_started}
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitcher />
          <button 
            className="p-2 text-nt-black"
            onClick={() => setIsOpen(!isOpen)}
            id="nav-mobile-toggle"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 bg-nt-white border-b border-nt-light-gray p-6 flex flex-col gap-4 shadow-lg font-mono text-xs"
          id="nav-mobile-menu"
        >
          <a href="/#web-portals" className="text-nt-black font-bold uppercase tracking-widest py-1 border-b border-nt-bg" onClick={() => setIsOpen(false)}>{t.nav_websites}</a>
          <Link to="/services/drone-photography" className="text-nt-black font-bold uppercase tracking-widest py-1 border-b border-nt-bg" onClick={() => setIsOpen(false)}>{t.nav_drone_photo}</Link>
          <Link to="/services/drone-videography" className="text-nt-black font-bold uppercase tracking-widest py-1 border-b border-nt-bg" onClick={() => setIsOpen(false)}>{t.nav_drone_video}</Link>
          <Link to="/shop" className="text-nt-red font-bold uppercase tracking-widest py-1 border-b border-nt-bg" onClick={() => setIsOpen(false)}>{t.nav_shop}</Link>
          <Link to="/admin" className="text-nt-black font-bold uppercase tracking-widest py-1 border-b border-nt-bg flex items-center gap-2" onClick={() => setIsOpen(false)}>
            <Lock size={12} /> {t.nav_admin}
          </Link>
          <a 
            href="mailto:meneergroot@icloud.com"
            className="bg-nt-black text-nt-white px-5 py-3 rounded text-center block font-bold uppercase tracking-widest mt-2"
          >
            {t.nav_get_started}
          </a>
        </motion.div>
      )}
    </nav>
  );
};
