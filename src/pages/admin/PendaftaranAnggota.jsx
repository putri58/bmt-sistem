import { useState } from "react";
import {
  Search,
  Eye,
  CheckCircle,
  XCircle,
  X,
  Clock,
  UserCheck,
  UserX,
  Calendar,
  Filter,
  FileText,
  ZoomIn,
} from "lucide-react";
import { useAnggota } from "../../context/AnggotaContext";

const statusColors = {
  Menunggu:  "bg-orange-50 text-orange-600 border-orange-200",
  Disetujui: "bg-emerald-50 text-emerald-600 border-emerald-200",
  Ditolak:   "bg-red-50 text-red-600 border-red-200",
};

const statusIcons = {
  Menunggu:  Clock,
  Disetujui: UserCheck,
  Ditolak:   UserX,
};

function formatDate(d) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("id-ID", {
    day: "numeric", month: "long", year: "numeric",
  });
}

function formatTanggalLahir(d) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("id-ID", {
    day: "2-digit", month: "2-digit", year: "numeric",
  });
}

/* ─── MODAL ─── */
function Modal({ title, onClose, children, size = "md" }) {
  const widths = { md: "max-w-md", lg: "max-w-2xl" };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className={`w-full ${widths[size]} rounded-2xl bg-white shadow-xl`}>
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="font-semibold text-slate-800">{title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="max-h-[75vh] overflow-y-auto px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

/* ─── DETAIL ROW ─── */
function DetailRow({ label, value }) {
  return (
    <div className="flex gap-4 border-b border-slate-100 py-2.5 last:border-0">
      <span className="w-40 shrink-0 text-xs font-semibold text-slate-500">{label}</span>
      <span className="text-sm text-slate-700">{value || "-"}</span>
    </div>
  );
}

/* ─── DOKUMEN PREVIEW CARD ─── */
function DocPreview({ label, file }) {
  const [lightbox, setLightbox] = useState(false);

  if (!file) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 text-center">
        <FileText size={28} className="text-slate-300" />
        <p className="text-xs font-semibold text-slate-400">{label}</p>
        <p className="text-[10px] text-slate-300">Tidak diunggah</p>
      </div>
    );
  }

  const isImage = file.type?.startsWith("image/");
  const isPDF   = file.type === "application/pdf";
  const url     = URL.createObjectURL(file);

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* preview area */}
        {isImage ? (
          <div
            className="group relative cursor-zoom-in overflow-hidden bg-slate-100"
            style={{ height: 160 }}
            onClick={() => setLightbox(true)}
          >
            <img
              src={url}
              alt={label}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/30">
              <ZoomIn size={24} className="text-white opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </div>
        ) : isPDF ? (
          <div className="flex h-40 items-center justify-center bg-red-50">
            <div className="text-center">
              <FileText size={40} className="mx-auto text-red-400" />
              <p className="mt-2 text-xs text-slate-500">PDF Document</p>
            </div>
          </div>
        ) : (
          <div className="flex h-40 items-center justify-center bg-slate-50">
            <FileText size={40} className="text-slate-300" />
          </div>
        )}

        {/* footer */}
        <div className="border-t border-slate-100 px-3 py-2.5">
          <p className="text-xs font-semibold text-slate-700">{label}</p>
          <p className="mt-0.5 truncate text-[10px] text-slate-400">{file.name}</p>
          <div className="mt-2 flex gap-2">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-indigo-50 px-2 py-1.5 text-[11px] font-semibold text-indigo-600 transition hover:bg-indigo-100"
            >
              <Eye size={11} />
              Buka
            </a>
            <a
              href={url}
              download={file.name}
              className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-slate-100 px-2 py-1.5 text-[11px] font-semibold text-slate-600 transition hover:bg-slate-200"
            >
              ↓ Unduh
            </a>
          </div>
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightbox && isImage && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightbox(false)}
        >
          <div className="relative max-h-[90vh] max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={url}
              alt={label}
              className="max-h-[85vh] max-w-full rounded-xl object-contain shadow-2xl"
            />
            <button
              onClick={() => setLightbox(false)}
              className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-700 shadow-lg hover:bg-slate-100"
            >
              <X size={16} />
            </button>
            <p className="mt-3 text-center text-xs text-slate-400">{label} · {file.name}</p>
          </div>
        </div>
      )}
    </>
  );
}

