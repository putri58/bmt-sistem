import { useState, useEffect } from "react";
import { Plus, Eye, Pencil, Trash2, X, Search, Shield } from "lucide-react";
import api from "../../lib/api";

function formatDate(d) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

const roleBadge = {
  admin:   "bg-indigo-50 text-indigo-600",
  anggota: "bg-slate-100 text-slate-500",
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

const emptyForm = { nama: "", username: "", email: "", password: "", role: "admin", status: "aktif" };

export default function ManajemenAdmin() {
  const [data, setData]           = useState([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState("");
  const [modalMode, setModalMode] = useState(null);
  const [selected, setSelected]   = useState(null);
  const [form, setForm]           = useState(emptyForm);
  const [saving, setSaving]       = useState(false);
  const [error, setError]         = useState("");

  async function fetchAdmins() {
    try {
      const res = await api.get('/users');
      // Tampilkan hanya yang role admin
      setData(res.data.filter((u) => u.role === 'admin'));
    } catch (err) {
      console.error('Gagal ambil data admin', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchAdmins(); }, []);

  const filtered = data.filter((d) =>
    d.nama?.toLowerCase().includes(search.toLowerCase()) ||
    d.email?.toLowerCase().includes(search.toLowerCase()) ||
    d.username?.toLowerCase().includes(search.toLowerCase())
  );

  function openAdd()         { setForm(emptyForm); setError(""); setModalMode("add"); }
  function openEdit(row)     { setSelected(row); setForm({ ...row, password: "" }); setError(""); setModalMode("edit"); }
  function openView(row)     { setSelected(row); setModalMode("view"); }
  function openDelete(row)   { setSelected(row); setModalMode("delete"); }
  function closeModal()      { setModalMode(null); setSelected(null); setError(""); }

  async function handleSave() {
    setSaving(true);
    setError("");
    try {
      if (modalMode === "add") {
        await api.post('/users', { ...form, role: 'admin' });
      } else {
        // Kalau password kosong, jangan kirim password
        const payload = { ...form };
        if (!payload.password) delete payload.password;
        await api.put(`/users/${selected.id}`, payload);
      }
      await fetchAdmins();
      closeModal();
    } catch (err) {
      const msg = err.response?.data?.message || "Gagal menyimpan data";
      setError(msg);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    setSaving(true);
    try {
      await api.delete(`/users/${selected.id}`);
      await fetchAdmins();
      closeModal();
    } catch (err) {
      alert('Gagal menghapus admin');
    } finally {
      setSaving(false);
    }
  }

  const totalAdmin  = data.filter((d) => d.status === 'aktif').length;
  const totalNonAktif = data.filter((d) => d.status !== 'aktif').length;

  return (
    <div>
      {/* HEADER */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Manajemen Admin</h1>
          <p className="mt-1 text-sm text-slate-500">Kelola akun admin dan hak akses sistem koperasi.</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition-colors">
          <Plus size={16} /> Tambah Admin
        </button>
      </div>

      {/* STATS */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2 mb-1">
            <Shield size={14} className="text-slate-400" />
            <p className="text-xs text-slate-500">Total Admin</p>
          </div>
          <p className="text-2xl font-bold text-slate-800">{data.length}</p>
        </div>
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
          <div className="flex items-center gap-2 mb-1">
            <Shield size={14} className="text-emerald-500" />
            <p className="text-xs text-emerald-600">Aktif</p>
          </div>
          <p className="text-2xl font-bold text-emerald-600">{totalAdmin}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="flex items-center gap-2 mb-1">
            <Shield size={14} className="text-slate-400" />
            <p className="text-xs text-slate-500">Tidak Aktif</p>
          </div>
          <p className="text-2xl font-bold text-slate-600">{totalNonAktif}</p>
        </div>
      </div>

      {/* TABLE */}
      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="flex items-center gap-3 border-b border-slate-100 p-5">
          <div className="relative max-w-xs flex-1">
            <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
            <input type="text" placeholder="Cari nama, username, atau email..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-indigo-400 focus:bg-white" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-5 py-3">Admin</th>
                <th className="px-5 py-3">Username</th>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Tgl Bergabung</th>
                <th className="px-5 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={6} className="py-14 text-center text-slate-400">Memuat data...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="py-14 text-center text-slate-400">Tidak ada data admin.</td></tr>
              ) : (
                filtered.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">
                          {row.nama?.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                        </div>
                        <div>
                          <p className="font-medium text-slate-700">{row.nama}</p>
                          <p className="text-xs text-slate-400">{row.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-mono text-xs text-slate-600">{row.username}</td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${roleBadge[row.role] || "bg-slate-100 text-slate-500"}`}>
                        {row.role}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        row.status === "aktif" ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"
                      }`}>
                        {row.status === "aktif" ? "Aktif" : "Tidak Aktif"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-500">{formatDate(row.created_at)}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => openView(row)} title="Lihat"
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                          <Eye size={15} />
                        </button>
                        <button onClick={() => openEdit(row)} title="Edit"
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                          <Pencil size={15} />
                        </button>
                        <button onClick={() => openDelete(row)} title="Hapus"
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors">
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

      {/* MODAL ADD / EDIT */}
      {(modalMode === "add" || modalMode === "edit") && (
        <Modal title={modalMode === "add" ? "Tambah Admin" : "Edit Admin"} onClose={closeModal}>
          <div className="space-y-4">
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600">
                {error}
              </div>
            )}
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">Nama Lengkap</label>
              <input type="text" value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">Username</label>
              <input type="text" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">
                Password {modalMode === "edit" && <span className="font-normal text-slate-400">(kosongkan jika tidak diubah)</span>}
              </label>
              <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder={modalMode === "add" ? "Min. 8 karakter" : "••••••••"}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none">
                <option value="aktif">Aktif</option>
                <option value="nonaktif">Tidak Aktif</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button onClick={closeModal} className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
              Batal
            </button>
            <button onClick={handleSave} disabled={saving}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60">
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </Modal>
      )}

      {/* MODAL VIEW */}
      {modalMode === "view" && selected && (
        <Modal title="Detail Admin" onClose={closeModal}>
          <div className="space-y-3">
            {[
              ["Nama",         selected.nama],
              ["Username",     selected.username],
              ["Email",        selected.email],
              ["Role",         selected.role],
              ["Status",       selected.status === "aktif" ? "Aktif" : "Tidak Aktif"],
              ["Tgl Bergabung",formatDate(selected.created_at)],
            ].map(([l, v]) => (
              <div key={l} className="flex gap-3 border-b border-slate-100 pb-3">
                <span className="w-32 shrink-0 text-xs font-semibold text-slate-500">{l}</span>
                <span className="text-sm text-slate-700">{v}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <button onClick={closeModal} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
              Tutup
            </button>
          </div>
        </Modal>
      )}

      {/* MODAL DELETE */}
      {modalMode === "delete" && selected && (
        <Modal title="Hapus Admin" onClose={closeModal}>
          <p className="text-sm text-slate-600">
            Hapus akun admin <strong>{selected.nama}</strong>? Tindakan ini tidak dapat dibatalkan.
          </p>
          <div className="mt-6 flex justify-end gap-3">
            <button onClick={closeModal} className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
              Batal
            </button>
            <button onClick={handleDelete} disabled={saving}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60">
              {saving ? "Menghapus..." : "Ya, Hapus"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
