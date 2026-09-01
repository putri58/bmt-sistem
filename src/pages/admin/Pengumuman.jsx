import { useState } from "react";
import { Plus, Eye, Pencil, Trash2, X, Megaphone, Search } from "lucide-react";

const prioritasList = ["Tinggi", "Sedang", "Rendah"];

const initialData = [
  { id: "PGM-001", judul: "Libur Hari Kemerdekaan RI", isi: "Koperasi akan libur pada tanggal 17 Agustus 2026 dalam rangka perayaan Hari Kemerdekaan Republik Indonesia ke-81.", prioritas: "Tinggi", tglMulai: "2026-08-16", tglAkhir: "2026-08-17", status: "Aktif" },
  { id: "PGM-002", judul: "Pembaruan Sistem Online", isi: "Layanan online koperasi akan mengalami gangguan sementara pada tanggal 5 September 2026 pukul 22.00–02.00 WIB untuk pembaruan sistem.", prioritas: "Sedang", tglMulai: "2026-09-03", tglAkhir: "2026-09-05", status: "Aktif" },
  { id: "PGM-003", judul: "Batas Waktu Pembayaran Angsuran", isi: "Anggota diingatkan bahwa batas akhir pembayaran angsuran bulan September 2026 adalah tanggal 25 September 2026.", prioritas: "Tinggi", tglMulai: "2026-09-01", tglAkhir: "2026-09-25", status: "Aktif" },
  { id: "PGM-004", judul: "Pendaftaran Anggota Baru Dibuka", isi: "Koperasi membuka pendaftaran anggota baru untuk periode September–Oktober 2026. Segera daftarkan diri Anda.", prioritas: "Rendah", tglMulai: "2026-09-01", tglAkhir: "2026-10-31", status: "Aktif" },
  { id: "PGM-005", judul: "Perubahan Nomor Rekening Bank", isi: "Nomor rekening bank koperasi telah diperbarui. Harap menggunakan nomor rekening baru untuk semua setoran.", prioritas: "Tinggi", tglMulai: "2026-07-01", tglAkhir: "2026-07-31", status: "Berakhir" },
];

const prioritasColors = {
  Tinggi: "bg-red-50 text-red-600",
  Sedang: "bg-orange-50 text-orange-600",
  Rendah: "bg-blue-50 text-blue-600",
};

const statusColors = {
  Aktif: "bg-emerald-50 text-emerald-600",
  Berakhir: "bg-slate-100 text-slate-500",
};

function formatDate(d) { return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }); }

export default function Pengumuman() {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [modalMode, setModalMode] = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ judul: "", isi: "", prioritas: "Sedang", tglMulai: "", tglAkhir: "", status: "Aktif" });

  const filtered = data.filter((d) => {
    const matchSearch = d.judul.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus ? d.status === filterStatus : true;
    return matchSearch && matchStatus;
  });

  function openAdd() {
    const today = new Date().toISOString().split("T")[0];
    setForm({ judul: "", isi: "", prioritas: "Sedang", tglMulai: today, tglAkhir: "", status: "Aktif" });
    setModalMode("add");
  }
  function openEdit(row) { setSelected(row); setForm({ ...row }); setModalMode("edit"); }
  function openView(row) { setSelected(row); setModalMode("view"); }
  function openDelete(row) { setSelected(row); setModalMode("delete"); }
  function closeModal() { setModalMode(null); setSelected(null); }

  function handleSave() {
    if (modalMode === "add") {
      setData([{ ...form, id: `PGM-${String(data.length + 1).padStart(3, "0")}` }, ...data]);
    } else {
      setData(data.map((d) => (d.id === selected.id ? { ...form, id: selected.id } : d)));
    }
    closeModal();
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Pengumuman</h1>
          <p className="mt-1 text-sm text-slate-500">Kelola pengumuman yang akan diterima oleh anggota koperasi.</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition-colors">
          <Plus size={16} />
          Buat Pengumuman
        </button>
      </div>

      {/* STATS */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        {[
          { label: "Total Pengumuman", value: data.length },
          { label: "Aktif", value: data.filter((d) => d.status === "Aktif").length },
          { label: "Prioritas Tinggi", value: data.filter((d) => d.prioritas === "Tinggi" && d.status === "Aktif").length },
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
            <input type="text" placeholder="Cari judul pengumuman..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-indigo-400 focus:bg-white" />
          </div>
          <div className="flex gap-2">
            {["", "Aktif", "Berakhir"].map((s) => (
              <button key={s} onClick={() => setFilterStatus(s)}
                className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${filterStatus === s ? "bg-indigo-600 text-white" : "border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                {s || "Semua"}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-400">Tidak ada pengumuman.</div>
          ) : filtered.map((row) => (
            <div key={row.id} className="flex items-start gap-4 p-5 hover:bg-slate-50 transition-colors">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${row.prioritas === "Tinggi" ? "bg-red-50 text-red-500" : row.prioritas === "Sedang" ? "bg-orange-50 text-orange-500" : "bg-blue-50 text-blue-500"}`}>
                <Megaphone size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-slate-800">{row.judul}</h3>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusColors[row.status]}`}>{row.status}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${prioritasColors[row.prioritas]}`}>{row.prioritas}</span>
                </div>
                <p className="mt-1 text-xs text-slate-500 line-clamp-1">{row.isi}</p>
                <p className="mt-1 text-xs text-slate-400">{formatDate(row.tglMulai)} – {formatDate(row.tglAkhir)}</p>
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
        <Modal title={modalMode === "add" ? "Buat Pengumuman" : "Edit Pengumuman"} onClose={closeModal}>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">Judul</label>
              <input type="text" value={form.judul} onChange={(e) => setForm({ ...form, judul: e.target.value })}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">Isi Pengumuman</label>
              <textarea value={form.isi} onChange={(e) => setForm({ ...form, isi: e.target.value })} rows={4}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400 resize-none" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">Prioritas</label>
                <select value={form.prioritas} onChange={(e) => setForm({ ...form, prioritas: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none">
                  {prioritasList.map((p) => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">Status</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none">
                  <option>Aktif</option>
                  <option>Berakhir</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">Tanggal Mulai</label>
                <input type="date" value={form.tglMulai} onChange={(e) => setForm({ ...form, tglMulai: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">Tanggal Akhir</label>
                <input type="date" value={form.tglAkhir} onChange={(e) => setForm({ ...form, tglAkhir: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400" />
              </div>
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
        <Modal title="Detail Pengumuman" onClose={closeModal}>
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-800">{selected.judul}</h3>
            <div className="flex gap-2">
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusColors[selected.status]}`}>{selected.status}</span>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${prioritasColors[selected.prioritas]}`}>{selected.prioritas}</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">{selected.isi}</p>
            <p className="text-xs text-slate-400">Berlaku: {formatDate(selected.tglMulai)} – {formatDate(selected.tglAkhir)}</p>
          </div>
          <div className="mt-6 flex justify-end">
            <button onClick={closeModal} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">Tutup</button>
          </div>
        </Modal>
      )}

      {/* MODAL DELETE */}
      {modalMode === "delete" && selected && (
        <Modal title="Hapus Pengumuman" onClose={closeModal}>
          <p className="text-sm text-slate-600">Hapus pengumuman <strong>"{selected.judul}"</strong>?</p>
          <div className="mt-6 flex justify-end gap-3">
            <button onClick={closeModal} className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">Batal</button>
            <button onClick={() => { setData(data.filter((d) => d.id !== selected.id)); closeModal(); }}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">Hapus</button>
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
