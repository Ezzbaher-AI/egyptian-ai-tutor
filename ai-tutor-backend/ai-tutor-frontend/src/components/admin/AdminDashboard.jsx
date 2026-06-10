import React, { useState } from "react";
import { UploadCloud, CheckCircle, Loader2, AlertCircle, Lock, GraduationCap, Server } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  // Form states matching your exact required taxonomy layout
  const [file, setFile] = useState(null);
  const [grade, setGrade] = useState("Secondary 3 (Thanaweya Amma)");
  const [subject, setSubject] = useState("Physics");
  const [docType, setDocType] = useState("textbook");
  const [chapter, setChapter] = useState("");
  const [topic, setTopic] = useState("");

  const [isUploading, setIsUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Hardcoded gate password for rapid local setup (Can be migrated to backend env later)
  const HANDLE_AUTH_SUBMIT = (e) => {
    e.preventDefault();
    if (password === "ezzbaher2026") {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Invalid administrative passcode token.");
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setSuccessMsg("");
      setErrorMsg("");
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setErrorMsg("Please attach an official curriculum source file (PDF) first.");
      return;
    }

    setIsUploading(true);
    setSuccessMsg("");
    setErrorMsg("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("grade", grade);
    formData.append("subject", subject);
    formData.append("doc_type", docType);
    formData.append("chapter", chapter);
    formData.append("topic", topic);

    try {
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || "Server vectorization failure.");
      }

      const data = await response.json();
      setSuccessMsg(data.message);
      setFile(null);
      setChapter("");
      setTopic("");
    } catch (err) {
      setErrorMsg(err.message || "Failed to establish cross-origin links to backend engine nodes.");
    } finally {
      setIsUploading(false);
    }
  };

  // --- RENDERING SECURITY GUARD GATE DISPATCH ---
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-slate-950 flex items-center justify-center p-4">
        <form onSubmit={HANDLE_AUTH_SUBMIT} className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-2xl text-center">
          <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mx-auto text-teal-400">
            <Lock size={20} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Admin Gate Access</h2>
            <p className="text-[11px] text-slate-500 mt-1 font-semibold">Enter secret key to authorize deployment mechanics.</p>
          </div>
          <input
            type="password"
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500/40 rounded-xl px-4 py-3 text-xs text-slate-200 outline-none text-center tracking-widest font-bold"
          />
          {authError && <p className="text-[10px] font-bold text-red-400">{authError}</p>}
          <button type="submit" className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-xs py-2.5 rounded-xl transition-all cursor-pointer">
            Unlock Master Terminal
          </button>
        </form>
      </div>
    );
  }

  // --- MAIN ADMIN MANAGEMENT CONTENT VIEW ---
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-message">
        
        {/* APP BRAND HEADER STRIP */}
        <div className="p-6 bg-slate-950 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-500/10 border border-teal-500/20 rounded-xl text-teal-400">
              <Server size={18} />
            </div>
            <div>
              <h1 className="text-xs font-black uppercase tracking-widest text-slate-200">EduAI Central Registry</h1>
              <p className="text-[10px] text-slate-500 font-bold mt-0.5 uppercase tracking-wide">Structured Curriculum Intake System</p>
            </div>
          </div>
          <Link to="/" className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-[10px] text-slate-400 font-extrabold hover:text-slate-200 hover:bg-slate-800 transition-all">
            ← Exit Workspace
          </Link>
        </div>

        {/* INPUT FORM SCHEMATICS */}
        <form onSubmit={handleUploadSubmit} className="p-8 space-y-6">
          
          {/* STEP 1: ATTACH ASSET STREAM */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-0.5">1. Target Document Node Asset</label>
            <div className="border-2 border-dashed border-slate-800 hover:border-teal-500/30 rounded-2xl p-6 transition-all text-center relative bg-slate-950/20">
              <input type="file" accept=".pdf" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
              <UploadCloud size={32} className="mx-auto text-slate-600 mb-2" />
              <p className="text-xs font-bold text-slate-300">{file ? file.name : "Drag and drop source educational PDF document here"}</p>
              <p className="text-[10px] text-slate-600 mt-1 font-semibold uppercase tracking-wider">Strict PDF binary formatting required</p>
            </div>
          </div>

          {/* STEP 2: METADATA TAILOR TAXONOMY */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-0.5">2. Structural Taxonomy Coordinates</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Grade Segment</label>
                <select value={grade} onChange={(e) => setGrade(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-300 outline-none font-bold">
                  <option value="Secondary 3 (Thanaweya Amma)">Secondary 3 (Thanaweya)</option>
                  <option value="Preparatory 1 (Prep 1)">Preparatory 1 (Prep 1)</option>
                </select>
              </div>
              
              <div>
                <label className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Subject Scope</label>
                <select value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-300 outline-none font-bold">
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Arabic Language">Arabic Language</option>
                </select>
              </div>

              <div>
                <label className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Document Stream Type</label>
                <select value={docType} onChange={(e) => setDocType(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-300 outline-none font-bold">
                  <option value="textbook">Official Textbook</option>
                  <option value="note">Shortcut Revision Summaries</option>
                  <option value="exam">Past Ministry Exam / Test</option>
                </select>
              </div>
            </div>
          </div>

          {/* STEP 3: OPTIONAL DRILL DOWN LOCATION REFINEMENTS */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-0.5">3. Granular Navigation Anchor Flags (Optional)</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Chapter Boundary Association</label>
                <input type="text" placeholder="e.g. Chapter 1: Electric Current" value={chapter} onChange={(e) => setChapter(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-300 placeholder-slate-700 outline-none font-medium" />
              </div>
              <div>
                <label className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Topic Pinpoint Isolation Target</label>
                <input type="text" placeholder="e.g. Kirchhoff's Laws" value={topic} onChange={(e) => setTopic(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-300 placeholder-slate-700 outline-none font-medium" />
              </div>
            </div>
          </div>

          {/* STATUS NOTIFICATION ACCORDIONS */}
          {successMsg && (
            <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-semibold flex items-start gap-2.5">
              <CheckCircle size={16} className="shrink-0 mt-0.5 text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl text-red-400 text-xs font-semibold flex items-start gap-2.5">
              <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* SYSTEM DISPATCH ACTION SUBMIT TRIGER */}
          <button
            type="submit"
            disabled={isUploading || !file}
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 hover:opacity-90 disabled:opacity-20 font-black text-xs py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-widest shadow-lg shadow-teal-500/5"
          >
            {isUploading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Parsing & Vectorizing Chunks...</span>
              </>
            ) : (
              <span>Publish To Production Vector Database</span>
            )}
          </button>

        </form>
      </div>
    </div>
  );
}