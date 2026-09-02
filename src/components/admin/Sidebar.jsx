import {
  LayoutDashboard,
  ClipboardList,
  Users,
  Wallet,
  CreditCard,
  Receipt,
  ArrowLeftRight,
  ChartColumn,
  Newspaper,
  Megaphone,
  UserCog,
  Settings,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useAnggota } from "../../context/AnggotaContext";
import { useAuth }    from "../../context/AuthContext";

const LOGO_URL =
  "https://ykpialittihad.or.id/wp-content/uploads/2025/01/logo-web-ykpi-al-ittihad.png";

const menuUtama = [
  { name: "Dashboard",           path: "/admin/dashboard",           icon: LayoutDashboard },
  { name: "Pendaftaran Anggota", path: "/admin/pendaftaran-anggota", icon: ClipboardList },
  { name: "Kelola Anggota",      path: "/admin/anggota",             icon: Users },
  { name: "Simpanan",            path: "/admin/simpanan",            icon: Wallet },
  { name: "Pinjaman",            path: "/admin/pinjaman",            icon: CreditCard },
  { name: "Angsuran",            path: "/admin/pengajuan",           icon: Receipt },
  { name: "Transaksi",           path: "/admin/transaksi",           icon: ArrowLeftRight },
  { name: "Laporan",             path: "/admin/laporan",             icon: ChartColumn },
];

const menuInformasi = [
  { name: "Berita & Informasi", path: "/admin/informasi",  icon: Newspaper },
  { name: "Pengumuman",         path: "/admin/pengumuman", icon: Megaphone },
];

const menuSistem = [
  { name: "Manajemen Admin", path: "/admin/manajemen-admin", icon: UserCog },
  { name: "Pengaturan",      path: "/admin/pengaturan",      icon: Settings },
];

function SidebarItem({ item }) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.path}
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
          {item.badge && (
            <span className="ml-auto rounded-full bg-green-500 px-2 py-0.5 text-[10px] font-bold text-white">
              {item.badge}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
}

function SectionLabel({ children }) {
  return (
    <p className="mb-1 mt-5 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-600 first:mt-0">
      {children}
    </p>
  );
}

export default function Sidebar() {
  const { jumlahMenunggu } = useAnggota();
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const nama     = currentUser?.nama  || "Admin Koperasi";
  const email    = currentUser?.email || "admin@bmtalittihad.id";
  const initials = nama.split(" ").map((w) => w[0]).slice(0, 2).join("");

  const menuUtamaWithBadge = menuUtama.map((item) =>
    item.path === "/admin/pendaftaran-anggota" && jumlahMenunggu > 0
      ? { ...item, badge: jumlahMenunggu }
      : item
  );

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-[#0f172a]">

      {/* ── LOGO ── */}
      <div className="flex h-20 shrink-0 items-center justify-center border-b border-white/5 px-5">
        <div className="flex items-center justify-center rounded-xl bg-white px-3 py-2">
          <img
            src={LOGO_URL}
            alt="Logo YKPI Al Ittihad"
            className="h-10 w-auto object-contain"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          {/* Fallback jika gambar gagal load */}
          <div style={{ display: "none" }}
            className="items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 text-xs font-black text-white">
              KSP
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-tight">KSPPS BMT</p>
              <p className="text-[10px] text-green-400">Al Ittihad</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── NAV ── */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 [scrollbar-width:none]">

        <SectionLabel>Menu Utama</SectionLabel>
        {menuUtamaWithBadge.map((item) => (
          <SidebarItem key={item.path} item={item} />
        ))}

        <SectionLabel>Informasi</SectionLabel>
        {menuInformasi.map((item) => (
          <SidebarItem key={item.path} item={item} />
        ))}

        <SectionLabel>Sistem</SectionLabel>
        {menuSistem.map((item) => (
          <SidebarItem key={item.path} item={item} />
        ))}

      </nav>

      {/* ── PROFILE + LOGOUT ── */}
      <div className="shrink-0 border-t border-white/5 p-3">
        <div className="flex items-center gap-3 rounded-lg bg-white/5 p-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500 text-xs font-bold text-white">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-200 leading-tight">{nama}</p>
            <p className="truncate text-[11px] text-slate-500">{email}</p>
          </div>
          <button
            onClick={handleLogout}
            title="Keluar"
            className="shrink-0 rounded-lg p-1.5 text-slate-500 transition hover:bg-red-500/15 hover:text-red-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      </div>

    </aside>
  );
}
