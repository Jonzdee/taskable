import React, { createContext, useState, useContext, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  // ---------------- LOAD FROM LOCALSTORAGE ----------------
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedTasks = localStorage.getItem("tasks");
    const savedSubmissions = localStorage.getItem("submissions");
    const savedWithdrawals = localStorage.getItem("withdrawals"); // ✅ NEW
    const savedCoins = localStorage.getItem("coins");

    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setIsLoggedIn(true);
    }

    // ✅ Load coins from dedicated key (most up to date)
    if (savedCoins !== null) {
      setCoins(Number(savedCoins));
    } else if (savedUser) {
      setCoins(JSON.parse(savedUser).coins || 0);
    }

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      const defaultTasks = [
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
      setTasks(defaultTasks);
      localStorage.setItem("tasks", JSON.stringify(defaultTasks));
    }

    if (savedSubmissions) setSubmissions(JSON.parse(savedSubmissions));
    if (savedWithdrawals) setWithdrawals(JSON.parse(savedWithdrawals)); // ✅ NEW
  }, []);

  // ---------------- PERSIST TO LOCALSTORAGE ----------------
  useEffect(() => {
    if (tasks.length > 0) localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("coins", String(coins)); // ✅ always save as string
  }, [coins]);

  useEffect(() => {
    localStorage.setItem("submissions", JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem("withdrawals", JSON.stringify(withdrawals)); // ✅ NEW
  }, [withdrawals]);

  // ---------------- AUTH ----------------
  const login = (userData) => {
    const newUser = {
      name: userData?.name || "New User",
      email: userData?.email || "",
      tiktokHandle: userData?.tiktokHandle || "@username",
      referralCode: `TIK-${Math.floor(1000 + Math.random() * 9000)}`,
      referrals: 0,
      trustScore: 100,
      lastCheckIn: null,
      coins: 0,
      isAdmin: userData?.isAdmin || false,
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
    localStorage.removeItem("user");
    localStorage.removeItem("coins");
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
    setCoins((prev) => {
      const updated = prev + amount;
      localStorage.setItem("coins", String(updated)); // ✅ immediate persist
      return updated;
    });
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, coins: (prev.coins || 0) + amount };
      localStorage.setItem("user", JSON.stringify(updated)); // ✅ immediate persist
      return updated;
    });
  };

  const applyPenalty = (penaltyAmount, trustReduction) => {
    setCoins((prev) => Math.max(0, prev - penaltyAmount));
    setUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        coins: Math.max(0, (prev.coins || 0) - penaltyAmount),
        trustScore: Math.max(0, (prev.trustScore || 0) - trustReduction),
      };
    });
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
    setSubmissions((prev) => {
      const updated = [submission, ...prev];
      localStorage.setItem("submissions", JSON.stringify(updated)); // ✅ immediate persist
      return updated;
    });
    updateTaskStatus(taskId, "pending");
  };

  const adminReviewSubmission = (submissionId, approved) => {
    setSubmissions((prev) => {
      const updated = prev.map((s) => {
        if (s.id !== submissionId) return s;
        if (approved) {
          addCoins(s.taskDetails.reward); // ✅ coins added immediately
          updateTaskStatus(s.taskId, "completed");
          return { ...s, status: "approved" };
        } else {
          updateTaskStatus(s.taskId, "available");
          return { ...s, status: "rejected" };
        }
      });
      localStorage.setItem("submissions", JSON.stringify(updated)); // ✅ immediate persist
      return updated;
    });
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

  // ---------------- CONTEXT VALUE ----------------
  const value = {
    isLoggedIn,
    user,
    login,
    logout,
    updateUser,
    coins,
    setCoins,
    addCoins,
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
    applyPenalty,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
