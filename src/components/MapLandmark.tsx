
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface MapLandmarkProps {
  id: string;
  name: string;
  top: string;
  left: string;
  route: string;
  description: string;
}

export default function MapLandmark({ id, name, top, left, route, description }: MapLandmarkProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Parallax Tilt based on proximity
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-15, 15]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.getElementById(`marker-${id}`)?.getBoundingClientRect();
      if (!rect) return;
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [id, mouseX, mouseY]);

  return (
    <div
      id={`marker-${id}`}
      style={{ position: "absolute", top, left, transform: "translate(-50%, -50%)", zIndex: isOpen ? 100 : 10 }}
      className="flex flex-col items-center"
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="absolute bottom-full mb-8 z-50 min-w-[220px]"
          >
            <div className="glass-panel p-4 rounded-xl text-left">
              <div className="flex justify-between items-start mb-1.5">
                <h3 className="font-bold text-white text-sm tracking-tight pr-4">{name}</h3>
                <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-white/60 leading-relaxed mb-4 font-light">{description}</p>
              <button 
                onClick={() => router.push(route)}
                className="w-full flex items-center justify-center gap-2 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all text-[10px] font-bold uppercase tracking-widest border border-white/10"
              >
                Enter Region <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        style={{ rotateX, rotateY, perspective: 1000 }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        className="relative"
      >
        <div className="relative w-6 h-6 flex items-center justify-center">
          <motion.div 
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.2, 0.6] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute inset-0 border border-white rounded-full" 
          />
          <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,1)]" />
        </div>
      </motion.button>
      
      {!isOpen && (
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 text-[9px] font-black text-white/80 uppercase tracking-[0.2em] pointer-events-none drop-shadow-md"
        >
          {name}
        </motion.span>
      )}
    </div>
  );
}
