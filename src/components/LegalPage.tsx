import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Cpu, ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Footer from './Footer';
import { useLanguage } from '../context/LanguageContext';

const EN_legalContent: Record<string, { title: string; content: React.ReactNode }> = {
  'privacybeleid': {
    title: 'Privacy Policy',
    content: (
      <div className="space-y-6 text-xs font-mono text-nt-gray leading-relaxed uppercase">
        <p className="border-b border-nt-light-gray pb-2 text-nt-black font-bold">Last Updated: May 11, 2026 // REF_SEC_PRIV_01</p>
        
        <section className="space-y-2">
          <h2 className="text-sm font-display font-bold text-nt-black tracking-tight border-b border-nt-bg pb-1">1. Introduction</h2>
          <p>Stella Montis respects your privacy and is dedicated to protecting your personal data. This privacy policy informs you about how we handle your personal data when you visit our website, engage with our services, and specifies your privacy rights.</p>
        </section>
        
        <section className="space-y-2">
          <h2 className="text-sm font-display font-bold text-nt-black tracking-tight border-b border-nt-bg pb-1">2. Data We Collect</h2>
          <p>We may collect, use, store, and transfer different kinds of personal data about you, including:</p>
          <ul className="list-disc ml-4 space-y-1">
            <li><strong>Identity Data:</strong> First name, username, business name.</li>
            <li><strong>Contact Data:</strong> Email address, phone number.</li>
            <li><strong>Technical Data:</strong> IP address, device specs, browser type, and navigation telemetry.</li>
          </ul>
        </section>
        
        <section className="space-y-2">
          <h2 className="text-sm font-display font-bold text-nt-black tracking-tight border-b border-nt-bg pb-1">3. How We Use Your Data</h2>
          <p>We only use your data when the law allows us to. Most commonly, we use your data to communicate on project estimations, manage secure authentication sessions, and optimize website and application performance.</p>
        </section>
        
        <section className="space-y-2">
          <h2 className="text-sm font-display font-bold text-nt-black tracking-tight border-b border-nt-bg pb-1">4. Cookies</h2>
          <p>Our website utilizes functional and analytical cookies to maintain active sessions, authenticate login tokens, and cache layout packages.</p>
        </section>
        
        <section className="space-y-2">
          <h2 className="text-sm font-display font-bold text-nt-black tracking-tight border-b border-nt-bg pb-1">5. Contact</h2>
          <p>For inquiries regarding this privacy policy, please contact us at <a href="mailto:meneergroot@icloud.com" className="text-nt-red font-bold hover:underline">meneergroot@icloud.com</a>.</p>
        </section>
      </div>
    )
  },
  'servicevoorwaarden': {
    title: 'Terms of Service',
    content: (
      <div className="space-y-6 text-xs font-mono text-nt-gray leading-relaxed uppercase">
        <p className="border-b border-nt-light-gray pb-2 text-nt-black font-bold">Last Updated: May 11, 2026 // REF_SEC_TERMS_01</p>
        
        <section className="space-y-2">
          <h2 className="text-sm font-display font-bold text-nt-black tracking-tight border-b border-nt-bg pb-1">1. Acceptance of Terms</h2>
          <p>By engaging the services of Stella Montis or signing service delivery agreements, you agree to comply with these general terms and conditions. Please read them thoroughly before commissioning projects.</p>
        </section>
        
        <section className="space-y-2">
          <h2 className="text-sm font-display font-bold text-nt-black tracking-tight border-b border-nt-bg pb-1">2. Services</h2>
          <p>Stella Montis provides custom software engineering, native mobile app development, web precision design, and certified drone photography/videography services.</p>
        </section>
        
        <section className="space-y-2">
          <h2 className="text-sm font-display font-bold text-nt-black tracking-tight border-b border-nt-bg pb-1">3. Broadcasting and Moderation</h2>
          <p>All client communications and specifications submitted to our portals must keep standard professional confidentiality. We reserve the absolute right to suspend service access if abusive or unlawful activities are breached.</p>
        </section>
        
        <section className="space-y-2">
          <h2 className="text-sm font-display font-bold text-nt-black tracking-tight border-b border-nt-bg pb-1">4. Intellectual Property</h2>
          <p>Unless mutually agreed in writing, clients retain ownership of code assets commissioned upon final contract payment. However, Stella Montis retains normal rights over generic frameworks, open-source packages, or internal layout structures.</p>
        </section>
        
        <section className="space-y-2">
          <h2 className="text-sm font-display font-bold text-nt-black tracking-tight border-b border-nt-bg pb-1">5. Liability</h2>
          <p>Stella Montis holds no responsibility for client-submitted assets, external server configurations, or third-party web hosts.</p>
        </section>
      </div>
    )
  }
};

