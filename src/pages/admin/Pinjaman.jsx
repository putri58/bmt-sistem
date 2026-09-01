import { useState } from "react";
import { Plus, Search, Eye, Pencil, Trash2, X } from "lucide-react";

const statusList = ["Aktif", "Lunas", "Macet"];
const jenisList = ["Pinjaman Modal Usaha", "Pinjaman Pendidikan", "Pinjaman Konsumtif", "Pinjaman Renovasi", "Pinjaman Darurat"];

const initialData = [
  { id: "PJM-001", anggota: "Sari Wulandari", jenis: "Pinjaman Modal Usaha", pokok: 15000000, bunga: 1.5, tenor: 12, tglMulai: "2026-03-01", status: "Aktif" },
  { id: "PJM-002", anggota: "Dedi Kurniawan", jenis: "Pinjaman Pendidikan", pokok: 8000000, bunga: 1.2, tenor: 10, tglMulai: "2026-04-01", status: "Aktif" },
  { id: "PJM-003", anggota: "Rina Melati", jenis: "Pinjaman Konsumtif", pokok: 5000000, bunga: 1.5, tenor: 6, tglMulai: "2026-02-01", status: "Lunas" },
  { id: "PJM-004", anggota: "Budi Santoso", jenis: "Pinjaman Renovasi", pokok: 12000000, bunga: 1.8, tenor: 18, tglMulai: "2025-10-01", status: "Macet" },
  { id: "PJM-005", anggota: "Ahmad Fauzi", jenis: "Pinjaman Modal Usaha", pokok: 20000000, bunga: 1.5, tenor: 24, tglMulai: "2026-01-01", status: "Aktif" },
  { id: "PJM-006", anggota: "Hendra Gunawan", jenis: "Pinjaman Darurat", pokok: 3000000, bunga: 1.0, tenor: 3, tglMulai: "2026-07-01", status: "Aktif" },
];

const statusColors = {
  Aktif: "bg-emerald-50 text-emerald-600",
  Lunas: "bg-blue-50 text-blue-600",
  Macet: "bg-red-50 text-red-600",
};

function formatRupiah(v) { return new Intl.NumberFormat("id-ID").format(v); }
function formatDate(d) { return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }); }

