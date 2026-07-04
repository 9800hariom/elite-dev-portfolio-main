
import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../Common/CommonComponents';
import { ProfileData } from '../../types/portfolio';
import { GraduationCap, Award, Zap } from 'lucide-react';

export const About = ({ profile }: { profile: ProfileData }) => {
    return (
        <section id="about" className="py-24 bg-slate-900/50">
            <div className="container mx-auto px-6">
                <SectionTitle
                    title="About Me"
                    subtitle="A passionate developer driven by curiosity and the desire to build impactful solutions."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-2xl font-bold mb-6 text-white">Who is <span className="text-cyan-400">Hariom</span>?</h3>
                        <p className="text-gray-400 leading-relaxed mb-8 text-lg">
                            {profile.aboutMe}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="p-6 bg-slate-800/30 rounded-2xl border border-slate-700/50">
                                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 mb-4">
                                    <GraduationCap size={24} />
                                </div>
                                <h4 className="text-white font-bold mb-2">Education</h4>
                                <p className="text-gray-400 text-sm">{profile.education[0].institution}</p>
                            </div>

                            <div className="p-6 bg-slate-800/30 rounded-2xl border border-slate-700/50">
                                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-4">
                                    <Award size={24} />
                                </div>
                                <h4 className="text-white font-bold mb-2">Experience</h4>
                                <p className="text-gray-400 text-sm">{profile.experience[0].company}</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <h3 className="text-2xl font-bold mb-6 text-white">Core Philosophy</h3>
                        <div className="space-y-6">
                            {[
                                { title: "User-Centric Design", desc: "Prioritizing the user's needs and experience in every line of code.", icon: Zap },
                                { title: "Clean & Efficient Code", desc: "Writing maintainable, scalable, and high-performance applications.", icon: Zap },
                                { title: "Continuous Learning", desc: "Staying at the forefront of evolving technologies and industry trends.", icon: Zap }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="mt-1 flex-shrink-0 w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-cyan-500 border border-slate-700">
                                        <item.icon size={16} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold mb-1">{item.title}</h4>
                                        <p className="text-gray-400">{item.desc}</p>
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
