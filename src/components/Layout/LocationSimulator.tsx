import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, Play, RefreshCw, Crosshair } from 'lucide-react';

interface Coords {
    lat: number;
    lng: number;
    timestamp: number;
    address?: string;
}

export const LocationSimulator: React.FC = () => {
    const [reportCoords, setReportCoords] = useState<Coords | null>(null);
    const [verifyCoords, setVerifyCoords] = useState<Coords | null>(null);
    const [isCapturingReport, setIsCapturingReport] = useState(false);
    const [isCapturingVerify, setIsCapturingVerify] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // Default mock coordinate (Janakpur center) if Geolocation is denied/unsupported
    const DEFAULT_LAT = 26.7271;
    const DEFAULT_LNG = 85.9229;

    const fetchAddressName = async (lat: number, lng: number): Promise<string> => {
        try {
            // Fetch from OpenStreetMap Nominatim reverse geocoding API
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`, {
                headers: {
                    'Accept-Language': 'en'
                }
            });
            if (res.ok) {
                const data = await res.json();
                return data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
            }
        } catch (e) {
            console.error('Error fetching address name:', e);
        }
        return `${lat.toFixed(4)}, ${lng.toFixed(4)} (Mock Location, Janakpur)`;
    };

    const captureLocation = (type: 'report' | 'verify', mockOffsetMeters?: number): Promise<Coords> => {
        return new Promise((resolve) => {
            if (!navigator.geolocation || mockOffsetMeters !== undefined) {
                // Return mock location
                let lat = DEFAULT_LAT;
                let lng = DEFAULT_LNG;

                if (mockOffsetMeters) {
                    // Simple offset approximation: 1 meter is approx 0.000009 degrees
                    const offsetDegrees = mockOffsetMeters * 0.000009;
                    lat += offsetDegrees;
                    lng += offsetDegrees;
                }

                setTimeout(async () => {
                    const address = await fetchAddressName(lat, lng);
                    resolve({
                        lat: parseFloat(lat.toFixed(6)),
                        lng: parseFloat(lng.toFixed(6)),
                        timestamp: Date.now(),
                        address
                    });
                }, 800);
            } else {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const lat = position.coords.latitude;
                        const lng = position.coords.longitude;
                        const address = await fetchAddressName(lat, lng);
                        resolve({
                            lat: parseFloat(lat.toFixed(6)),
                            lng: parseFloat(lng.toFixed(6)),
                            timestamp: position.timestamp,
                            address
                        });
                    },
                    async () => {
                        // Fallback to mock on error
                        const address = await fetchAddressName(DEFAULT_LAT, DEFAULT_LNG);
                        resolve({
                            lat: DEFAULT_LAT,
                            lng: DEFAULT_LNG,
                            timestamp: Date.now(),
                            address
                        });
                    },
                    { enableHighAccuracy: true, timeout: 5000 }
                );
            }
        });
    };

    const handleCaptureReport = async () => {
        setIsCapturingReport(true);
        setErrorMsg(null);
        try {
            const coords = await captureLocation('report');
            setReportCoords(coords);
        } catch (err: any) {
            setErrorMsg(err.message || 'Failed to capture location');
        } finally {
            setIsCapturingReport(false);
        }
    };

    const handleCaptureVerify = async (offsetMeters?: number) => {
        setIsCapturingVerify(true);
        setErrorMsg(null);
        try {
            const coords = await captureLocation('verify', offsetMeters);
            setVerifyCoords(coords);
        } catch (err: any) {
            setErrorMsg(err.message || 'Failed to capture location');
        } finally {
            setIsCapturingVerify(false);
        }
    };

    const resetSimulator = () => {
        setReportCoords(null);
        setVerifyCoords(null);
        setErrorMsg(null);
    };

    // Haversine formula to calculate distance in meters
    const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
        const R = 6371e3; // Earth's radius in meters
        const phi1 = (lat1 * Math.PI) / 180;
        const phi2 = (lat2 * Math.PI) / 180;
        const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
        const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

        const a =
            Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
            Math.cos(phi1) * Math.cos(phi2) *
            Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return Math.round(R * c);
    };

    const distance = reportCoords && verifyCoords 
        ? getDistance(reportCoords.lat, reportCoords.lng, verifyCoords.lat, verifyCoords.lng)
        : null;

    const MATCH_THRESHOLD = 50; // 50 meters
    const isMatched = distance !== null && distance <= MATCH_THRESHOLD;

    return (
        <div className="mt-12 p-px rounded-3xl bg-gradient-to-br from-cyan-500/30 to-blue-500/20 shadow-2xl">
            <div className="rounded-[calc(1.5rem-1px)] bg-slate-900/90 backdrop-blur-xl p-6 md:p-8">
                <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
                    <div>
                        <h4 className="text-xl font-bold text-white flex items-center gap-2">
                            🛰️ Location Match Verification Simulator
                        </h4>
                        <p className="text-xs text-gray-400 mt-1">
                            Simulate how real-time GPS tracking verifies waste reports matching same location coordinates.
                        </p>
                    </div>
                    <button
                        onClick={resetSimulator}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-gray-300 hover:text-white transition-colors"
                        title="Reset Simulator"
                    >
                        <RefreshCw size={16} />
                    </button>
                </div>

                {errorMsg && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center gap-2">
                        <AlertTriangle size={16} />
                        <span>{errorMsg}</span>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* STEP 1: REPORT LOCATION */}
                    <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-800 flex flex-col justify-between">
                        <div>
                            <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-wider">
                                Step 1: Citizens Report
                            </span>
                            <h5 className="text-lg font-semibold text-white mt-3 mb-2">Capture Report Location</h5>
                            <p className="text-xs text-gray-400 leading-relaxed mb-4">
                                Simulates a citizen spotting waste, snapping a picture, and submitting a report with automated GPS coordinates.
                            </p>
                        </div>

                        {reportCoords ? (
                            <div className="space-y-3 bg-slate-950/50 p-4 rounded-xl border border-slate-800 mt-4">
                                <div className="flex justify-between text-xs text-gray-400">
                                    <span>Latitude:</span>
                                    <span className="font-mono text-cyan-400 font-semibold">{reportCoords.lat}</span>
                                </div>
                                <div className="flex justify-between text-xs text-gray-400">
                                    <span>Longitude:</span>
                                    <span className="font-mono text-cyan-400 font-semibold">{reportCoords.lng}</span>
                                </div>
                                <div className="flex justify-between text-xs text-gray-400">
                                    <span>Captured Time:</span>
                                    <span>{new Date(reportCoords.timestamp).toLocaleTimeString()}</span>
                                </div>
                                <div className="flex flex-col gap-1 text-xs text-gray-400 border-t border-slate-800/80 pt-2.5">
                                    <span>Resolved Address (via OpenStreetMap Location API):</span>
                                    <span className="text-cyan-400 font-medium bg-slate-900/60 p-2 rounded-lg border border-slate-800/80 leading-relaxed mt-1">
                                        {reportCoords.address || 'Fetching Address...'}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={handleCaptureReport}
                                disabled={isCapturingReport}
                                className="w-full mt-4 flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors shadow-lg shadow-cyan-500/20"
                            >
                                <Play size={16} className={isCapturingReport ? 'animate-spin' : ''} />
                                <span>{isCapturingReport ? 'Capturing GPS...' : 'Capture GPS Coordinates'}</span>
                            </button>
                        )}
                    </div>

                    {/* STEP 2: VERIFICATION LOCATION */}
                    <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-800 flex flex-col justify-between">
                        <div>
                            <span className="px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                                Step 2: Collector Verification
                            </span>
                            <h5 className="text-lg font-semibold text-white mt-3 mb-2">Capture Verify Location</h5>
                            <p className="text-xs text-gray-400 leading-relaxed mb-4">
                                Simulates the collector arriving on site. Choose to match precisely, stand nearby, or stand too far away.
                            </p>
                        </div>

                        {verifyCoords ? (
                            <div className="space-y-3 bg-slate-950/50 p-4 rounded-xl border border-slate-800 mt-4">
                                <div className="flex justify-between text-xs text-gray-400">
                                    <span>Latitude:</span>
                                    <span className="font-mono text-blue-400 font-semibold">{verifyCoords.lat}</span>
                                </div>
                                <div className="flex justify-between text-xs text-gray-400">
                                    <span>Longitude:</span>
                                    <span className="font-mono text-blue-400 font-semibold">{verifyCoords.lng}</span>
                                </div>
                                <div className="flex justify-between text-xs text-gray-400">
                                    <span>Verified Time:</span>
                                    <span>{new Date(verifyCoords.timestamp).toLocaleTimeString()}</span>
                                </div>
                                <div className="flex flex-col gap-1 text-xs text-gray-400 border-t border-slate-800/80 pt-2.5">
                                    <span>Resolved Address (via OpenStreetMap Location API):</span>
                                    <span className="text-blue-400 font-medium bg-slate-900/60 p-2 rounded-lg border border-slate-800/80 leading-relaxed mt-1">
                                        {verifyCoords.address || 'Fetching Address...'}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2 mt-4">
                                <button
                                    onClick={() => handleCaptureVerify()}
                                    disabled={!reportCoords || isCapturingVerify}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-slate-700"
                                >
                                    <Crosshair size={14} />
                                    <span>Use Actual Location (GPS)</span>
                                </button>
                                <div className="grid grid-cols-3 gap-2">
                                    <button
                                        onClick={() => handleCaptureVerify(0)}
                                        disabled={!reportCoords || isCapturingVerify}
                                        className="flex-1 px-3 py-2 rounded-lg text-[10px] font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Same Spot (0m)
                                    </button>
                                    <button
                                        onClick={() => handleCaptureVerify(25)}
                                        disabled={!reportCoords || isCapturingVerify}
                                        className="flex-1 px-3 py-2 rounded-lg text-[10px] font-bold bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Nearby (25m)
                                    </button>
                                    <button
                                        onClick={() => handleCaptureVerify(150)}
                                        disabled={!reportCoords || isCapturingVerify}
                                        className="flex-1 px-3 py-2 rounded-lg text-[10px] font-bold bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Too Far (150m)
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* RESULTS SECTION */}
                <AnimatePresence>
                    {reportCoords && verifyCoords && distance !== null && (
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 15 }}
                            className="mt-8 border-t border-slate-800 pt-6"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-4">
                                    <span className="text-gray-400 text-sm block">Distance Between Actions:</span>
                                    <span className="text-3xl font-extrabold text-white mt-1 block">
                                        {distance} meters
                                    </span>
                                </div>

                                {isMatched ? (
                                    <div className="flex items-center gap-3 px-6 py-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 max-w-md">
                                        <CheckCircle size={24} className="shrink-0" />
                                        <div className="text-left">
                                            <p className="font-bold text-sm">Verification Matched Successfully!</p>
                                            <p className="text-xs opacity-80 mt-0.5">
                                                Collector is within the allowed {MATCH_THRESHOLD}m threshold. Report verified and confirmed.
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-3 px-6 py-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 max-w-md">
                                        <AlertTriangle size={24} className="shrink-0" />
                                        <div className="text-left">
                                            <p className="font-bold text-sm">Location Verification Mismatch!</p>
                                            <p className="text-xs opacity-80 mt-0.5">
                                                Collector's distance ({distance}m) exceeds the maximum allowed {MATCH_THRESHOLD}m limit. Action flagged!
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
