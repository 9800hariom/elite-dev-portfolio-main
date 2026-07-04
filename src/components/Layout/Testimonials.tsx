
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitle } from '../Common/CommonComponents';
import { ProfileData } from '../../types/portfolio';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export const Testimonials = ({ profile }: { profile: ProfileData }) => {
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent((prev) => (prev + 1) % profile.testimonials.length);
    const prev = () => setCurrent((prev) => (prev - 1 + profile.testimonials.length) % profile.testimonials.length);

    return (
        <section id="testimonials" className="py-24 bg-slate-900/50">
            <div className="container mx-auto px-6">
                <SectionTitle
                    title="Client Feedback"
                    subtitle="What others say about working with me on various projects."
                />

                <div className="max-w-4xl mx-auto relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="bg-slate-800/40 p-10 md:p-16 rounded-[2.5rem] border border-slate-700/50 relative overflow-hidden"
                        >
                            <Quote className="absolute top-8 left-8 text-cyan-500/20" size={80} />

                            <div className="relative z-10">
                                <p className="text-xl md:text-2xl text-gray-300 italic mb-10 leading-relaxed text-center">
                                    "{profile.testimonials[current].quote}"
                                </p>

                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-cyan-500/30 mb-4">
                                        <img
                                            src={profile.testimonials[current].avatarUrl}
                                            alt={profile.testimonials[current].author}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h4 className="text-white font-bold text-lg">{profile.testimonials[current].author}</h4>
                                    <p className="text-cyan-400 text-sm">{profile.testimonials[current].role}</p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <div className="flex justify-center gap-4 mt-8">
                        <button
                            onClick={prev}
                            className="p-3 bg-slate-800 hover:bg-slate-700 text-white rounded-full border border-slate-700 transition-colors"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={next}
                            className="p-3 bg-slate-800 hover:bg-slate-700 text-white rounded-full border border-slate-700 transition-colors"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
