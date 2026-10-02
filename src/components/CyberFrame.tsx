import React from 'react';

interface CyberFrameProps {
  children: React.ReactNode;
}

export const CyberFrame: React.FC<CyberFrameProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      
      {/* Background Cyber Image Layer */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-50 pointer-events-none mix-blend-screen"
        style={{ backgroundImage: `url('/assets/cyber-frame.png')` }}
      />

      {/* Sci-Fi Grid Pattern Overlay */}
      <div className="fixed inset-0 z-0 opacity-25 pointer-events-none bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Futuristic HUD Glowing Border Wrapper around viewport */}
      <div className="relative z-10 min-h-screen p-2 sm:p-4 md:p-6 flex flex-col">
        
        {/* Outer Sci-Fi Circuit Border Container */}
        <div className="relative flex-1 rounded-3xl border-2 border-cyan-500/60 shadow-[0_0_35px_rgba(6,182,212,0.4),inset_0_0_35px_rgba(6,182,212,0.15)] bg-slate-950/90 backdrop-blur-2xl overflow-hidden flex flex-col">
          
          {/* Top Cyber HUD Header Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 sm:w-96 h-3 bg-cyan-500/30 border-b border-x border-cyan-400/80 rounded-b-xl shadow-[0_0_15px_rgba(6,182,212,0.8)] pointer-events-none flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-300" />
            <span className="w-16 h-0.5 bg-cyan-400/80 rounded-full" />
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-300" />
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          </div>

          {/* Corner Sci-Fi Tech Brackets */}
          {/* Top-Left Corner */}
          <div className="absolute top-0 left-0 w-12 h-12 pointer-events-none z-20">
            <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-cyan-400 shadow-[0_0_10px_#06b6d4]" />
            <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
          </div>

          {/* Top-Right Corner */}
          <div className="absolute top-0 right-0 w-12 h-12 pointer-events-none z-20">
            <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-cyan-400 shadow-[0_0_10px_#06b6d4]" />
            <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
          </div>

          {/* Bottom-Left Corner */}
          <div className="absolute bottom-0 left-0 w-12 h-12 pointer-events-none z-20">
            <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-cyan-400 shadow-[0_0_10px_#06b6d4]" />
            <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
          </div>

          {/* Bottom-Right Corner */}
          <div className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none z-20">
            <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-cyan-400 shadow-[0_0_10px_#06b6d4]" />
            <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
          </div>

          {/* Inner Dashboard Content */}
          <div className="relative z-10 flex-1 flex flex-col p-2 sm:p-4 md:p-5">
            {children}
          </div>

        </div>

      </div>

    </div>
  );
};
