
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Sun, Moon, Globe } from 'lucide-react';
import { ResumeButton } from '../Common/CommonComponents';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

const NAV_SECTIONS = ['about', 'skills', 'projects', 'certifications', 'experience', 'location', 'contact'] as const;
type Section = typeof NAV_SECTIONS[number];

export const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<string>('');
    const [langOpen, setLangOpen] = useState(false);
    const langRef = useRef<HTMLDivElement>(null);

    const { theme, toggleTheme } = useTheme();
    const { language, setLanguage, t } = useLanguage();

    // Scroll detection
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Active section via IntersectionObserver
    useEffect(() => {
        const observers: IntersectionObserver[] = [];
        NAV_SECTIONS.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            const obs = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
                { threshold: 0.35, rootMargin: '-60px 0px -30% 0px' }
            );
            obs.observe(el);
            observers.push(obs);
        });
        return () => observers.forEach(o => o.disconnect());
    }, []);

    // Close lang dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (langRef.current && !langRef.current.contains(e.target as Node)) {
                setLangOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const navLinks = [
        { key: 'nav.about',      href: '#about' },
        { key: 'nav.skills',     href: '#skills' },
        { key: 'nav.projects',   href: '#projects' },
        { key: 'nav.certs',      href: '#certifications' },
        { key: 'nav.experience', href: '#experience' },
        { key: 'nav.location',   href: '#location' },
        { key: 'nav.contact',    href: '#contact' },
    ] as const;

    const isActive = (href: string) => activeSection === href.slice(1);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? 'py-3 backdrop-blur-md shadow-lg border-b'
                    : 'py-5 bg-transparent'
            }`}
            style={isScrolled ? {
                backgroundColor: 'var(--bg-nav)',
                borderColor: 'var(--border)',
            } : {}}
        >
            <div className="container mx-auto px-6">
                <nav className="flex items-center justify-between" aria-label="Main navigation">
                    {/* Logo */}
                    <motion.a
                        href="#"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-2xl font-bold gradient-text"
                        aria-label="Home"
                    >
                        HARIOM<span style={{ color: 'var(--text-primary)' }}>.</span>
                    </motion.a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-6">
                        <div className="flex items-center gap-6">
                            {navLinks.map((link) => {
                                const active = isActive(link.href);
                                return (
                                    <a
                                        key={link.key}
                                        href={link.href}
                                        className={`text-sm font-medium transition-colors relative ${
                                            active ? 'text-cyan-400' : ''
                                        }`}
                                        style={!active ? { color: 'var(--text-secondary)' } : {}}
                                        aria-current={active ? 'page' : undefined}
                                    >
                                        {t(link.key)}
                                        {active && (
                                            <motion.span
                                                layoutId="nav-indicator"
                                                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-400 rounded-full"
                                            />
                                        )}
                                    </a>
                                );
                            })}
                        </div>

                        {/* Divider */}
                        <div className="h-5 w-px" style={{ backgroundColor: 'var(--border)' }} />

                        {/* Controls */}
                        <div className="flex items-center gap-2">
                            {/* Theme Toggle */}
                            <motion.button
                                id="theme-toggle"
                                onClick={toggleTheme}
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.92 }}
                                className="w-9 h-9 rounded-xl flex items-center justify-center border transition-all"
                                style={{
                                    backgroundColor: 'var(--bg-card)',
                                    borderColor: 'var(--border)',
                                    color: 'var(--text-secondary)',
                                }}
                                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    {theme === 'dark' ? (
                                        <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                            <Sun size={16} />
                                        </motion.span>
                                    ) : (
                                        <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                            <Moon size={16} />
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.button>

                            {/* Language Switcher */}
                            <div className="relative" ref={langRef}>
                                <motion.button
                                    id="lang-toggle"
                                    onClick={() => setLangOpen(v => !v)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-1.5 px-3 h-9 rounded-xl border text-sm font-medium transition-all"
                                    style={{
                                        backgroundColor: 'var(--bg-card)',
                                        borderColor: 'var(--border)',
                                        color: 'var(--text-secondary)',
                                    }}
                                    aria-label="Switch language"
                                    aria-expanded={langOpen}
                                >
                                    <Globe size={14} />
                                    <span>{language === 'en' ? 'EN' : 'नेपाली'}</span>
                                </motion.button>

                                <AnimatePresence>
                                    {langOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -6, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -6, scale: 0.95 }}
                                            transition={{ duration: 0.18 }}
                                            className="absolute right-0 top-11 w-36 rounded-xl border overflow-hidden shadow-xl z-50"
                                            style={{
                                                backgroundColor: 'var(--bg-card-solid)',
                                                borderColor: 'var(--border)',
                                            }}
                                            role="listbox"
                                            aria-label="Language options"
                                        >
                                            {[
                                                { code: 'en' as const, label: 'English', flag: '🇺🇸' },
                                                { code: 'np' as const, label: 'नेपाली', flag: '🇳🇵' },
                                            ].map(({ code, label, flag }) => (
                                                <button
                                                    key={code}
                                                    onClick={() => { setLanguage(code); setLangOpen(false); }}
                                                    role="option"
                                                    aria-selected={language === code}
                                                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors text-left"
                                                    style={{
                                                        color: language === code ? '#06b6d4' : 'var(--text-secondary)',
                                                        backgroundColor: language === code ? 'rgba(6,182,212,0.08)' : 'transparent',
                                                        fontWeight: language === code ? 600 : 400,
                                                    }}
                                                    onMouseEnter={e => {
                                                        if (language !== code) (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(6,182,212,0.05)';
                                                    }}
                                                    onMouseLeave={e => {
                                                        if (language !== code) (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                                                    }}
                                                >
                                                    <span>{flag}</span>{label}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <ResumeButton variant="header" />
                        </div>
                    </div>

                    {/* Mobile: theme + lang + hamburger */}
                    <div className="md:hidden flex items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            className="w-9 h-9 rounded-xl flex items-center justify-center border"
                            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                        </button>
                        <button
                            onClick={() => setLanguage(language === 'en' ? 'np' : 'en')}
                            className="w-9 h-9 rounded-xl flex items-center justify-center border text-xs font-bold"
                            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
                            aria-label="Switch language"
                        >
                            {language === 'en' ? 'NP' : 'EN'}
                        </button>
                        <button
                            className="rounded-xl p-2"
                            style={{ color: 'var(--text-secondary)' }}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
                        </button>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-b overflow-hidden"
                        style={{ backgroundColor: 'var(--bg-nav)', borderColor: 'var(--border)' }}
                    >
                        <div className="container mx-auto px-6 py-6 flex flex-col gap-5">
                            {navLinks.map((link) => {
                                const active = isActive(link.href);
                                return (
                                    <a
                                        key={link.key}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`text-base font-medium transition-colors ${active ? 'text-cyan-400' : ''}`}
                                        style={!active ? { color: 'var(--text-secondary)' } : {}}
                                    >
                                        {t(link.key)}
                                    </a>
                                );
                            })}
                            <div className="pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                                <ResumeButton />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};
