import {
  ClipboardList,
  Landmark,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useAnggota } from "../../context/AnggotaContext";

function Sidebar() {
  const { jumlahMenunggu } = useAnggota();

  const menu = [
    {
      name: "Pendaftaran Anggota",
      path: "/admin/pendaftaran-anggota",
      icon: ClipboardList,
      badge: jumlahMenunggu > 0 ? jumlahMenunggu : null,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-[#081936] text-white">

      {/* LOGO */}
      <div className="flex h-20 items-center gap-3 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-emerald-400">
          <Landmark size={22} />
        </div>
        <div>
          <h1 className="text-lg font-bold">KSPPS BMT</h1>
          <p className="text-[11px] text-slate-300">AL-ITTIHAD</p>
        </div>
      </div>

      {/* MENU */}
      <nav className="px-4">
        <p className="mb-3 px-3 pt-3 text-[11px] uppercase tracking-wider text-slate-500">
          Menu
        </p>
        {menu.map((item) => (
          <SidebarItem key={item.path} item={item} />
        ))}
      </nav>

      {/* ADMIN PROFILE */}
      <div className="absolute bottom-5 left-4 right-4">
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 font-semibold">
            AD
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">Admin Koperasi</p>
            <p className="text-xs text-slate-400">Super Admin</p>
          </div>
        </div>
      </div>

    </aside>
  );
}

function SidebarItem({ item }) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `mb-1 flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-all duration-200 ${
          isActive
            ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-lg shadow-blue-500/20"
            : "text-slate-300 hover:bg-white/10 hover:text-white"
        }`
      }
    >
      <Icon size={19} />
      <span>{item.name}</span>
      {item.badge && (
        <span className="ml-auto rounded-full bg-pink-500 px-2 py-0.5 text-[10px] font-semibold">
          {item.badge}
        </span>
      )}
    </NavLink>
  );
}

export default Sidebar;