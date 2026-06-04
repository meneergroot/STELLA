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
    subtitle: "Precisie-engineering op het web",
    desc: "Bliksemsnelle, hoog-converterende en responsieve websites, geoptimaliseerd met de nieuwste React 18-, Vite- en Tailwind CSS-patronen om een ijzersterke online aanwezigheid te vestigen.",
    features: [
      { icon: Zap, title: "AI-Gestuurde Interfaces", desc: "Integreer slimme zoekfuncties, geautomatiseerde klantassistenten en actieve generatieve routes met de Google AI Studio SDK." },
      { icon: Layers, title: "Responsieve Lay-outs", desc: "Ontworpen met absolute structurele precisie met behulp van Tailwind utilities om er perfect uit te zien op ultra-wide monitoren en smartphone-schermen." },
      { icon: Shield, title: "Veilige Koppelingen", desc: "Ontwikkeld met een veilig cookiebeleid, veilige betaalomgevingen en solide Firebase-gebruikersrechten." }
    ],
    heroImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200",
    idCode: "DEV_WEB_WS"
  },
  'mobile-apps': {
    title: "Android Apps",
    subtitle: "Native prestaties op mobiel",
    desc: "Robuuste, schaalbare en responsieve mobiele platforms ontworpen met efficiënte systeemintegratie, slimme functies en prachtige Material Design-lay-outs.",
    features: [
      { icon: Smartphone, title: "Moderne Kotlin-basis", desc: "Ontwikkeld met type-veilige Jetpack Compose-architectuur met vloeiende states, achtergronduitvoering en lokale SQLite-databases." },
      { icon: Zap, title: "AI Studio-integratie", desc: "Ontgrendel aangepaste generatieve pipelines, machine learning-modellen en slimme verwerking van inhoud direct binnen de mobiele app." },
      { icon: Shield, title: "Biometrische Beveiliging", desc: "Beveiligde lokale authenticatielussen, biometrische toegangspoorten en encryptiemodellen van militair niveau om gebruikersgegevens te beschermen." }
    ],
    heroImage: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=1200",
    idCode: "DEV_AND_MOB"
  },
  'custom-software': {
    title: "AI & Software op Maat",
    subtitle: "Automatiseer uw werkstromen",
    desc: "Versterk uw bedrijfsprocessen met webconsoles op maat, krachtige backend-API's en betrouwbare systeemintegraties die automatisch meeschalen.",
    features: [
      { icon: Server, title: "Zero-Downtime Servers", desc: "Ontwikkeld met lichtgewicht containers die ontworpen zijn om dynamisch op en neer te schalen om piekbelastingen op te vangen zonder uitval." },
      { icon: Cpu, title: "Slimmere Automatisering", desc: "Integreer gespecialiseerde verwerkingsprocessen, geplande datataken en gebeurtenisgestuurde achtergrondbewerkingen." },
      { icon: Layers, title: "Realtime Synchronisatie", desc: "WebSocket-netwerken met lage latentie en Firestore-listeners die updates direct verspreiden over duizenden gelijktijdige sessies." }
    ],
    heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
    idCode: "DEV_AI_INFRA"
  },
  'drone-fotografie': {
    title: "Drone Fotografie",
    subtitle: "Gecertificeerde Luchtfotografie & CTR Ontheffingen",
    desc: "Professionele luchtfotografie in ultra-hoge resolutie voor vastgoed, commerciële marketing en industriële projecten. Met onze speciale ontheffingen en operationele certificeringen mogen en kunnen wij vliegen waar anderen dat niet mogen, inclusief gecontroleerde luchtruimen (CTR) of nabij vliegvelden. Wij regelen al het papierwerk.",
    features: [
      { icon: Shield, title: "CTR Luchtruim Ontheffing", desc: "Door onze geavanceerde certificeringen en ontheffingen vliegen wij legaal en veilig in gecontroleerd luchtruim (CTR). Wij handelen alle vergunningen en communicatie met luchtverkeersleiding af." },
      { icon: Camera, title: "Hoge Resolutie Beelden", desc: "Met professionele camera-sensoren leggen wij elk detail haarscherp vast. Perfect voor projectontwikkeling, marketingcampagnes, landmetingen en detail-analyses." },
      { icon: Zap, title: "Last-Minute Inzetbaar", desc: "Wij staan altijd stand-by voor een snelle en flexibele inzet. Zodra de perfecte weersomstandigheden zich voordoen, stijgen onze gecertificeerde piloten op." }
    ],
    heroImage: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=1200",
    idCode: "DRN_PHOTO_CTR"
  },
  'drone-videografie': {
    title: "Drone Videografie",
    subtitle: "Cinematografische Dynamic Motion & Nachtvluchten",
    desc: "Adembenemende 4K en 8K video-opnames voor commercials, documentaires en promoties. Gecertificeerd voor speciale nachtvluchten (opnames in het donker) en complexe stedelijke scenario's. Wij leveren dynamisch, gestabiliseerd beeldmateriaal en verzorgen eventueel ook spectaculaire openingsacts.",
    features: [
      { icon: Play, title: "Gecertificeerde Nachtvluchten", desc: "Als een van de weinige operators gecertificeerd voor vluchten tijdens de avond en nacht. Creëer waanzinnige, sfeervolle beelden van verlichte steden, festivals en nachtelijke infrastructuur." },
      { icon: Layers, title: "FPV & Cinema Rigs", desc: "Wij vliegen met zowel zware cinema-drones voor maximale stabiliteit als wendbare FPV (First Person View) drones voor spectaculaire, dynamische indoor of high-speed opnames." },
      { icon: Cpu, title: "Professionele Nabewerking", desc: "Beelden geleverd in hoogwaardige 10-bit log-formaten, gereed voor perfecte kleurcorrectie (color grading). Desgewenst leveren we een direct inzetbare montage inclusief sound design." }
    ],
    heroImage: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&q=80&w=1200",
    idCode: "DRN_VIDEO_NIGHT"
  },
  'drone-dakinspectie': {
    title: "Drone Dakinspectie",
    subtitle: "Snelle, Veilige & Thermische Dakscans",
    desc: "Laat daken, zonnepanelen, schoorstenen en industriële constructies veilig inspecteren met een drone. Een traditionele dakinspectie kost veel tijd door de huur en inzet van een hoogwerker. Onze drones voeren een complete inspectie binnen een uur uit, zonder fysieke risico's of wegafzettingen.",
    features: [
      { icon: Shield, title: "Geen Hoogwerker Nodig", desc: "Bespaar direct op de hoge kosten en het logistieke gedoe van een hoogwerker. Onze drones scannen het dak vanaf veilige hoogte, zonder fysieke belasting of schade aan dakpannen." },
      { icon: Eye, title: "Thermische & Optische Analyse", desc: "Indien gewenst uitgerust met warmtebeeldcamera's (thermal imaging) om warmtelekken, vochtophopingen, defecte zonnepanelen en verborgen schade direct op te sporen." },
      { icon: Zap, title: "Binnen Één Uur Geklaard", desc: "Een volledige scan is meestal binnen een uur voltooid. U ontvangt de beelden direct ter plaatse of in een overzichtelijke digitale datarapportage kort na de vlucht." }
    ],
    heroImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1200",
    idCode: "DRN_INSP_ROOF"
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
          <h1 className="font-display font-bold text-xl uppercase mb-2">PAGINA NIET GEVONDEN</h1>
          <p className="font-mono text-xs text-nt-gray mb-6">FEED_CHANNEL_ESTABLISHMENT_FAILED</p>
          <Link to="/" className="text-nt-red font-mono font-bold text-xs uppercase hover:underline">Terug naar de Startpagina</Link>
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
            <ArrowLeft size={14} /> Terug
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
              Offerte Aanvragen
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
            <span className="font-mono text-xs text-nt-gray block mb-2">[04_DIAG_FUNCTIES]</span>
            <h2 className="font-display text-2xl md:text-4xl uppercase tracking-tight font-medium text-nt-black">WAAROM DEZE DIENST?</h2>
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
            <span>CONNECT: DEV_STABIEL</span>
          </div>

          <h2 className="font-display font-medium text-3xl md:text-5xl uppercase tracking-tight text-nt-white mb-6">
            KLAAR VOOR DE START?
          </h2>
          <p className="font-mono text-xs text-nt-gray max-w-lg mx-auto mb-8 uppercase">
            Start een project of vraag op maat gemaakte code-oplossingen aan voor {service.title}.
          </p>
          <div className="flex flex-wrap justify-center gap-3 font-mono text-xs">
            <a 
              href="mailto:meneergroot@icloud.com"
              className="bg-nt-white text-nt-black px-6 py-3 rounded font-bold uppercase tracking-wider hover:bg-nt-red hover:text-nt-white transition-colors"
            >
              Neem Contact Op
            </a>
            <Link to="/" className="bg-nt-dark/80 text-nt-gray border border-nt-charcoal px-6 py-3 rounded uppercase hover:text-nt-white hover:border-nt-gray transition-colors">
              Terug naar de Startpagina
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
