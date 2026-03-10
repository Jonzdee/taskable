import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Wallet from "./pages/Wallet";
import Settings from "./pages/Settings";
import Admin from "./admin/pages/Admin";
import TaskVerify from "./admin/components/TaskVerify";
import Sidebar from "./components/Sidebar";
import Users from "./admin/pages/Users";
import Support from "./admin/pages/Support";
import Tasks from "./admin/pages/Tasks";
import Payments from "./admin/pages/Payments";
import AdminLogin from "./admin/components/AdminLogin";
import AdminLayout from "./admin/components/AdminLayout"; // ✅ import from file

const ProtectedLayout = ({ children }) => {
  const { isLoggedIn } = useApp();
  if (!isLoggedIn) return <Navigate to="/" replace />;
  return (
    <div className="flex bg-black min-h-screen text-white overflow-x-hidden">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 lg:ml-64 pb-24 lg:pb-8">
        {children}
      </main>
    </div>
  );
};

// ✅ AdminLayout is now imported from its own file — removed from here

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedLayout>
                <Dashboard />
              </ProtectedLayout>
            }
          />
          <Route
            path="/wallet"
            element={
              <ProtectedLayout>
                <Wallet />
              </ProtectedLayout>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedLayout>
                <Settings />
              </ProtectedLayout>
            }
          />
          <Route
            path="/verify/:id"
            element={
              <ProtectedLayout>
                <TaskVerify />
              </ProtectedLayout>
            }
          />

          {/* --- ADMIN ROUTES --- */}
          <Route path="/admin" element={<AdminLayout />}>
            {" "}
            {/* ✅ uses Outlet now */}
            <Route index element={<Admin />} />
            <Route path="users" element={<Users />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="payments" element={<Payments />} />
            <Route path="support" element={<Support />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}
