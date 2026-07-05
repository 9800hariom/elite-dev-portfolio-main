
import React from 'react';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

export const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
    <div className="text-center mb-16">
        <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-4 gradient-text"
        >
            {title}
        </motion.h2>
        {subtitle && (
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg max-w-2xl mx-auto"
                style={{ color: 'var(--text-secondary)' }}
            >
                {subtitle}
            </motion.p>
        )}
    </div>
);

export const ResumeButton = ({ variant = 'primary' }: { variant?: 'primary' | 'secondary' | 'header' }) => {
    const { t } = useLanguage();

    const styles = {
        primary: "flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-3 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/25",
        secondary: "flex items-center gap-2 border hover:border-cyan-500/50 hover:text-cyan-400 px-8 py-3 rounded-full font-medium transition-all",
        header: "hidden md:flex items-center gap-2 bg-slate-800/50 hover:bg-slate-700/50 text-cyan-400 border border-cyan-500/20 px-4 py-2 rounded-lg text-sm transition-all",
    };

    const label = variant === 'header' ? t('nav.resume') : t('nav.resume');

    return (
        <a
            href="/Hariom yadav resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles[variant]}
            style={variant === 'secondary' ? { borderColor: 'var(--border)', color: 'var(--text-secondary)' } : {}}
        >
            <Download size={variant === 'header' ? 16 : 20} />
            <span>{label}</span>
        </a>
    );
};
