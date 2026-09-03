import { useState } from "react";
import { ArrowDownLeft, ArrowUpRight, Search } from "lucide-react";
import { transaksiData } from "../../data/memberData";

function formatRp(v) { return new Intl.NumberFormat("id-ID").format(v); }
function formatDate(d) {
  return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

const jenisList = [...new Set(transaksiData.map((t) => t.jenis))];

const ITEMS_PER_PAGE = 6;

export default function Transaksi() {
  const [search, setSearch]     = useState("");
  const [filterJenis, setJenis] = useState("");
  const [filterTipe, setTipe]   = useState("");
  const [page, setPage]         = useState(1);

  const filtered = transaksiData.filter((t) => {
    const matchSearch = t.jenis.toLowerCase().includes(search.toLowerCase()) ||
                        t.keterangan.toLowerCase().includes(search.toLowerCase());
    const matchJenis  = filterJenis ? t.jenis === filterJenis : true;
    const matchTipe   = filterTipe  ? t.tipe  === filterTipe  : true;
    return matchSearch && matchJenis && matchTipe;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated  = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const totalMasuk  = filtered.filter((t) => t.tipe === "masuk").reduce((s, t)  => s + t.nominal, 0);
  const totalKeluar = filtered.filter((t) => t.tipe === "keluar").reduce((s, t) => s + t.nominal, 0);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Riwayat Transaksi</h1>
        <p className="mt-1 text-sm text-slate-500">Seluruh riwayat transaksi keanggotaan Anda.</p>
      </div>

      {/* STAT */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-xs text-slate-500">Total Transaksi</p>
          <p className="mt-1 text-2xl font-bold text-slate-800">{filtered.length}</p>
        </div>
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
          <div className="flex items-center gap-2 mb-1">
            <ArrowDownLeft size={14} className="text-emerald-600" />
            <p className="text-xs font-semibold text-emerald-700">Total Uang Masuk</p>
          </div>
          <p className="text-lg font-bold text-emerald-700">Rp {formatRp(totalMasuk)}</p>
        </div>
        <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
          <div className="flex items-center gap-2 mb-1">
            <ArrowUpRight size={14} className="text-red-600" />
            <p className="text-xs font-semibold text-red-700">Total Uang Keluar</p>
          </div>
          <p className="text-lg font-bold text-red-700">Rp {formatRp(totalKeluar)}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white">
        {/* TOOLBAR */}
        <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 p-5">
          <div className="relative max-w-xs flex-1">
            <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
            <input type="text" placeholder="Cari transaksi..." value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-[#1E5E3F] focus:bg-white" />
          </div>
          <select value={filterJenis} onChange={(e) => { setJenis(e.target.value); setPage(1); }}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none">
            <option value="">Semua Jenis</option>
            {jenisList.map((j) => <option key={j}>{j}</option>)}
          </select>
          <select value={filterTipe} onChange={(e) => { setTipe(e.target.value); setPage(1); }}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none">
            <option value="">Semua Tipe</option>
            <option value="masuk">Masuk</option>
            <option value="keluar">Keluar</option>
          </select>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-5 py-3 text-left">Tanggal</th>
                <th className="px-5 py-3 text-left">Jenis</th>
                <th className="px-5 py-3 text-left">Keterangan</th>
                <th className="px-5 py-3 text-right">Nominal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginated.length === 0 ? (
                <tr><td colSpan={4} className="py-12 text-center text-slate-400">Tidak ada data.</td></tr>
              ) : paginated.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 text-slate-600">{formatDate(t.tanggal)}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${t.tipe === "masuk" ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"}`}>
                        {t.tipe === "masuk" ? <ArrowDownLeft size={13} /> : <ArrowUpRight size={13} />}
                      </div>
                      <span className="text-slate-700">{t.jenis}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-500">{t.keterangan}</td>
                  <td className={`px-5 py-4 text-right font-semibold ${t.tipe === "masuk" ? "text-emerald-600" : "text-red-600"}`}>
                    {t.tipe === "masuk" ? "+" : "-"} Rp {formatRp(t.nominal)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3">
            <p className="text-xs text-slate-400">
              Halaman {page} dari {totalPages} ({filtered.length} transaksi)
            </p>
            <div className="flex gap-2">
              <button disabled={page === 1} onClick={() => setPage(page - 1)}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50 disabled:opacity-40">
                ← Prev
              </button>
              <button disabled={page === totalPages} onClick={() => setPage(page + 1)}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50 disabled:opacity-40">
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
