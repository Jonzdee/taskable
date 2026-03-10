import React, { useState } from "react"; // Added useState
import { motion } from "framer-motion";
import {
  CheckCircle,
  ShieldAlert,
  MousePointerClick,
  Camera,
  Coins,
  ArrowRight,
  UserPlus,
  Lock,
} from "lucide-react";
import AuthModal from "../components/AuthModal"; // Import the Modal you created

export default function Landing() {
  // 1. Add state to control the modal
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-tiktok-pink selection:text-white">
      {/* 2. Include the AuthModal Component */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      {/* --- BACKGROUND GLOWS --- */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-tiktok-pink/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-tiktok-cyan/10 blur-[120px] rounded-full" />
      </div>

      {/* --- HERO SECTION --- */}
      <header className="relative pt-20 pb-16 px-6 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-md">
            <span className="text-tiktok-cyan text-xs font-bold tracking-widest uppercase">
              🚀 Join 10,000+ Earners
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-none">
            TURN YOUR <span className="text-tiktok-pink italic">SCROLL</span>{" "}
            <br />
            INTO <span className="text-tiktok-cyan">COINS</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            The most trusted platform to earn TikTok coins. Support creators by
            following, liking, and commenting, and get rewarded instantly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* 3. Changed Link to Button with onClick */}
            <button
              onClick={() => setIsAuthOpen(true)}
              className="bg-tiktok-pink text-white px-10 py-4 rounded-2xl font-black text-xl hover:scale-105 transition shadow-[0_0_30px_-5px_rgba(254,44,85,0.4)] flex items-center justify-center gap-2"
            >
              Start Earning <ArrowRight size={20} />
            </button>

            <a
              href="#rules"
              className="bg-zinc-900 border border-zinc-800 text-white px-10 py-4 rounded-2xl font-bold text-xl hover:bg-zinc-800 transition"
            >
              Read Rules
            </a>
          </div>
        </motion.div>
      </header>

      {/* --- PROCESS SECTION --- */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-black text-center mb-16 italic tracking-tight">
          HOW IT WORKS
        </h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          <StepCard
            icon={<MousePointerClick className="text-tiktok-cyan" />}
            step="01"
            title="Pick a Task"
            desc="Select from hundreds of follow or like tasks in your dashboard."
          />
          <StepCard
            icon={<UserPlus className="text-tiktok-pink" />}
            step="02"
            title="Complete Action"
            desc="Open the TikTok link and perform the requested action."
          />
          <StepCard
            icon={<Camera className="text-tiktok-cyan" />}
            step="03"
            title="Upload Proof"
            desc="Take a screenshot showing you followed/liked and upload it."
          />
          <StepCard
            icon={<Coins className="text-tiktok-pink" />}
            step="04"
            title="Get Coins"
            desc="Once verified, coins are added to your wallet for withdrawal."
          />
        </motion.div>
      </section>

      {/* --- RULES SECTION --- */}
      <section id="rules" className="py-20 px-6 bg-zinc-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-[3rem] p-8 md:p-12 shadow-2xl">
            <div className="flex items-center gap-3 mb-8">
              <ShieldAlert className="text-tiktok-pink" size={32} />
              <h2 className="text-3xl font-black italic tracking-tight">
                PROJECT RULES
              </h2>
            </div>

            <div className="space-y-6">
              <RuleItem
                title="Account Authenticity"
                desc="Your TikTok account must have a profile picture and at least 3 posts. Fake or empty accounts will be banned."
              />
              <RuleItem
                title="Don't Unfollow/Unlike"
                desc="Our system checks your status periodically. If you unfollow after earning, your account will be permanently locked."
              />
              <RuleItem
                title="Clear Screenshots"
                desc="The screenshot must clearly show the 'Following' button and your TikTok username in the corner."
              />
              <RuleItem
                title="One Account Policy"
                desc="Only one account per user/IP. Using multiple accounts to farm coins will result in zero payouts."
              />
              <RuleItem
                title="Verification Time"
                desc="Most tasks are verified in 2-12 hours. Please be patient while our moderators review your proof."
              />
            </div>

            <div className="mt-12 p-6 bg-tiktok-cyan/5 border border-tiktok-cyan/20 rounded-2xl flex items-start gap-4">
              <Lock className="text-tiktok-cyan shrink-0" />
              <p className="text-sm text-zinc-400">
                <span className="text-tiktok-cyan font-bold">
                  Privacy Note:
                </span>{" "}
                We never ask for your TikTok password. We only require your
                public username to verify tasks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 px-6 text-center border-t border-zinc-900">
        <p className="text-zinc-600 font-medium tracking-widest text-xs uppercase mb-4">
          © 2024 TikTok Rewards Project • All Rights Reserved
        </p>
        <div className="flex justify-center gap-8 text-zinc-500 text-sm">
          <a
            href="#"
            className="hover:text-tiktok-pink transition text-zinc-400"
          >
            Terms
          </a>
          <a
            href="#"
            className="hover:text-tiktok-pink transition text-zinc-400"
          >
            Privacy
          </a>
          <a
            href="#"
            className="hover:text-tiktok-pink transition text-zinc-400"
          >
            Support
          </a>
        </div>
      </footer>
    </div>
  );
}

// Sub-components
function StepCard({ icon, step, title, desc }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      className="relative p-8 bg-zinc-900/50 border border-zinc-800 rounded-3xl text-left hover:border-zinc-700 transition"
    >
      <div className="text-4xl font-black text-zinc-800 absolute top-4 right-6 uppercase italic">
        {step}
      </div>
      <div className="mb-6 p-4 bg-black w-fit rounded-2xl border border-zinc-800">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function RuleItem({ title, desc }) {
  return (
    <div className="flex gap-4">
      <CheckCircle className="text-tiktok-cyan shrink-0 mt-1" size={20} />
      <div>
        <h4 className="text-lg font-bold text-white leading-none mb-2">
          {title}
        </h4>
        <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
