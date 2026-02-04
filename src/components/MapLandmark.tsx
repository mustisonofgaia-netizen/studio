
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface MapLandmarkProps {
  id: string;
  name: string;
  top: string;
  left: string;
  route: string;
  description: string;
  containerX?: MotionValue<number>;
  containerY?: MotionValue<number>;
}

export default function MapLandmark({ id, name, top, left, route, description }: MapLandmarkProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Parallax Tilt based on proximity
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.getElementById(`marker-${id}`)?.getBoundingClientRect();
      if (!rect) return;
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
      
      if (dist < 500) {
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
      style={{ 
        position: "absolute", 
        top, 
        left, 
        transform: "translate(-50%, -50%)", 
        zIndex: isOpen ? 100 : 10,
        pointerEvents: "auto"
      }}
      className="flex flex-col items-center"
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className="absolute bottom-full mb-8 z-50 min-w-[280px]"
          >
            <div className="glass-panel p-6 rounded-[2rem] shadow-2xl">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-white text-[10px] uppercase tracking-[0.2em]">{name}</h3>
                <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="text-white/40 hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[12px] text-white/80 leading-relaxed mb-6 font-light">{description}</p>
              <button 
                onClick={() => router.push(route)}
                className="w-full flex items-center justify-center gap-3 py-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all text-[10px] font-black uppercase tracking-[0.2em] border border-white/10"
              >
                Journey Forward <ArrowRight className="w-3.5 h-3.5" />
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
        className="relative group p-6"
      >
        <div className="relative w-6 h-6 flex items-center justify-center">
          {/* Outer Pulsing Ring */}
          <motion.div 
            animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0.1, 0.5] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute inset-0 border-[1.5px] border-white/40 rounded-full" 
          />
          {/* Inner Marker Ring */}
          <div className="w-2.5 h-2.5 border-[2px] border-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.6)]" />
        </div>
      </motion.button>
      
      {!isOpen && (
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          whileHover={{ opacity: 1 }}
          className="mt-2 text-[9px] font-black text-white uppercase tracking-[0.4em] pointer-events-none drop-shadow-md text-center"
        >
          {name}
        </motion.span>
      )}
    </div>
  );
}
