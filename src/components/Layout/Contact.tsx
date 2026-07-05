
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { SectionTitle } from '../Common/CommonComponents';
import { ProfileData } from '../../types/portfolio';
import { useLanguage } from '../../contexts/LanguageContext';
import {
    Mail, Phone, MapPin, Send, Github, Linkedin,
    CheckCircle, AlertCircle, Loader2
} from 'lucide-react';

// =====================================================
// 🔑 YOUR EMAILJS CREDENTIALS — fill these in!
// Go to https://www.emailjs.com → Dashboard to get them
// =====================================================
const EMAILJS_SERVICE_ID = "service_0009qb7";   // e.g. "service_abc123"
const EMAILJS_TEMPLATE_ID = "template_v9tssur";  // e.g. "template_xyz789"
const EMAILJS_PUBLIC_KEY = "QskeBQBvyf4ddXZ-L";   // e.g. "abcDEFghiJKLmno"
// =====================================================

type SendStatus = 'idle' | 'sending' | 'success' | 'error';

export const Contact = ({ profile }: { profile: ProfileData }) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [status, setStatus]   = useState<SendStatus>('idle');
    const [errorMsg, setErrorMsg] = useState('');
    const { t } = useLanguage();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;

        const fd = new FormData(formRef.current);
        const name    = (fd.get('user_name')    as string || '').trim();
        const email   = (fd.get('user_email')   as string || '').trim();
        const message = (fd.get('message')      as string || '').trim();

        if (!name || !email || !message) {
            setStatus('error');
            setErrorMsg(t('contact.fillRequired'));
            return;
        }

        setStatus('sending');
        setErrorMsg(''); // clear any previous error on new send attempt

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

            // EmailJS rejects with a plain object: { status: number, text: string }
            // so `err instanceof Error` is false and String(err) gives "[object Object]"
            let msg = 'Unknown error. Please try again.';
            if (err instanceof Error) {
                msg = err.message;
            } else if (
                err !== null &&
                typeof err === 'object' &&
                'text' in err &&
                typeof (err as Record<string, unknown>).text === 'string'
            ) {
                // EmailJS error shape: { status: number, text: string }
                msg = (err as { text: string }).text;
            } else if (typeof err === 'string') {
                msg = err;
            }

            setErrorMsg(
                msg.toLowerCase().includes('service_id') || msg.toLowerCase().includes('invalid')
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
                    title={t('contact.title')}
                    subtitle={t('contact.subtitle')}
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
                            <h3 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>{t('contact.infoTitle')}</h3>
                            <p className="text-lg max-w-md leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                {t('contact.infoDesc')}
                            </p>
                        </div>

                        <div className="space-y-4">
                            {[
                                { icon: Mail,   label: t('contact.emailLabel'),    value: profile.email,    href: `mailto:${profile.email}` },
                                { icon: Phone,  label: t('contact.phoneLabel'),    value: profile.phone,    href: `tel:${profile.phone}` },
                                { icon: MapPin, label: t('contact.locationLabel'), value: profile.location, href: '#' }
                            ].map((item, i) => (
                                <motion.a
                                    key={i}
                                    href={item.href}
                                    whileHover={{ scale: 1.02, x: 4 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                    className="flex items-center gap-5 p-5 rounded-2xl border hover:border-cyan-500/40 transition-colors group"
                                    style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
                                >
                                    <div className="w-[52px] h-[52px] min-w-[52px] min-h-[52px] rounded-xl flex items-center justify-center text-cyan-400 border group-hover:bg-cyan-500 group-hover:text-white group-hover:border-cyan-500 transition-all duration-300 shadow-lg"
                                        style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)' }}>
                                        <item.icon size={22} />
                                    </div>
                                    <div>
                                        <div className="text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>{item.label}</div>
                                        <div className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>{item.value}</div>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div className="pt-4">
                            <h4 className="font-semibold mb-4 text-sm uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{t('contact.socialConnect')}</h4>
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


                    </motion.div>

                    {/* ── Right: Contact Form ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="p-8 md:p-10 rounded-[2rem] backdrop-blur-sm relative overflow-hidden border"
                        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
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
                                        className="text-2xl font-bold mb-3"
                                        style={{ color: 'var(--text-primary)' }}
                                    >
                                        {t('contact.success')}
                                    </motion.h3>
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.35 }}
                                        style={{ color: 'var(--text-secondary)' }}
                                        className="max-w-xs leading-relaxed"
                                    >
                                        {t('contact.successMsg')}
                                    </motion.p>
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
                                            <label className="text-xs pl-1 uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>{t('contact.labelName')}</label>
                                            <input
                                                type="text"
                                                name="user_name"
                                                placeholder={t('contact.placeholderName')}
                                                required
                                                disabled={status === 'sending'}
                                                className="w-full rounded-xl px-4 py-3.5 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all disabled:opacity-50 border"
                                                style={{ backgroundColor: 'var(--bg-input)', color: 'var(--text-primary)', borderColor: 'var(--border)' }}
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs pl-1 uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>{t('contact.labelEmail')}</label>
                                            <input
                                                type="email"
                                                name="user_email"
                                                placeholder={t('contact.placeholderEmail')}
                                                required
                                                disabled={status === 'sending'}
                                                className="w-full rounded-xl px-4 py-3.5 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all disabled:opacity-50 border"
                                                style={{ backgroundColor: 'var(--bg-input)', color: 'var(--text-primary)', borderColor: 'var(--border)' }}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs pl-1 uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>{t('contact.labelSubject')}</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            placeholder={t('contact.placeholderSubject')}
                                            disabled={status === 'sending'}
                                            className="w-full rounded-xl px-4 py-3.5 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all disabled:opacity-50 border"
                                            style={{ backgroundColor: 'var(--bg-input)', color: 'var(--text-primary)', borderColor: 'var(--border)' }}
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs pl-1 uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>{t('contact.labelMessage')}</label>
                                        <textarea
                                            rows={5}
                                            name="message"
                                            placeholder={t('contact.placeholderMessage')}
                                            required
                                            disabled={status === 'sending'}
                                            className="w-full rounded-xl px-4 py-3.5 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all resize-none disabled:opacity-50 border"
                                            style={{ backgroundColor: 'var(--bg-input)', color: 'var(--text-primary)', borderColor: 'var(--border)' }}
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
                                                {t('contact.sending')}
                                            </>
                                        ) : (
                                            <>
                                                <Send size={20} />
                                                {t('contact.send')}
                                            </>
                                        )}
                                    </motion.button>


                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
