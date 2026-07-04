
import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../Common/CommonComponents';
import { ProfileData } from '../../types/portfolio';
import { Github, ExternalLink, ChevronRight } from 'lucide-react';

export const Projects = ({ profile }: { profile: ProfileData }) => {
    return (
        <section id="projects" className="py-24 bg-slate-900/50">
            <div className="container mx-auto px-6">
                <SectionTitle
                    title="Featured Projects"
                    subtitle="A selection of my recent work across web development and design."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {profile.projects.map((project, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="group bg-slate-800/40 rounded-3xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/30 transition-all flex flex-col h-full"
                        >
                            {/* Image Container */}
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={project.imageUrl}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-60" />

                                {/* Tech Badges on Image */}
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
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                                    {project.description}
                                </p>

                                <div className="flex items-center gap-4 pt-4 border-t border-slate-700/50">
                                    {project.githubUrl && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2.5 bg-slate-900 hover:bg-slate-700 text-gray-400 hover:text-white rounded-xl transition-all"
                                            title="View GitHub"
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
                                            Live Demo
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
                        className="inline-flex items-center gap-2 px-8 py-4 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 hover:border-cyan-500/50 text-white rounded-2xl font-medium transition-all group"
                    >
                        <span>View More Projects on GitHub</span>
                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>
        </section>
    );
};