const NL_legalContent: Record<string, { title: string; content: React.ReactNode }> = {
  'privacybeleid': {
    title: 'Privacybeleid',
    content: (
      <div className="space-y-6 text-xs font-mono text-nt-gray leading-relaxed uppercase">
        <p className="border-b border-nt-light-gray pb-2 text-nt-black font-bold">Laatst Bijgewerkt: 11 mei 2026 // REF_SEC_PRIV_01</p>
        
        <section className="space-y-2">
          <h2 className="text-sm font-display font-bold text-nt-black tracking-tight border-b border-nt-bg pb-1">1. Inleiding</h2>
          <p>Stella Montis respecteert uw privacy en zet zich in om uw persoonlijke gegevens te beschermen. Dit privacybeleid informeert u over hoe we omgaan met uw persoonlijke gegevens wanneer u onze website bezoekt, gebruikmaakt van onze diensten en specificeert uw privacyrechten.</p>
        </section>
        
        <section className="space-y-2">
          <h2 className="text-sm font-display font-bold text-nt-black tracking-tight border-b border-nt-bg pb-1">2. Gegevens die we verzamelen</h2>
          <p>We kunnen verschillende soorten persoonlijke gegevens over u verzamelen, gebruiken, opslaan en overdragen, waaronder:</p>
          <ul className="list-disc ml-4 space-y-1">
            <li><strong>Identiteitsgegevens:</strong> Voornaam, gebruikersnaam, bedrijfsnaam.</li>
            <li><strong>Contactgegevens:</strong> E-mailadres, telefoonnummer.</li>
            <li><strong>Technische gegevens:</strong> IP-adres, apparaatspecificaties, browsertype en navigatietelemetrie.</li>
          </ul>
        </section>
        
        <section className="space-y-2">
          <h2 className="text-sm font-display font-bold text-nt-black tracking-tight border-b border-nt-bg pb-1">3. Hoe we uw gegevens gebruiken</h2>
          <p>We gebruiken uw gegevens alleen als de wet ons dat toestaat. Meestal gebruiken we uw gegevens om te communiceren over projecten schattingen, beveiligde authenticatiesessies te beheren en de website- en applicatieprestaties te optimaliseren.</p>
        </section>
        
        <section className="space-y-2">
          <h2 className="text-sm font-display font-bold text-nt-black tracking-tight border-b border-nt-bg pb-1">4. Cookies</h2>
          <p>Onze website maakt gebruik van functionele en analytische cookies om actieve sessies te onderhouden, login-tokens te authenticeren en lay-outpakketten te cachen.</p>
        </section>
        
        <section className="space-y-2">
          <h2 className="text-sm font-display font-bold text-nt-black tracking-tight border-b border-nt-bg pb-1">5. Contact</h2>
          <p>Voor vragen over dit privacybeleid kunt u contact met ons opnemen via <a href="mailto:meneergroot@icloud.com" className="text-nt-red font-bold hover:underline">meneergroot@icloud.com</a>.</p>
        </section>
      </div>
    )
  },
  'servicevoorwaarden': {
    title: 'Servicevoorwaarden',
    content: (
      <div className="space-y-6 text-xs font-mono text-nt-gray leading-relaxed uppercase">
        <p className="border-b border-nt-light-gray pb-2 text-nt-black font-bold">Laatst Bijgewerkt: 11 mei 2026 // REF_SEC_TERMS_01</p>
        
        <section className="space-y-2">
          <h2 className="text-sm font-display font-bold text-nt-black tracking-tight border-b border-nt-bg pb-1">1. Acceptatie van Voorwaarden</h2>
          <p>Door gebruik te maken van de diensten van Stella Montis of door overeenkomsten voor dienstverlening te ondertekenen, gaat u akkoord met deze algemene voorwaarden. Lees ze aandachtig door voordat u projecten in gebruik neemt.</p>
        </section>
        
        <section className="space-y-2">
          <h2 className="text-sm font-display font-bold text-nt-black tracking-tight border-b border-nt-bg pb-1">2. Diensten</h2>
          <p>Stella Montis levert softwareontwikkeling op maat, native mobiele app-ontwikkeling, web precisieontwerp en gecertificeerde dronefotografie/videografie diensten.</p>
        </section>
        
        <section className="space-y-2">
          <h2 className="text-sm font-display font-bold text-nt-black tracking-tight border-b border-nt-bg pb-1">3. Uitzending en Moderatie</h2>
          <p>Alle communicatie met de klant en de ingediende specificaties moeten voldoen aan de standaard professionele geheimhouding. Wij behouden ons het recht voor om de toegang tot onze diensten op te schorten in geval van misbruik of onwettige activiteiten.</p>
        </section>
        
        <section className="space-y-2">
          <h2 className="text-sm font-display font-bold text-nt-black tracking-tight border-b border-nt-bg pb-1">4. Intellectueel Eigendom</h2>
          <p>Tenzij schriftelijk anders is overeengekomen, behouden klanten het eigendom van de in opdracht gegeven code-assets na definitieve betaling van het contract. Stella Montis behoudt echter de normale rechten over generieke frameworks, open-source pakketten of interne lay-outstructuren.</p>
        </section>
        
        <section className="space-y-2">
          <h2 className="text-sm font-display font-bold text-nt-black tracking-tight border-b border-nt-bg pb-1">5. Aansprakelijkheid</h2>
          <p>Stella Montis kan niet verantwoordelijk worden gehouden voor door de klant ingediende assets, externe serverconfiguraties of webhosts van derden.</p>
        </section>
      </div>
    )
  }
};

