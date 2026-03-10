import React from "react";
import { useApp } from "../context/AppContext";
import { Coins, Bell, Menu } from "lucide-react";

export default function Navbar() {
  const { user = {} } = useApp();

  return (
    <nav className="sticky top-0 z-40 w-full bg-black/80 backdrop-blur-md border-b border-zinc-800 px-4 py-3 lg:hidden">
      <div className="flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <div className="bg-tiktok-pink p-1.5 rounded-lg">
            <Coins className="text-white" size={20} />
          </div>

          <span className="font-black text-white italic tracking-tighter">
            TIKTOK REWARDS
          </span>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Notification */}
          <button className="p-2 rounded-lg bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 transition">
            <Bell size={18} className="text-white" />
          </button>

          {/* Real-time Coin Badge */}
          <div className="bg-zinc-900 border border-zinc-700 px-3 py-1.5 rounded-full flex items-center gap-2">
            <span className="text-tiktok-cyan font-bold text-sm">
              {user?.coins || 0}
            </span>

            <div className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center text-[10px] text-black font-bold">
              ₵
            </div>
          </div>

          {/* User Avatar */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-tiktok-pink to-tiktok-cyan p-[2px]">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[10px] font-bold text-white">
              {user?.name ? user.name.slice(0, 2).toUpperCase() : "ID"}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
