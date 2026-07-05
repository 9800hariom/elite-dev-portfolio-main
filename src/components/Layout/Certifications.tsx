
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Award, Search, X, Eye, Download, ExternalLink, Info,
    ChevronLeft, ChevronRight, Grid3X3, AlignLeft, ZoomIn, ZoomOut,
    CheckCircle2, Clock, Hash, Calendar, User, Monitor, BookOpen,
    Trophy, Star, Shield
} from 'lucide-react';
import { SectionTitle } from '../Common/CommonComponents';
import { useLanguage } from '../../contexts/LanguageContext';

// ─── Types ──────────────────────────────────────────────────────────────────

export type CertCategory =
    | 'All'
    | 'Programming'
    | 'Web Development'
    | 'Database'
    | 'Networking'
    | 'AI'
    | 'Workshops';

export type CertStatus = 'Completed' | 'In Progress';

export interface Certificate {
    id: number;
    title: string;
    organization: string;
    issueDate: string;
    expiryDate?: string;
    credentialId?: string;
    certNumber?: string;
    skills: string[];
    description: string;
    category: Exclude<CertCategory, 'All'>;
    status: CertStatus;
    imageUrl: string;
    pdfUrl?: string;
    verifyUrl?: string;
    grade?: string;
    duration?: string;
    instructor?: string;
    trainingMode?: 'Online' | 'Offline';
    trainingHours?: number;
}

// ─── Certificate Data ────────────────────────────────────────────────────────