export default function Pinjaman() {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [modalMode, setModalMode] = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ anggota: "", jenis: jenisList[0], pokok: "", bunga: "1.5", tenor: "", tglMulai: "", status: "Aktif" });

  const filtered = data.filter((d) => {
    const matchSearch = d.anggota.toLowerCase().includes(search.toLowerCase()) || d.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus ? d.status === filterStatus : true;
    return matchSearch && matchStatus;
  });

  function openAdd() { setForm({ anggota: "", jenis: jenisList[0], pokok: "", bunga: "1.5", tenor: "", tglMulai: new Date().toISOString().split("T")[0], status: "Aktif" }); setModalMode("add"); }
  function openEdit(row) { setSelected(row); setForm({ ...row, pokok: String(row.pokok), bunga: String(row.bunga), tenor: String(row.tenor) }); setModalMode("edit"); }
  function openView(row) { setSelected(row); setModalMode("view"); }
  function openDelete(row) { setSelected(row); setModalMode("delete"); }
  function closeModal() { setModalMode(null); setSelected(null); }

  function handleSave() {
    const entry = { ...form, pokok: Number(form.pokok) || 0, bunga: Number(form.bunga) || 0, tenor: Number(form.tenor) || 0 };
    if (modalMode === "add") {
      setData([...data, { ...entry, id: `PJM-${String(data.length + 1).padStart(3, "0")}` }]);
    } else {
      setData(data.map((d) => (d.id === selected.id ? { ...entry, id: selected.id } : d)));
    }
    closeModal();
  }

  const angsuranBulanan = (row) => {
    const total = row.pokok + (row.pokok * (row.bunga / 100) * row.tenor);
    return Math.round(total / row.tenor);
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Data Pinjaman</h1>
          <p className="mt-1 text-sm text-slate-500">Kelola data pinjaman anggota koperasi.</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition-colors">
          <Plus size={16} />
          Tambah Pinjaman
        </button>
      </div>

      {/* STAT CARDS */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        {[
          { label: "Total Pinjaman Aktif", value: data.filter((d) => d.status === "Aktif").length },
          { label: "Total Pinjaman Lunas", value: data.filter((d) => d.status === "Lunas").length },
          { label: "Pinjaman Macet", value: data.filter((d) => d.status === "Macet").length },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs text-slate-500">{s.label}</p>
            <p className="mt-1 text-2xl font-bold text-slate-800">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 p-5">
          <div className="relative max-w-xs flex-1">
            <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
            <input type="text" placeholder="Cari nama atau ID..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-indigo-400 focus:bg-white" />
          </div>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none">
            <option value="">Semua Status</option>
            {statusList.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-5 py-3">ID</th>
                <th className="px-5 py-3">Anggota</th>
                <th className="px-5 py-3">Jenis</th>
                <th className="px-5 py-3">Pokok</th>
                <th className="px-5 py-3">Angsuran/Bln</th>
                <th className="px-5 py-3">Tenor</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr><td colSpan={8} className="py-12 text-center text-slate-400">Tidak ada data.</td></tr>
              ) : filtered.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 font-mono text-xs text-slate-500">{row.id}</td>
                  <td className="px-5 py-4 font-medium text-slate-700">{row.anggota}</td>
                  <td className="px-5 py-4 text-slate-600">{row.jenis}</td>
                  <td className="px-5 py-4 font-semibold text-slate-700">Rp {formatRupiah(row.pokok)}</td>
                  <td className="px-5 py-4 text-slate-600">Rp {formatRupiah(angsuranBulanan(row))}</td>
                  <td className="px-5 py-4 text-slate-600">{row.tenor} bln</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusColors[row.status]}`}>{row.status}</span>
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
        <Modal title={modalMode === "add" ? "Tambah Pinjaman" : "Edit Pinjaman"} onClose={closeModal}>
          <div className="space-y-4">
            {[
              { label: "Nama Anggota", key: "anggota", type: "text" },
              { label: "Pokok Pinjaman (Rp)", key: "pokok", type: "number" },
              { label: "Bunga (% per bulan)", key: "bunga", type: "number" },
              { label: "Tenor (bulan)", key: "tenor", type: "number" },
              { label: "Tanggal Mulai", key: "tglMulai", type: "date" },
            ].map(({ label, key, type }) => (
              <div key={key}>
                <label className="mb-1 block text-xs font-semibold text-slate-600">{label}</label>
                <input type={type} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400" />
              </div>
            ))}
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">Jenis Pinjaman</label>
              <select value={form.jenis} onChange={(e) => setForm({ ...form, jenis: e.target.value })}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none">
                {jenisList.map((j) => <option key={j}>{j}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none">
                {statusList.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button onClick={closeModal} className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">Batal</button>
            <button onClick={handleSave} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">Simpan</button>
          </div>
        </Modal>
      )}

      {/* MODAL VIEW */}
      {modalMode === "view" && selected && (
        <Modal title="Detail Pinjaman" onClose={closeModal}>
          <div className="space-y-3">
            {[["ID", selected.id], ["Anggota", selected.anggota], ["Jenis", selected.jenis], ["Pokok", `Rp ${formatRupiah(selected.pokok)}`], ["Bunga", `${selected.bunga}% per bulan`], ["Tenor", `${selected.tenor} bulan`], ["Tgl Mulai", formatDate(selected.tglMulai)], ["Status", selected.status]].map(([l, v]) => (
              <div key={l} className="flex gap-3 border-b border-slate-100 pb-3">
                <span className="w-28 shrink-0 text-xs font-semibold text-slate-500">{l}</span>
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
        <Modal title="Hapus Pinjaman" onClose={closeModal}>
          <p className="text-sm text-slate-600">Hapus data pinjaman <strong>{selected.id}</strong> milik <strong>{selected.anggota}</strong>?</p>
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
