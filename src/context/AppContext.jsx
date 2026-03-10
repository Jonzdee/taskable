import React, { createContext, useState, useContext, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // ---------------- SYNCHRONOUS INITIALIZATION ----------------
  // This runs IMMEDIATELY during the first render, preventing the redirect bug.

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("user") !== null;
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [coins, setCoins] = useState(() => {
    const saved = localStorage.getItem("coins");
    return saved !== null ? Number(saved) : 0;
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 1,
        type: "Follow",
        target: "@tiktok_star",
        reward: 150,
        status: "available",
      },
      {
        id: 2,
        type: "Like",
        target: "Trending Video #1",
        reward: 50,
        status: "available",
      },
    ];
  });

  const [submissions, setSubmissions] = useState(() => {
    const saved = localStorage.getItem("submissions");
    return saved ? JSON.parse(saved) : [];
  });

  const [withdrawals, setWithdrawals] = useState(() => {
    const saved = localStorage.getItem("withdrawals");
    return saved ? JSON.parse(saved) : [];
  });

  const [tickets, setTickets] = useState([]);

  // ---------------- PERSISTENCE ----------------
  // Sync state changes back to localStorage automatically
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", "true");
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("coins", String(coins));
  }, [coins]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("submissions", JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem("withdrawals", JSON.stringify(withdrawals));
  }, [withdrawals]);

  // ---------------- AUTH ----------------
  const login = (userData) => {
    const isSystemAdmin =
      userData?.email?.toLowerCase().trim() === "admin@test.com";

    const newUser = {
      name: userData?.name || "New User",
      email: userData?.email || "",
      tiktokHandle: userData?.tiktokHandle || "@username",
      referralCode: `TIK-${Math.floor(1000 + Math.random() * 9000)}`,
      referrals: 0,
      trustScore: 100,
      lastCheckIn: null,
      isAdmin: isSystemAdmin || userData?.isAdmin || false,
      ...userData,
    };

    setUser(newUser);
    setCoins(newUser.coins || 0);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setCoins(0);
    localStorage.clear();
    window.location.href = "/"; // Force redirect to landing
  };

  const updateUser = (data) => {
    setUser((prev) => ({ ...prev, ...data }));
  };

  // ---------------- TASKS ----------------
  const addTask = (newTask) => {
    setTasks((prev) => [
      { id: Date.now(), status: "available", ...newTask },
      ...prev,
    ]);
  };

  const updateTaskStatus = (id, status) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  };

  // ---------------- COINS ----------------
  const addCoins = (amount) => {
    setCoins((prev) => prev + amount);
    // User object coins stay in sync via the useEffect monitoring [user]
    setUser((prev) =>
      prev ? { ...prev, coins: (prev.coins || 0) + amount } : prev,
    );
  };

  const applyPenalty = (penaltyAmount, trustReduction) => {
    setCoins((prev) => Math.max(0, prev - penaltyAmount));
    setUser((prev) =>
      prev
        ? {
            ...prev,
            coins: Math.max(0, (prev.coins || 0) - penaltyAmount),
            trustScore: Math.max(0, (prev.trustScore || 0) - trustReduction),
          }
        : prev,
    );
  };

  // ---------------- DAILY BONUS ----------------
  const claimDailyBonus = () => {
    if (!user) return false;
    const today = new Date().toISOString().split("T")[0];
    if (user.lastCheckIn === today) {
      alert("Already claimed today!");
      return false;
    }
    addCoins(15);
    updateUser({ lastCheckIn: today });
    return true;
  };

  // ---------------- SUBMISSIONS ----------------
  const submitTaskProof = (taskId, screenshotBase64, taskDetails) => {
    const submission = {
      id: Date.now(),
      taskId,
      userId: user?.email,
      userName: user?.name,
      screenshot: screenshotBase64,
      taskDetails,
      status: "pending",
      submittedAt: new Date().toISOString(),
    };
    setSubmissions((prev) => [submission, ...prev]);
    updateTaskStatus(taskId, "pending");
  };

  const adminReviewSubmission = (submissionId, approved) => {
    setSubmissions((prev) =>
      prev.map((s) => {
        if (s.id !== submissionId) return s;
        if (approved) {
          addCoins(s.taskDetails.reward);
          updateTaskStatus(s.taskId, "completed");
          return { ...s, status: "approved" };
        } else {
          updateTaskStatus(s.taskId, "available");
          return { ...s, status: "rejected" };
        }
      }),
    );
  };

  const adminVerifyTask = (taskId, isApproved, reward) => {
    if (isApproved) {
      addCoins(reward);
      updateTaskStatus(taskId, "completed");
    } else {
      updateTaskStatus(taskId, "available");
      applyPenalty(reward, 10);
    }
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
        updateUser,
        coins,
        setCoins,
        addCoins,
        applyPenalty,
        tasks,
        setTasks,
        addTask,
        updateTaskStatus,
        tickets,
        setTickets,
        withdrawals,
        setWithdrawals,
        submissions,
        submitTaskProof,
        adminReviewSubmission,
        claimDailyBonus,
        adminVerifyTask,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
