
"use client";

import React, { useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { motion } from "framer-motion";
import MapLandmark from "./MapLandmark";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

const LANDMARKS = [
  {
    id: "treehouse",
    name: "Great Treehouse",
    top: "25%",
    left: "30%",
    route: "/projects",
    description: "The architectural marvel where magic meets logic."
  },
  {
    id: "castle",
    name: "Digital Citadel",
    top: "60%",
    left: "70%",
    route: "/blog",
    description: "A fortress housing the ancient scrolls of knowledge."
  },
  {
    id: "cave",
    name: "Crystal Caverns",
    top: "75%",
    left: "20%",
    route: "/gallery",
    description: "Luminescent gems reflecting the explorer's visual journey."
  },
  {
    id: "clouds",
    name: "Cloud Peaks",
    top: "15%",
    left: "80%",
    route: "/skills",
    description: "The highest summits where true mastery is achieved."
  },
  {
    id: "tent",
    name: "Explorer's Camp",
    top: "50%",
    left: "45%",
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
        smooth={true}
        alignmentAnimation={{ size: 0 }}
        doubleClick={{ disabled: true }}
        panning={{ velocityDisabled: false }}
      >
        <TransformComponent
          wrapperStyle={{ width: "100vw", height: "100vh" }}
          contentStyle={{ width: "100vw", height: "100vh" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-[2400px] h-[1600px]"
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
              priority
              className="object-cover pointer-events-none brightness-95 contrast-[1.05]"
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
