import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, ArrowRight, Info } from "lucide-react";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Pass actual form data to the login function
    login({ 
      email: email, 
      name: name || "TikToker_Pro" 
    });

    onClose();
    
    // Small delay to ensure state is set before navigating
    setTimeout(() => {
      navigate("/dashboard");
    }, 100);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 z-[60] shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute right-6 top-6 text-zinc-500 hover:text-white"
            >
              <X />
            </button>

            <div className="text-center mb-6">
              <h2 className="text-3xl font-black italic tracking-tighter">
                {isLogin ? "WELCOME BACK" : "JOIN THE PROJECT"}
              </h2>
              <p className="text-zinc-500 text-sm mt-2">
                {isLogin ? "Log in to continue earning" : "Create an account to start earning"}
              </p>
            </div>

          
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="relative">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-tiktok-pink outline-none transition"
                    required
                  />
                </div>
              )}
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                  size={18}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-tiktok-pink outline-none transition"
                  required
                />
              </div>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                  size={18}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full bg-black border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-tiktok-pink outline-none transition"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-tiktok-pink text-white py-4 rounded-2xl font-black text-lg hover:scale-[1.02] active:scale-95 transition shadow-lg shadow-tiktok-pink/20 flex items-center justify-center gap-2 mt-4"
              >
                {isLogin ? "LOG IN" : "GET STARTED"} <ArrowRight size={20} />
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-zinc-500">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-tiktok-cyan font-bold hover:underline"
              >
                {isLogin ? "Sign Up" : "Log In"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}