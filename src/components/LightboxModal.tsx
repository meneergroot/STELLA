import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Play, Calendar, Globe, Cpu } from "lucide-react";
import { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

interface LightboxModalProps {
  project: {
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    thumbnail: string;
    createdAt?: any;
    type: "drone" | "web";
  } | null;
  onClose: () => void;
}

function getYouTubeId(url: string) {
  if (!url) return "";
  if (url.length === 11 && !url.includes("/") && !url.includes("?")) {
    return url;
  }
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\/shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : "";
}

export default function LightboxModal({ project, onClose }: LightboxModalProps) {
  const { language } = useLanguage();
  const isNl = language === "nl";
  const isDe = language === "de";

  // Prevent background scrolling when open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [project]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const ytId = getYouTubeId(project.videoUrl);
  const isYouTube = ytId !== "";
  const embedUrl = isYouTube ? `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0` : "";

  // Format date
  let dateStr = "01.01.2026";
  if (project.createdAt) {
    if (typeof project.createdAt.toDate === "function") {
      dateStr = project.createdAt.toDate().toLocaleDateString();
    } else if (project.createdAt instanceof Date) {
      dateStr = project.createdAt.toLocaleDateString();
    }
  }

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
        id="lightbox-container"
      >
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-nt-black/90 backdrop-blur-md cursor-pointer"
          id="lightbox-backdrop"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-5xl bg-nt-charcoal/90 border border-nt-charcoal rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
          id="lightbox-window"
        >
          {/* Close button top-right absolute */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 bg-nt-black/60 hover:bg-nt-red/80 text-nt-white rounded-full flex items-center justify-center transition-colors cursor-pointer border border-nt-charcoal/50"
            title={isNl ? "Sluiten" : isDe ? "Schließen" : "Close"}
            id="lightbox-close-btn"
          >
            <X size={16} />
          </button>

          {/* Media Player Section */}
          <div className="w-full md:w-3/5 bg-nt-black flex flex-col justify-center relative aspect-video md:aspect-auto min-h-[240px] md:min-h-[480px]">
            {isYouTube ? (
              <iframe
                src={embedUrl}
                title={project.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0 absolute inset-0"
              />
            ) : (
              /* Non-youtube (website preview) showing simulated elegant browser */
              <div className="w-full h-full flex flex-col justify-between p-4 md:p-6 relative text-nt-white">
                <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${project.thumbnail})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-nt-black via-nt-black/80 to-nt-black/40" />

                {/* Simulated Browser Bar */}
                <div className="relative z-10 w-full bg-nt-charcoal/40 border border-nt-charcoal/80 rounded px-3 py-1.5 flex items-center gap-1.5 font-mono text-[9px] text-nt-gray">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-nt-red/60" />
                    <span className="w-1.5 h-1.5 rounded-full bg-nt-gray/40" />
                    <span className="w-1.5 h-1.5 rounded-full bg-nt-gray/20" />
                  </div>
                  <span className="mx-auto truncate select-all">{project.videoUrl}</span>
                </div>

                {/* Simulated Main body element linking to actual site */}
                <div className="relative z-10 my-auto text-center flex flex-col items-center justify-center p-4">
                  <div className="w-14 h-14 bg-nt-white/5 border border-nt-charcoal hover:border-nt-red/60 text-nt-red hover:text-nt-white rounded-full flex items-center justify-center mb-4 transition-all hover:scale-105 shadow-inner">
                    <Globe size={24} />
                  </div>
                  <h4 className="font-display font-medium text-lg leading-tight tracking-wider uppercase mb-1.5 text-nt-white font-dot">{project.title}</h4>
                  <p className="font-mono text-[10px] text-nt-gray uppercase tracking-widest max-w-sm">
                    {isNl ? "DIT IS EEN LIVE WEBAPPLICATIE PORTAL" : isDe ? "DIES IST EIN LIVE WEB-ANWENDUNGSPORTAL" : "THIS IS A LIVE WEB APPLICATION PORTAL"}
                  </p>
                </div>

                {/* Bottom link panel */}
                <div className="relative z-10 w-full flex justify-center pb-2">
                  <a
                    href={project.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 bg-nt-red hover:bg-nt-white text-nt-white hover:text-nt-black text-[10px] font-mono font-bold uppercase tracking-widest rounded flex items-center gap-2 transition-all cursor-pointer shadow-lg"
                  >
                    <span>{isNl ? "BEZOEK LIVE WEBSITE" : isDe ? "LIVE-WEBSITE BESUCHEN" : "VISIT LIVE PORTAL"}</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Details Specification Section */}
          <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col justify-between bg-nt-black/95 text-nt-white font-mono uppercase text-xs">
            <div className="space-y-6">
              {/* Badge for Type */}
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[9px] font-bold tracking-wider ${
                  project.type === "drone" ? "bg-nt-red/15 text-nt-red border border-nt-red/30" : "bg-blue-500/15 text-blue-400 border border-blue-500/30"
                }`}>
                  {project.type === "drone" 
                    ? (isNl ? "DRONE PRODUCTIE" : isDe ? "DROHNENPRODUKTION" : "DRONE PRODUCTION")
                    : (isNl ? "WEB COMPOSITIE" : isDe ? "WEBKOMPOSITION" : "WEB COMPOSITION")
                  }
                </span>
                <span className="text-[10px] text-nt-gray">
                  ID: {project.id.substr(0, 8).toUpperCase()}
                </span>
              </div>

              {/* Title */}
              <div>
                <h2 className="font-display font-medium text-xl md:text-2xl text-nt-white tracking-tight Normal-case uppercase leading-tight">
                  {project.title}
                </h2>
                <div className="h-0.5 w-10 bg-nt-red mt-3" />
              </div>

              {/* Description */}
              <div className="space-y-2 mt-2">
                <span className="text-[10px] text-nt-gray block tracking-widest">[DESCRIPTION]</span>
                <p className="text-[11px] text-nt-gray leading-relaxed normal-case font-sans">
                  {project.description}
                </p>
              </div>

              {/* System Specs Mock Panel */}
              <div className="border border-nt-charcoal/60 bg-nt-charcoal/20 rounded-xl p-4 space-y-2.5 text-[10px]">
                <div className="flex justify-between border-b border-nt-charcoal/40 pb-1.5 text-nt-gray">
                  <span>SPECIFICATION</span>
                  <span>VALUE</span>
                </div>
                <div className="flex justify-between items-center text-nt-white">
                  <span className="text-nt-gray">FRAME RATE</span>
                  <span>{project.type === "drone" ? "24 / 30 / 60 FPS" : "N/A - LIVE WEB"}</span>
                </div>
                <div className="flex justify-between items-center text-nt-white">
                  <span className="text-nt-gray">RESOLUTION</span>
                  <span>{project.type === "drone" ? "4K UHD CINE" : "RESPONSIVE SPA"}</span>
                </div>
                <div className="flex justify-between items-center text-nt-white">
                  <span className="text-nt-gray">DATE PUBLISHED</span>
                  <span className="flex items-center gap-1">
                    <Calendar size={11} className="text-nt-red" />
                    {dateStr}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom action button */}
            <div className="pt-6 md:pt-0 border-t border-nt-charcoal/40 mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={project.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 bg-nt-charcoal hover:bg-nt-red text-nt-white font-mono font-bold text-center rounded text-[10px] tracking-wider transition-colors uppercase cursor-pointer block border border-nt-charcoal"
              >
                {project.type === "drone" 
                  ? (isNl ? "OPEN YT VIDEO EN REEL" : isDe ? "IN YT REEL ÖFFNEN" : "OPEN YOUTUBE VIDEO")
                  : (isNl ? "BEZOEK ONTWERP" : isDe ? "VISUALISIERUNG BEZ." : "EXPLORE DEPLOYMENT")
                }
              </a>
              <button
                onClick={onClose}
                className="px-5 py-3 bg-transparent hover:bg-nt-charcoal/40 text-nt-gray hover:text-nt-white rounded font-mono font-bold border border-nt-charcoal text-[10px] tracking-wider transition-colors uppercase cursor-pointer"
              >
                {isNl ? "SLUITEN" : isDe ? "SCHLIESSEN" : "CLOSE"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
