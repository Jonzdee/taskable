import { Trophy, Medal, ExternalLink } from "lucide-react";
import { useApp } from "../AppContext";

export default function Leaderboard() {
  const { globalWithdrawals } = useApp();
  const topUsers = [
    { name: "MegaEarner", earned: 54000, rank: 1 },
    { name: "TikTokKing", earned: 42000, rank: 2 },
    { name: "Lazy_Scroll", earned: 31000, rank: 3 },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Leaderboard Section */}
      <section>
        <h2 className="text-2xl font-black italic mb-6 flex items-center gap-2">
          <Trophy className="text-yellow-500" /> TOP EARNERS THIS WEEK
        </h2>
        <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] overflow-hidden">
          {topUsers.map((u, i) => (
            <div
              key={i}
              className={`flex items-center justify-between p-6 border-b border-zinc-800 last:border-0 ${i === 0 ? "bg-yellow-500/5" : ""}`}
            >
              <div className="flex items-center gap-4">
                <span
                  className={`text-xl font-black italic ${i === 0 ? "text-yellow-500" : "text-zinc-600"}`}
                >
                  #0{u.rank}
                </span>
                <p className="font-bold text-white text-lg">{u.name}</p>
              </div>
              <p className="text-tiktok-cyan font-black italic">
                {u.earned.toLocaleString()}{" "}
                <span className="text-[10px]">COINS</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Payment Proof Section */}
      <section>
        <h2 className="text-2xl font-black italic mb-6 flex items-center gap-2 text-emerald-400">
          <CheckCircle className="text-emerald-400" /> RECENT WITHDRAWALS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {globalWithdrawals.map((w) => (
            <div
              key={w.id}
              className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl flex justify-between items-center"
            >
              <div>
                <p className="text-white font-bold text-sm">{w.user}</p>
                <p className="text-zinc-500 text-[10px] uppercase font-black">
                  {w.time}
                </p>
              </div>
              <div className="text-right">
                <p className="text-emerald-400 font-black text-sm">
                  {w.amount} COINS
                </p>
                <span className="text-[8px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded uppercase font-bold">
                  Confirmed
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
