import React from "react";

export default function Users() {
  const users = [
    { id: 1, name: "John Doe", email: "john@test.com", earnings: "$45" },
    { id: 2, name: "Jane Smith", email: "jane@test.com", earnings: "$72" },
    { id: 3, name: "Alex Johnson", email: "alex@test.com", earnings: "$31" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Users</h1>

      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-800">
            <tr className="text-left text-sm text-slate-300">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Earnings</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-slate-800">
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4 text-emerald-400">{user.earnings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
