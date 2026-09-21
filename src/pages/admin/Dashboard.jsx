import { useState, useEffect } from "react";
import {
  Users, Wallet, CreditCard, ArrowLeftRight,
  Clock3, Calendar, Activity,
} from "lucide-react";
import { Link } from "react-router-dom";
import StatCard from "../../components/admin/StatCard";
import api from "../../lib/api";

function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID").format(value ?? 0);
}

function formatDate(d) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("id-ID", {
    day: "numeric", month: "short", year: "numeric",
  });
}

function StatusBadge({ status }) {
  const styles = {
    Menunggu:  "bg-orange-50 text-orange-500",
    Disetujui: "bg-emerald-50 text-emerald-500",
    Ditolak:   "bg-red-50 text-red-500",
  };
  return (
    <span className={`rounded-full px-2 py-1 text-[10px] font-medium ${styles[status] || "bg-slate-50 text-slate-500"}`}>
      {status}
    </span>
  );
}

export default function Dashboard() {
  const [data, setData]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await api.get('/admin/dashboard');
        setData(res.data);
      } catch (err) {
        console.error('Gagal ambil data dashboard', err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  const stat              = data?.statistik;
  const pendaftarTerbaru  = data?.pendaftar_terbaru  ?? [];
  const transaksiTerbaru  = data?.transaksi_terbaru  ?? [];
  const anggotaTerbaru    = data?.anggota_terbaru    ?? [];

  return (
    <div>

      {/* HEADER */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard Admin</h1>
          <p className="mt-1 text-sm text-slate-500">
            Selamat datang kembali, Admin 👋 Pantau aktivitas koperasi hari ini.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
          <Calendar size={17} />
          {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
        </div>
      </div>

      {/* STATISTICS */}
      {loading ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl bg-slate-100" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
          <StatCard
            title="Total Anggota"
            value={stat?.total_anggota?.toLocaleString("id-ID") ?? "0"}
            description="Anggota aktif terdaftar"
            icon={Users}
            iconBg="bg-indigo-100"
            iconColor="text-indigo-600"
          />
          <StatCard
            title="Total Simpanan"
            value={`Rp ${formatRupiah(stat?.total_simpanan)}`}
            description="Total saldo simpanan anggota"
            icon={Wallet}
            iconBg="bg-emerald-100"
            iconColor="text-emerald-600"
          />
          <StatCard
            title="Total Pinjaman"
            value={`Rp ${formatRupiah(stat?.total_pinjaman)}`}
            description="Pinjaman yang disetujui"
            icon={CreditCard}
            iconBg="bg-orange-100"
            iconColor="text-orange-600"
          />
          <StatCard
            title="Total Transaksi"
            value={stat?.total_transaksi?.toLocaleString("id-ID") ?? "0"}
            description="Semua transaksi tercatat"
            icon={ArrowLeftRight}
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
          />
          <StatCard
            title="Pengajuan Menunggu"
            value={stat?.pengajuan_menunggu ?? "0"}
            description="Perlu segera diverifikasi"
            icon={Clock3}
            iconBg="bg-pink-100"
            iconColor="text-pink-500"
          />
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* ANGGOTA TERBARU */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 xl:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-semibold text-slate-800">Anggota Terbaru</h2>
            <Link to="/admin/anggota" className="text-xs font-medium text-indigo-600 hover:underline">
              Lihat Semua →
            </Link>
          </div>
          {loading ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-12 animate-pulse rounded-xl bg-slate-100" />
              ))}
            </div>
          ) : anggotaTerbaru.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-400">Belum ada anggota terdaftar.</p>
          ) : (
            <div className="space-y-4">
              {anggotaTerbaru.map((a) => (
                <div key={a.id} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">
                    {a.nama_anggota?.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-700">{a.nama_anggota}</p>
                    <p className="text-xs text-slate-400">{a.id_anggota} · Bergabung {formatDate(a.tgl_disetujui)}</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    a.status_anggota === "Aktif" ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"
                  }`}>
                    {a.status_anggota}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* PENDAFTAR MENUNGGU */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-semibold text-slate-800">Pendaftaran Terbaru</h2>
            <Link to="/admin/pendaftaran-anggota" className="text-xs font-medium text-indigo-600 hover:underline">
              Lihat Semua →
            </Link>
          </div>
          {loading ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-12 animate-pulse rounded-xl bg-slate-100" />
              ))}
            </div>
          ) : pendaftarTerbaru.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-400">Belum ada pendaftaran.</p>
          ) : (
            <div className="space-y-4">
              {pendaftarTerbaru.map((p) => (
                <div key={p.id} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-600">
                    {p.nama_anggota?.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-700">{p.nama_anggota}</p>
                    <p className="text-xs text-slate-400">{p.pendaftar_id} · {formatDate(p.tgl_daftar)}</p>
                  </div>
                  <StatusBadge status={p.status_pendaftaran} />
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* TRANSAKSI TERBARU */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-semibold text-slate-800">Transaksi Terbaru</h2>
          <Link to="/admin/transaksi" className="text-xs font-medium text-indigo-600 hover:underline">
            Lihat Semua →
          </Link>
        </div>
        {loading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-12 animate-pulse rounded-xl bg-slate-100" />
            ))}
          </div>
        ) : transaksiTerbaru.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-400">Belum ada transaksi.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <th className="pb-3">Kode</th>
                  <th className="pb-3">Anggota</th>
                  <th className="pb-3">Jenis</th>
                  <th className="pb-3">Jumlah</th>
                  <th className="pb-3">Tanggal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transaksiTerbaru.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50">
                    <td className="py-3 font-mono text-xs text-slate-400">{t.kode_transaksi}</td>
                    <td className="py-3 text-slate-700">{t.anggota?.nama_anggota || "-"}</td>
                    <td className="py-3">
                      <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-600">
                        {t.jenis}
                      </span>
                    </td>
                    <td className={`py-3 font-semibold ${t.tipe === "Kredit" ? "text-emerald-600" : "text-red-500"}`}>
                      {t.tipe === "Kredit" ? "+" : "-"} Rp {formatRupiah(t.jumlah)}
                    </td>
                    <td className="py-3 text-xs text-slate-400">{formatDate(t.tanggal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
