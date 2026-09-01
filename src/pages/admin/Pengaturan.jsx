import { useState } from "react";
import { Save, Building2, Bell, Lock, Database, RefreshCw } from "lucide-react";

const tabs = [
  { key: "umum", label: "Umum", icon: Building2 },
  { key: "notifikasi", label: "Notifikasi", icon: Bell },
  { key: "keamanan", label: "Keamanan", icon: Lock },
  { key: "data", label: "Data & Backup", icon: Database },
];

export default function Pengaturan() {
  const [activeTab, setActiveTab] = useState("umum");
  const [saved, setSaved] = useState(false);

  const [umum, setUmum] = useState({
    namaKoperasi: "KSP Maju Bersama",
    singkatan: "KSP",
    alamat: "Jl. Merdeka No. 10, Bandung, Jawa Barat 40111",
    telepon: "022-1234567",
    email: "admin@kspmajubersama.id",
    website: "www.kspmajubersama.id",
    noBadan: "BH.123/PAD/KWK.10/VI/2020",
  });

  const [notif, setNotif] = useState({
    emailPengajuan: true,
    emailAnggotaBaru: true,
    emailAngsuranJatuhTempo: true,
    smsNotifikasi: false,
  });

  const [keamanan, setKeamanan] = useState({
    passwordLama: "",
    passwordBaru: "",
    konfirmasiPassword: "",
    sesiOtomatis: "30",
  });

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Pengaturan</h1>
          <p className="mt-1 text-sm text-slate-500">Konfigurasi sistem dan preferensi koperasi.</p>
        </div>
        <button onClick={handleSave}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all ${saved ? "bg-emerald-600 hover:bg-emerald-700" : "bg-indigo-600 hover:bg-indigo-700"}`}>
          <Save size={15} />
          {saved ? "Tersimpan!" : "Simpan Perubahan"}
        </button>
      </div>

      <div className="flex gap-6">
        {/* SIDEBAR TABS */}
        <div className="w-48 shrink-0 space-y-1">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button key={key} onClick={() => setActiveTab(key)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${activeTab === key ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}>
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-6">

          {/* UMUM */}
          {activeTab === "umum" && (
            <div>
              <h2 className="mb-5 font-semibold text-slate-800">Informasi Koperasi</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-600">Nama Koperasi</label>
                    <input type="text" value={umum.namaKoperasi} onChange={(e) => setUmum({ ...umum, namaKoperasi: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-600">Singkatan</label>
                    <input type="text" value={umum.singkatan} onChange={(e) => setUmum({ ...umum, singkatan: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400" />
                  </div>
                </div>
                {[
                  ["Alamat Lengkap", "alamat", "text"],
                  ["Nomor Telepon", "telepon", "text"],
                  ["Email", "email", "email"],
                  ["Website", "website", "text"],
                  ["Nomor Badan Hukum", "noBadan", "text"],
                ].map(([label, key, type]) => (
                  <div key={key}>
                    <label className="mb-1 block text-xs font-semibold text-slate-600">{label}</label>
                    <input type={type} value={umum[key]} onChange={(e) => setUmum({ ...umum, [key]: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* NOTIFIKASI */}
          {activeTab === "notifikasi" && (
            <div>
              <h2 className="mb-5 font-semibold text-slate-800">Pengaturan Notifikasi</h2>
              <div className="space-y-4">
                {[
                  ["emailPengajuan", "Email — Pengajuan Pinjaman Baru", "Kirim email saat ada pengajuan pinjaman masuk"],
                  ["emailAnggotaBaru", "Email — Anggota Baru Terdaftar", "Kirim email saat ada pendaftaran anggota baru"],
                  ["emailAngsuranJatuhTempo", "Email — Angsuran Jatuh Tempo", "Kirim pengingat 3 hari sebelum jatuh tempo angsuran"],
                  ["smsNotifikasi", "SMS Notifikasi", "Kirim SMS untuk transaksi penting (memerlukan kredit SMS)"],
                ].map(([key, title, desc]) => (
                  <div key={key} className="flex items-start justify-between rounded-xl border border-slate-100 p-4">
                    <div>
                      <p className="text-sm font-medium text-slate-700">{title}</p>
                      <p className="mt-0.5 text-xs text-slate-400">{desc}</p>
                    </div>
                    <button onClick={() => setNotif({ ...notif, [key]: !notif[key] })}
                      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${notif[key] ? "bg-indigo-600" : "bg-slate-200"}`}>
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${notif[key] ? "translate-x-6" : "translate-x-1"}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* KEAMANAN */}
          {activeTab === "keamanan" && (
            <div>
              <h2 className="mb-5 font-semibold text-slate-800">Keamanan Akun</h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600">Password Lama</label>
                  <input type="password" value={keamanan.passwordLama} onChange={(e) => setKeamanan({ ...keamanan, passwordLama: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600">Password Baru</label>
                  <input type="password" value={keamanan.passwordBaru} onChange={(e) => setKeamanan({ ...keamanan, passwordBaru: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600">Konfirmasi Password Baru</label>
                  <input type="password" value={keamanan.konfirmasiPassword} onChange={(e) => setKeamanan({ ...keamanan, konfirmasiPassword: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400" />
                </div>
                <hr className="border-slate-100" />
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600">Timeout Sesi Otomatis (menit)</label>
                  <select value={keamanan.sesiOtomatis} onChange={(e) => setKeamanan({ ...keamanan, sesiOtomatis: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400">
                    {["15", "30", "60", "120"].map((v) => <option key={v} value={v}>{v} menit</option>)}
                  </select>
                </div>
                <button onClick={handleSave} className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors">
                  Perbarui Password
                </button>
              </div>
            </div>
          )}

          {/* DATA */}
          {activeTab === "data" && (
            <div>
              <h2 className="mb-5 font-semibold text-slate-800">Data & Backup</h2>
              <div className="space-y-4">
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-700">Backup Database</p>
                      <p className="mt-0.5 text-xs text-slate-400">Backup terakhir: Hari ini, 06:00 WIB</p>
                    </div>
                    <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-medium text-white hover:bg-indigo-700 transition-colors">
                      <Database size={13} />
                      Backup Sekarang
                    </button>
                  </div>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-700">Export Data Anggota</p>
                      <p className="mt-0.5 text-xs text-slate-400">Export semua data anggota ke format Excel</p>
                    </div>
                    <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 transition-colors">
                      Export Excel
                    </button>
                  </div>
                </div>
                <div className="rounded-xl border border-red-100 bg-red-50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-red-700">Reset Data Demo</p>
                      <p className="mt-0.5 text-xs text-red-400">Hati-hati! Tindakan ini tidak dapat dibatalkan.</p>
                    </div>
                    <button className="flex items-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors">
                      <RefreshCw size={13} />
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
