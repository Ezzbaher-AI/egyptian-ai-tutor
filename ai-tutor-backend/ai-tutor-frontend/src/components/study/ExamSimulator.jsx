import React, { useState, useEffect } from "react";
import { Timer, CheckCircle, AlertTriangle, ArrowLeft, ArrowRight, XCircle, Clock, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default function ExamSimulator({ subject, onExit }) {
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 Minutes
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isTimeOut, setIsTimeOut] = useState(false);
  const [score, setScore] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // Dynamic API curriculum ingestion hook
  useEffect(() => {
    async function loadExamContent() {
      try {
        setLoading(true);
        setFetchError(null);
        const response = await fetch(`http://localhost:8000/exam/questions?subject=${encodeURIComponent(subject)}`);
        if (!response.ok) throw new Error("Could not fetch the targeted exam sheet database reference.");
        const data = await response.json();
        setQuestions(data);
      } catch (err) {
        setFetchError(err.message || "Connection refused by server tier.");
      } finally {
        setLoading(false);
      }
    }
    loadExamContent();
  }, [subject]);

  const calculateFinalScore = (currentAnswers) => {
    let correctCount = 0;
    questions.forEach((q) => {
      if (currentAnswers[q.id] === q.correctAnswer) correctCount++;
    });
    setScore(correctCount);
    setIsSubmitted(true);
  };

  // Countdown timer clock cycle
  useEffect(() => {
    if (loading || fetchError || questions.length === 0 || timeLeft <= 0 || isSubmitted) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsTimeOut(true);
          calculateFinalScore(answers);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isSubmitted, answers, loading, fetchError, questions]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSelectOption = (questionId, optionKey) => {
    if (isSubmitted || isTimeOut) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionKey }));
  };

  const handleManualSubmit = () => {
    if (window.confirm("Are you sure you want to hand in your answers for grading?")) {
      calculateFinalScore(answers);
    }
  };

  // Loading Screen Layout
  if (loading) {
    return (
      <div className="absolute inset-0 bg-white flex flex-col items-center justify-center space-y-3">
        <Loader2 size={32} className="text-blue-600 animate-spin" />
        <p className="text-xs font-bold text-slate-500 tracking-wide">Syncing authentic Thanaweya Amma exam sheets...</p>
      </div>
    );
  }

  // Network Failure Layout
  if (fetchError || questions.length === 0) {
    return (
      <div className="absolute inset-0 bg-white flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-500">
          <AlertTriangle size={20} />
        </div>
        <div className="space-y-1 max-w-sm">
          <h3 className="text-sm font-bold text-slate-900">Curriculum Synch Interrupted</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            {fetchError || "The database repository contains no active evaluation markers for this subject track."}
          </p>
        </div>
        <button 
          onClick={onExit}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const activeQuestion = questions[currentIdx];

  return (
    <div className="absolute inset-0 bg-slate-50 flex flex-col overflow-hidden">
      
      {/* EXAM TOP CONTROL STRIP */}
      <header className="h-14 bg-white border-b border-slate-200/80 px-6 flex items-center justify-between shrink-0 shadow-xs">
        <div className="flex items-center gap-3">
          <button 
            onClick={onExit}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer border border-slate-200/60 bg-white"
          >
            <ArrowLeft size={14} />
          </button>
          <div>
            <h2 className="text-xs font-black text-slate-900 tracking-tight">Exam Simulator Profile</h2>
            <p className="text-[10px] text-slate-400 font-bold">{subject} • Structured Evaluation</p>
          </div>
        </div>

        {/* TIMER DISPLAY BLOCK */}
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold tracking-mono transition-all duration-300 ${
            isTimeOut 
              ? "bg-red-600 border-red-600 text-white shadow-md shadow-red-600/15"
              : timeLeft < 300 
                ? "bg-red-50 border-red-200 text-red-600 animate-pulse" 
                : "bg-slate-50 border-slate-200 text-slate-700"
          }`}>
            <Timer size={14} />
            <span>{isTimeOut ? "TIME'S UP" : formatTime(timeLeft)}</span>
          </div>

          {!isSubmitted && (
            <button
              onClick={handleManualSubmit}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-1.5 rounded-xl transition-all shadow-sm shadow-emerald-600/10 cursor-pointer"
            >
              Finish Exam
            </button>
          )}
        </div>
      </header>

      {/* TIMEOUT CRITICAL ALERT BANNER */}
      {isTimeOut && (
        <div className="bg-red-50 border-b border-red-200 px-6 py-2.5 flex items-center gap-2.5 text-[11px] font-bold text-red-700 shrink-0">
          <Clock size={14} className="text-red-500" />
          <span>Session Locked: Allocation threshold surpassed. Evaluation marks compiled automatically.</span>
        </div>
      )}

      {/* CORE WORKSPACE SPLIT BLOCK */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT WORKSPACE: QUESTION TEXT CANVAS */}
        <div className="flex-1 overflow-y-auto p-8 border-r border-slate-200/60 bg-white scrollbar-thin">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between text-[11px] font-bold text-blue-600 tracking-wide uppercase">
              <span>Question {currentIdx + 1} of {questions.length}</span>
              {isSubmitted && (
                answers[activeQuestion.id] === activeQuestion.correctAnswer 
                  ? <span className="text-emerald-600 font-black">✓ Correct (+1 Mark)</span>
                  : <span className="text-red-500 font-black">✗ Incorrect</span>
              )}
            </div>

            {/* DIAGRAM INJECTION CONTAINER */}
            {activeQuestion.image && (
              <div className="w-full max-w-md mx-auto mb-6 bg-slate-50 border border-slate-200/60 rounded-xl p-4 flex items-center justify-center overflow-hidden shadow-2xs">
                <img 
                  src={activeQuestion.image} 
                  alt="Curriculum Reference Diagram" 
                  className="max-h-56 object-contain rounded-lg"
                />
              </div>
            )}

            {/* LIVE MARKDOWN QUESTION CARD */}
            <div className="prose prose-sm text-slate-800 font-medium text-sm leading-relaxed math-container">
              <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                {activeQuestion.question}
              </ReactMarkdown>
            </div>

            {/* EXAM GRADING EXPLANATION FOOTNOTE */}
            {isSubmitted && (
              <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 text-xs text-slate-700 space-y-1.5 math-container">
                <p className="font-bold text-blue-700">Curriculum Solution Guide:</p>
                <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                  {activeQuestion.explanation}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT WORKSPACE: OPTION SHEET */}
        <div className="w-80 bg-slate-50/50 overflow-y-auto p-6 flex flex-col justify-between shrink-0 border-l border-slate-100 scrollbar-thin">
          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Select Answer</h3>
            
            {/* OPTION INTERACTION CARDS */}
            <div className="space-y-2.5">
              {activeQuestion.options.map((opt) => {
                const isSelected = answers[activeQuestion.id] === opt.key;
                const isCorrect = opt.key === activeQuestion.correctAnswer;
                
                let optionStyle = "border-slate-200 bg-white text-slate-700 hover:border-slate-300";
                if (isSelected) optionStyle = "border-blue-600 bg-blue-50/40 text-blue-700 font-bold shadow-xs";
                if (isSubmitted) {
                  if (isCorrect) optionStyle = "border-emerald-500 bg-emerald-50 text-emerald-800 font-bold";
                  else if (isSelected && !isCorrect) optionStyle = "border-red-300 bg-red-50 text-red-800";
                }

                return (
                  <button
                    key={opt.key}
                    disabled={isSubmitted || isTimeOut}
                    onClick={() => handleSelectOption(activeQuestion.id, opt.key)}
                    className={`w-full flex items-center gap-3 p-3 text-left rounded-xl border text-xs transition-all math-container ${optionStyle} ${
                      (isSubmitted || isTimeOut) ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black border ${
                      isSelected 
                        ? "bg-blue-600 border-blue-600 text-white" 
                        : "bg-slate-50 border-slate-200 text-slate-500"
                    }`}>
                      {opt.key}
                    </span>
                    <div className="flex-1 min-w-0">
                      <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                        {opt.text}
                      </ReactMarkdown>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* PERFORMANCE SUMMARY VIEW */}
            {isSubmitted && (
              <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-3">
                <h4 className="text-[11px] font-black tracking-wide uppercase text-slate-800 border-b border-slate-100 pb-2">
                  Performance Metrics
                </h4>
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Score</p>
                    <p className="text-base font-black text-blue-600">{score} / {questions.length}</p>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Accuracy</p>
                    <p className="text-base font-black text-emerald-600">
                      {questions.length > 0 ? Math.round((score / questions.length) * 100) : 0}%
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* LOWER WORKSPACE TIER PAGINATION TRACKERS */}
          <div className="pt-6 border-t border-slate-200/60 flex items-center justify-between gap-3">
            <button
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx((prev) => prev - 1)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border border-slate-200 bg-white text-slate-600 hover:text-slate-800 disabled:opacity-40 rounded-xl text-xs font-bold transition-all disabled:cursor-not-allowed cursor-pointer shadow-2xs"
            >
              <ArrowLeft size={13} />
              <span>Back</span>
            </button>
            <button
              disabled={currentIdx === questions.length - 1}
              onClick={() => setCurrentIdx((prev) => prev + 1)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border border-slate-200 bg-white text-slate-600 hover:text-slate-800 disabled:opacity-40 rounded-xl text-xs font-bold transition-all disabled:cursor-not-allowed cursor-pointer shadow-2xs"
            >
              <span>Next</span>
              <ArrowRight size={13} />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}