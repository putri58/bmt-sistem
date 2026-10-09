import {
  LayoutDashboard, ClipboardList, Users,
  UserCog, Settings, Building2,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../lib/api";

const LOGO_URL =
  "https://ykpialittihad.or.id/wp-content/uploads/2025/01/logo-web-ykpi-al-ittihad.png";

const KANTOR_LABEL = {
  pusat:      "Kantor Pusat",
  rumbai:     "Cabang Rumbai",
  panam:      "Cabang Panam",
  duri:       "Cabang Duri",
  cibubur:    "Cabang Cibubur",
  superadmin: "Semua Cabang",
};

const KANTOR_COLOR = {
  pusat:      "from-emerald-400 to-green-500",
  rumbai:     "from-blue-400 to-cyan-500",
  panam:      "from-violet-400 to-purple-500",
  duri:       "from-orange-400 to-amber-500",
  cibubur:    "from-rose-400 to-pink-500",
  superadmin: "from-slate-400 to-slate-600",
};

function buildMenu(basePath) {
  return [
    { name: "Dashboard",       path: `${basePath}`,                      icon: LayoutDashboard },
    { name: "Pendaftar Baru",  path: `${basePath}/pendaftaran-anggota`,   icon: ClipboardList   },
    { name: "Kelola Anggota",  path: `${basePath}/anggota`,              icon: Users           },
  ];
}

const menuSistem = (basePath) => [
  { name: "Manajemen Admin", path: `${basePath}/manajemen-admin`, icon: UserCog  },
  { name: "Pengaturan",      path: `${basePath}/pengaturan`,      icon: Settings },
];

function SidebarItem({ item }) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.path}
      end={item.path.split("/").length <= 3} // only exact match for root path
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
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const [jumlahMenunggu, setJumlahMenunggu] = useState(0);

  // Tentukan base path berdasarkan kantor user
  const kantor   = currentUser?.role === "superadmin" ? "superadmin" : (currentUser?.kantor || "pusat");
  const basePath = `/admin/${kantor}`;

  useEffect(() => {
    async function fetchBadge() {
      try {
        const res = await api.get("/pendaftar");
        const menunggu = res.data.filter(p => p.status_pendaftaran === "Menunggu").length;
        setJumlahMenunggu(menunggu);
      } catch (_) {}
    }
    fetchBadge();
  }, []);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const nama     = currentUser?.nama  || "Admin Koperasi";
  const email    = currentUser?.email || "admin@bmtalittihad.id";
  const initials = nama.split(" ").map(w => w[0]).slice(0, 2).join("");
  const gradient = KANTOR_COLOR[kantor] || KANTOR_COLOR.pusat;
  const kantorLabel = KANTOR_LABEL[kantor] || "Admin";

  const menuUtama = buildMenu(basePath).map(item =>
    item.path === `${basePath}/pendaftaran-anggota` && jumlahMenunggu > 0
      ? { ...item, badge: jumlahMenunggu }
      : item
  );

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-[#0f172a]">

      {/* ── LOGO ── */}
      <div className="flex h-20 shrink-0 items-center justify-center border-b border-white/5 px-5">
        <div className="flex items-center justify-center rounded-xl bg-white px-3 py-2">
          <img src={LOGO_URL} alt="Logo BMT Al Ittihad" className="h-10 w-auto object-contain"
            onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
          <div style={{ display: "none" }} className="items-center gap-2">
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${gradient} text-xs font-black text-white`}>
              BMT
            </div>
            <p className="text-sm font-bold text-white leading-tight">KSPPS BMT<br/><span className="text-[10px] text-green-400">Al Ittihad</span></p>
          </div>
        </div>
      </div>

      {/* ── KANTOR BADGE ── */}
      <div className="mx-3 mt-3 flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2">
        <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${gradient}`}>
          <Building2 size={14} className="text-white" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] text-slate-500">Sedang masuk sebagai</p>
          <p className="truncate text-xs font-bold text-slate-300">{kantorLabel}</p>
        </div>
      </div>

      {/* ── NAV ── */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 [scrollbar-width:none]">
        <SectionLabel>Menu Utama</SectionLabel>
        {menuUtama.map(item => <SidebarItem key={item.path} item={item} />)}

        <SectionLabel>Sistem</SectionLabel>
        {menuSistem(basePath).map(item => <SidebarItem key={item.path} item={item} />)}
      </nav>

      {/* ── PROFILE + LOGOUT ── */}
      <div className="shrink-0 border-t border-white/5 p-3">
        <div className="flex items-center gap-3 rounded-lg bg-white/5 p-2.5">
          <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-xs font-bold text-white`}>
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-200 leading-tight">{nama}</p>
            <p className="truncate text-[11px] text-slate-500">{email}</p>
          </div>
          <button onClick={handleLogout} title="Keluar"
            className="shrink-0 rounded-lg p-1.5 text-slate-500 transition hover:bg-red-500/15 hover:text-red-400">
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
