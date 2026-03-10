import React from "react";
import { Link } from "react-router-dom";
import {
  ExternalLink,
  CheckCircle2,
  Play,
  MessageCircle,
  UserPlus,
} from "lucide-react";

export default function TaskItem({ task }) {
  // Select icon based on task type
  const getIcon = () => {
    switch (task.type) {
      case "Follow":
        return <UserPlus size={20} />;
      case "Comment":
        return <MessageCircle size={20} />;
      default:
        return <Play size={20} fill="currentColor" />;
    }
  };

  return (
    <div className="relative overflow-hidden bg-zinc-900 border border-zinc-800 p-5 rounded-[2rem] flex flex-col md:flex-row md:items-center justify-between gap-4 group transition-all hover:bg-zinc-800/50">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        {/* Task Icon Circle */}
        <div className="w-14 h-14 bg-black border border-zinc-700 rounded-2xl flex items-center justify-center text-tiktok-pink group-hover:border-tiktok-pink transition-colors">
          {getIcon()}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-tighter bg-zinc-800 px-2 py-0.5 rounded text-zinc-400">
              TikTok {task.type}
            </span>

            {task.status === "pending" && (
              <span className="text-[10px] font-bold text-yellow-500 uppercase">
                Reviewing
              </span>
            )}

            {task.status === "completed" && (
              <span className="flex items-center gap-1 text-[10px] font-bold text-green-500 uppercase">
                <CheckCircle2 size={12} />
                Completed
              </span>
            )}
          </div>

          <h3 className="text-lg font-bold text-white mt-1 group-hover:text-tiktok-cyan transition-colors">
            {task.target}
          </h3>

          <p className="text-tiktok-pink font-black text-sm">
            +{task.reward} COINS
          </p>
        </div>
      </div>

      {/* Right Side Buttons */}
      <div className="flex items-center gap-3">
        {/* External Link */}
        <a
          href={`https://tiktok.com/search?q=${task.target}`}
          target="_blank"
          rel="noreferrer"
          className="p-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl transition-colors"
        >
          <ExternalLink size={18} />
        </a>

        {/* Verify Button */}
        <Link
          to={`/task/${task.id}`}
          className="flex items-center gap-2 px-4 py-2 bg-tiktok-pink text-white rounded-xl font-bold hover:opacity-90 transition"
        >
          <CheckCircle2 size={16} />
          Verify
        </Link>
      </div>
    </div>
  );
}
