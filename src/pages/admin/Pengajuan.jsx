import { useState } from "react";
import { Search, Eye, CheckCircle, XCircle, X, Clock } from "lucide-react";

const initialData = [
  { id: "PGJ-001", nama: "Sari Wulandari", idAnggota: "AGT-001", jenis: "Pinjaman Modal Usaha", nominal: 15000000, tujuan: "Modal usaha warung makan", tglPengajuan: "2026-08-28", status: "Menunggu" },
  { id: "PGJ-002", nama: "Dedi Kurniawan", idAnggota: "AGT-002", jenis: "Pinjaman Pendidikan", nominal: 8000000, tujuan: "Biaya kuliah semester ganjil", tglPengajuan: "2026-08-27", status: "Menunggu" },
  { id: "PGJ-003", nama: "Rina Melati", idAnggota: "AGT-003", jenis: "Pinjaman Konsumtif", nominal: 5000000, tujuan: "Pembelian peralatan rumah tangga", tglPengajuan: "2026-08-20", status: "Disetujui" },
  { id: "PGJ-004", nama: "Budi Santoso", idAnggota: "AGT-004", jenis: "Pinjaman Renovasi", nominal: 12000000, tujuan: "Renovasi atap rumah", tglPengajuan: "2026-08-19", status: "Ditolak" },
  { id: "PGJ-005", nama: "Ahmad Fauzi", idAnggota: "AGT-005", jenis: "Pinjaman Modal Usaha", nominal: 20000000, tujuan: "Ekspansi usaha toko bangunan", tglPengajuan: "2026-08-15", status: "Disetujui" },
  { id: "PGJ-006", nama: "Hendra Gunawan", idAnggota: "AGT-007", jenis: "Pinjaman Darurat", nominal: 3000000, tujuan: "Biaya pengobatan keluarga", tglPengajuan: "2026-08-31", status: "Menunggu" },
  { id: "PGJ-007", nama: "Fitriani", idAnggota: "AGT-006", jenis: "Pinjaman Pendidikan", nominal: 4500000, tujuan: "Biaya kursus dan pelatihan", tglPengajuan: "2026-09-01", status: "Menunggu" },
];

const statusColors = {
  Menunggu: "bg-orange-50 text-orange-600",
  Disetujui: "bg-emerald-50 text-emerald-600",
  Ditolak: "bg-red-50 text-red-600",
};

function formatRupiah(v) { return new Intl.NumberFormat("id-ID").format(v); }
function formatDate(d) { return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }); }

