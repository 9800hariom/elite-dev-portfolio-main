
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Globe, Building2, Navigation, ExternalLink, Flag, Map } from 'lucide-react';
import { LocationSimulator } from './LocationSimulator';

/* ─── Types ─── */
interface LocationDetail {
    icon: React.ElementType;
    label: string;
    value: string;
    color: string;
    bgColor: string;
}

/* ─── Data ─── */
const locationDetails: LocationDetail[] = [
    { icon: Flag,      label: 'Country',       value: 'Nepal',             color: 'text-emerald-400', bgColor: 'bg-emerald-500/10 border-emerald-500/20' },
    { icon: Map,       label: 'Province',      value: 'Madhesh Province',  color: 'text-cyan-400',    bgColor: 'bg-cyan-500/10 border-cyan-500/20'       },
    { icon: Building2, label: 'District',      value: 'Dhanusha',          color: 'text-blue-400',    bgColor: 'bg-blue-500/10 border-blue-500/20'       },
    { icon: Globe,     label: 'Nearby City',   value: 'Janakpur',          color: 'text-violet-400',  bgColor: 'bg-violet-500/10 border-violet-500/20'   },
];

const GOOGLE_MAPS_URL = 'https://maps.google.com/?q=Janakpur,+Dhanusha,+Madhesh+Province,+Nepal';
const EMBED_SRC =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114005.9060340122!2d85.85439719999823!3d26.754440374650578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ec4005fb138bb9%3A0x533a64cf0e13c2d1!2sJanakpur!5e0!3m2!1sen!2snp!4v1783245966766!5m2!1sen!2snp';

/* ─── Floating Pin ─── */
const FloatingPin = () => (
    <div className="relative flex items-center justify-center w-20 h-20 mx-auto">
        {/* Outer pulse rings */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-500/20 animate-ping" />
        <span className="absolute inline-flex h-14 w-14 rounded-full bg-cyan-500/10 animate-ping [animation-delay:0.3s]" />

        {/* Glowing circle */}
        <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.45)] animate-float">
            <MapPin size={28} className="text-white drop-shadow-lg" />
        </div>
    </div>
);

