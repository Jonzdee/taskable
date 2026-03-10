import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Wallet,
  Settings,
  LogOut,
  ShieldCheck,
  Trophy,
} from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Sidebar() {
  const loc = useLocation();
  const { logout, user } = useApp(); // Get user to check isAdmin status

  // Base menu items for everyone
  const menu = [
    { name: "Home", path: "/dashboard", icon: <Home size={22} /> },
    { name: "Wallet", path: "/wallet", icon: <Wallet size={22} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={22} /> },
  ];

  // Add Admin/Moderator link only if user is an admin
  if (user?.isAdmin) {
    menu.push({
      name: "Admin",
      path: "/admin",
      icon: <ShieldCheck size={22} />,
    });
  }

  return (
    <>
      {/* --- DESKTOP SIDEBAR (Large Screens) --- */}
      <nav className="fixed left-0 top-0 h-full w-64 bg-black border-r border-zinc-900 p-6 hidden lg:flex flex-col z-50">
        <div className="text-2xl font-black text-white mb-10 italic tracking-tighter">
          TIKTOK<span className="text-tiktok-pink text-3xl">.</span>REWARDS
        </div>

        <div className="space-y-4 flex-1">
          {menu.map((item) => {
            const isActive = loc.pathname === item.path;
            const isControl = item.path === "/admin";

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 p-3 rounded-2xl font-bold transition-all ${
                  isActive
                    ? isControl
                      ? "bg-emerald-500/10 text-emerald-400 shadow-lg shadow-emerald-500/5"
                      : "bg-zinc-900 text-tiktok-pink shadow-lg shadow-tiktok-pink/5"
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                {item.icon} {item.name}
              </Link>
            );
          })}
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-4 text-zinc-600 font-bold p-3 hover:text-red-500 transition-colors border-t border-zinc-900 pt-6"
        >
          <LogOut size={20} /> Logout
        </button>
      </nav>

      {/* --- MOBILE BOTTOM NAVIGATION (Small Screens) --- */}
      <nav className="fixed bottom-0 left-0 w-full bg-black/80 backdrop-blur-lg border-t border-zinc-900 px-2 py-3 flex lg:hidden justify-around items-center z-50 pb-safe">
        {menu.map((item) => {
          const isActive = loc.pathname === item.path;
          const isControl = item.path === "/admin";

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 transition-all ${
                isActive
                  ? isControl
                    ? "text-emerald-400 scale-110"
                    : "text-tiktok-pink scale-110"
                  : "text-zinc-500"
              }`}
            >
              <div className={`${isActive ? "animate-pulse" : ""}`}>
                {item.icon}
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest">
                {item.name}
              </span>
            </Link>
          );
        })}

        {/* Mobile specific Logout */}
        <button
          onClick={logout}
          className="flex flex-col items-center gap-1 text-zinc-500 hover:text-red-500"
        >
          <LogOut size={22} />
          <span className="text-[9px] font-black uppercase tracking-widest">
            Exit
          </span>
        </button>
      </nav>
    </>
  );
}
