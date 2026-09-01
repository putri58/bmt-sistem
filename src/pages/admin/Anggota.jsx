import { useState } from "react";
import { UserPlus, Search, Eye, Pencil, Trash2, X } from "lucide-react";
import { useAnggota } from "../../context/AnggotaContext";

function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID").format(value);
}

function formatDate(d) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("id-ID", {
    day: "numeric", month: "long", year: "numeric",
  });
}

/* ─── MODAL ─── */
function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="font-semibold text-slate-800">{title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

const emptyForm = {
  namaAnggota: "", noIdentitas: "", jenisIdentitas: "KTP",
  tempatLahir: "", tanggalLahir: "", kewarganegaraan: "WNI",
  status: "Aktif", jenisKelamin: "Pria",
  namaIbuKandung: "", alamatRumah: "", kota: "", kodePos: "",
  email: "", noTelp: "", simpanan: "", statusAnggota: "Aktif",
};

export default function Anggota() {
  const { anggotaList, updateAnggota, hapusAnggota } = useAnggota();

  const [search, setSearch]       = useState("");
  const [filterStatus, setFilter] = useState("");
  const [modalMode, setModalMode] = useState(null);
  const [selected, setSelected]   = useState(null);
  const [form, setForm]           = useState(emptyForm);

  const filtered = anggotaList.filter((a) => {
    const matchSearch =
      a.namaAnggota.toLowerCase().includes(search.toLowerCase()) ||
      a.id.toLowerCase().includes(search.toLowerCase()) ||
      (a.noIdentitas || "").includes(search);
    const matchStatus = filterStatus ? a.statusAnggota === filterStatus : true;
    return matchSearch && matchStatus;
  });

  function openView(row)   { setSelected(row); setModalMode("view"); }
  function openEdit(row)   { setSelected(row); setForm({ ...emptyForm, ...row, simpanan: String(row.simpanan) }); setModalMode("edit"); }
  function openDelete(row) { setSelected(row); setModalMode("delete"); }
  function closeModal()    { setModalMode(null); setSelected(null); }

  function handleSave() {
    updateAnggota(selected.id, { ...form, simpanan: Number(form.simpanan) || 0 });
    closeModal();
  }

  function handleDelete() {
    hapusAnggota(selected.id);
    closeModal();
  }

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  return (
    <div>

      {/* HEADER */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Data Anggota</h1>
          <p className="mt-1 text-sm text-slate-500">
            Anggota yang telah disetujui pendaftarannya.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-xl bg-indigo-50 px-4 py-2.5 text-sm font-semibold text-indigo-700">
            Total: {anggotaList.length} anggota
          </span>
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
          <div className="flex gap-2">
            {["", "Aktif", "Tidak Aktif"].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  filterStatus === s
                    ? "bg-indigo-600 text-white"
                    : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {s || "Semua"}
              </button>
            ))}
          </div>
          <span className="text-xs text-slate-400">{filtered.length} anggota</span>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-5 py-3">ID</th>
                <th className="px-5 py-3">Nama Anggota</th>
                <th className="px-5 py-3">Kontak</th>
                <th className="px-5 py-3">Kota</th>
                <th className="px-5 py-3">Total Simpanan</th>
                <th className="px-5 py-3">Tgl Disetujui</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-14 text-center text-slate-400">
                    Tidak ada data anggota ditemukan.
                  </td>
                </tr>
              ) : (
                filtered.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4 font-mono text-xs text-slate-500">{row.id}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">
                          {row.namaAnggota.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                        </div>
                        <div>
                          <p className="font-medium text-slate-700">{row.namaAnggota}</p>
                          <p className="text-xs text-slate-400">{row.jenisKelamin} · {row.jenisIdentitas}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-xs text-slate-600">{row.email}</p>
                      <p className="text-xs text-slate-400">{row.noTelp}</p>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.kota}</td>
                    <td className="px-5 py-4 font-semibold text-slate-700">
                      Rp {formatRupiah(row.simpanan)}
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-500">
                      {formatDate(row.tglDisetujui)}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        row.statusAnggota === "Aktif"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-slate-100 text-slate-500"
                      }`}>
                        {row.statusAnggota}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openView(row)}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          title="Lihat"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          onClick={() => openEdit(row)}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                          title="Edit"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => openDelete(row)}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                          title="Hapus"
                        >
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

      {/* ── MODAL VIEW ── */}
      {modalMode === "view" && selected && (
        <Modal title="Detail Anggota" onClose={closeModal}>
          <div className="mb-4 flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-lg font-bold text-indigo-600">
              {selected.namaAnggota.split(" ").map((w) => w[0]).slice(0, 2).join("")}
            </div>
            <div>
              <h3 className="font-bold text-slate-800">{selected.namaAnggota}</h3>
              <p className="text-xs text-slate-400">{selected.id}</p>
            </div>
          </div>
          <div className="space-y-2">
            {[
              ["ID Anggota",       selected.id],
              ["No. Identitas",    `${selected.noIdentitas} (${selected.jenisIdentitas})`],
              ["Tempat/Tgl Lahir", `${selected.tempatLahir}, ${new Date(selected.tanggalLahir).toLocaleDateString("id-ID")}`],
              ["Kewarganegaraan",  selected.kewarganegaraan],
              ["Status Nikah",     selected.status],
              ["Jenis Kelamin",    selected.jenisKelamin],
              ["Nama Ibu Kandung", selected.namaIbuKandung],
              ["Alamat",           selected.alamatRumah],
              ["Kota",             selected.kota],
              ["Kode Pos",         selected.kodePos],
              ["Email",            selected.email],
              ["No. Telp/HP",      selected.noTelp],
              ["Total Simpanan",   `Rp ${formatRupiah(selected.simpanan)}`],
              ["Status Anggota",   selected.statusAnggota],
              ["Tgl Daftar",       formatDate(selected.tglDaftar)],
              ["Tgl Disetujui",    formatDate(selected.tglDisetujui)],
            ].map(([label, val]) => (
              <div key={label} className="flex gap-3 border-b border-slate-100 pb-2">
                <span className="w-36 shrink-0 text-xs font-semibold text-slate-500">{label}</span>
                <span className="text-sm text-slate-700">{val || "-"}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 flex justify-end">
            <button onClick={closeModal} className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors">
              Tutup
            </button>
          </div>
        </Modal>
      )}

      {/* ── MODAL EDIT ── */}
      {modalMode === "edit" && selected && (
        <Modal title="Edit Data Anggota" onClose={closeModal}>
          <div className="space-y-4">
            {[
              ["Nama Lengkap",    "namaAnggota",    "text"],
              ["No. Identitas",   "noIdentitas",    "text"],
              ["Tempat Lahir",    "tempatLahir",    "text"],
              ["Tanggal Lahir",   "tanggalLahir",   "date"],
              ["Nama Ibu Kandung","namaIbuKandung", "text"],
              ["Alamat Rumah",    "alamatRumah",    "text"],
              ["Kota",            "kota",           "text"],
              ["Kode Pos",        "kodePos",        "text"],
              ["Email",           "email",          "email"],
              ["No. Telp/HP",     "noTelp",         "text"],
              ["Total Simpanan",  "simpanan",       "number"],
            ].map(([label, key, type]) => (
              <div key={key}>
                <label className="mb-1 block text-xs font-semibold text-slate-600">{label}</label>
                <input
                  type={type}
                  value={form[key]}
                  onChange={set(key)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:bg-white"
                />
              </div>
            ))}
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">Status Anggota</label>
              <select value={form.statusAnggota} onChange={set("statusAnggota")}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-indigo-400">
                <option value="Aktif">Aktif</option>
                <option value="Tidak Aktif">Tidak Aktif</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button onClick={closeModal} className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
              Batal
            </button>
            <button onClick={handleSave} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
              Simpan
            </button>
          </div>
        </Modal>
      )}

      {/* ── MODAL DELETE ── */}
      {modalMode === "delete" && selected && (
        <Modal title="Hapus Anggota" onClose={closeModal}>
          <p className="text-sm text-slate-600">
            Hapus data anggota <strong>{selected.namaAnggota}</strong> ({selected.id})?
            Tindakan ini tidak dapat dibatalkan.
          </p>
          <div className="mt-6 flex justify-end gap-3">
            <button onClick={closeModal} className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
              Batal
            </button>
            <button onClick={handleDelete} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
              Ya, Hapus
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
