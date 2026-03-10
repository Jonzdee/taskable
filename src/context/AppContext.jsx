import React, { createContext, useState, useContext, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // ---------------- AUTH STATE ----------------
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // ---------------- APP DATA ----------------
  const [coins, setCoins] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);

  // ---------------- LOAD SESSION & DATA ----------------
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedCoins = localStorage.getItem("coins");
    const savedTasks = localStorage.getItem("tasks");

    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setIsLoggedIn(true);
      setCoins(parsedUser.coins || 0);
    }

    if (savedCoins) {
      setCoins(Number(savedCoins));
    }

    // Load tasks from localStorage or set defaults if empty
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
  }, []);

  // ---------------- PERSISTENCE ----------------
  // Save tasks whenever they change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  // Save user whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  // Save coins whenever they change
  useEffect(() => {
    localStorage.setItem("coins", coins);
  }, [coins]);

  // ---------------- AUTH ACTIONS ----------------
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
      isAdmin: userData?.isAdmin || false, // Important for Admin Login
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
    // Note: We don't clear tasks on logout so other users can see them
    localStorage.removeItem("user");
    localStorage.removeItem("coins");
  };

  const updateUser = (data) => {
    setUser((prev) => ({ ...prev, ...data }));
  };

  // ---------------- TASK ACTIONS ----------------
  const addTask = (newTask) => {
    setTasks((prev) => [
      {
        id: Date.now(), // Unique ID
        status: "available",
        ...newTask,
      },
      ...prev,
    ]);
  };

  const updateTaskStatus = (id, status) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === id ? { ...t, status } : t)),
    );
  };

  // ---------------- COIN SYSTEM ----------------
  const addCoins = (amount) => {
    setCoins((prev) => prev + amount);
    setUser((prev) =>
      prev ? { ...prev, coins: (prev.coins || 0) + amount } : prev,
    );
  };

  // ---------------- FRAUD SYSTEM ----------------
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

  // ---------------- ADMIN ACTIONS ----------------
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
    claimDailyBonus,
    adminVerifyTask,
    applyPenalty,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
