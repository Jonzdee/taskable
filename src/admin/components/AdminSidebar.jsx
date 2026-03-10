import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  Users,
  CreditCard,
  MessageSquare,
  ShieldCheck,
  LogOut,
  Activity,
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function AdminSidebar() {
  const location = useLocation();
  const { logout, user } = useApp();

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: <LayoutDashboard size={20} /> },
    {
      name: "Verifications",
      path: "/admin/tasks",
      icon: <CheckSquare size={20} />,
    },
    {
      name: "User Management",
      path: "/admin/users",
      icon: <Users size={20} />,
    },
    {
      name: "Payout Requests",
      path: "/admin/payments",
      icon: <CreditCard size={20} />,
    },
    {
      name: "Support Tickets",
      path: "/admin/support",
      icon: <MessageSquare size={20} />,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-[#020617] border-r border-slate-800 flex flex-col z-50">
      {/* BRANDING */}
      <div className="p-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-emerald-500 p-2 rounded-xl shadow-[0_0_20px_-5px_rgba(16,185,129,0.5)]">
            <ShieldCheck className="text-black" size={24} />
          </div>
          <h1 className="text-xl font-black italic tracking-tighter text-white">
            CORE<span className="text-emerald-500">.</span>ADMIN
          </h1>
        </div>
        <div className="flex items-center gap-2 px-1">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
            System Online
          </span>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-4 space-y-2">
        <p className="px-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4">
          Main Menu
        </p>

        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all duration-300 group ${
                isActive
                  ? "bg-emerald-500/10 text-emerald-400 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)] border border-emerald-500/20"
                  : "text-slate-500 hover:text-slate-200 hover:bg-slate-900/50"
              }`}
            >
              <div
                className={`${isActive ? "text-emerald-400" : "text-slate-600 group-hover:text-slate-400"} transition-colors`}
              >
                {item.icon}
              </div>
              <span className="text-sm tracking-tight">{item.name}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* FOOTER / USER INFO */}
      <div className="p-4 mt-auto">
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-4 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/20 flex items-center justify-center text-emerald-500 font-black italic">
              {user?.name?.charAt(0) || "A"}
            </div>
            <div>
              <p className="text-xs font-black text-white leading-none mb-1 uppercase tracking-tighter">
                {user?.name || "Administrator"}
              </p>
              <p className="text-[10px] font-bold text-emerald-500/70 uppercase tracking-widest leading-none">
                Super Admin
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-800/50">
            <div className="flex items-center gap-2">
              <Activity size={12} className="text-slate-500" />
              <span className="text-[10px] font-bold text-slate-500">
                Uptime: 99.9%
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-2xl bg-red-500/5 text-red-500 font-black text-xs uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all duration-300 border border-red-500/10"
        >
          <LogOut size={16} /> Terminate Session
        </button>
      </div>
    </aside>
  );
}
