import { useState } from "react";
import { Download, FileText, TrendingUp, TrendingDown, Users, CreditCard, Wallet, ArrowLeftRight } from "lucide-react";

const bulanList = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
const tahunList = ["2026", "2025", "2024"];

function formatRupiah(v) { return new Intl.NumberFormat("id-ID").format(v); }

const laporanBulanan = {
  "Agustus-2026": {
    totalAnggota: 1248, anggotaBaru: 12,
    totalSimpanan: 2856250000, simpananMasuk: 245000000, simpananKeluar: 120000000,
    totalPinjaman: 1642500000, pinjamanBaru: 185000000, angsuranDiterima: 210000000,
    totalTransaksi: 3487, transaksiMasuk: 455000000, transaksiKeluar: 305000000,
    pengajuanMasuk: 17, pengajuanDisetujui: 9, pengajuanDitolak: 3,
  },
  "Juli-2026": {
    totalAnggota: 1236, anggotaBaru: 8,
    totalSimpanan: 2731250000, simpananMasuk: 198000000, simpananKeluar: 95000000,
    totalPinjaman: 1567500000, pinjamanBaru: 150000000, angsuranDiterima: 185000000,
    totalTransaksi: 3102, transaksiMasuk: 383000000, transaksiKeluar: 245000000,
    pengajuanMasuk: 14, pengajuanDisetujui: 7, pengajuanDitolak: 2,
  },
};

function getRingkasan(bulan, tahun) {
  return laporanBulanan[`${bulan}-${tahun}`] || laporanBulanan["Agustus-2026"];
}

