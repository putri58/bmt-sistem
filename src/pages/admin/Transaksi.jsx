import { useState } from "react";
import { Plus, Search, Eye, X, ArrowUpRight, ArrowDownLeft } from "lucide-react";

const jenisList = ["Setoran Simpanan", "Penarikan Simpanan", "Pencairan Pinjaman", "Angsuran Pinjaman", "Denda", "Biaya Admin"];

const initialData = [
  { id: "TRX-001", anggota: "Sari Wulandari", jenis: "Angsuran Pinjaman", nominal: 1420000, tanggal: "2026-08-31", keterangan: "Angsuran bulan ke-6 PJM-001", tipe: "masuk" },
  { id: "TRX-002", anggota: "Fitriani", jenis: "Setoran Simpanan", nominal: 1000000, tanggal: "2026-08-31", keterangan: "Simpanan pokok pendaftaran", tipe: "masuk" },
  { id: "TRX-003", anggota: "Ahmad Fauzi", jenis: "Penarikan Simpanan", nominal: 500000, tanggal: "2026-08-30", keterangan: "Penarikan sukarela", tipe: "keluar" },
  { id: "TRX-004", anggota: "Rina Melati", jenis: "Pencairan Pinjaman", nominal: 5000000, tanggal: "2026-08-29", keterangan: "Pencairan PJM-003", tipe: "keluar" },
  { id: "TRX-005", anggota: "Dedi Kurniawan", jenis: "Angsuran Pinjaman", nominal: 875000, tanggal: "2026-08-28", keterangan: "Angsuran bulan ke-5 PJM-002", tipe: "masuk" },
  { id: "TRX-006", anggota: "Budi Santoso", jenis: "Denda", nominal: 50000, tanggal: "2026-08-27", keterangan: "Denda keterlambatan angsuran", tipe: "masuk" },
  { id: "TRX-007", anggota: "Hendra Gunawan", jenis: "Setoran Simpanan", nominal: 500000, tanggal: "2026-08-26", keterangan: "Simpanan wajib Agustus", tipe: "masuk" },
];

function formatRupiah(v) { return new Intl.NumberFormat("id-ID").format(v); }
function formatDate(d) { return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }); }