/* ─── Detail Badge ─── */
const DetailBadge = ({ item, index }: { item: LocationDetail; index: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 + index * 0.08 }}
        viewport={{ once: true }}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-lg ${item.bgColor}`}
    >
        <div className={`flex-shrink-0 w-8 h-8 rounded-lg ${item.bgColor} flex items-center justify-center border ${item.bgColor}`}>
            <item.icon size={16} className={item.color} />
        </div>
        <div>
            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest leading-none mb-0.5">
                {item.label}
            </p>
            <p className={`text-sm font-bold ${item.color}`}>{item.value}</p>
        </div>
    </motion.div>
);

/* ─── Main Component ─── */
export const Location = () => {
    const [mapLoaded, setMapLoaded] = useState(false);

    return (
        <section id="location" className="py-24 relative overflow-hidden">
            {/* ── Background glow orbs ── */}
            <div className="pointer-events-none absolute -top-40 left-1/4 w-96 h-96 rounded-full bg-cyan-600/10 blur-[120px]" />
            <div className="pointer-events-none absolute -bottom-40 right-1/4 w-96 h-96 rounded-full bg-blue-600/8 blur-[120px]" />
            <div className="pointer-events-none absolute top-1/2 left-0 w-72 h-72 rounded-full bg-violet-600/6 blur-[100px]" />

            <div className="container mx-auto px-6 relative z-10">

                {/* ── Section Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
                        <Navigation size={14} className="animate-pulse" />
                        <span>Current Location</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
                        📍 Location
                    </h2>
                    <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
                        Based in{' '}
                        <span className="text-cyan-400 font-semibold">Janakpur</span>,{' '}
                        <span className="text-blue-400 font-semibold">Madhesh Province</span>,{' '}
                        <span className="text-emerald-400 font-semibold">Nepal</span>
                    </p>
                </motion.div>

                {/* ── Main Card ── */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto"
                >
                    {/*
                        Gradient border wrapper technique:
                        outer div has gradient bg, inner div has dark bg with a gap (p-px)
                    */}
                    <div className="p-px rounded-3xl bg-gradient-to-br from-cyan-500/50 via-blue-600/30 to-violet-500/40 shadow-[0_8px_60px_rgba(6,182,212,0.15)] hover:shadow-[0_8px_80px_rgba(6,182,212,0.25)] transition-shadow duration-500">
                        <div className="rounded-[calc(1.5rem-1px)] bg-slate-900/90 backdrop-blur-xl p-8 md:p-10">

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

                                {/* ── LEFT COLUMN ── */}
                                <div className="flex flex-col gap-8">

                                    {/* Floating pin */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.7 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
                                        viewport={{ once: true }}
                                    >
                                        <FloatingPin />
                                    </motion.div>

                                    {/* Title + address */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.1 }}
                                        viewport={{ once: true }}
                                        className="text-center lg:text-left"
                                    >
                                        <h3 className="text-2xl font-bold text-white mb-2">
                                            Janakpur,{' '}
                                            <span className="gradient-text">Nepal</span>
                                        </h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            Madhesh Province • Dhanusha District
                                        </p>
                                    </motion.div>

                                    {/* Detail badges grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {locationDetails.map((item, i) => (
                                            <DetailBadge key={item.label} item={item} index={i} />
                                        ))}
                                    </div>

                                    {/* Availability note */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 12 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.45 }}
                                        viewport={{ once: true }}
                                        className="p-5 rounded-2xl bg-gradient-to-r from-cyan-500/8 to-blue-500/8 border border-cyan-500/15"
                                    >
                                        <p className="text-gray-300 text-sm leading-relaxed text-center lg:text-left">
                                            🌐{' '}
                                            <span className="text-white font-medium">
                                                Available for internships, entry-level opportunities, freelance
                                                projects, and collaborations worldwide.
                                            </span>
                                        </p>
                                    </motion.div>

                                    {/* View on Google Maps button */}
                                    <motion.a
                                        href={GOOGLE_MAPS_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, y: 12 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.55 }}
                                        viewport={{ once: true }}
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="group flex items-center justify-center gap-3 w-full px-6 py-3.5 rounded-2xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300"
                                    >
                                        <MapPin size={18} className="group-hover:animate-bounce" />
                                        <span>View on Google Maps</span>
                                        <ExternalLink size={15} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                                    </motion.a>
                                </div>

                                {/* ── RIGHT COLUMN – Map ── */}
                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.7, delay: 0.2 }}
                                    viewport={{ once: true }}
                                    className="relative"
                                >
                                    {/* Map container */}
                                    <div className="relative rounded-2xl overflow-hidden border border-cyan-500/20 shadow-[0_0_40px_rgba(6,182,212,0.1)] hover:shadow-[0_0_60px_rgba(6,182,212,0.2)] transition-shadow duration-500">

                                        {/* Loading skeleton */}
                                        {!mapLoaded && (
                                            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-800/80 backdrop-blur-sm rounded-2xl gap-4">
                                                <div className="w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
                                                <p className="text-gray-400 text-sm">Loading map…</p>
                                            </div>
                                        )}

                                        {/* Subtle gradient overlay on top of map for glassmorphism blend */}
                                        <div className="pointer-events-none absolute inset-0 z-10 rounded-2xl ring-1 ring-inset ring-white/5" />

                                        <iframe
                                            title="Janakpur, Nepal — Google Maps"
                                            src={EMBED_SRC}
                                            width="100%"
                                            height="420"
                                            style={{ border: 0, display: 'block', filter: 'brightness(0.9) saturate(1.2)' }}
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            onLoad={() => setMapLoaded(true)}
                                            className="rounded-2xl"
                                        />
                                    </div>

                                    {/* Map caption */}
                                    <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-500">
                                        <MapPin size={12} className="text-cyan-500" />
                                        <span>Janakpur · Dhanusha · Madhesh Province · Nepal</span>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ── Interactive Location Matcher Simulator ── */}
                <LocationSimulator />
            </div>
        </section>
    );
};
