
"use client";

import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { motion } from "framer-motion";
import MapLandmark from "./MapLandmark";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

const LANDMARKS = [
  {
    id: "treehouse",
    name: "Sanctum of Logic",
    top: "28%",
    left: "32%",
    route: "/projects",
    description: "The architectural marvel where magic meets computational logic."
  },
  {
    id: "castle",
    name: "Digital Citadel",
    top: "62%",
    left: "72%",
    route: "/blog",
    description: "A fortress housing the ancient scrolls of knowledge."
  },
  {
    id: "cave",
    name: "Crystal Caverns",
    top: "78%",
    left: "22%",
    route: "/gallery",
    description: "Luminescent gems reflecting the explorer's visual journey."
  },
  {
    id: "clouds",
    name: "Cloud Peaks",
    top: "18%",
    left: "82%",
    route: "/skills",
    description: "The highest summits where true mastery is achieved."
  },
  {
    id: "tent",
    name: "Explorer's Hub",
    top: "52%",
    left: "48%",
    route: "/about",
    description: "The personal sanctuary of the world's most curious traveler."
  }
];

export default function MapWrapper() {
  const mapImg = PlaceHolderImages.find(img => img.id === 'world-map')?.imageUrl || "";
  
  return (
    <div className="map-container select-none">
      <TransformWrapper
        initialScale={1}
        minScale={1}
        maxScale={3}
        centerOnInit
        limitToBounds={true}
        disabled={false}
        panning={{ velocityDisabled: false, lockAxisX: false, lockAxisY: false }}
        doubleClick={{ disabled: true }}
      >
        <TransformComponent
          wrapperStyle={{ width: "100vw", height: "100vh" }}
          contentStyle={{ width: "100vw", height: "100vh" }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative w-[2400px] h-[1600px] bg-[#0a0a0a]"
            style={{ 
              width: "2400px", 
              height: "1600px",
            }}
          >
            {/* The Map Background - Lazy Loaded High Res */}
            <Image 
              src={mapImg} 
              alt="World Map" 
              fill
              loading="lazy"
              className="object-cover pointer-events-none brightness-75 contrast-125"
              data-ai-hint="fantasy map"
            />
            
            {/* Markers Layer */}
            <div className="absolute inset-0 z-10">
              {LANDMARKS.map((landmark) => (
                <MapLandmark key={landmark.id} {...landmark} />
              ))}
            </div>

            {/* Subtle Overlay Texture */}
            <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30 bg-[url('https://www.transparenttextures.com/patterns/parchment.png')]" />
          </motion.div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}
