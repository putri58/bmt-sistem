import { useState } from "react";
import { Plus, Search, Eye, Pencil, Trash2, X, Wallet } from "lucide-react";

const jenisSimpanan = ["Simpanan Pokok", "Simpanan Wajib", "Simpanan Sukarela", "Simpanan Berjangka"];

const initialData = [
  { id: "SMP-001", anggota: "Sari Wulandari", idAnggota: "AGT-001", jenis: "Simpanan Wajib", nominal: 500000, tanggal: "2026-08-05", keterangan: "Setoran rutin Agustus" },
  { id: "SMP-002", anggota: "Dedi Kurniawan", idAnggota: "AGT-002", jenis: "Simpanan Pokok", nominal: 1000000, tanggal: "2026-08-10", keterangan: "Simpanan pokok awal" },
  { id: "SMP-003", anggota: "Rina Melati", idAnggota: "AGT-003", jenis: "Simpanan Sukarela", nominal: 2000000, tanggal: "2026-08-12", keterangan: "Tabungan tambahan" },
  { id: "SMP-004", anggota: "Ahmad Fauzi", idAnggota: "AGT-005", jenis: "Simpanan Berjangka", nominal: 5000000, tanggal: "2026-08-15", keterangan: "Deposito 6 bulan" },
  { id: "SMP-005", anggota: "Hendra Gunawan", idAnggota: "AGT-007", jenis: "Simpanan Wajib", nominal: 500000, tanggal: "2026-08-20", keterangan: "Setoran rutin Agustus" },
  { id: "SMP-006", anggota: "Fitriani", idAnggota: "AGT-006", jenis: "Simpanan Pokok", nominal: 1000000, tanggal: "2026-08-25", keterangan: "Simpanan pokok pendaftaran" },
];

const jenisBadgeColor = {
  "Simpanan Pokok": "bg-indigo-50 text-indigo-600",
  "Simpanan Wajib": "bg-blue-50 text-blue-600",
  "Simpanan Sukarela": "bg-emerald-50 text-emerald-600",
  "Simpanan Berjangka": "bg-orange-50 text-orange-600",
};

function formatRupiah(v) {
  return new Intl.NumberFormat("id-ID").format(v);
}

function formatDate(d) {
  return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

export default function Simpanan() {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [filterJenis, setFilterJenis] = useState("");
  const [modalMode, setModalMode] = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ anggota: "", idAnggota: "", jenis: jenisSimpanan[0], nominal: "", tanggal: "", keterangan: "" });

  const filtered = data.filter((d) => {
    const matchSearch = d.anggota.toLowerCase().includes(search.toLowerCase()) || d.id.toLowerCase().includes(search.toLowerCase());
    const matchJenis = filterJenis ? d.jenis === filterJenis : true;
    return matchSearch && matchJenis;
  });

  const totalNominal = filtered.reduce((s, d) => s + d.nominal, 0);

  function openAdd() {
    setForm({ anggota: "", idAnggota: "", jenis: jenisSimpanan[0], nominal: "", tanggal: new Date().toISOString().split("T")[0], keterangan: "" });
    setModalMode("add");
  }
  function openEdit(row) { setSelected(row); setForm({ ...row, nominal: String(row.nominal) }); setModalMode("edit"); }
  function openView(row) { setSelected(row); setModalMode("view"); }
  function openDelete(row) { setSelected(row); setModalMode("delete"); }
  function closeModal() { setModalMode(null); setSelected(null); }

  function handleSave() {
    if (modalMode === "add") {
      const newId = `SMP-${String(data.length + 1).padStart(3, "0")}`;
      setData([...data, { ...form, id: newId, nominal: Number(form.nominal) || 0 }]);
    } else {
      setData(data.map((d) => (d.id === selected.id ? { ...form, id: selected.id, nominal: Number(form.nominal) || 0 } : d)));
    }
    closeModal();
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Data Simpanan</h1>
          <p className="mt-1 text-sm text-slate-500">Kelola data simpanan seluruh anggota koperasi.</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition-colors">
          <Plus size={16} />
          Tambah Simpanan
        </button>
      </div>

      {/* STAT */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "Total Entri", value: filtered.length, icon: Wallet, color: "indigo" },
          { label: "Total Nominal", value: `Rp ${formatRupiah(totalNominal)}`, icon: Wallet, color: "emerald" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs text-slate-500">{s.label}</p>
            <p className="mt-1 text-xl font-bold text-slate-800">{s.value}</p>
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
          <select value={filterJenis} onChange={(e) => setFilterJenis(e.target.value)}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-indigo-400">
            <option value="">Semua Jenis</option>
            {jenisSimpanan.map((j) => <option key={j}>{j}</option>)}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-5 py-3">ID</th>
                <th className="px-5 py-3">Anggota</th>
                <th className="px-5 py-3">Jenis</th>
                <th className="px-5 py-3">Nominal</th>
                <th className="px-5 py-3">Tanggal</th>
                <th className="px-5 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="py-12 text-center text-slate-400">Tidak ada data.</td></tr>
              ) : filtered.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 font-mono text-xs text-slate-500">{row.id}</td>
                  <td className="px-5 py-4 font-medium text-slate-700">{row.anggota}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${jenisBadgeColor[row.jenis]}`}>{row.jenis}</span>
                  </td>
                  <td className="px-5 py-4 font-semibold text-slate-700">Rp {formatRupiah(row.nominal)}</td>
                  <td className="px-5 py-4 text-slate-500">{formatDate(row.tanggal)}</td>
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
        <Modal title={modalMode === "add" ? "Tambah Simpanan" : "Edit Simpanan"} onClose={closeModal}>
          <div className="space-y-4">
            {[
              { label: "Nama Anggota", key: "anggota", type: "text" },
              { label: "ID Anggota", key: "idAnggota", type: "text" },
              { label: "Nominal (Rp)", key: "nominal", type: "number" },
              { label: "Tanggal", key: "tanggal", type: "date" },
              { label: "Keterangan", key: "keterangan", type: "text" },
            ].map(({ label, key, type }) => (
              <div key={key}>
                <label className="mb-1 block text-xs font-semibold text-slate-600">{label}</label>
                <input type={type} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400" />
              </div>
            ))}
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">Jenis Simpanan</label>
              <select value={form.jenis} onChange={(e) => setForm({ ...form, jenis: e.target.value })}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400">
                {jenisSimpanan.map((j) => <option key={j}>{j}</option>)}
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
        <Modal title="Detail Simpanan" onClose={closeModal}>
          <div className="space-y-3">
            {[["ID", selected.id], ["Anggota", selected.anggota], ["ID Anggota", selected.idAnggota], ["Jenis", selected.jenis], ["Nominal", `Rp ${formatRupiah(selected.nominal)}`], ["Tanggal", formatDate(selected.tanggal)], ["Keterangan", selected.keterangan]].map(([l, v]) => (
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
        <Modal title="Hapus Simpanan" onClose={closeModal}>
          <p className="text-sm text-slate-600">Hapus data simpanan <strong>{selected.id}</strong> milik <strong>{selected.anggota}</strong>?</p>
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
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