export default function Transaksi() {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [filterJenis, setFilterJenis] = useState("");
  const [filterTipe, setFilterTipe] = useState("");
  const [modalMode, setModalMode] = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ anggota: "", jenis: jenisList[0], nominal: "", tanggal: "", keterangan: "", tipe: "masuk" });

  const filtered = data.filter((d) => {
    const matchSearch = d.anggota.toLowerCase().includes(search.toLowerCase()) || d.id.toLowerCase().includes(search.toLowerCase());
    const matchJenis = filterJenis ? d.jenis === filterJenis : true;
    const matchTipe = filterTipe ? d.tipe === filterTipe : true;
    return matchSearch && matchJenis && matchTipe;
  });

  const totalMasuk = filtered.filter((d) => d.tipe === "masuk").reduce((s, d) => s + d.nominal, 0);
  const totalKeluar = filtered.filter((d) => d.tipe === "keluar").reduce((s, d) => s + d.nominal, 0);

  function handleSave() {
    const newId = `TRX-${String(data.length + 1).padStart(3, "0")}`;
    setData([{ ...form, id: newId, nominal: Number(form.nominal) || 0 }, ...data]);
    closeModal();
  }

  function closeModal() { setModalMode(null); setSelected(null); }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Transaksi</h1>
          <p className="mt-1 text-sm text-slate-500">Riwayat seluruh transaksi koperasi.</p>
        </div>
        <button onClick={() => { setForm({ anggota: "", jenis: jenisList[0], nominal: "", tanggal: new Date().toISOString().split("T")[0], keterangan: "", tipe: "masuk" }); setModalMode("add"); }}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition-colors">
          <Plus size={16} />
          Tambah Transaksi
        </button>
      </div>

      {/* STAT */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-xs text-slate-500">Total Transaksi</p>
          <p className="mt-1 text-2xl font-bold text-slate-800">{filtered.length}</p>
        </div>
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
          <div className="flex items-center gap-2">
            <ArrowDownLeft size={16} className="text-emerald-600" />
            <p className="text-xs font-semibold text-emerald-700">Total Masuk</p>
          </div>
          <p className="mt-1 text-xl font-bold text-emerald-700">Rp {formatRupiah(totalMasuk)}</p>
        </div>
        <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
          <div className="flex items-center gap-2">
            <ArrowUpRight size={16} className="text-red-600" />
            <p className="text-xs font-semibold text-red-700">Total Keluar</p>
          </div>
          <p className="mt-1 text-xl font-bold text-red-700">Rp {formatRupiah(totalKeluar)}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 p-5">
          <div className="relative max-w-xs flex-1">
            <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
            <input type="text" placeholder="Cari nama atau ID..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-indigo-400 focus:bg-white" />
          </div>
          <select value={filterJenis} onChange={(e) => setFilterJenis(e.target.value)}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none">
            <option value="">Semua Jenis</option>
            {jenisList.map((j) => <option key={j}>{j}</option>)}
          </select>
          <select value={filterTipe} onChange={(e) => setFilterTipe(e.target.value)}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none">
            <option value="">Semua Tipe</option>
            <option value="masuk">Masuk</option>
            <option value="keluar">Keluar</option>
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
                <th className="px-5 py-3">Tipe</th>
                <th className="px-5 py-3">Tanggal</th>
                <th className="px-5 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="py-12 text-center text-slate-400">Tidak ada data.</td></tr>
              ) : filtered.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 font-mono text-xs text-slate-500">{row.id}</td>
                  <td className="px-5 py-4 font-medium text-slate-700">{row.anggota}</td>
                  <td className="px-5 py-4 text-slate-600">{row.jenis}</td>
                  <td className={`px-5 py-4 font-semibold ${row.tipe === "masuk" ? "text-emerald-600" : "text-red-600"}`}>
                    {row.tipe === "masuk" ? "+" : "-"} Rp {formatRupiah(row.nominal)}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${row.tipe === "masuk" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
                      {row.tipe === "masuk" ? <ArrowDownLeft size={11} /> : <ArrowUpRight size={11} />}
                      {row.tipe === "masuk" ? "Masuk" : "Keluar"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-500">{formatDate(row.tanggal)}</td>
                  <td className="px-5 py-4 text-center">
                    <button onClick={() => { setSelected(row); setModalMode("view"); }} className="rounded-lg p-1.5 text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"><Eye size={15} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL ADD */}
      {modalMode === "add" && (
        <Modal title="Tambah Transaksi" onClose={closeModal}>
          <div className="space-y-4">
            {[
              { label: "Nama Anggota", key: "anggota", type: "text" },
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
              <label className="mb-1 block text-xs font-semibold text-slate-600">Jenis Transaksi</label>
              <select value={form.jenis} onChange={(e) => setForm({ ...form, jenis: e.target.value })}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none">
                {jenisList.map((j) => <option key={j}>{j}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">Tipe</label>
              <select value={form.tipe} onChange={(e) => setForm({ ...form, tipe: e.target.value })}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none">
                <option value="masuk">Masuk</option>
                <option value="keluar">Keluar</option>
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
        <Modal title="Detail Transaksi" onClose={closeModal}>
          <div className="space-y-3">
            {[["ID", selected.id], ["Anggota", selected.anggota], ["Jenis", selected.jenis], ["Nominal", `Rp ${formatRupiah(selected.nominal)}`], ["Tipe", selected.tipe === "masuk" ? "Masuk" : "Keluar"], ["Tanggal", formatDate(selected.tanggal)], ["Keterangan", selected.keterangan]].map(([l, v]) => (
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
