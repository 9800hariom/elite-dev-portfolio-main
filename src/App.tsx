import React from 'react';
import { usePortfolioData } from './hooks/usePortfolioData';
import { CustomCursor } from './components/Common/Effects';
import { Header } from './components/Layout/Header';
import { Hero } from './components/Layout/Hero';
import { About } from './components/Layout/About';
import { Skills } from './components/Layout/Skills';
import { Experience } from './components/Layout/Experience';
import { Projects } from './components/Layout/Projects';
import { Testimonials } from './components/Layout/Testimonials';
import { Contact } from './components/Layout/Contact';
import { Footer } from './components/Layout/Footer';

/**
 * App Component
 * The main entry point of the portfolio application.
 * Handles data fetching, loading states, and layout assembly.
 */
const App: React.FC = () => {
    const { data, loading, error } = usePortfolioData();

    // Loading State
    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 bg-cyan-500/10 rounded-full animate-pulse" />
                    </div>
                </div>
            </div>
        );
    }

    // Error State
    if (error || !data) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white p-6 text-center">
                <div className="max-w-md">
                    <h2 className="text-2xl font-bold mb-4 text-red-400">Connection Error</h2>
                    <p className="text-gray-400 mb-8">{error || "Failed to load portfolio data. Please check your connection."}</p>
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
        <div className="bg-slate-950 text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-200 min-h-screen">
            {/* Interactive Effects */}
            <CustomCursor />

            {/* Essential Layout Components */}
            <Header />

            <main>
                <Hero profile={data} />
                <About profile={data} />
                <Skills profile={data} />
                <Experience profile={data} />
                <Projects profile={data} />
                <Testimonials profile={data} />
                <Contact profile={data} />
            </main>

            <Footer profile={data} />
        </div>
    );
};

export default App;
