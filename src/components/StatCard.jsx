import React from "react";

export default function StatCard({ title, value, icon, colorClass }) {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-3xl hover:border-zinc-700 transition-all group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">
            {title}
          </p>
          <h3 className="text-3xl font-black text-white group-hover:scale-105 transition-transform origin-left">
            {value}
          </h3>
        </div>
        <div
          className={`p-3 rounded-2xl ${colorClass || "bg-zinc-800 text-white"}`}
        >
          {icon}
        </div>
      </div>

      {/* Decorative Progress Bar Mini */}
      <div className="mt-4 w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
        <div
          className={`h-full bg-current ${colorClass.split(" ")[1]}`}
          style={{ width: "60%" }}
        ></div>
      </div>
    </div>
  );
}
