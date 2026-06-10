import React, { useState } from "react";
import { Calendar, Clock, CheckSquare, Square, Plus, Trash2, AlertCircle, BookOpen } from "lucide-react";

export default function StudyPlanner({ subject }) {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Revise Physics Chapter 3 Electromagnetism formulas", subject: "Physics", done: false, date: "2026-06-08" },
    { id: 2, text: "Complete Arabic Poetry analysis assignment", subject: "Arabic", done: true, date: "2026-06-07" },
    { id: 3, text: "Solve Calculus mock practice exam 2", subject: "Mathematics", done: false, date: "2026-06-10" }
  ]);
  const [newTask, setNewTask] = useState("");
  const [taskDate, setTaskDate] = useState("");

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const task = {
      id: Date.now(),
      text: newTask,
      subject: subject || "General",
      done: false,
      date: taskDate || new Date().toISOString().split('T')[0]
    };

    setTasks([task, ...tasks]);
    setNewTask("");
    setTaskDate("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(t => subject === "General" || t.subject === subject);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8 animate-message overflow-y-auto max-h-[calc(100vh-4rem)] scrollbar-thin">
      
      {/* HEADER SECTION */}
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-100 flex items-center gap-2">
          <Calendar className="text-teal-400" size={24} /> 
          <span>Curriculum Study Planner • <span className="text-teal-400">{subject}</span></span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">Schedule your study milestones, log upcoming exam deadlines, and coordinate active recall sessions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ADD TASK PANEL FORM */}
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl h-fit space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <BookOpen size={14} className="text-teal-400" />
            <span>Create Study Reminder</span>
          </h3>
          
          <form onSubmit={handleAddTask} className="space-y-3.5">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wide">Milestone Objective</label>
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder={`e.g., Study Chapter 2 notes...`}
                className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500/50 rounded-xl py-2.5 px-3.5 text-xs text-slate-200 placeholder-slate-600 outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wide">Target Deadline</label>
              <input
                type="date"
                value={taskDate}
                onChange={(e) => setTaskDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500/50 rounded-xl py-2.5 px-3.5 text-xs text-slate-200 outline-none transition-all text-slate-400"
              />
            </div>

            <button
              type="submit"
              disabled={!newTask.trim()}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-1.5"
            >
              <Plus size={14} /> Add to Schedule
            </button>
          </form>
        </div>

        {/* TASK MANAGEMENT BOARD */}
        <div className="lg:col-span-2 p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between min-h-[320px]">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800/60 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Active Agenda Milestones ({filteredTasks.length})
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-500">
                Scope: {subject}
              </span>
            </div>

            {filteredTasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500 space-y-2">
                <AlertCircle size={24} className="text-slate-600" />
                <p className="text-xs font-medium">No schedule items listed for this subject.</p>
                <p className="text-[10px] text-slate-600">Use the creation engine panel to organize your day.</p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1 scrollbar-thin">
                {filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                      task.done
                        ? "bg-slate-950/40 border-slate-900/60 text-slate-500"
                        : "bg-slate-950 border-slate-800/80 text-slate-200 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className="text-teal-400 hover:text-teal-300 shrink-0 transition-colors"
                      >
                        {task.done ? <CheckSquare size={16} /> : <Square size={16} />}
                      </button>
                      <span className={`text-xs truncate font-medium ${task.done ? "line-through text-slate-600" : ""}`}>
                        {task.text}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 ml-4">
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-900/60 border border-slate-800 px-2 py-0.5 rounded flex items-center gap-1">
                        <Clock size={10} /> {task.date}
                      </span>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-slate-600 hover:text-red-400 transition-colors p-1 rounded hover:bg-slate-900"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="text-[10px] text-slate-600 font-semibold tracking-wider uppercase text-center mt-6 pt-3 border-t border-slate-800/40">
            Tasks process automatically relative to localized time constraints
          </div>
        </div>

      </div>

    </div>
  );
}