import { Navigate, Outlet } from "react-router-dom";
import { useApp } from "../context/AppContext";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const { isLoggedIn, user } = useApp();

  if (!isLoggedIn) return <Navigate to="/" replace />;
  if (!user) return null; // wait for state
  if (!user.isAdmin) return <Navigate to="/dashboard" replace />;

  return (
    <div className="flex bg-[#020617] min-h-screen text-white border-t-4 border-emerald-500">
      <AdminSidebar />

      <main className="flex-1 p-4 md:p-8 lg:ml-64 pb-24 lg:pb-8">
        <Outlet /> {/* ✅ Render nested routes */}
      </main>
    </div>
  );
};

export default AdminLayout;
