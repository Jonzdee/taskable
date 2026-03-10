import { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Upload,
  CheckCircle,
  Clock,
  ImageIcon,
  X,
  ExternalLink,
  Coins,
  UserPlus,
  Heart,
  MessageSquare,
  AlertCircle,
} from "lucide-react";

export default function TaskItem({ task }) {
  const { submitTaskProof } = useApp();
  const [showUpload, setShowUpload] = useState(false);
  const [preview, setPreview] = useState(null);
  const [base64, setBase64] = useState(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
      setBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!base64) return alert("Please upload a screenshot first!");
    submitTaskProof(task.id, base64, task);
    setShowUpload(false);
  };

  // Icon Logic
  const getTaskIcon = () => {
    const props = { size: 20, strokeWidth: 2.5, className: "shrink-0" };
    if (task.type === "Follow")
      return <UserPlus {...props} className="text-tiktok-pink" />;
    if (task.type === "Like")
      return (
        <Heart {...props} fill="currentColor" className="text-tiktok-pink" />
      );
    if (task.type === "Comment")
      return <MessageSquare {...props} className="text-tiktok-cyan" />;
    return <UserPlus {...props} />;
  };

  const statusConfig = {
    available: {
      label: "Available",
      cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    pending: {
      label: "In Review",
      cls: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    },
    completed: {
      label: "Approved",
      cls: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    },
    rejected: {
      label: "Declined",
      cls: "bg-red-500/10 text-red-400 border-red-500/20",
    },
  };

  const s = statusConfig[task.status] || statusConfig.available;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-4 md:p-6 transition-all active:scale-[0.99] hover:border-zinc-700 shadow-xl">
      {/* --- TOP SECTION: Task Header --- */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-black rounded-2xl flex items-center justify-center border border-zinc-800 shrink-0">
            {getTaskIcon()}
          </div>
          <div className="min-w-0">
            <span
              className={`text-[9px] md:text-[10px] font-black px-2 py-0.5 rounded-md border uppercase tracking-widest ${s.cls}`}
            >
              {s.label}
            </span>
            <h3 className="text-white font-bold text-sm md:text-lg truncate mt-1 tracking-tight">
              {task.target}
            </h3>
          </div>
        </div>

        {/* Reward Display */}
        <div className="text-right shrink-0">
          <div className="flex items-center justify-end gap-1 text-emerald-400 font-black italic">
            <Coins size={14} strokeWidth={3} className="shrink-0" />
            <span className="text-lg md:text-xl leading-none">
              +{task.reward}
            </span>
          </div>
          <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-tighter">
            Coins
          </p>
        </div>
      </div>

      {/* --- MIDDLE SECTION: Status Messages --- */}
      <div className="space-y-3">
        {task.status === "pending" && (
          <div className="flex items-center gap-2 text-yellow-500/80 text-[10px] font-bold uppercase tracking-widest bg-yellow-500/5 p-3 rounded-xl border border-yellow-500/10">
            <Clock size={14} className="animate-pulse shrink-0" /> Admin is
            verifying your proof...
          </div>
        )}

        {task.status === "completed" && (
          <div className="flex items-center gap-2 text-blue-400 text-[10px] font-bold uppercase tracking-widest bg-blue-500/5 p-3 rounded-xl border border-blue-500/10">
            <CheckCircle size={14} className="shrink-0" /> Reward added to your
            wallet
          </div>
        )}

        {task.status === "rejected" && (
          <div className="flex items-center gap-2 text-red-400 text-[10px] font-bold uppercase tracking-widest bg-red-500/5 p-3 rounded-xl border border-red-500/10">
            <AlertCircle size={14} className="shrink-0" /> Rejected. Please try
            again.
          </div>
        )}
      </div>

      {/* --- BOTTOM SECTION: Actions --- */}
      <div className="flex gap-2 items-center mt-4">
        {/* External Link Button */}
        <a
          href="https://tiktok.com"
          target="_blank"
          rel="noreferrer"
          className="bg-zinc-800 text-zinc-400 p-3 rounded-xl hover:text-white transition-colors shrink-0"
        >
          <ExternalLink size={18} />
        </a>

        {/* Dynamic Action Button */}
        {(task.status === "available" || task.status === "rejected") && (
          <button
            onClick={() => setShowUpload(!showUpload)}
            className="flex-1 bg-white text-black py-3 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest italic hover:bg-tiktok-cyan transition-all shadow-lg active:scale-95"
          >
            {task.status === "rejected" ? "Resubmit Proof" : "Start Mission"}
            <Upload size={14} strokeWidth={3} />
          </button>
        )}
      </div>

      {/* --- UPLOAD PANEL: Nested & Responsive --- */}
      {showUpload && (
        <div className="mt-4 pt-4 border-t border-zinc-800 space-y-4 animate-in fade-in slide-in-from-top-2">
          {!preview ? (
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 bg-black rounded-2xl p-6 md:p-10 cursor-pointer hover:border-emerald-500/50 transition-all group">
              <ImageIcon
                size={32}
                className="text-zinc-700 mb-2 group-hover:text-emerald-500 transition-colors"
              />
              <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">
                Upload Screenshot
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFile}
              />
            </label>
          ) : (
            <div className="relative group rounded-2xl overflow-hidden border border-zinc-800">
              <img
                src={preview}
                alt="proof"
                className="w-full aspect-video md:aspect-square object-cover"
              />
              <button
                onClick={() => {
                  setPreview(null);
                  setBase64(null);
                }}
                className="absolute top-2 right-2 bg-black/80 p-2 rounded-full text-white hover:text-red-500 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={!base64}
            className="w-full bg-emerald-500 disabled:opacity-30 hover:bg-emerald-400 text-black font-black py-4 rounded-xl text-xs uppercase tracking-[0.2em] transition-all shadow-lg shadow-emerald-500/10"
          >
            Submit for Review
          </button>
        </div>
      )}
    </div>
  );
}
