import React from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Heart } from 'lucide-react';
import { ProfileData } from '../../types/portfolio';
import { useLanguage } from '../../contexts/LanguageContext';

export const Footer = ({ profile }: { profile: ProfileData }) => {
    const currentYear = new Date().getFullYear();
    const { t, language } = useLanguage();

    const navItems = language === 'en'
        ? ['About', 'Skills', 'Experience', 'Projects', 'Contact']
        : ['मेरो बारेमा', 'सीपहरू', 'अनुभव', 'परियोजनाहरू', 'सम्पर्क'];

    const navHrefs = ['about', 'skills', 'experience', 'projects', 'contact'];

    return (
        <footer className="pt-20 pb-10 border-t" style={{ backgroundColor: 'var(--footer-bg)', borderColor: 'var(--footer-border)' }}>
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="md:col-span-2">
                        <a href="#" className="text-2xl font-bold gradient-text mb-6 inline-block">
                            HARIOM<span style={{ color: 'var(--text-primary)' }}>.</span>
                        </a>
                        <p className="text-lg mb-8 max-w-md leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            {profile.careerFocus}. {t('footer.tagline')}
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: Github, href: profile.github, label: 'GitHub' },
                                { icon: Linkedin, href: profile.linkedin, label: 'LinkedIn' },
                            ].map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="w-10 h-10 rounded-lg flex items-center justify-center border hover:text-cyan-400 transition-all"
                                    style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text-muted)' }}
                                >
                                    <social.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 uppercase tracking-wider text-sm" style={{ color: 'var(--text-primary)' }}>
                            {t('footer.navigation')}
                        </h4>
                        <ul className="space-y-4">
                            {navItems.map((item, idx) => (
                                <li key={idx}>
                                    <a
                                        href={`#${navHrefs[idx]}`}
                                        className="hover:text-cyan-400 transition-colors"
                                        style={{ color: 'var(--text-muted)' }}
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 uppercase tracking-wider text-sm" style={{ color: 'var(--text-primary)' }}>
                            {t('footer.quickContact')}
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3" style={{ color: 'var(--text-secondary)' }}>
                                <Mail size={16} className="text-cyan-500" />
                                <span className="truncate text-sm">{profile.email}</span>
                            </li>
                            <li className="flex items-center gap-3" style={{ color: 'var(--text-secondary)' }}>
                                <Phone size={16} className="text-cyan-500" />
                                <span className="text-sm">{profile.phone}</span>
                            </li>
                            <li className="flex items-center gap-3" style={{ color: 'var(--text-secondary)' }}>
                                <MapPin size={16} className="text-cyan-500" />
                                <span className="text-sm">{profile.location}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6" style={{ borderColor: 'var(--footer-border)' }}>
                    <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        © {currentYear} {profile.name}. {t('footer.rights')}
                    </div>
                    <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                        {t('footer.madeWith')} <Heart size={14} className="text-red-500 fill-red-500" /> in Nepal
                    </div>
                </div>
            </div>
        </footer>
    );
};
