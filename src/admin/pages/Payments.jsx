import React from "react";
import { useApp } from "../../context/AppContext";
import { CheckCircle, XCircle, Clock, Send } from "lucide-react";

export default function Payments() {
  const { withdrawals = [], setWithdrawals, addCoins } = useApp();

  const handleApprove = (id) => {
    setWithdrawals((prev) =>
      prev.map((w) => (w.id === id ? { ...w, status: "approved" } : w)),
    );
  };

  const handleReject = (id) => {
    const withdrawal = withdrawals.find((w) => w.id === id);
    // ✅ Refund coins back to user on rejection
    if (withdrawal) addCoins(withdrawal.amount);
    setWithdrawals((prev) =>
      prev.map((w) => (w.id === id ? { ...w, status: "rejected" } : w)),
    );
  };

  const pending = withdrawals.filter((w) => w.status === "pending");
  const reviewed = withdrawals.filter((w) => w.status !== "pending");

  const totalPending = pending.reduce((acc, w) => acc + w.amount, 0);
  const totalPaid = reviewed
    .filter((w) => w.status === "approved")
    .reduce((acc, w) => acc + w.amount, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black italic text-white uppercase tracking-tighter">
          Payout Requests
        </h1>
        <p className="text-slate-500 text-sm">
          Review and process user withdrawal requests
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">
            Pending Requests
          </p>
          <p className="text-3xl font-black text-yellow-400">
            {pending.length}
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">
            Coins Pending
          </p>
          <p className="text-3xl font-black text-white">
            {totalPending.toLocaleString()}
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">
            Total Paid Out
          </p>
          <p className="text-3xl font-black text-emerald-400">
            {totalPaid.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Pending Requests */}
      <section className="space-y-4">
        <h2 className="text-xs font-black uppercase tracking-widest text-yellow-400">
          ⏳ Pending ({pending.length})
        </h2>

        {pending.length === 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-600 font-bold italic">
            No pending withdrawal requests.
          </div>
        )}

        {pending.map((w) => (
          <div
            key={w.id}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-black text-xs">
                  {w.userName?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-white font-black text-sm">{w.userName}</p>
                  <p className="text-slate-500 text-xs">{w.userId}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-2 pl-10">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-black">
                    Amount
                  </p>
                  <p className="text-emerald-400 font-black text-lg">
                    {w.amount.toLocaleString()} coins
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-black">
                    Send To
                  </p>
                  <p className="text-white font-bold text-sm flex items-center gap-1">
                    <Send size={12} /> {w.targetId}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-black">
                    Requested
                  </p>
                  <p className="text-slate-400 text-xs">
                    {new Date(w.requestedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 shrink-0">
              <button
                onClick={() => handleApprove(w.id)}
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-black px-5 py-2.5 rounded-2xl text-sm transition"
              >
                <CheckCircle size={16} /> Approve
              </button>
              <button
                onClick={() => handleReject(w.id)}
                className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-black px-5 py-2.5 rounded-2xl text-sm transition"
              >
                <XCircle size={16} /> Reject
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* History */}
      {reviewed.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-500">
            📋 History ({reviewed.length})
          </h2>
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-800/50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <th className="p-5">User</th>
                  <th className="p-5">Amount</th>
                  <th className="p-5">Send To</th>
                  <th className="p-5">Date</th>
                  <th className="p-5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {reviewed.map((w) => (
                  <tr key={w.id} className="hover:bg-slate-800/30 transition">
                    <td className="p-5">
                      <p className="text-white font-bold text-sm">
                        {w.userName}
                      </p>
                      <p className="text-slate-500 text-xs">{w.userId}</p>
                    </td>
                    <td className="p-5 text-emerald-400 font-black">
                      {w.amount.toLocaleString()}
                    </td>
                    <td className="p-5 text-slate-300 text-sm">{w.targetId}</td>
                    <td className="p-5 text-slate-500 text-xs">
                      {new Date(w.requestedAt).toLocaleDateString()}
                    </td>
                    <td className="p-5 text-center">
                      <span
                        className={`text-[10px] font-black px-3 py-1 rounded-full border uppercase ${
                          w.status === "approved"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-red-500/10 text-red-400 border-red-500/20"
                        }`}
                      >
                        {w.status === "approved" ? "✓ Paid" : "✗ Rejected"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
