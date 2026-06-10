import React, { useState, useEffect } from "react";
import LandingPage from "./pages/LandingPage.jsx";
import Sidebar from "./components/navigation/Sidebar.jsx";
import ChatWindow from "./components/chat/ChatWindow.jsx"; 
import ExamSimulator from "./components/study/ExamSimulator.jsx";

export default function App() {
  // 'landing' or 'dashboard'
  const [viewMode, setViewMode] = useState("landing");
  
  // Synchronized precisely with your sidebar labels: "Explain Concept", "Solve Question", "Exam Practice"
  const [activeTab, setActiveTab] = useState("Explain Concept");
  const [selectedSubject, setSelectedSubject] = useState("Physics");

  // Instantly verify if a persistent premium session exists in browser storage
  useEffect(() => {
    const isRemembered = localStorage.getItem("eduai_keep_logged_in");
    if (isRemembered === "true") {
      setViewMode("dashboard");
    }
  }, []);

  // Handler triggered when user clicks "ENTER CLASSROOM" on the marketing landing page
  const handleEnterClassroom = (keepMeLoggedIn) => {
    if (keepMeLoggedIn) {
      localStorage.setItem("eduai_keep_logged_in", "true");
    }
    setViewMode("dashboard");
  };

  // Handler triggered when user logs out or clicks "Exit Classroom"
  const handleExitToLanding = () => {
    localStorage.removeItem("eduai_keep_logged_in");
    setViewMode("landing");
  };

  // --- RENDERING ROUTER ---
  if (viewMode === "landing") {
    return <LandingPage onEnterClassroom={handleEnterClassroom} />;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white font-sans text-slate-800 antialiased">
      
      {/* PERSISTENT SIDEBAR */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
        onLogout={handleExitToLanding} // Passes down the logout backdoor smoothly
      />

      {/* DYNAMIC DASHBOARD WORKSPACE (Bright Clean Canvas) */}
      <main className="flex-1 relative flex flex-col bg-slate-50/50 border-l border-slate-100">
        
        {/* Render Exam Practice module if active tab matches */}
        {activeTab === "Exam Practice" ? (
          <ExamSimulator 
            subject={selectedSubject} 
            onExit={() => setActiveTab("Explain Concept")} 
          />
        ) : activeTab === "Premium Upgrade" ? (
          <div className="p-8 flex flex-col items-center justify-center h-full bg-white">
            <h2 className="text-xl font-bold text-slate-900">Premium Subscription Plan</h2>
            <p className="text-xs text-slate-400 mt-2">Target price: 250 EGP / month layout</p>
          </div>
        ) : (
          /* CORE WORKSPACE CONTEXT: Explain Concept / Solve Question */
          <ChatWindow 
            mode={activeTab} // Sends exact active modes ("Explain Concept" or "Solve Question") cleanly to your FastAPI server
            subject={selectedSubject} 
          />
        )}
        
      </main>
    </div>
  );
}