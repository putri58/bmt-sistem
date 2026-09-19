import { useState, useEffect } from "react";
import { ArrowDownLeft, ArrowUpRight, Search } from "lucide-react";
import api from "../../lib/api";

function formatRp(v) { return new Intl.NumberFormat("id-ID").format(v ?? 0); }
function formatDate(d) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

const jenisBadge = {
  Simpanan: "bg-emerald-50 text-emerald-600",
  Pinjaman: "bg-orange-50 text-orange-600",
  Angsuran: "bg-blue-50 text-blue-600",
};

export default function MemberTransaksi() {
  const [transaksi, setTransaksi] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState("");
  const [filterJenis, setFilter]  = useState("");

  useEffect(() => {
    async function fetchTransaksi() {
      try {
        const res = await api.get('/member/transaksi');
        setTransaksi(res.data);
      } catch (err) {
        console.error('Gagal ambil data transaksi', err);
      } finally {
        setLoading(false);
      }
    }
    fetchTransaksi();
  }, []);

  const filtered = transaksi.filter((t) => {
    const matchSearch = t.kode_transaksi?.toLowerCase().includes(search.toLowerCase()) ||
      t.keterangan?.toLowerCase().includes(search.toLowerCase()) ||
      t.jenis?.toLowerCase().includes(search.toLowerCase());
    const matchJenis = filterJenis ? t.jenis === filterJenis : true;
    return matchSearch && matchJenis;
  });

  const totalKredit = transaksi.filter((t) => t.tipe === "Kredit").reduce((sum, t) => sum + Number(t.jumlah), 0);
  const totalDebit  = transaksi.filter((t) => t.tipe === "Debit").reduce((sum, t) => sum + Number(t.jumlah), 0);

  if (loading) return <div className="flex items-center justify-center py-32 text-slate-400">Memuat data...</div>;

  return (
    <div>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Riwayat Transaksi</h1>
        <p className="mt-1 text-sm text-slate-500">Semua aktivitas keuangan Anda di KSPPS BMT Al Ittihad.</p>
      </div>

      {/* STAT */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center">
          <p className="text-2xl font-bold text-slate-800">{transaksi.length}</p>
          <p className="text-xs text-slate-400 mt-1">Total Transaksi</p>
        </div>
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5 text-center">
          <p className="text-lg font-bold text-emerald-600">Rp {formatRp(totalKredit)}</p>
          <p className="text-xs text-emerald-600 mt-1">Total Masuk</p>
        </div>
        <div className="rounded-2xl border border-red-100 bg-red-50 p-5 text-center">
          <p className="text-lg font-bold text-red-600">Rp {formatRp(totalDebit)}</p>
          <p className="text-xs text-red-600 mt-1">Total Keluar</p>
        </div>
      </div>

      {/* TABLE */}
      <div className="rounded-2xl border border-slate-200 bg-white">
        {/* TOOLBAR */}
        <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 p-5">
          <div className="relative max-w-xs flex-1">
            <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
            <input type="text" placeholder="Cari transaksi..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-[#1E5E3F] focus:bg-white" />
          </div>
          <div className="flex gap-2">
            {["", "Simpanan", "Pinjaman", "Angsuran"].map((j) => (
              <button key={j} onClick={() => setFilter(j)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  filterJenis === j ? "bg-[#1E5E3F] text-white" : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}>
                {j || "Semua"}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-400">Tidak ada transaksi ditemukan.</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filtered.map((t) => (
              <div key={t.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                  t.tipe === "Kredit" ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"
                }`}>
                  {t.tipe === "Kredit" ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-slate-700">{t.keterangan || t.jenis}</p>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${jenisBadge[t.jenis] || "bg-slate-100 text-slate-500"}`}>
                      {t.jenis}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{t.kode_transaksi} · {formatDate(t.tanggal)}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${t.tipe === "Kredit" ? "text-emerald-600" : "text-red-600"}`}>
                    {t.tipe === "Kredit" ? "+" : "-"} Rp {formatRp(t.jumlah)}
                  </p>
                  <p className="text-[10px] text-slate-400">{t.tipe}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {filtered.length > 0 && (
          <div className="border-t border-slate-100 px-6 py-3 text-xs text-slate-400">
            Menampilkan {filtered.length} dari {transaksi.length} transaksi
          </div>
        )}
      </div>
    </div>
  );
}
