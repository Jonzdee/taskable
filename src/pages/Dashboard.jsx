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
  RefreshCw,
} from "lucide-react";

export default function Dashboard() {
  const { tasks = [], user = {}, coins = 0 } = useApp();

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* 
          pb-28: Extra bottom padding so the last task isn't hidden by the Mobile Bottom Bar.
          max-w-5xl: Keeps it centered on tablets/desktop.
      */}
      <div className="max-w-5xl mx-auto space-y-5 p-4 md:p-8 pb-28 lg:pb-10">
        {/* --- HERO / STATUS SECTION --- */}
        <section className="relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-[2rem] p-5 md:p-8 shadow-2xl">
          {/* Subtle Background Glow */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-emerald-500/10 p-3 md:p-5 rounded-2xl border border-emerald-500/20 shrink-0">
                <ShieldCheck className="text-emerald-500" size={28} />
              </div>
              <div>
                <h2 className="text-white font-black italic text-xl md:text-2xl uppercase tracking-tighter leading-none">
                  {user?.trustScore > 90 ? "ELITE EARNER" : "ACTIVE EARNER"}
                </h2>
                <p className="text-zinc-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mt-1">
                  Trust Score: {user?.trustScore || 100}% · {user?.name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-5 py-3 rounded-2xl border border-zinc-800/50 self-start md:self-center">
              <Zap
                className="text-yellow-400 shrink-0"
                size={18}
                fill="currentColor"
              />
              <div className="flex flex-col">
                <span className="text-white text-xs font-black uppercase italic leading-none">
                  5 Day Streak
                </span>
                <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mt-1">
                  +5% Multiplier
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* --- STATS GRID (Horizontal Scroll on tiny screens, 3-col on rest) --- */}
        <section className="grid grid-cols-3 gap-2 md:gap-6">
          <StatCard
            title="Active"
            value={tasks.filter((t) => t.status === "available").length}
            icon={<TrendingUp size={16} />}
            colorClass="bg-zinc-900 text-white"
          />
          <StatCard
            title="Review"
            value={tasks.filter((t) => t.status === "pending").length}
            icon={<Clock size={16} />}
            colorClass="bg-zinc-900 text-zinc-400"
          />
          <StatCard
            title="Wallet"
            value={coins || user?.coins || 0}
            icon={<CheckCircle size={16} />}
            colorClass="bg-zinc-900 text-tiktok-cyan"
          />
        </section>

        {/* --- RULES SECTION (Stack on Mobile, Row on Desktop) --- */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="group bg-red-500/5 border border-red-500/10 p-4 rounded-2xl flex gap-4 hover:bg-red-500/10 transition-colors">
            <AlertTriangle className="text-red-500 shrink-0 mt-1" size={20} />
            <div>
              <h4 className="text-red-500 font-black text-[10px] uppercase tracking-[0.2em] mb-1">
                Slash Policy
              </h4>
              <p className="text-zinc-500 text-[11px] leading-snug">
                Unfollowing within 30 days triggers a{" "}
                <span className="text-white font-bold">2x penalty</span> and
                instant review.
              </p>
            </div>
          </div>

          <div className="group bg-blue-500/5 border border-blue-500/10 p-4 rounded-2xl flex gap-4 hover:bg-blue-500/10 transition-colors">
            <Zap className="text-blue-500 shrink-0 mt-1" size={20} />
            <div>
              <h4 className="text-blue-500 font-black text-[10px] uppercase tracking-[0.2em] mb-1">
                Anti-Idle
              </h4>
              <p className="text-zinc-500 text-[11px] leading-snug">
                7 days of inactivity will result in a{" "}
                <span className="text-white font-bold">-10 coin</span> daily
                decay.
              </p>
            </div>
          </div>
        </section>

        {/* --- MISSIONS LIST --- */}
        <section className="space-y-4 pt-2">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl md:text-3xl font-black italic uppercase tracking-tighter text-white">
                LIVE MISSIONS
              </h2>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
            </div>
            <button className="text-zinc-600 hover:text-white transition">
              <RefreshCw size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {tasks.length === 0 ? (
              <div className="bg-zinc-900/50 border border-dashed border-zinc-800 rounded-[2.5rem] py-16 text-center">
                <p className="text-zinc-600 font-bold italic text-sm tracking-widest uppercase">
                  Scanning for new missions...
                </p>
              </div>
            ) : (
              tasks.map((task) => <TaskItem key={task.id} task={task} />)
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
