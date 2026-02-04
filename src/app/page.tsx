
import MapWrapper from "@/components/MapWrapper";
import HUD from "@/components/HUD";

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-[#fdf6e3] select-none">
      {/* Heads-up Display Overlay */}
      <HUD />
      
      {/* Interactive World Map */}
      <MapWrapper />
      
      {/* Subtle Vignette Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[80]" 
           style={{ background: 'radial-gradient(circle, transparent 50%, rgba(0,0,0,0.15) 150%)' }} />
    </main>
  );
}
