import React, { useState } from "react";
import { BookOpen, HelpCircle, GraduationCap, Layers, Sparkles, Lock, Flame, Menu, ChevronRight, ChevronLeft } from "lucide-react";

export default function DashboardLayout({ 
  children, 
  currentMode, 
  setCurrentMode, 
  activeScope, 
  setActiveScope,
  activeCard 
}) {
  const subjects = ["Physics", "Chemistry", "Arabic Language"];
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);

  return (
    <div className="fixed inset-0 bg-slate-100 font-sans text-slate-800 flex overflow-hidden antialiased">
      
      {/* LEFT SIDEBAR */}
      <aside className={`bg-white border-r border-slate-200/80 flex flex-col justify-between shrink-0 z-20 transition-all duration-300 ease-in-out shadow-sm ${
        leftCollapsed ? "w-0 -translate-x-full opacity-0" : "w-64 translate-x-0 opacity-100"
      }`}>
        <div className="p-5 space-y-6 overflow-y-auto flex-1">
          
          {/* BRANDING LOGO */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/10">
                <GraduationCap size={18} />
              </div>
              <div>
                <h1 className="text-sm font-bold tracking-tight text-slate-900 leading-none">EduAI Core</h1>
                <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider mt-1">Thanaweya Amma</p>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/60 px-2 py-1 rounded-lg text-amber-700 text-[10px] font-bold shadow-xs">
              <Flame size={12} className="fill-amber-500/20 text-amber-500" />
              <span>3 DAYS</span>
            </div>
          </div>

          {/* SECTION A: STUDY MODES */}
          <div className="space-y-1">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-2 mb-2">Core Study Modes</h3>
            
            <button
              onClick={() => setCurrentMode("explain")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                currentMode === "explain" 
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/10 font-bold" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <BookOpen size={14} />
              <span>💡 Explain Concept</span>
            </button>

            <button
              onClick={() => setCurrentMode("quick")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                currentMode === "quick" 
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/10 font-bold" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <HelpCircle size={14} />
              <span>⚡ Answer Question</span>
            </button>
          </div>

          {/* SECTION B: PREMIUM MODES */}
          <div className="space-y-1 pt-2">
            <div className="flex items-center justify-between px-2 mb-2">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Premium Toolsets</h3>
              <span className="text-[9px] bg-amber-500 text-slate-950 font-black px-1.5 py-0.5 rounded-md tracking-wider">250 EGP</span>
            </div>
            
            <button
              onClick={() => setCurrentMode("exam")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                currentMode === "exam"
                  ? "bg-blue-50 text-blue-700 border border-blue-100 font-bold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <Layers size={14} className="text-slate-400" />
                <span>🎯 Exam Simulator</span>
              </div>
              <Lock size={12} className="text-amber-500 fill-amber-500/10" />
            </button>

            <button
              onClick={() => alert("Premium Upgrade Required")}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Sparkles size={14} className="text-slate-400" />
                <span>🎴 Active Recall Decks</span>
              </div>
              <Lock size={12} className="text-amber-500 fill-amber-500/10" />
            </button>
          </div>

          {/* SECTION C: CURRICULUM SELECTION */}
          <div className="space-y-2 pt-4 border-t border-slate-100">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-2">Active Subject</h3>
            <div className="space-y-1">
              {subjects.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setActiveScope(prev => ({ ...prev, subject: sub }))}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    activeScope.subject === sub 
                      ? "text-blue-600 bg-blue-50/60 font-bold border border-blue-100/50" 
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* PROFILE BOTTOM TIER */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
          <span className="text-slate-500">Tier: <span className="text-slate-800 font-extrabold uppercase text-[11px]">Free Tier</span></span>
          <span className="text-blue-600 hover:text-blue-700 transition-colors cursor-pointer font-extrabold">Upgrade →</span>
        </div>
      </aside>

      {/* CENTER STAGE CONTAINER */}
      <main className="flex-1 relative bg-slate-50 flex flex-col min-w-0 m-2 sm:m-3 rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden">
        
        {/* HEADER TOOLBAR */}
        <header className="h-14 border-b border-slate-200/60 bg-white/80 backdrop-blur-md px-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setLeftCollapsed(!leftCollapsed)}
              className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-all cursor-pointer border border-slate-200/60 shadow-xs bg-white"
              title="Toggle Left Navigation Menu"
            >
              <Menu size={15} />
            </button>
            <div className="text-xs font-bold text-slate-400">
              Workspace Scope: <span className="text-blue-600 font-black">{activeScope.subject}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-[10px] font-bold tracking-wide">
              <span className="text-slate-400 uppercase">Daily Balance:</span>
              <span className="text-blue-600 font-black">7 / 10 Queries Left</span>
            </div>
            
            {activeCard.visible && (
              <button 
                onClick={() => setRightCollapsed(!rightCollapsed)}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-all cursor-pointer border border-slate-200/60 bg-white shadow-xs"
                title="Toggle Curriculum Deck Panel"
              >
                {rightCollapsed ? <ChevronLeft size={15} /> : <ChevronRight size={15} />}
              </button>
            )}
          </div>
        </header>

        {/* INTERNAL VIEW CANVAS */}
        <div className="flex-1 relative bg-white overflow-hidden">
          {children}
        </div>
      </main>

      {/* RIGHT FLOATING REFERENCE CARD SIDEBAR */}
      {activeCard.visible && (
        <aside className={`bg-white border-l border-slate-200/80 p-6 flex flex-col space-y-4 shrink-0 overflow-y-auto h-full transition-all duration-300 ease-in-out ${
          rightCollapsed ? "w-0 opacity-0 pointer-events-none border-l-0" : "w-80 opacity-100"
        }`}>
          <div className="border-b border-slate-100 pb-3">
            <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md">
              Live Curriculum Card Summary
            </span>
            <h2 className="text-sm font-bold text-slate-900 tracking-tight mt-2">{activeCard.title}</h2>
          </div>
          
          <div className="text-xs text-slate-600 leading-relaxed font-normal whitespace-pre-wrap flex-1">
            {activeCard.details}
          </div>

          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
            {activeCard.tags?.map((tag, i) => (
              <span key={i} className="text-[9px] bg-slate-50 border border-slate-200/60 text-slate-600 font-bold px-2.5 py-1 rounded-lg shadow-2xs">
                {tag}
              </span>
            ))}
          </div>
        </aside>
      )}

    </div>
  );
}