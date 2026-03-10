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
  const { tasks = [], user = {} } = useApp();

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto space-y-8 p-6">
        {/* --- ACCOUNT STATUS BANNER --- */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/20">
              <ShieldCheck className="text-emerald-500" size={28} />
            </div>
            <div>
              <h2 className="text-white font-black italic text-xl uppercase tracking-tighter">
                Status: Highly Active
              </h2>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
                Trust Score: 98% (Premium Earner)
              </p>
            </div>
          </div>

          <div className="bg-black/50 px-6 py-3 rounded-2xl border border-zinc-800 flex items-center gap-3">
            <Zap className="text-yellow-400" size={18} fill="currentColor" />
            <p className="text-[10px] text-zinc-400 font-black uppercase leading-tight">
              Daily Streak: <span className="text-white text-sm">5 Days</span>{" "}
              <br />
              +5% Bonus active
            </p>
          </div>
        </div>

        {/* --- CRITICAL RULES GRID --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-red-500/5 border border-red-500/20 p-5 rounded-3xl flex gap-4">
            <AlertTriangle className="text-red-500 shrink-0" size={24} />
            <div>
              <h4 className="text-red-500 font-black text-xs uppercase tracking-widest mb-1">
                Anti-Unfollow Policy
              </h4>
              <p className="text-zinc-500 text-[11px] leading-relaxed">
                If our system detects an **unfollow** or **unlike** within 30
                days, your earned coins will be{" "}
                <span className="text-white">slashed (x2 penalty)</span> and
                account restricted.
              </p>
            </div>
          </div>

          <div className="bg-blue-500/5 border border-blue-500/20 p-5 rounded-3xl flex gap-4">
            <Zap className="text-blue-500 shrink-0" size={24} />
            <div>
              <h4 className="text-blue-500 font-black text-xs uppercase tracking-widest mb-1">
                Inactivity Slash
              </h4>
              <p className="text-zinc-500 text-[11px] leading-relaxed">
                Accounts inactive for more than{" "}
                <span className="text-white">7 days</span> lose 10 coins daily.
                Complete 1 task weekly to stay active.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard
            title="Available"
            value={tasks.filter((t) => t.status === "available").length}
            icon={<TrendingUp />}
            colorClass="bg-white/5 text-white"
          />
          <StatCard
            title="Reviewing"
            value={tasks.filter((t) => t.status === "pending").length}
            icon={<Clock />}
            colorClass="bg-white/5 text-zinc-400"
          />
          <StatCard
            title="Wallet"
            value={user?.coins || "0"}
            icon={<CheckCircle />}
            colorClass="bg-white/5 text-white"
          />
        </section>

        {/* Task List */}
        <section className="space-y-6">
          <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">
            Live Missions
          </h2>
          <div className="grid gap-4">
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

function TrustMeter({ score }) {
  const isDanger = score < 50;
  return (
    <div
      className={`p-4 rounded-2xl border ${isDanger ? "bg-red-500/5 border-red-500/20" : "bg-zinc-900 border-zinc-800"}`}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-[10px] font-black uppercase text-zinc-500">
          Trust Score
        </span>
        <span
          className={`text-xs font-black ${isDanger ? "text-red-500 animate-pulse" : "text-emerald-400"}`}
        >
          {score}%
        </span>
      </div>
      <div className="w-full bg-black h-1.5 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ${isDanger ? "bg-red-500" : "bg-emerald-400"}`}
          style={{ width: `${score}%` }}
        />
      </div>
      {isDanger && (
        <p className="text-[9px] text-red-500 font-bold mt-2 italic uppercase">
          Withdrawals locked: Account under review
        </p>
      )}
    </div>
  );
}