const DE_legalContent: Record<string, { title: string; content: React.ReactNode }> = {
  'privacybeleid': {
    title: 'Datenschutzerklärung',
    content: (
      <div className="space-y-6 text-xs font-mono text-nt-gray leading-relaxed uppercase">
        <p className="border-b border-nt-light-gray pb-2 text-nt-black font-bold">Zuletzt Aktualisiert: 11. Mai 2026 // REF_SEC_PRIV_01</p>
        
        <section className="space-y-2">
          <h2 className="text-sm font-display font-bold text-nt-black tracking-tight border-b border-nt-bg pb-1">1. Einleitung</h2>
          <p>Stella Montis respektiert Ihre Privatsphäre und setzt sich leidenschaftlich für den Schutz Ihrer personenbezogenen Daten ein. Diese Datenschutzerklärung informiert Sie darüber, wie wir mit Ihren personenbezogenen Daten umgehen, wenn Sie unsere Website besuchen oder unsere Dienste nutzen, und legt Ihre Datenschutzrechte fest.</p>
        </section>
        
        <section className="space-y-2">
          <h2 className="text-sm font-display font-bold text-nt-black tracking-tight border-b border-nt-bg pb-1">2. Erhobene Daten</h2>
          <p>Wir können verschiedene Arten von personenbezogenen Daten über Sie erheben, nutzen, speichern und übertragen, darunter:</p>
          <ul className="list-disc ml-4 space-y-1">
            <li><strong>Identitätsdaten:</strong> Vorname, Benutzername, Firmenname.</li>
            <li><strong>Kontaktdaten:</strong> E-Mail-Adresse, Telefonnummer.</li>
            <li><strong>Technische Daten:</strong> IP-Adresse, Gerätespezifikationen, Browsertyp und Navigationstelemetrie.</li>
          </ul>
        </section>
        
        <section className="space-y-2">
          <h2 className="text-sm font-display font-bold text-nt-black tracking-tight border-b border-nt-bg pb-1">3. Datennutzung</h2>
          <p>Wir nutzen Ihre Daten nur, wenn es gesetzlich zulässig ist. Im Regelfall nutzen wir Ihre Daten zur Kommunikation über Projektschätzungen, zur Verwaltung sicherer Authentifizierungssitzungen und zur Optimierung der Website- und Anwendungsleistung.</p>
        </section>
        
        <section className="space-y-2">
          <h2 className="text-sm font-display font-bold text-nt-black tracking-tight border-b border-nt-bg pb-1">4. Cookies</h2>
          <p>Unsere Website verwendet funktionale und analytische Cookies, um aktive Sitzungen aufrechtzuerhalten, Anmeldetoken zu authentifizieren und Layout-Pakete zwischenzuspeichern.</p>
        </section>
        
        <section className="space-y-2">
          <h2 className="text-sm font-display font-bold text-nt-black tracking-tight border-b border-nt-bg pb-1">5. Kontakt</h2>
          <p>Bei Fragen zu dieser Datenschutzerklärung kontaktieren Sie uns bitte unter <a href="mailto:meneergroot@icloud.com" className="text-nt-red font-bold hover:underline">meneergroot@icloud.com</a>.</p>
        </section>
      </div>
    )
  },
  'servicevoorwaarden': {
    title: 'Nutzungsbedingungen',
    content: (
      <div className="space-y-6 text-xs font-mono text-nt-gray leading-relaxed uppercase">
        <p className="border-b border-nt-light-gray pb-2 text-nt-black font-bold">Zuletzt Aktualisiert: 11. Mai 2026 // REF_SEC_TERMS_01</p>
        
        <section className="space-y-2">
          <h2 className="text-sm font-display font-bold text-nt-black tracking-tight border-b border-nt-bg pb-1">1. Geltungsbereich</h2>
          <p>Durch die Inanspruchnahme der Dienste von Stella Montis oder die Unterzeichnung von Dienstleistungsvereinbarungen stimmen Sie diesen Allgemeinen Geschäftsbedingungen zu. Bitte lesen Sie diese vor Auftragserteilung sorgfältig durch.</p>
        </section>
        
        <section className="space-y-2">
          <h2 className="text-sm font-display font-bold text-nt-black tracking-tight border-b border-nt-bg pb-1">2. Dienstleistungen</h2>
          <p>Stella Montis bietet maßgeschneiderte Softwareentwicklung, native mobile App-Entwicklung, Web-Präzisionsdesign sowie zertifizierte Drohnenfotografie und Drohnenvideografie.</p>
        </section>
        
        <section className="space-y-2">
          <h2 className="text-sm font-display font-bold text-nt-black tracking-tight border-b border-nt-bg pb-1">3. Übertragung und Moderation</h2>
          <p>Sämtliche Kundenkommunikation und übermittelte Spezifikationen unterliegen der üblichen professionellen Vertraulichkeit. Wir behalten uns das Recht vor, den Zugang zu unseren Diensten bei missbräuchlichen oder rechtswidrigen Aktivitäten zu sperren.</p>
        </section>
        
        <section className="space-y-2">
          <h2 className="text-sm font-display font-bold text-nt-black tracking-tight border-b border-nt-bg pb-1">4. Geistiges Eigentum</h2>
          <p>Sofern nicht schriftlich anders vereinbart, behalten Kunden das Eigentum an den in Auftrag gegebenen Code-Assets nach vollständiger Bezahlung. Stella Montis behält sich jedoch die üblichen Rechte an generischen Frameworks, Open-Source-Paketen oder internen Layout-Strukturen vor.</p>
        </section>
        
        <section className="space-y-2">
          <h2 className="text-sm font-display font-bold text-nt-black tracking-tight border-b border-nt-bg pb-1">5. Haftung</h2>
          <p>Stella Montis übernimmt keine Haftung für vom Kunden bereitgestellte Assets, externe Serverkonfigurationen oder Webhosting-Anbieter von Drittanbietern.</p>
        </section>
      </div>
    )
  }
};

