import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  Cpu, 
  Maximize, 
  ShieldCheck, 
  ArrowLeft,
  ChevronRight,
  CheckCircle,
  HelpCircle,
  Code,
  Layers,
  Smartphone,
  Server
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

export default function EquipmentPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            <ArrowLeft size={14} /> Home
          </Link>
        </div>
      </nav>

      {/* Hero Section / Tech Datasheet Header */}
      <section className="pt-36 pb-20 px-6 nt-dot-grid-light">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:w-1/2"
            >
              <div className="inline-flex items-center gap-2 bg-nt-white border border-nt-light-gray px-3 py-1 rounded text-[10px] font-mono text-nt-charcoal mb-6">
                <span className="w-2 h-2 rounded-full bg-nt-red animate-led-blink" />
                <span>BUILD_SHEET // GOOGLE_AI_CORE</span>
              </div>
              <h1 className="font-display font-medium text-4xl sm:text-6xl uppercase tracking-tight text-nt-black mb-6 leading-none">
                OUR TECH <span className="font-dot text-nt-red block sm:inline">STACK</span>
              </h1>
              <p className="text-sm md:text-base font-mono text-nt-gray mb-10 leading-relaxed max-w-lg">
                The ultimate tech stack for fast, responsive web systems and native Android apps. Fully optimized with Google AI Studio to write and deploy pristine code at speeds never seen before.
              </p>
              
              {/* Technical stat grids */}
              <div className="grid grid-cols-3 gap-4 font-mono text-xs text-nt-charcoal">
                <div className="bg-nt-white p-4 border border-nt-light-gray rounded-lg">
                  <span className="block text-2xl font-bold font-display text-nt-black mb-1">VITE</span>
                  <span className="text-[9px] text-nt-gray uppercase tracking-widest">REACT // ULTRA FAST</span>
                </div>
                <div className="bg-nt-white p-4 border border-nt-light-gray rounded-lg">
                  <span className="block text-2xl font-bold font-display text-nt-black mb-1">KOTLIN</span>
                  <span className="text-[9px] text-nt-gray uppercase tracking-widest">NATIVE MOBILE</span>
                </div>
                <div className="bg-nt-white p-4 border border-nt-light-gray rounded-lg">
                  <span className="block text-2xl font-bold font-display text-nt-black mb-1">SECURE</span>
                  <span className="text-[9px] text-nt-gray uppercase tracking-widest">FIREBASE CLOUD</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:w-1/2 relative"
            >
              <div className="relative border-2 border-nt-black p-4 bg-nt-white rounded-xl shadow-lg overflow-hidden">
                {/* Viewfinder graphics */}
                <div className="absolute top-2 left-2 border-t border-l border-nt-red w-3 h-3" />
                <div className="absolute top-2 right-2 border-t border-r border-nt-red w-3 h-3" />
                <div className="absolute bottom-2 left-2 border-b border-l border-nt-red w-3 h-3" />
                <div className="absolute bottom-2 right-2 border-b border-r border-nt-red w-3 h-3" />
                
                <div className="aspect-square rounded bg-nt-bg flex items-center justify-center p-6 border border-nt-light-gray">
                  <img 
                    src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800" 
                    alt="Sleek coding interface" 
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Visual sensors section */}
      <section className="py-20 px-6 bg-nt-black text-nt-white border-t border-b border-nt-charcoal relative nt-dot-grid-dark">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="font-mono text-[10px] text-nt-gray block mb-2">// 02_AI_INTELLIGENCE_LAYER</span>
            <h2 className="font-display font-medium text-3xl md:text-5xl uppercase tracking-tight text-nt-white mb-6">
              COGNITIVE <br /> AND <span className="font-dot text-nt-red tracking-widest text-2xl md:text-4xl">LOGIC</span>
            </h2>
            <p className="text-xs font-mono text-nt-gray mb-8 leading-relaxed max-w-lg">
              We leverage Google AI Studio to unlock automated text and image generation, smart indexing databases, and real-time contextual interactions directly inside websites and Android wrappers.
            </p>
            
            <ul className="space-y-4 font-mono text-xs">
              <li className="flex items-start gap-3 p-4 bg-nt-dark border border-nt-charcoal rounded-xl">
                <CheckCircle size={16} className="text-nt-red shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold uppercase text-nt-white text-xs mb-1">Smart LLM Inference</h4>
                  <p className="text-[11px] text-nt-gray">Integrating Google's latest Gemini models to summarize user actions, create layouts, and query datasets securely.</p>
                </div>
              </li>
              <li className="flex items-start gap-3 p-4 bg-nt-dark border border-nt-charcoal rounded-xl">
                <CheckCircle size={16} className="text-nt-red shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold uppercase text-nt-white text-xs mb-1">Vite Dev Engine</h4>
                  <p className="text-[11px] text-nt-gray">Lightning-fast dev server setup ensuring modular assets are packaged, transpiled, and compiled in split seconds.</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="border border-nt-charcoal p-3 bg-nt-charcoal/20 rounded-xl relative">
            <img 
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800" 
              className="rounded w-full aspect-video object-cover border border-nt-charcoal opacity-95 hover:opacity-100 transition-opacity" 
              alt="Development Server and Logs" 
            />
          </div>
        </div>
      </section>

      {/* Hardware Gallery section */}
      <section className="py-20 px-6 bg-nt-white border-b border-nt-light-gray">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 w-full">
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="border border-nt-light-gray p-2 bg-nt-bg rounded-xl">
                    <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=400" className="rounded w-full aspect-square object-cover" alt="Kotlin code block" />
                  </div>
                  <div className="border border-nt-light-gray p-2 bg-nt-bg rounded-xl">
                    <img src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=600" className="rounded w-full aspect-video object-cover" alt="Frontend design workstation" />
                  </div>
                </div>
                <div className="pt-8">
                  <div className="border border-nt-light-gray p-2 bg-nt-bg rounded-xl">
                    <img src="https://images.unsplash.com/photo-1534972195531-d756b9bda9f2?auto=format&fit=crop&q=80&w=400" className="rounded w-full aspect-[3/4] object-cover" alt="Mobile layouts testing" />
                  </div>
                </div>
             </div>
          </div>
          
          <div className="flex-1 w-full">
            <span className="font-mono text-[10px] text-nt-gray block mb-1">// 03_SOFTWARE_PERF</span>
            <h2 className="font-display font-medium text-3xl md:text-5xl uppercase tracking-tight text-nt-black mb-6">
              MODULAR_ <br/><span className="font-dot text-nt-red text-2xl md:text-4xl tracking-widest">ARCHITECTURE</span>
            </h2>
            <p className="text-xs font-mono text-nt-gray mb-8 leading-relaxed max-w-lg">
              We design web platforms and Android apps focused on code maintainability. Splitting architectures into modular units guarantees lightning fast startup speeds and error-free extensions.
            </p>
            
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center gap-4 p-4 border border-nt-light-gray rounded-xl bg-nt-bg">
                 <div className="w-10 h-10 border border-nt-light-gray bg-nt-white rounded flex items-center justify-center shrink-0 text-nt-black">
                    <Layers size={18} />
                 </div>
                 <div>
                    <h5 className="font-bold uppercase text-xs text-nt-black">Tailwind Visuals</h5>
                    <p className="text-[11px] text-nt-gray">Clean, component-contained utility structures that shrink final production assets to absolute minimal bytes.</p>
                  </div>
              </div>
              <div className="flex items-center gap-4 p-4 border border-nt-light-gray rounded-xl bg-nt-bg">
                 <div className="w-10 h-10 border border-nt-light-gray bg-nt-white rounded flex items-center justify-center shrink-0 text-nt-black">
                    <Code size={18} />
                 </div>
                 <div>
                    <h5 className="font-bold uppercase text-xs text-nt-black">Type-Safe Controllers</h5>
                    <p className="text-[11px] text-nt-gray">Strictest lint structures and TypeScript compile-checks preventing state mutations and memory leaks.</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced tracking logic */}
      <section className="py-20 px-6 bg-nt-bg border-b border-nt-light-gray">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="font-mono text-[10px] text-nt-gray block mb-1">// 04_AUTOMATION_ROUTINES</span>
              <h2 className="font-display font-medium text-3xl md:text-5xl uppercase tracking-tight text-nt-black mb-4">
                INTELLIGENT <br/><span className="font-dot text-nt-red text-2xl md:text-4xl tracking-widest">BACKEND</span>
              </h2>
            </div>
            <div className="border border-nt-light-gray px-4 py-1.5 rounded bg-nt-white font-mono text-[10px] text-nt-charcoal font-bold uppercase">
               ActiveSync_2.0_STABLE
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="border border-nt-light-gray p-2 rounded-xl bg-nt-white">
                <img src="https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=800" alt="ActiveSync Engine" className="w-full aspect-video object-cover rounded" />
              </div>
              <h3 className="text-base font-display font-bold uppercase text-nt-black">Reactive State Listeners</h3>
              <p className="text-xs font-mono text-nt-gray">Fully integrated Firestore listeners that dispatch visual telemetry states across thousands of concurrent client sessions instantly.</p>
            </div>
            <div className="space-y-4">
              <div className="border border-nt-light-gray p-2 rounded-xl bg-nt-white">
                <img src="https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=800" alt="Error Diagnostics console" className="w-full aspect-video object-cover rounded" />
              </div>
              <h3 className="text-base font-display font-bold uppercase text-nt-black">Secure Endpoint Routing</h3>
              <p className="text-xs font-mono text-nt-gray">Encrypted middleware layers matching request parameters and verifying session states to protect administrative dashboards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Controller section */}
      <section className="py-20 px-6 bg-nt-white border-b border-nt-light-gray text-center">
        <div className="max-w-3xl mx-auto">
          <span className="font-mono text-[10px] text-nt-gray block mb-2">// 05_CODE_COLLABORATION</span>
          <h2 className="font-display font-medium text-3xl md:text-5xl uppercase tracking-tight text-nt-black mb-8">
            CLOUD_RUN <span className="font-dot text-nt-red tracking-widest text-2xl md:text-4xl">DEPLOY_ENGINE</span>
          </h2>
          <div className="border border-nt-light-gray p-3 bg-nt-bg rounded-xl max-w-xl mx-auto mb-8">
            <img src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=1000" alt="Cloud Console Monitoring" className="rounded w-full object-cover" />
          </div>
          <p className="text-xs font-mono text-nt-gray leading-relaxed uppercase max-w-xl mx-auto">
            All codebases are compiled and deployed to high-performance Cloud Run instances. This serverless network automatically matches peak visitor load counts with sub-millisecond response times.
          </p>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-20 px-6 bg-nt-bg">
        <div className="max-w-4xl mx-auto border-2 border-nt-black bg-nt-black text-nt-white rounded-xl p-10 md:p-12 text-center relative overflow-hidden nt-dot-grid-dark">
          <div className="absolute top-4 left-4 flex gap-1.5 items-center font-mono text-[9px] text-nt-gray border border-nt-charcoal px-3 py-1 bg-nt-dark rounded select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-nt-red animate-led-blink" />
            <span>CONNECT: DEV_ESTABLISHED</span>
          </div>

          <h2 className="font-display font-medium text-3xl md:text-5xl uppercase tracking-tight text-nt-white mb-6">
            EXPERIENCE THE AI VELOCITY
          </h2>
          <p className="font-mono text-xs text-nt-gray max-w-lg mx-auto mb-8 uppercase">
            Our build platform is configured and ready to roll. Let us construct stable web environments and native app modules for your workspace.
          </p>
          <div className="flex flex-wrap justify-center gap-3 font-mono text-xs">
            <a 
              href="mailto:meneergroot@icloud.com"
              className="bg-nt-white text-nt-black px-6 py-3 rounded font-bold uppercase tracking-wider hover:bg-nt-red hover:text-nt-white transition-colors animate-pulse"
            >
              INITIATE PROJECT
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
