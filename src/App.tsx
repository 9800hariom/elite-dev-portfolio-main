import React from 'react';
import { usePortfolioData } from './hooks/usePortfolioData';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { CustomCursor } from './components/Common/Effects';
import { ScrollProgress, BackToTop } from './components/Common/ScrollExtras';
import { Header } from './components/Layout/Header';
import { Hero } from './components/Layout/Hero';
import { About } from './components/Layout/About';
import { Skills } from './components/Layout/Skills';
import { Experience } from './components/Layout/Experience';
import { Projects } from './components/Layout/Projects';
import { Certifications } from './components/Layout/Certifications';
import { Testimonials } from './components/Layout/Testimonials';
import { Location } from './components/Layout/Location';
import { Contact } from './components/Layout/Contact';
import { Footer } from './components/Layout/Footer';

/**
 * App Component
 * Main entry point — wraps everything with ThemeProvider and LanguageProvider.
 */
const AppContent: React.FC = () => {
    const { data, loading, error } = usePortfolioData();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-base)' }}>
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 bg-cyan-500/10 rounded-full animate-pulse" />
                    </div>
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white p-6 text-center" style={{ backgroundColor: 'var(--bg-base)' }}>
                <div className="max-w-md">
                    <h2 className="text-2xl font-bold mb-4 text-red-400">Connection Error</h2>
                    <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
                        {error || 'Failed to load portfolio data. Please check your connection.'}
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl transition-all shadow-lg shadow-cyan-600/20"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="selection:bg-cyan-500/30 selection:text-cyan-200 min-h-screen" style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}>
            {/* Progress + Cursor */}
            <ScrollProgress />
            <CustomCursor />

            {/* Nav */}
            <Header />

            <main>
                <Hero profile={data} />
                <About profile={data} />
                <Skills profile={data} />
                <Experience profile={data} />
                <Projects profile={data} />
                <Certifications />
                <Testimonials profile={data} />
                <Location />
                <Contact profile={data} />
            </main>

            <Footer profile={data} />

            {/* Back to top */}
            <BackToTop />
        </div>
    );
};

const App: React.FC = () => (
    <ThemeProvider>
        <LanguageProvider>
            <AppContent />
        </LanguageProvider>
    </ThemeProvider>
);

export default App;
