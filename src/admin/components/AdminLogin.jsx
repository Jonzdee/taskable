import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Mail,
  Lock,
  User,
  Key,
  ArrowRight,
  ChevronLeft,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { useNavigate, Link } from "react-router-dom";

export default function AdminLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    secretKey: "",
  });

  const { login, isLoggedIn, user } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (submitted && isLoggedIn && user?.isAdmin) {
      navigate("/admin");
    }
  }, [submitted, isLoggedIn, user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLogin && formData.secretKey !== "ADMIN123") {
      alert("Invalid Secret Access Key!");
      return;
    }

    login({ ...formData, isAdmin: true });
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 selection:bg-emerald-500">
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-white mb-8 transition-colors group"
        >
          <ChevronLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Site
        </Link>

        <div className="bg-slate-900 border border-slate-800 p-10 rounded-[2.5rem] shadow-2xl">
          <div className="text-center mb-10">
            <div className="inline-flex p-4 bg-emerald-500/10 rounded-3xl text-emerald-500 mb-4 border border-emerald-500/20">
              <ShieldCheck size={32} />
            </div>
            <h1 className="text-3xl font-black italic tracking-tighter text-white">
              {isLogin ? "ADMIN ACCESS" : "MODERATOR REGISTRATION"}
            </h1>
            <p className="text-slate-500 text-sm mt-2 font-medium">
              Secure entry for system administrators only.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="relative">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-emerald-500 outline-none transition font-medium"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="relative">
                  <Key
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500"
                    size={18}
                  />
                  <input
                    type="password"
                    placeholder="Secret Access Key"
                    required
                    className="w-full bg-slate-950 border border-emerald-500/30 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-emerald-500 outline-none transition font-medium"
                    onChange={(e) =>
                      setFormData({ ...formData, secretKey: e.target.value })
                    }
                  />
                </div>
              </>
            )}

            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                size={18}
              />
              <input
                type="email"
                placeholder="Admin Email"
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-emerald-500 outline-none transition font-medium"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                size={18}
              />
              <input
                type="password"
                placeholder="Password"
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-emerald-500 outline-none transition font-medium"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2 mt-6"
            >
              {isLogin ? "AUTHORIZE ENTRY" : "CREATE ACCOUNT"}{" "}
              <ArrowRight size={20} />
            </button>
          </form>

          <div className="mt-8 text-center text-sm">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-slate-500 hover:text-emerald-400 font-bold transition-colors"
            >
              {isLogin
                ? "Request Moderator Access"
                : "Already an Admin? Log In"}
            </button>
          </div>
        </div>

        <p className="text-center mt-8 text-slate-600 text-xs font-bold uppercase tracking-[0.2em]">
          Encrypted Terminal v2.0.4
        </p>
      </motion.div>
    </div>
  );
}
