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
  Link 
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
import AIStudioConsole from "./components/AIStudioConsole";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
        <div className="hidden md:flex items-center gap-8 font-mono text-xs text-nt-gray" id="nav-desktop">
          <a href="#features" className="hover:text-nt-black transition-colors uppercase">Features</a>
          <a href="#portfolio" className="hover:text-nt-black transition-colors uppercase">Portfolio</a>
          <Link to="/apparatuur" className="hover:text-nt-black transition-colors uppercase">Equipment</Link>
          <Link to="/admin" className="hover:text-nt-black transition-colors flex items-center gap-1.5 uppercase">
            <Lock size={12} /> Admin
          </Link>
          <a 
            href="mailto:meneergroot@icloud.com"
            className="bg-nt-black text-nt-white px-5 py-2 rounded text-xs hover:bg-nt-charcoal transition-all shadow-sm font-bold uppercase tracking-wider"
            id="nav-cta-email"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-nt-black"
          onClick={() => setIsOpen(!isOpen)}
          id="nav-mobile-toggle"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 bg-nt-white border-b border-nt-light-gray p-6 flex flex-col gap-4 shadow-lg font-mono text-xs"
          id="nav-mobile-menu"
        >
          <a href="#features" className="text-nt-black font-bold uppercase tracking-widest py-1 border-b border-nt-bg" onClick={() => setIsOpen(false)}>Features</a>
          <a href="#portfolio" className="text-nt-black font-bold uppercase tracking-widest py-1 border-b border-nt-bg" onClick={() => setIsOpen(false)}>Portfolio</a>
          <Link to="/apparatuur" className="text-nt-black font-bold uppercase tracking-widest py-1 border-b border-nt-bg" onClick={() => setIsOpen(false)}>Equipment</Link>
          <Link to="/admin" className="text-nt-black font-bold uppercase tracking-widest py-1 border-b border-nt-bg flex items-center gap-2" onClick={() => setIsOpen(false)}>
            <Lock size={12} /> Admin
          </Link>
          <a 
            href="mailto:meneergroot@icloud.com"
            className="bg-nt-black text-nt-white px-5 py-3 rounded text-center block font-bold uppercase tracking-widest mt-2"
          >
            Get Started
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
  const parts = title.split(' ');
  const first = parts[0];
  const rest = parts.slice(1).join(' ');

  return (
    <section className="pt-36 pb-20 px-6 nt-dot-grid-light bg-nt-bg border-b border-nt-light-gray relative" id="hero-section">
      {/* Absolute raw system telemetry badges */}
      <div className="absolute top-24 left-10 hidden xl:flex flex-col gap-1 text-[9px] font-mono text-nt-gray/60 leading-none">
        <span>SYS_CORE: ST-DEV-2026</span>
        <span>ENGINE_REF: GOOGLE_AI_STUDIO</span>
        <span>LOC: NETHERLANDS_AMSTERDAM</span>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side text config */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5"
        >
          {/* Micro tag block */}
          <div className="inline-flex items-center gap-2 bg-nt-white border border-nt-light-gray px-3 py-1 rounded text-xs font-mono text-nt-charcoal mb-8 tracking-wider">
             <Zap size={14} className="text-nt-red" />
             <span>[AI_STUDIO_SDK_STABLE]</span>
          </div>

          <h1 className="font-display font-medium text-4xl sm:text-6xl lg:text-7xl leading-tight uppercase text-nt-black tracking-tight mb-6">
            {first} <br /> 
            <span className="text-nt-red font-bold font-dot tracking-widest text-3xl sm:text-5xl lg:text-6xl">{rest}</span>
          </h1>

          <p className="text-sm md:text-base font-mono text-nt-gray mb-10 max-w-lg leading-relaxed">
            We develop high-performance web systems and native Android apps with pure industrial precision. Fully optimized with Google AI Studio.
          </p>

          <div className="flex flex-wrap gap-3 font-mono text-xs">
            <a 
              href="mailto:meneergroot@icloud.com"
              className="bg-nt-black text-nt-white px-6 py-3.5 rounded hover:bg-nt-charcoal transition-all shadow flex items-center gap-2 font-bold uppercase tracking-wider"
              id="hero-get-started-btn"
            >
              Get Started 
              <ArrowRight size={14} />
            </a>
            
            <a 
              href="#portfolio"
              className="bg-nt-white text-nt-black border border-nt-light-gray px-6 py-3.5 rounded hover:bg-nt-bg transition-all flex items-center gap-2 font-bold uppercase tracking-wider"
              id="hero-portfolio-btn"
            >
              <Code size={14} className="text-nt-black" /> 
              View Codebases
            </a>
          </div>
        </motion.div>

        {/* Right Side config: AI Studio Mockup Console */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="lg:col-span-7"
        >
          <AIStudioConsole />
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
  return (
    <section id="features" className="py-20 px-6 bg-nt-white border-b border-nt-light-gray relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1 bg-nt-bg border border-nt-light-gray px-3 py-1 rounded text-[10px] font-mono text-nt-gray mb-4 uppercase">
            <span>[02_DIAG_OVERVIEW]</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl uppercase tracking-tight font-medium text-nt-black mb-4">
            AESTHETIC AND <span className="font-dot text-2xl md:text-4xl text-nt-red block sm:inline">RAPID_DEV</span> PRECISION
          </h2>
          <p className="text-xs font-mono text-nt-gray max-w-lg mx-auto">
            From sleek single-view designs to native Android Kotlin workspaces, we structure your internet products with clean layouts and complete database safety.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard 
            num="D01"
            icon={Code}
            title="AI SYSTEM INTEGRATION"
            desc="Leveraging advanced prompts in Google AI Studio to deploy robust layouts, content pipelines, and active REST modules."
          />
          <FeatureCard 
            num="D02"
            icon={Smartphone}
            title="NATIVE ANDROID LAYOUTS"
            desc="Sleek, compile-verified Android applications written directly in Kotlin styled with strict layout bounds."
          />
          <FeatureCard 
            num="D03"
            icon={Layers}
            title="TAILWIND STYLE ENGINE"
            desc="Perfect visual density and typographic pairings utilizing high-performance utility classes and responsive setups."
          />
          <FeatureCard 
            num="D04"
            icon={Globe}
            title="INTERACTIVE WEB SYSTEM"
            desc="Responsive user interfaces developed with React 18 and Vite structures for instantaneous runtime speeds."
          />
          <FeatureCard 
            num="D05"
            icon={Shield}
            title="SECURED DATABASE PORTALS"
            desc="Comprehensive Firestore security rule bounds, Firebase Auth validations, and verified client-server state operations."
          />
          <FeatureCard 
            num="D06"
            icon={Zap}
            title="CLOUD RUN ORCHESTRATION"
            desc="Optimized production build parameters scaling seamlessly to balance high-volume peak metrics dynamically."
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
    title: "VAIIYA",
    videoUrl: "https://vaiiya.vercel.app/",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    description: "Official agency showcase and web presence for an advanced software engineering consultancy.",
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
    id: "static-drone-ctr",
    title: "CTR PORT OF ROTTERDAM FLYOVER",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1521747116042-5a810fa9643d?auto=format&fit=crop&q=80&w=600",
    description: "Fully permitted legal high-altitude flight operations capturing maritime cargo transitions in restricted CTR boundaries.",
    type: "drone",
    createdAt: { toDate: () => new Date("2026-05-28") }
  },
  {
    id: "static-drone-roof",
    title: "UTRECHT RESIDENTIAL ROOF INSPECTIONS",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600",
    description: "Thermal solar panel efficiency inspections and comprehensive visual roof mapping, completed in 45 minutes.",
    type: "drone",
    createdAt: { toDate: () => new Date("2026-05-27") }
  },
  {
    id: "static-drone-night",
    title: "AMSTERDAM AMSTEL BY NIGHT",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&q=80&w=600",
    description: "Cinematic twilight flight captures utilizing specialized heavy-duty stabilization rigs under robust night authorizations.",
    type: "drone",
    createdAt: { toDate: () => new Date("2026-05-26") }
  }
];

const DroneServicesSection = () => {
  return (
    <section id="drone-services" className="py-20 px-6 bg-nt-white border-b border-nt-light-gray relative nt-dot-grid-light">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 bg-nt-bg border border-nt-light-gray px-3 py-1 rounded text-[10px] font-mono text-nt-gray mb-4 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-nt-red animate-led-blink" />
            <span>[04_AERIAL_OPERATIONS]</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl uppercase tracking-tight font-medium text-nt-black mb-4">
            CERTIFIED DRONE PHOTOGRAPHY & SERVICES
          </h2>
          <p className="text-xs font-mono text-nt-gray max-w-xl mx-auto uppercase leading-relaxed">
            Lawful, high-resolution flight activities conducted under full CTR airspace authorizations. We deliver precision media assets, thermal layouts, and dynamic footage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Drone Fotografie */}
          <div className="bg-nt-bg border border-nt-light-gray rounded-2xl overflow-hidden p-6 hover:border-nt-black transition-all flex flex-col justify-between group h-full">
            <div>
              <div className="aspect-video bg-nt-light-gray rounded-xl overflow-hidden mb-6 relative">
                <img 
                  src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=600" 
                  alt="Drone Photography" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-nt-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[8px] font-mono text-nt-black font-bold uppercase border border-nt-light-gray flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-nt-red animate-pulse" />
                  CTR_PERMIT: ACTIVE
                </div>
              </div>

              <div className="flex gap-3 items-center mb-4">
                <div className="p-2 border border-nt-light-gray rounded bg-nt-white text-nt-black group-hover:bg-nt-black group-hover:text-nt-white transition-colors">
                  <Camera size={16} />
                </div>
                <h3 className="font-display font-medium uppercase tracking-tight text-base text-nt-black">Drone Photography</h3>
              </div>
              <p className="text-xs font-mono text-nt-gray leading-relaxed mb-6">
                Professional high-resolution aerial imaging. Due to our licensing profile, we operate lawfully inside restricted CTR regions for real estate and industrial needs.
              </p>
            </div>

            <Link 
              to="/services/drone-fotografie" 
              className="mt-2 self-start flex items-center gap-2 text-xs font-mono font-bold text-nt-black hover:text-nt-red transition-colors uppercase"
            >
              Configure Specifications <ArrowRight size={14} />
            </Link>
          </div>

          {/* Drone Videografie */}
          <div className="bg-nt-bg border border-nt-light-gray rounded-2xl overflow-hidden p-6 hover:border-nt-black transition-all flex flex-col justify-between group h-full">
            <div>
              <div className="aspect-video bg-nt-light-gray rounded-xl overflow-hidden mb-6 relative">
                <img 
                  src="https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&q=80&w=600" 
                  alt="Drone Videography" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-nt-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[8px] font-mono text-nt-black font-bold uppercase border border-nt-light-gray flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-nt-red animate-pulse" />
                  NIGHT_FLIGHTS: AUTHORIZED
                </div>
              </div>

              <div className="flex gap-3 items-center mb-4">
                <div className="p-2 border border-nt-light-gray rounded bg-nt-white text-nt-black group-hover:bg-nt-black group-hover:text-nt-white transition-colors">
                  <Video size={16} />
                </div>
                <h3 className="font-display font-medium uppercase tracking-tight text-base text-nt-black">Drone Videography</h3>
              </div>
              <p className="text-xs font-mono text-nt-gray leading-relaxed mb-6">
                Cinematic 4K/8K drone tracking assets. Certified for motion frames in the dark (night flights) and specialized indoor FPV configurations.
              </p>
            </div>

            <Link 
              to="/services/drone-videografie" 
              className="mt-2 self-start flex items-center gap-2 text-xs font-mono font-bold text-nt-black hover:text-nt-red transition-colors uppercase"
            >
              Configure Specifications <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const PortfolioSection = () => {
  const [filter, setFilter] = useState<"video" | "short" | "drone">("video");
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

  const filteredVideos = [
    ...(filter === "video" ? STATIC_WEB_PROJECTS : []),
    ...(filter === "drone" ? STATIC_DRONE_PROJECTS : []),
    ...videos.filter(v => v.type === filter)
  ];

  return (
    <section id="portfolio" className="py-20 px-6 bg-nt-bg relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-nt-light-gray pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-nt-white border border-nt-light-gray px-2 py-0.5 rounded text-[9px] font-mono text-nt-gray mb-3 uppercase">
              <span>[03_PROJECTS_STREAMS]</span>
            </div>
            <h2 className="font-display text-2xl md:text-4xl font-medium uppercase tracking-tight text-nt-black">
              RECENT <span className="font-dot text-nt-red block sm:inline">APPS_AND_PROJECTS</span>
            </h2>
          </div>

          {/* Solid Brutalist Switch Buttons */}
          <div className="flex flex-wrap bg-nt-white p-1 rounded border border-nt-light-gray self-start font-mono text-xs gap-1">
            <button 
              onClick={() => setFilter("video")}
              className={`px-4 py-2 rounded transition-all uppercase tracking-wider ${filter === "video" ? "bg-nt-black text-nt-white" : "text-nt-gray hover:text-nt-black text-xs"}`}
              id="portfolio-filter-web-btn"
            >
              Web Projects
            </button>
            <button 
              onClick={() => setFilter("drone")}
              className={`px-4 py-2 rounded transition-all uppercase tracking-wider ${filter === "drone" ? "bg-nt-black text-nt-white" : "text-nt-gray hover:text-nt-black text-xs"}`}
              id="portfolio-filter-drone-btn"
            >
              Drone Capture
            </button>
            <button 
              onClick={() => setFilter("short")}
              className={`px-4 py-2 rounded transition-all uppercase tracking-wider ${filter === "short" ? "bg-nt-black text-nt-white" : "text-nt-gray hover:text-nt-black text-xs"}`}
              id="portfolio-filter-android-btn"
            >
              Android Apps
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-nt-white p-4 border border-nt-light-gray rounded-xl space-y-4">
                <div className={`bg-nt-bg rounded border border-nt-light-gray animate-pulse ${filter === 'short' ? 'aspect-[9/16] max-w-[280px] mx-auto w-full' : 'aspect-video w-full'}`} />
                <div className="space-y-2">
                  <div className="h-4 bg-nt-bg rounded w-3/4 animate-pulse" />
                  <div className="h-3 bg-nt-bg rounded w-1/2 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredVideos.length === 0 ? (
          <div className="bg-nt-white p-16 rounded-xl text-center border-t border-b border-nt-light-gray font-mono text-xs text-nt-gray max-w-md mx-auto">
            <span>NO_PROJECTS_ESTABLISHED_IN_THIS_CHANNEL</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
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
                    className={`relative block overflow-hidden rounded bg-nt-black mb-4 ${filter === 'short' ? 'aspect-[9/16] max-w-[260px] mx-auto w-full' : 'aspect-video'}`}
                  >
                    <img 
                      src={getYouTubeThumbnail(video.videoUrl, video.thumbnail)} 
                      onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null;
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&q=80&w=600";
                      }}
                      className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-700"
                      alt={video.title}
                      referrerPolicy="no-referrer"
                    />
                    {/* Dark camera lines outline */}
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
                      {video.title}
                    </h3>
                    {video.description && (
                      <p className="text-[11px] font-mono text-nt-gray mt-2 leading-relaxed uppercase">
                        {video.description}
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

const MainSite = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <Features />
      <DroneServicesSection />
      <PortfolioSection />
      
      {/* High impact industrial Nothing CTA */}
      <section className="py-20 px-6 bg-nt-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto border-4 border-nt-black rounded-2xl relative overflow-hidden bg-nt-black text-nt-white p-12 md:p-16 nt-dot-grid-dark flex flex-col items-center">
          {/* Signal Indicator badge */}
          <div className="absolute top-4 right-4 flex items-center gap-1 bg-nt-charcoal px-3 py-1 border border-nt-charcoal rounded text-[10px] font-mono text-nt-gray uppercase">
            <span className="w-1.5 h-1.5 bg-nt-red rounded-full animate-led-blink" />
            <span>DEV_STABLE</span>
          </div>

          <h2 className="font-display font-medium text-4xl md:text-6xl text-center uppercase tracking-tight text-nt-white mb-6">
            START_PROJECT_ <br />
            <span className="font-dot text-3xl md:text-5xl text-nt-red tracking-widest block mt-2">SYS_ONLINE</span>
          </h2>
          
          <p className="font-mono text-xs text-nt-gray text-center max-w-xl mb-10 leading-relaxed uppercase">
            Launch your next custom web application or fully compiled native Android app with us. We deliver modular architectures, extreme peak-performance loads, and strict designs.
          </p>

          <a 
            href="mailto:meneergroot@icloud.com"
            className="bg-nt-white text-nt-black font-mono font-bold text-xs uppercase tracking-widest px-8 py-4 rounded hover:bg-nt-red hover:text-nt-white transition-all shadow-xl block"
            id="footer-cta-email"
          >
            GET IN TOUCH (EMAIL)
          </a>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans selection:bg-nt-red selection:text-nt-white bg-nt-bg">
        <Routes>
          <Route path="/" element={<MainSite />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="/apparatuur" element={<EquipmentPage />} />
          <Route path="/legal/:slug" element={<LegalPage />} />
        </Routes>
      </div>
    </Router>
  );
}
