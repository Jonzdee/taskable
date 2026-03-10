import React, { useState } from "react";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import TaskItem from "../components/TaskItem";
import { useApp } from "../context/AppContext";
import { motion } from "framer-motion"; // Assuming you have framer-motion installed as per previous steps
import {
  TrendingUp,
  CheckCircle,
  Clock,
  AlertTriangle,
  Zap,
  ShieldCheck,
  RefreshCw,
  Trophy,
} from "lucide-react";

export default function Dashboard() {
  const { tasks = [], user = {}, coins = 0 } = useApp();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      {/* Main Container - max-w-6xl for better desktop spread */}
      <div className="max-w-6xl mx-auto space-y-8 p-4 md:p-10 pb-28 lg:pb-12">
        {/* --- HERO / STATUS SECTION --- */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-[2.5rem] p-6 md:p-10 shadow-2xl"
        >
          {/* Decorative Elements for Desktop */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full hidden lg:block" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-tiktok-pink/5 blur-[100px] rounded-full hidden lg:block" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="bg-emerald-500/10 p-4 md:p-6 rounded-3xl border border-emerald-500/20 flex items-center justify-center shrink-0 shadow-inner">
                <ShieldCheck
                  className="text-emerald-500"
                  size={36}
                  strokeWidth={2.5}
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest border border-emerald-500/30">
                    Verified Creator
                  </span>
                </div>
                <h2 className="text-2xl md:text-4xl font-black italic uppercase tracking-tighter leading-none mb-2">
                  {user?.trustScore > 90 ? "ELITE EARNER" : "ACTIVE EARNER"}
                </h2>
                <p className="text-zinc-500 text-xs md:text-sm font-bold uppercase tracking-[0.2em]">
                  Rank:{" "}
                  <span className="text-zinc-300">
                    #{Math.floor(Math.random() * 500) + 1} Global
                  </span>{" "}
                  · Trust: {user?.trustScore || 100}%
                </p>
              </div>
            </div>

            {/* Streak Badge - Styled like a pro widget */}
            <div className="flex items-center gap-4 bg-black/60 backdrop-blur-xl px-6 py-4 rounded-[2rem] border border-zinc-800 self-start md:self-center shrink-0 shadow-xl group hover:border-yellow-500/50 transition-all cursor-default">
              <div className="bg-yellow-500/20 p-2 rounded-full group-hover:scale-110 transition-transform">
                <Zap
                  className="text-yellow-400"
                  size={24}
                  fill="currentColor"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-white text-sm font-black uppercase italic leading-none flex items-center gap-2">
                  5 Day Streak <Trophy size={14} className="text-yellow-500" />
                </span>
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">
                  Boosting earnings by 5%
                </span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* --- STATS GRID --- */}
        <section className="grid grid-cols-3 gap-3 md:gap-8">
          <StatCard
            title="Active Jobs"
            value={tasks.filter((t) => t.status === "available").length}
            icon={<TrendingUp size={20} strokeWidth={2.5} />}
            colorClass="bg-zinc-900 hover:bg-zinc-800 border-zinc-800 transition-colors text-white"
          />
          <StatCard
            title="In Review"
            value={tasks.filter((t) => t.status === "pending").length}
            icon={<Clock size={20} strokeWidth={2.5} />}
            colorClass="bg-zinc-900 hover:bg-zinc-800 border-zinc-800 transition-colors text-zinc-400"
          />
          <StatCard
            title="My Wallet"
            value={`${(coins || user?.coins || 0).toLocaleString()}`}
            icon={<CheckCircle size={20} strokeWidth={2.5} />}
            colorClass="bg-zinc-900 hover:bg-zinc-800 border-zinc-800 transition-colors text-tiktok-cyan"
          />
        </section>

        {/* --- RULES & MISSIONS WRAPPER --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side: Rules (Sticky on Desktop) */}
          <aside className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
            <h3 className="text-zinc-500 text-xs font-black uppercase tracking-[0.3em] px-2 mb-4">
              Account Integrity
            </h3>
            <div className="bg-red-500/5 border border-red-500/10 p-6 rounded-3xl flex gap-4">
              <AlertTriangle className="text-red-500 shrink-0" size={24} />
              <div>
                <h4 className="text-red-500 font-black text-xs uppercase tracking-[0.15em] mb-2">
                  Slash Policy
                </h4>
                <p className="text-zinc-500 text-xs leading-relaxed">
                  Unfollowing within 30 days triggers an automated{" "}
                  <span className="text-white font-bold">2x penalty</span> and
                  immediate trust reduction.
                </p>
              </div>
            </div>

            <div className="bg-blue-500/5 border border-blue-500/10 p-6 rounded-3xl flex gap-4">
              <Zap
                className="text-blue-500 shrink-0"
                size={24}
                fill="currentColor"
              />
              <div>
                <h4 className="text-blue-500 font-black text-xs uppercase tracking-[0.15em] mb-2">
                  Activity Decay
                </h4>
                <p className="text-zinc-500 text-xs leading-relaxed">
                  System logs inactivity. After{" "}
                  <span className="text-white font-bold">7 days</span>, a daily
                  10 coin maintenance fee is applied.
                </p>
              </div>
            </div>
          </aside>

          {/* Right Side: Missions List */}
          <section className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-white">
                  LIVE MISSIONS
                </h2>
                <div className="bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
                    Real-time
                  </span>
                </div>
              </div>
              <button
                onClick={handleRefresh}
                className={`text-zinc-600 hover:text-white transition-all p-3 bg-zinc-900 border border-zinc-800 rounded-2xl ${isRefreshing ? "rotate-180 opacity-50" : ""}`}
              >
                <RefreshCw size={20} strokeWidth={2.5} />
              </button>
            </div>

            {/* Task grid changes to 2 columns on desktop (lg:grid-cols-2) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tasks.length === 0 ? (
                <div className="col-span-full bg-zinc-900/50 border border-dashed border-zinc-800 rounded-[2.5rem] py-24 text-center">
                  <p className="text-zinc-600 font-bold italic text-sm tracking-widest uppercase">
                    Scanning global database for new missions...
                  </p>
                </div>
              ) : (
                tasks.map((task, idx) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <TaskItem task={task} />
                  </motion.div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
