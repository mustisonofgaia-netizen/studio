
"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const mapImg = "https://iili.io/fti58ZB.png";

  const springConfig = { stiffness: 150, damping: 30, mass: 0.8 };

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1.5); // Start at a comfortable zoom

  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springScale = useSpring(scale, springConfig);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getConstraints = useCallback(() => {
    if (windowSize.width === 0) return { left: 0, right: 0, top: 0, bottom: 0 };

    const currentScale = scale.get();
    
    // Physical Bound Logic: (windowDimension * currentScale - windowDimension) / 2
    const horizontalBound = (windowSize.width * currentScale - windowSize.width) / 2;
    const verticalBound = (windowSize.height * currentScale - windowSize.height) / 2;

    return {
      left: -horizontalBound,
      right: horizontalBound,
      top: -verticalBound,
      bottom: verticalBound,
    };
  }, [windowSize, scale]);

  const handleWheel = (e: React.WheelEvent) => {
    // Zoom sensitivity
    const delta = e.deltaY * -0.001;
    
    // Enforce Scale Floor: Minimum 1.3 to ensure full coverage
    const minScale = 1.3; 
    const maxScale = 4.0;
    const newScale = Math.min(Math.max(scale.get() + delta, minScale), maxScale);
    scale.set(newScale);

    // Real-Time Clamping: Immediately snap position back to edge if out of bounds
    const c = getConstraints();
    const currentX = x.get();
    const currentY = y.get();

    if (currentX < c.left) x.set(c.left);
    if (currentX > c.right) x.set(c.right);
    if (currentY < c.top) y.set(c.top);
    if (currentY > c.bottom) y.set(c.bottom);
  };

  return (
    <div 
      ref={containerRef}
      className="map-container bg-black cursor-grab active:cursor-grabbing h-screen w-screen overflow-hidden relative"
      onWheel={handleWheel}
    >
      <motion.div
        drag
        dragConstraints={getConstraints()}
        dragElastic={0.1}
        dragMomentum={true}
        style={{
          x: springX,
          y: springY,
          scale: springScale,
          width: "100vw",
          height: "100vh",
        }}
        className="relative flex items-center justify-center"
      >
        <Image 
          src={mapImg} 
          alt="Adventure Map" 
          fill
          priority
          quality={100}
          className="object-cover pointer-events-none select-none"
        />
        
        {/* Absolute Centered Markers */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {LANDMARKS.map((landmark) => (
            <MapLandmark 
              key={landmark.id} 
              {...landmark} 
            />
          ))}
        </div>

        {/* Subtle Paper Grain Texture Overlay */}
        <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-15 bg-[url('https://www.transparenttextures.com/patterns/parchment.png')]" />
      </motion.div>
    </div>
  );
}
