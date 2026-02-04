
"use client";

import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { motion } from "framer-motion";
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
  const mapImg = PlaceHolderImages.find(img => img.id === 'world-map')?.imageUrl || "";
  
  if (!mapImg) return <div className="w-screen h-screen bg-black flex items-center justify-center text-white">Loading Map...</div>;

  return (
    <div className="map-container bg-black overflow-hidden w-screen h-screen">
      <TransformWrapper
        initialScale={1.1}
        minScale={1}
        maxScale={3}
        centerOnInit={true}
        limitToBounds={true}
        panning={{ 
          velocityDisabled: false,
          lockAxisX: false,
          lockAxisY: false,
        }}
        wheel={{ step: 0.05 }}
        doubleClick={{ disabled: true }}
      >
        <TransformComponent
          wrapperStyle={{ width: "100vw", height: "100vh" }}
          contentStyle={{ width: "100vw", height: "100vh" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-[100vw] h-[100vh]"
          >
            {/* The Map Background - Forced to cover and constrained */}
            <Image 
              src={mapImg} 
              alt="World Map" 
              fill
              priority
              unoptimized
              className="object-cover pointer-events-none brightness-[0.85] contrast-[1.05]"
              data-ai-hint="fantasy map"
            />
            
            {/* Markers Layer */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              <div className="relative w-full h-full pointer-events-auto">
                {LANDMARKS.map((landmark) => (
                  <MapLandmark key={landmark.id} {...landmark} />
                ))}
              </div>
            </div>

            {/* Subtle Texture Overlay */}
            <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-10 bg-[url('https://www.transparenttextures.com/patterns/parchment.png')]" />
          </motion.div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}
