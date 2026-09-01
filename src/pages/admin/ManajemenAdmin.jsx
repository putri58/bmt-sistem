import { useState } from "react";
import { UserCog, Plus, Eye, Pencil, Trash2, X, Search, Shield, ShieldAlert } from "lucide-react";

const roleList = ["Super Admin", "Admin", "Kasir", "Viewer"];

const initialData = [
  { id: "ADM-001", nama: "Budi Hartono", email: "budi@koperasi.id", noHp: "081234567890", role: "Super Admin", status: "Aktif", tglBergabung: "2024-01-15" },
  { id: "ADM-002", nama: "Siti Rahayu", email: "siti@koperasi.id", noHp: "082345678901", role: "Admin", status: "Aktif", tglBergabung: "2024-03-10" },
  { id: "ADM-003", nama: "Rizal Fadhli", email: "rizal@koperasi.id", noHp: "083456789012", role: "Kasir", status: "Aktif", tglBergabung: "2024-06-01" },
  { id: "ADM-004", nama: "Dewi Kartika", email: "dewi@koperasi.id", noHp: "084567890123", role: "Viewer", status: "Tidak Aktif", tglBergabung: "2025-01-20" },
];

const roleBadge = {
  "Super Admin": "bg-purple-50 text-purple-600",
  Admin: "bg-indigo-50 text-indigo-600",
  Kasir: "bg-blue-50 text-blue-600",
  Viewer: "bg-slate-100 text-slate-500",
};

function formatDate(d) { return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }); }

export default function ManajemenAdmin() {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [modalMode, setModalMode] = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ nama: "", email: "", noHp: "", role: "Admin", status: "Aktif" });

  const filtered = data.filter((d) =>
    d.nama.toLowerCase().includes(search.toLowerCase()) || d.email.toLowerCase().includes(search.toLowerCase())
  );

  function openAdd() { setForm({ nama: "", email: "", noHp: "", role: "Admin", status: "Aktif" }); setModalMode("add"); }
  function openEdit(row) { setSelected(row); setForm({ ...row }); setModalMode("edit"); }
  function openView(row) { setSelected(row); setModalMode("view"); }
  function openDelete(row) { setSelected(row); setModalMode("delete"); }
  function closeModal() { setModalMode(null); setSelected(null); }

  function handleSave() {
    if (modalMode === "add") {
      setData([...data, { ...form, id: `ADM-${String(data.length + 1).padStart(3, "0")}`, tglBergabung: new Date().toISOString().split("T")[0] }]);
    } else {
      setData(data.map((d) => (d.id === selected.id ? { ...form, id: selected.id, tglBergabung: selected.tglBergabung } : d)));
    }
    closeModal();
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Manajemen Admin</h1>
          <p className="mt-1 text-sm text-slate-500">Kelola akun admin dan hak akses sistem koperasi.</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition-colors">
          <Plus size={16} />
          Tambah Admin
        </button>
      </div>

      {/* STATS */}
      <div className="mb-6 grid grid-cols-4 gap-4">
        {roleList.map((role) => (
          <div key={role} className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2 mb-1">
              <Shield size={14} className="text-slate-400" />
              <p className="text-xs text-slate-500">{role}</p>
            </div>
            <p className="text-2xl font-bold text-slate-800">{data.filter((d) => d.role === role).length}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="flex items-center gap-3 border-b border-slate-100 p-5">
          <div className="relative max-w-xs flex-1">
            <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
            <input type="text" placeholder="Cari nama atau email..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-indigo-400 focus:bg-white" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-5 py-3">Admin</th>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">No. HP</th>
                <th className="px-5 py-3">Tgl Bergabung</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">
                        {row.nama.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                      </div>
                      <div>
                        <p className="font-medium text-slate-700">{row.nama}</p>
                        <p className="text-xs text-slate-400">{row.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${roleBadge[row.role]}`}>{row.role}</span>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{row.noHp}</td>
                  <td className="px-5 py-4 text-slate-500">{formatDate(row.tglBergabung)}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${row.status === "Aktif" ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"}`}>{row.status}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => openView(row)} className="rounded-lg p-1.5 text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"><Eye size={15} /></button>
                      <button onClick={() => openEdit(row)} className="rounded-lg p-1.5 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"><Pencil size={15} /></button>
                      <button onClick={() => openDelete(row)} className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL ADD/EDIT */}
      {(modalMode === "add" || modalMode === "edit") && (
        <Modal title={modalMode === "add" ? "Tambah Admin" : "Edit Admin"} onClose={closeModal}>
          <div className="space-y-4">
            {[["Nama Lengkap", "nama", "text"], ["Email", "email", "email"], ["No. HP", "noHp", "text"]].map(([label, key, type]) => (
              <div key={key}>
                <label className="mb-1 block text-xs font-semibold text-slate-600">{label}</label>
                <input type={type} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400" />
              </div>
            ))}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">Role</label>
                <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none">
                  {roleList.map((r) => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">Status</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none">
                  <option>Aktif</option>
                  <option>Tidak Aktif</option>
                </select>
              </div>
            </div>
            {modalMode === "add" && (
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">Password Sementara</label>
                <input type="password" placeholder="Min. 8 karakter" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400" />
              </div>
            )}
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button onClick={closeModal} className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">Batal</button>
            <button onClick={handleSave} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">Simpan</button>
          </div>
        </Modal>
      )}

      {/* MODAL VIEW */}
      {modalMode === "view" && selected && (
        <Modal title="Detail Admin" onClose={closeModal}>
          <div className="space-y-3">
            {[["ID", selected.id], ["Nama", selected.nama], ["Email", selected.email], ["No. HP", selected.noHp], ["Role", selected.role], ["Status", selected.status], ["Tgl Bergabung", formatDate(selected.tglBergabung)]].map(([l, v]) => (
              <div key={l} className="flex gap-3 border-b border-slate-100 pb-3">
                <span className="w-32 shrink-0 text-xs font-semibold text-slate-500">{l}</span>
                <span className="text-sm text-slate-700">{v}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <button onClick={closeModal} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">Tutup</button>
          </div>
        </Modal>
      )}

      {/* MODAL DELETE */}
      {modalMode === "delete" && selected && (
        <Modal title="Hapus Admin" onClose={closeModal}>
          <p className="text-sm text-slate-600">Hapus akun admin <strong>{selected.nama}</strong>? Tindakan ini tidak dapat dibatalkan.</p>
          <div className="mt-6 flex justify-end gap-3">
            <button onClick={closeModal} className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">Batal</button>
            <button onClick={() => { setData(data.filter((d) => d.id !== selected.id)); closeModal(); }} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">Hapus</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

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
