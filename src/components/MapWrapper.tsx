
"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import MapLandmark from "./MapLandmark";
import Image from "next/image";

const LANDMARKS = [
  {
    id: "logic",
    name: "Sanctum of Logic",
    top: "45%",
    left: "40%",
    route: "/projects",
    description: "Where complex logic spells are woven into digital reality."
  },
  {
    id: "citadel",
    name: "Digital Citadel",
    top: "55%",
    left: "60%",
    route: "/projects",
    description: "The primary fortress of our engineering achievements."
  },
  {
    id: "caverns",
    name: "Crystal Caverns",
    top: "60%",
    left: "45%",
    route: "/gallery",
    description: "Visual treasures hidden deep within the mountain pass."
  },
  {
    id: "peaks",
    name: "Cloud Peaks",
    top: "40%",
    left: "55%",
    route: "/about",
    description: "The highest reach of our vision and long-term goals."
  }
];

export default function MapWrapper() {
  const mapSize = 4000;
  const mapImg = "https://iili.io/fti58ZB.png";
  
  // Spring config for smooth, organic scroll feel
  const springConfig = { stiffness: 120, damping: 35, mass: 1 };

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(0.4); // Start zoomed out to see the scroll effect

  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springScale = useSpring(scale, springConfig);

  const [constraints, setConstraints] = useState({ left: 0, right: 0, top: 0, bottom: 0 });

  const updateConstraints = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const currentScale = scale.get();
    
    // Calculate boundaries so the edges of the 4000px scroll are reachable
    const visualWidth = mapSize * currentScale;
    const visualHeight = mapSize * currentScale;

    // If visual size is larger than viewport, allow dragging to edges
    const hBound = Math.max(0, (visualWidth - vw) / 2);
    const vBound = Math.max(0, (visualHeight - vh) / 2);

    setConstraints({
      left: -hBound,
      right: hBound,
      top: -vBound,
      bottom: vBound,
    });
  }, [scale]);

  useEffect(() => {
    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    const unsubScale = scale.on("change", updateConstraints);
    return () => {
      window.removeEventListener("resize", updateConstraints);
      unsubScale();
    };
  }, [scale, updateConstraints]);

  const handleWheel = (e: React.WheelEvent) => {
    const delta = e.deltaY * -0.001;
    // Scale floor ensures it never looks too small on large monitors
    const minScale = 0.25; 
    const maxScale = 2.0;
    const newScale = Math.min(Math.max(scale.get() + delta, minScale), maxScale);
    scale.set(newScale);

    // Immediate clamp to prevent reveal of the void during zoom
    updateConstraints();
  };

  return (
    <div 
      className="w-full h-screen overflow-hidden bg-[#e8d8c3] cursor-grab active:cursor-grabbing relative flex items-center justify-center select-none"
      onWheel={handleWheel}
    >
      <motion.div
        drag
        dragConstraints={constraints}
        dragElastic={0}
        dragMomentum={true}
        style={{
          x: springX,
          y: springY,
          scale: springScale,
          width: mapSize,
          height: mapSize,
        }}
        className="relative flex-shrink-0 bg-transparent"
      >
        <div className="relative w-full h-full" style={{ imageRendering: 'high-quality' }}>
          <Image 
            src={mapImg} 
            alt="Parchment Map Scroll" 
            width={mapSize}
            height={mapSize}
            priority
            unoptimized={true}
            className="pointer-events-none select-none shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]"
          />
        </div>
        
        {/* Landmarks are nested inside the scroll so they scale and move with the high-res texture */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {LANDMARKS.map((landmark) => (
            <MapLandmark 
              key={landmark.id} 
              {...landmark} 
            />
          ))}
        </div>

        {/* Dynamic Paper Grain Overlay */}
        <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-20 bg-[url('https://www.transparenttextures.com/patterns/parchment.png')]" />
      </motion.div>

      {/* Subtle Vignette for depth */}
      <div className="fixed inset-0 pointer-events-none z-[80] shadow-[inset_0_0_150px_rgba(0,0,0,0.15)]" />
    </div>
  );
}
