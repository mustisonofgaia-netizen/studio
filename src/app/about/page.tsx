
import Link from 'next/link';
import { ArrowLeft, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background p-8 font-body">
      <div className="max-w-4xl mx-auto">
        <Link href="/">
          <Button variant="ghost" className="rounded-full mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to World Map
          </Button>
        </Link>
        <div className="bg-white p-12 rounded-[2rem] border-4 border-secondary shadow-2xl flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-full border-8 border-white bg-primary shadow-xl mb-8 flex items-center justify-center">
            <User className="w-16 h-16 text-primary-foreground" />
          </div>
          <h1 className="text-5xl font-black mb-6">The Explorer</h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mb-12">
            Every map needs an explorer. I spend my days navigating the digital wilderness, 
            charting new paths in web development and creating experiences that feel like an adventure.
          </p>
          <div className="grid grid-cols-3 gap-12 w-full max-w-xl">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-black text-primary">15+</span>
              <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Quests</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-black text-secondary">100%</span>
              <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Magic</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-black text-accent">∞</span>
              <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Coffee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