const CERTIFICATES: Certificate[] = [
   
    {
        id: 1,
        title: 'Web Development Bootcamp Certificate',
        organization: 'Neelgai',
        issueDate: 'December 2024',
        credentialId: 'N/A',
        skills: [
            'HTML',
            'CSS',
            'JavaScript',
            'Web Development',
            'Responsive Design',
            'Frontend Development',
            'Problem Solving',
            'React', 'Django', 'Python',
            'Team Collaboration'
        ],
        description: 'Successfully completed a Web Development Bootcamp at Janakpur Tech Bootcamp organized by Neelgai. Gained hands-on experience in HTML, CSS, JavaScript, responsive web design, and frontend development fundamentals through practical projects and training sessions.',
        category: 'Web Development',
        status: 'Completed',
        imageUrl: 'public/webdevlopment.jpg',
        instructor: 'Yuvraj Singh',
        duration: '3 Months',
        trainingMode: 'Offline',
        trainingHours: 120
    },
    {
        id: 2,
        title: 'Elevating Ideation Through Co-creation Workshop',
        organization: 'Co-creation Workshop Program',
        issueDate: 'July 2025',
        credentialId: 'N/A',
        skills: [
            'Design Thinking',
            'Ideation',
            'Innovation',
            'Problem Solving',
            'Collaboration',
            'Teamwork',
            'Creative Thinking'
        ],
        description: 'Successfully participated in the 3-day "Elevating Ideation Through Co-creation Workshop," gaining practical experience in collaborative problem-solving, design thinking, innovation, and idea development through interactive team-based activities.',
        category: 'Workshops',
        status: 'Completed',
        imageUrl: 'public/cocreation.png',
        instructor: 'Workshop Facilitators',
        duration: '3 Days',
        trainingMode: 'Offline',
        trainingHours: 24
    },
    {
        id: 3,
        title: 'Trainer – Remote Mapping Workshop on Accessibility Mapping',
        organization: 'GeoWomen: Enhancing Open Spatial Data Literacy',
        issueDate: 'January 2025',
        credentialId: 'N/A',
        skills: [
            'OpenStreetMap',
            'GIS',
            'Accessibility Mapping',
            'Training & Mentoring',
            'Leadership',
            'Community Engagement',
            'Spatial Data'
        ],
        description: 'Successfully conducted the Remote Mapping Workshop on Accessibility Mapping in rural and urban areas of Janakpurdham Sub-Metropolitan City using OpenStreetMap. As a trainer, I guided participants in OpenStreetMap fundamentals, mapping tools, and collaborative community mapping under the GeoWomen: Enhancing Open Spatial Data Literacy project.',
        category: 'Workshops',
        status: 'Completed',
        imageUrl: 'public/award.png',
        instructor: 'GeoWomen Project Team',
        duration: '2 Days',
        trainingMode: 'Offline',
        trainingHours: 16
    },
    
    {
        id: 4,
        title: 'Remote Mapping Workshop on Accessibility Mapping',
        organization: 'NAXA, Women in Geospatial Nepal & Partners',
        issueDate: 'January 2025',
        credentialId: 'N/A',
        skills: [
            'OpenStreetMap',
            'GIS',
            'Accessibility Mapping',
            'Spatial Data',
            'Remote Mapping',
            'Team Collaboration',
            'Volunteer Work'
        ],
        description: 'Participated as a volunteer in the Remote Mapping Workshop on Accessibility Mapping, contributing to mapping rural and urban areas of Janakpurdham using OpenStreetMap as part of the GeoWomen project to enhance open spatial data literacy.',
        category: 'Workshops',
        status: 'Completed',
        imageUrl: 'public/map.png',
        instructor: 'NAXA & Women in Geospatial Nepal',
        duration: '3 Days',
        trainingMode: 'Offline',
        trainingHours: 24
    },
    
    
    {
        id: 5,
        title: 'AWS EC2 Cloud Computing Certificate',
        organization: 'Amazon Web Services (AWS)',
        issueDate: '2025',
        credentialId: 'AWS-EC2-2025',
        skills: [
            'AWS EC2',
            'Cloud Computing',
            'Virtual Servers',
            'Linux',
            'Networking',
            'Scalable Infrastructure'
        ],
        description: 'Successfully earned an AWS EC2 certification, gaining practical knowledge of cloud computing, virtual servers, instance management, networking, and scalable infrastructure for real-world applications.',
        category: 'Networking',
        status: 'Completed',
        imageUrl: 'public/aws.png',
        instructor: 'Amazon Web Services',
        duration: 'Self-Paced',
        trainingMode: 'Online',
        trainingHours: 20
    },
    {
        id: 6,
        title: 'Machine Learning Using Python',
        organization: 'Simplilearn SkillUp',
        issueDate: '2025',
        credentialId: 'SL-ML-PY-2025',
        skills: [
            'Machine Learning',
            'Python',
            'Data Science',
            'Data Preprocessing',
            'Model Building',
            'Model Evaluation',
            'Predictive Analytics'
        ],
        description: 'Successfully completed the Machine Learning Using Python course, gaining practical knowledge of machine learning fundamentals, Python for data science, data preprocessing, model building, evaluation, and predictive analytics concepts.',
        category: 'AI',
        status: 'Completed',
        imageUrl: 'public/Ai.png',
        instructor: 'Simplilearn SkillUp',
        duration: 'Self-Paced',
        trainingMode: 'Online',
        trainingHours: 15
    },


    {
        id: 7,
        title: 'Certificate of Contribution – Janakpur Hackathon 2.0',
        organization: 'Neelgai',
        issueDate: '2025',
        credentialId: 'N/A',
        skills: [
            'Event Management',
            'Logistics Coordination',
            'Leadership',
            'Team Collaboration',
            'Communication',
            'Problem Solving',
            'Operations Management'
        ],
        description: 'Recognized for contributing to Janakpur Hackathon 2.0 as a Logistics Coordinator, successfully managing venue setup, seating arrangements, food and refreshments, internet connectivity, power backup, and on-ground logistics to ensure a smooth and well-organized event.',
        category: 'Workshops',
        status: 'Completed',
        imageUrl: 'public/hackathon.png',
        instructor: 'Neelgai',
        duration: 'Hackathon Event',
        trainingMode: 'Offline',
        trainingHours: 16
    },
];

// ─── Statistics Data ─────────────────────────────────────────────────────────

const STATS = [
    { icon: Award, label: 'Certificates', labelKey: 'totalCerts', getValue: (certs: Certificate[]) => certs.filter(c => c.status === 'Completed').length, suffix: '+', color: 'from-cyan-500 to-blue-600' },
    { icon: Clock, label: 'Training Hours', labelKey: 'trainingHours', getValue: (certs: Certificate[]) => certs.reduce((acc, c) => acc + (c.trainingHours || 0), 0), suffix: '+', color: 'from-violet-500 to-purple-600' },
    { icon: Trophy, label: 'Workshops', labelKey: 'workshops', getValue: (certs: Certificate[]) => certs.filter(c => c.category === 'Workshops').length, suffix: '', color: 'from-amber-500 to-orange-600' },
    { icon: Star, label: 'Technologies', labelKey: 'technologies', getValue: (certs: Certificate[]) => new Set(certs.flatMap(c => c.skills)).size, suffix: '+', color: 'from-emerald-500 to-teal-600' },
];

