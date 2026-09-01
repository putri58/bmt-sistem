import { useState } from "react";
import { Plus, Search, Eye, Pencil, Trash2, X, Newspaper } from "lucide-react";

const kategoriList = ["Umum", "Keuangan", "Anggota", "Kegiatan", "Pengumuman"];

const initialData = [
  { id: "INF-001", judul: "Perubahan Jadwal Operasional Koperasi", kategori: "Umum", penulis: "Admin", tanggal: "2026-08-30", status: "Dipublikasi", isi: "Mulai tanggal 1 September 2026, jam operasional koperasi berubah menjadi pukul 08.00 – 15.00 WIB pada hari kerja." },
  { id: "INF-002", judul: "Program Simpanan Berjangka Berbunga Tinggi", kategori: "Keuangan", penulis: "Admin", tanggal: "2026-08-25", status: "Dipublikasi", isi: "Koperasi membuka program simpanan berjangka dengan bunga 8% per tahun. Minimal setoran Rp 5.000.000." },
  { id: "INF-003", judul: "Rapat Anggota Tahunan 2026", kategori: "Kegiatan", penulis: "Admin", tanggal: "2026-08-20", status: "Draft", isi: "RAT 2026 akan dilaksanakan pada tanggal 15 September 2026 di Aula Utama Koperasi pukul 09.00 WIB." },
  { id: "INF-004", judul: "Tips Mengelola Keuangan Rumah Tangga", kategori: "Umum", penulis: "Admin", tanggal: "2026-08-15", status: "Dipublikasi", isi: "Berikut adalah beberapa tips dalam mengelola keuangan rumah tangga agar lebih hemat dan terencana." },
];

const statusColors = {
  Dipublikasi: "bg-emerald-50 text-emerald-600",
  Draft: "bg-slate-100 text-slate-500",
};

function formatDate(d) { return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }); }

export default function Informasi() {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [filterKategori, setFilterKategori] = useState("");
  const [modalMode, setModalMode] = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ judul: "", kategori: kategoriList[0], penulis: "Admin", tanggal: "", status: "Draft", isi: "" });

  const filtered = data.filter((d) => {
    const matchSearch = d.judul.toLowerCase().includes(search.toLowerCase());
    const matchKat = filterKategori ? d.kategori === filterKategori : true;
    return matchSearch && matchKat;
  });

  function openAdd() {
    setForm({ judul: "", kategori: kategoriList[0], penulis: "Admin", tanggal: new Date().toISOString().split("T")[0], status: "Draft", isi: "" });
    setModalMode("add");
  }
  function openEdit(row) { setSelected(row); setForm({ ...row }); setModalMode("edit"); }
  function openView(row) { setSelected(row); setModalMode("view"); }
  function openDelete(row) { setSelected(row); setModalMode("delete"); }
  function closeModal() { setModalMode(null); setSelected(null); }

  function handleSave() {
    if (modalMode === "add") {
      setData([{ ...form, id: `INF-${String(data.length + 1).padStart(3, "0")}` }, ...data]);
    } else {
      setData(data.map((d) => (d.id === selected.id ? { ...form, id: selected.id } : d)));
    }
    closeModal();
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Berita & Informasi</h1>
          <p className="mt-1 text-sm text-slate-500">Kelola artikel dan informasi yang ditampilkan kepada anggota.</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition-colors">
          <Plus size={16} />
          Tulis Artikel
        </button>
      </div>

      {/* STAT */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total Artikel", value: data.length },
          { label: "Dipublikasi", value: data.filter((d) => d.status === "Dipublikasi").length },
          { label: "Draft", value: data.filter((d) => d.status === "Draft").length },
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
            <input type="text" placeholder="Cari judul artikel..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-indigo-400 focus:bg-white" />
          </div>
          <select value={filterKategori} onChange={(e) => setFilterKategori(e.target.value)}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none">
            <option value="">Semua Kategori</option>
            {kategoriList.map((k) => <option key={k}>{k}</option>)}
          </select>
        </div>

        {/* CARD LIST */}
        <div className="divide-y divide-slate-100">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-400">Tidak ada artikel ditemukan.</div>
          ) : filtered.map((row) => (
            <div key={row.id} className="flex items-start gap-4 p-5 hover:bg-slate-50 transition-colors">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-500">
                <Newspaper size={22} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-slate-800">{row.judul}</h3>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusColors[row.status]}`}>{row.status}</span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500">{row.kategori}</span>
                </div>
                <p className="mt-1 text-xs text-slate-500 line-clamp-1">{row.isi}</p>
                <p className="mt-1 text-xs text-slate-400">{row.penulis} · {formatDate(row.tanggal)}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button onClick={() => openView(row)} className="rounded-lg p-1.5 text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"><Eye size={15} /></button>
                <button onClick={() => openEdit(row)} className="rounded-lg p-1.5 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"><Pencil size={15} /></button>
                <button onClick={() => openDelete(row)} className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"><Trash2 size={15} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL ADD/EDIT */}
      {(modalMode === "add" || modalMode === "edit") && (
        <Modal title={modalMode === "add" ? "Tulis Artikel" : "Edit Artikel"} onClose={closeModal}>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">Judul</label>
              <input type="text" value={form.judul} onChange={(e) => setForm({ ...form, judul: e.target.value })}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">Kategori</label>
                <select value={form.kategori} onChange={(e) => setForm({ ...form, kategori: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none">
                  {kategoriList.map((k) => <option key={k}>{k}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">Status</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none">
                  <option>Draft</option>
                  <option>Dipublikasi</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">Tanggal</label>
              <input type="date" value={form.tanggal} onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">Isi Artikel</label>
              <textarea value={form.isi} onChange={(e) => setForm({ ...form, isi: e.target.value })} rows={5}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400 resize-none" />
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
        <Modal title="Detail Artikel" onClose={closeModal}>
          <div className="space-y-3">
            <div>
              <h3 className="text-base font-bold text-slate-800">{selected.judul}</h3>
              <div className="mt-1 flex gap-2">
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusColors[selected.status]}`}>{selected.status}</span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500">{selected.kategori}</span>
              </div>
            </div>
            <p className="text-xs text-slate-400">{selected.penulis} · {formatDate(selected.tanggal)}</p>
            <p className="text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">{selected.isi}</p>
          </div>
          <div className="mt-6 flex justify-end">
            <button onClick={closeModal} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">Tutup</button>
          </div>
        </Modal>
      )}

      {/* MODAL DELETE */}
      {modalMode === "delete" && selected && (
        <Modal title="Hapus Artikel" onClose={closeModal}>
          <p className="text-sm text-slate-600">Hapus artikel <strong>"{selected.judul}"</strong>? Tindakan ini tidak dapat dibatalkan.</p>
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
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="font-semibold text-slate-800">{title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
