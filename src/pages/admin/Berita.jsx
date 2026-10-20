
import { useEffect, useState } from "react";
import {
  Plus, Search, Pencil, Trash2, Newspaper, X,
  ImagePlus, Eye, FileText, LoaderCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../../lib/api";

const API_BASE = (
  import.meta.env.VITE_API_URL || "http://localhost:8000/api"
).replace(/\/api\/?$/, "");

const initialForm = {
  judul: "",
  slug: "",
  kategori: "Artikel",
  ringkasan: "",
  konten: "",
  status: "draft",
  gambar: null,
};

function buatSlug(teks) {
  return teks
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function formatTanggal(tanggal) {
  if (!tanggal) return "-";
  return new Date(tanggal).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function gambarUrl(gambar) {
  if (!gambar) return "";
  if (gambar.startsWith("http://") || gambar.startsWith("https://")) {
    return gambar;
  }
  return `${API_BASE}/storage/${gambar.replace(/^\/+/, "").replace(/^storage\//, "")}`;
}

export default function Berita() {
  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("semua");
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [slugManual, setSlugManual] = useState(false);
  const [preview, setPreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);

  async function fetchBerita() {
    setLoading(true);
    try {
      const response = await api.get("/admin/berita");
      setBerita(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Gagal mengambil berita. Periksa koneksi API dan akses admin."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBerita();
  }, []);

  function bukaTambah() {
    setEditing(null);
    setForm({ ...initialForm });
    setSlugManual(false);
    setPreview("");
    setModal(true);
  }

  function bukaEdit(item) {
    setEditing(item);
    setForm({
      judul: item.judul || "",
      slug: item.slug || buatSlug(item.judul || ""),
      kategori: item.kategori || "Artikel",
      ringkasan: item.ringkasan || "",
      konten: item.konten || "",
      status: item.status || "draft",
      gambar: null,
    });
    setSlugManual(true);
    setPreview(item.gambar ? gambarUrl(item.gambar) : "");
    setModal(true);
  }

  function tutupModal() {
    if (saving) return;
    setModal(false);
    setEditing(null);
    setForm({ ...initialForm });
    setSlugManual(false);
    setPreview("");
  }

  function ubahJudul(value) {
    setForm((prev) => ({
      ...prev,
      judul: value,
      slug: slugManual ? prev.slug : buatSlug(value),
    }));
  }

  function ubahSlug(value) {
    setSlugManual(true);
    setForm((prev) => ({
      ...prev,
      slug: buatSlug(value),
    }));
  }

  function ubahGambar(file) {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Pilih file gambar yang valid.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Ukuran gambar maksimal 2 MB.");
      return;
    }

    setForm((prev) => ({ ...prev, gambar: file }));
    setPreview(URL.createObjectURL(file));
  }

  async function simpanBerita(event) {
    event.preventDefault();

    if (!form.judul.trim() || !form.slug.trim() || !form.konten.trim()) {
      toast.error("Judul, slug, dan konten berita wajib diisi.");
      return;
    }

    setSaving(true);

    try {
      const data = new FormData();
      data.append("judul", form.judul.trim());
      data.append("slug", form.slug.trim());
      data.append("kategori", form.kategori);
      data.append("ringkasan", form.ringkasan.trim());
      data.append("konten", form.konten);
      data.append("status", form.status);

      if (form.gambar) {
        data.append("gambar", form.gambar);
      }

      if (editing) {
        data.append("_method", "PUT");
        await api.post(`/admin/berita/${editing.id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Berita berhasil diperbarui.");
      } else {
        await api.post("/admin/berita", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Berita berhasil ditambahkan.");
      }

      setModal(false);
      setEditing(null);
      setForm({ ...initialForm });
      setSlugManual(false);
      setPreview("");
      await fetchBerita();
    } catch (error) {
      const errors = error.response?.data?.errors;
      const pesanValidasi = errors
        ? Object.values(errors).flat().join(" ")
        : null;

      toast.error(
        pesanValidasi ||
          error.response?.data?.message ||
          "Gagal menyimpan berita."
      );
    } finally {
      setSaving(false);
    }
  }

  async function hapusBerita(item) {
    const setuju = window.confirm(
      `Yakin ingin menghapus berita "${item.judul}"?`
    );

    if (!setuju) return;

    setDeleting(item.id);
    try {
      await api.delete(`/admin/berita/${item.id}`);
      setBerita((prev) => prev.filter((b) => b.id !== item.id));
      toast.success("Berita berhasil dihapus.");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Gagal menghapus berita."
      );
    } finally {
      setDeleting(null);
    }
  }

  const daftarFilter = berita.filter((item) => {
    const cocokCari =
      `${item.judul} ${item.slug || ""} ${item.kategori} ${item.ringkasan || ""}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const cocokStatus =
      filterStatus === "semua" || item.status === filterStatus;

    return cocokCari && cocokStatus;
  });

  const jumlahTerbit = berita.filter(
    (item) => item.status === "published"
  ).length;

  const jumlahDraft = berita.filter(
    (item) => item.status === "draft"
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
            <Newspaper size={16} />
            <span>Manajemen Konten</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">
            Berita & Artikel
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Kelola berita dan artikel KSPPS BMT Al-Ittihad.
          </p>
        </div>

        <button
          onClick={bukaTambah}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
        >
          <Plus size={18} />
          Tambah Berita
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Total Berita</p>
            <FileText className="text-blue-500" size={20} />
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-800">
            {berita.length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Sudah Terbit</p>
            <Eye className="text-green-600" size={20} />
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-800">
            {jumlahTerbit}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Draft</p>
            <FileText className="text-amber-500" size={20} />
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-800">
            {jumlahDraft}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 md:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari judul, slug, atau kategori berita..."
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-green-500"
          >
            <option value="semua">Semua Status</option>
            <option value="published">Sudah Terbit</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-2 p-12 text-sm text-slate-500">
            <LoaderCircle size={20} className="animate-spin" />
            Memuat berita...
          </div>
        ) : daftarFilter.length === 0 ? (
          <div className="flex flex-col items-center px-6 py-14 text-center">
            <div className="mb-4 rounded-2xl bg-slate-100 p-4">
              <Newspaper size={30} className="text-slate-400" />
            </div>
            <h3 className="font-semibold text-slate-700">
              {berita.length === 0
                ? "Belum ada berita"
                : "Berita tidak ditemukan"}
            </h3>
            <p className="mt-1 max-w-sm text-sm text-slate-500">
              {berita.length === 0
                ? "Tambahkan berita pertama untuk mulai mengelola konten website."
                : "Coba ubah kata kunci atau filter pencarian."}
            </p>
            {berita.length === 0 && (
              <button
                onClick={bukaTambah}
                className="mt-4 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
              >
                Tambah Berita Pertama
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4">Berita</th>
                  <th className="px-5 py-4">Kategori</th>
                  <th className="px-5 py-4">Tanggal</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {daftarFilter.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70">
                    <td className="min-w-64 px-5 py-4">
                      <div className="flex items-center gap-3">
                        {item.gambar ? (
                          <img
                            src={gambarUrl(item.gambar)}
                            alt=""
                            className="h-12 w-16 rounded-lg border border-slate-200 object-cover"
                          />
                        ) : (
                          <div className="flex h-12 w-16 items-center justify-center rounded-lg bg-slate-100">
                            <ImagePlus size={19} className="text-slate-400" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="line-clamp-2 font-semibold text-slate-800">
                            {item.judul}
                          </p>
                          <p className="mt-1 break-all text-xs text-slate-400">
                            {item.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                      {item.kategori}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                      {formatTanggal(item.created_at)}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          item.status === "published"
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {item.status === "published" ? "Terbit" : "Draft"}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => bukaEdit(item)}
                          title="Edit berita"
                          className="rounded-lg border border-slate-200 p-2 text-blue-600 hover:bg-blue-50"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => hapusBerita(item)}
                          disabled={deleting === item.id}
                          title="Hapus berita"
                          className="rounded-lg border border-slate-200 p-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
                        >
                          {deleting === item.id ? (
                            <LoaderCircle size={16} className="animate-spin" />
                          ) : (
                            <Trash2 size={16} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/50 p-4 sm:items-center">
          <div className="my-4 w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  {editing ? "Edit Berita" : "Tambah Berita"}
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Lengkapi informasi berita di bawah ini.
                </p>
              </div>
              <button
                onClick={tutupModal}
                disabled={saving}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={simpanBerita} className="space-y-5 p-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Judul Berita *
                </label>
                <input
                  required
                  maxLength={255}
                  value={form.judul}
                  onChange={(e) => ubahJudul(e.target.value)}
                  placeholder="Masukkan judul berita"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Slug URL *
                </label>
                <input
                  required
                  maxLength={255}
                  value={form.slug}
                  onChange={(e) => ubahSlug(e.target.value)}
                  placeholder="contoh: pentingnya-menabung-sejak-dini"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Slug digunakan sebagai alamat artikel. Slug otomatis mengikuti
                  judul, tetapi kamu bisa mengubahnya sendiri.
                </p>
                {form.slug && (
                  <div className="mt-2 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600">
                    <span className="font-medium">Pratinjau URL: </span>
                    <span className="break-all">
                      /berita/{form.slug}
                    </span>
                  </div>
                )}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Kategori *
                  </label>
                  <select
                    value={form.kategori}
                    onChange={(e) =>
                      setForm({ ...form, kategori: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-green-500"
                  >
                    <option>Artikel</option>
                    <option>Berita</option>
                    <option>Pengumuman</option>
                    <option>Kegiatan</option>
                    <option>Edukasi Keuangan Syariah</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Status Publikasi *
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-green-500"
                  >
                    <option value="draft">Draft — belum ditampilkan</option>
                    <option value="published">Terbit — tampil untuk publik</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Ringkasan
                </label>
                <textarea
                  rows={2}
                  maxLength={2000}
                  value={form.ringkasan}
                  onChange={(e) =>
                    setForm({ ...form, ringkasan: e.target.value })
                  }
                  placeholder="Ringkasan singkat untuk daftar berita..."
                  className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-green-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Konten Berita *
                </label>
                <textarea
                  required
                  rows={8}
                  value={form.konten}
                  onChange={(e) =>
                    setForm({ ...form, konten: e.target.value })
                  }
                  placeholder="Tulis isi lengkap berita di sini..."
                  className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm leading-6 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Gambar Berita (maksimal 2 MB)
                </label>
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 p-5 transition hover:border-green-400 hover:bg-green-50/50">
                  <ImagePlus size={28} className="text-slate-400" />
                  <span className="mt-2 text-sm font-medium text-slate-700">
                    Klik untuk memilih gambar
                  </span>
                  <span className="mt-1 text-xs text-slate-400">
                    JPG, PNG, atau WEBP
                  </span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => ubahGambar(e.target.files?.[0])}
                  />
                </label>

                {preview && (
                  <div className="relative mt-3 inline-block">
                    <img
                      src={preview}
                      alt="Pratinjau gambar berita"
                      className="max-h-48 max-w-full rounded-xl border border-slate-200 object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setForm((prev) => ({ ...prev, gambar: null }));
                        setPreview(editing?.gambar ? gambarUrl(editing.gambar) : "");
                      }}
                      className="absolute right-2 top-2 rounded-lg bg-white/90 p-1.5 text-red-600 shadow"
                      title="Batalkan gambar baru"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
                {editing?.gambar && !form.gambar && (
                  <p className="mt-2 text-xs text-slate-500">
                    Gambar saat ini dipertahankan jika tidak memilih gambar baru.
                  </p>
                )}
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={tutupModal}
                  disabled={saving}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-60"
                >
                  {saving && <LoaderCircle size={17} className="animate-spin" />}
                  {saving
                    ? "Menyimpan..."
                    : editing
                    ? "Simpan Perubahan"
                    : "Simpan Berita"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
