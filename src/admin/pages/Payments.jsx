import React from "react";

export default function Payments() {
  const payments = [
    { id: 1, user: "John Doe", amount: "$25", status: "Pending" },
    { id: 2, user: "Jane Smith", amount: "$40", status: "Approved" },
    { id: 3, user: "Alex Johnson", amount: "$18", status: "Pending" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Payments</h1>

      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-800">
            <tr className="text-left text-sm text-slate-300">
              <th className="p-4">User</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-t border-slate-800">
                <td className="p-4">{payment.user}</td>
                <td className="p-4 text-emerald-400">{payment.amount}</td>
                <td className="p-4">{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
