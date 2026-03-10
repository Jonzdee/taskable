import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  ArrowUpRight,
  History,
  ArrowDownLeft,
  ShieldCheck,
  Zap,
  Send,
} from "lucide-react";

export default function Wallet() {
  const { coins = 0 } = useApp();
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [targetId, setTargetId] = useState("");

  const handleWithdraw = (e) => {
    e.preventDefault();
    if (withdrawAmount > coins) return alert("Insufficient balance");
    alert(`Withdrawal of ${withdrawAmount} coins initiated for ${targetId}`);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10 p-6">
      {/* Header */}
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter text-white uppercase">
            Wallet
          </h1>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">
            Managed Security
          </p>
        </div>
        <div className="flex items-center gap-2 text-zinc-400 text-[10px] font-black bg-zinc-900 px-4 py-2 rounded-2xl border border-zinc-800 tracking-tighter">
          <ShieldCheck size={14} className="text-white" />
          ENCRYPTED
        </div>
      </header>
      {/* Main Balance Card */}
      <div className="relative overflow-hidden bg-zinc-900 border border-zinc-800 p-12 rounded-[3.5rem] shadow-2xl">
        {/* Subtle Light Effect */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/5 blur-[90px] rounded-full" />

        <div className="relative z-10 text-center">
          <p className="text-zinc-500 font-black uppercase tracking-[0.3em] text-[10px] mb-4">
            Total Available Balance
          </p>
          <div className="flex items-center justify-center gap-3">
            <h2 className="text-8xl font-black text-white tracking-tighter">
              {coins.toLocaleString()}
            </h2>
          </div>
          <p className="text-zinc-500 font-bold text-sm uppercase italic mt-2 tracking-widest">
            TikTok Coins
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 border-t border-zinc-800/50 mt-12 pt-8">
          <div className="text-center border-r border-zinc-800/50">
            <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest mb-1">
              Lifetime
            </p>
            <p className="text-white font-bold text-xl">14,200</p>
          </div>
          <div className="text-center">
            <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest mb-1">
              Pending
            </p>
            <p className="text-zinc-400 font-bold text-xl">150</p>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 border-l-4 border-yellow-500 p-6 rounded-3xl mb-8">
        <div className="flex gap-4">
          <ShieldCheck className="text-yellow-500 shrink-0" size={24} />
          <div>
            <h4 className="text-white font-black text-sm uppercase italic">
              Pre-Withdrawal Audit
            </h4>
            <p className="text-zinc-500 text-xs mt-1 leading-relaxed">
              Our system is currently scanning your linked TikTok account.
              Unfollowing creators you were paid to follow will result in:
            </p>
            <ul className="mt-3 space-y-2">
              <li className="text-[10px] font-bold text-zinc-400 flex items-center gap-2">
                <div className="w-1 h-1 bg-yellow-500 rounded-full" /> 100%
                FORFEITURE OF PENDING COINS
              </li>
              <li className="text-[10px] font-bold text-zinc-400 flex items-center gap-2">
                <div className="w-1 h-1 bg-yellow-500 rounded-full" /> PERMANENT
                IP ADDRESS BAN
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Direct Action Form */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-[3rem] p-10">
        <h3 className="text-white font-black italic text-lg mb-8 uppercase tracking-tight">
          Withdraw Funds
        </h3>

        <form onSubmit={handleWithdraw} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-zinc-500 text-[10px] font-black uppercase tracking-widest ml-2">
                Amount to move
              </label>
              <input
                type="number"
                placeholder="Min. 500"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-2xl px-6 py-4 text-white focus:border-white outline-none transition font-bold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-zinc-500 text-[10px] font-black uppercase tracking-widest ml-2">
                TikTok ID / Wallet
              </label>
              <input
                type="text"
                placeholder="@username"
                value={targetId}
                onChange={(e) => setTargetId(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-2xl px-6 py-4 text-white focus:border-white outline-none transition font-bold"
              />
            </div>
          </div>

          <button className="w-full bg-white text-black py-5 rounded-[2rem] font-black text-lg hover:bg-zinc-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3 shadow-[0_20px_40px_-15px_rgba(255,255,255,0.15)]">
            EXECUTE WITHDRAWAL <Send size={20} />
          </button>
        </form>
      </div>
      {/* History List */}
      <div className="space-y-6 pb-10">
        <div className="flex items-center justify-between px-4">
          <h3 className="font-black italic text-zinc-400 uppercase tracking-widest text-sm flex items-center gap-2">
            <History size={16} /> Activity
          </h3>
          <button className="text-[10px] font-black text-zinc-600 hover:text-white transition uppercase tracking-tighter">
            Export CSV
          </button>
        </div>

        <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-[2.5rem] overflow-hidden">
          <TransactionItem
            label="Task: Follow @star"
            date="Mar 10"
            amount="+50"
            type="credit"
          />
          <TransactionItem
            label="Task: Like Video"
            date="Mar 09"
            amount="+20"
            type="credit"
          />
          <TransactionItem
            label="System: Reward"
            date="Mar 08"
            amount="+100"
            type="credit"
          />
        </div>
      </div>
    </div>
  );
}

const TransactionItem = ({ label, date, amount, type }) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-zinc-800/30 last:border-0 hover:bg-zinc-800/20 transition cursor-default">
      <div className="flex items-center gap-4">
        <div
          className={`p-2 rounded-lg ${type === "credit" ? "bg-zinc-800 text-white" : "bg-zinc-900 text-zinc-600"}`}
        >
          {type === "credit" ? (
            <ArrowDownLeft size={16} />
          ) : (
            <ArrowUpRight size={16} />
          )}
        </div>
        <div>
          <p className="text-sm font-bold text-white leading-none mb-1 tracking-tight">
            {label}
          </p>
          <p className="text-[10px] text-zinc-600 uppercase font-black tracking-tighter">
            {date}
          </p>
        </div>
      </div>
      <p
        className={`font-black text-sm tracking-tighter ${type === "credit" ? "text-white" : "text-zinc-600"}`}
      >
        {amount}
      </p>
    </div>
  );
};
