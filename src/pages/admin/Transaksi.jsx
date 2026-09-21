import { useState, useEffect } from "react";
import { Search, Eye, X, ArrowUpRight, ArrowDownLeft, Filter } from "lucide-react";
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

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="font-semibold text-slate-800">{title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

export default function Transaksi() {
  const [data,         setData]        = useState([]);
  const [loading,      setLoading]     = useState(true);
  const [search,       setSearch]      = useState("");
  const [filterJenis,  setFilterJenis] = useState("");
  const [filterTipe,   setFilterTipe]  = useState("");
  const [selected,     setSelected]    = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get('/transaksi');
        setData(res.data);
      } catch (err) {
        console.error('Gagal ambil data transaksi', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filtered = data.filter((d) => {
    const matchSearch =
      d.anggota?.nama_anggota?.toLowerCase().includes(search.toLowerCase()) ||
      d.kode_transaksi?.toLowerCase().includes(search.toLowerCase());
    const matchJenis = filterJenis ? d.jenis === filterJenis : true;
    const matchTipe  = filterTipe  ? d.tipe  === filterTipe  : true;
    return matchSearch && matchJenis && matchTipe;
  });

  const totalKredit = filtered.filter((d) => d.tipe === "Kredit").reduce((s, d) => s + Number(d.jumlah), 0);
  const totalDebit  = filtered.filter((d) => d.tipe === "Debit").reduce((s, d)  => s + Number(d.jumlah), 0);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Riwayat Transaksi</h1>
        <p className="mt-1 text-sm text-slate-500">
          Semua transaksi tercatat otomatis dari aktivitas simpanan, pinjaman, dan angsuran.
        </p>
      </div>

      {/* STAT */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-xs text-slate-400">Total Transaksi</p>
          <p className="mt-1 text-2xl font-bold text-slate-800">{filtered.length}</p>
        </div>
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
          <div className="flex items-center gap-2 mb-1">
            <ArrowDownLeft size={14} className="text-emerald-600" />
            <p className="text-xs font-semibold text-emerald-700">Total Kredit (Masuk)</p>
          </div>
          <p className="text-xl font-bold text-emerald-700">Rp {formatRp(totalKredit)}</p>
        </div>
        <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
          <div className="flex items-center gap-2 mb-1">
            <ArrowUpRight size={14} className="text-red-600" />
            <p className="text-xs font-semibold text-red-700">Total Debit (Keluar)</p>
          </div>
          <p className="text-xl font-bold text-red-700">Rp {formatRp(totalDebit)}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white">
        {/* TOOLBAR */}
        <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 p-5">
          <div className="relative max-w-xs flex-1">
            <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
            <input type="text" placeholder="Cari nama anggota atau kode..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-indigo-400 focus:bg-white" />
          </div>
          <div className="flex items-center gap-1.5">
            <Filter size={14} className="text-slate-400" />
            {["", "Simpanan", "Pinjaman", "Angsuran"].map((j) => (
              <button key={j} onClick={() => setFilterJenis(j)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  filterJenis === j ? "bg-indigo-600 text-white" : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}>
                {j || "Semua Jenis"}
              </button>
            ))}
          </div>
          <div className="flex gap-1.5">
            {["", "Kredit", "Debit"].map((t) => (
              <button key={t} onClick={() => setFilterTipe(t)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  filterTipe === t
                    ? t === "Kredit" ? "bg-emerald-600 text-white"
                    : t === "Debit"  ? "bg-red-500 text-white"
                    : "bg-slate-600 text-white"
                    : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}>
                {t || "Semua Tipe"}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-5 py-3">Kode</th>
                <th className="px-5 py-3">Anggota</th>
                <th className="px-5 py-3">Jenis</th>
                <th className="px-5 py-3">Jumlah</th>
                <th className="px-5 py-3">Tipe</th>
                <th className="px-5 py-3">Tanggal</th>
                <th className="px-5 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={7} className="py-14 text-center text-slate-400">Memuat data...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={7} className="py-14 text-center text-slate-400">Belum ada transaksi.</td></tr>
              ) : (
                filtered.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4 font-mono text-xs text-slate-400">{row.kode_transaksi}</td>
                    <td className="px-5 py-4">
                      <p className="font-medium text-slate-700">{row.anggota?.nama_anggota || "-"}</p>
                      <p className="text-xs text-slate-400">{row.anggota?.id_anggota}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${jenisBadge[row.jenis] || "bg-slate-100 text-slate-500"}`}>
                        {row.jenis}
                      </span>
                    </td>
                    <td className={`px-5 py-4 font-semibold ${row.tipe === "Kredit" ? "text-emerald-600" : "text-red-600"}`}>
                      {row.tipe === "Kredit" ? "+" : "-"} Rp {formatRp(row.jumlah)}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        row.tipe === "Kredit" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                      }`}>
                        {row.tipe === "Kredit" ? <ArrowDownLeft size={11} /> : <ArrowUpRight size={11} />}
                        {row.tipe}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-500">{formatDate(row.tanggal)}</td>
                    <td className="px-5 py-4 text-center">
                      <button onClick={() => setSelected(row)}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                        <Eye size={15} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {filtered.length > 0 && (
          <div className="border-t border-slate-100 px-5 py-3 text-xs text-slate-400">
            Menampilkan {filtered.length} dari {data.length} transaksi
          </div>
        )}
      </div>

      {/* MODAL DETAIL */}
      {selected && (
        <Modal title="Detail Transaksi" onClose={() => setSelected(null)}>
          <div className="space-y-3">
            {[
              ["Kode Transaksi", selected.kode_transaksi],
              ["Anggota",        `${selected.anggota?.nama_anggota} (${selected.anggota?.id_anggota})`],
              ["Jenis",          selected.jenis],
              ["Jumlah",         `Rp ${formatRp(selected.jumlah)}`],
              ["Tipe",           selected.tipe],
              ["Keterangan",     selected.keterangan || "-"],
              ["Tanggal",        formatDate(selected.tanggal)],
            ].map(([l, v]) => (
              <div key={l} className="flex gap-3 border-b border-slate-100 pb-3 last:border-0">
                <span className="w-32 shrink-0 text-xs font-semibold text-slate-400">{l}</span>
                <span className="text-sm text-slate-700">{v}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <button onClick={() => setSelected(null)} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
              Tutup
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
