import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Users,
  TrendingUp,
  Landmark,
  Wallet,
  CreditCard,
  Star,
  ArrowRight,
  CheckCircle2,
  Phone,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";

/* ─── DATA ─── */
const stats = [
  { value: "+++", label: "Anggota Aktif" },
  { value: "+++", label: "Total Simpanan" },
  { value: "+++", label: "Pembiayaan Aktif" },
  { value: "+++", label: "Tahun Berpengalaman" },
];

const produk = [
  {
    icon: Wallet,
    color: "emerald",
    nama: "Simpanan Wadiah",
    desc: "Titipan dana yang dapat ditarik kapan saja. Aman, mudah, dan sesuai prinsip syariah.",
    fitur: [
      "Bebas biaya administrasi",
      "Dapat ditarik kapan saja",
      "Bagi hasil kompetitif",
    ],
  },
  {
    icon: TrendingUp,
    color: "blue",
    nama: "Simpanan Mudharabah",
    desc: "Investasi berjangka dengan bagi hasil optimal berdasarkan akad mudharabah.",
    fitur: [
      "Bagi hasil hingga 8% p.a.",
      "Tenor 3, 6, 12 bulan",
      "Aman & terpercaya",
    ],
  },
  {
    icon: CreditCard,
    color: "indigo",
    nama: "Pembiayaan Murabahah",
    desc: "Pembiayaan jual-beli untuk kebutuhan modal usaha, konsumtif, dan pendidikan.",
    fitur: [
      "Margin kompetitif",
      "Proses cepat 3 hari",
      "Plafon hingga Rp 500 juta",
    ],
  },
  {
    icon: Landmark,
    color: "orange",
    nama: "Pembiayaan Mudharabah",
    desc: "Pembiayaan bagi hasil untuk pengembangan usaha produktif anggota.",
    fitur: [
      "Bagi hasil proporsional",
      "Pendampingan usaha",
      "Fleksibel & syariah",
    ],
  },
];

const keunggulan = [
  {
    icon: ShieldCheck,
    title: "Terpercaya & Terdaftar",
    desc: "Terdaftar dan diawasi oleh OJK serta Dinas Koperasi. Legalitas lengkap sejak 2001.",
  },
  {
    icon: Users,
    title: "Berbasis Anggota",
    desc: "Koperasi milik anggota, dikelola secara demokratis untuk kepentingan bersama.",
  },
  {
    icon: TrendingUp,
    title: "Bagi Hasil Kompetitif",
    desc: "Imbal hasil simpanan dan margin pembiayaan yang kompetitif dan transparan.",
  },
  {
    icon: ShieldCheck,
    title: "100% Prinsip Syariah",
    desc: "Seluruh produk dijalankan berdasarkan fatwa DSN-MUI dan prinsip syariah Islam.",
  },
];

const testimonials = [
  {
    nama: "Hendra Gunawan",
    peran: "Pedagang Pasar, Anggota sejak 2018",
    bintang: 5,
    text: "Alhamdulillah, dengan pembiayaan dari BMT Al Ittihad usaha warung saya bisa berkembang. Prosesnya mudah dan tidak ribet.",
  },
  {
    nama: "Siti Rahayu",
    peran: "Guru SD, Anggota sejak 2020",
    bintang: 5,
    text: "Simpanan di BMT Al Ittihad sangat menguntungkan. Bagi hasilnya lebih baik dari bank biasa dan sesuai syariah.",
  },
  {
    nama: "Budi Santoso",
    peran: "Pengusaha UMKM, Anggota sejak 2015",
    bintang: 5,
    text: "Sudah lebih dari 9 tahun jadi anggota. Pelayanannya ramah, amanah, dan selalu membantu ketika butuh modal usaha.",
  },
];

const faqs = [
  {
    q: "Apa itu KSPPS BMT Al Ittihad?",
    a: "KSPPS BMT Al Ittihad adalah Koperasi Simpan Pinjam dan Pembiayaan Syariah yang beroperasi berdasarkan prinsip syariah Islam. Kami melayani simpanan, pembiayaan, dan pemberdayaan ekonomi anggota.",
  },
  {
    q: "Bagaimana cara menjadi anggota?",
    a: "Cukup isi form pendaftaran online di halaman Daftar Anggota atau datang langsung ke kantor kami. Syarat utama: WNI, usia minimal 17 tahun, memiliki KTP, dan membayar simpanan pokok.",
  },
  {
    q: "Apakah simpanan saya aman?",
    a: "Ya, dana anggota dijamin keamanannya. BMT Al Ittihad diawasi oleh OJK dan Dinas Koperasi setempat, serta memiliki sistem pengelolaan keuangan yang transparan dan akuntabel.",
  },
  {
    q: "Berapa minimal simpanan awal?",
    a: "Simpanan pokok sebesar Rp 100.000 (dibayar sekali) dan simpanan wajib minimal Rp 50.000 per bulan. Simpanan sukarela tidak ada batas minimal.",
  },
  {
    q: "Apakah bisa mengajukan pembiayaan tanpa jaminan?",
    a: "Untuk pembiayaan produktif di bawah Rp 5 juta dapat diproses tanpa jaminan fisik dengan syarat sudah menjadi anggota aktif minimal 3 bulan.",
  },
];

