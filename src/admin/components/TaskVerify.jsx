import { useApp } from "../../context/AppContext";
import { CheckCircle, XCircle, Clock, Image } from "lucide-react";

export default function TaskVerify() {
  const { submissions, adminReviewSubmission } = useApp();

  const pending = submissions.filter((s) => s.status === "pending");
  const reviewed = submissions.filter((s) => s.status !== "pending");

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-black italic text-white uppercase tracking-tighter">
          Task Verifications
        </h1>
        <p className="text-slate-500 text-sm">
          Review user screenshot submissions
        </p>
      </div>

      {/* Pending */}
      <section className="space-y-4">
        <h2 className="text-xs font-black uppercase tracking-widest text-yellow-400">
          ⏳ Pending Review ({pending.length})
        </h2>

        {pending.length === 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-600 font-bold italic">
            No pending submissions.
          </div>
        )}

        {pending.map((sub) => (
          <div
            key={sub.id}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-black">{sub.userName}</p>
                <p className="text-slate-500 text-xs">{sub.userId}</p>
                <p className="text-slate-400 text-xs mt-1">
                  Task:{" "}
                  <span className="text-emerald-400 font-bold">
                    {sub.taskDetails?.type}
                  </span>{" "}
                  → {sub.taskDetails?.target} ·{" "}
                  <span className="text-emerald-400 font-bold">
                    +{sub.taskDetails?.reward} coins
                  </span>
                </p>
              </div>
              <span className="text-[10px] font-black px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 uppercase">
                Pending
              </span>
            </div>

            {/* Screenshot */}
            <div className="rounded-2xl overflow-hidden border border-slate-800">
              <img
                src={sub.screenshot}
                alt="proof"
                className="w-full max-h-64 object-contain bg-black"
              />
            </div>

            <p className="text-slate-600 text-[10px]">
              Submitted: {new Date(sub.submittedAt).toLocaleString()}
            </p>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => adminReviewSubmission(sub.id, true)}
                className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-black py-3 rounded-2xl transition"
              >
                <CheckCircle size={18} /> Approve & Pay
              </button>
              <button
                onClick={() => adminReviewSubmission(sub.id, false)}
                className="flex-1 flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-black py-3 rounded-2xl transition"
              >
                <XCircle size={18} /> Reject
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Reviewed History */}
      {reviewed.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-500">
            📋 Review History ({reviewed.length})
          </h2>
          {reviewed.map((sub) => (
            <div
              key={sub.id}
              className="bg-slate-900/50 border border-slate-800 rounded-3xl p-5 flex items-center justify-between"
            >
              <div>
                <p className="text-white font-bold text-sm">{sub.userName}</p>
                <p className="text-slate-500 text-xs">
                  {sub.taskDetails?.type} → {sub.taskDetails?.target}
                </p>
              </div>
              <span
                className={`text-[10px] font-black px-3 py-1 rounded-full border uppercase ${
                  sub.status === "approved"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : "bg-red-500/10 text-red-400 border-red-500/20"
                }`}
              >
                {sub.status}
              </span>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
