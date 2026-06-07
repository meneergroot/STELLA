/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  Layers, 
  ArrowRight, 
  Menu, 
  X, 
  ChevronRight,
  Globe,
  Zap,
  Shield,
  Play,
  Lock,
  Cpu,
  Smartphone,
  Server,
  Code,
  Camera,
  Video,
  Eye
} from "lucide-react";
import { useState, useEffect } from "react";
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link,
  useLocation
} from "react-router-dom";
import { db } from "./lib/firebase";
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot 
} from "firebase/firestore";
import AdminDashboard from "./components/AdminDashboard";
import ServicePage from "./components/ServicePage";
import EquipmentPage from "./components/EquipmentPage";
import LegalPage from "./components/LegalPage";
import Footer from "./components/Footer";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";

const LanguageSwitcher = () => {
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

const Navbar = () => {
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

interface HeroProps {
  title?: string;
}

const Hero = ({ title = "STELLA MONTIS" }: HeroProps) => {
  const { t } = useLanguage();
  const parts = title.split(' ');
  const first = parts[0];
  const rest = parts.slice(1).join(' ');

  return (
    <section className="pt-40 pb-24 px-6 nt-dot-grid-light bg-nt-bg border-b border-nt-light-gray relative" id="hero-section">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Micro tag block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 bg-nt-white border border-nt-light-gray px-3 py-1 rounded text-xs font-mono text-nt-charcoal mb-8 tracking-wider"
        >
           <Zap size={14} className="text-nt-red animate-pulse" />
           <span>{t.hero_tag}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display font-medium text-5xl sm:text-7xl md:text-8xl leading-none uppercase text-nt-black tracking-tight mb-8"
        >
          {t.hero_title_first || first}{" "}
          <span className="text-nt-red font-bold font-dot tracking-widest block sm:inline">{t.hero_title_rest || rest}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 font-mono text-xs"
        >
          <a 
            href="mailto:meneergroot@icloud.com"
            className="bg-nt-black text-nt-white px-8 py-4 rounded hover:bg-nt-charcoal transition-all shadow flex items-center gap-2 font-bold uppercase tracking-wider text-sm"
            id="hero-get-started-btn"
          >
            {t.nav_get_started} 
            <ArrowRight size={14} />
          </a>
          
          <a 
            href="#web-portals"
            className="bg-nt-white text-nt-black border border-nt-light-gray px-8 py-4 rounded hover:bg-nt-bg transition-all flex items-center gap-2 font-bold uppercase tracking-wider text-sm"
            id="hero-portfolio-btn"
          >
            <Code size={14} className="text-nt-black" /> 
            {t.hero_view_codebases}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, num }: any) => (
  <motion.div 
    whileHover={{ y: -4 }}
    className="p-6 bg-nt-white border border-nt-light-gray rounded-xl flex flex-col justify-between min-h-[220px] transition-all relative group"
  >
    <div>
      {/* Top micro identifier */}
      <div className="flex justify-between items-center mb-6">
        <span className="font-mono text-[10px] text-nt-gray">ID: [{num}]</span>
        <div className="w-1.5 h-1.5 rounded-full bg-nt-light-gray group-hover:bg-nt-red transition-colors" />
      </div>

      <div className="flex gap-4 items-start mb-4">
        <div className="p-2 border border-nt-light-gray rounded bg-nt-bg text-nt-black group-hover:bg-nt-black group-hover:text-nt-white transition-colors">
          <Icon size={18} strokeWidth={1.5} />
        </div>
        <h3 className="font-display font-bold uppercase tracking-tight text-base mt-1 text-nt-black group-hover:text-nt-red transition-colors">{title}</h3>
      </div>

      <p className="text-xs font-mono text-nt-gray leading-relaxed max-w-sm">{desc}</p>
    </div>

    {/* Edge details */}
    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
      <ArrowRight size={14} className="text-nt-red" />
    </div>
  </motion.div>
);

const Features = () => {
  const { t } = useLanguage();

  return (
    <section id="features" className="py-20 px-6 bg-nt-white border-b border-nt-light-gray relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1 bg-nt-bg border border-nt-light-gray px-3 py-1 rounded text-[10px] font-mono text-nt-gray mb-4 uppercase">
            <span>{t.features_tag}</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl uppercase tracking-tight font-medium text-nt-black mb-4">
            {t.features_title}<span className="font-dot text-2xl md:text-4xl text-nt-red block sm:inline">{t.features_title_red}</span>
          </h2>
          <p className="text-xs font-mono text-nt-gray max-w-lg mx-auto">
            {t.features_desc}
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard 
            num="D01"
            icon={Camera}
            title={t.feature_1_title}
            desc={t.feature_1_desc}
          />
          <FeatureCard 
            num="D02"
            icon={Globe}
            title={t.feature_2_title}
            desc={t.feature_2_desc}
          />
          <FeatureCard 
            num="D03"
            icon={Smartphone}
            title={t.feature_3_title}
            desc={t.feature_3_desc}
          />
          <FeatureCard 
            num="D04"
            icon={Video}
            title={t.feature_4_title}
            desc={t.feature_4_desc}
          />
          <FeatureCard 
            num="D05"
            icon={Layers}
            title={t.feature_5_title}
            desc={t.feature_5_desc}
          />
          <FeatureCard 
            num="D06"
            icon={Zap}
            title={t.feature_6_title}
            desc={t.feature_6_desc}
          />
        </div>
      </div>
    </section>
  );
};

function getYouTubeId(url: string) {
  if (!url) return '';
  // Check if it's already an 11-character ID
  if (url.length === 11 && !url.includes('/') && !url.includes('?')) {
    return url;
  }
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\/shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : url;
}

function getYouTubeThumbnail(url: string, fallbackThumb?: string) {
  const ytId = getYouTubeId(url);
  if (ytId && ytId.length === 11) {
    return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
  }
  
  if (fallbackThumb && (fallbackThumb.startsWith('http://') || fallbackThumb.startsWith('https://'))) {
    return fallbackThumb;
  }
  
  return "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&q=80&w=600";
}

const STATIC_WEB_PROJECTS = [
  {
    id: "static-klappy",
    title: "KLAPPY",
    videoUrl: "https://klappy.vercel.app/",
    thumbnail: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?auto=format&fit=crop&q=80&w=600",
    description: "A high-fidelity Flappy Bird-style web game built for addictive and responsive arcade action.",
    type: "video",
    createdAt: { toDate: () => new Date("2026-05-25") }
  },
  {
    id: "static-wynder",
    title: "WYNDER",
    videoUrl: "https://wynder.vercel.app/",
    thumbnail: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=600",
    description: "A Tinder-style swipe app, designed exclusively for luxury watch matchmaking and discovery.",
    type: "video",
    createdAt: { toDate: () => new Date("2026-05-24") }
  },
  {
    id: "static-vaiiya",
    title: "STELLA STREAM",
    videoUrl: "https://stella-stream.vercel.app/",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600",
    description: "A high-performance live streaming platform designed for sub-second latent casting and interactive broadcast overlays.",
    type: "video",
    createdAt: { toDate: () => new Date("2026-05-23") }
  },
  {
    id: "static-hashcube",
    title: "HASHCUBE",
    videoUrl: "https://hashcube.vercel.app/",
    thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=600",
    description: "A Pirate Bay-style decentralized peer-to-peer sharing and indexing platform based on IPFS hashes.",
    type: "video",
    createdAt: { toDate: () => new Date("2026-05-22") }
  },
  {
    id: "static-velvet",
    title: "VELVET MUSIC",
    videoUrl: "https://velvetmusic.vercel.app/",
    thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600",
    description: "An expansive cataloging platform for music enthusiasts and collectors, styled with a Discogs-inspired aesthetic.",
    type: "video",
    createdAt: { toDate: () => new Date("2026-05-21") }
  },
  {
    id: "static-bybowie",
    title: "BY BOWIE",
    videoUrl: "https://bybowie.vercel.app/",
    thumbnail: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=600",
    description: "A personal e-Commerce web platform dedicated to showcasing and selling unique handmade craftworks created by children.",
    type: "video",
    createdAt: { toDate: () => new Date("2026-05-20") }
  }
];

const STATIC_DRONE_PROJECTS = [
  {
    id: "static-stream-esports",
    title: "NORWEGIAN FJORDS AERIAL REEL",
    videoUrl: "https://www.youtube.com/watch?v=_J2kZ-fdVcw",
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600",
    description: "Breathtaking ultra-high definition cinematic motion tracking following vertical cliffs and fjord streams. Certified night and day flight permits.",
    type: "drone",
    createdAt: { toDate: () => new Date("2026-05-28") }
  },
  {
    id: "static-stream-chat",
    title: "ROTTERDAM INDUSTRIAL HARBOR WORKSPACE",
    videoUrl: "https://www.youtube.com/watch?v=BNmeXiN7YcM",
    thumbnail: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&q=80&w=600",
    description: "High-contrast mapping orthomosaics and visual status photography of shipping channels under strict CTR airspace exemptions.",
    type: "drone",
    createdAt: { toDate: () => new Date("2026-05-27") }
  },
  {
    id: "static-stream-analytics",
    title: "ALPINE SUMMIT FREE-RIDE PERSPECTIVES",
    videoUrl: "https://www.youtube.com/watch?v=_-QNOxaNTsA",
    thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600",
    description: "Agile cinewhoop FPV tracking shots following mountain descents with sub-zero battery optimization. Exceptional wind-resistance ratings.",
    type: "drone",
    createdAt: { toDate: () => new Date("2026-05-26") }
  }
];

const DroneFootageHeroSection = () => {
  const { t, language } = useLanguage();
  const [dbDrones, setDbDrones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "portfolio"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const droneItems = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter((v: any) => v.type === "drone");
      setDbDrones(droneItems);
      setLoading(false);
    }, (err) => {
      console.error(err);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const allDrones = [...STATIC_DRONE_PROJECTS, ...dbDrones];

  const getTranslatedTitle = (id: string, originalTitle: string) => {
    if (id === 'static-stream-esports') return t.proj_esports_title;
    if (id === 'static-stream-chat') return t.proj_chat_title;
    if (id === 'static-stream-analytics') return t.proj_analytics_title;
    return originalTitle;
  };

  const getTranslatedDesc = (id: string, originalDesc: string) => {
    if (id === 'static-stream-esports') return t.proj_esports_desc;
    if (id === 'static-stream-chat') return t.proj_chat_desc;
    if (id === 'static-stream-analytics') return t.proj_analytics_desc;
    return originalDesc;
  };

  const isNl = language === 'nl';
  const isDe = language === 'de';

  const sectionTag = "[03_CI_AERIAL_PRODUCTIONS]";
  const sectionTitle = isNl ? "GECERTIFICEERDE DRONE FOOTAGE" : isDe ? "ZERTIFIZIERTE DROHNENAUFNAHMEN" : "CERTIFIED DRONE FOOTAGE";
  const sectionDesc = isNl 
    ? "Adembenemende 4K/8K cinematografische luchtopnames en industriële drone-inspecties. Gecertificeerd voor CTR-luchtruimten (gecontroleerd luchtruim), stadszones en nachtvluchten."
    : isDe 
    ? "Atemberaubende 4K/8K cineastische Luftbildaufnahmen und industrielle Drohnen-Inspektionen. Zertifiziert für kontrollierte CTR-Lufträume, Stadtgebiete und Nachtflüge."
    : "Breathtaking 4K/8K cinematic aerial photography and industrial mapping. Fully certified with CTR airspace clearances, urban permits, and official night flight authorizations.";

  return (
    <section id="drone-footage-hero" className="py-20 px-6 bg-nt-black text-nt-white relative overflow-hidden nt-dot-grid-dark border-b border-nt-charcoal animate-fade-in">
      <div className="max-w-7xl mx-auto">
        
        {/* Cinematic Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-nt-charcoal pb-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-nt-charcoal border border-nt-charcoal px-3 py-1 rounded text-[10px] font-mono text-nt-red mb-4 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-nt-red animate-pulse" />
              <span>{sectionTag}</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl uppercase tracking-tight font-medium text-nt-white mb-4">
              {sectionTitle}
            </h2>
            <p className="text-xs font-mono text-nt-gray uppercase leading-relaxed max-w-xl">
              {sectionDesc}
            </p>
          </div>

          <div className="flex gap-4 font-mono text-xs">
            <Link 
              to="/services/drone-photography" 
              className="px-4 py-2 bg-nt-charcoal hover:bg-nt-red text-nt-white rounded border border-nt-charcoal transition-colors uppercase tracking-wider text-center"
            >
              {isNl ? "Drone Fotografie" : isDe ? "Drohnenfotografie" : "Drone Photography"}
            </Link>
            <Link 
              to="/services/drone-videography" 
              className="px-4 py-2 bg-nt-charcoal hover:bg-nt-red text-nt-white rounded border border-nt-charcoal transition-colors uppercase tracking-wider text-center"
            >
              {isNl ? "Drone Videografie" : isDe ? "Drohnenvideografie" : "Drone Videography"}
            </Link>
          </div>
        </div>

        {/* Cinematic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allDrones.map((video) => (
            <motion.div 
              key={video.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -4 }}
              className="bg-nt-charcoal/40 p-5 border border-nt-charcoal rounded-2xl flex flex-col justify-between group h-full relative"
            >
              <div>
                <a 
                  href={video.videoUrl.includes("http") ? video.videoUrl : `https://www.youtube.com/watch?v=${video.videoUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block overflow-hidden rounded-xl bg-nt-black mb-5 aspect-video"
                >
                  <img 
                    src={getYouTubeThumbnail(video.videoUrl, video.thumbnail)} 
                    onError={(e) => {
                      (e.target as HTMLImageElement).onerror = null;
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=600";
                    }}
                    className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-700"
                    alt={getTranslatedTitle(video.id, video.title)}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-transparent group-hover:bg-nt-red/10 transition-colors pointer-events-none" />
                  
                  {/* Play Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                    <div className="w-12 h-12 bg-nt-white rounded-full flex items-center justify-center text-nt-black shadow-lg">
                      <Play size={18} className="fill-nt-black ml-0.5" />
                    </div>
                  </div>
                </a>

                <div className="px-1">
                  <h3 className="text-nt-white font-display font-medium text-sm tracking-tight leading-snug group-hover:text-nt-red transition-colors line-clamp-2 uppercase">
                    {getTranslatedTitle(video.id, video.title)}
                  </h3>
                  {video.description && (
                    <p className="text-[11px] font-mono text-nt-gray mt-2.5 leading-relaxed uppercase">
                      {getTranslatedDesc(video.id, video.description)}
                    </p>
                  )}
                </div>
              </div>

              <div className="px-1 border-t border-nt-charcoal mt-5 pt-3 flex justify-between items-center text-[10px] font-mono text-nt-gray">
                <span>REEL_ID: {video.id.substr(0, 6).toUpperCase()}</span>
                <span>{video.createdAt?.toDate ? video.createdAt.toDate().toLocaleDateString() : '01.01.2026'}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

const WebPortalsSection = () => {
  const { t } = useLanguage();
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "portfolio"), 
      orderBy("createdAt", "desc")
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setVideos(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (err) => {
      console.error(err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const webProjects = [
    ...STATIC_WEB_PROJECTS,
    ...videos.filter(v => v.type === "video")
  ];

  const getTranslatedTitle = (id: string, originalTitle: string) => {
    if (id === 'static-vaiiya') return t.proj_vaiiya_title;
    return originalTitle;
  };

  const getTranslatedDesc = (id: string, originalDesc: string) => {
    switch (id) {
      case 'static-klappy': return t.proj_klappy_desc;
      case 'static-wynder': return t.proj_wynder_desc;
      case 'static-vaiiya': return t.proj_vaiiya_desc;
      case 'static-hashcube': return t.proj_hashcube_desc;
      case 'static-velvet': return t.proj_velvet_desc;
      case 'static-bybowie': return t.proj_bybowie_desc;
      default: return originalDesc;
    }
  };

  return (
    <section id="web-portals" className="py-20 px-6 bg-nt-bg border-b border-nt-light-gray relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 border-b border-nt-light-gray pb-6">
          <div className="inline-flex items-center gap-1.5 bg-nt-white border border-nt-light-gray px-2 py-0.5 rounded text-[9px] font-mono text-nt-gray mb-3 uppercase">
            <span>[04_WEB_PORTALS_SHOWCASE]</span>
          </div>
          <h2 className="font-display text-2xl md:text-4xl font-medium uppercase tracking-tight text-nt-black">
            WEB <span className="font-dot text-nt-red block sm:inline">PRODUCTIONS</span>
          </h2>
          <p className="text-[11px] font-mono text-nt-gray mt-2 uppercase">
            Tailored internet portals, secure web management applications, and full-stack cloud ecosystems.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-nt-white p-4 border border-nt-light-gray rounded-xl space-y-4 animate-pulse">
                <div className="aspect-video bg-nt-bg rounded border border-nt-light-gray w-full" />
                <div className="space-y-2">
                  <div className="h-4 bg-nt-bg rounded w-3/4" />
                  <div className="h-3 bg-nt-bg rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {webProjects.map((video) => (
              <motion.div 
                key={video.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -3 }}
                className="bg-nt-white p-4 border border-nt-light-gray rounded-xl flex flex-col justify-between group h-full relative"
              >
                <div>
                  <a 
                    href={video.videoUrl.includes("http") ? video.videoUrl : `https://www.youtube.com/watch?v=${video.videoUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block overflow-hidden rounded bg-nt-black mb-4 aspect-video"
                  >
                    <img 
                      src={getYouTubeThumbnail(video.videoUrl, video.thumbnail)} 
                      onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null;
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&q=80&w=600";
                      }}
                      className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-700"
                      alt={getTranslatedTitle(video.id, video.title)}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-transparent group-hover:bg-nt-red/5 transition-colors pointer-events-none" />
                    
                    {/* Hover technical play badge */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                      <div className="w-12 h-12 bg-nt-white rounded-full flex items-center justify-center text-nt-black shadow-lg">
                        <Play size={18} className="fill-nt-black ml-0.5" />
                      </div>
                    </div>
                  </a>

                  {/* Info block */}
                  <div className="px-1">
                    <h3 className="text-nt-black font-display font-medium text-sm tracking-tight leading-snug group-hover:text-nt-red transition-colors line-clamp-2 uppercase">
                      {getTranslatedTitle(video.id, video.title)}
                    </h3>
                    {video.description && (
                      <p className="text-[11px] font-mono text-nt-gray mt-2 leading-relaxed uppercase">
                        {getTranslatedDesc(video.id, video.description)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="px-1 border-t border-nt-bg mt-4 pt-3 flex justify-between items-center text-[10px] font-mono text-nt-gray">
                  <span>PROJ_ID: {video.id.substr(0, 6).toUpperCase()}</span>
                  <span>{video.createdAt?.toDate ? video.createdAt.toDate().toLocaleDateString() : '01.01.2026'}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const MainSite = () => {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <DroneFootageHeroSection />
        <WebPortalsSection />
        
        {/* High impact industrial Nothing CTA */}
        <section className="py-20 px-6 bg-nt-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto border-4 border-nt-black rounded-2xl relative overflow-hidden bg-nt-black text-nt-white p-12 md:p-16 nt-dot-grid-dark flex flex-col items-center">
            {/* Signal Indicator badge */}
            <div className="absolute top-4 right-4 flex items-center gap-1 bg-nt-charcoal px-3 py-1 border border-nt-charcoal rounded text-[10px] font-mono text-nt-gray uppercase">
              <span className="w-1.5 h-1.5 bg-nt-red rounded-full animate-led-blink" />
              <span>{t.cta_tag}</span>
            </div>

            <h2 className="font-display font-medium text-4xl md:text-6xl text-center uppercase tracking-tight text-nt-white mb-6">
              {t.cta_title}<br />
              <span className="font-dot text-3xl md:text-5xl text-nt-red tracking-widest block mt-2">{t.cta_title_red}</span>
            </h2>
            
            <p className="font-mono text-xs text-nt-gray text-center max-w-xl mb-10 leading-relaxed uppercase">
              {t.cta_desc}
            </p>

            <a 
              href="mailto:meneergroot@icloud.com"
              className="bg-nt-white text-nt-black font-mono font-bold text-xs uppercase tracking-widest px-8 py-4 rounded hover:bg-nt-red hover:text-nt-white transition-all shadow-xl block"
              id="footer-cta-email"
            >
              {t.cta_btn}
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

const TitleUpdater = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    if (pathname.startsWith('/services/')) {
      const slug = pathname.replace('/services/', '');
      const formattedSlug = slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      document.title = `${formattedSlug} | Stella Montis`;
    } else if (pathname === '/tech-stack') {
      document.title = "Tech Stack | Stella Montis";
    } else if (pathname === '/admin') {
      document.title = "Admin | Stella Montis";
    } else {
      document.title = "Stella Montis";
    }
  }, [pathname]);

  return null;
};

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <TitleUpdater />
        <div className="min-h-screen font-sans selection:bg-nt-red selection:text-nt-white bg-nt-bg">
          <Routes>
            <Route path="/" element={<MainSite />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/services/:slug" element={<ServicePage />} />
            <Route path="/tech-stack" element={<EquipmentPage />} />
            <Route path="/legal/:slug" element={<LegalPage />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}
