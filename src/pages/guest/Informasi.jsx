import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Wallet,
  CreditCard,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Calculator,
  FileText,
  Shield,
  Users,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────
   DATA PEMBIAYAAN & SIMPANAN
───────────────────────────────────────────────────────── */
const jenisPembiayaan = [
  {
    nama: "Murabahah",
    cocokUntuk: "Pembelian barang konsumtif & produktif", 
    warna: "emerald",
    deskripsi: "Pembiayaan Murabahah adalah pembiayaan berdasarkan prinsip jual beli, di mana koperasi membeli barang yang dibutuhkan anggota lalu menjualnya kembali dengan harga pokok dan margin keuntungan yang disepakati bersama.",
  },
  {
    nama: "Mudharabah",
    cocokUntuk: "Pengembangan usaha produktif",
    warna: "blue",
    deskripsi: "Pembiayaan Mudharabah adalah pembiayaan berdasarkan prinsip kerja sama usaha, di mana koperasi menyediakan modal dan anggota mengelola usaha, dengan keuntungan dibagi sesuai kesepakatan bersama.",
  },
  {
    nama: "Musyarakah",
    cocokUntuk: "Kemitraan usaha bersama",
    warna: "indigo",
    deskripsi: "Pembiayaan Musyarakah adalah pembiayaan berdasarkan prinsip kerja sama usaha antara koperasi dan anggota, di mana kedua pihak menyertakan modal dan membagi keuntungan sesuai kesepakatan bersama.",
  },
  {
    nama: "Ijarah",
    cocokUntuk: "Pendidikan, kesehatan & sewa aset",
    warna: "purple",
    deskripsi: "Pembiayaan Ijarah adalah pembiayaan berdasarkan prinsip sewa-menyewa, di mana koperasi menyediakan barang atau jasa untuk digunakan anggota dengan pembayaran sewa sesuai kesepakatan bersama.",
  },
  {
    nama: "Istishna",
    cocokUntuk: "Konstruksi & pembuatan barang custom",
    warna: "orange",
    deskripsi: "Pembiayaan Istishna adalah pembiayaan berdasarkan prinsip jual beli pesanan, di mana koperasi menyediakan barang yang dibuat atau dibangun sesuai spesifikasi dan kesepakatan dengan anggota.",
  },
];

const persyaratanPendaftaran = [
  "Fotocopy KTP/SIM",
  "Pass Photo 3x4 (1 lembar)",
  "Simpanan Wajib Rp 20.000",
  "Simpanan Pokok Rp 50.000",
  "Simpanan Mudharabah Rp 10.000",
  "Kartu Anggota Rp 5.000",
];

const syaratPembiayaan = [
  "Fotocopy KTP Suami & Istri Pemohon",
  "Fotocopy Kartu Keluarga",
  "Fotocopy Surat Nikah",
  "Slip Gaji 3 bulan terakhir",
  "Rekening Koran",
  "Fotocopy SK Pengangkatan",
  "Fotocopy Jaminan BPKB & STNK (Pajak Hidup)",
  "Fotocopy Jaminan SKGR, SHGB, atau SHM",
  "Legalitas Lembaga/Usaha",
];

const jaminan = [
  "SKGR Camat",
  "SHM / SHGB",
  "BPKB Kendaraan Bermotor",
  "Cash Collateral / Tabungan / Payroll",
];

