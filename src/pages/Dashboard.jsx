import React from "react";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import TaskItem from "../components/TaskItem";
import { useApp } from "../context/AppContext";
import {
  TrendingUp,
  CheckCircle,
  Clock,
  AlertTriangle,
  Zap,
  ShieldCheck,
} from "lucide-react";

export default function Dashboard() {
  const { tasks = [], user = {}, coins = 0 } = useApp();

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto space-y-6 p-4 md:p-6">
        {/* --- ACCOUNT STATUS BANNER --- */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-6 flex flex-col gap-4 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500/10 p-3 md:p-4 rounded-xl md:rounded-2xl border border-emerald-500/20 shrink-0">
              <ShieldCheck className="text-emerald-500" size={22} />
            </div>
            <div>
              <h2 className="text-white font-black italic text-base md:text-xl uppercase tracking-tighter">
                Status: Highly Active
              </h2>
              <p className="text-zinc-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                Trust Score: {user?.trustScore || 98}% · Premium Earner
              </p>
            </div>
          </div>

          <div className="bg-black/50 px-4 py-3 rounded-2xl border border-zinc-800 flex items-center gap-3 w-full">
            <Zap
              className="text-yellow-400 shrink-0"
              size={16}
              fill="currentColor"
            />
            <p className="text-[10px] text-zinc-400 font-black uppercase leading-tight">
              Daily Streak:{" "}
              <span className="text-white text-xs md:text-sm">5 Days</span>{" "}
              &nbsp;·&nbsp; +5% Bonus active
            </p>
          </div>
        </div>

        {/* --- CRITICAL RULES GRID --- */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          <div className="bg-red-500/5 border border-red-500/20 p-4 md:p-5 rounded-2xl md:rounded-3xl flex gap-3">
            <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={20} />
            <div>
              <h4 className="text-red-500 font-black text-[10px] uppercase tracking-widest mb-1">
                Anti-Unfollow Policy
              </h4>
              <p className="text-zinc-500 text-[11px] leading-relaxed">
                Unfollowing or unliking within 30 days results in{" "}
                <span className="text-white font-bold">x2 coin penalty</span>{" "}
                and account restriction.
              </p>
            </div>
          </div>

          <div className="bg-blue-500/5 border border-blue-500/20 p-4 md:p-5 rounded-2xl md:rounded-3xl flex gap-3">
            <Zap className="text-blue-500 shrink-0 mt-0.5" size={20} />
            <div>
              <h4 className="text-blue-500 font-black text-[10px] uppercase tracking-widest mb-1">
                Inactivity Slash
              </h4>
              <p className="text-zinc-500 text-[11px] leading-relaxed">
                Accounts inactive for more than{" "}
                <span className="text-white font-bold">7 days</span> lose 10
                coins daily. Complete 1 task weekly to stay active.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-3 gap-3 md:gap-6">
          <StatCard
            title="Available"
            value={tasks.filter((t) => t.status === "available").length}
            icon={<TrendingUp size={18} />}
            colorClass="bg-white/5 text-white"
          />
          <StatCard
            title="Reviewing"
            value={tasks.filter((t) => t.status === "pending").length}
            icon={<Clock size={18} />}
            colorClass="bg-white/5 text-zinc-400"
          />
          <StatCard
            title="Wallet"
            value={coins || user?.coins || 0}
            icon={<CheckCircle size={18} />}
            colorClass="bg-white/5 text-white"
          />
        </section>

        {/* Task List */}
        <section className="space-y-4 pb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-white">
              Live Missions
            </h2>
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
              {tasks.filter((t) => t.status === "available").length} Active
            </span>
          </div>

          {tasks.length === 0 ? (
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-12 text-center">
              <p className="text-zinc-600 font-bold italic text-sm">
                No missions available right now.
              </p>
            </div>
          ) : (
            <div className="grid gap-3 md:gap-4">
              {tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
