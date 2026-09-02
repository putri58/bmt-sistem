import { Link } from "react-router-dom";
import { Wallet, CreditCard, Receipt, ArrowLeftRight, ArrowDownLeft, ArrowUpRight, TrendingUp } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { simpananData, pinjamanData, transaksiData } from "../../data/memberData";

function formatRp(v) { return new Intl.NumberFormat("id-ID").format(v); }
function formatDate(d) {
  return new Date(d).toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function MemberDashboard() {
  const { currentUser } = useAuth();
  const nama = currentUser?.nama || "Anggota";
  const pinjaman = pinjamanData.aktif;

  const recentTrx = transaksiData.slice(0, 5);

  return (
    <div>

      {/* WELCOME */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">
          Selamat Datang, {nama} 👋
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Berikut informasi aktivitas koperasi Anda — {new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Total Simpanan",
            value: `Rp ${formatRp(simpananData.total)}`,
            desc: "Semua jenis simpanan",
            icon: Wallet,
            color: "bg-[#1E5E3F]",
            link: "/member/simpanan",
          },
          {
            label: "Pinjaman Aktif",
            value: `Rp ${formatRp(pinjaman.pokok)}`,
            desc: pinjaman.jenis,
            icon: CreditCard,
            color: "bg-orange-500",
            link: "/member/pinjaman",
          },
          {
            label: "Sisa Pinjaman",
            value: `Rp ${formatRp(pinjaman.sisaPinjaman)}`,
            desc: `${pinjaman.tenor - pinjaman.sudahBayar} bulan lagi`,
            icon: TrendingUp,
            color: "bg-blue-600",
            link: "/member/pinjaman",
          },
          {
            label: "Angsuran Berikutnya",
            value: `Rp ${formatRp(pinjaman.angsuranBln)}`,
            desc: `Ke-${pinjaman.sudahBayar + 1} dari ${pinjaman.tenor}`,
            icon: Receipt,
            color: "bg-purple-600",
            link: "/member/angsuran",
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

        {/* PROGRESS PINJAMAN */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-slate-800">Progress Pinjaman Aktif</h2>
            <Link to="/member/pinjaman" className="text-xs font-medium text-[#1E5E3F] hover:underline">Detail →</Link>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-700">{pinjaman.jenis}</p>
                <p className="text-xs text-slate-400">{pinjaman.id}</p>
              </div>
              <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-600">{pinjaman.status}</span>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-4 text-center">
              {[
                ["Jumlah Pinjaman", `Rp ${formatRp(pinjaman.pokok)}`],
                ["Angsuran/Bln",   `Rp ${formatRp(pinjaman.angsuranBln)}`],
                ["Sudah Dibayar",  `${pinjaman.sudahBayar} bulan`],
              ].map(([l, v]) => (
                <div key={l} className="rounded-xl bg-white border border-slate-100 p-3">
                  <p className="text-[10px] text-slate-400">{l}</p>
                  <p className="mt-1 text-sm font-bold text-slate-800">{v}</p>
                </div>
              ))}
            </div>

            <div className="mt-5">
              <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                <span>Progress Pembayaran</span>
                <span className="font-semibold text-[#1E5E3F]">{pinjaman.progress}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#1E5E3F] to-[#2E8B57] transition-all duration-700"
                  style={{ width: `${pinjaman.progress}%` }}
                />
              </div>
              <div className="mt-1 flex justify-between text-[10px] text-slate-400">
                <span>{pinjaman.sudahBayar} bulan terbayar</span>
                <span>{pinjaman.tenor - pinjaman.sudahBayar} bulan tersisa</span>
              </div>
            </div>
          </div>
        </div>

        {/* SIMPANAN RINGKASAN */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-slate-800">Simpanan Saya</h2>
            <Link to="/member/simpanan" className="text-xs font-medium text-[#1E5E3F] hover:underline">Detail →</Link>
          </div>
          <div className="space-y-3">
            {[
              { label: "Simpanan Pokok",   value: simpananData.pokok,    color: "bg-[#1E5E3F]" },
              { label: "Simpanan Wajib",   value: simpananData.wajib,    color: "bg-blue-500" },
              { label: "Simpanan Sukarela", value: simpananData.sukarela, color: "bg-orange-500" },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${s.color}`} />
                  <span className="text-xs text-slate-600">{s.label}</span>
                </div>
                <span className="text-sm font-semibold text-slate-700">Rp {formatRp(s.value)}</span>
              </div>
            ))}
            <div className="flex items-center justify-between rounded-xl bg-[#1E5E3F]/5 border border-[#1E5E3F]/20 px-4 py-3">
              <span className="text-xs font-bold text-[#1E5E3F]">Total</span>
              <span className="text-sm font-bold text-[#1E5E3F]">Rp {formatRp(simpananData.total)}</span>
            </div>
          </div>
        </div>

      </div>

      {/* TRANSAKSI TERBARU */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-semibold text-slate-800">Transaksi Terbaru</h2>
          <Link to="/member/transaksi" className="text-xs font-medium text-[#1E5E3F] hover:underline">Lihat Semua →</Link>
        </div>
        <div className="space-y-3">
          {recentTrx.map((t) => (
            <div key={t.id} className="flex items-center gap-4">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${t.tipe === "masuk" ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"}`}>
                {t.tipe === "masuk" ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-700 truncate">{t.jenis}</p>
                <p className="text-xs text-slate-400">{formatDate(t.tanggal)}</p>
              </div>
              <span className={`text-sm font-semibold ${t.tipe === "masuk" ? "text-emerald-600" : "text-red-600"}`}>
                {t.tipe === "masuk" ? "+" : "-"} Rp {formatRp(t.nominal)}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
