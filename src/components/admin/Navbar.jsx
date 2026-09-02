import { useState, useRef, useEffect } from "react";
import {
  Search, Bell, CircleHelp, ChevronDown,
  X, CheckCheck, User, Settings, LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useAnggota } from "../../context/AnggotaContext";

function useClickOutside(ref, onClose) {
  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [ref, onClose]);
}

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const { jumlahMenunggu }      = useAnggota();
  const navigate                = useNavigate();

  const [notifOpen,   setNotifOpen]   = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [helpOpen,    setHelpOpen]    = useState(false);
  const [notifikasi,  setNotifikasi]  = useState([
    { id: 1, text: "Pendaftaran baru masuk", waktu: "5 menit lalu",  dibaca: false },
    { id: 2, text: "Anggota baru: Rizky Ramadhan", waktu: "1 jam lalu",   dibaca: false },
    { id: 3, text: "Laporan bulan ini tersedia",    waktu: "3 jam lalu",   dibaca: true  },
  ]);

  const notifRef   = useRef(null);
  const profileRef = useRef(null);
  const helpRef    = useRef(null);

  useClickOutside(notifRef,   () => setNotifOpen(false));
  useClickOutside(profileRef, () => setProfileOpen(false));
  useClickOutside(helpRef,    () => setHelpOpen(false));

  const belumDibaca = notifikasi.filter((n) => !n.dibaca).length + jumlahMenunggu;

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const nama     = currentUser?.nama     || "Admin Koperasi";
  const email    = currentUser?.email    || "admin@bmtalittihad.id";
  const initials = nama.split(" ").map((w) => w[0]).slice(0, 2).join("");

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-6 backdrop-blur">

      {/* SEARCH */}
      <div className="relative w-80">
        <Search size={17} className="absolute left-3.5 top-3 text-slate-400" />
        <input
          type="text"
          placeholder="Cari anggota, data, laporan..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-400/20"
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* NOTIFICATION */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); setHelpOpen(false); }}
            className="relative text-slate-500 transition hover:text-green-500"
          >
            <Bell size={20} />
            {belumDibaca > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                {belumDibaca > 9 ? "9+" : belumDibaca}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-10 w-80 rounded-2xl border border-slate-200 bg-white shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <span className="text-sm font-semibold text-slate-800">Notifikasi</span>
                {notifikasi.some((n) => !n.dibaca) && (
                  <button
                    onClick={() => setNotifikasi((prev) => prev.map((n) => ({ ...n, dibaca: true })))}
                    className="flex items-center gap-1 text-xs text-green-600 hover:underline"
                  >
                    <CheckCheck size={13} /> Tandai semua dibaca
                  </button>
                )}
              </div>

              {/* Pendaftaran menunggu */}
              {jumlahMenunggu > 0 && (
                <Link to="/admin/pendaftaran-anggota" onClick={() => setNotifOpen(false)}
                  className="flex items-start gap-3 border-b border-slate-100 bg-green-50/60 px-4 py-3 hover:bg-green-50 transition-colors">
                  <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-green-600">
                      {jumlahMenunggu} pendaftaran menunggu verifikasi
                    </p>
                    <p className="mt-0.5 text-[10px] text-slate-400">Klik untuk tinjau</p>
                  </div>
                </Link>
              )}

              <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                {notifikasi.map((n) => (
                  <div key={n.id}
                    className={`flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors ${!n.dibaca ? "bg-green-50/30" : ""}`}>
                    <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${!n.dibaca ? "bg-[#1E5E3F]" : "bg-transparent"}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-700 leading-relaxed">{n.text}</p>
                      <p className="mt-0.5 text-[10px] text-slate-400">{n.waktu}</p>
                    </div>
                    <button onClick={() => setNotifikasi((prev) => prev.filter((x) => x.id !== n.id))}
                      className="shrink-0 text-slate-300 hover:text-slate-500">
                      <X size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* HELP */}
        <div ref={helpRef} className="relative">
          <button
            onClick={() => { setHelpOpen(!helpOpen); setNotifOpen(false); setProfileOpen(false); }}
            className="text-slate-500 hover:text-green-500 transition-colors"
          >
            <CircleHelp size={20} />
          </button>
          {helpOpen && (
            <div className="absolute right-0 top-10 w-52 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
              <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Bantuan</p>
              {["Panduan Penggunaan", "FAQ", "Hubungi Support"].map((label) => (
                <a key={label} href="#"
                  className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                  {label}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* PROFILE */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); setHelpOpen(false); }}
            className="flex items-center gap-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500 text-sm font-bold text-white">
              {initials}
            </div>
            <div className="hidden text-left md:block">
              <p className="text-sm font-semibold text-slate-700 leading-tight">{nama}</p>
              <p className="text-[10px] text-slate-400">Super Admin</p>
            </div>
            <ChevronDown size={14} className={`text-slate-400 transition-transform ${profileOpen ? "rotate-180" : ""}`} />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-12 w-52 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
              <div className="mb-1 border-b border-slate-100 px-3 pb-2.5 pt-1">
                <p className="text-sm font-semibold text-slate-800">{nama}</p>
                <p className="text-xs text-slate-400 truncate">{email}</p>
              </div>
              <Link to="/admin/manajemen-admin" onClick={() => setProfileOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                <User size={14} className="text-slate-400" /> Profil Saya
              </Link>
              <Link to="/admin/pengaturan" onClick={() => setProfileOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                <Settings size={14} className="text-slate-400" /> Pengaturan
              </Link>
              <hr className="my-1.5 border-slate-100" />
              <button onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                <LogOut size={14} /> Keluar
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
