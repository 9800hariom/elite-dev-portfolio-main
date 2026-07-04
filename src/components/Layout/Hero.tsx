
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronRight } from 'lucide-react';
import { Typewriter } from '../Common/Effects';
import { ResumeButton } from '../Common/CommonComponents';
import { ProfileData } from '../../types/portfolio';

export const Hero = ({ profile }: { profile: ProfileData }) => {
    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-cyan-600/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px]" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 text-center lg:text-left"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                            </span>
                            Available for New Projects
                        </motion.div>

                        <h1 className="text-5xl lg:text-7xl font-bold mb-6">
                            Hi, I'm <span className="gradient-text">{profile.name}</span>
                        </h1>

                        <div className="text-2xl lg:text-3xl text-gray-400 mb-8 h-12">
                            A <Typewriter />
                        </div>

                        <p className="text-gray-400 text-lg mb-10 max-w-2xl leading-relaxed">
                            {profile.careerFocus}. Specializing in building digital experiences
                            that blend technical excellence with stunning design.
                        </p>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                            <ResumeButton variant="primary" />
                            <a
                                href="#projects"
                                className="flex items-center gap-2 text-gray-300 hover:text-white px-6 py-3 transition-colors group"
                            >
                                View Projects
                                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>

                        <div className="mt-12 flex items-center justify-center lg:justify-start gap-6">
                            {[
                                { icon: Github, href: profile.github },
                                { icon: Linkedin, href: profile.linkedin },
                                { icon: Mail, href: `mailto:${profile.email}` }
                            ].map((social, i) => (
                                <motion.a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -3 }}
                                    className="p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-xl text-gray-400 hover:text-cyan-400 border border-slate-700 transition-all"
                                >
                                    <social.icon size={22} />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 relative"
                    >
                        <div className="relative w-72 h-72 lg:w-96 lg:h-96 mx-auto">
                            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-3xl rotate-6 blur-2xl opacity-20 animate-pulse" />
                            <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-slate-700 bg-slate-800 group">
                                <img
                                    src={profile.profileImage}
                                    alt={profile.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
                            </div>

                            {/* Stats/Floating Cards */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -right-8 top-1/4 p-4 bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-2xl shadow-xl hidden md:block"
                            >
                                <div className="text-cyan-400 font-bold text-xl">2+</div>
                                <div className="text-gray-400 text-xs uppercase tracking-wider">Years Exp.</div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute -left-8 bottom-1/4 p-4 bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-2xl shadow-xl hidden md:block"
                            >
                                <div className="text-blue-400 font-bold text-xl">15+</div>
                                <div className="text-gray-400 text-xs uppercase tracking-wider">Projects</div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
