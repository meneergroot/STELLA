import React, { useEffect } from 'react';
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
  'drone-fotografie': {
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
  'drone-videografie': {
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

export default function ServicePage() {
  const { slug } = useParams();
  const service = slug ? serviceData[slug] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-nt-bg font-sans">
        <div className="text-center bg-nt-white p-8 rounded-xl border border-nt-light-gray max-w-sm">
          <h1 className="font-display font-bold text-xl uppercase mb-2">PAGE NOT FOUND</h1>
          <p className="font-mono text-xs text-nt-gray mb-6">FEED_CHANNEL_ESTABLISHMENT_FAILED</p>
          <Link to="/" className="text-nt-red font-mono font-bold text-xs uppercase hover:underline">Return to Home</Link>
        </div>
      </div>
    );
  }

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
            <ArrowLeft size={14} /> Back
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
              Request Quote
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
            <h2 className="font-display text-2xl md:text-4xl uppercase tracking-tight font-medium text-nt-black">WHY STELLA MONTIS?</h2>
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

      {/* CTA Box */}
      <section className="py-20 px-6 bg-nt-bg">
        <div className="max-w-4xl mx-auto border-2 border-nt-black bg-nt-black text-nt-white rounded-xl p-10 md:p-12 text-center relative overflow-hidden nt-dot-grid-dark">
          <div className="absolute top-4 left-4 flex gap-1.5 items-center font-mono text-[9px] text-nt-gray border border-nt-charcoal px-3 py-1 bg-nt-dark rounded select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-nt-red animate-led-blink" />
            <span>CONNECT: DEV_STABLE</span>
          </div>

          <h2 className="font-display font-medium text-3xl md:text-5xl uppercase tracking-tight text-nt-white mb-6">
            READY TO COMMENCE?
          </h2>
          <p className="font-mono text-xs text-nt-gray max-w-lg mx-auto mb-8 uppercase">
            Start a project or request custom code integrations and pipelines for {service.title}.
          </p>
          <div className="flex flex-wrap justify-center gap-3 font-mono text-xs">
            <a 
              href="mailto:meneergroot@icloud.com"
              className="bg-nt-white text-nt-black px-6 py-3 rounded font-bold uppercase tracking-wider hover:bg-nt-red hover:text-nt-white transition-colors"
            >
              Get in Touch
            </a>
            <Link to="/" className="bg-nt-dark/80 text-nt-gray border border-nt-charcoal px-6 py-3 rounded uppercase hover:text-nt-white hover:border-nt-gray transition-colors">
              Return to Showcase
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
