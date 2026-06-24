export interface TranslationSection {
  nav_features: string;
  nav_portfolio: string;
  nav_tech_stack: string;
  nav_admin: string;
  nav_shop: string;
  nav_get_started: string;
  nav_websites: string;
  nav_apps: string;
  nav_droneography: string;
  
  hero_tag: string;
  hero_title_first: string;
  hero_title_rest: string;
  hero_desc: string;
  hero_view_codebases: string;
  hero_view_codebases_copied: string;
  
  features_tag: string;
  features_title: string;
  features_title_red: string;
  features_desc: string;
  
  feature_1_title: string;
  feature_1_desc: string;
  feature_2_title: string;
  feature_2_desc: string;
  feature_3_title: string;
  feature_3_desc: string;
  feature_4_title: string;
  feature_4_desc: string;
  feature_5_title: string;
  feature_5_desc: string;
  feature_6_title: string;
  feature_6_desc: string;

  stream_tag: string;
  stream_title: string;
  stream_desc: string;
  stream_live_title: string;
  stream_live_desc: string;
  stream_live_link: string;
  stream_chat_title: string;
  stream_chat_desc: string;
  stream_chat_link: string;

  portfolio_tag: string;
  portfolio_title: string;
  portfolio_title_red: string;
  portfolio_tab_web: string;
  portfolio_tab_stream: string;
  portfolio_tab_vods: string;
  portfolio_no_project: string;

  cta_tag: string;
  cta_title: string;
  cta_title_red: string;
  cta_desc: string;
  cta_btn: string;

  footer_desc: string;
  footer_explore: string;
  footer_showcase: string;
  footer_case_studies: string;
  footer_services: string;
  footer_websites: string;
  footer_apps: string;
  footer_ai: string;
  footer_droneography: string;
  footer_newsletter_title: string;
  footer_newsletter_desc: string;
  footer_privacy: string;
  footer_terms: string;

  // Project item local overrides (titles / descriptions)
  proj_klappy_desc: string;
  proj_wynder_desc: string;
  proj_vaiiya_title: string;
  proj_vaiiya_desc: string;
  proj_hashcube_desc: string;
  proj_velvet_desc: string;
  proj_bybowie_desc: string;
  proj_esports_title: string;
  proj_esports_desc: string;
  proj_chat_title: string;
  proj_chat_desc: string;
  proj_analytics_title: string;
  proj_analytics_desc: string;
}

