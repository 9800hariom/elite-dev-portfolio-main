
import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../Common/CommonComponents';
import { ProfileData } from '../../types/portfolio';
import { Code2, Server, Layout, Database, Figma as FigmaIcon, Cpu } from 'lucide-react';

const categoryIcons: { [key: string]: any } = {
    "Front-End": Layout,
    "Back-End & DB": Server,
    "Design & Tools": FigmaIcon,
};

export const Skills = ({ profile }: { profile: ProfileData }) => {
    return (
        <section id="skills" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <SectionTitle
                    title="Skills & Expertise"
                    subtitle="My technical toolkit for building modern web applications."
                />

                {/* Core Skills Progress */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {profile.coreSkills.map((skill, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-6 bg-slate-800/40 rounded-2xl border border-slate-700/50 hover:border-cyan-500/30 transition-all"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-white font-bold">{skill.name}</span>
                                <span className="text-cyan-400 text-sm">{skill.level}%</span>
                            </div>
                            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.level}%` }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-600"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Categorized Skills */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {profile.skills.map((group, i) => {
                        const Icon = categoryIcons[group.category] || Code2;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="relative group pt-8"
                            >
                                <div className="absolute top-0 left-6 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 z-10 group-hover:rotate-12 transition-transform">
                                    <Icon size={24} />
                                </div>
                                <div className="bg-slate-800/30 border border-slate-700/50 rounded-3xl p-8 pt-10 hover:bg-slate-800/50 transition-colors">
                                    <h4 className="text-xl font-bold text-white mb-6 pl-2">{group.category}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {group.skills.map((skill, j) => (
                                            <span
                                                key={j}
                                                className="px-4 py-1.5 bg-slate-900 text-gray-400 text-sm rounded-lg border border-slate-700 group-hover:border-cyan-500/30 group-hover:text-cyan-400 transition-colors"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
