import { useState, useEffect } from "react";
import { Plus, Search, Trash2, X, ArrowDownLeft, ArrowUpRight, Filter } from "lucide-react";
import api from "../../lib/api";

function formatRp(v) { return new Intl.NumberFormat("id-ID").format(v ?? 0); }
function formatDate(d) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

const jenisBadge = {
  Wadiah:     "bg-blue-50 text-blue-600",
  Mudharabah: "bg-purple-50 text-purple-600",
  Wajib:      "bg-orange-50 text-orange-600",
  Pokok:      "bg-emerald-50 text-emerald-600",
};

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="font-semibold text-slate-800">{title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
        </div>
        <div className="max-h-[75vh] overflow-y-auto px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

const emptyForm = {
  anggota_id:    "",
  jenis_simpanan: "Wajib",
  tipe:          "Setor",
  jumlah:        "",
  tanggal:       new Date().toISOString().split("T")[0],
  keterangan:    "",
};

export default function AdminSimpanan() {
  const [simpananList, setSimpananList] = useState([]);
  const [anggotaList,  setAnggotaList]  = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [search,       setSearch]       = useState("");
  const [filterTipe,   setFilterTipe]   = useState("");
  const [modalOpen,    setModalOpen]    = useState(false);
  const [form,         setForm]         = useState(emptyForm);
  const [saving,       setSaving]       = useState(false);
  const [error,        setError]        = useState("");

  async function fetchData() {
    try {
      const [simpRes, angRes] = await Promise.all([
        api.get('/simpanan'),
        api.get('/anggota'),
      ]);
      setSimpananList(simpRes.data);
      setAnggotaList(angRes.data);
    } catch (err) {
      console.error('Gagal ambil data', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchData(); }, []);

  const filtered = simpananList.filter((s) => {
    const matchSearch =
      s.anggota?.nama_anggota?.toLowerCase().includes(search.toLowerCase()) ||
      s.kode_simpanan?.toLowerCase().includes(search.toLowerCase());
    const matchTipe = filterTipe ? s.tipe === filterTipe : true;
    return matchSearch && matchTipe;
  });

  async function handleSave() {
    if (!form.anggota_id || !form.jumlah) {
      setError("Anggota dan jumlah wajib diisi.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await api.post('/simpanan', {
        ...form,
        jumlah: Number(form.jumlah),
      });
      await fetchData();
      setModalOpen(false);
      setForm(emptyForm);
    } catch (err) {
      setError(err.response?.data?.message || "Gagal menyimpan data.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Hapus data simpanan ini?")) return;
    try {
      await api.delete(`/simpanan/${id}`);
      await fetchData();
    } catch {
      alert("Gagal menghapus data.");
    }
  }

  // Total simpanan seluruh anggota
  const totalSetor = simpananList.filter((s) => s.tipe === "Setor").reduce((sum, s) => sum + Number(s.jumlah), 0);
  const totalTarik = simpananList.filter((s) => s.tipe === "Tarik").reduce((sum, s) => sum + Number(s.jumlah), 0);

  return (
    <div>
      {/* HEADER */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Kelola Simpanan</h1>
          <p className="mt-1 text-sm text-slate-500">Catat setoran dan penarikan simpanan anggota.</p>
        </div>
        <button onClick={() => { setModalOpen(true); setForm(emptyForm); setError(""); }}
          className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 transition-colors">
          <Plus size={16} /> Tambah Simpanan
        </button>
      </div>

      {/* STAT */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-xs text-slate-400">Total Transaksi</p>
          <p className="mt-1 text-2xl font-bold text-slate-800">{simpananList.length}</p>
        </div>
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
          <p className="text-xs text-emerald-600">Total Setoran</p>
          <p className="mt-1 text-xl font-bold text-emerald-700">Rp {formatRp(totalSetor)}</p>
        </div>
        <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
          <p className="text-xs text-red-600">Total Penarikan</p>
          <p className="mt-1 text-xl font-bold text-red-700">Rp {formatRp(totalTarik)}</p>
        </div>
      </div>

      {/* TABLE */}
      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 p-5">
          <div className="relative max-w-xs flex-1">
            <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
            <input type="text" placeholder="Cari nama anggota atau kode..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-emerald-400 focus:bg-white" />
          </div>
          <div className="flex items-center gap-1.5">
            <Filter size={14} className="text-slate-400" />
            {["", "Setor", "Tarik"].map((t) => (
              <button key={t} onClick={() => setFilterTipe(t)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  filterTipe === t ? "bg-emerald-600 text-white" : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}>
                {t || "Semua"}
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
                <th className="px-5 py-3">Tipe</th>
                <th className="px-5 py-3">Jumlah</th>
                <th className="px-5 py-3">Tanggal</th>
                <th className="px-5 py-3">Keterangan</th>
                <th className="px-5 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={8} className="py-14 text-center text-slate-400">Memuat data...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={8} className="py-14 text-center text-slate-400">Belum ada data simpanan.</td></tr>
              ) : (
                filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4 font-mono text-xs text-slate-400">{s.kode_simpanan}</td>
                    <td className="px-5 py-4">
                      <p className="font-medium text-slate-700">{s.anggota?.nama_anggota || "-"}</p>
                      <p className="text-xs text-slate-400">{s.anggota?.id_anggota}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${jenisBadge[s.jenis_simpanan] || "bg-slate-100 text-slate-500"}`}>
                        {s.jenis_simpanan}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        s.tipe === "Setor" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                      }`}>
                        {s.tipe === "Setor" ? <ArrowDownLeft size={11} /> : <ArrowUpRight size={11} />}
                        {s.tipe}
                      </span>
                    </td>
                    <td className={`px-5 py-4 font-semibold ${s.tipe === "Setor" ? "text-emerald-600" : "text-red-600"}`}>
                      {s.tipe === "Setor" ? "+" : "-"} Rp {formatRp(s.jumlah)}
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-500">{formatDate(s.tanggal)}</td>
                    <td className="px-5 py-4 text-xs text-slate-400">{s.keterangan || "-"}</td>
                    <td className="px-5 py-4 text-center">
                      <button onClick={() => handleDelete(s.id)}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL TAMBAH */}
      {modalOpen && (
        <Modal title="Tambah Simpanan" onClose={() => setModalOpen(false)}>
          <div className="space-y-4">
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</div>
            )}
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">Pilih Anggota *</label>
              <select value={form.anggota_id} onChange={(e) => setForm({ ...form, anggota_id: e.target.value })}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-emerald-400">
                <option value="">-- Pilih Anggota --</option>
                {anggotaList.map((a) => (
                  <option key={a.id} value={a.id}>{a.nama_anggota} ({a.id_anggota})</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">Jenis Simpanan *</label>
                <select value={form.jenis_simpanan} onChange={(e) => setForm({ ...form, jenis_simpanan: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-emerald-400">
                  {["Pokok", "Wajib", "Wadiah", "Mudharabah"].map((j) => (
                    <option key={j} value={j}>{j}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">Tipe *</label>
                <select value={form.tipe} onChange={(e) => setForm({ ...form, tipe: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-emerald-400">
                  <option value="Setor">Setor</option>
                  <option value="Tarik">Tarik</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">Jumlah (Rp) *</label>
              <input type="number" value={form.jumlah} onChange={(e) => setForm({ ...form, jumlah: e.target.value })}
                placeholder="Contoh: 500000"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-emerald-400" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">Tanggal *</label>
              <input type="date" value={form.tanggal} onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-emerald-400" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">Keterangan</label>
              <input type="text" value={form.keterangan} onChange={(e) => setForm({ ...form, keterangan: e.target.value })}
                placeholder="Contoh: Setoran rutin September"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-emerald-400" />
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button onClick={() => setModalOpen(false)} className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
              Batal
            </button>
            <button onClick={handleSave} disabled={saving}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60">
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
