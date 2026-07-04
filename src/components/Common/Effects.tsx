
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Typewriter = () => {
    const words = ["Full Stack Developer", "UI/UX Enthusiast", "Problem Solver", "Tech Innovator"];
    const [index, setIndex] = useState(0);
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const currentWord = words[index];
            if (!isDeleting) {
                setText(currentWord.substring(0, text.length + 1));
                if (text === currentWord) {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                setText(currentWord.substring(0, text.length - 1));
                if (text === "") {
                    setIsDeleting(false);
                    setIndex((prev) => (prev + 1) % words.length);
                }
            }
        }, isDeleting ? 50 : 150);

        return () => clearTimeout(timeout);
    }, [text, isDeleting, index]);

    return (
        <span className="text-cyan-400 font-mono">
            {text}
            <span className="animate-pulse">|</span>
        </span>
    );
};

export const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const updateInteractivity = () => {
            const hoveredElement = document.elementFromPoint(position.x, position.y);
            if (hoveredElement) {
                const style = window.getComputedStyle(hoveredElement);
                setIsPointer(style.cursor === 'pointer');
            }
        };

        window.addEventListener('mousemove', moveCursor);
        updateInteractivity();

        return () => {
            window.removeEventListener('mousemove', moveCursor);
        };
    }, [position.x, position.y]);

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 bg-cyan-500 rounded-full mix-blend-difference pointer-events-none z-[9999]"
                animate={{
                    x: position.x - 8,
                    y: position.y - 8,
                    scale: isPointer ? 2.5 : 1,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
            />
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border border-cyan-500/50 rounded-full pointer-events-none z-[9998]"
                animate={{
                    x: position.x - 16,
                    y: position.y - 16,
                    scale: isPointer ? 1.5 : 1,
                    opacity: isPointer ? 0.5 : 1
                }}
                transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.8 }}
            />
        </>
    );
};
