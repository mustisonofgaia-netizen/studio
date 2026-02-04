
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

  // Parallax Tilt logic based on mouse proximity
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: MouseEvent) => {
    // Simple logic: if mouse is within range, calculate tilt
    const rect = document.getElementById(`marker-${id}`)?.getBoundingClientRect();
    if (!rect) return;
    
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
            className="absolute bottom-full mb-6 z-50 min-w-[200px]"
          >
            <div className="glass-panel p-5 rounded-2xl text-left border-white/30">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-white text-base leading-tight pr-4">{name}</h3>
                <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-white/70 leading-relaxed mb-4">{description}</p>
              <button 
                onClick={() => router.push(route)}
                className="w-full flex items-center justify-center gap-2 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all text-xs font-bold uppercase tracking-widest"
              >
                Explore <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        style={{ rotateX, rotateY, perspective: 1000 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative group"
      >
        {/* Minimal White Ring */}
        <div className="relative w-8 h-8 flex items-center justify-center">
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute inset-0 border-2 border-white/60 rounded-full" 
          />
          <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
        </div>
      </motion.button>
      
      {!isOpen && (
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 text-[10px] font-bold text-white uppercase tracking-widest bg-black/20 backdrop-blur-sm px-2 py-0.5 rounded-sm pointer-events-none"
        >
          {name}
        </motion.span>
      )}
    </div>
  );
}