export default function LegalPage() {
  const { slug } = useParams();
  const { language } = useLanguage();

  const legalConfig = language === 'nl' 
    ? NL_legalContent 
    : language === 'de' 
    ? DE_legalContent 
    : EN_legalContent;

  const page = slug ? legalConfig[slug] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!page) {
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
  const returnShowcaseLabel = language === 'nl' ? '← Terug naar de hoofdpagina' : language === 'de' ? '← Zurück zur Hauptseite' : '← Return to main page';

  return (
    <div className="min-h-screen bg-nt-bg font-sans">
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
          <Link to="/" className="flex items-center gap-2 px-4 py-2 border border-nt-light-gray rounded font-mono text-xs text-nt-gray hover:text-nt-black transition-colors bg-nt-white text-sm">
            <ArrowLeft size={14} /> {backLabel}
          </Link>
        </div>
      </nav>

      <section className="pt-36 pb-20 px-6 nt-dot-grid-light">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 bg-nt-white border border-nt-light-gray px-3 py-1 rounded text-[10px] font-mono text-nt-charcoal mb-6 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-nt-red animate-led-blink" />
              <span>LEGAL_OPS // PRT_OK</span>
            </div>

            <h1 className="font-display font-medium text-3xl md:text-5xl uppercase tracking-tight text-nt-black mb-8">
              {page.title}
            </h1>
            
            <div className="bg-nt-white p-8 md:p-10 border border-nt-light-gray rounded-xl shadow-sm">
              {page.content}
            </div>

            <div className="mt-8 text-center">
              <Link to="/" className="text-[11px] font-mono uppercase tracking-widest hover:text-nt-black text-nt-red font-bold transition-colors">
                {returnShowcaseLabel}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
