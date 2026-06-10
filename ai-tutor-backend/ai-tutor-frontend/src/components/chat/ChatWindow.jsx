import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, User, Bot, Loader2, AlertCircle, Award } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import TestCard from "./TestCard";
import ExamSimulator from "../study/ExamSimulator";

export default function ChatWindow({ mode, subject, chapter, topic, setActiveCard }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [launchSimulator, setLaunchSimulator] = useState(false);
  
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    let contextString = subject;
    if (chapter) contextString += ` ➔ ${chapter.split(":")[0]}`;
    if (topic) contextString += ` ➔ ${topic}`;

    // Clean display strings matching your exact sidebar label structure
    let modeLabel = "Explain Concept Mode 💡";
    if (mode === "Solve Question") {
      modeLabel = "Solve Question Mode ⚡";
    } else if (mode === "Exam Practice") {
      modeLabel = "Exam Practice Mode 🎯";
    }

    setMessages([
      {
        id: "init-greet",
        role: "assistant",
        isSystemPrompt: true,
        content: `Target scope locked on **${contextString}**. Submit your prompt below, or change your left sidebar options to adjust your learning strategy! Currently active: **${modeLabel}**.`,
      }
    ]);
    setError(null);
  }, [subject, chapter, topic, mode]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const studentQuery = input.trim();
    setInput("");
    setError(null);

    const userMessage = { id: Date.now().toString(), role: "user", content: studentQuery };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: studentQuery,
          mode: mode,
          subject: subject,
          chapter: chapter || "",
          topic: topic || ""
        })
      });

      if (!response.ok) throw new Error(`Status Code ${response.status}`);
      const data = await response.json();

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.answer,
        isTestMode: mode === "Exam Practice"
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      setError("Unable to communicate with the core server. Please confirm the backend application is active.");
    } finally {
      setIsLoading(false);
    }
  };

  if (launchSimulator && mode === "Exam Practice") {
    return <ExamSimulator subject={subject} onExit={() => setLaunchSimulator(false)} />;
  }

  return (
    <div className="absolute inset-0 flex flex-col bg-white">
      
      {/* INTERNAL MICRO REWARDS PROGRESS BAR ELEMENT */}
      <div className="w-full px-6 py-3.5 bg-blue-50/40 border-b border-slate-100 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3 w-full max-w-md">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0">Daily Goal Progress</span>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/40">
            <div className="h-full bg-blue-600 rounded-full transition-all duration-500 shadow-xs" style={{ width: "40%" }} />
          </div>
        </div>
        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100/50">
          4/10 Finished
        </span>
      </div>
      
      {/* MESSAGES LAYER STREAM */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
        {mode === "Exam Practice" && !launchSimulator && messages.length <= 1 ? (
          <div className="max-w-md mx-auto my-12 p-8 text-center bg-white border border-slate-200/80 rounded-2xl space-y-5 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mx-auto text-blue-600 border border-blue-100">
              <Award size={22} />
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900">Curriculum Exam Simulator</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Ready to test your knowledge? Launch a complete structured exam module containing authentic past-year questions.
              </p>
            </div>
            <button
              onClick={() => setLaunchSimulator(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3.5 rounded-xl transition-all shadow-md shadow-blue-600/10 cursor-pointer"
            >
              Launch Exam Simulator
            </button>
          </div>
        ) : (
          messages.map((msg) => {
            const isAI = msg.role === "assistant";
            return (
              <div 
                key={msg.id} 
                className={`flex gap-4 max-w-3xl w-full mx-auto ${
                  isAI ? "justify-start" : "justify-end flex-row-reverse"
                }`}
              >
                {/* USER / AI IDENTITY AVATAR BADGE */}
                <div className={`w-9 h-9 rounded-xl border shrink-0 flex items-center justify-center shadow-xs transition-all ${
                  isAI 
                    ? "bg-white border-slate-200 text-blue-600 shadow-xs" 
                    : "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/10"
                }`}>
                  {isAI ? <Bot size={16} /> : <User size={16} />}
                </div>

                {/* CORE TEXT CONTAINMENT TEXTURES */}
                <div className="flex-1 max-w-xl sm:max-w-2xl min-w-0">
                  <div className={`rounded-2xl px-5 py-3.5 text-[13px] font-medium leading-relaxed border ${
                    isAI
                      ? msg.isSystemPrompt 
                        ? "bg-blue-50/50 border-blue-100 text-slate-600 shadow-inner text-center mx-auto max-w-xl" 
                        : "bg-white border-slate-200 text-slate-800 shadow-xs"
                      : "bg-blue-600 border-blue-600 text-white font-semibold shadow-md shadow-blue-600/10"
                  }`}>
                    
                    {isAI ? (
                      /* DYNAMIC MARKDOWN + MATH INJECTION ENGINE WITH AUTOMATIC PROSE SPACING */
                      <div className="prose prose-sm max-w-none text-slate-800 
                        prose-headings:text-slate-900 prose-headings:font-bold prose-headings:my-2
                        prose-p:leading-relaxed prose-p:my-1.5
                        prose-strong:text-blue-600 prose-strong:font-bold
                        prose-ul:list-disc prose-ul:pl-4 prose-ul:my-1.5
                        prose-ol:list-decimal prose-ol:pl-4 prose-ol:my-1.5
                        prose-li:my-0.5
                        prose-code:bg-slate-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-blue-600 prose-code:border prose-code:border-slate-200/60 prose-code:font-mono prose-code:text-[11px]
                        math-container">
                        <ReactMarkdown 
                          remarkPlugins={[remarkMath]} 
                          rehypePlugins={[rehypeKatex]}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      /* USER LOG WRAPPER */
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    )}

                  </div>
                </div>
              </div>
            );
          })
        )}

        {isLoading && (
          <div className="flex gap-4 max-w-3xl mx-auto justify-start w-full">
            <div className="w-8 h-8 rounded-lg border bg-white border-slate-200 text-blue-600 flex items-center justify-center shadow-xs">
              <Loader2 size={14} className="animate-spin" />
            </div>
            <div className="rounded-xl px-4 py-2.5 bg-white border border-slate-200 text-slate-400 text-xs font-semibold tracking-wide flex items-center gap-2 shadow-xs">
              <span>Formulating curriculum response...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="max-w-3xl mx-auto w-full p-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-xs font-medium flex items-start gap-2.5 shadow-xs">
            <AlertCircle size={15} className="shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Execution Error</p>
              <p className="mt-0.5 text-red-600/95 leading-normal">{error}</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* USER CONTROL INPUT FORM STRIP */}
      <div className="p-4 border-t border-slate-200/60 bg-white shadow-sm shrink-0">
        <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder={`Ask a question regarding ${topic || subject}...`}
            className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl pl-4 pr-12 py-3.5 text-xs text-slate-800 placeholder-slate-400 outline-none transition-all focus:ring-4 focus:ring-blue-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2.5 p-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 text-white font-bold transition-all disabled:text-slate-300 cursor-pointer shadow-xs"
          >
            <Send size={13} />
          </button>
        </form>
        <div className="max-w-3xl mx-auto flex items-center justify-between text-[10px] text-slate-400 font-bold tracking-wide uppercase mt-2.5 px-1">
          <span className="flex items-center gap-1"><Sparkles size={10} className="text-blue-500" /> System Active: Grounded Mode verified</span>
          <span>Press Enter to Send</span>
        </div>
      </div>

    </div>
  );
}