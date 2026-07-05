import React, { createContext, useContext, useState, useCallback } from 'react';
import { translations, TranslationKey, Language } from '../i18n/translations';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType>({
    language: 'en',
    setLanguage: () => {},
    t: (key) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>(() => {
        try {
            const saved = localStorage.getItem('portfolio-lang') as Language | null;
            if (saved === 'en' || saved === 'np') return saved;
        } catch { /* ignore */ }
        return 'en';
    });

    const setLanguage = useCallback((lang: Language) => {
        setLanguageState(lang);
        try { localStorage.setItem('portfolio-lang', lang); } catch { /* ignore */ }
    }, []);

    const t = useCallback(
        (key: TranslationKey): string => {
            return translations[language][key] ?? translations['en'][key] ?? key;
        },
        [language]
    );

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
