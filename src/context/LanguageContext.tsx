import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, servicesTranslations, TranslationSection, ServiceDetail } from '../lib/translations';

type Language = 'en' | 'nl' | 'de';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationSection;
  getServiceTranslation: (slug: string) => ServiceDetail | null;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // 1. Check local storage
    const saved = localStorage.getItem('stellamontis_lang');
    if (saved === 'en' || saved === 'nl' || saved === 'de') {
      return saved;
    }

    // 2. Check browser settings
    try {
      const browserLang = navigator.language || (navigator.languages && navigator.languages[0]) || '';
      const lower = browserLang.toLowerCase();
      if (lower.includes('nl')) return 'nl';
      if (lower.includes('de')) return 'de';
    } catch (e) {
      console.error('Browser language detection fallback issue', e);
    }

    return 'en';
  });

  useEffect(() => {
    // Dynamic IP/Location detection if not already stored in local storage
    const hasStored = localStorage.getItem('stellamontis_lang');
    if (!hasStored) {
      const detectCountry = async () => {
        try {
          const res = await fetch('https://ipapi.co/json/');
          if (res.ok) {
            const data = await res.json();
            const country = data.country_code || data.country;
            if (country === 'NL') {
              setLanguageState('nl');
            } else if (country === 'DE' || country === 'AT' || country === 'CH') {
              setLanguageState('de');
            }
          }
        } catch (err) {
          // Silent catch to keep clean UX
          console.debug('GeoIP detection failed or blocked', err);
        }
      };
      detectCountry();
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('stellamontis_lang', lang);
  };

  const getServiceTranslation = (slug: string): ServiceDetail | null => {
    const list = servicesTranslations[language] || servicesTranslations['en'];
    return list[slug] || null;
  };

  const val: LanguageContextProps = {
    language,
    setLanguage,
    t: translations[language] || translations['en'],
    getServiceTranslation
  };

  return (
    <LanguageContext.Provider value={val}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
