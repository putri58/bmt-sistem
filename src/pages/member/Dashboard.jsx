import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Wallet, CreditCard, Receipt, ArrowLeftRight, ArrowDownLeft, ArrowUpRight, TrendingUp } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import api from "../../lib/api";

function formatRp(v) { return new Intl.NumberFormat("id-ID").format(v ?? 0); }
function formatDate(d) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function MemberDashboard() {
  const { currentUser } = useAuth();
  const [data, setData]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await api.get('/member/dashboard');
        setData(res.data);
      } catch (err) {
        console.error('Gagal ambil data dashboard', err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  const nama = currentUser?.nama || "Anggota";

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32 text-slate-400">
        Memuat data...
      </div>
    );
  }

  const anggota          = data?.anggota;
  const pinjamanAktif    = data?.pinjaman_aktif ?? 0;
  const angsuranTerdekat = data?.angsuran_terdekat;
  const transaksiTerbaru = data?.transaksi_terbaru ?? [];

  return (
    <div>
      {/* WELCOME */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">
          Selamat Datang, {nama} 👋
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Berikut informasi aktivitas koperasi Anda —{" "}
          {new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </p>
        {anggota && (
          <p className="mt-1 text-xs text-slate-400">
            ID Anggota: <span className="font-semibold text-slate-600">{anggota.id_anggota}</span>
            {" · "}Status:{" "}
            <span className={`font-semibold ${anggota.status_anggota === "Aktif" ? "text-emerald-600" : "text-red-500"}`}>
              {anggota.status_anggota}
            </span>
          </p>
        )}
      </div>

      {/* SUMMARY CARDS */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Total Simpanan",
            value: `Rp ${formatRp(anggota?.simpanan)}`,
            desc:  "Saldo simpanan aktif",
            icon:  Wallet,
            color: "bg-[#1E5E3F]",
            link:  "/member/simpanan",
          },
          {
            label: "Pinjaman Aktif",
            value: `${pinjamanAktif} pinjaman`,
            desc:  "Pinjaman yang disetujui",
            icon:  CreditCard,
            color: "bg-orange-500",
            link:  "/member/pinjaman",
          },
          {
            label: "Angsuran Terdekat",
            value: angsuranTerdekat ? `Rp ${formatRp(angsuranTerdekat.jumlah)}` : "Tidak ada",
            desc:  angsuranTerdekat ? `Jatuh tempo: ${formatDate(angsuranTerdekat.jatuh_tempo)}` : "Semua lunas",
            icon:  Receipt,
            color: "bg-purple-600",
            link:  "/member/angsuran",
          },
          {
            label: "Total Transaksi",
            value: `${transaksiTerbaru.length} transaksi`,
            desc:  "5 transaksi terbaru",
            icon:  TrendingUp,
            color: "bg-blue-600",
            link:  "/member/transaksi",
          },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <Link to={s.link} key={s.label}
              className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${s.color} text-white`}>
                <Icon size={22} />
              </div>
              <div>
                <p className="text-xs text-slate-500">{s.label}</p>
                <p className="mt-1 text-lg font-bold text-slate-800">{s.value}</p>
                <p className="mt-0.5 text-xs text-slate-400">{s.desc}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">

        {/* INFO ANGGOTA */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-slate-800">Informasi Keanggotaan</h2>
            <Link to="/member/profil" className="text-xs font-medium text-[#1E5E3F] hover:underline">
              Lihat Profil →
            </Link>
          </div>
          {anggota ? (
            <div className="grid grid-cols-2 gap-4">
              {[
                ["ID Anggota",     anggota.id_anggota],
                ["Nama Lengkap",   anggota.nama_anggota],
                ["Email",          anggota.email],
                ["No. Telepon",    anggota.no_telp],
                ["Kota",           anggota.kota],
                ["Tgl Bergabung",  formatDate(anggota.tgl_disetujui)],
              ].map(([label, val]) => (
                <div key={label} className="rounded-xl bg-slate-50 px-4 py-3">
                  <p className="text-[10px] text-slate-400">{label}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-700 truncate">{val || "-"}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400">Data anggota tidak tersedia.</p>
          )}
        </div>

        {/* SIMPANAN */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-slate-800">Simpanan Saya</h2>
            <Link to="/member/simpanan" className="text-xs font-medium text-[#1E5E3F] hover:underline">
              Detail →
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 py-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1E5E3F]/10">
              <Wallet size={28} className="text-[#1E5E3F]" />
            </div>
            <p className="text-2xl font-bold text-slate-800">
              Rp {formatRp(anggota?.simpanan)}
            </p>
            <p className="text-xs text-slate-400">Total saldo simpanan</p>
            <Link to="/member/simpanan"
              className="mt-2 w-full rounded-xl bg-[#1E5E3F]/10 py-2 text-center text-sm font-semibold text-[#1E5E3F] transition hover:bg-[#1E5E3F]/20">
              Lihat Riwayat Simpanan
            </Link>
          </div>
        </div>

      </div>

      {/* TRANSAKSI TERBARU */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-semibold text-slate-800">Transaksi Terbaru</h2>
          <Link to="/member/transaksi" className="text-xs font-medium text-[#1E5E3F] hover:underline">
            Lihat Semua →
          </Link>
        </div>
        {transaksiTerbaru.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-400">Belum ada transaksi.</p>
        ) : (
          <div className="space-y-3">
            {transaksiTerbaru.map((t) => (
              <div key={t.id} className="flex items-center gap-4">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                  t.tipe === "Kredit" ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"
                }`}>
                  {t.tipe === "Kredit" ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">{t.jenis} — {t.keterangan || "-"}</p>
                  <p className="text-xs text-slate-400">{formatDate(t.tanggal)}</p>
                </div>
                <span className={`text-sm font-semibold ${t.tipe === "Kredit" ? "text-emerald-600" : "text-red-600"}`}>
                  {t.tipe === "Kredit" ? "+" : "-"} Rp {formatRp(t.jumlah)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
