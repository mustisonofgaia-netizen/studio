
import MapWrapper from "@/components/MapWrapper";
import HUD from "@/components/HUD";

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-background select-none">
      {/* Heads-up Display Overlay */}
      <HUD />
      
      {/* Interactive World Map */}
      <MapWrapper />
      
      {/* Vignette Overlay for Depth */}
      <div className="fixed inset-0 pointer-events-none bg-radial-vignette opacity-20" 
           style={{ background: 'radial-gradient(circle, transparent 40%, black 150%)' }} />
           
      {/* Instruction Toast Placeholder */}
      <div className="fixed top-6 right-6 z-[100] pointer-events-none">
        <div className="bg-white/80 backdrop-blur-md border-2 border-secondary p-4 rounded-2xl shadow-lg max-w-xs">
          <p className="text-xs font-bold text-secondary-foreground leading-tight">
            Use your mouse to drag and scroll to zoom. Explore the landmarks of AdventureNav!
          </p>
        </div>
      </div>
    </main>
  );
}
