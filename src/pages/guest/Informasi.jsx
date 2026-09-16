import { useState } from "react";
import { Link } from "react-router-dom";
import { Wallet, CreditCard, CheckCircle2, ChevronDown, ChevronUp, ArrowRight, Calculator } from "lucide-react";

const simpanan = [
  {
    nama: "Tabungan Mudharabah",
    deskripsi: "Simpanan dengan akad Mudharabah yang dikelola sesuai prinsip syariah dengan sistem bagi hasil berdasarkan nisbah yang telah disepakati",
    ketentuan: ["Menggunakan akad Mudharabah", "Setoran dapat dilakukan sesuai ketentuan koperasi", "Mendapatkan bagi hasil sesuai nisbah", "Penarikan dana mengikuti ketentuan koperasi"],
    manfaat: ["Mendapatkan bagi hasil", "Membantu mengembangkan dana", "Mudah digunakan untuk kebutuhan anggota", "Dikelola sesuai prinsip syariah"],
    persyaratan: ["Telah terdaftar sebagai anggota", "Mengisi formulir pembukaan rekening", "Melengkapi dokumen yang dipersyaratkan"],
    nominal: "xx", //perlu konfirmasi
    warna: "emerald",
  },
  {
    nama: "Tabungan Pendidikan",
    deskripsi: "Simpanan yang diperuntukkan bagi anggota untuk mempersiapkan kebutuhan biaya pendidikan secara terencana",
    ketentuan: ["Setoran dilakukan secara rutin", "Jumlah setoran sesuai kemampuan anggota", "Penarikan mengikuti ketentuan tabungan pendidikan", "Diperuntukkan untuk kebutuhan pendidikan"],
    manfaat: ["Membantu mempersiapkan biaya pendidikan", "Membentuk kebiasaan menabung secara rutin", "Membantu mengatur keuangan untuk kebutuhan pendidikan", "Dana dapat berkembang sesuai ketentuan"],
    persyaratan: ["Merupakan anggota koperasi", "Mengisi formulir pembukaan rekening", "Melakukan setoran awal sesuai ketentuan"],
    nominal: "xx", //perlu konfirmasi
    warna: "blue",
  },
  {
    nama: "Tabungan Wadiah",
    deskripsi: "Simpanan dengan akad Wadiah yang memberikan kemudahan bagi anggota untuk menyimpan dan menarik dana sesuai dengan ketentuan koperasi.",
    ketentuan: ["Dana mudah disimpan dan digunakan", "Memberikan kemudahan dalam melakukan transaksi", "Dikelola sesuai prinsip syariah", "Berpotensi mendapatkan bonus sesuai kebijakan koperasi"],
    manfaat: ["Likuiditas tinggi", "Bebas biaya administrasi", "Bonus simpanan setiap bulan"],
    persyaratan: ["Merupakan anggota koperasi", "Mengisi formulir pembukaan rekening", "Melengkapi dokumen yang dipersyaratkan"],
    nominal: "xx", //perlu konfirmasi
    warna: "indigo",
  },
  {
    nama: "Simpanan Berjangka (SIMJAKA)",
    deskripsi: "Simpanan dengan jangka waktu tertentu yang dikelola menggunakan prinsip syariah dengan sistem bagi hasil sesuai ketentuan yang berlaku.",
    ketentuan: ["Tersedia pilihan jangka waktu sesuai ketentuan", "Setoran minimal sesuai ketentuan koperasi", "Menggunakan akad Mudharabah", "Pencairan dilakukan setelah jangka waktu berakhir"],
    manfaat: ["Mendapatkan bagi hasil sesuai nisbah", "Membantu mengembangkan dana dalam jangka waktu tertentu", "Mendorong perencanaan keuangan jangka menengah dan panjang", "Dapat menjadi jaminan pembiayaan sesuai ketentuan"],
    persyaratan: ["Merupakan anggota koperasi", "Memenuhi setoran minimal", "Memilih jangka waktu simpanan", "Melengkapi dokumen yang dipersyaratkan"],
    nominal: "xx", //perlu konfirmasi
    warna: "orange",
  },
];

