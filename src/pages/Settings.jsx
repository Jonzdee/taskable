import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useApp } from "../context/AppContext";
import {
  User,
  Bell,
  ShieldCheck,
  Trash2,
  Camera,
  Save,
  Smartphone,
  CheckCircle2,
} from "lucide-react";

export default function Settings() {
  const { user, updateUser } = useApp();

  // Local state for forms
  const [name, setName] = useState(user?.name || "");
  const [tiktokHandle, setTiktokHandle] = useState(
    user?.tiktokHandle || "@user_id",
  );
  const [notifications, setNotifications] = useState({
    tasks: true,
    promos: false,
  });
  const [saveStatus, setSaveStatus] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateUser({ name, tiktokHandle });
    setSaveStatus(true);
    setTimeout(() => setSaveStatus(false), 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-3xl mx-auto p-6 pb-20 space-y-8">
        {/* Header */}
        <header>
          <h1 className="text-4xl font-black italic tracking-tighter">
            SETTINGS
          </h1>
          <p className="text-zinc-500">
            Manage your profile and account preferences
          </p>
        </header>

        <form onSubmit={handleSave} className="space-y-6">
          {/* PROFILE SECTION */}
          <section className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
              <User className="text-tiktok-pink" size={20} />
              <h2 className="text-xl font-bold italic uppercase tracking-tight">
                Public Profile
              </h2>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Avatar Upload Simulation */}
              <div className="relative group">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-tiktok-pink to-tiktok-cyan p-1">
                  <div className="w-full h-full rounded-full bg-zinc-800 flex items-center justify-center text-3xl font-black italic">
                    {name.charAt(0)}
                  </div>
                </div>
                <label className="absolute bottom-0 right-0 bg-white text-black p-2 rounded-full cursor-pointer hover:bg-tiktok-cyan transition shadow-lg">
                  <Camera size={16} />
                  <input type="file" className="hidden" />
                </label>
              </div>

              <div className="flex-1 w-full space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 focus:border-tiktok-pink outline-none transition"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                    TikTok Handle
                  </label>
                  <input
                    type="text"
                    value={tiktokHandle}
                    onChange={(e) => setTiktokHandle(e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 focus:border-tiktok-cyan outline-none transition"
                    placeholder="@yourusername"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* PREFERENCES SECTION */}
          <section className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
              <Bell className="text-tiktok-cyan" size={20} />
              <h2 className="text-xl font-bold italic uppercase tracking-tight">
                Notifications
              </h2>
            </div>

            <div className="space-y-4">
              <ToggleRow
                label="New Task Alerts"
                desc="Get notified when high-paying tasks are available."
                active={notifications.tasks}
                onClick={() =>
                  setNotifications({
                    ...notifications,
                    tasks: !notifications.tasks,
                  })
                }
              />
              <ToggleRow
                label="Marketing Emails"
                desc="Weekly digests of your earnings and top earners."
                active={notifications.promos}
                onClick={() =>
                  setNotifications({
                    ...notifications,
                    promos: !notifications.promos,
                  })
                }
              />
            </div>
          </section>

          {/* SECURITY SECTION */}
          {/* SECURITY SECTION */}
          <section className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
              <ShieldCheck className="text-emerald-400" size={20} />
              <h2 className="text-xl font-bold italic uppercase tracking-tight">
                Security
              </h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 focus:border-tiktok-pink outline-none transition"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 focus:border-tiktok-pink outline-none transition"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-black border border-zinc-800 rounded-2xl">
                <div className="flex items-center gap-3">
                  <Smartphone className="text-zinc-500" />
                  <div>
                    <p className="text-sm font-bold">
                      Two-Factor Authentication
                    </p>
                    <p className="text-xs text-zinc-500">
                      Add an extra layer of security
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-xs font-black text-tiktok-cyan border border-tiktok-cyan/30 px-4 py-2 rounded-lg hover:bg-tiktok-cyan hover:text-black transition"
                >
                  ENABLE
                </button>
              </div>
            </div>
          </section>

          {/* DANGER ZONE */}
          <section className="bg-red-500/5 border border-red-500/20 rounded-[2.5rem] p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-red-500/10 pb-4">
              <Trash2 className="text-red-500" size={20} />
              <h2 className="text-xl font-bold italic uppercase tracking-tight text-red-500">
                Danger Zone
              </h2>
            </div>
            <p className="text-sm text-zinc-500">
              Deleting your account is permanent. All your earned coins will be
              forfeited and cannot be recovered.
            </p>
            <button
              type="button"
              className="bg-red-500/10 hover:bg-red-500 text-red-500 px-6 py-3 rounded-xl font-bold text-sm transition"
            >
              Delete Account
            </button>
          </section>

          {/* FLOATING SAVE BAR (MOBILE READY) */}
          <div className="sticky bottom-6 flex justify-center">
            <button
              type="submit"
              className={`flex items-center gap-2 px-10 py-4 rounded-full font-black text-lg transition shadow-2xl ${
                saveStatus
                  ? "bg-emerald-500 text-white"
                  : "bg-tiktok-pink text-white hover:scale-105 active:scale-95 shadow-tiktok-pink/40"
              }`}
            >
              {saveStatus ? (
                <>
                  <CheckCircle2 /> SAVED!
                </>
              ) : (
                <>
                  <Save size={20} /> SAVE CHANGES
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Sub-component: Toggle Row
function ToggleRow({ label, desc, active, onClick }) {
  return (
    <div className="flex items-center justify-between gap-4 p-2">
      <div>
        <p className="font-bold text-white">{label}</p>
        <p className="text-xs text-zinc-500 max-w-[200px] md:max-w-xs">
          {desc}
        </p>
      </div>
      <button
        type="button"
        onClick={onClick}
        className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none ${
          active ? "bg-tiktok-cyan" : "bg-zinc-700"
        }`}
      >
        <div
          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
            active ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
