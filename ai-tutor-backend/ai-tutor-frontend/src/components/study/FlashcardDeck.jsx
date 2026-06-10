import React, { useState } from "react";
import { HelpCircle, RefreshCw, CheckCircle2, XCircle, Sparkles } from "lucide-react";

export default function FlashcardDeck({ subject }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const sampleCards = [
    { 
      question: "What is the physical significance of the work function in Physics?", 
      answer: "It is the minimum thermodynamic energy required to remove an electron from a solid surface to a point immediately outside the solid surface in a vacuum." 
    },
    { 
      question: "How do you distinguish between an addition polymer and a condensation polymer?", 
      answer: "Addition polymerization forms a single polymer product without loss of molecules. Condensation polymerization links monomers while eliminating small byproducts like H2O or HCl." 
    },
    { 
      question: "Explain the main historical catalyst behind the 1919 Egyptian Revolution.", 
      answer: "The immediate trigger was the British arrest and exile of nationalist leader Saad Zaghloul and his companions, which ignited widespread civil disobedience across Egypt." 
    }
  ];

  const currentCard = sampleCards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % sampleCards.length);
    }, 150);
  };

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl max-w-xl mx-auto w-full space-y-6 shadow-xl relative overflow-hidden animate-message">
      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-2xl pointer-events-none"></div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider">
          <Sparkles size={14} />
          <span>AI Active Recall Deck • {subject}</span>
        </div>
        <span className="text-[11px] font-bold text-slate-500">
          {currentIndex + 1} of {sampleCards.length}
        </span>
      </div>

      {/* 3D FLIP CARD CANVAS ENGINE */}
      <div 
        onClick={() => setIsFlipped(!isFlipped)}
        className="h-52 w-full cursor-pointer relative perspective"
      >
        <div className={`w-full h-full duration-500 transform-style preserve-3d relative ${isFlipped ? "rotate-y-180" : ""}`}>
          
          {/* CARD FRONT PANEL */}
          <div className="absolute inset-0 backface-hidden bg-slate-950 border border-slate-800/80 rounded-xl p-5 flex flex-col justify-between shadow-inner">
            <div className="text-slate-400 text-xs font-medium flex items-center gap-1.5">
              <HelpCircle size={12} className="text-teal-400" /> Question Prompt
            </div>
            <p className="text-md font-bold text-slate-200 text-center leading-relaxed px-2">
              {currentCard.question}
            </p>
            <div className="text-[10px] text-center font-bold text-slate-500 tracking-wide flex items-center justify-center gap-1.5 uppercase">
              <RefreshCw size={10} className="animate-spin-slow" /> Click to reveal breakdown
            </div>
          </div>

          {/* CARD BACK PANEL */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-slate-950 border border-teal-500/20 rounded-xl p-5 flex flex-col justify-between shadow-inner">
            <div className="text-teal-400 text-xs font-bold flex items-center gap-1.5">
              <CheckCircle2 size={12} /> Core Explanation Answer
            </div>
            <p className="text-sm font-medium text-slate-300 leading-relaxed overflow-y-auto max-h-32 pr-1 scrollbar-thin">
              {currentCard.answer}
            </p>
            <div className="text-[10px] text-center font-bold text-slate-500 uppercase tracking-wide">
              Click to flip back
            </div>
          </div>

        </div>
      </div>

      {/* EVALUATION INTERACTIVE UTILITIES */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <button 
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className="flex-1 py-2.5 rounded-xl border border-slate-800 hover:border-red-500/20 bg-slate-950/40 text-slate-400 hover:text-red-400 font-semibold text-xs transition-all flex items-center justify-center gap-2"
        >
          <XCircle size={14} /> I missed it
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className="flex-1 py-2.5 rounded-xl border border-slate-800 hover:border-teal-500/20 bg-slate-950/40 text-slate-400 hover:text-teal-400 font-semibold text-xs transition-all flex items-center justify-center gap-2"
        >
          <CheckCircle2 size={14} /> I mastered this
        </button>
      </div>
    </div>
  );
}