import { useState, useEffect } from "react";
import { Plus, Search, Eye, CheckCircle, XCircle, Trash2, X, Filter, CreditCard } from "lucide-react";
import api from "../../lib/api";

function formatRp(v) { return new Intl.NumberFormat("id-ID").format(v ?? 0); }
function formatDate(d) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

const statusStyle = {
  Pengajuan: "bg-orange-50 text-orange-600",
  Disetujui: "bg-emerald-50 text-emerald-600",
  Ditolak:   "bg-red-50 text-red-600",
  Lunas:     "bg-blue-50 text-blue-600",
};

function Modal({ title, onClose, children, size = "md" }) {
  const widths = { md: "max-w-md", lg: "max-w-2xl" };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className={`w-full ${widths[size]} rounded-2xl bg-white shadow-xl`}>
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
  jumlah_pinjaman: "",
  margin:        "2",
  tenor_bulan:   "12",
  tgl_pengajuan: new Date().toISOString().split("T")[0],
};

export default function AdminPinjaman() {
  const [pinjamanList, setPinjamanList] = useState([]);
  const [anggotaList,  setAnggotaList]  = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [search,       setSearch]       = useState("");
  const [filterStatus, setFilter]       = useState("");
  const [modalMode,    setModalMode]    = useState(null);
  const [selected,     setSelected]     = useState(null);
  const [form,         setForm]         = useState(emptyForm);
  const [saving,       setSaving]       = useState(false);
  const [error,        setError]        = useState("");

  async function fetchData() {
    try {
      const [pinRes, angRes] = await Promise.all([
        api.get('/pinjaman'),
        api.get('/anggota'),
      ]);
      setPinjamanList(pinRes.data);
      setAnggotaList(angRes.data);
    } catch (err) {
      console.error('Gagal ambil data', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchData(); }, []);

  const filtered = pinjamanList.filter((p) => {
    const matchSearch =
      p.anggota?.nama_anggota?.toLowerCase().includes(search.toLowerCase()) ||
      p.kode_pinjaman?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus ? p.status === filterStatus : true;
    return matchSearch && matchStatus;
  });

  // Hitung estimasi angsuran
  const jumlah  = Number(form.jumlah_pinjaman) || 0;
  const margin  = Number(form.margin) || 0;
  const tenor   = Number(form.tenor_bulan) || 1;
  const estimasiAngsuran = jumlah > 0 ? Math.round((jumlah * (1 + margin / 100)) / tenor) : 0;

  async function handleSave() {
    if (!form.anggota_id || !form.jumlah_pinjaman) {
      setError("Anggota dan jumlah pinjaman wajib diisi.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await api.post('/pinjaman', {
        ...form,
        jumlah_pinjaman: Number(form.jumlah_pinjaman),
        margin:          Number(form.margin),
        tenor_bulan:     Number(form.tenor_bulan),
      });
      await fetchData();
      setModalMode(null);
      setForm(emptyForm);
    } catch (err) {
      setError(err.response?.data?.message || "Gagal menyimpan data.");
    } finally {
      setSaving(false);
    }
  }

  async function handleSetujui() {
    setSaving(true);
    try {
      await api.post(`/pinjaman/${selected.id}/setujui`);
      await fetchData();
      setModalMode(null);
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menyetujui pinjaman.");
    } finally {
      setSaving(false);
    }
  }

  async function handleTolak() {
    setSaving(true);
    try {
      await api.post(`/pinjaman/${selected.id}/tolak`);
      await fetchData();
      setModalMode(null);
    } catch {
      alert("Gagal menolak pinjaman.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Hapus data pinjaman ini?")) return;
    try {
      await api.delete(`/pinjaman/${id}`);
      await fetchData();
    } catch {
      alert("Gagal menghapus data.");
    }
  }

  const counts = {
    Pengajuan: pinjamanList.filter((p) => p.status === "Pengajuan").length,
    Disetujui: pinjamanList.filter((p) => p.status === "Disetujui").length,
    Lunas:     pinjamanList.filter((p) => p.status === "Lunas").length,
  };

  return (
    <div>
      {/* HEADER */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Kelola Pinjaman</h1>
          <p className="mt-1 text-sm text-slate-500">Kelola pengajuan dan persetujuan pinjaman anggota.</p>
        </div>
        <button onClick={() => { setModalMode("add"); setForm(emptyForm); setError(""); }}
          className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-orange-600 transition-colors">
          <Plus size={16} /> Tambah Pinjaman
        </button>
      </div>

      {/* STAT */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        {[
          { label: "Pengajuan", value: counts.Pengajuan, cls: "border-orange-100 bg-orange-50 text-orange-600" },
          { label: "Disetujui", value: counts.Disetujui, cls: "border-emerald-100 bg-emerald-50 text-emerald-600" },
          { label: "Lunas",     value: counts.Lunas,     cls: "border-blue-100 bg-blue-50 text-blue-600" },
        ].map((s) => (
          <div key={s.label} className={`rounded-2xl border p-5 text-center ${s.cls}`}>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* TABLE */}
      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 p-5">
          <div className="relative max-w-xs flex-1">
            <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
            <input type="text" placeholder="Cari nama anggota atau kode..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-orange-400 focus:bg-white" />
          </div>
          <div className="flex items-center gap-1.5">
            <Filter size={14} className="text-slate-400" />
            {["", "Pengajuan", "Disetujui", "Ditolak", "Lunas"].map((s) => (
              <button key={s} onClick={() => setFilter(s)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  filterStatus === s ? "bg-orange-500 text-white" : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}>
                {s || "Semua"}
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
                <th className="px-5 py-3">Jumlah</th>
                <th className="px-5 py-3">Angsuran/Bln</th>
                <th className="px-5 py-3">Tenor</th>
                <th className="px-5 py-3">Tgl Pengajuan</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={8} className="py-14 text-center text-slate-400">Memuat data...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={8} className="py-14 text-center text-slate-400">Belum ada data pinjaman.</td></tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4 font-mono text-xs text-slate-400">{p.kode_pinjaman}</td>
                    <td className="px-5 py-4">
                      <p className="font-medium text-slate-700">{p.anggota?.nama_anggota || "-"}</p>
                      <p className="text-xs text-slate-400">{p.anggota?.id_anggota}</p>
                    </td>
                    <td className="px-5 py-4 font-semibold text-slate-700">Rp {formatRp(p.jumlah_pinjaman)}</td>
                    <td className="px-5 py-4 text-slate-600">Rp {formatRp(p.angsuran_per_bulan)}</td>
                    <td className="px-5 py-4 text-slate-600">{p.tenor_bulan} bln</td>
                    <td className="px-5 py-4 text-xs text-slate-500">{formatDate(p.tgl_pengajuan)}</td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusStyle[p.status] || "bg-slate-50 text-slate-500"}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <button onClick={() => { setSelected(p); setModalMode("view"); }}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors" title="Detail">
                          <Eye size={15} />
                        </button>
                        {p.status === "Pengajuan" && (
                          <>
                            <button onClick={() => { setSelected(p); setModalMode("setujui"); }}
                              className="rounded-lg p-1.5 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 transition-colors" title="Setujui">
                              <CheckCircle size={15} />
                            </button>
                            <button onClick={() => { setSelected(p); setModalMode("tolak"); }}
                              className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors" title="Tolak">
                              <XCircle size={15} />
                            </button>
                          </>
                        )}
                        <button onClick={() => handleDelete(p.id)}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors" title="Hapus">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL TAMBAH */}
      {modalMode === "add" && (
        <Modal title="Tambah Pinjaman" onClose={() => setModalMode(null)}>
          <div className="space-y-4">
            {error && <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</div>}
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">Pilih Anggota *</label>
              <select value={form.anggota_id} onChange={(e) => setForm({ ...form, anggota_id: e.target.value })}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-orange-400">
                <option value="">-- Pilih Anggota --</option>
                {anggotaList.map((a) => (
                  <option key={a.id} value={a.id}>{a.nama_anggota} ({a.id_anggota})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">Jumlah Pinjaman (Rp) *</label>
              <input type="number" value={form.jumlah_pinjaman} onChange={(e) => setForm({ ...form, jumlah_pinjaman: e.target.value })}
                placeholder="Contoh: 10000000"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-orange-400" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">Margin (%)</label>
                <input type="number" value={form.margin} onChange={(e) => setForm({ ...form, margin: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-orange-400" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">Tenor (Bulan)</label>
                <input type="number" value={form.tenor_bulan} onChange={(e) => setForm({ ...form, tenor_bulan: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-orange-400" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">Tanggal Pengajuan</label>
              <input type="date" value={form.tgl_pengajuan} onChange={(e) => setForm({ ...form, tgl_pengajuan: e.target.value })}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-orange-400" />
            </div>
            {estimasiAngsuran > 0 && (
              <div className="rounded-xl bg-orange-50 border border-orange-100 px-4 py-3">
                <p className="text-xs text-orange-600">Estimasi angsuran per bulan:</p>
                <p className="text-lg font-bold text-orange-700">Rp {formatRp(estimasiAngsuran)}</p>
              </div>
            )}
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button onClick={() => setModalMode(null)} className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">Batal</button>
            <button onClick={handleSave} disabled={saving}
              className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 disabled:opacity-60">
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </Modal>
      )}

      {/* MODAL DETAIL */}
      {modalMode === "view" && selected && (
        <Modal title="Detail Pinjaman" onClose={() => setModalMode(null)} size="lg">
          <div className="space-y-3">
            {[
              ["Kode Pinjaman",    selected.kode_pinjaman],
              ["Anggota",         `${selected.anggota?.nama_anggota} (${selected.anggota?.id_anggota})`],
              ["Jumlah Pinjaman", `Rp ${formatRp(selected.jumlah_pinjaman)}`],
              ["Margin",          `${selected.margin}%`],
              ["Tenor",           `${selected.tenor_bulan} bulan`],
              ["Angsuran/Bulan",  `Rp ${formatRp(selected.angsuran_per_bulan)}`],
              ["Status",          selected.status],
              ["Tgl Pengajuan",   formatDate(selected.tgl_pengajuan)],
              ["Tgl Disetujui",   formatDate(selected.tgl_disetujui)],
            ].map(([l, v]) => (
              <div key={l} className="flex gap-3 border-b border-slate-100 pb-2">
                <span className="w-36 shrink-0 text-xs font-semibold text-slate-400">{l}</span>
                <span className="text-sm text-slate-700">{v || "-"}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 flex justify-end gap-3">
            {selected.status === "Pengajuan" && (
              <>
                <button onClick={() => setModalMode("setujui")}
                  className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">
                  Setujui
                </button>
                <button onClick={() => setModalMode("tolak")}
                  className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600">
                  Tolak
                </button>
              </>
            )}
            <button onClick={() => setModalMode(null)} className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">Tutup</button>
          </div>
        </Modal>
      )}

      {/* MODAL SETUJUI */}
      {modalMode === "setujui" && selected && (
        <Modal title="Setujui Pinjaman" onClose={() => setModalMode(null)}>
          <p className="text-sm text-slate-600">
            Setujui pinjaman <strong>{selected.kode_pinjaman}</strong> untuk{" "}
            <strong>{selected.anggota?.nama_anggota}</strong> sebesar{" "}
            <strong>Rp {formatRp(selected.jumlah_pinjaman)}</strong>?
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Sistem akan otomatis membuat {selected.tenor_bulan} jadwal angsuran setelah pinjaman disetujui.
          </p>
          <div className="mt-6 flex justify-end gap-3">
            <button onClick={() => setModalMode(null)} className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">Batal</button>
            <button onClick={handleSetujui} disabled={saving}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60">
              {saving ? "Memproses..." : "Ya, Setujui"}
            </button>
          </div>
        </Modal>
      )}

      {/* MODAL TOLAK */}
      {modalMode === "tolak" && selected && (
        <Modal title="Tolak Pinjaman" onClose={() => setModalMode(null)}>
          <p className="text-sm text-slate-600">
            Tolak pinjaman <strong>{selected.kode_pinjaman}</strong> dari{" "}
            <strong>{selected.anggota?.nama_anggota}</strong>?
          </p>
          <div className="mt-6 flex justify-end gap-3">
            <button onClick={() => setModalMode(null)} className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">Batal</button>
            <button onClick={handleTolak} disabled={saving}
              className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 disabled:opacity-60">
              {saving ? "Memproses..." : "Ya, Tolak"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
