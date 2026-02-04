
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
      {/* Top Right - Secondary Navigation */}
      <div className="fixed top-6 right-6 z-[100]">
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", ...springConfig }}
          className="flex flex-col gap-2 p-1 glass-panel rounded-xl"
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
          className="flex items-center gap-1.5 p-1.5 glass-panel rounded-2xl"
        >
          <DockNavItem icon={MapIcon} href="/" active={pathname === "/"} />
          <div className="w-[1px] h-4 bg-white/10 mx-0.5" />
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
        whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
        whileTap={{ scale: 0.9 }}
        className={cn(
          "p-2.5 rounded-xl transition-all duration-200",
          active ? "bg-white/20 text-white shadow-inner" : "text-white/50 hover:text-white"
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
        whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "p-2 rounded-lg transition-all duration-200",
          active ? "bg-white/20 text-white" : "text-white/40 hover:text-white"
        )}
      >
        <Icon className="w-4 h-4" strokeWidth={2} />
      </motion.div>
    </Link>
  );
}