export default function Laporan() {
  const [bulan, setBulan] = useState("Agustus");
  const [tahun, setTahun] = useState("2026");
  const [activeTab, setActiveTab] = useState("ringkasan");

  const data = getRingkasan(bulan, tahun);

  function handleDownload(jenis) {
    alert(`Laporan ${jenis} untuk ${bulan} ${tahun} akan diunduh.\n(Fitur export PDF/Excel dalam pengembangan)`);
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Laporan</h1>
          <p className="mt-1 text-sm text-slate-500">Laporan operasional dan keuangan koperasi per periode.</p>
        </div>
        <div className="flex items-center gap-3">
          <select value={bulan} onChange={(e) => setBulan(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-indigo-400 shadow-sm">
            {bulanList.map((b) => <option key={b}>{b}</option>)}
          </select>
          <select value={tahun} onChange={(e) => setTahun(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-indigo-400 shadow-sm">
            {tahunList.map((t) => <option key={t}>{t}</option>)}
          </select>
          <button onClick={() => handleDownload("Ringkasan")}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition-colors">
            <Download size={15} />
            Export PDF
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="mb-6 flex gap-1 rounded-xl border border-slate-200 bg-white p-1 w-fit">
        {["ringkasan", "simpanan", "pinjaman", "transaksi"].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors ${activeTab === tab ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-50"}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* RINGKASAN */}
      {activeTab === "ringkasan" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              { label: "Total Anggota", value: data.totalAnggota.toLocaleString("id-ID"), sub: `+${data.anggotaBaru} baru`, icon: Users, color: "indigo" },
              { label: "Total Simpanan", value: `Rp ${formatRupiah(data.totalSimpanan)}`, sub: `Masuk Rp ${formatRupiah(data.simpananMasuk)}`, icon: Wallet, color: "emerald" },
              { label: "Total Pinjaman", value: `Rp ${formatRupiah(data.totalPinjaman)}`, sub: `Baru Rp ${formatRupiah(data.pinjamanBaru)}`, icon: CreditCard, color: "orange" },
              { label: "Total Transaksi", value: data.totalTransaksi.toLocaleString("id-ID"), sub: `Bulan ${bulan}`, icon: ArrowLeftRight, color: "blue" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-slate-500">{s.label}</p>
                    <p className="mt-1 text-xl font-bold text-slate-800">{s.value}</p>
                    <p className="mt-1 text-xs text-emerald-500">{s.sub}</p>
                  </div>
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-${s.color}-100 text-${s.color}-600`}>
                    <s.icon size={18} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* PENGAJUAN */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="mb-4 font-semibold text-slate-800">Ringkasan Pengajuan</h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Pengajuan Masuk", value: data.pengajuanMasuk, color: "text-slate-800" },
                { label: "Disetujui", value: data.pengajuanDisetujui, color: "text-emerald-600" },
                { label: "Ditolak", value: data.pengajuanDitolak, color: "text-red-600" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">{s.label}</p>
                  <p className={`mt-1 text-3xl font-bold ${s.color}`}>{s.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ARUS KAS */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="mb-4 font-semibold text-slate-800">Arus Kas {bulan} {tahun}</h2>
            <div className="space-y-3">
              {[
                { label: "Simpanan Masuk", value: data.simpananMasuk, icon: TrendingUp, color: "emerald" },
                { label: "Simpanan Keluar", value: data.simpananKeluar, icon: TrendingDown, color: "red" },
                { label: "Angsuran Diterima", value: data.angsuranDiterima, icon: TrendingUp, color: "emerald" },
                { label: "Pencairan Pinjaman", value: data.pinjamanBaru, icon: TrendingDown, color: "red" },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-${s.color}-50 text-${s.color}-600`}>
                      <s.icon size={15} />
                    </div>
                    <span className="text-sm text-slate-700">{s.label}</span>
                  </div>
                  <span className={`font-semibold text-${s.color}-600`}>
                    {s.color === "emerald" ? "+" : "-"} Rp {formatRupiah(s.value)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between rounded-xl bg-indigo-50 px-4 py-3">
              <span className="text-sm font-semibold text-indigo-800">Net Cash Flow</span>
              <span className="font-bold text-indigo-800">
                + Rp {formatRupiah(data.simpananMasuk + data.angsuranDiterima - data.simpananKeluar - data.pinjamanBaru)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* SIMPANAN */}
      {activeTab === "simpanan" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-semibold text-slate-800">Laporan Simpanan — {bulan} {tahun}</h2>
            <button onClick={() => handleDownload("Simpanan")} className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-600 hover:bg-slate-50">
              <Download size={13} /> Download
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: "Total Simpanan", value: `Rp ${formatRupiah(data.totalSimpanan)}` },
              { label: "Simpanan Masuk", value: `Rp ${formatRupiah(data.simpananMasuk)}` },
              { label: "Simpanan Keluar", value: `Rp ${formatRupiah(data.simpananKeluar)}` },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs text-slate-500">{s.label}</p>
                <p className="mt-1 text-lg font-bold text-slate-800">{s.value}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-400 text-center py-8">Detail tabel laporan simpanan akan tersedia saat terhubung ke database.</p>
        </div>
      )}

      {/* PINJAMAN */}
      {activeTab === "pinjaman" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-semibold text-slate-800">Laporan Pinjaman — {bulan} {tahun}</h2>
            <button onClick={() => handleDownload("Pinjaman")} className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-600 hover:bg-slate-50">
              <Download size={13} /> Download
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: "Total Pinjaman Aktif", value: `Rp ${formatRupiah(data.totalPinjaman)}` },
              { label: "Pinjaman Baru", value: `Rp ${formatRupiah(data.pinjamanBaru)}` },
              { label: "Angsuran Diterima", value: `Rp ${formatRupiah(data.angsuranDiterima)}` },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs text-slate-500">{s.label}</p>
                <p className="mt-1 text-lg font-bold text-slate-800">{s.value}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-400 text-center py-8">Detail tabel laporan pinjaman akan tersedia saat terhubung ke database.</p>
        </div>
      )}

      {/* TRANSAKSI */}
      {activeTab === "transaksi" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-semibold text-slate-800">Laporan Transaksi — {bulan} {tahun}</h2>
            <button onClick={() => handleDownload("Transaksi")} className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-600 hover:bg-slate-50">
              <Download size={13} /> Download
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: "Total Transaksi", value: data.totalTransaksi.toLocaleString("id-ID") },
              { label: "Total Masuk", value: `Rp ${formatRupiah(data.transaksiMasuk)}` },
              { label: "Total Keluar", value: `Rp ${formatRupiah(data.transaksiKeluar)}` },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs text-slate-500">{s.label}</p>
                <p className="mt-1 text-lg font-bold text-slate-800">{s.value}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-400 text-center py-8">Detail tabel laporan transaksi akan tersedia saat terhubung ke database.</p>
        </div>
      )}
    </div>
  );
}