const CATEGORIES: CertCategory[] = ['All', 'Programming', 'Web Development', 'Database', 'Networking', 'AI', 'Workshops'];

const CATEGORY_COLORS: Record<string, string> = {
    'Programming': 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    'Web Development': 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    'Database': 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    'Networking': 'text-green-400 bg-green-500/10 border-green-500/20',
    'AI': 'text-violet-400 bg-violet-500/10 border-violet-500/20',
    'Workshops': 'text-orange-400 bg-orange-500/10 border-orange-500/20',
};

// ─── Animated Counter ────────────────────────────────────────────────────────

const AnimatedCounter = ({ target, suffix }: { target: number; suffix: string }) => {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [started]);

    useEffect(() => {
        if (!started) return;
        let start = 0;
        const duration = 1600;
        const step = Math.ceil(target / (duration / 16));
        const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(start);
        }, 16);
        return () => clearInterval(timer);
    }, [started, target]);

    return <span ref={ref}>{count}{suffix}</span>;
};

// ─── Lightbox ────────────────────────────────────────────────────────────────

interface LightboxProps {
    certs: Certificate[];
    currentIndex: number;
    onClose: () => void;
    onNavigate: (dir: 1 | -1) => void;
}

const Lightbox: React.FC<LightboxProps> = ({ certs, currentIndex, onClose, onNavigate }) => {
    const cert = certs[currentIndex];
    const [zoom, setZoom] = useState(1);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') onNavigate(1);
            if (e.key === 'ArrowLeft') onNavigate(-1);
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose, onNavigate]);

    useEffect(() => { setZoom(1); }, [currentIndex]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
                onClick={onClose}
                role="dialog"
                aria-modal="true"
                aria-label={`Viewing certificate: ${cert.title}`}
            >
                {/* Controls Bar */}
                <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 z-10 bg-gradient-to-b from-black/80 to-transparent" onClick={e => e.stopPropagation()}>
                    <div>
                        <p className="text-white font-bold text-lg">{cert.title}</p>
                        <p className="text-gray-400 text-sm">{cert.organization}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setZoom(z => Math.max(0.5, z - 0.25))} className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors" aria-label="Zoom out"><ZoomOut size={18} /></button>
                        <span className="text-white text-sm w-12 text-center">{Math.round(zoom * 100)}%</span>
                        <button onClick={() => setZoom(z => Math.min(3, z + 0.25))} className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors" aria-label="Zoom in"><ZoomIn size={18} /></button>
                        <div className="w-px h-6 bg-white/20 mx-2" />
                        <button onClick={onClose} className="p-2 bg-white/10 hover:bg-red-500/40 rounded-xl text-white transition-colors" aria-label="Close lightbox"><X size={18} /></button>
                    </div>
                </div>

                {/* Image */}
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="max-w-5xl max-h-[80vh] overflow-auto rounded-2xl"
                    onClick={e => e.stopPropagation()}
                    style={{ cursor: zoom > 1 ? 'grab' : 'default' }}
                >
                    <img
                        src={cert.imageUrl}
                        alt={`Certificate: ${cert.title}`}
                        className="rounded-2xl object-contain transition-transform duration-300"
                        style={{ transform: `scale(${zoom})`, transformOrigin: 'center', maxWidth: '80vw', maxHeight: '75vh' }}
                    />
                </motion.div>

                {/* Navigation */}
                <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm transition-all"
                    onClick={e => { e.stopPropagation(); onNavigate(-1); }}
                    aria-label="Previous certificate"
                >
                    <ChevronLeft size={28} />
                </button>
                <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm transition-all"
                    onClick={e => { e.stopPropagation(); onNavigate(1); }}
                    aria-label="Next certificate"
                >
                    <ChevronRight size={28} />
                </button>

                {/* Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
                    {currentIndex + 1} / {certs.length}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

// ─── Detail Modal ─────────────────────────────────────────────────────────────

interface DetailModalProps {
    cert: Certificate;
    onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ cert, onClose }) => {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    const catColor = CATEGORY_COLORS[cert.category] || CATEGORY_COLORS['Other'];

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
                role="dialog"
                aria-modal="true"
                aria-label={`Details for ${cert.title}`}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="bg-slate-900 border border-slate-700/60 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="relative h-48 overflow-hidden rounded-t-3xl">
                        <img src={cert.imageUrl} alt={cert.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 bg-slate-900/80 hover:bg-red-500/40 rounded-xl text-white transition-colors"
                            aria-label="Close details"
                        >
                            <X size={18} />
                        </button>
                        <div className="absolute bottom-4 left-6">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${catColor}`}>{cert.category}</span>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="p-8">
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <div>
                                <h3 className="text-2xl font-bold text-white">{cert.title}</h3>
                                <p className="text-cyan-400 font-medium mt-1">{cert.organization}</p>
                            </div>
                            <span className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${cert.status === 'Completed' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-amber-400 bg-amber-500/10 border-amber-500/20'}`}>
                                {cert.status === 'Completed' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                                {cert.status}
                            </span>
                        </div>

                        <p className="text-gray-400 text-sm leading-relaxed mb-6">{cert.description}</p>

                        {/* Info Grid */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            {cert.issueDate !== 'In Progress' && (
                                <div className="flex items-center gap-2 bg-slate-800/60 rounded-xl p-3">
                                    <Calendar size={14} className="text-cyan-400 flex-shrink-0" />
                                    <div><p className="text-gray-500 text-[10px] uppercase tracking-wider">Issue Date</p><p className="text-white text-sm font-medium">{cert.issueDate}</p></div>
                                </div>
                            )}
                            {cert.expiryDate && (
                                <div className="flex items-center gap-2 bg-slate-800/60 rounded-xl p-3">
                                    <Calendar size={14} className="text-red-400 flex-shrink-0" />
                                    <div><p className="text-gray-500 text-[10px] uppercase tracking-wider">Expiry Date</p><p className="text-white text-sm font-medium">{cert.expiryDate}</p></div>
                                </div>
                            )}
                            {cert.credentialId && (
                                <div className="flex items-center gap-2 bg-slate-800/60 rounded-xl p-3">
                                    <Hash size={14} className="text-violet-400 flex-shrink-0" />
                                    <div><p className="text-gray-500 text-[10px] uppercase tracking-wider">Credential ID</p><p className="text-white text-sm font-medium font-mono">{cert.credentialId}</p></div>
                                </div>
                            )}
                            {cert.certNumber && (
                                <div className="flex items-center gap-2 bg-slate-800/60 rounded-xl p-3">
                                    <Shield size={14} className="text-blue-400 flex-shrink-0" />
                                    <div><p className="text-gray-500 text-[10px] uppercase tracking-wider">Cert Number</p><p className="text-white text-sm font-medium">{cert.certNumber}</p></div>
                                </div>
                            )}
                            {cert.grade && (
                                <div className="flex items-center gap-2 bg-slate-800/60 rounded-xl p-3">
                                    <Star size={14} className="text-amber-400 flex-shrink-0" />
                                    <div><p className="text-gray-500 text-[10px] uppercase tracking-wider">Grade/Score</p><p className="text-white text-sm font-medium">{cert.grade}</p></div>
                                </div>
                            )}
                            {cert.duration && (
                                <div className="flex items-center gap-2 bg-slate-800/60 rounded-xl p-3">
                                    <Clock size={14} className="text-orange-400 flex-shrink-0" />
                                    <div><p className="text-gray-500 text-[10px] uppercase tracking-wider">Duration</p><p className="text-white text-sm font-medium">{cert.duration}</p></div>
                                </div>
                            )}
                            {cert.instructor && (
                                <div className="flex items-center gap-2 bg-slate-800/60 rounded-xl p-3">
                                    <User size={14} className="text-green-400 flex-shrink-0" />
                                    <div><p className="text-gray-500 text-[10px] uppercase tracking-wider">Instructor</p><p className="text-white text-sm font-medium">{cert.instructor}</p></div>
                                </div>
                            )}
                            {cert.trainingMode && (
                                <div className="flex items-center gap-2 bg-slate-800/60 rounded-xl p-3">
                                    <Monitor size={14} className="text-pink-400 flex-shrink-0" />
                                    <div><p className="text-gray-500 text-[10px] uppercase tracking-wider">Mode</p><p className="text-white text-sm font-medium">{cert.trainingMode}</p></div>
                                </div>
                            )}
                            {cert.trainingHours && (
                                <div className="flex items-center gap-2 bg-slate-800/60 rounded-xl p-3">
                                    <BookOpen size={14} className="text-teal-400 flex-shrink-0" />
                                    <div><p className="text-gray-500 text-[10px] uppercase tracking-wider">Training Hours</p><p className="text-white text-sm font-medium">{cert.trainingHours}h</p></div>
                                </div>
                            )}
                        </div>

                        {/* Skills */}
                        <div className="mb-6">
                            <p className="text-gray-500 text-xs uppercase tracking-wider mb-3">Skills Gained</p>
                            <div className="flex flex-wrap gap-2">
                                {cert.skills.map((s, i) => (
                                    <span key={i} className="px-3 py-1 bg-slate-800 border border-slate-700 text-cyan-400 text-xs rounded-lg">
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-3">
                            {cert.verifyUrl && (
                                <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-xl text-sm font-medium transition-all">
                                    <ExternalLink size={14} />Verify
                                </a>
                            )}
                            <a href={cert.pdfUrl || cert.imageUrl} download={`${cert.title.replace(/\s+/g, '_')}_Certificate`}
                                className="flex items-center gap-2 px-4 py-2.5 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl text-sm font-medium transition-all">
                                <Download size={14} />Download
                            </a>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

// ─── Certificate Card ─────────────────────────────────────────────────────────

interface CertCardProps {
    cert: Certificate;
    index: number;
    onView: (id: number) => void;
    onDetail: (cert: Certificate) => void;
}

const CertCard: React.FC<CertCardProps> = ({ cert, index, onView, onDetail }) => {
    const catColor = CATEGORY_COLORS[cert.category] || CATEGORY_COLORS['Other'];

    return (
        <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.07 }}
            className="group relative bg-slate-800/40 backdrop-blur-md rounded-3xl border border-slate-700/50 hover:border-cyan-500/40 transition-all duration-500 overflow-hidden flex flex-col"
            style={{ boxShadow: '0 0 0 0 rgba(6,182,212,0)' }}
            whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(6,182,212,0.08)' }}
            aria-label={`Certificate: ${cert.title}`}
        >
            {/* Gradient border glow on hover */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.06) 0%, rgba(59,130,246,0.04) 100%)' }} />

            {/* Thumbnail */}
            <div className="relative h-44 overflow-hidden flex-shrink-0">
                <img
                    src={cert.imageUrl}
                    alt={`Thumbnail for ${cert.title}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                {/* Overlay actions */}
                <div className="absolute inset-0 bg-slate-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button
                        id={`view-cert-${cert.id}`}
                        onClick={() => onView(cert.id)}
                        className="flex items-center gap-1.5 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-cyan-500/30"
                        aria-label={`View certificate image for ${cert.title}`}
                    >
                        <Eye size={14} />View
                    </button>
                    <button
                        id={`detail-cert-${cert.id}`}
                        onClick={() => onDetail(cert)}
                        className="flex items-center gap-1.5 px-4 py-2 bg-white/15 hover:bg-white/25 text-white rounded-xl text-sm font-medium border border-white/20 transition-all"
                        aria-label={`View details for ${cert.title}`}
                    >
                        <Info size={14} />Details
                    </button>
                </div>

                {/* Category + Status badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border backdrop-blur-sm ${catColor}`}>{cert.category}</span>
                </div>
                <div className="absolute top-3 right-3">
                    <span className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border backdrop-blur-sm ${cert.status === 'Completed' ? 'text-emerald-400 bg-emerald-900/70 border-emerald-500/30' : 'text-amber-400 bg-amber-900/70 border-amber-500/30'}`}>
                        {cert.status === 'Completed' ? <CheckCircle2 size={9} /> : <Clock size={9} />}
                        {cert.status}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors leading-snug mb-1 line-clamp-2">
                    {cert.title}
                </h3>
                <p className="text-cyan-500/80 text-sm font-medium mb-3">{cert.organization}</p>
                <p className="text-gray-500 text-xs leading-relaxed mb-4 flex-grow line-clamp-2">{cert.description}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {cert.skills.slice(0, 4).map((s, i) => (
                        <span key={i} className="px-2 py-0.5 bg-slate-900/80 border border-slate-700/60 text-gray-400 text-[10px] rounded-md group-hover:border-cyan-500/20 group-hover:text-cyan-400/70 transition-colors">
                            {s}
                        </span>
                    ))}
                    {cert.skills.length > 4 && (
                        <span className="px-2 py-0.5 bg-slate-900/80 border border-slate-700/60 text-gray-500 text-[10px] rounded-md">
                            +{cert.skills.length - 4}
                        </span>
                    )}
                </div>

                {/* Meta row */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-700/40">
                    <span className="text-gray-500 text-xs flex items-center gap-1">
                        <Calendar size={10} className="text-cyan-500/60" />
                        {cert.issueDate}
                    </span>
                    {cert.grade && (
                        <span className="text-amber-400 text-xs flex items-center gap-1">
                            <Star size={10} />
                            {cert.grade}
                        </span>
                    )}
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 mt-4">
                    <button
                        onClick={() => onView(cert.id)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-900 hover:bg-cyan-500/10 border border-slate-700 hover:border-cyan-500/40 text-gray-400 hover:text-cyan-400 rounded-xl text-xs font-medium transition-all"
                        aria-label={`View ${cert.title} image`}
                    >
                        <Eye size={12} />View
                    </button>
                    <a
                        href={cert.pdfUrl || cert.imageUrl}
                        download={`${cert.title.replace(/\s+/g, '_')}_Certificate`}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-900 hover:bg-blue-500/10 border border-slate-700 hover:border-blue-500/40 text-gray-400 hover:text-blue-400 rounded-xl text-xs font-medium transition-all"
                        aria-label={`Download ${cert.title}`}
                    >
                        <Download size={12} />Download
                    </a>
                    {cert.verifyUrl ? (
                        <a
                            href={cert.verifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-900 hover:bg-emerald-500/10 border border-slate-700 hover:border-emerald-500/40 text-gray-400 hover:text-emerald-400 rounded-xl text-xs font-medium transition-all"
                            aria-label={`Verify ${cert.title}`}
                        >
                            <ExternalLink size={12} />Verify
                        </a>
                    ) : (
                        <button
                            onClick={() => onDetail(cert)}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-900 hover:bg-violet-500/10 border border-slate-700 hover:border-violet-500/40 text-gray-400 hover:text-violet-400 rounded-xl text-xs font-medium transition-all"
                            aria-label={`View details for ${cert.title}`}
                        >
                            <Info size={12} />Details
                        </button>
                    )}
                </div>
            </div>
        </motion.article>
    );
};

// ─── Timeline Item ─────────────────────────────────────────────────────────────

const TimelineItem: React.FC<{ cert: Certificate; index: number; isLeft: boolean; onView: (id: number) => void; onDetail: (cert: Certificate) => void }> = ({ cert, index, isLeft, onView, onDetail }) => {
    const catColor = CATEGORY_COLORS[cert.category] || CATEGORY_COLORS['Other'];
    return (
        <motion.div
            initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className={`relative flex items-start gap-6 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row mb-8`}
        >
            {/* Timeline dot */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-6 w-4 h-4 bg-cyan-500 rounded-full border-4 border-slate-950 z-10 shadow-lg shadow-cyan-500/40" />

            {/* Card */}
            <div className={`md:w-[calc(50%-2rem)] w-full p-6 bg-slate-800/40 backdrop-blur-md rounded-2xl border border-slate-700/50 hover:border-cyan-500/30 transition-all group`}>
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${catColor} mb-2 inline-block`}>{cert.category}</span>
                        <h3 className="text-white font-bold text-sm group-hover:text-cyan-400 transition-colors">{cert.title}</h3>
                        <p className="text-cyan-500/70 text-xs mt-0.5">{cert.organization}</p>
                    </div>
                    <span className={`flex-shrink-0 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold border ${cert.status === 'Completed' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-amber-400 bg-amber-500/10 border-amber-500/20'}`}>
                        {cert.status === 'Completed' ? <CheckCircle2 size={8} /> : <Clock size={8} />}{cert.status}
                    </span>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">{cert.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                    {cert.skills.slice(0, 3).map((s, i) => <span key={i} className="px-2 py-0.5 bg-slate-900/80 border border-slate-700 text-gray-500 text-[10px] rounded">{s}</span>)}
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-[10px] flex items-center gap-1"><Calendar size={9} />{cert.issueDate}</span>
                    <div className="flex gap-2">
                        <button onClick={() => onView(cert.id)} className="p-1.5 bg-slate-900 hover:bg-cyan-500/10 border border-slate-700 hover:border-cyan-500/40 text-gray-500 hover:text-cyan-400 rounded-lg transition-all" aria-label={`View ${cert.title}`}><Eye size={12} /></button>
                        <button onClick={() => onDetail(cert)} className="p-1.5 bg-slate-900 hover:bg-violet-500/10 border border-slate-700 hover:border-violet-500/40 text-gray-500 hover:text-violet-400 rounded-lg transition-all" aria-label={`Details for ${cert.title}`}><Info size={12} /></button>
                    </div>
                </div>
            </div>

            {/* Spacer for opposite side (desktop) */}
            <div className="hidden md:block md:w-[calc(50%-2rem)]" />
        </motion.div>
    );
};

