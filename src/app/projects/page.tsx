
import Link from 'next/link';
import { ArrowLeft, Box } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background p-8 font-body">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link href="/">
          <Button variant="ghost" className="rounded-full mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to World Map
          </Button>
        </Link>
        <div className="bg-white p-12 rounded-[2rem] border-4 border-primary shadow-2xl">
          <div className="flex items-center gap-6 mb-8">
            <div className="p-4 bg-primary rounded-3xl">
              <Box className="w-12 h-12 text-primary-foreground" />
            </div>
            <h1 className="text-5xl font-black text-foreground tracking-tight">The Quest Log: Projects</h1>
          </div>
          <p className="text-xl text-muted-foreground leading-relaxed mb-12">
            Welcome to the Great Treehouse. This is where all the magical artifacts and logic spells are crafted.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="group p-6 bg-secondary/10 rounded-2xl border-2 border-secondary/20 hover:border-primary transition-all cursor-pointer">
                <div className="w-full h-40 bg-muted rounded-xl mb-4 group-hover:scale-[1.02] transition-transform" />
                <h3 className="text-xl font-bold mb-2">Magic Relic #{i}</h3>
                <p className="text-sm text-muted-foreground">A powerful creation using the arts of React and GenAI.</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