export const translations: Record<'en' | 'nl' | 'de', TranslationSection> = {
  en: {
    nav_features: "Features",
    nav_portfolio: "Portfolio",
    nav_tech_stack: "Tech Stack",
    nav_admin: "Admin",
    nav_shop: "Shop",
    nav_get_started: "Get Started",
    nav_websites: "Websites",
    nav_apps: "Apps",
    nav_droneography: "Droneography",
    
    hero_tag: "[AI_STUDIO_SDK_STABLE]",
    hero_title_first: "STELLA",
    hero_title_rest: "MONTIS",
    hero_desc: "We develop high-performance web systems and native Android apps with pure industrial precision. Fully optimized with Google AI Studio.",
    hero_view_codebases: "View Codebases",
    hero_view_codebases_copied: "COPIED!",
    
    features_tag: "[02_DIAG_OVERVIEW]",
    features_title: "HIGH-PERFORMANCE ",
    features_title_red: "WEB & SOFTWARE ARCHITECTURE",
    features_desc: "We engineer lightning-fast web systems, robust cloud backbones, and native mobile apps with absolute type safety—backed by professional droneography for high-density brand content.",
    
    feature_1_title: "WEB DEV PORTALS",
    feature_1_desc: "Tailored responsive portals, custom frontend systems, and full-stack cloud ecosystems developed with React and Vite for sub-second load times.",
    feature_2_title: "CLOUD & DATABASE INFRASTRUCTURE",
    feature_2_desc: "Robust Firebase integrations, secure Firestore rules, and auto-scaling Cloud Run server systems designed to handle immense peak volumes.",
    feature_3_title: "NATIVE MOBILE APPS",
    feature_3_desc: "Performant, compile-verified Android & iOS applications engineered with native Kotlin/Swift and sleek Jetpack Compose components.",
    feature_4_title: "AI STUDIO INTEGRATION",
    feature_4_desc: "Unlock specialized generative pipelines, intelligent content processing, and machine learning models running server-side with Google GenAI SDK.",
    feature_5_title: "E-COMMERCE & TRANSACTION SECURITY",
    feature_5_desc: "Developed with secure local cookies, payment environments, client authorizations, and custom digital storefront layouts.",
    feature_6_title: "DRONEOGRAPHY ASSETS",
    feature_6_desc: "Lawful, certified high-resolution 4K/8K aerial photography and video capture to fuel stunning web and cinematic brand aesthetics.",

    stream_tag: "[04_STREAM_OPERATIONS]",
    stream_title: "STREAMING AND INTERACTIVE OVERLAYS",
    stream_desc: "Lawful, high-resolution broadcasting pipelines optimized for maximum viewer density. We deliver premium video transcoders, web socket chat overlays, and analytics.",
    stream_live_title: "Live Broadcasting",
    stream_live_desc: "Professional sub-second latency real-time video stream casting. Ideal for high-stakes esports matches, music festivals, and interactive creator panels.",
    stream_live_link: "Configure Specifications",
    stream_chat_title: "Interactive Chat",
    stream_chat_desc: "Sleek WebSocket-driven chats and emote layouts syncing thousands of active viewer triggers seamlessly under extreme traffic peaks.",
    stream_chat_link: "Configure Specifications",

    portfolio_tag: "[03_PROJECTS_STREAMS]",
    portfolio_title: "RECENT ",
    portfolio_title_red: "APPS_AND_PROJECTS",
    portfolio_tab_web: "Web Portals",
    portfolio_tab_stream: "Stream Feeds",
    portfolio_tab_vods: "VODs / Clips",
    portfolio_no_project: "NO_PROJECTS_ESTABLISHED_IN_THIS_CHANNEL",

    cta_tag: "DEV_STABLE",
    cta_title: "START_PROJECT_ ",
    cta_title_red: "SYS_ONLINE",
    cta_desc: "Launch your next custom web application or fully compiled native Android app with us. We deliver modular architectures, extreme peak-performance loads, and strict designs.",
    cta_btn: "GET IN TOUCH (EMAIL)",

    footer_desc: "Custom web application architecture and native Android app engineering driven by state-of-the-art AI systems with pristine, industrial-grade software design.",
    footer_explore: "Explore",
    footer_showcase: "Showcase",
    footer_case_studies: "Case Studies",
    footer_services: "Services",
    footer_websites: "Websites",
    footer_apps: "Android Apps",
    footer_ai: "AI & Software",
    footer_droneography: "Droneography",
    footer_newsletter_title: "DEV_LOGS",
    footer_newsletter_desc: "Subscribe to our engineering newsletters and system release archives.",
    footer_privacy: "Privacy Policy",
    footer_terms: "Terms of Service",

    proj_klappy_desc: "A high-fidelity Flappy Bird-style web game built for addictive and responsive arcade action.",
    proj_wynder_desc: "A Tinder-style swipe app, designed exclusively for luxury watch matchmaking and discovery.",
    proj_vaiiya_title: "STELLA STREAM",
    proj_vaiiya_desc: "A high-performance live streaming platform designed for sub-second latent casting and interactive broadcast overlays.",
    proj_hashcube_desc: "A Pirate Bay-style decentralized peer-to-peer sharing and indexing platform based on IPFS hashes.",
    proj_velvet_desc: "An expansive cataloging platform for music enthusiasts and collectors, styled with a Discogs-inspired aesthetic.",
    proj_bybowie_desc: "A personal e-Commerce web platform dedicated to showcasing and selling unique handmade craftworks created by children.",
    proj_esports_title: "NORWEGIAN FJORDS AERIAL REEL",
    proj_esports_desc: "Breathtaking ultra-high definition cinematic motion tracking following vertical cliffs and fjord streams. Certified night and day flight permits.",
    proj_chat_title: "ROTTERDAM INDUSTRIAL HARBOR WORKSPACE",
    proj_chat_desc: "High-contrast mapping orthomosaics and visual status photography of shipping channels under strict CTR airspace exemptions.",
    proj_analytics_title: "ALPINE SUMMIT FREE-RIDE PERSPECTIVES",
    proj_analytics_desc: "Agile cinewhoop FPV tracking shots following mountain descents with sub-zero battery optimization. Exceptional wind-resistance ratings."
  },
  nl: {
    nav_features: "Kenmerken",
    nav_portfolio: "Portfolio",
    nav_tech_stack: "Tech Stack",
    nav_admin: "Beheer",
    nav_shop: "Winkel",
    nav_get_started: "Begin direct",
    nav_websites: "Websites",
    nav_apps: "Apps",
    nav_droneography: "Droneografie",
    
    hero_tag: "[AI_STUDIO_SDK_STABLE]",
    hero_title_first: "STELLA",
    hero_title_rest: "MONTIS",
    hero_desc: "Wij ontwikkelen krachtige websystemen en native Android-apps met pure industriële precisie. Volledig geoptimaliseerd met Google AI Studio.",
    hero_view_codebases: "Bekijk projecten",
    hero_view_codebases_copied: "GEKOPIEERD!",
    
    features_tag: "[02_DIAG_OVERVIEW]",
    features_title: "HOOGWAARDIGE ",
    features_title_red: "WEB- EN SOFTWAREARCHITECTUUR",
    features_desc: "Wij bouwen razendsnelle websystemen, robuuste cloud-infrastructuren en native mobiele apps met absolute type-veiligheid—ondersteund met professionele droneografie voor hoogwaardige achtergrondbeelden.",
    
    feature_1_title: "WEB ONTWIKKELING",
    feature_1_desc: "Op maat gemaakte responsieve portalen, frontend-systemen en full-stack cloudomgevingen ontwikkeld met React en Vite voor ongekende snelheden.",
    feature_2_title: "CLOUD & DATABASE INFRASTRUCTUUR",
    feature_2_desc: "Robuuste Firebase-integraties, beveiligde Firestore-regels en automatisch schalende Cloud Run-servers ontworpen voor extreme piekbelastingen.",
    feature_3_title: "NATIVE MOBIELE APPS",
    feature_3_desc: "Prachtige, krachtige en geverifieerde Android- & iOS-apps geschreven in native Kotlin/Swift en gestyled met moderne Compose kaders.",
    feature_4_title: "AI STUDIO INTEGRATIE",
    feature_4_desc: "Activeer intelligente tekst- en beeldbewerking, slimme filters of generatieve pipelines met de server-side Google GenAI SDK.",
    feature_5_title: "E-COMMERCE & TRANSACTIONELE VEILIGHEID",
    feature_5_desc: "Gebouwd met secure cookie-richtlijnen, veilige betaalomgevingen en op maat gemaakte digitale etalages.",
    feature_6_title: "DRONEOGRAFIE BEELDEN",
    feature_6_desc: "Gecertificeerde en legale luchtfotografie en 4K/8K video-opnames om uw websites te voorzien van adembenemende visuele merk-esthetiek.",

    stream_tag: "[04_STREAM_OPERATIONS]",
    stream_title: "STREAMING EN INTERACTIEVE OVERLAYS",
    stream_desc: "Legitieme, hoogwaardige uitzendpijplijnen geoptimaliseerd voor maximale kijkersdichtheid. Wij leveren premium video-transcoders, websocket chat-overlays en analytics.",
    stream_live_title: "Live Uitzendingen",
    stream_live_desc: "Professionele streaming met subseconde latentie. Ideaal voor e-sporttoernooien, muziekfestivals en interactieve panels.",
    stream_live_link: "Specificaties configureren",
    stream_chat_title: "Interactieve Chat",
    stream_chat_desc: "Snelle, door websockets aangedreven chats en emote-lay-outs die duizenden kijkersacties naadloos synchroniseren tijdens extremen.",
    stream_chat_link: "Specificaties configureren",

    portfolio_tag: "[03_PROJECTS_STREAMS]",
    portfolio_title: "RECENTE ",
    portfolio_title_red: "APPS_EN_PROJECTEN",
    portfolio_tab_web: "Web Portalen",
    portfolio_tab_stream: "Live Streams",
    portfolio_tab_vods: "VODs / Clips",
    portfolio_no_project: "GEEN_PROJECTEN_GEVONDEN_IN_DIT_KANAAL",

    cta_tag: "DEV_STABLE",
    cta_title: "START_PROJECT_ ",
    cta_title_red: "SYS_ONLINE",
    cta_desc: "Lanceer uw volgende op maat gemaakte webapplicatie of volledig gecompileerde native Android-app bij ons. Wij leveren modulaire architecturen, prestaties onder extreme belasting en strakke designs.",
    cta_btn: "NEEM CONTACT OP (E-MAIL)",

    footer_desc: "Op maat gemaakte webapplicatie-architectuur en native Android app-engineering aangedreven door state-of-the-art AI-systemen met strak, industrieel ontworpen software.",
    footer_explore: "Ontdekken",
    footer_showcase: "Showcase",
    footer_case_studies: "Case Studies",
    footer_services: "Diensten",
    footer_websites: "Websites",
    footer_apps: "Android Apps",
    footer_ai: "AI & Software",
    footer_droneography: "Droneografie",
    footer_newsletter_title: "DEV_LOGBOEKEN",
    footer_newsletter_desc: "Abonneer u op onze technische nieuwsbrieven en systeemarchieven.",
    footer_privacy: "Privacybeleid",
    footer_terms: "Servicevoorwaarden",

    proj_klappy_desc: "Een hoogwaardig webspel in Flappy Bird-stijl, gebouwd voor verslavende en responsieve arcade-actie.",
    proj_wynder_desc: "Een Tinder-achtige swipe-app, exclusief ontworpen voor het matchen en ontdekken van luxe horloges.",
    proj_vaiiya_title: "STELLA STREAM",
    proj_vaiiya_desc: "Een krachtig live-streamingplatform ontworpen voor uitzendingen met minimale latentie en interactieve overlays.",
    proj_hashcube_desc: "Een gedecentraliseerd peer-to-peer deel- en indexeerplatform in Pirate Bay-stijl gebaseerd op IPFS-hashes.",
    proj_velvet_desc: "Een uitgebreid catalogusplatform voor muziekliefhebbers en verzamelaars, gestyled met een op Discogs geïnspireerde esthetiek.",
    proj_bybowie_desc: "Een persoonlijk e-Commerce webplatform gewijd aan het tonen en verkopen van unieke handgemaakte handwerken gemaakt door kinderen.",
    proj_esports_title: "NOORSE FJORDE LUCHT-CINEMATOGRAFIE",
    proj_esports_desc: "Adembenemende ultra-high definition filmische bewegingsregistratie langs verticale kliffen en fjordstromingen. Gecertificeerde dag- en nachtvluchten.",
    proj_chat_title: "ROTTERDAM INDUSTRIËLE HAVEN WORKSPACE",
    proj_chat_desc: "Hoge-contrast orthomosaïsche kaarten en visuele statusfotografie van vaargeulen onder strikte CTR luchtruim-ontheffingen.",
    proj_analytics_title: "ALPINETOP IN FREE-RIDE PERSPECTIEF",
    proj_analytics_desc: "Wendbare cinewhoop FPV volgopnames tijdens bergafdalingen met sub-zero batterijoptimalisatie. Uitstekende windbestendigheid."
  },
  de: {
    nav_features: "Features",
    nav_portfolio: "Portfolio",
    nav_tech_stack: "Tech Stack",
    nav_admin: "Verwaltung",
    nav_shop: "Shop",
    nav_get_started: "Loslegen",
    nav_websites: "Websites",
    nav_apps: "Apps",
    nav_droneography: "Drohnenaufnahmen",
    
    hero_tag: "[AI_STUDIO_SDK_STABLE]",
    hero_title_first: "STELLA",
    hero_title_rest: "MONTIS",
    hero_desc: "Wir entwickeln leistungsstarke Websysteme und native Android-Apps mit reiner industrieller Präzision. Vollständig optimiert mit Google AI Studio.",
    hero_view_codebases: "Projekte Ansehen",
    hero_view_codebases_copied: "KOPIERT!",
    
    features_tag: "[02_DIAG_OVERVIEW]",
    features_title: "HOCHLEISTUNGS- ",
    features_title_red: "WEB- UND SOFTWAREDESIGN",
    features_desc: "Wir entwickeln blitzschnelle Websysteme, robuste Cloud-Backbones und native mobile Apps mit absoluter Typsicherheit – unterstützt durch professionelle Drohnenaufnahmen für hochauflösende Hintergründe.",
    
    feature_1_title: "WEB-ENTWICKLUNG",
    feature_1_desc: "Maßgeschneiderte responsive Portale, Frontend-Systeme und Full-Stack-Cloud-Ökosysteme, entwickelt mit React und Vite für sofortige Ladezeiten.",
    feature_2_title: "CLOUD- & DATENBANKINFRASTRUKTUR",
    feature_2_desc: "Umfassende Firebase-Validierungen, robuste Firestore-Regelstrukturen und sichere Cloud-Run-Skalierung für anspruchsvolle Peak-Lasten.",
    feature_3_title: "NATIVE MOBILE APPS",
    feature_3_desc: "Leistungsstarke, compiliergeprüfte Android- & iOS-Anwendungen, entwickelt mit nativem Kotlin/Swift und modernen Compose-Layouts.",
    feature_4_title: "AI STUDIO INTEGRATION",
    feature_4_desc: "Integrieren Sie intelligente KI-Suchfunktionen, automatisierte Assistenten und dynamische Routen mit dem Google AI Studio SDK.",
    feature_5_title: "E-COMMERCE & TRANSAKTIONSSICHERHEIT",
    feature_5_desc: "Entwickelt mit sicheren Cookie-Richtlinien, verifizierten Zahlungsumgebungen und benutzerdefinierten digitalen Schaufenster-Layouts.",
    feature_6_title: "DROHNENAUFNAHMEN-ASSETS",
    feature_6_desc: "Rechtmäßige, zertifizierte, hochauflösende 4K/8K-Luftaufnahmen zur Untermalung einer atemberaubenden visuellen Markenästhetik.",

    stream_tag: "[04_STREAM_OPERATIONS]",
    stream_title: "STREAMING UND INTERAKTIVE OVERLAYS",
    stream_desc: "Rechtmäßige, hochauflösende Übertragungspipelines, die für maximale Zuschauer dichte optimiert sind. Wir liefern erstklassige Video-Transcoder, Websocket-Chat-Overlays und Analysen.",
    stream_live_title: "Live-Übertragungen",
    stream_live_desc: "Professionelles Streaming mit Latenzzeiten im Subsekundenbereich. Ideal für hochkarätige E-Sports-Matches, Musikfestivals und interaktive Creator-Panels.",
    stream_live_link: "Spezifikationen konfigurieren",
    stream_chat_title: "Interaktiver Chat",
    stream_chat_desc: "Elegante WebSocket-gesteuerte Chats und Emote-Layouts, die Tausende von Zuschaueraktionen bei maximaler Auslastung synchronisieren.",
    stream_chat_link: "Spezifikationen konfigurieren",

    portfolio_tag: "[03_PROJECTS_STREAMS]",
    portfolio_title: "AKTUELLE ",
    portfolio_title_red: "APPS_UND_PROJEKTE",
    portfolio_tab_web: "Webportale",
    portfolio_tab_stream: "Live-Streams",
    portfolio_tab_vods: "VODs / Clips",
    portfolio_no_project: "KEINE_PROJEKTE_IN_DIESEM_KANAL_GEFUNDEN",

    cta_tag: "DEV_STABLE",
    cta_title: "PROJEKT_STARTEN_ ",
    cta_title_red: "SYS_ONLINE",
    cta_desc: "Starten Sie Ihre nächste maßgeschneiderte Webanwendung oder vollständig kompilierte native Android-App mit uns. Wir bieten modulare Architekturen, extreme Spitzenleistung und anspruchsvolle Designs.",
    cta_btn: "PRESSE_KONTAKT (EMAIL)",

    footer_desc: "Maßgeschneiderte Webanwendungsarchitektur und native Android-App-Entwicklung, angetrieben von modernsten KI-Systemen mit makellosem, industriellem Softwaredesign.",
    footer_explore: "Erkunden",
    footer_showcase: "Showcase",
    footer_case_studies: "Fallstudien",
    footer_services: "Dienstleistungen",
    footer_websites: "Websites",
    footer_apps: "Android-Apps",
    footer_ai: "KI & Software",
    footer_droneography: "Drohnenaufnahmen",
    footer_newsletter_title: "DEV_LOGS",
    footer_newsletter_desc: "Abonnieren Sie unsere technischen Newsletter und System-Release-Archive.",
    footer_privacy: "Datenschutzrichtlinie",
    footer_terms: "Nutzungsbedingungen",

    proj_klappy_desc: "Ein hochauflösendes Webspiel im Flappy Bird-Stil, das für fesselnde und reaktionsschnelle Arcade-Action gebaut wurde.",
    proj_wynder_desc: "Eine Swipe-App im Tinder-Stil, die exklusiv für das Finden und Entdecken von Luxusuhren konzipiert ist.",
    proj_vaiiya_title: "STELLA STREAM",
    proj_vaiiya_desc: "Eine leistungsstarke Live-Streaming-Plattform, die für Latenzen im Subsekundenbereich und interaktive Broadcast-Overlays entwickelt wurde.",
    proj_hashcube_desc: "Eine dezentrale Peer-to-Peer-Sharing- und Indexierungsplattform im Pirate Bay-Stil, die auf IPFS-Hashes basiert.",
    proj_velvet_desc: "Eine umfassende Katalogisierungsplattform für Musikliebhaber und Sammler im Discogs-Stil.",
    proj_bybowie_desc: "Eine persönliche E-Commerce-Webplattform zur Präsentation und zum Verkauf von einzigartigem, handgefertigtem Kunsthandwerk von Kindern.",
    proj_esports_title: "NORWEGISCHE FJORDE LUFTAUFNAHMEN",
    proj_esports_desc: "Atemberaubende Ultra-High-Definition filmische Bewegungsverfolgung entlang vertikaler Klippen und Fjordströme. Zertifizierte Nacht- und Tagflüge.",
    proj_chat_title: "ROTTERDAM INDUSTRIEHAFEN-KARTIERUNG",
    proj_chat_desc: "Kontrastreiche orthomoische Kartierungen und visuelle Statusfotografie von Schiffsfahrrinnen unter strengen CTR-Luftraumausnahmen.",
    proj_analytics_title: "ALPENGIPFEL FREE-RIDE PERSPEKTIVE",
    proj_analytics_desc: "Agile Cinewhoop FPV Verfolgungsaufnahmen bei Abfahrten in den Bergen mit Sub-Zero Batterieoptimierung. Hervorragende Windbeständigkeit."
  }
};

