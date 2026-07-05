
import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../Common/CommonComponents';
import { ProfileData } from '../../types/portfolio';
import { Github, ExternalLink, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const Projects = ({ profile }: { profile: ProfileData }) => {
    const { t } = useLanguage();

    return (
        <section id="projects" className="py-24" style={{ backgroundColor: 'var(--bg-section-alt)' }}>
            <div className="container mx-auto px-6">
                <SectionTitle
                    title={t('projects.title')}
                    subtitle={t('projects.subtitle')}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {profile.projects.map((project, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="group rounded-3xl overflow-hidden border hover:border-cyan-500/30 transition-all flex flex-col h-full"
                            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
                        >
                            {/* Image */}
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={project.imageUrl}
                                    alt={project.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-60" />
                                {/* Tech badges */}
                                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                                    {project.technologies.slice(0, 3).map((tech, j) => (
                                        <span key={j} className="text-[10px] uppercase tracking-wider font-bold bg-cyan-500/20 text-cyan-400 backdrop-blur-md px-2 py-1 rounded-md border border-cyan-500/30">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 flex flex-col flex-grow">
                                <h3
                                    className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors"
                                    style={{ color: 'var(--text-primary)' }}
                                >
                                    {project.title}
                                </h3>
                                <p className="text-sm leading-relaxed mb-6 flex-grow" style={{ color: 'var(--text-secondary)' }}>
                                    {project.description}
                                </p>

                                <div className="flex items-center gap-4 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                                    {project.githubUrl && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2.5 rounded-xl transition-all border"
                                            style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
                                            title={t('projects.viewGithub')}
                                            aria-label={t('projects.viewGithub')}
                                        >
                                            <Github size={18} />
                                        </a>
                                    )}
                                    {project.liveUrl && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white py-2.5 rounded-xl text-sm font-medium transition-all"
                                        >
                                            <ExternalLink size={16} />
                                            {t('projects.liveDemo')}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <a
                        href={profile.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-medium transition-all group border hover:border-cyan-500/50"
                        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                    >
                        <span>{t('projects.viewMore')}</span>
                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>
        </section>
    );
};