const simpanan = [
  {
    nama: "Tabungan Mudharabah",
    warna: "emerald",
    deskripsi: "Tabungan Mudharabah adalah Tabungan dari BMT AL-Ittihad dengan prinsip bagi hasil yang dirancang untuk mewujudkan impian anda dengan terencana. Tabungan Mudharabah BMT AL-Ittihad memberikan ketenangan dan kenyamanan yang penuh nilai kebaikan serta lebih berkah karena pengelolaan dana sesuai syariah",
  },
  {
    nama: "Tabungan Pendidikan",
    warna: "blue",
    deskripsi: "Tabungan Pendidikan adalah Tabungan yang diperuntukan untuk anak yang masih dalam masa pendidikan dengan rekening tabungan juga atas nama anak yang bersangkutan, tentunya tabungan ini bertujuan untuk mendidik anak dari dini rajin menabung dan tabungan ini menggunakan prinsip bagi hasil ",
  },
  {
    nama: "Tabungan Wadiah",
    warna: "indigo",
    deskripsi: "Tabungan Wadiah adalah Tabungan yang dijalankan berdasarkan akad wadiah, yaitu titipan murni yang setiap saat dapat diambil jika pemiliknya menhendaki. Konsep yang dipakai adalah wadiah yad dhamanah. Dalam hal ini nasabah bertindak sebagai penitip yang memberikan hak kepada BMT unutk menggunakan atau memanfaatkan uang atau barang titipan",
  },
  {
    nama: "Simpanan Berjangka (SIMJAKA)",
    warna: "orange",
    deskripsi: "Simpanan Berjangka adalah Simpanan dari mitra dengan BMT yang penarikanya hanya dapat dilakukan dalam jangka waktu tertentu menurut perjanjian antara mitra dan pihak BMT yang bersangkutan",
  },
];

/* ─────────────────────────────────────────────────────────
   COLOR MAPS & STYLING
───────────────────────────────────────────────────────── */
const simpananColorMap = {
  emerald: {
    card: "border-emerald-200 bg-gradient-to-br from-emerald-50 to-white",
    icon: "bg-emerald-100 text-emerald-600",
    label: "text-emerald-600",
    dot: "bg-emerald-400",
    shine: "from-emerald-400/10",
  },
  blue: {
    card: "border-blue-200 bg-gradient-to-br from-blue-50 to-white",
    icon: "bg-blue-100 text-blue-600",
    label: "text-blue-600",
    dot: "bg-blue-400",
    shine: "from-blue-400/10",
  },
  indigo: {
    card: "border-indigo-200 bg-gradient-to-br from-indigo-50 to-white",
    icon: "bg-indigo-100 text-indigo-600",
    label: "text-indigo-600",
    dot: "bg-indigo-400",
    shine: "from-indigo-400/10",
  },
  orange: {
    card: "border-orange-200 bg-gradient-to-br from-orange-50 to-white",
    icon: "bg-orange-100 text-orange-600",
    label: "text-orange-600",
    dot: "bg-orange-400",
    shine: "from-orange-400/10",
  },
};

const pembiayaanColorMap = {
  emerald: {
    card: "border-emerald-200/80 bg-emerald-50/30 hover:border-emerald-300",
    num: "bg-emerald-100 text-emerald-700",
    badge: "bg-emerald-100/90 text-emerald-800",
    arrow: "text-emerald-600",
  },
  blue: {
    card: "border-blue-200/80 bg-blue-50/30 hover:border-blue-300",
    num: "bg-blue-100 text-blue-700",
    badge: "bg-blue-100/90 text-blue-800",
    arrow: "text-blue-600",
  },
  indigo: {
    card: "border-indigo-200/80 bg-indigo-50/30 hover:border-indigo-300",
    num: "bg-indigo-100 text-indigo-700",
    badge: "bg-indigo-100/90 text-indigo-800",
    arrow: "text-indigo-600",
  },
  purple: {
    card: "border-purple-200/80 bg-purple-50/30 hover:border-purple-300",
    num: "bg-purple-100 text-purple-700",
    badge: "bg-purple-100/90 text-purple-800",
    arrow: "text-purple-600",
  },
  orange: {
    card: "border-amber-200/80 bg-amber-50/30 hover:border-amber-300",
    num: "bg-amber-100 text-amber-700",
    badge: "bg-amber-100/90 text-amber-800",
    arrow: "text-amber-600",
  },
};