const pinjaman = [
  {
    nama: "Pembiayaan Murabahah",
    deskripsi: "Pembiayaan jual-beli untuk kebutuhan barang konsumtif maupun produktif.",
    plafon: "Rp 500.000 – Rp 500.000.000",
    tenor: "1 – 60 bulan",
    ketentuan: ["Akad jual-beli syariah", "Margin kompetitif dan transparan", "Cicilan tetap setiap bulan"],
    persyaratan: ["KTP/SIM yang masih berlaku", "Slip gaji / laporan usaha", "Jaminan sesuai plafon", "Foto terbaru"],
    warna: "green",
  },
  {
    nama: "Pembiayaan Mudharabah",
    deskripsi: "Pembiayaan bagi hasil untuk pengembangan usaha produktif anggota.",
    plafon: "Rp 5.000.000 – Rp 200.000.000",
    tenor: "3 – 36 bulan",
    ketentuan: ["Akad bagi hasil proporsional", "Keuntungan dibagi sesuai nisbah", "Laporan usaha berkala"],
    persyaratan: ["Anggota aktif min. 3 bulan", "Proposal usaha", "Laporan keuangan usaha", "Jaminan usaha"],
    warna: "blue",
  },
  {
    nama: "Pembiayaan Ijarah",
    deskripsi: "Pembiayaan sewa menyewa untuk kebutuhan pendidikan, kesehatan, atau jasa.",
    plafon: "Rp 500.000 – Rp 50.000.000",
    tenor: "1 – 24 bulan",
    ketentuan: ["Akad sewa manfaat", "Biaya sewa tetap", "Cocok untuk pendidikan dan kesehatan"],
    persyaratan: ["KTP/SIM", "Bukti kebutuhan (tagihan/invoice)", "Slip penghasilan"],
    warna: "purple",
  },
  {
    nama: "Pembiayaan Qardh",
    deskripsi: "Pinjaman kebajikan tanpa bunga untuk kebutuhan darurat atau sosial.",
    plafon: "Rp 500.000 – Rp 5.000.000",
    tenor: "1 – 12 bulan",
    ketentuan: ["Tanpa biaya tambahan (0%)", "Hanya untuk kebutuhan mendesak", "Pengembalian pokok pinjaman"],
    persyaratan: ["Anggota aktif min. 6 bulan", "Surat permohonan", "KTP"],
    warna: "rose",
  },
];

const colorMap = {
  emerald: "bg-emerald-50 border-emerald-200 text-emerald-700",
  blue:    "bg-blue-50 border-blue-200 text-blue-700",
  indigo:  "bg-indigo-50 border-indigo-200 text-indigo-700",
  orange:  "bg-orange-50 border-orange-200 text-orange-700",
  green:   "bg-green-50 border-green-200 text-green-700",
  purple:  "bg-purple-50 border-purple-200 text-purple-700",
  rose:    "bg-rose-50 border-rose-200 text-rose-700",
};

const iconColorMap = {
  emerald: "bg-emerald-100 text-emerald-600",
  blue:    "bg-blue-100 text-blue-600",
  indigo:  "bg-indigo-100 text-indigo-600",
  orange:  "bg-orange-100 text-orange-600",
  green:   "bg-green-100 text-green-600",
  purple:  "bg-purple-100 text-purple-600",
  rose:    "bg-rose-100 text-rose-600",
};

