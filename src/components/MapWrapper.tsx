
"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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

  // Interaction Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1.1);

  // Organic Bouncy Physics
  const springConfig = { stiffness: 100, damping: 20 };
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

  // Calculate constraints to prevent showing black background
  // Assumes object-fit: cover makes the base image at scale 1 fill the viewport
  const dragConstraints = {
    left: -(windowSize.width * (scale.get() - 1)) / 2,
    right: (windowSize.width * (scale.get() - 1)) / 2,
    top: -(windowSize.height * (scale.get() - 1)) / 2,
    bottom: (windowSize.height * (scale.get() - 1)) / 2,
  };

  const handleWheel = (e: React.WheelEvent) => {
    const delta = e.deltaY * -0.001;
    const newScale = Math.min(Math.max(scale.get() + delta, 1), 3);
    scale.set(newScale);
  };

  if (!mapImg) return null;

  return (
    <div 
      ref={containerRef}
      className="map-container"
      onWheel={handleWheel}
    >
      <motion.div
        drag
        dragConstraints={dragConstraints}
        dragElastic={0.1}
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
          data-ai-hint="fantasy map"
        />
        
        {/* Markers Layer */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {LANDMARKS.map((landmark) => (
            <MapLandmark key={landmark.id} {...landmark} containerX={springX} containerY={springY} />
          ))}
        </div>

        {/* Subtle Texture Overlay */}
        <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-15 bg-[url('https://www.transparenttextures.com/patterns/parchment.png')]" />
      </motion.div>
    </div>
  );
}
