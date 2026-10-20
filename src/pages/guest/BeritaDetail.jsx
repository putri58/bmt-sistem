
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, Newspaper } from "lucide-react";
import api from "../../lib/api";

export default function BeritaDetail() {
  const { slug } = useParams();
  const [berita, setBerita] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let aktif = true;

    const ambilDetail = async () => {
      setLoading(true);
      setError(false);

      try {
        const response = await api.get(
          `/berita/${encodeURIComponent(slug)}`
        );

        const data = response.data?.data ?? response.data;

        if (aktif) {
          setBerita(data);
        }
      } catch (err) {
        console.error("Gagal mengambil detail berita:", err);
        if (aktif) {
          setError(true);
        }
      } finally {
        if (aktif) setLoading(false);
      }
    };

    ambilDetail();

    return () => {
      aktif = false;
    };
  }, [slug]);

  const baseUrl = (
    import.meta.env.VITE_API_URL || "http://localhost:8000/api"
  ).replace(/\/api\/?$/, "");

  const gambar = berita?.gambar
    ? berita.gambar.startsWith("http")
      ? berita.gambar
      : `${baseUrl}/storage/${berita.gambar.replace(/^\/?storage\//, "")}`
    : null;

  const tanggal = berita?.published_at || berita?.created_at;

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <Link
          to="/"
          className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-emerald-700"
        >
          <ArrowLeft size={17} />
          Kembali ke Beranda
        </Link>

        {loading ? (
          <p className="py-24 text-center text-slate-500">
            Memuat artikel...
          </p>
        ) : error || !berita ? (
          <div className="py-24 text-center">
            <Newspaper
              size={42}
              className="mx-auto mb-4 text-slate-300"
            />
            <h1 className="text-2xl font-bold text-slate-800">
              Artikel tidak ditemukan
            </h1>
            <p className="mt-3 text-slate-500">
              Artikel mungkin sudah tidak tersedia atau belum dipublikasikan.
            </p>
            <Link
              to="/"
              className="mt-6 inline-flex rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800"
            >
              Kembali ke Beranda
            </Link>
          </div>
        ) : (
          <article>
            <div className="mb-5 flex flex-wrap items-center gap-4 text-sm">
              <span className="rounded-full bg-emerald-50 px-3 py-1.5 font-semibold text-emerald-800">
                {berita.kategori || "Artikel"}
              </span>

              {tanggal && (
                <span className="inline-flex items-center gap-2 text-slate-500">
                  <CalendarDays size={16} />
                  {new Date(tanggal).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              )}
            </div>

            <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl">
              {berita.judul}
            </h1>

            {berita.ringkasan && (
              <p className="mt-6 border-l-4 border-emerald-600 pl-5 text-lg leading-relaxed text-slate-600">
                {berita.ringkasan}
              </p>
            )}

            {gambar && (
              <img
                src={gambar}
                alt={berita.judul}
                className="mt-8 max-h-[500px] w-full rounded-2xl object-cover"
              />
            )}

            <div className="mt-10 border-b border-slate-200 pb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                Berita & Artikel
              </p>
            </div>

            <div className="whitespace-pre-line break-words py-8 text-base leading-8 text-slate-700">
              {berita.konten}
            </div>

            <div className="mt-8 border-t border-slate-200 pt-6">
              <Link
                to="/"
                className="inline-flex items-center gap-2 font-semibold text-emerald-700 hover:text-emerald-900"
              >
                <ArrowLeft size={17} />
                Kembali ke Beranda
              </Link>
            </div>
          </article>
        )}
      </div>
    </main>
  );
}
