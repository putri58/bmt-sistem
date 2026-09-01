import { Outlet } from "react-router-dom";

import Sidebar from "../components/admin/Sidebar";
import Navbar from "../components/admin/Navbar";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-50">

      <Sidebar />

      <div className="ml-64 min-h-screen">

        <Navbar />

        <main className="p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;