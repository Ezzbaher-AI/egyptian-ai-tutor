import React, { useState } from "react";
import { 
  GraduationCap, 
  ArrowRight, 
  BookOpen, 
  ShieldCheck, 
  Flame, 
  HelpCircle,
  Search,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Award,
  Globe
} from "lucide-react";

export default function LandingPage({ onEnterClassroom }) {
  const [rememberMe, setRememberMe] = useState(true);

  const learningModes = [
    {
      title: "Explain Concept",
      desc: "Confused by a lesson? We'll break it down into simple, easy-to-understand parts.",
      icon: <HelpCircle className="text-blue-600" size={22} />,
      points: ["Clear analogies", "Curriculum aligned", "Interactive check-ins"],
      isDark: false
    },
    {
      title: "Solve Question",
      desc: "Stuck on homework? We don't just give the answer; we guide you step-by-step.",
      icon: <Flame className="text-white" size={22} />,
      points: ["Step-by-step logic", "Identify common mistakes", "Similar practice problems"],
      isDark: true // Matches the dark accented center card style from your layout
    },
    {
      title: "Exam Practice",
      desc: "Test your knowledge with mock exams and past papers formatted for your grade.",
      icon: <ShieldCheck className="text-blue-600" size={22} />,
      points: ["Timed sessions", "Detailed feedback", "Score prediction"],
      isDark: false
    }
  ];

  const subjects = [
    { name: "Arabic", icon: "📝", bg: "bg-blue-50/60 text-blue-600 border-blue-100" },
    { name: "Math", icon: "🔢", bg: "bg-indigo-50/60 text-indigo-600 border-indigo-100" },
    { name: "Science", icon: "🧬", bg: "bg-emerald-50/60 text-emerald-600 border-emerald-100" },
    { name: "Social Studies", icon: "🌍", bg: "bg-sky-50/60 text-sky-600 border-sky-100" },
    { name: "English", icon: "📚", bg: "bg-violet-50/60 text-violet-600 border-violet-100" },
    { name: "Religious Ed.", icon: "🕌", bg: "bg-teal-50/60 text-teal-600 border-teal-100" }
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 selection:bg-blue-100 selection:text-blue-900 font-sans antialiased">
      
      {/* ─── 1. NAVBAR (Clean White & Blue Style) ─── */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100/80 px-6 md:px-16 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Logo - Strict Blue & Deep Slate */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-600/10">
              <GraduationCap size={20} className="text-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900">
              Edu<span className="text-blue-600">AI</span>
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-500">
            <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How it Works</a>
            <a href="#learning-modes" className="hover:text-blue-600 transition-colors">Learning Modes</a>
            <a href="#subjects" className="hover:text-blue-600 transition-colors">Subjects</a>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onEnterClassroom(rememberMe)}
            className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors"
          >
            Log in
          </button>
          <button 
            onClick={() => onEnterClassroom(rememberMe)}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-all duration-200 shadow-sm shadow-blue-600/10 cursor-pointer"
          >
            <span>Get Started</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </nav>

      {/* ─── 2. ASYMMETRIC HERO SECTION ─── */}
      <header className="max-w-7xl mx-auto px-6 md:px-16 pt-12 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Hero Text Content */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold tracking-wide">
            <Sparkles size={13} className="text-blue-600 fill-blue-600/10" />
            <span>For Egyptian National Curriculum Students (Grades 1–12)</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
            Your personal <span className="text-blue-600 italic font-serif font-normal">AI tutor</span> <br />
            for every subject.
          </h1>
          
          <p className="text-base md:text-lg text-slate-500 max-w-xl leading-relaxed font-medium">
            Master the Egyptian curriculum with step-by-step guidance. Whether you're stuck on a math problem or preparing for finals, EduAI is here to explain, solve, and practice with you.
          </p>

          {/* Action Buttons & Remember Control */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onEnterClassroom(rememberMe)}
                className="px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-blue-600/10 flex items-center gap-2 cursor-pointer group"
              >
                <span>Start Learning Free</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </button>
              
              <button
                onClick={() => document.getElementById('subjects').scrollIntoView({ behavior: 'smooth' })}
                className="px-7 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm rounded-xl border border-slate-200 transition-all cursor-pointer"
              >
                Explore Subjects
              </button>
            </div>

            <label className="flex items-center gap-2 text-xs font-semibold text-slate-400 cursor-pointer select-none hover:text-slate-500 transition-colors pt-1">
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 accent-blue-600 rounded border-slate-200 bg-slate-50"
              />
              <span>Keep me signed in directly to the workspace</span>
            </label>
          </div>
        </div>

        {/* Right Column: Dynamic Framed Workspace Visual */}
        <div className="lg:col-span-6 relative flex justify-center">
          <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl border border-slate-200/60 bg-gradient-to-br from-blue-50 to-indigo-50/30 overflow-hidden shadow-xl p-4 group">
            
            {/* Base Image Mockup Container */}
            <div className="w-full h-full rounded-2xl bg-white border border-slate-100 shadow-xs relative overflow-hidden flex flex-col justify-center items-center">
              {/* Inner graphic background layout */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-90 transition-transform duration-500 group-hover:scale-101" 
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80')` }} 
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/10 to-transparent" />
            </div>

            {/* Context Floating Pill Badge: Matches the clean popup badge in your layout */}
            <div className="absolute top-1/3 -left-4 bg-white/95 backdrop-blur-md border border-slate-100 px-4 py-3 rounded-2xl flex items-center gap-3 shadow-lg animate-pulse-slow">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 size={16} className="stroke-[2.5]" />
              </div>
              <div className="text-left">
                <p className="text-xs font-extrabold text-slate-900">Math Problem Solved!</p>
                <p className="text-[10px] text-slate-400 font-bold mt-0.5">Grade 9 Algebra</p>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* ─── 3. HOW IT WORKS SECTION ─── */}
      <section id="how-it-works" className="border-t border-slate-100/80 bg-white py-24 px-6 md:px-16">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Simple Process</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">How EduAI Works</h2>
            <p className="text-base text-slate-500 font-medium">Your journey to better grades in three simple steps.</p>
          </div>

          {/* Clean connected process cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="bg-[#FAFBFD] border border-slate-100 rounded-3xl p-8 text-center space-y-4 shadow-2xs">
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 shadow-2xs flex items-center justify-center mx-auto text-blue-600">
                <BookOpen size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900">1. Pick a Mode</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Choose whether you want to learn a new concept, solve a specific question, or practice for an exam.
              </p>
            </div>

            <div className="bg-[#FAFBFD] border border-slate-100 rounded-3xl p-8 text-center space-y-4 shadow-2xs">
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 shadow-2xs flex items-center justify-center mx-auto text-blue-600">
                <Search size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900">2. Ask Your Question</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Type or take a picture of your question from the national curriculum textbook.
              </p>
            </div>

            <div className="bg-[#FAFBFD] border border-slate-100 rounded-3xl p-8 text-center space-y-4 shadow-2xs">
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 shadow-2xs flex items-center justify-center mx-auto text-blue-600">
                <Award size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900">3. Get Step-by-Step Help</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Receive clear, structured markdown explanations tailored to your exact grade level.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. THREE WAYS TO MASTER SUBJECTS SECTION ─── */}
      <section id="learning-modes" className="border-t border-slate-100/80 bg-[#FAFBFD]/50 py-24 px-6 md:px-16">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="space-y-2 text-left md:text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Tailored Learning</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Three ways to master your subjects</h2>
            <p className="text-base text-slate-500 font-medium">EduAI adapts to what you need right now.</p>
          </div>

          {/* Cards Block Grid: Replicates the unique look from image_c67e4f.png */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {learningModes.map((mode, index) => (
              <div 
                key={index} 
                className={`rounded-3xl border transition-all duration-300 p-8 flex flex-col justify-between shadow-2xs border-t-4 ${
                  mode.isDark 
                    ? "bg-[#0F172A] border-[#0F172A] border-t-blue-500 text-white shadow-xl md:scale-102" 
                    : "bg-white border-slate-100 border-t-blue-600 text-slate-900"
                }`}
              >
                <div className="space-y-5">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-2xs border ${
                    mode.isDark ? "bg-slate-800 border-slate-700" : "bg-blue-50/50 border-blue-100/50"
                  }`}>
                    {mode.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold tracking-tight">{mode.title}</h3>
                    <p className={`text-xs leading-relaxed font-medium ${mode.isDark ? "text-slate-400" : "text-slate-500"}`}>
                      {mode.desc}
                    </p>
                  </div>
                </div>

                <ul className="space-y-3 pt-6 mt-6 border-t border-slate-100/10">
                  {mode.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-center gap-2.5 text-xs font-semibold">
                      <CheckCircle2 size={14} className={mode.isDark ? "text-blue-400" : "text-blue-600"} />
                      <span className={mode.isDark ? "text-slate-300" : "text-slate-600"}>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. CURRICULUM COVERAGE SECTOR ─── */}
      <section id="subjects" className="border-t border-slate-100/80 bg-white py-24 px-6 md:px-16">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Complete Curriculum Coverage</h2>
            <p className="text-sm md:text-base text-slate-500 font-medium">Supporting Grades 1–12 across all core subjects in the Egyptian national curriculum.</p>
          </div>

          {/* Styled subtle color blocks matching image_c67df6.png */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {subjects.map((sub, idx) => (
              <div 
                key={idx} 
                className={`p-5 rounded-2xl border text-center font-bold text-sm flex flex-col items-center justify-center gap-3 transition-transform hover:-translate-y-0.5 cursor-pointer shadow-3xs ${sub.bg}`}
              >
                <span className="text-2xl select-none">{sub.icon}</span>
                <span className="tracking-tight text-slate-800">{sub.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. DARK CONTRAST CTA BANNER FOOTER ─── */}
      <footer className="mx-6 md:mx-16 mb-12 rounded-3xl bg-[#0F172A] text-white py-20 px-6 text-center relative overflow-hidden shadow-xl">
        <div className="max-w-xl mx-auto space-y-6 relative z-10">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">Ready to improve your grades?</h2>
          <p className="text-sm md:text-base text-slate-400 font-medium leading-relaxed">
            Join thousands of Egyptian students mastering their curriculum with premium, custom-grounded AI tutoring.
          </p>
          
          <div className="pt-2">
            <button 
              onClick={() => onEnterClassroom(rememberMe)}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-blue-600/20 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Get Started for Free</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="text-[11px] font-semibold text-slate-500 flex items-center justify-center gap-4 pt-4">
            <span>No credit card required</span>
            <span>•</span>
            <span>250 EGP Premium Tier Available</span>
          </div>
        </div>

        {/* Subtle branding and legal row */}
        <div className="max-w-5xl mx-auto mt-16 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center">
              <GraduationCap size={14} className="text-white" />
            </div>
            <span className="font-black text-slate-400 tracking-tight">EduAI</span>
          </div>
          <p>© {new Date().getFullYear()} EduAI. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}