export default function Pengajuan() {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [modalMode, setModalMode] = useState(null);
  const [selected, setSelected] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null); // { row, action: "setujui"|"tolak" }
  const [alasanTolak, setAlasanTolak] = useState("");

  const filtered = data.filter((d) => {
    const matchSearch = d.nama.toLowerCase().includes(search.toLowerCase()) || d.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus ? d.status === filterStatus : true;
    return matchSearch && matchStatus;
  });

  const counts = {
    Menunggu: data.filter((d) => d.status === "Menunggu").length,
    Disetujui: data.filter((d) => d.status === "Disetujui").length,
    Ditolak: data.filter((d) => d.status === "Ditolak").length,
  };

  function updateStatus(id, status) {
    setData(data.map((d) => (d.id === id ? { ...d, status } : d)));
  }

  function handleSetujui() {
    updateStatus(confirmAction.row.id, "Disetujui");
    setConfirmAction(null);
  }

  function handleTolak() {
    updateStatus(confirmAction.row.id, "Ditolak");
    setConfirmAction(null);
    setAlasanTolak("");
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Pengajuan Pinjaman</h1>
          <p className="mt-1 text-sm text-slate-500">Verifikasi dan kelola pengajuan pinjaman anggota.</p>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="rounded-2xl border border-orange-100 bg-orange-50 p-5">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-orange-500" />
            <p className="text-xs font-semibold text-orange-700">Menunggu Verifikasi</p>
          </div>
          <p className="mt-1 text-3xl font-bold text-orange-600">{counts.Menunggu}</p>
        </div>
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-emerald-500" />
            <p className="text-xs font-semibold text-emerald-700">Disetujui</p>
          </div>
          <p className="mt-1 text-3xl font-bold text-emerald-600">{counts.Disetujui}</p>
        </div>
        <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
          <div className="flex items-center gap-2">
            <XCircle size={16} className="text-red-500" />
            <p className="text-xs font-semibold text-red-700">Ditolak</p>
          </div>
          <p className="mt-1 text-3xl font-bold text-red-600">{counts.Ditolak}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 p-5">
          <div className="relative max-w-xs flex-1">
            <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
            <input type="text" placeholder="Cari nama atau ID..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-indigo-400 focus:bg-white" />
          </div>
          <div className="flex gap-2">
            {["", "Menunggu", "Disetujui", "Ditolak"].map((s) => (
              <button key={s} onClick={() => setFilterStatus(s)}
                className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${filterStatus === s ? "bg-indigo-600 text-white" : "border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                {s || "Semua"}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-5 py-3">ID</th>
                <th className="px-5 py-3">Nama Anggota</th>
                <th className="px-5 py-3">Jenis Pinjaman</th>
                <th className="px-5 py-3">Nominal</th>
                <th className="px-5 py-3">Tgl Pengajuan</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="py-12 text-center text-slate-400">Tidak ada data.</td></tr>
              ) : filtered.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 font-mono text-xs text-slate-500">{row.id}</td>
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-medium text-slate-700">{row.nama}</p>
                      <p className="text-xs text-slate-400">{row.idAnggota}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{row.jenis}</td>
                  <td className="px-5 py-4 font-semibold text-slate-700">Rp {formatRupiah(row.nominal)}</td>
                  <td className="px-5 py-4 text-slate-500">{formatDate(row.tglPengajuan)}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusColors[row.status]}`}>{row.status}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => { setSelected(row); setModalMode("view"); }}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors" title="Detail">
                        <Eye size={15} />
                      </button>
                      {row.status === "Menunggu" && (
                        <>
                          <button onClick={() => setConfirmAction({ row, action: "setujui" })}
                            className="rounded-lg p-1.5 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 transition-colors" title="Setujui">
                            <CheckCircle size={15} />
                          </button>
                          <button onClick={() => setConfirmAction({ row, action: "tolak" })}
                            className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors" title="Tolak">
                            <XCircle size={15} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL VIEW */}
      {modalMode === "view" && selected && (
        <Modal title="Detail Pengajuan" onClose={() => { setModalMode(null); setSelected(null); }}>
          <div className="space-y-3">
            {[["ID Pengajuan", selected.id], ["Nama Anggota", selected.nama], ["ID Anggota", selected.idAnggota], ["Jenis Pinjaman", selected.jenis], ["Nominal", `Rp ${formatRupiah(selected.nominal)}`], ["Tujuan Pinjaman", selected.tujuan], ["Tgl Pengajuan", formatDate(selected.tglPengajuan)], ["Status", selected.status]].map(([l, v]) => (
              <div key={l} className="flex gap-3 border-b border-slate-100 pb-3">
                <span className="w-36 shrink-0 text-xs font-semibold text-slate-500">{l}</span>
                <span className="text-sm text-slate-700">{v}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end gap-3">
            {selected.status === "Menunggu" && (
              <>
                <button onClick={() => { updateStatus(selected.id, "Disetujui"); setModalMode(null); setSelected(null); }}
                  className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">
                  <CheckCircle size={15} /> Setujui
                </button>
                <button onClick={() => { updateStatus(selected.id, "Ditolak"); setModalMode(null); setSelected(null); }}
                  className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
                  <XCircle size={15} /> Tolak
                </button>
              </>
            )}
            <button onClick={() => { setModalMode(null); setSelected(null); }} className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">Tutup</button>
          </div>
        </Modal>
      )}

      {/* MODAL KONFIRMASI SETUJUI */}
      {confirmAction?.action === "setujui" && (
        <Modal title="Konfirmasi Persetujuan" onClose={() => setConfirmAction(null)}>
          <p className="text-sm text-slate-600">
            Setujui pengajuan pinjaman <strong>{confirmAction.row.jenis}</strong> senilai{" "}
            <strong>Rp {formatRupiah(confirmAction.row.nominal)}</strong> dari{" "}
            <strong>{confirmAction.row.nama}</strong>?
          </p>
          <div className="mt-6 flex justify-end gap-3">
            <button onClick={() => setConfirmAction(null)} className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">Batal</button>
            <button onClick={handleSetujui} className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">
              <CheckCircle size={15} /> Ya, Setujui
            </button>
          </div>
        </Modal>
      )}

      {/* MODAL KONFIRMASI TOLAK */}
      {confirmAction?.action === "tolak" && (
        <Modal title="Konfirmasi Penolakan" onClose={() => setConfirmAction(null)}>
          <p className="text-sm text-slate-600 mb-4">
            Tolak pengajuan dari <strong>{confirmAction.row.nama}</strong>?
          </p>
          <label className="mb-1 block text-xs font-semibold text-slate-600">Alasan Penolakan (opsional)</label>
          <textarea value={alasanTolak} onChange={(e) => setAlasanTolak(e.target.value)} rows={3}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-red-400 resize-none"
            placeholder="Tuliskan alasan penolakan..." />
          <div className="mt-4 flex justify-end gap-3">
            <button onClick={() => setConfirmAction(null)} className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">Batal</button>
            <button onClick={handleTolak} className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
              <XCircle size={15} /> Ya, Tolak
            </button>
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
