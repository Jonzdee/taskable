import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Wallet from "./admin/pages/Wallet";
import Settings from "./pages/Settings";
import Admin from "./admin/pages/Admin";
import TaskVerify from "./pages/TaskVerify";
import Sidebar from "./components/Sidebar";
import Users from "./admin/pages/Users";
import Support from "./admin/pages/Support";
import Tasks from "./admin/pages/Tasks";
import Payments from "./admin/pages/Payments";
import AdminLogin from "./admin/components/AdminLogin";
import AdminSidebar from "./admin/components/AdminSidebar";
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

const AdminLayout = ({ children }) => {
  const { isLoggedIn, user } = useApp();
  if (!isLoggedIn) return <Navigate to="/" replace />;
  if (isLoggedIn && !user) return null; // Wait for state
  if (!user?.isAdmin) return <Navigate to="/dashboard" replace />;
  return (
    <div className="flex bg-[#020617] min-h-screen text-white border-t-4 border-emerald-500">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-8 lg:ml-64 pb-24 lg:pb-8">
        {children}
      </main>
    </div>
  );
};

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
            {/* 'index' means this is what shows at exactly "/admin" */}
            <Route index element={<Admin/>} />

            {/* These are nested: "/admin/users", "/admin/tasks", etc. */}
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
