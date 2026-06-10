import React, { useState } from "react";
import { 
  User, 
  BookOpen, 
  GraduationCap, 
  Calendar, 
  ChevronRight, 
  CornerDownRight,
  Sparkles,
  HelpCircle,
  Flame,
  ShieldCheck,
  Send,
  Compass,
  ChevronDown,
  Layers
} from "lucide-react";

export default function Workspace() {
  const studentName = "Ezz-eldin"; 

  // Selection states
  const [selectedGrade, setSelectedGrade] = useState("Grade 10");
  const [selectedSemester, setSelectedSemester] = useState("Semester 1");
  const [activeMode, setActiveMode] = useState("Explain Concept");
  const [activeSubject, setActiveSubject] = useState(null);
  const [chatInput, setChatInput] = useState("");
  
  // Custom picker menus dropdown toggle states
  const [showGradeMenu, setShowGradeMenu] = useState(false);
  const [showSemMenu, setShowSemMenu] = useState(false);

  const studyModes = [
    { name: "Explain Concept", icon: <HelpCircle size={14} /> },
    { name: "Solve Question", icon: <Flame size={14} /> },
    { name: "Exam Practice", icon: <ShieldCheck size={14} /> }
  ];

  const curriculumData = {
    "Grade 10": {
      "Semester 1": [
        { id: "g10s1-phys", name: "Physics", icon: "⚛️", color: "from-blue-500 to-indigo-600", bgLight: "bg-blue-50/50 text-blue-600 border-blue-100/40", chapters: ["Physical Quantities & Dimensional Analysis", "Linear Motion & Uniform Acceleration", "Newton's Laws of Motion"] },
        { id: "g10s1-chem", name: "Chemistry", icon: "🧪", color: "from-teal-400 to-emerald-600", bgLight: "bg-emerald-50/50 text-emerald-600 border-emerald-100/40", chapters: ["Chemistry & Measurement", "Quantitative Chemistry (The Mole)", "Acids, Bases, and Salts"] },
        { id: "g10s1-math", name: "Mathematics", icon: "📐", color: "from-violet-500 to-purple-600", bgLight: "bg-purple-50/50 text-purple-600 border-purple-100/40", chapters: ["Trigonometric Identities & Equations", "Matrices & Determinants", "Linear Programming"] }
      ],
      "Semester 2": [
        { id: "g10s2-phys", name: "Physics", icon: "⚛️", color: "from-blue-500 to-indigo-600", bgLight: "bg-blue-50/50 text-blue-600 border-blue-100/40", chapters: ["Circular Motion", "Work, Energy, and Momentum", "Universal Gravitation Law"] }
      ]
    },
    "Grade 11": {
      "Semester 1": [
        { id: "g11s1-phys", name: "Physics", icon: "⚙️", color: "from-blue-500 to-indigo-600", bgLight: "bg-blue-50/50 text-blue-600 border-blue-100/40", chapters: ["Wave Motion", "Light Properties", "Hydrodynamics"] }
      ]
    },
    "Grade 12": {
      "Semester 1": [
        { id: "g12s1-phys", name: "Physics", icon: "⚛️", color: "from-blue-500 to-indigo-600", bgLight: "bg-blue-50/50 text-blue-600 border-blue-100/40", chapters: ["Electric Current & Ohm's Law", "Magnetic Effect of Current", "Electromagnetic Induction"] }
      ]
    }
  };

  const currentSubjects = curriculumData[selectedGrade]?.[selectedSemester] || [];

  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] text-slate-900 font-sans antialiased overflow-hidden">
      
      {/* ─── 1. INNOVATIVE LEFT WORKSPACE CONTROL SIDEBAR ─── */}
      <aside className="w-85 h-full bg-white border-r border-slate-200/60 flex flex-col justify-between shrink-0 z-20 relative shadow-[1px_0_10px_rgba(15,23,42,0.02)]">
        
        {/* Student Branding Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/10 font-bold text-sm">
              {studentName[0]}
            </div>
            <div>
              <h2 className="text-xs font-bold text-slate-800 tracking-tight">{studentName} Fahmi</h2>
              <p className="text-[10px] text-slate-400 font-medium">Premium Student Space</p>
            </div>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-xs shadow-emerald-500/40" />
        </div>

        {/* Core Controls Stack */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          
          {/* Custom Track Selector Buttons (Replaces Ugly Native Select Tags) */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-0.5">Syllabus Parameters</span>
            <div className="grid grid-cols-2 gap-2">
              
              {/* Custom Grade Trigger */}
              <div className="relative">
                <button 
                  onClick={() => { setShowGradeMenu(!showGradeMenu); setShowSemMenu(false); }}
                  className="w-full flex items-center justify-between gap-1 px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100/70 text-left text-xs font-bold text-slate-700 transition-all cursor-pointer"
                >
                  <span className="truncate">{selectedGrade}</span>
                  <ChevronDown size={14} className="text-slate-400 shrink-0" />
                </button>
                {showGradeMenu && (
                  <div className="absolute top-12 left-0 w-44 bg-white border border-slate-200 rounded-xl shadow-xl p-1 z-30 animate-fadeIn">
                    {["Grade 10", "Grade 11", "Grade 12"].map((g) => (
                      <button 
                        key={g} 
                        onClick={() => { setSelectedGrade(g); setActiveSubject(null); setShowGradeMenu(false); }}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors cursor-pointer"
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Custom Semester Trigger */}
              <div className="relative">
                <button 
                  onClick={() => { setShowSemMenu(!showSemMenu); setShowGradeMenu(false); }}
                  className="w-full flex items-center justify-between gap-1 px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100/70 text-left text-xs font-bold text-slate-700 transition-all cursor-pointer"
                >
                  <span className="truncate">Term {selectedSemester.split(" ")[1]}</span>
                  <ChevronDown size={14} className="text-slate-400 shrink-0" />
                </button>
                {showSemMenu && (
                  <div className="absolute top-12 right-0 w-36 bg-white border border-slate-200 rounded-xl shadow-xl p-1 z-30 animate-fadeIn">
                    {["Semester 1", "Semester 2"].map((s) => (
                      <button 
                        key={s} 
                        onClick={() => { setSelectedSemester(s); setActiveSubject(null); setShowSemMenu(false); }}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors cursor-pointer"
                      >
                        Term {s.split(" ")[1]}
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Available Subject Cards Array */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-0.5">Available Courses</span>
            <div className="space-y-1.5">
              {currentSubjects.map((sub) => {
                const isSelected = activeSubject?.id === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setActiveSubject(sub)}
                    className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all duration-200 cursor-pointer group ${
                      isSelected
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-600 text-white shadow-md shadow-blue-600/10"
                        : "bg-white border-slate-200/70 text-slate-700 hover:border-slate-300 hover:bg-slate-50/50"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-2xs font-bold text-base transition-colors ${
                        isSelected ? "bg-white/10 text-white" : sub.bgLight
                      }`}>
                        {sub.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold truncate tracking-tight">{sub.name}</p>
                        <p className={`text-[10px] font-medium mt-0.5 ${isSelected ? "text-blue-200" : "text-slate-400"}`}>
                          {sub.chapters.length} syllabus modules
                        </p>
                      </div>
                    </div>
                    <ChevronRight size={14} className={`shrink-0 transition-all ${
                      isSelected ? "text-white translate-x-0.5" : "text-slate-400 group-hover:translate-x-0.5"
                    }`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Elegant Chapter Timeline List */}
          {activeSubject && (
            <div className="space-y-3 pt-2 animate-fadeIn">
              <div className="flex items-center gap-1.5 px-0.5">
                <Layers size={12} className="text-slate-400" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Syllabus Breakdown</span>
              </div>
              
              <div className="space-y-2 border-l border-slate-100 pl-3 ml-2 relative">
                {activeSubject.chapters.map((chap, idx) => (
                  <div key={idx} className="relative group cursor-pointer">
                    {/* Visual custom dot track line node */}
                    <div className="absolute -left-[16.5px] top-1.5 w-2 h-2 rounded-full border border-white bg-slate-200 group-hover:bg-blue-500 transition-colors" />
                    <p className="text-[11px] font-semibold text-slate-500 group-hover:text-slate-900 leading-tight tracking-tight transition-colors pt-0.5">
                      {chap}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer Info Block */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center flex items-center justify-center gap-1.5">
          <BookOpen size={11} className="text-slate-400" />
          <span>Curriculum Locked</span>
        </div>
      </aside>

      {/* ─── 2. CENTRAL FOCUS WORKSPACE CANVAS ─── */}
      <section className="flex-1 h-full flex flex-col min-w-0">
        
        {/* Top Header Panel: STRICTLY the centralized Segmented Mode Toggles */}
        <header className="h-16 border-b border-slate-200/60 bg-white px-6 flex items-center shrink-0 relative z-10">
          
          {/* Secondary Context Tracking Indicator Left side */}
          <div className="text-xs font-bold text-slate-400 hidden lg:block">
            {activeSubject ? `${selectedGrade} • ${activeSubject.name}` : "Workspace Scope Idle"}
          </div>

          {/* Mode Selector Panel (Cleaned up, perfectly middle centered) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/30 shadow-3xs">
            {studyModes.map((mode) => {
              const isSelected = activeMode === mode.name;
              return (
                <button
                  key={mode.name}
                  onClick={() => setActiveMode(mode.name)}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer select-none ${
                    isSelected 
                      ? "bg-white text-blue-600 shadow-xs font-extrabold" 
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {mode.icon}
                  <span>{mode.name}</span>
                </button>
              );
            })}
          </div>

          {/* Top Right Context Badge */}
          <div className="ml-auto flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 font-bold text-[10px] tracking-wide uppercase">
            <Sparkles size={11} className="text-blue-500 fill-blue-500/10" />
            <span>Active: {activeMode.split(" ")[0]}</span>
          </div>
        </header>

        {/* Elegant Chat Stage / Main Workspace Canvas */}
        <main className="flex-1 overflow-y-auto p-8 flex flex-col justify-center items-center bg-[#FAFBFC]">
          {activeSubject ? (
            <div className="w-full max-w-2xl flex-1 flex flex-col justify-center items-center text-center space-y-5 animate-fadeIn">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${activeSubject.color} text-white flex items-center justify-center text-2xl shadow-lg shadow-blue-500/5 select-none`}>
                {activeSubject.icon}
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-black text-slate-800 tracking-tight">
                  {activeSubject.name} Workspace Active
                </h3>
                <p className="text-xs text-slate-400 font-medium max-w-sm mx-auto leading-relaxed">
                  Ask any question from your curriculum. The AI engine is loaded with your active chapters under <span className="font-bold text-blue-600">{activeMode}</span> variables.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4 max-w-xs animate-fadeIn">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center mx-auto text-blue-500">
                <Compass size={20} className="animate-spin-slow" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">Initialize Workspace</h4>
                <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                  Select a school course from your customized left sidebar roadmap to automatically fetch chapters and generate context.
                </p>
              </div>
            </div>
          )}
        </main>

        {/* Minimalist Input Form Dock */}
        <footer className="p-5 border-t border-slate-200/60 bg-white shrink-0">
          <div className="max-w-3xl mx-auto relative flex items-center">
            <input 
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder={
                activeSubject 
                  ? `Inquire about ${activeSubject.name} chapters (${activeMode})...`
                  : "Please choose a subject track on the left dashboard sidebar..."
              }
              disabled={!activeSubject}
              className="w-full pl-4 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed text-slate-800 placeholder-slate-400"
            />
            <button 
              disabled={!activeSubject || !chatInput.trim()}
              className="absolute right-2.5 p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-30 disabled:hover:bg-blue-600 transition-all cursor-pointer shadow-sm shadow-blue-500/10"
            >
              <Send size={13} />
            </button>
          </div>
        </footer>

      </section>

    </div>
  );
}