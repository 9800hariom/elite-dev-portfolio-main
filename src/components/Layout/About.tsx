
import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../Common/CommonComponents';
import { ProfileData } from '../../types/portfolio';
import { GraduationCap, Award, Zap } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const About = ({ profile }: { profile: ProfileData }) => {
    const { t } = useLanguage();

    const philosophy = [
        { title: t('about.p1'), desc: t('about.p1Desc'), icon: Zap },
        { title: t('about.p2'), desc: t('about.p2Desc'), icon: Zap },
        { title: t('about.p3'), desc: t('about.p3Desc'), icon: Zap },
    ];

    return (
        <section id="about" className="py-24" style={{ backgroundColor: 'var(--bg-section-alt)' }}>
            <div className="container mx-auto px-6">
                <SectionTitle
                    title={t('about.title')}
                    subtitle={t('about.subtitle')}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                            {t('about.whoIs')} <span className="text-cyan-400">Hariom</span>?
                        </h3>
                        <p className="leading-relaxed mb-8 text-lg" style={{ color: 'var(--text-secondary)' }}>
                            {profile.aboutMe}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="p-6 rounded-2xl border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 mb-4">
                                    <GraduationCap size={24} />
                                </div>
                                <h4 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{t('about.education')}</h4>
                                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{profile.education[0].institution}</p>
                            </div>

                            <div className="p-6 rounded-2xl border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-4">
                                    <Award size={24} />
                                </div>
                                <h4 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{t('about.experience')}</h4>
                                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{profile.experience[0].company}</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                            {t('about.philosophy')}
                        </h3>
                        <div className="space-y-6">
                            {philosophy.map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div
                                        className="mt-1 flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-cyan-500 border"
                                        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
                                    >
                                        <item.icon size={16} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{item.title}</h4>
                                        <p style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
