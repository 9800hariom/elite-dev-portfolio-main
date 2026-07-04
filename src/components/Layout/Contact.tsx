
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { SectionTitle } from '../Common/CommonComponents';
import { ProfileData } from '../../types/portfolio';
import {
    Mail, Phone, MapPin, Send, Github, Linkedin,
    CheckCircle, AlertCircle, Loader2
} from 'lucide-react';

// =====================================================
// 🔑 YOUR EMAILJS CREDENTIALS — fill these in!
// Go to https://www.emailjs.com → Dashboard to get them
// =====================================================
const EMAILJS_SERVICE_ID = "service_d7btni5";   // e.g. "service_abc123"
const EMAILJS_TEMPLATE_ID = "template_r3j37ef";  // e.g. "template_xyz789"
const EMAILJS_PUBLIC_KEY = "MTto61FSEqHlEkPGm";   // e.g. "abcDEFghiJKLmno"
// =====================================================

type SendStatus = 'idle' | 'sending' | 'success' | 'error';

export const Contact = ({ profile }: { profile: ProfileData }) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [status, setStatus]   = useState<SendStatus>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;

        const fd = new FormData(formRef.current);
        const name    = (fd.get('user_name')    as string || '').trim();
        const email   = (fd.get('user_email')   as string || '').trim();
        const message = (fd.get('message')      as string || '').trim();

        if (!name || !email || !message) {
            setStatus('error');
            setErrorMsg('Please fill in all required fields.');
            return;
        }

        setStatus('sending');
        setErrorMsg('');

        try {
            await emailjs.sendForm(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                formRef.current,
                EMAILJS_PUBLIC_KEY
            );

            setStatus('success');
            formRef.current.reset();
            setTimeout(() => setStatus('idle'), 6000);
        } catch (err: unknown) {
            setStatus('error');
            const msg = err instanceof Error ? err.message : String(err);
            setErrorMsg(
                msg.toLowerCase().includes('service_id') || msg.includes('Invalid')
                    ? '⚠️ EmailJS credentials not set. Please add your Service ID, Template ID & Public Key.'
                    : `Failed to send: ${msg}`
            );
        }
    };

    return (
        <section id="contact" className="py-24 relative overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
            <div className="absolute top-20 left-0 w-72 h-72 bg-cyan-600/5 rounded-full blur-[100px]" />

            <div className="container mx-auto px-6 relative z-10">
                <SectionTitle
                    title="Get In Touch"
                    subtitle="Let's discuss your next project or just say hello!"
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* ── Left: Contact Info ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div>
                            <h3 className="text-3xl font-bold text-white mb-4">Contact Information</h3>
                            <p className="text-gray-400 text-lg max-w-md leading-relaxed">
                                Feel free to reach out through any of these channels. I'm always open to discussing new opportunities.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {[
                                { icon: Mail,   label: "Email",    value: profile.email,    href: `mailto:${profile.email}` },
                                { icon: Phone,  label: "Phone",    value: profile.phone,    href: `tel:${profile.phone}` },
                                { icon: MapPin, label: "Location", value: profile.location, href: "#" }
                            ].map((item, i) => (
                                <motion.a
                                    key={i}
                                    href={item.href}
                                    whileHover={{ scale: 1.02, x: 4 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                    className="flex items-center gap-5 p-5 bg-slate-800/30 border border-slate-700/50 rounded-2xl hover:border-cyan-500/40 hover:bg-slate-800/60 transition-colors group"
                                >
                                    <div className="w-13 h-13 min-w-[52px] min-h-[52px] bg-slate-900 rounded-xl flex items-center justify-center text-cyan-400 border border-slate-700 group-hover:bg-cyan-500 group-hover:text-white group-hover:border-cyan-500 transition-all duration-300 shadow-lg">
                                        <item.icon size={22} />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">{item.label}</div>
                                        <div className="text-base font-semibold text-white">{item.value}</div>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div className="pt-4">
                            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest text-gray-400">Social Connect</h4>
                            <div className="flex gap-3">
                                {[
                                    { icon: Github,   href: profile.github,   label: "GitHub" },
                                    { icon: Linkedin, href: profile.linkedin, label: "LinkedIn" }
                                ].map((social, i) => (
                                    <motion.a
                                        key={i}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        title={social.label}
                                        className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-gray-400 hover:bg-cyan-500 hover:text-white border border-slate-700 hover:border-cyan-500 transition-all duration-300 shadow-md"
                                    >
                                        <social.icon size={20} />
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* EmailJS live badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="flex items-center gap-3 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl"
                        >
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                            </span>
                            <p className="text-sm text-emerald-400 font-medium">
                                Emails delivered in real-time via EmailJS — no server needed!
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* ── Right: Contact Form ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="p-8 md:p-10 bg-slate-800/30 border border-slate-700/50 rounded-[2rem] backdrop-blur-sm relative overflow-hidden"
                    >
                        {/* Decorative inner glow */}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-[60px] pointer-events-none" />

                        <AnimatePresence mode="wait">

                            {/* ── Success State ── */}
                            {status === 'success' ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.85 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.85 }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                                    className="flex flex-col items-center justify-center py-16 text-center relative z-10"
                                >
                                    <motion.div
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ type: 'spring', stiffness: 180, damping: 12, delay: 0.1 }}
                                        className="w-24 h-24 bg-emerald-500/10 border-2 border-emerald-500/40 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/10"
                                    >
                                        <CheckCircle className="text-emerald-400" size={44} />
                                    </motion.div>
                                    <motion.h3
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.25 }}
                                        className="text-2xl font-bold text-white mb-3"
                                    >
                                        Message Sent! 🎉
                                    </motion.h3>
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.35 }}
                                        className="text-gray-400 max-w-xs leading-relaxed"
                                    >
                                        Your message was delivered in real-time via EmailJS. I'll get back to you very soon!
                                    </motion.p>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="mt-6 flex items-center gap-2 text-xs text-emerald-500/70"
                                    >
                                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                        Delivered via EmailJS — real time
                                    </motion.div>
                                </motion.div>

                            ) : (
                                /* ── Form State ── */
                                <motion.form
                                    key="form"
                                    ref={formRef}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-5 relative z-10"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-1.5">
                                            <label className="text-xs text-gray-400 pl-1 uppercase tracking-wider">Full Name *</label>
                                            <input
                                                type="text"
                                                name="user_name"
                                                placeholder="John Doe"
                                                required
                                                disabled={status === 'sending'}
                                                className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all disabled:opacity-50"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs text-gray-400 pl-1 uppercase tracking-wider">Email Address *</label>
                                            <input
                                                type="email"
                                                name="user_email"
                                                placeholder="john@example.com"
                                                required
                                                disabled={status === 'sending'}
                                                className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all disabled:opacity-50"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs text-gray-400 pl-1 uppercase tracking-wider">Subject</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            placeholder="Inquiry about a project"
                                            disabled={status === 'sending'}
                                            className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all disabled:opacity-50"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs text-gray-400 pl-1 uppercase tracking-wider">Message *</label>
                                        <textarea
                                            rows={5}
                                            name="message"
                                            placeholder="Hi Hariom, I'd like to talk about..."
                                            required
                                            disabled={status === 'sending'}
                                            className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all resize-none disabled:opacity-50"
                                        />
                                    </div>

                                    {/* Error Banner */}
                                    <AnimatePresence>
                                        {status === 'error' && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -6, height: 0 }}
                                                animate={{ opacity: 1, y: 0, height: 'auto' }}
                                                exit={{ opacity: 0, y: -6, height: 0 }}
                                                className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm overflow-hidden"
                                            >
                                                <AlertCircle size={17} className="shrink-0 mt-0.5" />
                                                <span>{errorMsg}</span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Send Button */}
                                    <motion.button
                                        type="submit"
                                        id="contact-send-btn"
                                        disabled={status === 'sending'}
                                        whileHover={status !== 'sending' ? { scale: 1.02 } : {}}
                                        whileTap={status !== 'sending' ? { scale: 0.98 } : {}}
                                        className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 disabled:from-slate-700 disabled:to-slate-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2.5 disabled:cursor-not-allowed text-base"
                                    >
                                        {status === 'sending' ? (
                                            <>
                                                <Loader2 size={20} className="animate-spin" />
                                                Sending in real-time…
                                            </>
                                        ) : (
                                            <>
                                                <Send size={20} />
                                                Send Message
                                            </>
                                        )}
                                    </motion.button>

                                    <p className="text-center text-xs text-slate-600 pt-1">
                                        Powered by <span className="text-cyan-700">EmailJS</span> · No server · Real-time delivery
                                    </p>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
