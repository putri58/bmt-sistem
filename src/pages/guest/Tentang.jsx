import { Link } from "react-router-dom";
import strukturOrganisasi from "../../data/strukturOrganisasi";
import {
  Landmark,
  ShieldCheck,
  Target,
  Heart,
  Award,
  Users,
  BookOpen,
  ArrowRight,
} from "lucide-react";

const nilai = [
  {
    icon: ShieldCheck,
    title: "Amanah",
    desc: "Setiap kepercayaan anggota kami jaga dengan penuh tanggung jawab dan integritas tinggi.",
  },
  {
    icon: Heart,
    title: "Peduli",
    desc: "Kami hadir untuk memberdayakan anggota dan masyarakat sekitar dengan penuh kepedulian.",
  },
  {
    icon: Target,
    title: "Profesional",
    desc: "Layanan kami dijalankan secara profesional dengan standar tata kelola keuangan syariah.",
  },
  {
    icon: Award,
    title: "Transparan",
    desc: "Seluruh pengelolaan keuangan dilaporkan secara terbuka dan dapat diaudit kapan saja.",
  },
];

export default function Tentang() {
  return (
    <div>
      {/* HERO */}
      <section
        className="relative bg-cover bg-center py-16 text-white"
        style={{
          backgroundImage: `url("https://ykpialittihad.or.id/wp-content/uploads/2025/02/bmt-alittihad.png")`,
        }}
      >
        {/* Gradasi overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a2e1a] via-[#0a2e1a]/60 to-transparent"></div>

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <span className="mb-3 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-green-300">
            Tentang Kami
          </span>

          <h1 className="text-3xl font-bold md:text-4xl">
            Mengenal KSPPS BMT Al Ittihad
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-green-100">
            Lembaga keuangan mikro syariah yang telah melayani masyarakat Riau
            selama lebih dari dua dekade.
          </p>
        </div>
      </section>

      {/* PROFIL & SEJARAH */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <span className="text-sm font-bold uppercase tracking-widest text-[#1E5E3F]">
                Profil & Sejarah
              </span>
              <h2 className="mt-2 text-3xl font-bold text-slate-800">
                Berdiri Sejak 2001
              </h2>
              <p className="mt-4 leading-relaxed text-slate-500">
                KSPPS BMT Al Ittihad didirikan pada tahun 2001 oleh sekelompok
                tokoh masyarakat dan ulama di Pekanbaru, Riau, sebagai respons
                terhadap kebutuhan masyarakat akan lembaga keuangan yang halal,
                terjangkau, dan berbasis komunitas.
              </p>
              <p className="mt-3 leading-relaxed text-slate-500">
                Berawal dari modal awal yang sederhana dan puluhan anggota
                pendiri, KSPPS BMT Al Ittihad kini telah berkembang menjadi
                salah satu koperasi simpan pinjam syariah terpercaya di Provinsi
                Riau dengan lebih dari 12.000 anggota aktif.
              </p>
              <p className="mt-3 leading-relaxed text-slate-500">
                Selama lebih dari dua dekade, kami terus berkomitmen untuk
                memberdayakan ekonomi umat melalui produk-produk keuangan
                syariah yang inovatif, terjangkau, dan berdampak nyata bagi
                kesejahteraan anggota.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Tahun Berdiri", value: "2001" },
                { label: "Anggota Aktif", value: "12.000+" },
                { label: "Total Aset", value: "Rp 45 M+" },
                { label: "Karyawan", value: "85+" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-6 text-center"
                >
                  <p className="text-2xl font-bold text-[#1E5E3F]">{s.value}</p>
                  <p className="mt-1 text-sm text-slate-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VISI MISI */}
      <section className="relative overflow-hidden bg-slate-50 py-20">
        {/* Decorative background */}
        <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-emeralad-200/30 blur-3xl" />
        <div className="absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-green-200/30 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-6" />
        {/* Heading */}
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-[#1E5E3F]">
            Tentang Kami
          </span>
          <h2 className="text-3xl font-bold text-slate-800 md:text-4xl">
            Visi & Misi
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-500">
            Landasan dan arah kami dalam memberikan pelayanan terbaik bagi
            anggota serta masyarakat
          </p>
        </div>
        {/* Visi Misi */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Visi */}
          <div className="group relative overflow-hidden rounded-3xl bg-[#1E5E3F] p-8 text-white shadow-lg shadow-green-900/10 transition-all duration-500 hover:=-translate-y-2 hover:shadow-2xl hover:shadow-green-900/20">
            {/* Decoration circle */}
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/5 transition-transform duration-700 group-hover:scale-150" />
            <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-emerald-400/10 blur-2xl" />
            {/* icon */}
            <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/10 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-wgite/15">
              <Target
                size={26}
                className="transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="relativer">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
                Our Vision
              </span>
              <h2 className="mt-2 text-2xl font-bold">Visi</h2>
              <div className="mt-4 h-1 w-10 rounded-full bg-emerald-300 transition-all duration-500 group-hover:w-20" />
              <p className="mt-5 leading-7 text-green-100">
                {" "}
                Menjadi koperasi simpan pinjam dan pembiayaan syariah yang
                terpercaya, profesional, dan berdaya saing tinggi dalam rangka
                mewujudkan kesejahteraan anggota dan masyarakat berdasarkan
                prinsip-prinsip Islam
              </p>
            </div>
            {/* bottom decoration */}
            <div className="relative mt-8 flex items-center gap-2 text-xs font-medium text-emerald">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />{" "}
              Berlandaskan Prinsip Syariah
            </div>
          </div>
          {/* misi */}
          <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50 transition-all duration-500 hover:-translate-y-2 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-900/10">
            {/* Decorative backgronud */}
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emeralad-50 transition-transform duration-700 group-hover:scale-150" />
            <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-green-100/40 blur-2xl" />
            {/* icon */}
            <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1E5E3F]/10 transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-[#1E5E3F]/15">
              <BookOpen
                size={26}
                className="text-[#1E5E3F] transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="relative">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1E5E3F]">
                Our Mission
              </span>
              <h2 className="mt-2 text-2xl font-bold text-slate-800">Misi</h2>
              <div className="mt-4 h-1 w-10 rounded-full bg-[#1E5E3F]" />
              <p className="mt-5 leading-7 text-slate-600">
                “Memacu Pembinaan Umat Dalam Bidang Pengembangan Usaha Muamalat
                Islam”
              </p>
            </div>
            {/* Bottom decoration */}
            <div className="relative mt-8 flex items-center gp-2 text-xs font-medium text-[#1E5E3F]">
              <span className="h-1.5 animate-pulse rounded-full bg-[#1E5E3F]" />{" "}
              Untuk Kesejahteraan bersama
            </div>
          </div>
        </div>
      </section>

      {/* NILAI */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-[#1E5E3F]">
              Nilai Kami
            </span>
            <h2 className="mt-2 text-3xl font-bold text-slate-800">
              Landasan yang Kami Pegang
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {nilai.map((n) => {
              const Icon = n.icon;
              return (
                <div
                  key={n.title}
                  className="rounded-2xl border border-slate-100 p-6 text-center transition hover:border-[#1E5E3F]/30 hover:shadow-lg"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1E5E3F]/10 text-[#1E5E3F]">
                    <Icon size={26} />
                  </div>
                  <h3 className="font-bold text-slate-800">{n.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {n.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LEGALITAS */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-[#1E5E3F]">
              Legalitas
            </span>
            <h2 className="mt-2 text-3xl font-bold text-slate-800">
              Legalitas & Perizinan
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                label: "Akta Pendirian",
                value: "-",
              },
              {
                label: "Nomor Badan Hukum",
                value: "-",
              },
              { label: "NPWP Koperasi", value: "-" },
              { label: "Izin Operasional", value: "-" },
              { label: "Terdaftar di OJK", value: "-" },
              { label: "Sertifikasi DSN-MUI", value: "-" },
            ].map((l) => (
              <div
                key={l.label}
                className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4"
              >
                <ShieldCheck
                  size={18}
                  className="mt-0.5 shrink-0 text-[#1E5E3F]"
                />
                <div>
                  <p className="text-xs font-semibold text-slate-500">
                    {l.label}
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-slate-800">
                    {l.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STRUKTUR ORGANISASI */}
<section id="struktur-organisasi" className="relative overflow-hidden bg-slate-50 py-20">
  {/* Decorative Background */}
  <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
  <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-green-200/30 blur-3xl" />

  <div className="relative mx-auto max-w-6xl px-6">

    {/* Section Header */}
    <div className="mb-16 text-center">
      <span className="inline-flex items-center gap-2 rounded-full bg-[#1E5E3F]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#1E5E3F]">
        <span className="h-2 w-2 rounded-full bg-[#1E5E3F]" />
        Organisasi
      </span>

      <h2 className="mt-4 text-3xl font-bold text-slate-800 md:text-4xl">
        Struktur Organisasi
      </h2>

      <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-500 md:text-base">
        Mengenal jajaran pengurus KSPPS BMT Al-Ittihad yang berperan
        dalam menjalankan dan mengembangkan organisasi.
      </p>
    </div>

    {/* ================= KETUA ================= */}
    <div className="flex justify-center">
      <div className="group relative w-full max-w-sm">

        {/* Glow */}
        <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-[#1E5E3F]/20 via-emerald-400/20 to-[#1E5E3F]/20 opacity-0 blur-xl transition duration-500 group-hover:opacity-100" />

        <div className="relative overflow-hidden rounded-[2rem] border border-emerald-100 bg-white p-6 text-center shadow-lg transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl">

          {/* Top Accent */}
          <div className="absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r from-[#1E5E3F] via-emerald-400 to-[#1E5E3F]" />

          {/* Foto */}
          <div className="mx-auto mb-5 h-36 w-36 overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-lg ring-4 ring-[#1E5E3F]/10">
            <img
              src="/images/struktur/ketua.jpg"
              alt="Agung Subarkat"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          {/* Jabatan */}
          <span className="inline-flex rounded-full bg-[#1E5E3F]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1E5E3F]">
            Ketua
          </span>

          {/* Nama */}
          <h3 className="mt-3 text-xl font-bold text-slate-800">
            Agung Subarkat
          </h3>

          <div className="mx-auto mt-4 h-1 w-10 rounded-full bg-[#1E5E3F] transition-all duration-500 group-hover:w-20" />
        </div>
      </div>
    </div>

    {/* Connector */}
    <div className="relative mx-auto h-16 w-full max-w-4xl">
      {/* Vertical line */}
      <div className="absolute left-1/2 top-0 h-16 w-px -translate-x-1/2 bg-[#1E5E3F]/30" />

      {/* Horizontal line */}
      <div className="absolute bottom-0 left-[12.5%] right-[12.5%] hidden h-px bg-[#1E5E3F]/30 md:block" />
    </div>

    {/* ================= PENGURUS ================= */}
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

      {/* Wakil Sektor Rill */}
      <div className="group relative">
        <div className="absolute -inset-1 rounded-3xl bg-[#1E5E3F]/10 opacity-0 blur-lg transition duration-500 group-hover:opacity-100" />

        <div className="relative h-full overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-500 group-hover:-translate-y-2 group-hover:border-[#1E5E3F]/30 group-hover:shadow-xl">

          <div className="absolute left-0 top-0 h-1 w-0 bg-[#1E5E3F] transition-all duration-500 group-hover:w-full" />

          {/* Foto */}
          <div className="mx-auto mb-5 h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-md ring-4 ring-[#1E5E3F]/10">
            <img
              src="/images/struktur/wakil-sektor-rill.jpg"
              alt="Ali Masyhuri"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1E5E3F]">
              Wakil Sektor
            </span>

            <h3 className="mt-2 text-lg font-bold text-slate-800">
              Ali Masyhuri
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Sektor Rill
            </p>
          </div>
        </div>
      </div>

      {/* Wakil Sektor Pembiayaan */}
      <div className="group relative">
        <div className="absolute -inset-1 rounded-3xl bg-[#1E5E3F]/10 opacity-0 blur-lg transition duration-500 group-hover:opacity-100" />

        <div className="relative h-full overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-500 group-hover:-translate-y-2 group-hover:border-[#1E5E3F]/30 group-hover:shadow-xl">

          <div className="absolute left-0 top-0 h-1 w-0 bg-[#1E5E3F] transition-all duration-500 group-hover:w-full" />

          {/* Foto */}
          <div className="mx-auto mb-5 h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-md ring-4 ring-[#1E5E3F]/10">
            <img
              src="/images/struktur/wakil-sektor-pembiayaan.jpg"
              alt="Aswandi Janahar"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1E5E3F]">
              Wakil Sektor
            </span>

            <h3 className="mt-2 text-lg font-bold text-slate-800">
              Aswandi Janahar
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Pembiayaan
            </p>
          </div>
        </div>
      </div>

      {/* Sekretaris */}
      <div className="group relative">
        <div className="absolute -inset-1 rounded-3xl bg-[#1E5E3F]/10 opacity-0 blur-lg transition duration-500 group-hover:opacity-100" />

        <div className="relative h-full overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-500 group-hover:-translate-y-2 group-hover:border-[#1E5E3F]/30 group-hover:shadow-xl">

          <div className="absolute left-0 top-0 h-1 w-0 bg-[#1E5E3F] transition-all duration-500 group-hover:w-full" />

          {/* Foto */}
          <div className="mx-auto mb-5 h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-md ring-4 ring-[#1E5E3F]/10">
            <img
              src="/images/struktur/sekretaris.jpg"
              alt="Yon Hendri"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1E5E3F]">
              Sekretaris
            </span>

            <h3 className="mt-2 text-lg font-bold text-slate-800">
              Yon Hendri
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Sekretaris
            </p>
          </div>
        </div>
      </div>

      {/* Bendahara */}
      <div className="group relative">
        <div className="absolute -inset-1 rounded-3xl bg-[#1E5E3F]/10 opacity-0 blur-lg transition duration-500 group-hover:opacity-100" />

        <div className="relative h-full overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-500 group-hover:-translate-y-2 group-hover:border-[#1E5E3F]/30 group-hover:shadow-xl">

          <div className="absolute left-0 top-0 h-1 w-0 bg-[#1E5E3F] transition-all duration-500 group-hover:w-full" />

          {/* Foto */}
          <div className="mx-auto mb-5 h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-md ring-4 ring-[#1E5E3F]/10">
            <img
              src="/images/struktur/bendahara.jpg"
              alt="Edi Wibowo"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1E5E3F]">
              Bendahara
            </span>

            <h3 className="mt-2 text-lg font-bold text-slate-800">
              Edi Wibowo
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Bendahara
            </p>
          </div>
        </div>
      </div>

    </div>

    {/* Bottom Caption */}
    <div className="mt-14 text-center">
      <div className="mx-auto h-px w-24 bg-[#1E5E3F]/30" />

      <p className="mt-5 text-sm italic text-slate-500">
        Bersama membangun dan mengembangkan BMT Al-Ittihad
      </p>
    </div>

  </div>
</section>

      {/* CTA */}
      <section className="bg-[#1E5E3F] py-14 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-2xl font-bold">Siap Bergabung Bersama Kami?</h2>
          <p className="mx-auto mt-3 max-w-md text-green-100">
            Jadilah bagian dari keluarga besar KSPPS BMT Al Ittihad dan rasakan
            manfaatnya.
          </p>
          <Link
            to="/daftar"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#1E5E3F] transition hover:bg-green-50"
          >
            Daftar Sekarang <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
