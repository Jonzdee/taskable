import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { CheckCircle, XCircle, Eye, User, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Admin() {
  const { tasks = [], adminVerifyTask } = useApp();
  const [selectedImage, setSelectedImage] = useState(null);

  // Filter only pending tasks
  const pendingTasks = tasks.filter((t) => t.status === "pending");

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-6 pb-24">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter text-white">
            MODERATOR PANEL
          </h1>
          <p className="text-zinc-500 font-bold text-xs uppercase tracking-widest mt-1">
            Reviewing {pendingTasks.length} Pending Submission
          </p>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-2xl flex items-center gap-2">
          <ShieldCheck className="text-emerald-500" size={18} />
          <span className="text-emerald-500 text-[10px] font-black uppercase">
            System Online
          </span>
        </div>
      </header>

      {/* STATS SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Queue Size" value={pendingTasks.length} />
        <StatCard title="Avg. Review Time" value="14m" />
        <StatCard
          title="Security Score"
          value="99.2%"
          valueColor="text-emerald-500"
        />
      </div>

      {/* PENDING TASKS */}
      <div className="space-y-4">
        {pendingTasks.length === 0 ? (
          <EmptyQueue />
        ) : (
          pendingTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onApprove={() => adminVerifyTask(task.id, true, task.reward)}
              onReject={() => adminVerifyTask(task.id, false, task.reward)}
              onPreview={() =>
                setSelectedImage(
                  task.screenshot || "https://via.placeholder.com/800x1200",
                )
              }
            />
          ))
        )}
      </div>

      {/* IMAGE MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={selectedImage}
              alt="Task Proof"
              className="max-h-[90vh] rounded-2xl shadow-2xl border border-zinc-800"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------- COMPONENTS ----------------

const StatCard = ({ title, value, valueColor = "text-white" }) => (
  <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-[2rem]">
    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
      {title}
    </p>
    <p className={`text-3xl font-black italic ${valueColor}`}>{value}</p>
  </div>
);

const EmptyQueue = () => (
  <div className="bg-zinc-900/50 border border-dashed border-zinc-800 py-20 rounded-[3rem] text-center">
    <CheckCircle className="mx-auto text-zinc-700 mb-4" size={48} />
    <p className="text-zinc-500 font-bold italic uppercase tracking-widest">
      The queue is empty. Good job!
    </p>
  </div>
);

const TaskCard = ({ task, onApprove, onReject, onPreview }) => (
  <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6 hover:border-zinc-700 transition">
    {/* THUMBNAIL + INFO */}
    <div className="flex items-center gap-6 w-full md:w-auto">
      <div
        onClick={onPreview}
        className="relative w-20 h-20 bg-black rounded-2xl border border-zinc-700 flex-shrink-0 cursor-zoom-in overflow-hidden group"
      >
        <img
          src={task.screenshot || "https://via.placeholder.com/150"}
          alt="Proof"
          className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition"
        />
        <Eye
          className="absolute inset-0 m-auto text-white pointer-events-none"
          size={20}
        />
      </div>

      <div>
        <div className="flex items-center gap-2 mb-1">
          <User size={12} className="text-zinc-500" />
          <span className="text-[10px] font-black text-zinc-500 uppercase">
            User_ID: {task.userId || "Unknown"}
          </span>
        </div>

        <h3 className="text-xl font-black text-white italic leading-none mb-1">
          {task.type} <span className="text-tiktok-pink">{task.target}</span>
        </h3>

        <div className="flex items-center gap-3">
          <span className="text-tiktok-cyan font-bold text-xs">
            +{task.reward} Coins
          </span>
          <span className="text-zinc-600 text-[10px] font-black tracking-widest uppercase">
            Submitted {task.submittedAgo || "just now"}
          </span>
        </div>
      </div>
    </div>

    {/* ACTION BUTTONS */}
    <div className="flex items-center gap-3 w-full md:w-auto">
      <button
        onClick={onReject}
        className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-500/10 text-red-500 px-6 py-3 rounded-2xl font-bold hover:bg-red-500 hover:text-white transition"
      >
        <XCircle size={18} /> REJECT
      </button>
      <button
        onClick={onApprove}
        className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-emerald-500 text-black px-8 py-3 rounded-2xl font-black hover:bg-tiktok-cyan transition"
      >
        <CheckCircle size={18} /> APPROVE
      </button>
    </div>
  </div>
);
