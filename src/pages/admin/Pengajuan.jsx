import { useState, useEffect } from "react";
import { Search, CheckCircle, AlertTriangle, Clock, Filter } from "lucide-react";
import api from "../../lib/api";

function formatRp(v) { return new Intl.NumberFormat("id-ID").format(v ?? 0); }
function formatDate(d) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

function getStatusAngsuran(item) {
  if (item.status === "Lunas") return "lunas";
  const today      = new Date(); today.setHours(0,0,0,0);
  const jatuhTempo = new Date(item.jatuh_tempo); jatuhTempo.setHours(0,0,0,0);
  if (jatuhTempo < today) return "terlambat";
  return "belum";
}

export default function AdminPengajuan() {
  const [angsuranList, setAngsuranList] = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [search,       setSearch]       = useState("");
  const [filterStatus, setFilter]       = useState("");
  const [saving,       setSaving]       = useState(null);

  async function fetchData() {
    try {
      const res = await api.get('/angsuran');
      setAngsuranList(res.data);
    } catch (err) {
      console.error('Gagal ambil data angsuran', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchData(); }, []);

  const filtered = angsuranList.filter((a) => {
    const namaAnggota = a.pinjaman?.anggota?.nama_anggota?.toLowerCase() || "";
    const kode        = a.pinjaman?.kode_pinjaman?.toLowerCase() || "";
    const matchSearch = namaAnggota.includes(search.toLowerCase()) || kode.includes(search.toLowerCase());

    let statusKey = getStatusAngsuran(a);
    const matchStatus =
      filterStatus === ""          ? true :
      filterStatus === "Lunas"     ? statusKey === "lunas" :
      filterStatus === "Terlambat" ? statusKey === "terlambat" :
      filterStatus === "Belum Bayar" ? statusKey === "belum" : true;

    return matchSearch && matchStatus;
  });

  async function handleLunas(id) {
    if (!confirm("Tandai angsuran ini sebagai lunas?")) return;
    setSaving(id);
    try {
      await api.post(`/angsuran/${id}/lunas`);
      await fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menandai lunas.");
    } finally {
      setSaving(null);
    }
  }

  const counts = {
    total:     angsuranList.length,
    lunas:     angsuranList.filter((a) => a.status === "Lunas").length,
    belum:     angsuranList.filter((a) => getStatusAngsuran(a) === "belum").length,
    terlambat: angsuranList.filter((a) => getStatusAngsuran(a) === "terlambat").length,
  };

  return (
    <div>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Kelola Angsuran</h1>
        <p className="mt-1 text-sm text-slate-500">Pantau dan konfirmasi pembayaran angsuran pinjaman anggota.</p>
      </div>

      {/* STAT */}
      <div className="mb-6 grid grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center">
          <p className="text-2xl font-bold text-slate-800">{counts.total}</p>
          <p className="text-xs text-slate-400 mt-1">Total Angsuran</p>
        </div>
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5 text-center">
          <p className="text-2xl font-bold text-emerald-600">{counts.lunas}</p>
          <p className="text-xs text-emerald-600 mt-1">Lunas</p>
        </div>
        <div className="rounded-2xl border border-orange-100 bg-orange-50 p-5 text-center">
          <p className="text-2xl font-bold text-orange-600">{counts.belum}</p>
          <p className="text-xs text-orange-600 mt-1">Belum Bayar</p>
        </div>
        <div className="rounded-2xl border border-red-100 bg-red-50 p-5 text-center">
          <p className="text-2xl font-bold text-red-600">{counts.terlambat}</p>
          <p className="text-xs text-red-600 mt-1">Terlambat</p>
        </div>
      </div>

      {/* TABLE */}
      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 p-5">
          <div className="relative max-w-xs flex-1">
            <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
            <input type="text" placeholder="Cari nama anggota atau kode pinjaman..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-indigo-400 focus:bg-white" />
          </div>
          <div className="flex items-center gap-1.5">
            <Filter size={14} className="text-slate-400" />
            {["", "Belum Bayar", "Terlambat", "Lunas"].map((s) => (
              <button key={s} onClick={() => setFilter(s)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  filterStatus === s ? "bg-indigo-600 text-white" : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}>
                {s || "Semua"}
                {s === "Terlambat" && counts.terlambat > 0 && ` (${counts.terlambat})`}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-5 py-3">Anggota</th>
                <th className="px-5 py-3">Kode Pinjaman</th>
                <th className="px-5 py-3">Ke</th>
                <th className="px-5 py-3">Jumlah</th>
                <th className="px-5 py-3">Jatuh Tempo</th>
                <th className="px-5 py-3">Tgl Bayar</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={8} className="py-14 text-center text-slate-400">Memuat data...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={8} className="py-14 text-center text-slate-400">Belum ada data angsuran.</td></tr>
              ) : (
                filtered.map((a) => {
                  const statusKey = getStatusAngsuran(a);
                  return (
                    <tr key={a.id} className={`hover:bg-slate-50 transition-colors ${statusKey === "terlambat" ? "bg-red-50/30" : ""}`}>
                      <td className="px-5 py-4">
                        <p className="font-medium text-slate-700">{a.pinjaman?.anggota?.nama_anggota || "-"}</p>
                        <p className="text-xs text-slate-400">{a.pinjaman?.anggota?.id_anggota}</p>
                      </td>
                      <td className="px-5 py-4 font-mono text-xs text-slate-500">{a.pinjaman?.kode_pinjaman || "-"}</td>
                      <td className="px-5 py-4 font-semibold text-slate-700">ke-{a.ke}</td>
                      <td className="px-5 py-4 font-semibold text-slate-700">Rp {formatRp(a.jumlah)}</td>
                      <td className="px-5 py-4 text-xs text-slate-500">{formatDate(a.jatuh_tempo)}</td>
                      <td className="px-5 py-4 text-xs text-slate-500">{a.tgl_bayar ? formatDate(a.tgl_bayar) : "-"}</td>
                      <td className="px-5 py-4">
                        {statusKey === "lunas" && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-600">
                            <CheckCircle size={11} /> Lunas
                          </span>
                        )}
                        {statusKey === "belum" && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-semibold text-orange-600">
                            <Clock size={11} /> Belum Bayar
                          </span>
                        )}
                        {statusKey === "terlambat" && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-600">
                            <AlertTriangle size={11} /> Terlambat
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-center">
                        {statusKey !== "lunas" && (
                          <button
                            onClick={() => handleLunas(a.id)}
                            disabled={saving === a.id}
                            className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors disabled:opacity-60"
                          >
                            {saving === a.id ? "..." : "Tandai Lunas"}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {filtered.length > 0 && (
          <div className="border-t border-slate-100 px-5 py-3 text-xs text-slate-400">
            Menampilkan {filtered.length} dari {angsuranList.length} angsuran
          </div>
        )}
      </div>
    </div>
  );
}
