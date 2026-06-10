import React, { useState } from "react";
import { CheckCircle2, XCircle, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function TestCard({ questionData }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Fallback parsing logic if the AI returns choices inside a single structured object
  const sampleQuiz = {
    question: questionData.question || "According to Ohm's Law, what happens to the current flowing through a conductor if the resistance is doubled while the voltage remains constant?",
    options: questionData.options || [
      { key: "A", text: "The current is doubled" },
      { key: "B", text: "The current is halved" },
      { key: "C", text: "The current quadruples" },
      { key: "D", text: "The current remains completely unchanged" }
    ],
    correctKey: questionData.correctKey || "B",
    modelAnswer: questionData.modelAnswer || "Since $I = \\frac{V}{R}$, current ($I$) is inversely proportional to resistance ($R$). Doubling the resistance cuts the current precisely in half."
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl my-4 animate-message">
      {/* CARD HEADER */}
      <div className="p-4 bg-gradient-to-r from-orange-500/10 to-amber-500/10 border-b border-slate-800 flex items-center gap-2">
        <HelpCircle size={16} className="text-orange-400" />
        <span className="text-[10px] font-extrabold tracking-wider uppercase text-orange-400">Past Exam Diagnostic Probe</span>
      </div>

      {/* QUESTION BODY */}
      <div className="p-5 text-xs text-slate-200 font-semibold leading-relaxed border-b border-slate-800/60 bg-slate-950/20">
        <ReactMarkdown>{sampleQuiz.question}</ReactMarkdown>
      </div>

      {/* OPTIONS MATRIX */}
      <div className="p-5 space-y-2">
        {sampleQuiz.options.map((opt) => {
          const isSelected = selectedOption === opt.key;
          const isCorrect = opt.key === sampleQuiz.correctKey;
          const basicStyle = "w-full flex items-center justify-between p-3.5 rounded-xl border text-left text-xs font-bold transition-all duration-200";
          
          let dynamicStyle = "bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200";
          if (selectedOption) {
            if (isSelected) {
              dynamicStyle = isCorrect 
                ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400 shadow-md shadow-emerald-500/5" 
                : "bg-red-500/10 border-red-500/40 text-red-400 shadow-md shadow-red-500/5";
            } else if (isCorrect) {
              // Highlight the correct answer if the student made a mistake
              dynamicStyle = "bg-emerald-500/5 border-emerald-500/20 text-emerald-500/80";
            }
          } else if (isSelected) {
            dynamicStyle = "bg-slate-800 border-slate-600 text-slate-100";
          }

          return (
            <button
              key={opt.key}
              disabled={selectedOption !== null}
              onClick={() => setSelectedOption(opt.key)}
              className={`${basicStyle} ${dynamicStyle}`}
            >
              <div className="flex items-center gap-3 pr-4">
                <span className={`w-6 h-6 rounded-lg flex items-center justify-center border font-extrabold text-[11px] ${
                  isSelected ? "bg-slate-950 border-transparent" : "bg-slate-900 border-slate-800"
                }`}>
                  {opt.key}
                </span>
                <span>{opt.text}</span>
              </div>
              
              {selectedOption && isSelected && (
                isCorrect ? <CheckCircle2 size={16} className="text-emerald-400 shrink-0" /> : <XCircle size={16} className="text-red-400 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* MODEL ANSWER EXPANSION ACCORDION */}
      {selectedOption && (
        <div className="border-t border-slate-800 bg-slate-950/60">
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="w-full flex items-center justify-between px-5 py-3.5 text-[10px] font-extrabold tracking-wider uppercase text-slate-400 hover:text-slate-200 transition-colors"
          >
            <span>Review Comprehensive Model Answer</span>
            {showExplanation ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          
          {showExplanation && (
            <div className="px-5 pb-5 pt-1 text-xs text-slate-400 leading-relaxed font-normal border-t border-slate-800/40 animate-message whitespace-pre-line">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800/80 shadow-inner">
                <ReactMarkdown>{sampleQuiz.modelAnswer}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}