function ProductCard({ product, type }) {
  const [open, setOpen] = useState(false);
  const isS = type === "simpanan";
  const Icon = isS ? Wallet : CreditCard;

  return (
    <div className={`overflow-hidden rounded-2xl border ${colorMap[product.warna]} bg-white transition-all`}>
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconColorMap[product.warna]}`}>
            <Icon size={22} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-slate-800">{product.nama}</h3>
            <p className="mt-1 text-sm text-slate-500">{product.deskripsi}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              {isS ? (
                <span className="rounded-full bg-white/80 border px-3 py-1 font-semibold text-slate-700">
                  {product.nominal}
                </span>
              ) : (
                <>
                  <span className="rounded-full bg-white/80 border px-3 py-1 font-semibold text-slate-700">
                    Plafon: {product.plafon}
                  </span>
                  <span className="rounded-full bg-white/80 border px-3 py-1 font-semibold text-slate-700">
                    Tenor: {product.tenor}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-emerland-600 bg-emerland-50 px-4 py-3 text-sm font-semibold text-emerland-700 transition hover:bg-emerland-100 active:scale-[0.98]"
        >
          {open ? "Tutup Detail" : "Lihat Detail"}
          {open ? <ChevronUp size={18}/> : <ChevronDown size={18} />}
        </button>

      </div>

      {open && (
        <div className="border-t border-current/10 bg-white/40 p-6">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { label: "Ketentuan", items: product.ketentuan },
              { label: "Manfaat", items: product.manfaat || product.ketentuan },
              { label: "Persyaratan", items: product.persyaratan },
            ].map((sec) => (
              <div key={sec.label}>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">{sec.label}</p>
                <ul className="space-y-1.5">
                  {sec.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 size={12} className="mt-0.5 shrink-0 text-[#1E5E3F]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Informasi() {
  const [activeTab, setActiveTab] = useState("simpanan");

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
            Produk & Layanan
          </span>

          <h1 className="text-3xl font-bold md:text-4xl">
            Informasi Layanan Koperasi
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-green-100">
            Temukan produk simpanan dan pembiayaan syariah yang sesuai dengan kebutuhan anda
          </p>
        </div>
      </section>

      {/* TABS */}
      <div className="sticky top-[80px] z-20 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl gap-1 px-6 py-2">
          {[
            { key: "simpanan", label: "Simpanan", icon: Wallet },
            { key: "pinjaman", label: "Pembiayaan / Pinjaman", icon: CreditCard },
            { key: "simulasi", label: "Simulasi", icon: Calculator },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all ${
                activeTab === key
                  ? "bg-[#1E5E3F] text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <section className="bg-slate-50 py-12">
        <div className="mx-auto max-w-6xl px-6">

          {activeTab === "simpanan" && (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800">Produk Simpanan</h2>
                <p className="mt-1 text-slate-500">Kelola keuangan Anda dengan produk simpanan syariah kami yang aman dan menguntungkan.</p>
              </div>
              <div className="space-y-4">
                {simpanan.map((s) => <ProductCard key={s.nama} product={s} type="simpanan" />)}
              </div>
            </div>
          )}

          {activeTab === "pinjaman" && (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800">Produk Pembiayaan</h2>
                <p className="mt-1 text-slate-500">Wujudkan kebutuhan Anda dengan produk pembiayaan syariah yang sesuai.</p>
              </div>
              <div className="space-y-4">
                {pinjaman.map((p) => <ProductCard key={p.nama} product={p} type="pinjaman" />)}
              </div>
            </div>
          )}

        </div>
        {/* SIMULASI */}
{activeTab === "simulasi" && (
  <div>
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-slate-800">
        Simulasi Keuangan
      </h2>
      <p className="mt-1 text-slate-500">
        Hitung estimasi simpanan dan pembiayaan sesuai dengan kebutuhan Anda.
      </p>
    </div>

    <div className="grid gap-6 md:grid-cols-2">

      {/* SIMULASI SIMPANAN */}
      <div className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
            <Wallet className="h-6 w-6 text-emerald-600" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-800">
              Simulasi Simpanan
            </h3>
            <p className="text-sm text-slate-500">
              Perkirakan simpanan Anda
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Jenis Simpanan
            </label>

            <select className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100">
              <option>Tabungan Mudharabah</option>
              <option>Tabungan Pendidikan</option>
              <option>Tabungan Wadiah</option>
              <option>Simpanan Berjangka (SIMJAKA)</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Nominal Simpanan
            </label>

            <input
              type="number"
              placeholder="Masukkan nominal"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Jangka Waktu
            </label>

            <select className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100">
              <option>3 Bulan</option>
              <option>6 Bulan</option>
              <option>12 Bulan</option>
            </select>
          </div>

          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1E5E3F] px-4 py-3 font-semibold text-white transition hover:bg-[#174b32]">
            <Calculator className="h-5 w-5" />
            Hitung Simulasi
          </button>

          <div className="rounded-xl bg-emerald-50 p-4">
            <p className="text-sm font-medium text-emerald-700">
              Hasil Simulasi
            </p>

            <p className="mt-1 text-xl font-bold text-emerald-800">
              Estimasi Saldo
            </p>

            <p className="mt-1 text-2xl font-bold text-[#1E5E3F]">
              Rp 0
            </p>
          </div>
        </div>
      </div>

      {/* SIMULASI PEMBIAYAAN */}
      <div className="rounded-2xl border border-blue-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
            <CreditCard className="h-6 w-6 text-blue-600" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-800">
              Simulasi Pembiayaan
            </h3>
            <p className="text-sm text-slate-500">
              Perkirakan angsuran pembiayaan
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Jenis Pembiayaan
            </label>

            <select className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
              <option>Pembiayaan Murabahah</option>
              <option>Pembiayaan Mudharabah</option>
              <option>Pembiayaan Ijarah</option>
              <option>Pembiayaan Qardh</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Jumlah Pembiayaan
            </label>

            <input
              type="number"
              placeholder="Masukkan jumlah pembiayaan"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Jangka Waktu
            </label>

            <select className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
              <option>6 Bulan</option>
              <option>12 Bulan</option>
              <option>24 Bulan</option>
              <option>36 Bulan</option>
              <option>60 Bulan</option>
            </select>
          </div>

          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700">
            <Calculator className="h-5 w-5" />
            Hitung Simulasi
          </button>

          <div className="rounded-xl bg-blue-50 p-4">
            <p className="text-sm font-medium text-blue-700">
              Hasil Simulasi
            </p>

            <p className="mt-2 text-sm text-slate-600">
              Total Pembayaran
            </p>

            <p className="text-2xl font-bold text-blue-700">
              Rp 0
            </p>

            <div className="mt-3 border-t border-blue-100 pt-3">
              <p className="text-sm text-slate-600">
                Estimasi Angsuran / Bulan
              </p>

              <p className="text-lg font-bold text-slate-800">
                Rp 0
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* CATATAN */}
    <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
      <p className="text-sm leading-relaxed text-amber-800">
        <span className="font-semibold">Catatan:</span> Hasil simulasi
        merupakan estimasi dan dapat berbeda dengan perhitungan sebenarnya
        sesuai ketentuan koperasi yang berlaku.
      </p>
    </div>
  </div>
)}
      </section>

      {/* CTA */}
      <section className="bg-[#1E5E3F] py-14 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-2xl font-bold">Tertarik dengan Produk Kami?</h2>
          <p className="mx-auto mt-3 max-w-md text-green-100">
            Daftarkan diri Anda sekarang dan nikmati berbagai manfaat menjadi anggota koperasi.
          </p>
          <Link to="/daftar" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#1E5E3F] transition hover:bg-green-50">
            Daftar Sekarang <ArrowRight size={16} />
          </Link>
        </div>
      </section>

    </div>
  );
}
