
import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../Common/CommonComponents';
import { ProfileData } from '../../types/portfolio';
import { Briefcase, Calendar, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const Experience = ({ profile }: { profile: ProfileData }) => {
    const { t } = useLanguage();

    return (
        <section id="experience" className="py-24 relative">
            <div className="container mx-auto px-6">
                <SectionTitle
                    title={t('exp.title')}
                    subtitle={t('exp.subtitle')}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Work Experience */}
                    <div>
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-400">
                                <Briefcase size={24} />
                            </div>
                            <h3 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{t('exp.workLabel')}</h3>
                        </div>

                        <div className="space-y-8 relative">
                            {/* Timeline vertical line */}
                            <div className="absolute left-[1.6rem] top-2 bottom-2 w-[2px]" style={{ backgroundColor: 'var(--border)' }} />
                            <div className="space-y-8 relative">
                                {profile.experience.map((exp, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        className="relative pl-12"
                                    >
                                        <div className="absolute left-4 top-2 w-4 h-4 bg-cyan-500 rounded-full border-4 z-10" style={{ borderColor: 'var(--bg-base)' }} />
                                        <div
                                            className="p-8 rounded-2xl border hover:opacity-90 transition-colors group"
                                            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
                                        >
                                            <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                                                <div>
                                                    <h4 className="text-xl font-bold group-hover:text-cyan-400 transition-colors" style={{ color: 'var(--text-primary)' }}>{exp.role}</h4>
                                                    <div className="text-cyan-400 font-medium">{exp.company}</div>
                                                </div>
                                                <span className="px-3 py-1 rounded-full text-xs border" style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
                                                    {exp.period}
                                                </span>
                                            </div>
                                            <ul className="space-y-3">
                                                {exp.description.map((point, j) => (
                                                    <li key={j} className="flex gap-3 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                                        <CheckCircle2 size={16} className="text-cyan-500 flex-shrink-0 mt-0.5" />
                                                        {point}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Education */}
                    <div>
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400">
                                <Calendar size={24} />
                            </div>
                            <h3 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{t('exp.eduLabel')}</h3>
                        </div>

                        <div className="space-y-8">
                            {profile.education.map((edu, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    className="p-8 rounded-2xl border hover:opacity-90 transition-colors"
                                    style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
                                >
                                    <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                                        <div>
                                            <h4 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{edu.degree}</h4>
                                            <div className="text-blue-400 font-medium">{edu.institution}</div>
                                        </div>
                                        <span className="px-3 py-1 rounded-full text-xs border" style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
                                            {edu.period}
                                        </span>
                                    </div>
                                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{edu.details}</p>
                                    <div className="mt-4 pt-4 border-t text-xs font-mono text-cyan-500/70" style={{ borderColor: 'var(--border)' }}>
                                        {edu.semester}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
