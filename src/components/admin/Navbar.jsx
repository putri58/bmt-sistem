import { useState, useRef, useEffect } from "react";
import {
  Search,
  Bell,
  CircleHelp,
  ChevronDown,
  X,
  CheckCheck,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";

const notifikasiData = [
  { id: 1, text: "Pengajuan baru dari Sari Wulandari", waktu: "5 menit lalu", dibaca: false },
  { id: 2, text: "Pengajuan baru dari Fitriani", waktu: "12 menit lalu", dibaca: false },
  { id: 3, text: "Angsuran diterima dari Budi Santoso", waktu: "1 jam lalu", dibaca: false },
  { id: 4, text: "Anggota baru terdaftar: Hendra Gunawan", waktu: "2 jam lalu", dibaca: true },
  { id: 5, text: "Laporan bulan Agustus tersedia", waktu: "3 jam lalu", dibaca: true },
];

function useClickOutside(ref, onClose) {
  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [ref, onClose]);
}

function Navbar() {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [notifikasi, setNotifikasi] = useState(notifikasiData);

  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const helpRef = useRef(null);

  useClickOutside(notifRef, () => setNotifOpen(false));
  useClickOutside(profileRef, () => setProfileOpen(false));
  useClickOutside(helpRef, () => setHelpOpen(false));

  const belumDibaca = notifikasi.filter((n) => !n.dibaca).length;

  function tandaiSemuaDibaca() {
    setNotifikasi(notifikasi.map((n) => ({ ...n, dibaca: true })));
  }

  function hapusNotifikasi(id) {
    setNotifikasi(notifikasi.filter((n) => n.id !== id));
  }

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-8 backdrop-blur">

      {/* SEARCH */}
      <div className="relative w-96">
        <Search size={19} className="absolute left-4 top-3.5 text-slate-400" />
        <input
          type="text"
          placeholder="Cari anggota, pinjaman, transaksi..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-400 focus:bg-white"
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">

        {/* NOTIFICATION */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); setHelpOpen(false); }}
            className="relative text-slate-500 transition hover:text-indigo-600"
          >
            <Bell size={20} />
            {belumDibaca > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                {belumDibaca}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-10 w-80 rounded-2xl border border-slate-200 bg-white shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <span className="text-sm font-semibold text-slate-800">Notifikasi</span>
                {belumDibaca > 0 && (
                  <button onClick={tandaiSemuaDibaca} className="flex items-center gap-1 text-xs text-indigo-600 hover:underline">
                    <CheckCheck size={13} />
                    Tandai semua dibaca
                  </button>
                )}
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                {notifikasi.length === 0 ? (
                  <p className="py-8 text-center text-sm text-slate-400">Tidak ada notifikasi.</p>
                ) : notifikasi.map((n) => (
                  <div key={n.id} className={`flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors ${!n.dibaca ? "bg-indigo-50/50" : ""}`}>
                    <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${!n.dibaca ? "bg-indigo-500" : "bg-transparent"}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-700 leading-relaxed">{n.text}</p>
                      <p className="mt-0.5 text-[10px] text-slate-400">{n.waktu}</p>
                    </div>
                    <button onClick={() => hapusNotifikasi(n.id)} className="shrink-0 text-slate-300 hover:text-slate-500">
                      <X size={13} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-100 px-4 py-3 text-center">
                <Link to="/admin/pengajuan" onClick={() => setNotifOpen(false)} className="text-xs font-medium text-indigo-600 hover:underline">
                  Lihat semua aktivitas
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* HELP */}
        <div ref={helpRef} className="relative">
          <button
            onClick={() => { setHelpOpen(!helpOpen); setNotifOpen(false); setProfileOpen(false); }}
            className="text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <CircleHelp size={20} />
          </button>

          {helpOpen && (
            <div className="absolute right-0 top-10 w-56 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
              <p className="px-2 py-1 text-xs font-semibold uppercase tracking-wider text-slate-400">Bantuan</p>
              {[
                ["Panduan Penggunaan", "#"],
                ["FAQ", "#"],
                ["Hubungi Support", "#"],
              ].map(([label, href]) => (
                <a key={label} href={href} className="block rounded-lg px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
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
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-600">
              AD
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-slate-700">Admin Koperasi</p>
              <p className="text-xs text-slate-400">Super Admin</p>
            </div>
            <ChevronDown size={16} className={`text-slate-400 transition-transform ${profileOpen ? "rotate-180" : ""}`} />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-14 w-52 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
              <div className="mb-2 border-b border-slate-100 px-3 pb-3">
                <p className="text-sm font-semibold text-slate-800">Admin Koperasi</p>
                <p className="text-xs text-slate-400">admin@koperasi.id</p>
              </div>
              <Link to="/admin/manajemen-admin" onClick={() => setProfileOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                <User size={15} className="text-slate-400" />
                Profil Saya
              </Link>
              <Link to="/admin/pengaturan" onClick={() => setProfileOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                <Settings size={15} className="text-slate-400" />
                Pengaturan
              </Link>
              <hr className="my-2 border-slate-100" />
              <button
                onClick={() => { alert("Logout berhasil!"); setProfileOpen(false); }}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={15} />
                Keluar
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}

export default Navbar;