/* ─────────────────────────────────────────────────────────
   KOMPONEN CARD WITH DROPDOWN
───────────────────────────────────────────────────────── */
function SimpananCard({ product, index }) {
  const [isOpen, setIsOpen] = useState(false);
  const c = simpananColorMap[product.warna];

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className={`relative overflow-hidden cursor-pointer rounded-2xl border p-6 transition-all hover:shadow-lg hover:-translate-y-0.5 ${c.card}`}
    >
      <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${c.shine} to-transparent opacity-60`} />

      <div className="flex items-center gap-4">
        {/* Nomor */}
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg font-bold ${c.icon}`}>
          {index + 1}
        </div>
        {/* Nama */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-800 text-base leading-snug">{product.nama}</h3>
          <div className="mt-1.5 flex items-center gap-1.5">
            <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
            <span className={`text-xs font-semibold ${c.label}`}>Produk Simpanan Syariah</span>
          </div>
        </div>
        {/* Arrow Dropdown */}
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${c.icon} transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
          <ChevronDown size={18} />
        </div>
      </div>

      {/* DROPDOWN DESKRIPSI */}
      {isOpen && (
        <div className="relative z-10 mt-4 border-t border-slate-200/60 pt-3 text-sm leading-relaxed text-slate-600">
          <p>{product.deskripsi}</p>
        </div>
      )}
    </div>
  );
}

