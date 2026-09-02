import { Link } from "react-router-dom";
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

const strukturOrganisasi = [
  { jabatan: "Ketua", nama: "-" },
  { jabatan: "Wakil Ketua", nama: "-" },
  { jabatan: "Sekretaris", nama: "-" },
  { jabatan: "Bendahara", nama: "-" },
  { jabatan: "Pengawas Syariah", nama: "-" },
  { jabatan: "Manajer Operasional", nama: "-" },
];

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
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-2">
            {/* VISI */}
            <div className="rounded-3xl bg-[#1E5E3F] p-8 text-white">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                <Target size={24} />
              </div>
              <h2 className="text-xl font-bold">Visi</h2>
              <p className="mt-3 leading-relaxed text-green-100">
                Menjadi koperasi simpan pinjam dan pembiayaan syariah yang
                terpercaya, profesional, dan berdaya saing tinggi dalam rangka
                mewujudkan kesejahteraan anggota dan masyarakat berdasarkan
                prinsip-prinsip Islam.
              </p>
            </div>
            {/* MISI */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1E5E3F]/10">
                <BookOpen size={24} className="text-[#1E5E3F]" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Misi</h2>
              <p className="mt-3 leading-relaxed text-darkforestgreen-100">
                “Memacu Pembinaan Ummat Dalam Bidang Pengembangan Usaha Muamalat Islam”
              </p>
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
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-[#1E5E3F]">
              Organisasi
            </span>
            <h2 className="mt-2 text-3xl font-bold text-slate-800">
              Struktur Organisasi
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {strukturOrganisasi.map((s) => (
              <div
                key={s.jabatan}
                className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1E5E3F] text-sm font-bold text-white">
                  {s.nama
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{s.nama}</p>
                  <p className="text-xs text-[#1E5E3F] font-medium">
                    {s.jabatan}
                  </p>
                </div>
              </div>
            ))}
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