/* ─── MAIN ─── */
export default function PendaftaranAnggota() {
  const {
    pendaftarList,
    jumlahMenunggu,
    setujuiPendaftar,
    tolakPendaftar,
  } = useAnggota();

  const [search, setSearch]           = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [modalMode, setModalMode]     = useState(null); // "view" | "setujui" | "tolak"
  const [selected, setSelected]       = useState(null);
  const [alasanTolak, setAlasanTolak] = useState("");

  /* Filter */
  const filtered = pendaftarList.filter((p) => {
    const matchSearch =
      p.namaAnggota.toLowerCase().includes(search.toLowerCase()) ||
      p.pendaftarId.toLowerCase().includes(search.toLowerCase()) ||
      p.noIdentitas.includes(search);
    const matchStatus = filterStatus ? p.statusPendaftaran === filterStatus : true;
    return matchSearch && matchStatus;
  });

  function closeModal() {
    setModalMode(null);
    setSelected(null);
    setAlasanTolak("");
  }

  function handleSetujui() {
    setujuiPendaftar(selected.pendaftarId);
    closeModal();
  }

  function handleTolak() {
    tolakPendaftar(selected.pendaftarId, alasanTolak);
    closeModal();
  }

  /* Count per status */
  const counts = {
    Menunggu:  pendaftarList.filter((p) => p.statusPendaftaran === "Menunggu").length,
    Disetujui: pendaftarList.filter((p) => p.statusPendaftaran === "Disetujui").length,
    Ditolak:   pendaftarList.filter((p) => p.statusPendaftaran === "Ditolak").length,
  };

  return (
    <div>

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Pendaftaran Anggota</h1>
        <p className="mt-1 text-sm text-slate-500">
          Tinjau dan proses setiap pengajuan pendaftaran anggota baru.
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="rounded-2xl border border-orange-100 bg-orange-50 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-orange-700">Menunggu Verifikasi</p>
              <p className="mt-1 text-3xl font-bold text-orange-600">{counts.Menunggu}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-500">
              <Clock size={22} />
            </div>
          </div>
          {counts.Menunggu > 0 && (
            <p className="mt-3 text-xs text-orange-500">
              ⚠ Perlu segera diverifikasi
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-emerald-700">Disetujui</p>
              <p className="mt-1 text-3xl font-bold text-emerald-600">{counts.Disetujui}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-500">
              <UserCheck size={22} />
            </div>
          </div>
          <p className="mt-3 text-xs text-emerald-500">Sudah menjadi anggota aktif</p>
        </div>

        <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-red-700">Ditolak</p>
              <p className="mt-1 text-3xl font-bold text-red-600">{counts.Ditolak}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-500">
              <UserX size={22} />
            </div>
          </div>
          <p className="mt-3 text-xs text-red-400">Pendaftaran tidak diproses</p>
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="rounded-2xl border border-slate-200 bg-white">

        {/* TOOLBAR */}
        <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 p-5">
          <div className="relative max-w-xs flex-1">
            <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama, ID, atau NIK..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-indigo-400 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <Filter size={14} className="text-slate-400" />
            {["", "Menunggu", "Disetujui", "Ditolak"].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  filterStatus === s
                    ? "bg-indigo-600 text-white"
                    : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {s || "Semua"}{s === "Menunggu" && counts.Menunggu > 0 ? ` (${counts.Menunggu})` : ""}
              </button>
            ))}
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-5 py-3">ID</th>
                <th className="px-5 py-3">Nama Pendaftar</th>
                <th className="px-5 py-3">No. Identitas</th>
                <th className="px-5 py-3">Kontak</th>
                <th className="px-5 py-3">Tgl Daftar</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-14 text-center text-slate-400">
                    Tidak ada data pendaftaran.
                  </td>
                </tr>
              ) : (
                filtered.map((row) => {
                  const StatusIcon = statusIcons[row.statusPendaftaran];
                  return (
                    <tr key={row.pendaftarId} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-4 font-mono text-xs text-slate-500">
                        {row.pendaftarId}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">
                            {row.namaAnggota.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                          </div>
                          <div>
                            <p className="font-medium text-slate-700">{row.namaAnggota}</p>
                            <p className="text-xs text-slate-400">{row.jenisKelamin} · {row.kota}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-mono text-xs text-slate-600">{row.noIdentitas}</p>
                        <p className="text-xs text-slate-400">{row.jenisIdentitas}</p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-xs text-slate-600">{row.email}</p>
                        <p className="text-xs text-slate-400">{row.noTelp}</p>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Calendar size={12} />
                          {formatDate(row.tglDaftar)}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${statusColors[row.statusPendaftaran]}`}>
                          <StatusIcon size={11} />
                          {row.statusPendaftaran}
                        </span>
                        {row.statusPendaftaran === "Disetujui" && row.idAnggota && (
                          <p className="mt-1 text-[10px] text-emerald-600">→ {row.idAnggota}</p>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => { setSelected(row); setModalMode("view"); }}
                            className="rounded-lg p-1.5 text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            title="Lihat Detail"
                          >
                            <Eye size={15} />
                          </button>
                          {row.statusPendaftaran === "Menunggu" && (
                            <>
                              <button
                                onClick={() => { setSelected(row); setModalMode("setujui"); }}
                                className="rounded-lg p-1.5 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                                title="Setujui"
                              >
                                <CheckCircle size={15} />
                              </button>
                              <button
                                onClick={() => { setSelected(row); setModalMode("tolak"); }}
                                className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                                title="Tolak"
                              >
                                <XCircle size={15} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        {filtered.length > 0 && (
          <div className="border-t border-slate-100 px-5 py-3 text-xs text-slate-400">
            Menampilkan {filtered.length} dari {pendaftarList.length} pendaftar
          </div>
        )}
      </div>

      {/* ── MODAL DETAIL ── */}
      {modalMode === "view" && selected && (
        <Modal title="Detail Pendaftaran" onClose={closeModal} size="lg">
          <div className="mb-5 flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-lg font-bold text-indigo-600">
              {selected.namaAnggota.split(" ").map((w) => w[0]).slice(0, 2).join("")}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">{selected.namaAnggota}</h3>
              <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${statusColors[selected.statusPendaftaran]}`}>
                {selected.statusPendaftaran}
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 mb-4">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Data Diri</p>
            <DetailRow label="ID Pendaftaran"    value={selected.pendaftarId} />
            <DetailRow label="Nama Lengkap"      value={selected.namaAnggota} />
            <DetailRow label="No. Identitas"     value={`${selected.noIdentitas} (${selected.jenisIdentitas})`} />
            <DetailRow label="Tempat Lahir"      value={selected.tempatLahir} />
            <DetailRow label="Tanggal Lahir"     value={formatTanggalLahir(selected.tanggalLahir)} />
            <DetailRow label="Kewarganegaraan"   value={selected.kewarganegaraan} />
            <DetailRow label="Status Pernikahan" value={selected.status} />
            <DetailRow label="Jenis Kelamin"     value={selected.jenisKelamin} />
            <DetailRow label="Nama Ibu Kandung"  value={selected.namaIbuKandung} />
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 mb-4">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Alamat &amp; Kontak</p>
            <DetailRow label="Alamat Rumah" value={selected.alamatRumah} />
            <DetailRow label="Kota"         value={selected.kota} />
            <DetailRow label="Kode Pos"     value={selected.kodePos} />
            <DetailRow label="Email"        value={selected.email} />
            <DetailRow label="No. Telp/HP"  value={selected.noTelp} />
          </div>

          {/* ── DOKUMEN ── */}
          <div className="mb-4">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
              Dokumen yang Diunggah
            </p>
            <div className="grid grid-cols-2 gap-3">
              <DocPreview label="Foto KTP / SIM"  file={selected.fotoIdentitas} />
              <DocPreview label="NPWP"             file={selected.fotoNPWP} />
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 mb-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Info Pendaftaran</p>            <DetailRow label="Tgl Pendaftaran" value={formatDate(selected.tglDaftar)} />
            {selected.statusPendaftaran === "Disetujui" && (
              <DetailRow label="ID Anggota" value={selected.idAnggota} />
            )}
            {selected.statusPendaftaran === "Ditolak" && selected.alasanTolak && (
              <DetailRow label="Alasan Tolak" value={selected.alasanTolak} />
            )}
          </div>

          {/* Tombol aksi di dalam detail jika masih menunggu */}
          {selected.statusPendaftaran === "Menunggu" && (
            <div className="flex gap-3">
              <button
                onClick={() => setModalMode("setujui")}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
              >
                <CheckCircle size={16} />
                Setujui Pendaftaran
              </button>
              <button
                onClick={() => setModalMode("tolak")}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-red-200 bg-red-50 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-100 transition-colors"
              >
                <XCircle size={16} />
                Tolak Pendaftaran
              </button>
            </div>
          )}

          {selected.statusPendaftaran !== "Menunggu" && (
            <button
              onClick={closeModal}
              className="w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
            >
              Tutup
            </button>
          )}
        </Modal>
      )}

      {/* ── MODAL KONFIRMASI SETUJUI ── */}
      {modalMode === "setujui" && selected && (
        <Modal title="Konfirmasi Persetujuan" onClose={closeModal}>
          <div className="mb-5 flex items-start gap-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-200 text-emerald-700 text-sm font-bold">
              {selected.namaAnggota.split(" ").map((w) => w[0]).slice(0, 2).join("")}
            </div>
            <div>
              <p className="font-semibold text-slate-800">{selected.namaAnggota}</p>
              <p className="text-xs text-slate-500">{selected.noIdentitas} · {selected.jenisIdentitas}</p>
              <p className="text-xs text-slate-500">{selected.email}</p>
            </div>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            Dengan menyetujui pendaftaran ini, <strong>{selected.namaAnggota}</strong> akan
            resmi menjadi anggota aktif KSPPS BMT Al Ittihad dan datanya akan masuk
            ke dalam daftar anggota.
          </p>

          <div className="mt-6 flex gap-3">
            <button
              onClick={closeModal}
              className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Batal
            </button>
            <button
              onClick={handleSetujui}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
            >
              <CheckCircle size={15} />
              Ya, Setujui
            </button>
          </div>
        </Modal>
      )}

      {/* ── MODAL KONFIRMASI TOLAK ── */}
      {modalMode === "tolak" && selected && (
        <Modal title="Konfirmasi Penolakan" onClose={closeModal}>
          <div className="mb-5 flex items-start gap-4 rounded-2xl border border-red-100 bg-red-50 p-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-200 text-red-700 text-sm font-bold">
              {selected.namaAnggota.split(" ").map((w) => w[0]).slice(0, 2).join("")}
            </div>
            <div>
              <p className="font-semibold text-slate-800">{selected.namaAnggota}</p>
              <p className="text-xs text-slate-500">{selected.noIdentitas} · {selected.jenisIdentitas}</p>
            </div>
          </div>

          <p className="mb-4 text-sm text-slate-600">
            Tolak pendaftaran dari <strong>{selected.namaAnggota}</strong>?
          </p>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-600">
              Alasan Penolakan <span className="font-normal text-slate-400">(opsional — akan disimpan di catatan)</span>
            </label>
            <textarea
              value={alasanTolak}
              onChange={(e) => setAlasanTolak(e.target.value)}
              rows={4}
              placeholder="Contoh: Dokumen identitas tidak valid / Data tidak lengkap / Tidak memenuhi syarat keanggotaan..."
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-red-300 focus:bg-white transition"
            />
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={closeModal}
              className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Batal
            </button>
            <button
              onClick={handleTolak}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition-colors"
            >
              <XCircle size={15} />
              Ya, Tolak
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
