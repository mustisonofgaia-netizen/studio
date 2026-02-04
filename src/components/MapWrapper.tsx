"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import MapLandmark from "./MapLandmark";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

const LANDMARKS = [
  {
    id: "logic",
    name: "Sanctum of Logic",
    top: "35%",
    left: "25%",
    route: "/projects",
    description: "Where complex logic spells are woven into digital reality."
  },
  {
    id: "citadel",
    name: "Digital Citadel",
    top: "65%",
    left: "75%",
    route: "/projects",
    description: "The primary fortress of our engineering achievements."
  },
  {
    id: "caverns",
    name: "Crystal Caverns",
    top: "80%",
    left: "30%",
    route: "/gallery",
    description: "Visual treasures hidden deep within the mountain pass."
  },
  {
    id: "peaks",
    name: "Cloud Peaks",
    top: "20%",
    left: "85%",
    route: "/about",
    description: "The highest reach of our vision and long-term goals."
  }
];

export default function MapWrapper() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const mapImg = PlaceHolderImages.find(img => img.id === 'world-map')?.imageUrl || "";

  // Bouncy Spring Config (Stiffness 100, Damping 20)
  const springConfig = { stiffness: 100, damping: 20, mass: 0.5 };

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1.1);

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

  // Strict constraint calculation to prevent any black space
  const getConstraints = () => {
    const s = scale.get();
    const overWidth = (windowSize.width * s - windowSize.width) / 2;
    const overHeight = (windowSize.height * s - windowSize.height) / 2;
    
    return {
      left: -overWidth,
      right: overWidth,
      top: -overHeight,
      bottom: overHeight,
    };
  };

  const handleWheel = (e: React.WheelEvent) => {
    const delta = e.deltaY * -0.001;
    const newScale = Math.min(Math.max(scale.get() + delta, 1.0), 3.0);
    scale.set(newScale);

    // Re-clamp position on zoom
    const c = getConstraints();
    if (x.get() < c.left) x.set(c.left);
    if (x.get() > c.right) x.set(c.right);
    if (y.get() < c.top) y.set(c.top);
    if (y.get() > c.bottom) y.set(c.bottom);
  };

  if (!mapImg) return <div className="map-container bg-black" />;

  return (
    <div 
      ref={containerRef}
      className="map-container bg-black"
      onWheel={handleWheel}
    >
      <motion.div
        drag
        dragConstraints={getConstraints()}
        dragElastic={0.1}
        dragMomentum={false}
        style={{
          x: springX,
          y: springY,
          scale: springScale,
          width: "100vw",
          height: "100vh",
          cursor: "grab",
        }}
        whileTap={{ cursor: "grabbing" }}
        className="relative"
      >
        <Image 
          src={mapImg} 
          alt="World Map" 
          fill
          priority
          unoptimized
          className="object-cover pointer-events-none brightness-[0.9] contrast-[1.05]"
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

        {/* Paper Grain Overlay */}
        <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-20 bg-[url('https://www.transparenttextures.com/patterns/parchment.png')]" />
      </motion.div>
    </div>
  );
}