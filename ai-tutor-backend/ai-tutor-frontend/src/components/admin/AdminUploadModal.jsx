import React, { useState } from "react";
import { X, UploadCloud, CheckCircle, Loader2, AlertCircle } from "lucide-react";

export default function AdminUploadModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [file, setFile] = useState(null);
  const [grade, setGrade] = useState("Secondary 3 (Thanaweya Amma)");
  const [subject, setSubject] = useState("Physics");
  const [docType, setDocType] = useState("textbook");
  const [chapter, setChapter] = useState("");
  const [topic, setTopic] = useState("");

  const [isUploading, setIsUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

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
      setErrorMsg("Please attach a reference textbook/exam PDF file first.");
      return;
    }

    setIsUploading(true);
    setSuccessMsg("");
    setErrorMsg("");

    // Package fields inside a FormData payload to transfer multi-part streams to FastAPI
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
        body: formData, // Standard fetch automatically applies multi-part content flags
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || "Server pipeline processing error.");
      }

      const data = await response.json();
      setSuccessMsg(data.message);
      setFile(null); // Clear file slot upon completion
      setChapter("");
      setTopic("");
    } catch (err) {
      setErrorMsg(err.message || "Failed to establish a link to backend upload nodes.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl animate-message">
        
        {/* MODAL HEADER */}
        <div className="p-4 bg-slate-950 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UploadCloud size={16} className="text-teal-400" />
            <h3 className="text-xs font-bold text-slate-200 tracking-wide uppercase">Core RAG Ingestion Terminal</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-all cursor-pointer">
            <X size={16} />
          </button>
        </div>

        {/* FORM MAIN AREA */}
        <form onSubmit={handleUploadSubmit} className="p-6 space-y-4">
          
          {/* FILE ATTACH AREA CONTAINER BOX */}
          <div className="border-2 border-dashed border-slate-800 hover:border-teal-500/30 rounded-xl p-4 transition-all text-center relative bg-slate-950/20">
            <input 
              type="file" 
              accept=".pdf" 
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <UploadCloud size={28} className="mx-auto text-slate-600 mb-2" />
            <p className="text-xs font-semibold text-slate-300">
              {file ? file.name : "Click or drop official curriculum PDF sheet"}
            </p>
            <p className="text-[10px] text-slate-600 mt-1 font-medium">Supported formats: Strict vector PDF only</p>
          </div>

          {/* PARAMETER CONFIGURATION MATRIX */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Target Student Grade</label>
              <select value={grade} onChange={(e) => setGrade(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 outline-none font-medium">
                <option value="Secondary 3 (Thanaweya Amma)">Secondary 3 (Thanaweya)</option>
                <option value="Preparatory 1 (Prep 1)">Preparatory 1 (Prep 1)</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Academic Subject</label>
              <select value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 outline-none font-medium">
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Arabic Language">Arabic Language</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Document Stream Classification</label>
            <select value={docType} onChange={(e) => setDocType(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 outline-none font-medium">
              <option value="textbook">Official MoE Textbook Source</option>
              <option value="note">Shortcut Revision Sheets & Summaries</option>
              <option value="exam">Past Ministry Exam Paper / Test</option>
            </select>
          </div>

          <hr className="border-slate-800/60" />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Chapter Association (Optional)</label>
              <input type="text" placeholder="e.g. Chapter 1: Electric Current" value={chapter} onChange={(e) => setChapter(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 placeholder-slate-700 outline-none font-medium" />
            </div>
            <div>
              <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Topic Pinpoint (Optional)</label>
              <input type="text" placeholder="e.g. Kirchhoff's Laws" value={topic} onChange={(e) => setTopic(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 placeholder-slate-700 outline-none font-medium" />
            </div>
          </div>

          {/* SYSTEM MESSAGES STATUS BANNERS */}
          {successMsg && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-semibold flex items-start gap-2 animate-pulse">
              <CheckCircle size={14} className="shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-semibold flex items-start gap-2">
              <AlertCircle size={14} className="shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* ACTION BUTTON SUBMIT BLOCK */}
          <button
            type="submit"
            disabled={isUploading || !file}
            className="w-full bg-teal-500 hover:bg-teal-400 disabled:opacity-20 text-slate-950 font-extrabold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            {isUploading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Vectorizing Chunks Into Local Storage Base...</span>
              </>
            ) : (
              <span>Execute Ingestion Core</span>
            )}
          </button>

        </form>
      </div>
    </div>
  );
}