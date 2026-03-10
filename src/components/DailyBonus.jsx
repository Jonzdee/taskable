import { Gift, Calendar } from "lucide-react";

export function DailyBonus() {
  return (
    <div className="bg-gradient-to-br from-tiktok-pink to-purple-600 p-8 rounded-[2.5rem] text-white relative overflow-hidden group">
      <div className="relative z-10">
        <h3 className="text-2xl font-black italic tracking-tighter uppercase mb-2">
          Daily Streak
        </h3>
        <p className="text-pink-100 text-sm mb-6">
          Come back tomorrow for 100 bonus coins!
        </p>

        <div className="flex gap-2">
          {[1, 2, 3, 4, 5, 6, 7].map((day) => (
            <div
              key={day}
              className={`flex-1 h-12 rounded-xl flex items-center justify-center font-black italic text-xs border ${day === 1 ? "bg-white text-black" : "bg-black/20 border-white/10 opacity-50"}`}
            >
              D{day}
            </div>
          ))}
        </div>

        <button className="w-full mt-6 bg-white text-black py-3 rounded-xl font-black text-sm hover:scale-105 transition active:scale-95 shadow-xl">
          CLAIM TODAY (+15)
        </button>
      </div>
      <Gift
        className="absolute -right-4 -bottom-4 text-white/10 rotate-12"
        size={120}
      />
    </div>
  );
}