// ─── Main Certifications Section ──────────────────────────────────────────────

export const Certifications: React.FC = () => {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState<CertCategory>('All');
    const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [detailCert, setDetailCert] = useState<Certificate | null>(null);
    const { t } = useLanguage();

    const filtered = CERTIFICATES.filter(c => {
        const matchesCategory = activeCategory === 'All' || c.category === activeCategory;
        const matchesSearch = search === '' ||
            c.title.toLowerCase().includes(search.toLowerCase()) ||
            c.organization.toLowerCase().includes(search.toLowerCase()) ||
            c.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    const sortedFiltered = [...filtered].sort((a, b) => {
        if (a.status === 'In Progress' && b.status !== 'In Progress') return -1;
        if (b.status === 'In Progress' && a.status !== 'In Progress') return 1;
        return 0;
    });

    const handleView = useCallback((id: number) => {
        const idx = filtered.findIndex(c => c.id === id);
        if (idx !== -1) setLightboxIndex(idx);
    }, [filtered]);

    const handleDetail = useCallback((cert: Certificate) => {
        setDetailCert(cert);
    }, []);

    const handleLightboxNavigate = useCallback((dir: 1 | -1) => {
        setLightboxIndex(prev => {
            if (prev === null) return null;
            return (prev + dir + filtered.length) % filtered.length;
        });
    }, [filtered.length]);

    return (
        <section id="certifications" className="py-24 relative overflow-hidden" aria-label="Certifications and Achievements">
            {/* Background decorations */}
            <div className="absolute top-20 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-20 right-0 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <SectionTitle
                    title={t('certs.title')}
                    subtitle={t('certs.subtitle')}
                />

                {/* ── Statistics ─────────────────────────────────────────── */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                    {STATS.map((stat, i) => {
                        const Icon = stat.icon;
                        const value = stat.getValue(CERTIFICATES);
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.85 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="relative bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 border border-slate-700/50 overflow-hidden group hover:border-slate-600/50 transition-all"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                                    <Icon size={20} />
                                </div>
                                <p className="text-3xl font-black text-white mb-1">
                                    <AnimatedCounter target={value} suffix={stat.suffix} />
                                </p>
                                <p className="text-gray-500 text-sm">{t(`certs.${stat.labelKey}` as any) || stat.label}</p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* ── Controls ────────────────────────────────────────────── */}
                <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-8">
                    {/* Search */}
                    <div className="relative flex-grow max-w-sm">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                        <input
                            id="cert-search"
                            type="text"
                            placeholder={t('certs.search')}
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full bg-slate-800/60 border border-slate-700/60 text-white placeholder-gray-600 rounded-xl pl-10 pr-10 py-3 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                            aria-label={t('certs.search')}
                        />
                        {search && (
                            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors" aria-label={t('certs.clear_search')}>
                                <X size={14} />
                            </button>
                        )}
                    </div>

                    {/* View toggle */}
                    <div className="flex items-center gap-2 p-1 bg-slate-800/60 border border-slate-700/60 rounded-xl flex-shrink-0">
                        <button
                            id="grid-view-btn"
                            onClick={() => setViewMode('grid')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === 'grid' ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'text-gray-400 hover:text-white'}`}
                            aria-label="Switch to grid view"
                            aria-pressed={viewMode === 'grid'}
                        >
                            <Grid3X3 size={15} />{t('certs.grid')}
                        </button>
                        <button
                            id="timeline-view-btn"
                            onClick={() => setViewMode('timeline')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === 'timeline' ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'text-gray-400 hover:text-white'}`}
                            aria-label="Switch to timeline view"
                            aria-pressed={viewMode === 'timeline'}
                        >
                            <AlignLeft size={15} />{t('certs.timeline')}
                        </button>
                    </div>
                </div>

                {/* ── Category Filters ─────────────────────────────────────── */}
                <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter certificates by category">
                    {CATEGORIES.map(cat => {
                        const count = cat === 'All' ? CERTIFICATES.length : CERTIFICATES.filter(c => c.category === cat).length;
                        if (count === 0 && cat !== 'All') return null;
                        return (
                            <button
                                key={cat}
                                id={`filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                                onClick={() => setActiveCategory(cat)}
                                aria-pressed={activeCategory === cat}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-300 ${activeCategory === cat
                                    ? 'bg-cyan-500 border-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                                    : 'bg-slate-800/40 border-slate-700/60 text-gray-400 hover:border-cyan-500/40 hover:text-cyan-400'
                                    }`}
                            >
                                {cat}
                                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${activeCategory === cat ? 'bg-white/20 text-white' : 'bg-slate-700 text-gray-500'}`}>
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* ── Results count ─────────────────────────────────────────── */}
                {search && (
                    <p className="text-gray-500 text-sm mb-6">
                        Found <span className="text-cyan-400 font-bold">{filtered.length}</span> certificate{filtered.length !== 1 ? 's' : ''} matching "{search}"
                    </p>
                )}

                {/* ── Grid View ─────────────────────────────────────────────── */}
                {viewMode === 'grid' && (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`grid-${activeCategory}-${search}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        >
                            {sortedFiltered.length > 0 ? sortedFiltered.map((cert, i) => (
                                <CertCard key={cert.id} cert={cert} index={i} onView={handleView} onDetail={handleDetail} />
                            )) : (
                                <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
                                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                                        <Search size={24} className="text-gray-600" />
                                    </div>
                                    <p className="text-gray-400 font-medium">No certificates found</p>
                                    <p className="text-gray-600 text-sm mt-1">Try a different search or filter</p>
                                    <button onClick={() => { setSearch(''); setActiveCategory('All'); }} className="mt-4 px-4 py-2 bg-slate-800 border border-slate-700 text-gray-400 hover:text-white rounded-xl text-sm transition-colors">
                                        Clear Filters
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                )}

                {/* ── Timeline View ─────────────────────────────────────────── */}
                {viewMode === 'timeline' && (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`timeline-${activeCategory}-${search}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="relative"
                        >
                            {/* Central line (desktop only) */}
                            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/40 via-blue-500/20 to-transparent" aria-hidden="true" />

                            {sortedFiltered.length > 0 ? sortedFiltered.map((cert, i) => (
                                <TimelineItem key={cert.id} cert={cert} index={i} isLeft={i % 2 === 0} onView={handleView} onDetail={handleDetail} />
                            )) : (
                                <div className="flex flex-col items-center justify-center py-24 text-center">
                                    <p className="text-gray-400 font-medium">No certificates found</p>
                                    <button onClick={() => { setSearch(''); setActiveCategory('All'); }} className="mt-4 px-4 py-2 bg-slate-800 border border-slate-700 text-gray-400 hover:text-white rounded-xl text-sm transition-colors">
                                        Clear Filters
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                )}


            </div>

            {/* ── Lightbox ──────────────────────────────────────────────────── */}
            {lightboxIndex !== null && (
                <Lightbox
                    certs={filtered}
                    currentIndex={lightboxIndex}
                    onClose={() => setLightboxIndex(null)}
                    onNavigate={handleLightboxNavigate}
                />
            )}

            {/* ── Detail Modal ──────────────────────────────────────────────── */}
            {detailCert && (
                <DetailModal cert={detailCert} onClose={() => setDetailCert(null)} />
            )}
        </section>
    );
};
