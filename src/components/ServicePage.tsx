import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronRight, 
  ArrowLeft, 
  Zap, 
  Shield, 
  Layers,
  Cpu,
  Play,
  Globe,
  Smartphone,
  Server,
  Camera,
  Video,
  Eye
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Footer from './Footer';
import { useLanguage } from '../context/LanguageContext';

const serviceData: Record<string, any> = {
  websites: {
    title: "Websites",
    subtitle: "Web Precision Engineering",
    desc: "Lightning-fast, high-converting, and responsive websites optimized with the latest React 18, Vite, and Tailwind CSS patterns to establish an absolute online presence.",
    features: [
      { icon: Zap, title: "AI-Driven Interfaces", desc: "Integrate smart search functions, automated customer assistants, and active generative routes using the Google AI Studio SDK." },
      { icon: Layers, title: "Responsive Layouts", desc: "Designed with absolute structural precision using Tailwind utilities to look pristine on ultra-wide monitors and smartphone screens." },
      { icon: Shield, title: "Secure Connections", desc: "Developed with secure cookie configurations, safe payment environments, and robust Firebase client privileges." }
    ],
    heroImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200",
    idCode: "DEV_WEB_WS"
  },
  'mobile-apps': {
    title: "Android Apps",
    subtitle: "Native Mobile Performance",
    desc: "Robust, scalable, and responsive mobile platforms engineered with efficient system integration, smart features, and gorgeous Material Design layouts.",
    features: [
      { icon: Smartphone, title: "Modern Kotlin Foundation", desc: "Developed with type-safe Jetpack Compose architectural patterns, fluid states, background execution, and local SQLite databases." },
      { icon: Zap, title: "AI Studio Integration", desc: "Unlock customized generative pipelines, machine learning models, and smart content processing straight inside the mobile app." },
      { icon: Shield, title: "Biometric Security", desc: "Secure local authentication loops, biometric gates, and military-grade encryption models guarding user telemetry securely." }
    ],
    heroImage: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=1200",
    idCode: "DEV_AND_MOB"
  },
  'custom-software': {
    title: "Custom AI & Software",
    subtitle: "Automate your workflows",
    desc: "Empower your business pipelines with custom web consoles, high-performance backend APIs, and resilient system integrations that scale automatically.",
    features: [
      { icon: Server, title: "Zero-Downtime Servers", desc: "Engineered with lightweight container builds designed to automatically scale and balance high peak loads without failure." },
      { icon: Cpu, title: "Smart Automation", desc: "Integrate specialized pipelines, scheduled cron tasks, and event-driven background handlers." },
      { icon: Layers, title: "Real-time Synchronization", desc: "Low-latency WebSocket tunnels and Firestore listeners distributing updates across thousands of client sessions instantly." }
    ],
    heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
    idCode: "DEV_AI_INFRA"
  },
  'drone-photography': {
    title: "Drone Photography",
    subtitle: "Certified Aerial Photography & CTR Exemptions",
    desc: "Professional high-resolution aerial imaging for real estate, commercial marketing, and industrial installations. Thanks to our unique airspace clearances and operational certificates, we can fly where others cannot—including controlled airspace (CTR) and airport zones. We handle all paperwork.",
    features: [
      { icon: Shield, title: "CTR Airspace Clearance", desc: "Leveraging our advanced certifications, we fly lawfully and safely in controlled airspace (CTR). We manage all permits and communication with air traffic controllers." },
      { icon: Camera, title: "High-Resolution Sensors", desc: "With professional-grade imaging sensors, we capture sharp detail files. Excellent for construction timelines, visual marketing campaigns, or site audits." },
      { icon: Zap, title: "Rapid Deployments", desc: "We remain on standby for flexible setups. As soon as the ideal clear skies occur, we initiate certified flight procedures." }
    ],
    heroImage: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=1200",
    idCode: "DRN_PHOTO_CTR"
  },
  'drone-videography': {
    title: "Drone Videography",
    subtitle: "Cinematic Dynamic Motion & Night Operations",
    desc: "Stunning 4K and 8K cinematic capture sequences for promotional campaigns, documentaries, and assets. Certified for special night flight operations (dark capture) and complex urban layout flight procedures.",
    features: [
      { icon: Play, title: "Certified Night Operations", desc: "One of the few operators certified for flights in twilight and darkness. Produce atmospheric video assets of illuminated skylines, night events, or midnight logistics." },
      { icon: Layers, title: "FPV & Cinema Rigs", desc: "We fly heavy cinematic setups for maximum camera stability alongside customized agile FPV (First Person View) setups for indoor pursuits and high-velocity pacing." },
      { icon: Cpu, title: "Professional Post-Production", desc: "Assets delivered in high-grade 10-bit log profiles, ready for precise color grading. We also deliver turn-key edits including sound design." }
    ],
    heroImage: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&q=80&w=1200",
    idCode: "DRN_VIDEO_NIGHT"
  }
};

function getYouTubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
}

interface HeroVideoProps {
  title: string;
  url: string;
  desc: string;
}

const HeroVideo = ({ title, url, desc }: HeroVideoProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const ytId = getYouTubeId(url);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    if (ytId) {
      target.src = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
    }
  };

  const thumbUrl = ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : '';

  return (
    <div className="border border-nt-light-gray p-4 bg-nt-white rounded-xl shadow relative max-w-4xl mx-auto mb-16 select-none">
      {/* Structural Corner Marks */}
      <div className="absolute top-2 left-2 border-t border-l border-nt-red w-3.5 h-3.5" />
      <div className="absolute top-2 right-2 border-t border-r border-nt-red w-3.5 h-3.5" />
      <div className="absolute bottom-2 left-2 border-b border-l border-nt-red w-3.5 h-3.5" />
      <div className="absolute bottom-2 right-2 border-b border-r border-nt-red w-3.5 h-3.5" />

      <div className="aspect-video bg-nt-black rounded overflow-hidden relative">
        {isPlaying && ytId ? (
          <iframe
            className="w-full h-full absolute inset-0"
            src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            onClick={() => setIsPlaying(true)}
            className="w-full h-full relative block focus:outline-none group animate-fade-in"
          >
            <img
              src={thumbUrl}
              onError={handleImageError}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              alt={title}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-transparent group-hover:bg-nt-red/5 transition-colors" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
              <div className="w-16 h-16 bg-nt-white/95 backdrop-blur-sm rounded-full flex items-center justify-center text-nt-black shadow-2xl group-hover:scale-105 transition-transform duration-300 mb-4 border border-nt-light-gray">
                <Play size={24} className="fill-nt-black ml-1 animate-pulse" />
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-nt-white bg-nt-black/80 px-4 py-1.5 rounded border border-nt-charcoal transition-all">
                PLAY DEMO REEL
              </span>
            </div>
          </button>
        )}
      </div>

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-nt-bg pt-4">
        <div>
          <h3 className="text-nt-black font-display font-medium text-lg uppercase tracking-tight leading-none mb-1.5">{title}</h3>
          <p className="text-xs font-mono text-nt-gray mt-1 leading-relaxed uppercase">{desc}</p>
        </div>
        <div className="font-mono text-[10px] text-nt-gray self-start sm:self-center">
          <span>AERIAL_REC_ID: {ytId ? ytId.toUpperCase() : 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

interface VideoCardProps {
  key?: any;
  title: string;
  url: string;
  desc?: string;
  aspect?: '16/9' | '9/16';
  badge?: string;
}

const VideoPlayCard = ({ title, url, desc, aspect = '16/9', badge }: VideoCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const ytId = getYouTubeId(url);
  const isShortValue = aspect === '9/16';

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    if (ytId) {
      target.src = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
    }
  };

  const thumbUrl = ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : '';

  return (
    <div className="p-4 bg-nt-white border border-nt-light-gray rounded-xl flex flex-col justify-between group h-full relative hover:border-nt-gray transition-colors">
      <div>
        <div className={`relative block overflow-hidden rounded bg-nt-black mb-4 mx-auto w-full ${isShortValue ? 'aspect-[9/16] max-w-[280px]' : 'aspect-video'}`}>
          {isPlaying && ytId ? (
            <iframe
              className="w-full h-full absolute inset-0"
              src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <button
              onClick={() => setIsPlaying(true)}
              className="w-full h-full relative block focus:outline-none"
            >
              <img
                src={thumbUrl}
                onError={handleImageError}
                className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-300"
                alt={title}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-transparent group-hover:bg-nt-red/5 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-nt-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-nt-black shadow-lg group-hover:scale-105 transition-transform duration-200 border border-nt-light-gray">
                  <Play size={18} className="fill-nt-black ml-0.5" />
                </div>
              </div>
            </button>
          )}
        </div>

        <div className="text-center px-1">
          <h3 className="text-nt-black font-display font-medium text-sm tracking-tight leading-snug group-hover:text-nt-red transition-colors line-clamp-2 uppercase">
            {title}
          </h3>
          {desc && (
            <p className="text-[11px] font-mono text-nt-gray mt-2 leading-relaxed uppercase">
              {desc}
            </p>
          )}
        </div>
      </div>

      <div className="px-1 border-t border-nt-bg mt-4 pt-3 flex justify-between items-center text-[10px] font-mono text-nt-gray">
        <span>{badge || `CH_ID: ${ytId ? ytId.substring(0, 6).toUpperCase() : 'N/A'}`}</span>
        <span>READY</span>
      </div>
    </div>
  );
};

export default function ServicePage() {
  const { slug } = useParams();
  const { getServiceTranslation, language } = useLanguage();

  const serviceTranslation = slug ? getServiceTranslation(slug) : null;
  const staticService = slug ? serviceData[slug] : null;

  const service = staticService ? {
    ...staticService,
    title: serviceTranslation?.title || staticService.title,
    subtitle: serviceTranslation?.subtitle || staticService.subtitle,
    desc: serviceTranslation?.desc || staticService.desc,
    features: staticService.features.map((feat: any, idx: number) => ({
      ...feat,
      title: serviceTranslation?.features?.[idx]?.title || feat.title,
      desc: serviceTranslation?.features?.[idx]?.desc || feat.desc
    }))
  } : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    const notFoundTitle = language === 'nl' ? 'PAGINA NIET GEVONDEN' : language === 'de' ? 'SEITE NICHT GEFUNDEN' : 'PAGE NOT FOUND';
    const returnBtn = language === 'nl' ? 'Terug naar Home' : language === 'de' ? 'Zurück zur Hauptseite' : 'Return to Home';

    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-nt-bg font-sans">
        <div className="text-center bg-nt-white p-8 rounded-xl border border-nt-light-gray max-w-sm">
          <h1 className="font-display font-bold text-xl uppercase mb-2">{notFoundTitle}</h1>
          <p className="font-mono text-xs text-nt-gray mb-6">FEED_CHANNEL_ESTABLISHMENT_FAILED</p>
          <Link to="/" className="text-nt-red font-mono font-bold text-xs uppercase hover:underline">{returnBtn}</Link>
        </div>
      </div>
    );
  }

  const backLabel = language === 'nl' ? 'Terug' : language === 'de' ? 'Zurück' : 'Back';
  const estimateBtn = language === 'nl' ? 'Offerte Aanvragen' : language === 'de' ? 'Angebot anfordern' : 'Request Quote';
  const diagnosticsLabel = language === 'nl' ? 'WAAROM STELLA MONTIS?' : language === 'de' ? 'WARUM STELLA MONTIS?' : 'WHY STELLA MONTIS?';
  const readyLabel = language === 'nl' ? 'KLAAR OM TE BEGINNEN?' : language === 'de' ? 'BEREIT ZU STARTEN?' : 'READY TO COMMENCE?';
  const ctaDescLabel = language === 'nl' 
    ? `Start een project of vraag aangepaste code-integraties en pijplijnen aan voor ${service.title}.` 
    : language === 'de' 
    ? `Starten Sie ein Projekt oder fragen Sie maßgeschneiderte Code-Integrationen und Pipelines an für ${service.title}.` 
    : `Start a project or request custom code integrations and pipelines for ${service.title}.`;
  const getInTouchLabel = language === 'nl' ? 'Neem contact op' : language === 'de' ? 'In Verbindung treten' : 'Get in Touch';
  const returnShowcaseLabel = language === 'nl' ? 'Terug naar showcase' : language === 'de' ? 'Zurück zur Übersicht' : 'Return to Showcase';

  return (
    <div className="min-h-screen bg-nt-bg font-sans">
      {/* Header / Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-nt-white/80 backdrop-blur-md px-6 py-4 border-b border-nt-light-gray">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 bg-nt-black rounded flex items-center justify-center text-nt-white">
              <Cpu size={16} />
            </div>
            <span className="text-sm font-dot uppercase tracking-widest text-nt-black">
              STELLA MONTIS
            </span>
          </Link>
          <Link to="/" className="flex items-center gap-2 px-4 py-2 border border-nt-light-gray rounded font-mono text-xs text-nt-gray hover:text-nt-black transition-colors bg-nt-white">
            <ArrowLeft size={14} /> {backLabel}
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-36 pb-20 px-6 nt-dot-grid-light">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 bg-nt-white border border-nt-light-gray px-3 py-1 rounded text-[10px] font-mono text-nt-charcoal mb-6 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-nt-red animate-led-blink" />
              <span>SYS_CHAN: {service.idCode}</span>
            </div>
            <h1 className="font-display font-medium text-4xl sm:text-6xl uppercase tracking-tight text-nt-black mb-6">
              {service.title}
            </h1>
            <p className="text-xs md:text-sm font-mono text-nt-gray mb-8 max-w-lg leading-relaxed">
              {service.desc}
            </p>
            <a 
              href="mailto:meneergroot@icloud.com"
              className="bg-nt-black text-nt-white px-6 py-3 rounded font-mono text-xs font-bold uppercase tracking-widest hover:bg-nt-charcoal transition-all shadow inline-block"
            >
              {estimateBtn}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            {/* Viewfinder Overlay card */}
            <div className="border border-nt-black p-3 bg-nt-white rounded-xl shadow relative">
              <div className="absolute top-1 left-1 border-t border-l border-nt-red w-3 h-3" />
              <div className="absolute top-1 right-1 border-t border-r border-nt-red w-3 h-3" />
              <div className="absolute bottom-1 left-1 border-b border-l border-nt-red w-3 h-3" />
              <div className="absolute bottom-1 right-1 border-b border-r border-nt-red w-3 h-3" />

              <div className="aspect-video bg-nt-bg rounded overflow-hidden">
                <img 
                  src={service.heroImage} 
                  alt={service.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-nt-white border-t border-b border-nt-light-gray">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-mono text-xs text-nt-gray block mb-2">[04_DIAG_FEATURES]</span>
            <h2 className="font-display text-2xl md:text-4xl uppercase tracking-tight font-medium text-nt-black">{diagnosticsLabel}</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {service.features.map((f: any, i: number) => (
              <div key={i} className="p-6 rounded-xl bg-nt-bg border border-nt-light-gray flex flex-col justify-between group min-h-[180px]">
                <div>
                  <div className="w-10 h-10 border border-nt-light-gray rounded bg-nt-white flex items-center justify-center text-nt-black mb-4 group-hover:bg-nt-black group-hover:text-nt-white transition-colors">
                    <f.icon size={18} />
                  </div>
                  <h3 className="font-display font-bold uppercase text-sm text-nt-black mb-2 tracking-tight">{f.title}</h3>
                  <p className="text-xs font-mono text-nt-gray leading-relaxed">{f.desc}</p>
                </div>
                <span className="text-[9px] font-mono text-nt-gray/50 block mt-4 select-none">MODULE_REF: {service.idCode}_{i+1}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service specific portfolio additions */}
      {slug === 'drone-videography' && (
        <section className="py-20 px-6 bg-nt-bg border-b border-nt-light-gray" id="drone-portfolio-gallery">
          <div className="max-w-7xl mx-auto animate-fade-in">
            {/* Hero 16:9 Section */}
            <div className="text-center mb-10">
              <span className="font-mono text-xs text-nt-gray block mb-2">[05_FEATURE_REEL]</span>
              <h2 className="font-display text-2xl md:text-3xl uppercase tracking-tight font-medium text-nt-black">CINEMATIC FEATURE REEL</h2>
            </div>
            
            <HeroVideo 
              title="Ask for Flowers Edit"
              url="https://www.youtube.com/watch?v=_-QNOxaNTsA"
              desc="Sleek atmospheric aerial flow tracking flora details, architecture gradients, and micro contrast alignments under clear afternoon skies."
            />

            {/* 3 smaller 16:9 videos */}
            <div className="border-t border-nt-light-gray pt-16 mb-16">
              <div className="mb-10 text-center md:text-left">
                <span className="font-mono text-xs text-nt-gray block mb-1">[06_FIELD_STUDIES]</span>
                <h2 className="font-display text-2xl uppercase tracking-tight font-medium text-nt-black">
                  RAW FLIGHTS <span className="text-nt-red font-dot">& FIELD STUDIES</span>
                </h2>
                <p className="text-[11px] font-mono text-nt-gray mt-2 uppercase">
                  Unprocessed technical samples, sensor calibration runs, and real environment drone studies.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <VideoPlayCard 
                  title="DJI Lito X1 Dead Tree Study and Flying Practice"
                  url="https://www.youtube.com/watch?v=drefid9MlTQ"
                  desc="Low altitude high precision proximity hover and navigation exercises mapping bare tree structures in sub-freezing conditions."
                  aspect="16/9"
                  badge="EXER_01_NAV"
                />
                <VideoPlayCard 
                  title="DJI Lito X1 Raw 4K 100fps | Cinematic Slow Motion"
                  url="https://www.youtube.com/watch?v=IBxP5V6HDns"
                  desc="Pure unprocessed high-framerate raw material capturing delicate branches and natural elements with advanced 10-bit color science."
                  aspect="16/9"
                  badge="SLOW_100FPS"
                />
                <VideoPlayCard 
                  title="DJI Lito X1 - Raw Footage - Dune of the Netherlands"
                  url="https://www.youtube.com/watch?v=R9Vr-BKah4o"
                  desc="Deep tracking sequences following natural beach ridges and sand dynamics with automated wind resistance adjustment."
                  aspect="16/9"
                  badge="TERR_MAPPING"
                />
              </div>
            </div>

            {/* 12 shorts */}
            <div className="border-t border-nt-light-gray pt-16">
              <div className="mb-10 text-center md:text-left">
                <span className="font-mono text-xs text-nt-gray block mb-1">[07_VERTICAL_REELS]</span>
                <h2 className="font-display text-2xl uppercase tracking-tight font-medium text-nt-black">
                  SHORT-FORM <span className="text-nt-red font-dot">VERTICALS</span>
                </h2>
                <p className="text-[11px] font-mono text-nt-gray mt-2 uppercase">
                  Highly optimized vertical sequences calibrated for mobile screens and modern social engagement.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "Do You Have Any Hobbies", url: "https://www.youtube.com/shorts/a80XHwPfc18", badge: "HOB_01" },
                  { title: "Drone Ready for Takeoff", url: "https://www.youtube.com/shorts/O8HfjpSwQbw", badge: "TKF_02" },
                  { title: "DJI Drone Sound Test Takeoff", url: "https://www.youtube.com/shorts/kluDFwdi-tI", badge: "SND_03" },
                  { title: "Only Fools Rush In", url: "https://www.youtube.com/shorts/RGKE8AmZSYI", badge: "VIB_04" },
                  { title: "He is Better Than You", url: "https://www.youtube.com/shorts/VQopVURWZrM", badge: "SKL_05" },
                  { title: "Statue Shot", url: "https://www.youtube.com/shorts/9D6ywBDw_Rg", badge: "STT_06" },
                  { title: "You do this everyday", url: "https://www.youtube.com/shorts/Nf3UuuRpgs8", badge: "DAY_07" },
                  { title: "Atomic City", url: "https://www.youtube.com/shorts/hNwBAFw6_C0", badge: "ATC_08" },
                  { title: "Taking Off", url: "https://www.youtube.com/shorts/x299Em7UThU", badge: "TOF_09" },
                  { title: "Paint it Black", url: "https://www.youtube.com/shorts/flcPRU7qH8s", badge: "PNB_10" },
                  { title: "Skyfall", url: "https://www.youtube.com/shorts/H0aXgm7_TrM" , badge: "SKY_11"},
                  { title: "Blue Birds", url: "https://www.youtube.com/shorts/i7bgPicK8d0", badge: "BLB_12" }
                ].map((short, index) => (
                  <VideoPlayCard 
                    key={index}
                    title={short.title}
                    url={short.url}
                    aspect="9/16"
                    badge={short.badge}
                  />
                ))}
              </div>
            </div>

          </div>
        </section>
      )}

      {/* CTA Box */}
      <section className="py-20 px-6 bg-nt-bg">
        <div className="max-w-4xl mx-auto border-2 border-nt-black bg-nt-black text-nt-white rounded-xl p-10 md:p-12 text-center relative overflow-hidden nt-dot-grid-dark">
          <div className="absolute top-4 left-4 flex gap-1.5 items-center font-mono text-[9px] text-nt-gray border border-nt-charcoal px-3 py-1 bg-nt-dark rounded select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-nt-red animate-led-blink" />
            <span>CONNECT: DEV_STABLE</span>
          </div>

          <h2 className="font-display font-medium text-3xl md:text-5xl uppercase tracking-tight text-nt-white mb-6">
            {readyLabel}
          </h2>
          <p className="font-mono text-xs text-nt-gray max-w-lg mx-auto mb-8 uppercase">
            {ctaDescLabel}
          </p>
          <div className="flex flex-wrap justify-center gap-3 font-mono text-xs">
            <a 
              href="mailto:meneergroot@icloud.com"
              className="bg-nt-white text-nt-black px-6 py-3 rounded font-bold uppercase tracking-wider hover:bg-nt-red hover:text-nt-white transition-colors"
            >
              {getInTouchLabel}
            </a>
            <Link to="/" className="bg-nt-dark/80 text-nt-gray border border-nt-charcoal px-6 py-3 rounded uppercase hover:text-nt-white hover:border-nt-gray transition-colors">
              {returnShowcaseLabel}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
