
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trees, Castle, Gem, Cloud, Tent } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransformContext } from "react-zoom-pan-pinch";

const iconsMap: Record<string, any> = {
  trees: Trees,
  castle: Castle,
  gem: Gem,
  cloud: Cloud,
  tent: Tent,
};

interface MapLandmarkProps {
  id: string;
  name: string;
  icon: string;
  top: string;
  left: string;
  route: string;
  description: string;
}

export default function MapLandmark({ id, name, icon, top, left, route, description }: MapLandmarkProps) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const { zoomIn } = useTransformContext();
  const IconComponent = iconsMap[icon] || Trees;

  const handleClick = () => {
    // Smooth zoom transition effect before navigating
    zoomIn(1.5, 500);
    setTimeout(() => {
      router.push(route);
    }, 600);
  };

  return (
    <div
      style={{ position: "absolute", top, left, transform: "translate(-50%, -50%)", zIndex: isHovered ? 50 : 10 }}
      className="flex flex-col items-center"
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className="absolute bottom-full mb-4 z-50 pointer-events-none"
          >
            <div className="speech-bubble w-48 text-center shadow-xl border-2 border-primary">
              <h3 className="font-bold text-sm mb-1 text-primary-foreground">{name}</h3>
              <p className="text-xs text-muted-foreground leading-tight">{description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`p-4 rounded-full border-4 shadow-lg transition-colors bg-white ${isHovered ? 'border-primary' : 'border-secondary'}`}
      >
        <IconComponent className={`w-8 h-8 ${isHovered ? 'text-primary' : 'text-secondary-foreground'}`} strokeWidth={2.5} />
      </motion.button>
      
      <div className="mt-2 px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full border-2 border-secondary shadow-sm">
        <span className="text-xs font-bold whitespace-nowrap">{name}</span>
      </div>
    </div>
  );
}
