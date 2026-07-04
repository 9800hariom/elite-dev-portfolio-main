
import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../Common/CommonComponents';
import { ProfileData } from '../../types/portfolio';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export const Experience = ({ profile }: { profile: ProfileData }) => {
    return (
        <section id="experience" className="py-24 relative">
            <div className="container mx-auto px-6">
                <SectionTitle
                    title="Career Journey"
                    subtitle="A timeline of my professional growth and educational background."
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Work/Training Experience */}
                    <div>
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-400">
                                <Briefcase size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-white">Experience</h3>
                        </div>

                        <div className="space-y-8 relative before:absolute before:left-[1.6rem] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-800">
                            {profile.experience.map((exp, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    className="relative pl-12"
                                >
                                    <div className="absolute left-4 top-2 w-4 h-4 bg-cyan-500 rounded-full border-4 border-slate-950 z-10" />
                                    <div className="p-8 bg-slate-800/30 border border-slate-700/50 rounded-2xl hover:bg-slate-800/50 transition-colors group">
                                        <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                                            <div>
                                                <h4 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{exp.role}</h4>
                                                <div className="text-cyan-400 font-medium">{exp.company}</div>
                                            </div>
                                            <span className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-full text-xs text-gray-400">
                                                {exp.period}
                                            </span>
                                        </div>
                                        <ul className="space-y-3">
                                            {exp.description.map((point, j) => (
                                                <li key={j} className="flex gap-3 text-gray-400 text-sm leading-relaxed">
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

                    {/* Education */}
                    <div>
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400">
                                <Calendar size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-white">Education</h3>
                        </div>

                        <div className="space-y-8">
                            {profile.education.map((edu, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    className="p-8 bg-slate-800/30 border border-slate-700/50 rounded-2xl hover:bg-slate-800/50 transition-colors"
                                >
                                    <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                                        <div>
                                            <h4 className="text-xl font-bold text-white">{edu.degree}</h4>
                                            <div className="text-blue-400 font-medium">{edu.institution}</div>
                                        </div>
                                        <span className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-full text-xs text-gray-400">
                                            {edu.period}
                                        </span>
                                    </div>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {edu.details}
                                    </p>
                                    <div className="mt-4 pt-4 border-t border-slate-700/50 text-xs font-mono text-cyan-500/70">
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
