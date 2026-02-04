
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Info, Mail, LayoutGrid, Sparkles, Map as MapIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function HUD() {
  const pathname = usePathname();
  const springConfig = { stiffness: 100, damping: 20 };

  return (
    <>
      {/* Top Right - Secondary Navigation Stack */}
      <div className="fixed top-6 right-6 z-[100]">
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", ...springConfig }}
          className="flex flex-col gap-3 p-2 bg-white/5 backdrop-blur-[10px] border border-white/20 rounded-full shadow-2xl"
        >
          <SecondaryNavItem icon={Info} href="/about" active={pathname === "/about"} />
          <SecondaryNavItem icon={Mail} href="/contact" active={pathname === "/contact"} />
        </motion.div>
      </div>

      {/* Bottom Center - Main Dock */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100]">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", ...springConfig }}
          className="flex items-center gap-2 p-2 bg-white/5 backdrop-blur-[12px] border border-white/20 rounded-2xl shadow-2xl"
        >
          <DockNavItem icon={MapIcon} href="/" active={pathname === "/"} />
          <div className="w-[1px] h-6 bg-white/10 mx-1" />
          <DockNavItem icon={LayoutGrid} href="/projects" active={pathname === "/projects"} />
          <DockNavItem icon={Sparkles} href="/gallery" active={pathname === "/gallery"} />
        </motion.div>
      </div>
    </>
  );
}

function DockNavItem({ icon: Icon, href, active }: { icon: any, href: string, active: boolean }) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.08)" }}
        whileTap={{ scale: 0.9 }}
        className={cn(
          "p-3 rounded-xl transition-all duration-300",
          active ? "bg-white/15 text-white shadow-[0_0_20px_rgba(255,255,255,0.15)]" : "text-white/40 hover:text-white"
        )}
      >
        <Icon className="w-5 h-5" strokeWidth={1.5} />
      </motion.div>
    </Link>
  );
}

function SecondaryNavItem({ icon: Icon, href, active }: { icon: any, href: string, active: boolean }) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.08)" }}
        whileTap={{ scale: 0.9 }}
        className={cn(
          "p-2.5 rounded-full transition-all duration-300",
          active ? "bg-white/15 text-white" : "text-white/30 hover:text-white"
        )}
      >
        <Icon className="w-4 h-4" strokeWidth={1.5} />
      </motion.div>
    </Link>
  );
}