function PembiayaanCard({ product, index }) {
  const [isOpen, setIsOpen] = useState(false);
  const c = pembiayaanColorMap[product.warna] || pembiayaanColorMap.emerald;

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className={`cursor-pointer rounded-2xl border p-5 transition-all duration-300 hover:shadow-md ${c.card}`}
    >
      <div className="flex items-center gap-4">
        {/* Nomor Box */}
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold ${c.num}`}>
          {index + 1}
        </div>

        {/* Info Utama */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-800 text-base">{product.nama}</h3>
          <div className="mt-1">
            <span className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${c.badge}`}>
              {product.cocokUntuk}
            </span>
          </div>
        </div>

        {/* Arrow Dropdown */}
        <div className={`shrink-0 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 " + c.arrow : ""}`}>
          <ChevronDown size={20} />
        </div>
      </div>

      {/* DROPDOWN DESKRIPSI */}
      {isOpen && (
        <div className="mt-4 border-t border-slate-200/60 pt-3 text-sm leading-relaxed text-slate-600">
          <p>{product.deskripsi}</p>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   KOMPONEN UTAMA
───────────────────────────────────────────────────────── */
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
            { key: "pembiayaan", label: "Pembiayaan", icon: CreditCard },
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

          {/* TAB SIMPANAN */}
          {activeTab === "simpanan" && (
            <div className="space-y-12">
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-800">Simpanan</h2>
                  <p className="mt-1 text-slate-500">Kelola keuangan Anda dengan produk simpanan syariah kami yang aman dan menguntungkan.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {simpanan.map((s, i) => (
                    <SimpananCard key={s.nama} product={s} index={i} />
                  ))}
                </div>
              </div>

              {/* PERSYARATAN PEMBIAYAAN */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Persyaratan Simpanan</h2>
          <p className="mt-1 text-slate-500">Siapkan dokumen berikut sebelum mengajukan simpanan.</p>
        </div>

        <div className="flex justify-center">
  {/* CARD 1: PENDAFTARAN ANGGOTA */}
  <div className="w-full max-w-md rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm flex flex-col justify-between">
    <div>
      <div className="mb-6 flex items-center gap-3.5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
          <Users size={22} />
        </div>
        <div>
          <h3 className="font-bold text-slate-800 text-base">Pendaftaran Anggota</h3>
          <p className="text-xs text-slate-400 mt-0.5">Total Rp 80.000</p>
        </div>
      </div>

      <ul className="space-y-3">
        {persyaratanPendaftaran.map((item, idx) => (
          <li key={idx} className="flex items-center gap-3 text-sm text-slate-600">
            <CheckCircle2 size={18} className="shrink-0 text-emerald-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="mt-6 rounded-2xl bg-emerald-50 p-4 text-center">
      <span className="block text-xs font-semibold text-emerald-600">Jumlah Keseluruhan</span>
      <span className="mt-0.5 block text-2xl font-bold text-emerald-600">Rp 80.000</span>
    </div>
  </div>
</div>
      </div>
            </div>
          )}

          {/* TAB PEMBIAYAAN */}
          {activeTab === "pembiayaan" && <PembiayaanSection />}

        </div>

        {/* TAB SIMULASI */}
        {activeTab === "simulasi" && <SimulasiSection />}
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

/* ─────────────────────────────────────────────────────────
   PEMBIAYAAN SECTION
───────────────────────────────────────────────────────── */
function PembiayaanSection() {
  return (
    <div className="space-y-12">
      {/* JENIS PEMBIAYAAN */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Jenis Pembiayaan</h2>
          <p className="mt-1 text-slate-500">Pilih skema pembiayaan syariah yang paling sesuai dengan kebutuhan Anda.</p>
        </div>

        {/* Layout 3 Kartu Atas */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {jenisPembiayaan.slice(0, 3).map((p, i) => (
            <PembiayaanCard key={p.nama} product={p} index={i} />
          ))}
        </div>

        {/* Layout 2 Kartu Bawah (Rata Tengah) */}
        <div className="mt-4 flex flex-col sm:flex-row justify-center gap-4">
          {jenisPembiayaan.slice(3, 5).map((p, i) => (
            <div key={p.nama} className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.333%-11px)]">
              <PembiayaanCard product={p} index={i + 3} />
            </div>
          ))}
        </div>
      </div>

      {/* PERSYARATAN PEMBIAYAAN */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Persyaratan Pembiayaan</h2>
          <p className="mt-1 text-slate-500">Siapkan dokumen berikut sebelum mengajukan pembiayaan.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* CARD 1: PENDAFTARAN ANGGOTA */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="mb-6 flex items-center gap-3.5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                  <Users size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-base">Pendaftaran Anggota</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Total Rp 80.000</p>
                </div>
              </div>

              <ul className="space-y-3">
                {persyaratanPendaftaran.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-slate-600">
                    <CheckCircle2 size={18} className="shrink-0 text-emerald-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 rounded-2xl bg-emerald-50 p-4 text-center">
              <span className="block text-xs font-semibold text-emerald-600">Jumlah Keseluruhan</span>
              <span className="mt-0.5 block text-2xl font-bold text-emerald-600">Rp 80.000</span>
            </div>
          </div>

          {/* CARD 2: SYARAT PEMBIAYAAN */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                <FileText size={22} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-base">Syarat Pembiayaan</h3>
                <p className="text-xs text-slate-400 mt-0.5">Dokumen yang diperlukan</p>
              </div>
            </div>

            <ul className="space-y-3">
              {syaratPembiayaan.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm text-slate-600">
                  <CheckCircle2 size={18} className="shrink-0 text-blue-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CARD 3: JAMINAN */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="mb-6 flex items-center gap-3.5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                  <Shield size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-base">Jaminan</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Agunan yang diterima</p>
                </div>
              </div>

              <ul className="space-y-3">
                {jaminan.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-slate-600">
                    <CheckCircle2 size={18} className="shrink-0 text-amber-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 rounded-2xl bg-amber-50/80 p-4 text-center">
              <p className="text-xs font-medium text-amber-700 leading-relaxed">
                Jaminan disesuaikan dengan plafon dan jenis pembiayaan yang diajukan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   SIMULASI DEPOSITO & PEMBIAYAAN
───────────────────────────────────────────────────────── */
const NISBAH_DEPOSITO = { 3: 0.32, 6: 0.33, 9: 0.34, 12: 0.35 };

function SimulasiDeposito() {
  const today = new Date();
  const defaultMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;

  const [jumlah, setJumlah] = useState("");
  const [jangka, setJangka] = useState(3);
  const [nisbah, setNisbah] = useState(NISBAH_DEPOSITO[3]);
  const [awal, setAwal] = useState(defaultMonth);
  const [hasil, setHasil] = useState(null);

  function hitungDeposito(e) {
    e.preventDefault();

    const nominal = Math.round(parseFloat(jumlah.replace(/[^\d]/g, "")));
    if (!nominal || isNaN(nominal)) return;

    const sukuBunga = parseFloat(nisbah) / 100;
    const [thn, bln] = awal.split("-").map(Number);
    const awalDate = new Date(thn, bln - 1, 1);

    let totalKotor = 0;
    let totalPPH = 0;
    let totalBersih = 0;

    const rows = [];
    for (let i = 1; i <= jangka; i++) {
      const currentMonth = new Date(awalDate.getFullYear(), awalDate.getMonth() + i, 1);
      const mm = String(currentMonth.getMonth() + 1).padStart(2, "0");
      const yyyy = currentMonth.getFullYear();

      const bungaKotor = Math.round(nominal * sukuBunga);
      const pph = Math.round(bungaKotor * 0.1);
      const bungaBersih = Math.round(bungaKotor - pph);

      totalKotor += bungaKotor;
      totalPPH += pph;
      totalBersih += bungaBersih;

      rows.push({ no: i, periode: `${mm}/${yyyy}`, bungaKotor, pph, bungaBersih });
    }

    setHasil({
      rows,
      totalKotor,
      totalPPH,
      totalBersih,
      nominal,
      totalPengembalian: nominal + totalBersih,
    });
  }

  function resetDeposito() {
    setJumlah("");
    setJangka(3);
    setNisbah(NISBAH_DEPOSITO[3]);
    setAwal(defaultMonth);
    setHasil(null);
  }

  const inputCls = "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#1E5E3F] focus:bg-white";

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
            <Wallet className="h-6 w-6 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">Simulasi Deposito</h3>
            <p className="text-sm text-slate-500">Perkirakan bagi hasil deposito Anda</p>
          </div>
        </div>

        <form onSubmit={hitungDeposito} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Jumlah Deposito</label>
            <input
              type="text"
              value={jumlah}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^\d]/g, "");
                setJumlah(raw ? "Rp " + new Intl.NumberFormat("id-ID").format(raw) : "");
              }}
              placeholder="Rp 0"
              required
              className={inputCls}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Jangka Waktu</label>
            <select
              value={jangka}
              onChange={(e) => {
                const j = Number(e.target.value);
                setJangka(j);
                setNisbah(NISBAH_DEPOSITO[j]);
              }}
              className={inputCls}
            >
              <option value={3}>3 Bulan</option>
              <option value={6}>6 Bulan</option>
              <option value={9}>9 Bulan</option>
              <option value={12}>12 Bulan</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Bagi Hasil Bulanan (%)
              <span className="ml-2 text-xs font-normal text-slate-400">— otomatis, bisa diubah</span>
            </label>
            <input
              type="number"
              value={nisbah}
              onChange={(e) => setNisbah(e.target.value)}
              step="0.01"
              min="0"
              className={inputCls}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Waktu Deposito</label>
            <input
              type="month"
              value={awal}
              onChange={(e) => setAwal(e.target.value)}
              required
              className={inputCls}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1E5E3F] px-4 py-3 font-semibold text-white transition hover:bg-[#174b32]">
              <Calculator size={18} /> Hitung
            </button>
            <button type="button" onClick={resetDeposito} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
              Ulangi
            </button>
          </div>
        </form>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-5 font-bold text-slate-800">Perkiraan Bagi Hasil / Bulan</h3>

        {!hasil ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400">
            <Calculator size={40} className="mb-3 opacity-30" />
            <p className="text-sm">Isi form dan klik Hitung untuk melihat hasil</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-xs font-semibold uppercase text-slate-500">
                    <th className="px-3 py-2 text-center">No.</th>
                    <th className="px-3 py-2 text-center">Periode</th>
                    <th className="px-3 py-2 text-right">Bagi Hasil Kotor</th>
                    <th className="px-3 py-2 text-right">PPH</th>
                    <th className="px-3 py-2 text-right">Bagi Hasil Bersih</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {hasil.rows.map((row) => (
                    <tr key={row.no} className="hover:bg-slate-50">
                      <td className="px-3 py-2 text-center">{row.no}</td>
                      <td className="px-3 py-2 text-center">{row.periode}</td>
                      <td className="px-3 py-2 text-right">{formatRp(row.bungaKotor)}</td>
                      <td className="px-3 py-2 text-right">{formatRp(row.pph)}</td>
                      <td className="px-3 py-2 text-right font-semibold text-emerald-600">{formatRp(row.bungaBersih)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-50 font-semibold">
                    <td colSpan={2} className="px-3 py-2 text-center">Jumlah</td>
                    <td className="px-3 py-2 text-right">{formatRp(hasil.totalKotor)}</td>
                    <td className="px-3 py-2 text-right">{formatRp(hasil.totalPPH)}</td>
                    <td className="px-3 py-2 text-right text-emerald-600">{formatRp(hasil.totalBersih)}</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td colSpan={4} className="px-3 py-2 font-semibold">Nominal Penempatan</td>
                    <td className="px-3 py-2 text-right font-bold">{formatRp(hasil.nominal)}</td>
                  </tr>
                  <tr className="bg-[#1E5E3F] text-white">
                    <td colSpan={4} className="px-3 py-2 font-semibold">Total Pengembalian</td>
                    <td className="px-3 py-2 text-right font-bold">{formatRp(hasil.totalPengembalian)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="rounded-xl border border-red-200 bg-red-50 p-3">
              <p className="text-center text-xs font-semibold text-red-600">
                ⚠ Note : Perhitungan Bagi Hasil Bersifat Fluktuatif / Tidak Tetap
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function formatRp(v) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(v);
}

function getMarginDefault(jenis, tenor) {
  if (jenis === "KPR") {
    if (tenor <= 60) return 0.7;
    if (tenor <= 120) return 0.8;
    return 0.85;
  }
  if (tenor <= 12) return 0.9;
  if (tenor <= 24) return 1.0;
  if (tenor <= 36) return 1.1;
  return 1.2;
}

function SimulasiSection() {
  const [tab, setTab] = useState("pembiayaan");

  const [pForm, setPForm] = useState({
    jenis: "Murabahah",
    jumlah: "",
    tenor: "12",
    margin: "0.9",
  });
  const [pHasil, setPHasil] = useState(null);
  const [pTabel, setPTabel] = useState([]);
  const [pShowTabel, setPShowTabel] = useState(false);

  function handlePFormChange(key, val) {
    const updated = { ...pForm, [key]: val };
    if (key === "jenis" || key === "tenor") {
      updated.margin = String(getMarginDefault(updated.jenis, Number(updated.tenor)));
    }
    setPForm(updated);
  }

  function hitungPembiayaan(e) {
    e.preventDefault();
    const pokok = Number(pForm.jumlah.replace(/[^\d]/g, ""));
    const tenor = Number(pForm.tenor);
    const margin = Number(pForm.margin);

    if (!pokok || !tenor || !margin) return;

    const marginPerBulan = pokok * (margin / 100);
    const totalMargin = marginPerBulan * tenor;
    const angsuranPokok = pokok / tenor;
    const totalAngsuranBulan = angsuranPokok + marginPerBulan;

    setPHasil({
      pokok,
      totalMargin,
      tenor,
      marginPersen: margin,
      angsuranPokok,
      angsuranMargin: marginPerBulan,
      totalAngsuran: totalAngsuranBulan,
    });

    const rows = [];
    for (let i = 1; i <= tenor; i++) {
      rows.push({
        ke: i,
        angsuranPokok,
        angsuranMargin: marginPerBulan,
        total: totalAngsuranBulan,
        sisaPokok: pokok - angsuranPokok * i,
      });
    }
    setPTabel(rows);
    setPShowTabel(false);
  }

  function resetPembiayaan() {
    setPForm({ jenis: "Murabahah", jumlah: "", tenor: "12", margin: "0.9" });
    setPHasil(null);
    setPTabel([]);
  }

  const inputCls = "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#1E5E3F] focus:bg-white";

  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-6">

        <div className="mb-8">
          <h2 className="text-4xl font-bold text-slate-800">Simulasi Keuangan</h2>
          <p className="mt-1 text-slate-500">Hitung estimasi pembiayaan sesuai kebutuhan Anda.</p>
        </div>

        <div className="mb-6 flex gap-2">
          {[
            { key: "pembiayaan", label: "Simulasi Pembiayaan" },
            { key: "deposito", label: "Simulasi Deposito" },
          ].map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
                tab === t.key ? "bg-[#1E5E3F] text-white shadow-sm" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === "pembiayaan" && (
          <div className="grid gap-6 lg:grid-cols-2">

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Simulasi Pembiayaan</h3>
                  <p className="text-sm text-slate-500">Hitung estimasi angsuran pembiayaan Anda</p>
                </div>
              </div>

              <form onSubmit={hitungPembiayaan} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">Jenis Pembiayaan</label>
                  <select value={pForm.jenis} onChange={(e) => handlePFormChange("jenis", e.target.value)} className={inputCls}>
                    <option value="Murabahah">Murabahah</option>
                    <option value="Ijarah">Ijarah</option>
                    <option value="Istishna">Istishna</option>
                    <option value="KPR">KPR</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">Jumlah Pembiayaan (Rp)</label>
                  <input
                    type="text"
                    value={pForm.jumlah}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^\d]/g, "");
                      handlePFormChange("jumlah", raw ? "Rp " + new Intl.NumberFormat("id-ID").format(raw) : "");
                    }}
                    placeholder="Rp 0"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">Jangka Waktu (Bulan)</label>
                  <input type="number" value={pForm.tenor} onChange={(e) => handlePFormChange("tenor", e.target.value)}
                    placeholder="Contoh: 12" min="1" max="180" className={inputCls} />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Margin per Bulan (%)
                    <span className="ml-2 text-xs font-normal text-slate-400">— otomatis, bisa diubah</span>
                  </label>
                  <input type="number" value={pForm.margin} onChange={(e) => handlePFormChange("margin", e.target.value)}
                    placeholder="Contoh: 0.9" step="0.1" className={inputCls} />
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="submit"
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1E5E3F] px-4 py-3 font-semibold text-white transition hover:bg-[#174b32]">
                    <Calculator size={18} /> Hitung
                  </button>
                  <button type="button" onClick={resetPembiayaan}
                    className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
                    Ulangi
                  </button>
                </div>
              </form>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-5 font-bold text-slate-800">Rincian Pembiayaan</h3>
              {!pHasil ? (
                <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                  <Calculator size={40} className="mb-3 opacity-30" />
                  <p className="text-sm">Isi form dan klik Hitung untuk melihat hasil</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {[
                    ["Jumlah Pokok Pembiayaan", formatRp(pHasil.pokok)],
                    ["Jumlah Margin Pembiayaan", formatRp(pHasil.totalMargin)],
                    ["Jangka Waktu", `${pHasil.tenor} bulan`],
                    ["Margin Per Bulan", `${pHasil.marginPersen}%`],
                    ["Angsuran Pokok/Bulan", formatRp(pHasil.angsuranPokok)],
                    ["Angsuran Margin/Bulan", formatRp(pHasil.angsuranMargin)],
                  ].map(([l, v]) => (
                    <div key={l} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                      <span className="text-sm text-slate-600">{l}</span>
                      <span className="font-semibold text-slate-800">{v}</span>
                    </div>
                  ))}

                  <div className="flex items-center justify-between rounded-xl bg-[#1E5E3F] px-4 py-4">
                    <span className="font-semibold text-white">Total Angsuran/Bulan</span>
                    <span className="text-xl font-bold text-white">{formatRp(pHasil.totalAngsuran)}</span>
                  </div>

                  <button onClick={() => setPShowTabel(!pShowTabel)}
                    className="flex w-full items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
                    <span>Lihat Tabel Angsuran per Bulan</span>
                    {pShowTabel ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {pShowTabel && (
                    <div className="overflow-x-auto rounded-xl border border-slate-200">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-slate-50 text-xs font-semibold uppercase text-slate-500">
                            <th className="px-3 py-2 text-center">Ke</th>
                            <th className="px-3 py-2 text-right">Pokok</th>
                            <th className="px-3 py-2 text-right">Margin</th>
                            <th className="px-3 py-2 text-right">Total</th>
                            <th className="px-3 py-2 text-right">Sisa Pokok</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {pTabel.map((row) => (
                            <tr key={row.ke} className="hover:bg-slate-50">
                              <td className="px-3 py-2 text-center font-medium">{row.ke}</td>
                              <td className="px-3 py-2 text-right">{formatRp(row.angsuranPokok)}</td>
                              <td className="px-3 py-2 text-right">{formatRp(row.angsuranMargin)}</td>
                              <td className="px-3 py-2 text-right font-semibold text-[#1E5E3F]">{formatRp(row.total)}</td>
                              <td className="px-3 py-2 text-right text-slate-500">{formatRp(Math.max(0, row.sisaPokok))}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {tab === "deposito" && <SimulasiDeposito />}
      </div>
    </section>
  );
}