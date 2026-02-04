
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Scroll, Home, Info, Mail, Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function HUD() {
  return (
    <>
      {/* Top Left - Quest Log */}
      <div className="fixed top-6 left-6 z-[100]">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="rounded-full h-14 px-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl border-4 border-white/20">
                <Scroll className="mr-2 h-6 w-6" />
                <span className="font-bold text-lg tracking-wide">QUEST LOG</span>
              </Button>
            </motion.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 p-2 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border-2 border-primary">
            <DropdownMenuLabel className="text-primary font-bold px-3 py-2">Active Quests</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer focus:bg-secondary/20">
              <Link href="/projects" className="flex items-center p-3">
                <span className="w-2 h-2 rounded-full bg-primary mr-3" />
                <span className="font-medium">Build the Portfolio</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer focus:bg-secondary/20">
              <Link href="/blog" className="flex items-center p-3">
                <span className="w-2 h-2 rounded-full bg-secondary mr-3" />
                <span className="font-medium">Read the Ancient Scrolls</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer focus:bg-secondary/20">
              <Link href="/gallery" className="flex items-center p-3">
                <span className="w-2 h-2 rounded-full bg-accent mr-3" />
                <span className="font-medium">Visit Crystal Caverns</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer focus:bg-secondary/20">
              <Link href="/skills" className="flex items-center p-3">
                <span className="w-2 h-2 rounded-full bg-green-400 mr-3" />
                <span className="font-medium">Master New Skills</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Bottom Center - Floating Dock */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-full max-w-md px-6">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-around p-3 bg-white/80 backdrop-blur-xl border-4 border-white shadow-2xl rounded-full"
        >
          <DockItem icon={Home} label="Home" href="/" />
          <div className="w-px h-8 bg-border" />
          <DockItem icon={Info} label="About" href="/about" />
          <div className="w-px h-8 bg-border" />
          <DockItem icon={Mail} label="Contact" href="/contact" />
        </motion.div>
      </div>
    </>
  );
}

function DockItem({ icon: Icon, label, href }: { icon: any, label: string, href: string }) {
  return (
    <Link href={href} className="flex flex-col items-center group">
      <motion.div
        whileHover={{ y: -5, scale: 1.1 }}
        className="p-3 rounded-2xl group-hover:bg-primary transition-colors duration-200"
      >
        <Icon className="w-6 h-6 group-hover:text-primary-foreground" />
      </motion.div>
      <span className="text-[10px] font-bold uppercase tracking-tighter mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{label}</span>
    </Link>
  );
}
