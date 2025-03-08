import { useState, useEffect } from 'react';

// Define the supported languages
export type Language = 'en' | 'hi' | 'gu' | 'mr' | 'pa';

// Define translation data structure
export interface TranslationData {
  [key: string]: string | TranslationData;
}

// Import translations
import enTranslations from '../locales/en/translation.json';
import hiTranslations from '../locales/hi/translation.json';;
import guTranslations from '../locales/gu/translation.json';;
import mrTranslations from '../locales/mr/translation.json';;
import paTranslations from '../locales/pa/translation.json';;


const translations: Record<Language, TranslationData> = {
  en: enTranslations,
  hi: hiTranslations,
  gu: guTranslations,
  mr: mrTranslations,
  pa: paTranslations,
};

// Helper function to get nested values from an object using a dot-notation path
const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((prev, curr) => {
    return prev ? prev[curr] : null;
  }, obj);
};

export const useTranslation = () => {
  // Get language from localStorage or default to English
  const getSavedLanguage = (): Language => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'en';
  };

  const [language, setLanguageState] = useState<Language>(getSavedLanguage());

  // Set language and save to localStorage
  const setLanguage = (newLanguage: Language) => {
    localStorage.setItem('language', newLanguage);
    setLanguageState(newLanguage);
    // Dispatch an event so other components can react to the language change
    window.dispatchEvent(new Event('languageChange'));
  };

  // Update language if localStorage changes in another tab/window
  useEffect(() => {
    const handleStorageChange = () => {
      const currentLanguage = getSavedLanguage();
      if (currentLanguage !== language) {
        setLanguageState(currentLanguage);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('languageChange', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('languageChange', handleStorageChange);
    };
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    const translation = getNestedValue(translations[language], key);
    
    if (translation === null || translation === undefined) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    
    if (typeof translation === 'object') {
      return JSON.stringify(translation);
    }
    
    return translation;
  };

  return { language, setLanguage, t };
};