import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Plus, Trash2, Globe, Coins, Tag, PlusCircle } from "lucide-react";

export default function Tasks() {
  const { tasks, addTask, setTasks } = useApp();

  // Form State
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({
    type: "Follow",
    target: "",
    reward: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask.target || !newTask.reward) return;

    // Call the context function
    addTask({
      type: newTask.type,
      target: newTask.target,
      reward: Number(newTask.reward),
    });

    // Reset Form
    setNewTask({ type: "Follow", target: "", reward: "" });
    setShowForm(false);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black italic text-white uppercase tracking-tighter">
            Task Management
          </h1>
          <p className="text-slate-500 text-sm">
            Create and monitor missions for users
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-emerald-500 text-black px-6 py-3 rounded-2xl font-black flex items-center gap-2 hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/20"
        >
          <PlusCircle size={20} /> {showForm ? "CLOSE FORM" : "CREATE NEW TASK"}
        </button>
      </div>

      {/* CREATE TASK FORM */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] grid grid-cols-1 md:grid-cols-4 gap-6 animate-in fade-in slide-in-from-top-4"
        >
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">
              Action Type
            </label>
            <select
              value={newTask.type}
              onChange={(e) => setNewTask({ ...newTask, type: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500"
            >
              <option>Follow</option>
              <option>Like</option>
              <option>Comment</option>
              <option>Share</option>
            </select>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">
              TikTok Target (@User or Video ID)
            </label>
            <div className="relative">
              <Globe
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                size={18}
              />
              <input
                type="text"
                placeholder="@username or URL"
                value={newTask.target}
                onChange={(e) =>
                  setNewTask({ ...newTask, target: e.target.value })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-11 pl-12 py-3 text-white outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">
              Reward (Coins)
            </label>
            <div className="relative">
              <Coins
                className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500"
                size={18}
              />
              <input
                type="number"
                placeholder="50"
                value={newTask.reward}
                onChange={(e) =>
                  setNewTask({ ...newTask, reward: e.target.value })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-11 pl-12 py-3 text-white outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="md:col-span-4">
            <button className="w-full bg-emerald-500 text-black py-4 rounded-xl font-black uppercase tracking-widest hover:bg-emerald-400 transition shadow-xl">
              Publish Mission to Dashboard
            </button>
          </div>
        </form>
      )}

      {/* LIVE TASKS TABLE */}
      <div className="bg-slate-900 rounded-[2.5rem] border border-slate-800 overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800/50 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <th className="p-6">Action</th>
              <th className="p-6">Target Creator</th>
              <th className="p-6 text-center">Reward</th>
              <th className="p-6 text-center">Status</th>
              <th className="p-6 text-right">Control</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {tasks.map((task) => (
              <tr
                key={task.id}
                className="hover:bg-slate-800/30 transition-colors group"
              >
                <td className="p-6">
                  <span className="bg-slate-950 border border-slate-800 px-3 py-1 rounded-lg text-xs font-bold text-emerald-400">
                    {task.type}
                  </span>
                </td>
                <td className="p-6 font-bold text-white">{task.target}</td>
                <td className="p-6 text-center">
                  <span className="text-emerald-500 font-black tracking-tighter text-lg">
                    {task.reward}
                  </span>
                </td>
                <td className="p-6 text-center">
                  <span
                    className={`text-[10px] font-black px-3 py-1 rounded-full uppercase ${
                      task.status === "available"
                        ? "bg-blue-500/10 text-blue-400"
                        : "bg-orange-500/10 text-orange-400"
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="p-6 text-right">
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-2 text-slate-600 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {tasks.length === 0 && (
          <div className="p-20 text-center text-slate-600 font-bold italic">
            No active missions. Click "Create New Task" to begin.
          </div>
        )}
      </div>
    </div>
  );
}
