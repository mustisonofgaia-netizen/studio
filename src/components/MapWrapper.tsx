
"use client";

import React, { useState, useRef, useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { motion, useMotionValue, useSpring } from "framer-motion";
import MapLandmark from "./MapLandmark";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const LANDMARKS = [
  {
    id: "treehouse",
    name: "Great Treehouse",
    icon: "trees",
    top: "25%",
    left: "30%",
    route: "/projects",
    description: "Home to the legendary builders and their amazing creations."
  },
  {
    id: "castle",
    name: "Digital Citadel",
    icon: "castle",
    top: "60%",
    left: "70%",
    route: "/blog",
    description: "A fortress of knowledge where thoughts are pixelated into stories."
  },
  {
    id: "cave",
    name: "Crystal Caverns",
    icon: "gem",
    top: "75%",
    left: "20%",
    route: "/gallery",
    description: "Deep underground, shining gems reveal a gallery of visual wonders."
  },
  {
    id: "clouds",
    name: "Cloud Peaks",
    icon: "cloud",
    top: "15%",
    left: "80%",
    route: "/skills",
    description: "Reach for the summit to master the arts of magic and logic."
  },
  {
    id: "tent",
    name: "Explorer's Camp",
    icon: "tent",
    top: "50%",
    left: "45%",
    route: "/about",
    description: "A cozy spot for stories about the adventurer behind the map."
  }
];

export default function MapWrapper() {
  const mapImg = PlaceHolderImages.find(img => img.id === 'world-map')?.imageUrl || "";
  
  // Parallax values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Calculate normalized position (-0.5 to 0.5)
    const x = (clientX / innerWidth) - 0.5;
    const y = (clientY / innerHeight) - 0.5;
    
    mouseX.set(x * -40); // Move map slightly opposite to cursor
    mouseY.set(y * -40);
  };

  return (
    <div 
      className="map-container"
      onMouseMove={handleMouseMove}
    >
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={3}
        centerOnInit
        wheel={{ step: 0.1 }}
      >
        <TransformComponent
          wrapperStyle={{ width: "100%", height: "100%" }}
          contentStyle={{ width: "2400px", height: "1600px" }}
        >
          <motion.div
            style={{
              x: springX,
              y: springY,
              position: "relative",
              width: "2400px",
              height: "1600px"
            }}
          >
            {/* The Map Background */}
            <img 
              src={mapImg} 
              alt="World Map" 
              className="w-full h-full object-cover select-none pointer-events-none opacity-80"
              data-ai-hint="fantasy landscape map"
            />
            
            {/* Landmark Markers */}
            {LANDMARKS.map((landmark) => (
              <MapLandmark key={landmark.id} {...landmark} />
            ))}
          </motion.div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}
