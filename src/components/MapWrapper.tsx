
"use client";

import React, { useState, useRef, useEffect } from "react";
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
  const mapImg = "/background_landing_page.png";

  // Increased damping to 30 to prevent bouncy overshoot from revealing black bars
  const springConfig = { stiffness: 120, damping: 30, mass: 0.8 };

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1.6); // Higher initial scale to focus on the "Safe Zone"

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

  /**
   * Refactored Constraint Math:
   * The actual map is ~60% of the image (0.6).
   * We treat the map area as the "Safe Zone" but allow a buffer (the beige margins)
   * to be visible to ensure the black background is never revealed.
   */
  const getConstraints = () => {
    if (windowSize.width === 0) return { left: 0, right: 0, top: 0, bottom: 0 };

    const s = scale.get();
    
    // Total image dimension (fills viewport at scale 1.0 because of object-cover)
    const imgW = windowSize.width * s;
    const imgH = windowSize.height * s;

    // Calculate maximum movement allowed to reach the edge of the IMAGE file
    // This is the absolute limit to prevent black background
    const maxEdgeX = (imgW - windowSize.width) / 2;
    const maxEdgeY = (imgH - windowSize.height) / 2;

    // We want the camera to "feel" like it stops at the colored map area (60% of image)
    // but the actual drag constraint is the image edge.
    return {
      left: -maxEdgeX,
      right: maxEdgeX,
      top: -maxEdgeY,
      bottom: maxEdgeY,
    };
  };

  const handleWheel = (e: React.WheelEvent) => {
    // Zoom sensitivity
    const delta = e.deltaY * -0.0015;
    
    // Min scale 1.5 ensures map (60% of image) fills ~90% of a 1.0 viewport
    const minScale = 1.5; 
    const maxScale = 4.0;
    const newScale = Math.min(Math.max(scale.get() + delta, minScale), maxScale);
    scale.set(newScale);

    // Re-clamp position immediately on zoom to ensure we stay within image bounds
    const c = getConstraints();
    if (x.get() < c.left) x.set(c.left);
    if (x.get() > c.right) x.set(c.right);
    if (y.get() < c.top) y.set(c.top);
    if (y.get() > c.bottom) y.set(c.bottom);
  };

  return (
    <div 
      ref={containerRef}
      className="map-container bg-black cursor-grab active:cursor-grabbing"
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
        className="relative"
      >
        <Image 
          src={mapImg} 
          alt="World Map" 
          fill
          priority
          unoptimized
          className="object-cover pointer-events-none select-none brightness-[0.98] contrast-[1.01]"
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
        <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-10 bg-[url('https://www.transparenttextures.com/patterns/parchment.png')]" />
      </motion.div>
    </div>
  );
}
