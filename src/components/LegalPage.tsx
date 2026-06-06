import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Drone, ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Footer from './Footer';

const legalContent: Record<string, { title: string; content: React.ReactNode }> = {
  'privacybeleid': {
    title: 'Privacy Policy',
    content: (
      <div className="space-y-6 text-xs font-mono text-nt-gray leading-relaxed uppercase">
        <p className="border-b border-nt-light-gray pb-2 text-nt-black font-bold">Last Updated: May 11, 2026 // REF_SEC_PRIV_01</p>
        
        <section className="space-y-2">
          <h2 className="text-sm font-display font-bold text-nt-black tracking-tight border-b border-nt-bg pb-1">1. Introduction</h2>
          <p>Stella Montis respects your privacy and is dedicated to protecting your personal data. This privacy policy informs you about how we handle your personal data when you visit our website and specifies your privacy rights.</p>
        </section>
        
        <section className="space-y-2">
          <h2 className="text-sm font-display font-bold text-nt-black tracking-tight border-b border-nt-bg pb-1">2. Data We Collect</h2>
          <p>We may collect, use, store, and transfer different kinds of personal data about you, including:</p>
          <ul className="list-disc ml-4 space-y-1">
            <li><strong>Identity Data:</strong> First name, last name.</li>
            <li><strong>Contact Data:</strong> Email address, phone number.</li>
            <li><strong>Technical Data:</strong> IP address, browser type, time zone setting, and geolocation metrics.</li>
          </ul>
        </section>
        
        <section className="space-y-2">
          <h2 className="text-sm font-display font-bold text-nt-black tracking-tight border-b border-nt-bg pb-1">3. How We Use Your Data</h2>
          <p>We only use your data when the law allows us to. Most commonly, we use your data to establish contact following a quote submission or to optimize our operations.</p>
        </section>
        
        <section className="space-y-2">
          <h2 className="text-sm font-display font-bold text-nt-black tracking-tight border-b border-nt-bg pb-1">4. Cookies</h2>
          <p>Our website utilizes functional and analytical cookies to improve user experience. You can configure your browser to refuse all or some browser cookies.</p>
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
          <p>By engaging the services of Stella Montis, you agree to comply with these general terms and conditions. Please read them thoroughly before commissioning a flight sequence.</p>
        </section>
        
        <section className="space-y-2">
          <h2 className="text-sm font-display font-bold text-nt-black tracking-tight border-b border-nt-bg pb-1">2. Services</h2>
          <p>Stella Montis provides professional drone videography and photography services. Every operation is preceded by a written quote or service agreement.</p>
        </section>
        
        <section className="space-y-2">
          <h2 className="text-sm font-display font-bold text-nt-black tracking-tight border-b border-nt-bg pb-1">3. Licensing and Safety</h2>
          <p>All operations are piloted by registered, fully certified flyers (A1/A3 & A2 licenses where applicable). We reserve the absolute right to cancel or reschedule any flight if weather elements, GPS diagnostics, or airport control laws restrict safe execution.</p>
        </section>
        
        <section className="space-y-2">
          <h2 className="text-sm font-display font-bold text-nt-black tracking-tight border-b border-nt-bg pb-1">4. Intellectual Property</h2>
          <p>Unless mutually agreed in writing, Stella Montis retains the copyright for all raw and master rendered assets. The client is granted a clear operational usage license as defined inside the invoice.</p>
        </section>
        
        <section className="space-y-2">
          <h2 className="text-sm font-display font-bold text-nt-black tracking-tight border-b border-nt-bg pb-1">5. Liability</h2>
          <p>Stella Montis holds comprehensive third-party liability insurance coverage for all indoor and outdoor drone operations.</p>
        </section>
      </div>
    )
  }
};

export default function LegalPage() {
  const { slug } = useParams();
  const page = slug ? legalContent[slug] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!page) {
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-nt-white/80 backdrop-blur-md px-6 py-4 border-b border-nt-light-gray">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 bg-nt-black rounded flex items-center justify-center text-nt-white">
              <Drone size={16} />
            </div>
            <span className="text-sm font-dot uppercase tracking-widest text-nt-black">
              STELLA MONTIS
            </span>
          </Link>
          <Link to="/" className="flex items-center gap-2 px-4 py-2 border border-nt-light-gray rounded font-mono text-xs text-nt-gray hover:text-nt-black transition-colors bg-nt-white text-sm">
            <ArrowLeft size={14} /> Back
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
                ← Return to main page
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
