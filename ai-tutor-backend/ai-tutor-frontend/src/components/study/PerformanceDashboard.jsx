import React from "react";
import { BarChart3, Clock, CheckCircle2, AlertTriangle, ArrowUpRight, Target, Lightbulb } from "lucide-react";

export default function PerformanceDashboard({ subject }) {
  // Mock metrics that visually scale beautifully in our theme
  const stats = [
    { title: "Total Study Time", value: "14.5 hrs", change: "+2.3 hrs this week", icon: Clock, color: "text-teal-400" },
    { title: "Concepts Mastered", value: "28 / 34", change: "82% Syllabus Completion", icon: CheckCircle2, color: "text-cyan-400" },
    { title: "Quiz Accuracy", value: "76%", change: "+4% from last mock exam", icon: Target, color: "text-orange-400" },
  ];

  const subFocusData = {
    Physics: { weakTopic: "Quantum Mechanics & Photoelectric Effect", hours: "4.2 hrs", recommendedAction: "Practice 5 Socratic questions regarding photons to clear basic conceptual gaps." },
    Mathematics: { weakTopic: "Calculus & Integration Techniques", hours: "3.8 hrs", recommendedAction: "Review integration by parts using the 'Egyptian Teacher' analogy mode for memory retention." },
    History: { weakTopic: "1919 Revolution Timeline details", hours: "2.1 hrs", recommendedAction: "Flip through your active recall cards twice before starting your next core chat session." },
    General: { weakTopic: "Mixed Curriculum Assessment Blocks", hours: "14.5 hrs", recommendedAction: "Select an active subject from your sidebar panel to see specialized topic stress metrics." },
  };

  const focus = subFocusData[subject] || subFocusData["General"];

  return (
    <div className="w-full max-w-5xl mx-auto p-6 space-y-8 animate-message overflow-y-auto max-h-[calc(100vh-4rem)] scrollbar-thin">
      
      {/* HEADER STATEMENT */}
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-100 flex items-center gap-2">
          <BarChart3 className="text-teal-400" size={24} /> 
          <span>Academic Command Center • <span className="text-teal-400">{subject}</span></span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">Real-time performance evaluation logs, revision metrics, and automated workload distributions.</p>
      </div>

      {/* CORE GRID METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {stats.map((stat, i) => {
          const IconComponent = stat.icon;
          return (
            <div key={i} className="p-5 bg-slate-900 border border-slate-800/80 rounded-2xl relative overflow-hidden shadow-lg group hover:border-slate-700 transition-all">
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-slate-950/40 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
              <div className="flex justify-between items-start">
                <span className="text-xs font-semibold text-slate-400 tracking-wide">{stat.title}</span>
                <IconComponent size={18} className={stat.color} />
              </div>
              <div className="mt-4 space-y-1 relative z-10">
                <div className="text-3xl font-black text-slate-100 tracking-tight">{stat.value}</div>
                <div className="text-[10px] text-teal-400 font-medium flex items-center gap-1">
                  <ArrowUpRight size={10} /> {stat.change}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* DETAILED DIAGNOSTICS & RECOMMENDED SCHEDULE SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* WEAK SPOT DETECTOR CARD */}
        <div className="lg:col-span-2 p-6 bg-slate-900 border border-slate-800/80 rounded-2xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-400">
              <AlertTriangle size={14} />
              <span>Priority Improvement Zone</span>
            </div>
            <h3 className="text-lg font-bold text-slate-200 tracking-tight">
              {focus.weakTopic}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Based on your ongoing chat conversations and flashcard responses, our model flags this area as requiring immediate revision to preserve high score probabilities on formal exam tracks.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-3 mt-4">
            <Lightbulb size={16} className="text-teal-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-[11px] font-bold uppercase tracking-wide text-slate-300">AI Suggested Next Action:</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">{focus.recommendedAction}</p>
            </div>
          </div>
        </div>

        {/* MOCK RETENTION PIPELINE CARD */}
        <div className="p-6 bg-slate-900 border border-slate-800/80 rounded-2xl flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Weekly Target Allocation</h3>
            <p className="text-[10px] text-slate-500">Track current cycle milestones against recommended hours.</p>
          </div>

          <div className="space-y-3 py-2">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-300">Core Subject Depth ({focus.hours})</span>
                <span className="text-teal-400 font-bold">75%</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full border border-slate-800 overflow-hidden">
                <div className="bg-teal-500 h-full w-[75%] rounded-full"></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-300">Active Self-Quizzing</span>
                <span className="text-cyan-400 font-bold">40%</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full border border-slate-800 overflow-hidden">
                <div className="bg-cyan-500 h-full w-[40%] rounded-full"></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-300">Exam Pitfall Review</span>
                <span className="text-orange-400 font-bold">90%</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full border border-slate-800 overflow-hidden">
                <div className="bg-orange-500 h-full w-[90%] rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-center font-bold text-slate-500 bg-slate-950/50 py-2 border border-slate-800 rounded-xl">
            Syllabus Calibration Sync Complete
          </div>
        </div>

      </div>

    </div>
  );
}