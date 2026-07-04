import React from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Heart } from 'lucide-react';
import { ProfileData } from '../../types/portfolio';

export const Footer = ({ profile }: { profile: ProfileData }) => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-950 pt-20 pb-10 border-t border-slate-900">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="md:col-span-2">
                        <a href="#" className="text-2xl font-bold gradient-text mb-6 inline-block">
                            HARIOM<span className="text-white">.</span>
                        </a>
                        <p className="text-gray-400 text-lg mb-8 max-w-md leading-relaxed">
                            {profile.careerFocus}. Crafting premium digital experiences through innovative code and modern architectural patterns.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: Github, href: profile.github },
                                { icon: Linkedin, href: profile.linkedin }
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-gray-500 hover:text-cyan-400 hover:bg-slate-800 transition-all border border-slate-800"
                                >
                                    <social.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Navigation</h4>
                        <ul className="space-y-4">
                            {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
                                <li key={item}>
                                    <a href={`#${item.toLowerCase()}`} className="text-gray-500 hover:text-cyan-400 transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Contact</h4>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-gray-400">
                                <Mail size={16} className="text-cyan-500" />
                                <span className="truncate text-sm">{profile.email}</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <Phone size={16} className="text-cyan-500" />
                                <span className="text-sm">{profile.phone}</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <MapPin size={16} className="text-cyan-500" />
                                <span className="text-sm">{profile.location}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-gray-600 text-xs">
                        © {currentYear} {profile.name}. All rights reserved.
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-xs">
                        Made with <Heart size={14} className="text-red-500 fill-red-500" /> in Nepal
                    </div>
                </div>
            </div>
        </footer>
    );
};
