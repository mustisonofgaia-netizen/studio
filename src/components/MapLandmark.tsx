
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
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-10, 10]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.getElementById(`marker-${id}`)?.getBoundingClientRect();
      if (!rect) return;
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      // Only track if relatively close
      const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
      if (dist < 400) {
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
      } else {
        mouseX.set(0);
        mouseY.set(0);
      }
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
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="absolute bottom-full mb-6 z-50 min-w-[240px]"
          >
            <div className="glass-panel p-5 rounded-2xl text-left shadow-2xl">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-white text-xs uppercase tracking-widest">{name}</h3>
                <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="text-white/30 hover:text-white transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[11px] text-white/50 leading-relaxed mb-4 font-light">{description}</p>
              <button 
                onClick={() => router.push(route)}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all text-[9px] font-black uppercase tracking-[0.15em] border border-white/10"
              >
                Explore Area <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        style={{ rotateX, rotateY, perspective: 800 }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        className="relative group p-4"
      >
        <div className="relative w-5 h-5 flex items-center justify-center">
          {/* Outer Pulsing Ring */}
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.1, 0.4] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute inset-0 border border-white/50 rounded-full" 
          />
          {/* Inner Marker Dot */}
          <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] transition-all group-hover:scale-125" />
        </div>
      </motion.button>
      
      {!isOpen && (
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          whileHover={{ opacity: 1 }}
          className="mt-2 text-[8px] font-black text-white uppercase tracking-[0.3em] pointer-events-none"
        >
          {name}
        </motion.span>
      )}
    </div>
  );
}
