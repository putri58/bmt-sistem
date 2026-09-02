import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, User, Wallet, CreditCard,
  Receipt, ArrowLeftRight, LogOut, Menu, X, Bell, ChevronDown,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const LOGO_URL =
  "https://ykpialittihad.or.id/wp-content/uploads/2025/01/logo-web-ykpi-al-ittihad.png";

const menuMember = [
  { name: "Dashboard",  path: "/member/dashboard",  icon: LayoutDashboard },
  { name: "Profil",     path: "/member/profil",      icon: User },
  { name: "Simpanan",   path: "/member/simpanan",    icon: Wallet },
  { name: "Pinjaman",   path: "/member/pinjaman",    icon: CreditCard },
  { name: "Angsuran",   path: "/member/angsuran",    icon: Receipt },
  { name: "Transaksi",  path: "/member/transaksi",   icon: ArrowLeftRight },
];

function NavItem({ item, onClick }) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.path}
      onClick={onClick}
      className={({ isActive }) =>
        `mb-0.5 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
          isActive
            ? "bg-green-500/20 text-green-400"
            : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon size={17} className={isActive ? "text-green-400" : "text-slate-500"} />
          <span>{item.name}</span>
        </>
      )}
    </NavLink>
  );
}

/* ─── SIDEBAR CONTENT (shared antara desktop + mobile) ─── */
function SidebarContent({ onClose, currentUser, handleLogout }) {
  const nama     = currentUser?.nama || "Anggota";
  const nomor    = currentUser?.nomorAnggota || "-";
  const initials = nama.split(" ").map((w) => w[0]).slice(0, 2).join("");

  return (
    <div className="flex h-full flex-col bg-[#0f172a]">

      {/* LOGO */}
      <div className="flex h-20 shrink-0 items-center justify-between border-b border-white/5 px-5">
        <div className="flex items-center justify-center rounded-xl bg-white px-3 py-2">
          <img
            src={LOGO_URL}
            alt="Logo YKPI Al Ittihad"
            className="h-10 w-auto object-contain"
          />
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white lg:hidden">
            <X size={20} />
          </button>
        )}
      </div>

      {/* MENU */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 [scrollbar-width:none]">
        <p className="mb-1 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-600">
          Menu Anggota
        </p>
        {menuMember.map((item) => (
          <NavItem key={item.path} item={item} onClick={onClose} />
        ))}
      </nav>

      {/* LOGOUT */}
      <div className="shrink-0 border-t border-white/5 px-3 py-2">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut size={17} className="text-slate-500" />
          Keluar
        </button>
      </div>

      {/* PROFILE */}
      <div className="shrink-0 border-t border-white/5 p-3">
        <div className="flex items-center gap-3 rounded-lg bg-white/5 p-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500 text-xs font-bold text-white">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-200 leading-tight">{nama}</p>
            <p className="text-[11px] text-slate-500">{nomor}</p>
          </div>
        </div>
      </div>

    </div>
  );
}

/* ─── MAIN LAYOUT ─── */
export default function MemberLayout() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const nama     = currentUser?.nama || "Anggota";
  const initials = nama.split(" ").map((w) => w[0]).slice(0, 2).join("");

  return (
    <div className="min-h-screen bg-slate-50">

      {/* SIDEBAR DESKTOP */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 lg:block">
        <SidebarContent currentUser={currentUser} handleLogout={handleLogout} />
      </aside>

      {/* SIDEBAR MOBILE OVERLAY */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-64">
            <SidebarContent
              onClose={() => setSidebarOpen(false)}
              currentUser={currentUser}
              handleLogout={handleLogout}
            />
          </aside>
        </div>
      )}

      {/* MAIN */}
      <div className="flex min-h-screen flex-col lg:ml-64">

        {/* TOPBAR */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5 shadow-sm">

          {/* Hamburger (mobile) */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <Menu size={20} />
          </button>

          {/* Logo mini mobile */}
          <span className="text-sm font-semibold text-slate-600 lg:hidden">
            KSPPS BMT Al Ittihad
          </span>

          {/* Space (desktop) */}
          <div className="hidden lg:block" />

          {/* Right side */}
          <div className="flex items-center gap-3">

            {/* Bell */}
            <button className="relative rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
              <Bell size={19} />
              <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-green-500" />
            </button>

            {/* Profile chip */}
            <button className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 transition hover:bg-slate-100">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500 text-[11px] font-bold text-white">
                {initials}
              </div>
              <span className="hidden max-w-[120px] truncate text-sm font-medium text-slate-700 md:block">
                {nama}
              </span>
              <ChevronDown size={14} className="text-slate-400" />
            </button>

          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-5 md:p-8">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