const colorMap = {
  emerald: {
    bg: "bg-emerald-50",
    icon: "bg-emerald-100 text-emerald-600",
    border: "border-emerald-100",
    badge: "bg-emerald-600",
  },
  blue: {
    bg: "bg-blue-50",
    icon: "bg-blue-100 text-blue-600",
    border: "border-blue-100",
    badge: "bg-blue-600",
  },
  indigo: {
    bg: "bg-indigo-50",
    icon: "bg-indigo-100 text-indigo-600",
    border: "border-indigo-100",
    badge: "bg-indigo-600",
  },
  orange: {
    bg: "bg-orange-50",
    icon: "bg-orange-100 text-orange-600",
    border: "border-orange-100",
    badge: "bg-orange-600",
  },
};

/* ─── COMPONENT ─── */
export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1f3c] via-[#0d2d54] to-[#0a3d2e] py-24 text-white">
        {/* decorative circles */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-500/10" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-cyan-500/10" />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <span className="mb-4 inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400">
                ✦ Terpercaya Sejak 2000
              </span>
              <h1 className="text-4xl font-bold leading-tight md:text-5xl">
                Koperasi Simpan Pinjam Pembiayaan{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  Syariah BMT Al-Ittihad
                </span>
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-slate-300">
                “Menjadi Pusat Kegiatan Islam Terpadu Untuk Mewujudkan
                Masyarakat Madani Yang Makmur Lahir & Bathin Serta Sejahtera
                Dunia & Akhirat”
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/daftar"
                  className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
                >
                  Daftar Sekarang
                  <ArrowRight size={18} />
                </Link>
                <a
                  href="#produk"
                  className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 font-semibold text-white backdrop-blur transition hover:bg-white/20"
                >
                  Lihat Produk
                </a>
              </div>
            </div>

            {/* STATS CARD */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
                >
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="mt-1 text-sm text-slate-400">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TENTANG ── */}
      <section id="tentang" className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-14 md:grid-cols-2">
            {/* IMAGE PLACEHOLDER */}
            <div className="relative">
              <div className="relative h-80 overflow-hidden rounded-3xl">
  <img
    src="https://ykpialittihad.or.id/wp-content/uploads/2025/02/bmt.png"
    alt="Kantor KSPPS BMT Al Ittihad"
    className="h-full w-full object-cover"
  />

  <div className="absolute inset-0 bg-gradient-to-t from-[#0a2e1a]/90 via-[#1E5E3F]/45 to-transparent"></div>
</div>
              {/* floating badge */}
              <div className="absolute -bottom-4 -right-4 rounded-2xl bg-emerald-600 px-5 py-3 text-center shadow-xl">
                <p className="text-xl font-bold text-white">++++</p>
                <p className="text-xs text-emerald-200">Tahun Berpengalaman</p>
              </div>
            </div>

            <div>
              <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-emerald-600">
                Tentang Kami
              </span>
              <h2 className="text-3xl font-bold text-slate-800">
                Melayani dengan Amanah, Tumbuh Bersama Anggota
              </h2>
              <p className="mt-4 leading-relaxed text-slate-500">
                BMT Al-Ittihad adalah lembaga keuangan mikro syariah (koperasi
                syariah) milik Yayasan Kesatuan Pendidikan Islam (YKPI)
                Al-Ittihad Rumbai, Pekanbaru. Lembaga ini beroperasi berdasarkan
                prinsip syariah dengan sistem bagi hasil untuk menggantikan
                bunga, serta tunduk pada UU No. 25 Tahun 1992 tentang
                Perkoperasian.
              </p>
              <p className="mt-4 leading-relaxed text-slate-500">
                BMT Al-Ittihad mengantongi Sertifikat Operasional PINBUK No.
                034/PINBUK/RIAU/XI/2000 dan resminya berbadan hukum No.
                22/BH/DISKOP & UKM/3/X/2001 pada 31 Oktober 2001. Lembaga ini
                bertujuan memberdayakan ekonomi umat melalui kegiatan simpanan
                dan pembiayaan secara adil, aman, dan berkelanjutan bagi anggota
                serta mitra binaan.
              </p>
              {/* <div className="mt-6 space-y-3">
                {["Terdaftar dan diawasi OJK", "Legalitas Badan Hukum lengkap", "Sertifikasi DSN-MUI untuk seluruh produk", "Penghargaan Koperasi Terbaik 2023"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="shrink-0 text-emerald-500" />
                    <span className="text-sm text-slate-600">{item}</span>
                  </div>
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUK ── */}
      <section id="produk" className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-emerald-600">
              Produk & Layanan
            </span>
            <h2 className="text-3xl font-bold text-slate-800">
              Solusi Keuangan Syariah Lengkap
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-500">
              Berbagai produk simpanan dan pembiayaan kami dirancang untuk
              memenuhi kebutuhan finansial Anda secara syariah.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {produk.map((p) => {
              const c = colorMap[p.color];
              const Icon = p.icon;
              return (
                <div
                  key={p.nama}
                  className={`group rounded-2xl border ${c.border} ${c.bg} p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
                >
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${c.icon}`}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 className="font-semibold text-slate-800">{p.nama}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {p.desc}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {p.fitur.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-xs text-slate-600"
                      >
                        <CheckCircle2
                          size={13}
                          className="shrink-0 text-emerald-500"
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/daftar"
                    className={`mt-5 block rounded-lg ${c.badge} py-2 text-center text-xs font-semibold text-white transition hover:opacity-90`}
                  >
                    Selengkapnya →
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── KEUNGGULAN ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-emerald-600">
              Mengapa Kami
            </span>
            <h2 className="text-3xl font-bold text-slate-800">
              Keunggulan BMT Al Ittihad
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {keunggulan.map((k) => {
              const Icon = k.icon;
              return (
                <div
                  key={k.title}
                  className="rounded-2xl border border-slate-100 p-6 text-center transition-all hover:border-emerald-200 hover:shadow-lg"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <Icon size={26} />
                  </div>
                  <h3 className="font-semibold text-slate-800">{k.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {k.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── LANGKAH DAFTAR ── */}
      <section className="bg-gradient-to-br from-[#0a1f3c] to-[#0a3d2e] py-20 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-emerald-400">
              Cara Bergabung
            </span>
            <h2 className="text-3xl font-bold">Jadi Anggota dalam 3 Langkah</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                no: "01",
                title: "Isi Formulir",
                desc: "Lengkapi formulir pendaftaran online dengan data diri dan unggah dokumen yang diperlukan.",
              },
              {
                no: "02",
                title: "Verifikasi",
                desc: "Tim kami akan memverifikasi data Anda dalam 1–2 hari kerja dan menghubungi Anda.",
              },
              {
                no: "03",
                title: "Aktif sebagai Anggota",
                desc: "Setelah disetujui, bayar simpanan pokok dan Anda resmi menjadi anggota aktif.",
              },
            ].map((step) => (
              <div
                key={step.no}
                className="relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur"
              >
                <span className="text-5xl font-black text-white/10">
                  {step.no}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/daftar"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-8 py-4 font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
            >
              Daftar Sekarang
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONI ── */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-emerald-600">
              Testimoni
            </span>
            <h2 className="text-3xl font-bold text-slate-800">
              Kata Anggota Kami
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.nama}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-3 flex gap-1">
                  {Array.from({ length: t.bintang }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-slate-600">
                  "{t.text}"
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-600">
                    {t.nama
                      .split(" ")
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {t.nama}
                    </p>
                    <p className="text-xs text-slate-400">{t.peran}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="informasi" className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-12 text-center">
            <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-emerald-600">
              FAQ
            </span>
            <h2 className="text-3xl font-bold text-slate-800">
              Pertanyaan yang Sering Diajukan
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-slate-200"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left transition hover:bg-slate-50"
                >
                  <span className="font-medium text-slate-800">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp
                      size={18}
                      className="shrink-0 text-emerald-600"
                    />
                  ) : (
                    <ChevronDown
                      size={18}
                      className="shrink-0 text-slate-400"
                    />
                  )}
                </button>
                {openFaq === i && (
                  <div className="border-t border-slate-100 bg-slate-50 px-6 py-4">
                    <p className="text-sm leading-relaxed text-slate-600">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="bg-emerald-600 py-16 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold">Siap Bergabung Bersama Kami?</h2>
          <p className="mx-auto mt-3 max-w-lg text-emerald-100">
            Daftarkan diri Anda sekarang dan nikmati berbagai keuntungan menjadi
            anggota KSPPS BMT Al Ittihad.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/daftar"
              className="flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-emerald-700 shadow-lg transition hover:bg-emerald-50"
            >
              Daftar Sekarang
              <ArrowRight size={18} />
            </Link>
            <a
              href="tel:07611234567"
              className="flex items-center gap-2 rounded-xl border-2 border-white/40 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
            >
              <Phone size={18} />
              Hubungi Kami
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
