import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en/translation.json';
import guTranslation from './locales/gu/translation.json';
import hiTranslation from './locales/hi/translation.json';
import mrTranslation from './locales/mr/translation.json';
import paTranslation from './locales/pa/translation.json';


const resources = {
  en: {
    translation: enTranslation
  },
  gu: {
    translation: guTranslation
  },
  hi: {
    translation: hiTranslation
  },
  mr: {
    translation: mrTranslation
  },
  pa: {
    translation: paTranslation
  },
 
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;