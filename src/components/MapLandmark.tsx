"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  return (
    <div
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
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="absolute bottom-full mb-6 z-50 min-w-[260px]"
          >
            <div className="glass-panel p-5 rounded-2xl shadow-2xl backdrop-blur-xl bg-white/5 border border-white/10">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-white text-[10px] uppercase tracking-widest">{name}</h3>
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} 
                  className="text-white/40 hover:text-white transition-colors p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[12px] text-white/70 leading-relaxed mb-4 font-light">{description}</p>
              <button 
                onClick={() => router.push(route)}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all text-[9px] font-bold uppercase tracking-widest border border-white/10"
              >
                Enter Region <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.2, filter: 'brightness(1.2)' }}
        whileTap={{ scale: 0.9 }}
        className="relative group p-4 flex flex-col items-center"
      >
        <div className="relative w-5 h-5 flex items-center justify-center">
          {/* Pulsing Aura */}
          <motion.div 
            animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="absolute inset-0 border-[1px] border-white/50 rounded-full" 
          />
          {/* Centered Core */}
          <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
        </div>
        
        {!isOpen && (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            className="mt-2 text-[8px] font-bold text-white uppercase tracking-[0.3em] pointer-events-none drop-shadow-md whitespace-nowrap"
          >
            {name}
          </motion.span>
        )}
      </motion.button>
    </div>
  );
}
