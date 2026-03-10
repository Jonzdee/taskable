import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { Upload, CheckCircle, Clock, ImageIcon, X } from "lucide-react";

export default function TaskItem({ task }) {
  const { submitTaskProof, user } = useApp();
  const [showUpload, setShowUpload] = useState(false);
  const [preview, setPreview] = useState(null);
  const [base64, setBase64] = useState(null);
  const [submitted, setSubmitted] = useState(false);

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
    setSubmitted(true);
    setShowUpload(false);
  };

  const statusConfig = {
    available: {
      label: "Available",
      cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    pending: {
      label: "Under Review",
      cls: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    },
    completed: {
      label: "Completed ✓",
      cls: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    },
    rejected: {
      label: "Rejected",
      cls: "bg-red-500/10 text-red-400 border-red-500/20",
    },
  };

  const s = statusConfig[task.status] || statusConfig.available;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
      {/* Top Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="bg-black border border-zinc-700 text-emerald-400 text-xs font-black px-3 py-1 rounded-lg uppercase">
            {task.type}
          </span>
          <span className="text-white font-bold">{task.target}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-emerald-400 font-black text-lg">
            +{task.reward} coins
          </span>
          <span
            className={`text-[10px] font-black px-3 py-1 rounded-full border uppercase ${s.cls}`}
          >
            {s.label}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      {task.status === "available" && (
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => setShowUpload(!showUpload)}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-black px-5 py-2.5 rounded-2xl text-sm transition"
          >
            <Upload size={16} /> Submit Proof
          </button>
        </div>
      )}

      {task.status === "pending" && (
        <div className="flex items-center gap-2 text-yellow-400 text-xs font-bold">
          <Clock size={14} /> Waiting for admin verification...
        </div>
      )}

      {task.status === "completed" && (
        <div className="flex items-center gap-2 text-blue-400 text-xs font-bold">
          <CheckCircle size={14} /> Reward of {task.reward} coins has been added
          to your wallet!
        </div>
      )}

      {task.status === "rejected" && (
        <div className="space-y-2">
          <p className="text-red-400 text-xs font-bold">
            ❌ Submission rejected. You can resubmit.
          </p>
          <button
            onClick={() => setShowUpload(!showUpload)}
            className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-black px-5 py-2.5 rounded-2xl text-sm transition"
          >
            <Upload size={16} /> Resubmit Proof
          </button>
        </div>
      )}

      {/* Screenshot Upload Panel */}
      {showUpload && (
        <div className="bg-black border border-zinc-800 rounded-2xl p-5 space-y-4">
          <p className="text-xs font-black text-zinc-400 uppercase tracking-widest">
            Upload Screenshot Proof
          </p>

          {!preview ? (
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-700 rounded-2xl p-8 cursor-pointer hover:border-emerald-500 transition">
              <ImageIcon size={32} className="text-zinc-600 mb-2" />
              <span className="text-zinc-500 text-xs font-bold">
                Click to upload screenshot
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFile}
              />
            </label>
          ) : (
            <div className="relative">
              <img
                src={preview}
                alt="proof"
                className="w-full rounded-xl max-h-48 object-cover"
              />
              <button
                onClick={() => {
                  setPreview(null);
                  setBase64(null);
                }}
                className="absolute top-2 right-2 bg-black/70 p-1 rounded-full text-white hover:text-red-400"
              >
                <X size={16} />
              </button>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={!base64}
            className="w-full bg-emerald-500 disabled:opacity-40 hover:bg-emerald-400 text-black font-black py-3 rounded-2xl text-sm transition"
          >
            Submit for Review
          </button>
        </div>
      )}
    </div>
  );
}