// Add structural translations for Services (since they are detailed pages)
export interface FeatureDetail {
  title: string;
  desc: string;
}

export interface ServiceDetail {
  title: string;
  subtitle: string;
  desc: string;
  features: FeatureDetail[];
}

export const servicesTranslations: Record<'en' | 'nl' | 'de', Record<string, ServiceDetail>> = {
  en: {
    websites: {
      title: "Websites",
      subtitle: "Web Precision Engineering",
      desc: "Lightning-fast, high-converting, and responsive websites optimized with the latest React 18, Vite, and Tailwind CSS patterns to establish an absolute online presence.",
      features: [
        { title: "AI-Driven Interfaces", desc: "Integrate smart search functions, automated customer assistants, and active generative routes using the Google AI Studio SDK." },
        { title: "Responsive Layouts", desc: "Designed with absolute structural precision using Tailwind utilities to look pristine on ultra-wide monitors and smartphone screens." },
        { title: "Secure Connections", desc: "Developed with secure cookie configurations, safe payment environments, and robust Firebase client privileges." }
      ]
    },
    'mobile-apps': {
      title: "Android Apps",
      subtitle: "Native Mobile Performance",
      desc: "Robust, scalable, and responsive mobile platforms engineered with efficient system integration, smart features, and gorgeous Material Design layouts.",
      features: [
        { title: "Modern Kotlin Foundation", desc: "Developed with type-safe Jetpack Compose architectural patterns, fluid states, background execution, and local SQLite databases." },
        { title: "AI Studio Integration", desc: "Unlock customized generative pipelines, machine learning models, and smart content processing straight inside the mobile app." },
        { title: "Biometric Security", desc: "Secure local authentication loops, biometric gates, and military-grade encryption models guarding user telemetry securely." }
      ]
    },
    'custom-software': {
      title: "Custom AI & Software",
      subtitle: "Automate your workflows",
      desc: "Empower your business pipelines with custom web consoles, high-performance backend APIs, and resilient system integrations that scale automatically.",
      features: [
        { title: "Zero-Downtime Servers", desc: "Engineered with lightweight container builds designed to automatically scale and balance high peak loads without failure." },
        { title: "Smart Automation", desc: "Integrate specialized pipelines, scheduled cron tasks, and event-driven background handlers." },
        { title: "Real-time Synchronization", desc: "Low-latency WebSocket tunnels and Firestore listeners distributing updates across thousands of client sessions instantly." }
      ]
    },
    'droneography': {
      title: "Droneography",
      subtitle: "Certified Aerial Cinematography, Photography & CTR Exemptions",
      desc: "Professional high-resolution aerial imaging and cinematic video capturing for real estate, commercial marketing, and industrial installations. Thanks to our unique airspace clearances and operational certificates, we fly lawfully and safely in controlled airspace (CTR), urban environments, and during night operations. We handle all paperwork and planning.",
      features: [
        { title: "CTR Airspace Clearance", desc: "Leveraging our advanced certifications, we fly lawfully and safely in controlled airspace (CTR). We manage all permits and communication with air traffic controllers." },
        { title: "High-Resolution Sensors", desc: "With professional-grade imaging sensors, we capture sharp detail files. Excellent for construction timelines, visual marketing campaigns, or site audits." },
        { title: "Cinematic Night Operations", desc: "One of the few operators certified for flights in twilight and darkness. Produce atmospheric video assets of illuminated skylines, night events, or midnight logistics." }
      ]
    }
  },
  nl: {
    websites: {
      title: "Websites",
      subtitle: "Web precisie-engineering",
      desc: "Razendsnelle, converterende en volledig responsieve websites geverifieerd met de nieuwste React 18, Vite en Tailwind CSS standaarden voor een onverslaanbare online presentatie.",
      features: [
        { title: "AI-gestuurde interfaces", desc: "Integreer slimme zoekfuncties, geautomatiseerde assistenten en adaptieve routes met de Google AI Studio SDK." },
        { title: "Perfecte lay-outs", desc: "Ontworpen met absolute structurele precisie via Tailwind-utilities voor een perfecte weergave op elk scherm formaat." },
        { title: "Beveiligde verbindingen", desc: "Gebouwd met secure cookie-richtlijnen, veilige betaalomgevingen en strikte Firebase client-authorisaties." }
      ]
    },
    'mobile-apps': {
      title: "Android-Apps",
      subtitle: "Native Mobiele Prestaties",
      desc: "Robuuste en responsieve mobiele platforms ontworpen met efficiënte systeemintegratie, slimme functies en prachtige Material Design-lay-outs.",
      features: [
        { title: "Kotlin Fundament", desc: "Ontwikkeld met type-safe Jetpack Compose, soepele animaties, achtergrondtaken en lokale SQLite-versleuteling." },
        { title: "AI Studio Integratie", desc: "Activeer intelligente tekst- en beeldbewerking of slimme filters in uw mobiele werkstroom." },
        { title: "Biometrische Veiligheid", desc: "Beveiligde toegangspoorten, vingerafdrukverificatie en sterke encryptiemodellen voor ultieme privacy." }
      ]
    },
    'custom-software': {
      title: "Custom AI & Software",
      subtitle: "Automatiseer uw workflows",
      desc: "Geef uw bedrijfsprocessen extra kracht met beheerdersconsoles, snelle API's en schaalbare systeemkoppelingen die volledig automatisch functioneren.",
      features: [
        { title: "Zero-Downtime servers", desc: "Gebouwd met lichte containers die dynamisch meeschalen op basis van de activiteit zonder haperingen." },
        { title: "Slimme Automatisering", desc: "Koppel geavanceerde scripts, periodieke cron-taken en gebeurtenisgestuurde achtergrondprocessen." },
        { title: "Real-time synchronisatie", desc: "Snel websockettunnels en actieve Firestore-luisteraars die updates direct distribueren naar duizenden sessies." }
      ]
    },
    'droneography': {
      title: "Droneografie",
      subtitle: "Gecertificeerde Luchtopnames, Cinematografie & CTR Ontheffingen",
      desc: "Professionele luchtfoto's in hoge resolutie en cinematografische video-opnames voor vastgoed, commerciële promotie en industriële inspectie. Dankzij onze unieke vliegbewijzen en operationele licenties vliegen we legaal en veilig in gecontroleerde luchtruimen (CTR), boven bebouwing en tijdens nachtvluchten. Wij regelen alle ontheffingen en planning.",
      features: [
        { title: "CTR Luchtruim Ontheffing", desc: "Wij vliegen legaal en veilig in gecontroleerde zones rondom vliegvelden. Wij coördineren rechtstreeks met de luchtverkeersleiding." },
        { title: "Hoge Resolutie Sensoren", desc: "Voorzien van professionele camera's leggen we elk detail scherp vast voor bouwverslagen of marketing." },
        { title: "Gecertificeerde Nachtvluchten", desc: "Een van de weinige operators met toestemming voor vluchten bij diepe schemering en duisternis. Prachtige beelden van verlichte skylines." }
      ]
    }
  },
  de: {
    websites: {
      title: "Websites",
      subtitle: "Web-Präzisionsentwicklung",
      desc: "Blitzschnelle, konvertierungsstarke und benutzerfreundliche Websites, optimiert mit den neuesten React 18-, Vite- und Tailwind CSS-Konfigurationen für eine starke Online-Präsenz.",
      features: [
        { title: "KI-gestützte Schnittstellen", desc: "Integrieren Sie intelligente Suchfunktionen, automatisierte Assistenten und dynamische Routen mit dem Google AI Studio SDK." },
        { title: "Responsive Layouts", desc: "Mit absoluter struktureller Präzision über Tailwind-Utilities entworfen, um auf jedem Monitor und Smartphone perfekt auszusehen." },
        { title: "Sichere Verbindungen", desc: "Entwickelt mit sicheren Cookie-Richtlinien, verifizierten Zahlungsumgebungen und strengen Firebase-Client-Berechtigungen." }
      ]
    },
    'mobile-apps': {
      title: "Android-Apps",
      subtitle: "Native Mobile Performance",
      desc: "Robuste, skalierbare und responsive mobile Plattformen, entwickelt mit effizienter Systemintegration und modernen Material Design-Layouts.",
      features: [
        { title: "Moderne Kotlin-Basis", desc: "Entwickelt mit typsicheren Jetpack Compose-Strukturen, flüssigen Zuständen, Hintergrundprozessen und lokaler SQLite-Verschlüsselung." },
        { title: "AI Studio Integration", desc: "Ermöglichen Sie intelligente Text- und Bildverarbeitungsfunktionen direkt in Ihrer mobilen App." },
        { title: "Biometrische Sicherheit", desc: "Sichere Anmeldeschleifen, biometrische Barrieren und starke Verschlüsselungstechnologien für höchste Datensparsamkeit." }
      ]
    },
    'custom-software': {
      title: "Individuelle KI & Software",
      subtitle: "Automatisieren Sie Ihre Prozesse",
      desc: "Stärken Sie Ihre Geschäftsprozesse mit maßgeschneiderten Webkonsolen, leistungsstarken APIs und stabilen Systemintegrationen, die automatisch skalieren.",
      features: [
        { title: "Zero-Downtime-Server", desc: "Entwickelt mit schlanken Container-Builds, die sich bei hoher Auslastung automatisch und verzögerungsfrei anpassen." },
        { title: "Intelligente Automatisierung", desc: "Integrieren Sie spezialisierte Skripte, regelmäßige Cron-Schedules und ereignisgesteuerte Hintergrundprozesse." },
        { title: "Echtzeit-Synchronisierung", desc: "WebSocket-Verbindungen und aktive Firestore-Listener für eine sofortige Datenverteilung an Tausende von Benutzern zeitgleich." }
      ]
    },
    'droneography': {
      title: "Drohnenaufnahmen",
      subtitle: "Zertifizierte Luftbild-Kinematografie, Fotografie & CTR-Freigaben",
      desc: "Professionelle hochauflösende Luftbildaufnahmen und filmische Drohnenvideografie für Immobilien, Marketing und Industrieanlagen. Dank unserer speziellen Luftraumzulassungen fliegen wir legal und sicher in kontrollierten Lufträumen (CTR), über städtischen Gebieten und bei Nacht. Wir übernehmen alle Genehmigungen und Formalitäten.",
      features: [
        { title: "CTR-Luftraumfreigabe", desc: "Dank unserer Zertifizierungen fliegen wir absolut legal und sicher in gesperrten Flughafenbereichen. Wir koordinieren direkt mit der Flugsicherung." },
        { title: "Hochauflösende Sensoren", desc: "Mit professionellen Kamerasystemen erfassen wir jedes Detail perfekt für Bautagebücher, Inspektionen oder Werbekampagnen." },
        { title: "Zertifizierter Nachtbetrieb", desc: "Zugelassen für Flüge bei Nacht. Beeindruckende Aufnahmen beleuchteter Skylines, nächtlicher Events oder Logistikparks." }
      ]
    }
  }
};
