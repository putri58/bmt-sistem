import { useState } from "react";
import { Link } from "react-router-dom";
import { Wallet, CreditCard, CheckCircle2, ChevronDown, ChevronUp, ArrowRight, Calculator, FileText, Shield, Users, BadgeCheck } from "lucide-react";

/* ─────────────────────────────────────────────────────────
   DATA PEMBIAYAAN
───────────────────────────────────────────────────────── */
const jenisPembiayaan = [
  { nama: "Murabahah",  cocokUntuk: "Pembelian barang konsumtif & produktif", warna: "emerald" },
  { nama: "Mudharabah", cocokUntuk: "Pengembangan usaha produktif",            warna: "blue"    },
  { nama: "Musyarakah", cocokUntuk: "Kemitraan usaha bersama",                 warna: "indigo"  },
  { nama: "Ijarah",     cocokUntuk: "Pendidikan, kesehatan & sewa aset",       warna: "purple"  },
  { nama: "Istishna",   cocokUntuk: "Konstruksi & pembuatan barang custom",    warna: "orange"  },
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
  { nama: "Tabungan Mudharabah",          warna: "emerald" },
  { nama: "Tabungan Pendidikan",           warna: "blue"    },
  { nama: "Tabungan Wadiah",               warna: "indigo"  },
  { nama: "Simpanan Berjangka (SIMJAKA)",  warna: "orange"  },
];

const simpananColorMap = {
  emerald: {
    card:   "border-emerald-200 bg-gradient-to-br from-emerald-50 to-white",
    icon:   "bg-emerald-100 text-emerald-600",
    label:  "text-emerald-600",
    dot:    "bg-emerald-400",
    shine:  "from-emerald-400/10",
  },
  blue: {
    card:   "border-blue-200 bg-gradient-to-br from-blue-50 to-white",
    icon:   "bg-blue-100 text-blue-600",
    label:  "text-blue-600",
    dot:    "bg-blue-400",
    shine:  "from-blue-400/10",
  },
  indigo: {
    card:   "border-indigo-200 bg-gradient-to-br from-indigo-50 to-white",
    icon:   "bg-indigo-100 text-indigo-600",
    label:  "text-indigo-600",
    dot:    "bg-indigo-400",
    shine:  "from-indigo-400/10",
  },
  orange: {
    card:   "border-orange-200 bg-gradient-to-br from-orange-50 to-white",
    icon:   "bg-orange-100 text-orange-600",
    label:  "text-orange-600",
    dot:    "bg-orange-400",
    shine:  "from-orange-400/10",
  },
};

// colorMap & iconColorMap tetap ada untuk komponen lain yang mungkin masih pakai
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

function SimpananCard({ product, index }) {
  const c = simpananColorMap[product.warna];
  return (
    <div className={`relative overflow-hidden rounded-2xl border p-6 transition-all hover:shadow-lg hover:-translate-y-0.5 ${c.card}`}>
      {/* Dekoratif lingkaran pojok */}
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
        {/* Icon kanan */}
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${c.icon} opacity-50`}>
          <Wallet size={18} />
        </div>
      </div>
    </div>
  );
}

// ProductCard masih dipakai untuk tab pinjaman (jaga-jaga)
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
          </div>
        </div>
      </div>
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
            { key: "simpanan",   label: "Simpanan", icon: Wallet },
            { key: "pembiayaan", label: "Pembiayaan",      icon: CreditCard },
            { key: "simulasi",   label: "Simulasi",        icon: Calculator },
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
                <h2 className="text-2xl font-bold text-slate-800">Simpanan</h2>
                <p className="mt-1 text-slate-500">Kelola keuangan Anda dengan produk simpanan syariah kami yang aman dan menguntungkan.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {simpanan.map((s, i) => <SimpananCard key={s.nama} product={s} index={i} />)}
              </div>
            </div>
          )}

          {activeTab === "pembiayaan" && <PembiayaanSection />}

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
  <SimulasiSection />
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

/* ─────────────────────────────────────────────────────────
   SIMULASI DEPOSITO
───────────────────────────────────────────────────────── */

// Mapping nisbah bagi hasil berdasarkan jangka waktu (sesuai file asli)
const NISBAH_DEPOSITO = { 3: 0.32, 6: 0.33, 9: 0.34, 12: 0.35 };

function SimulasiDeposito() {
  const today = new Date();
  const defaultMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;

  const [jumlah,      setJumlah]      = useState("");
  const [jangka,      setJangka]      = useState(3);
  const [nisbah,      setNisbah]      = useState(NISBAH_DEPOSITO[3]);
  const [awal,        setAwal]        = useState(defaultMonth);
  const [hasil,       setHasil]       = useState(null);

  function hitungDeposito(e) {
    e.preventDefault();

    // Bersihkan format rupiah → angka murni (sama seperti di JS asli)
    const nominal = Math.round(parseFloat(jumlah.replace(/[^\d]/g, "")));
    if (!nominal || isNaN(nominal)) return;

    const sukuBunga   = parseFloat(nisbah) / 100;
    const [thn, bln]  = awal.split("-").map(Number);
    const awalDate    = new Date(thn, bln - 1, 1);

    let totalKotor  = 0;
    let totalPPH    = 0;
    let totalBersih = 0;

    const rows = [];
    for (let i = 1; i <= jangka; i++) {
      // Periode bulan ke-i (sama persis dengan JS asli)
      const currentMonth = new Date(awalDate.getFullYear(), awalDate.getMonth() + i, 1);
      const mm   = String(currentMonth.getMonth() + 1).padStart(2, "0");
      const yyyy = currentMonth.getFullYear();

      const bungaKotor  = Math.round(nominal * sukuBunga);   // sesuai formula asli
      const pph         = Math.round(bungaKotor * 0.10);      // PPH 10%
      const bungaBersih = Math.round(bungaKotor - pph);

      totalKotor  += bungaKotor;
      totalPPH    += pph;
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

      {/* FORM */}
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
          {/* Jumlah Deposito */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Jumlah Deposito</label>
            <input
              type="text"
              value={jumlah}
              onChange={(e) => {
                // Format rupiah saat input (sesuai formatJumlah() di JS asli)
                const raw = e.target.value.replace(/[^\d]/g, "");
                setJumlah(raw ? "Rp " + new Intl.NumberFormat("id-ID").format(raw) : "");
              }}
              placeholder="Rp 0"
              required
              className={inputCls}
            />
          </div>

          {/* Jangka Waktu */}
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

          {/* Bagi Hasil — editable, auto-update saat jangka waktu berubah */}
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
            <p className="mt-1 text-xs text-slate-400">
              Default: 3bln (0.32%) | 6bln (0.33%) | 9bln (0.34%) | 12bln (0.35%)
            </p>
          </div>

          {/* Waktu Deposito */}
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
            <button type="submit"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1E5E3F] px-4 py-3 font-semibold text-white transition hover:bg-[#174b32]">
              <Calculator size={18} /> Hitung
            </button>
            <button type="button" onClick={resetDeposito}
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
              Ulangi
            </button>
          </div>
        </form>
      </div>

      {/* HASIL */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-5 font-bold text-slate-800">Perkiraan Bagi Hasil / Bulan</h3>

        {!hasil ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400">
            <Calculator size={40} className="mb-3 opacity-30" />
            <p className="text-sm">Isi form dan klik Hitung untuk melihat hasil</p>
          </div>
        ) : (
          <div className="space-y-4">

            {/* TABEL BULANAN */}
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

            {/* DISCLAIMER — sesuai note di file asli */}
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

// Margin otomatis berdasarkan jenis dan tenor
function getMarginDefault(jenis, tenor) {
  if (jenis === "KPR") {
    if (tenor <= 60)  return 0.7;
    if (tenor <= 120) return 0.8;
    return 0.85;
  }
  // Murabahah, Ijarah, Istishna
  if (tenor <= 12) return 0.9;
  if (tenor <= 24) return 1.0;
  if (tenor <= 36) return 1.1;
  return 1.2;
}

function SimulasiSection() {
  const [tab, setTab] = useState("pembiayaan");

  // ── STATE PEMBIAYAAN ──
  const [pForm, setPForm] = useState({
    jenis:  "Murabahah",
    jumlah: "",
    tenor:  "12",
    margin: "0.9",
  });
  const [pHasil,  setPHasil]  = useState(null);
  const [pTabel,  setPTabel]  = useState([]);
  const [pShowTabel, setPShowTabel] = useState(false);

  function handlePFormChange(key, val) {
    const updated = { ...pForm, [key]: val };
    // Auto-update margin saat jenis atau tenor berubah
    if (key === "jenis" || key === "tenor") {
      updated.margin = String(getMarginDefault(updated.jenis, Number(updated.tenor)));
    }
    setPForm(updated);
  }

  function hitungPembiayaan(e) {
    e.preventDefault();
    const pokok  = Number(pForm.jumlah.replace(/[^\d]/g, ""));
    const tenor  = Number(pForm.tenor);
    const margin = Number(pForm.margin);

    if (!pokok || !tenor || !margin) return;

    const marginPerBulan     = pokok * (margin / 100);
    const totalMargin        = marginPerBulan * tenor;
    const angsuranPokok      = pokok / tenor;
    const totalAngsuranBulan = angsuranPokok + marginPerBulan;
 
    setPHasil({
      pokok,
      totalMargin,
      tenor,
      marginPersen:    margin,
      angsuranPokok,
      angsuranMargin:  marginPerBulan,
      totalAngsuran:   totalAngsuranBulan,
    });

    // Generate tabel angsuran
    const rows = [];
    for (let i = 1; i <= tenor; i++) {
      rows.push({
        ke:             i,
        angsuranPokok,
        angsuranMargin: marginPerBulan,
        total:          totalAngsuranBulan,
        sisaPokok:      pokok - angsuranPokok * i,
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

        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-slate-800">Simulasi Keuangan</h2>
          <p className="mt-1 text-slate-500">Hitung estimasi pembiayaan sesuai kebutuhan Anda.</p>
        </div>

        {/* TAB SWITCH */}
        <div className="mb-6 flex gap-2">
          {[
            { key: "pembiayaan", label: "Simulasi Pembiayaan" },
            { key: "deposito",   label: "Simulasi Deposito" },
          ].map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
                tab === t.key ? "bg-[#1E5E3F] text-white shadow-sm" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── SIMULASI PEMBIAYAAN ── */}
        {tab === "pembiayaan" && (
          <div className="grid gap-6 lg:grid-cols-2">

            {/* FORM */}
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
                  <p className="mt-1 text-xs text-slate-400">
                    {pForm.jenis === "KPR"
                      ? "KPR: 1–5thn (0.7%) | 6–10thn (0.8%) | 11–15thn (0.85%)"
                      : "Murabahah/Ijarah/Istishna: 1–12bln (0.9%) | 13–24bln (1%) | 25–36bln (1.1%) | 37–60bln (1.2%)"}
                  </p>
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

            {/* HASIL */}
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
                    ["Jumlah Pokok Pembiayaan",  formatRp(pHasil.pokok)],
                    ["Jumlah Margin Pembiayaan", formatRp(pHasil.totalMargin)],
                    ["Jangka Waktu",             `${pHasil.tenor} bulan`],
                    ["Margin Per Bulan",         `${pHasil.marginPersen}%`],
                    ["Angsuran Pokok/Bulan",     formatRp(pHasil.angsuranPokok)],
                    ["Angsuran Margin/Bulan",    formatRp(pHasil.angsuranMargin)],
                  ].map(([l, v]) => (
                    <div key={l} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                      <span className="text-sm text-slate-600">{l}</span>
                      <span className="font-semibold text-slate-800">{v}</span>
                    </div>
                  ))}

                  {/* TOTAL */}
                  <div className="flex items-center justify-between rounded-xl bg-[#1E5E3F] px-4 py-4">
                    <span className="font-semibold text-white">Total Angsuran/Bulan</span>
                    <span className="text-xl font-bold text-white">{formatRp(pHasil.totalAngsuran)}</span>
                  </div>

                  {/* TABEL ANGSURAN */}
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

                  {/* <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
                    <p className="text-xs text-amber-700">
                      <span className="font-semibold">Catatan:</span> Hasil simulasi merupakan estimasi dan dapat berbeda dengan perhitungan sebenarnya sesuai ketentuan koperasi yang berlaku.
                    </p>
                  </div> */}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── SIMULASI DEPOSITO ── */}
        {tab === "deposito" && (
          <SimulasiDeposito />
        )}

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   PEMBIAYAAN SECTION
───────────────────────────────────────────────────────── */

const pembiayaanColorMap = {
  emerald: { card: "border-emerald-200 bg-emerald-50/40", icon: "bg-emerald-100 text-emerald-600", badge: "bg-emerald-100 text-emerald-700", accent: "text-emerald-600" },
  blue:    { card: "border-blue-200 bg-blue-50/40",       icon: "bg-blue-100 text-blue-600",       badge: "bg-blue-100 text-blue-700",       accent: "text-blue-600" },
  indigo:  { card: "border-indigo-200 bg-indigo-50/40",   icon: "bg-indigo-100 text-indigo-600",   badge: "bg-indigo-100 text-indigo-700",   accent: "text-indigo-600" },
  purple:  { card: "border-purple-200 bg-purple-50/40",   icon: "bg-purple-100 text-purple-600",   badge: "bg-purple-100 text-purple-700",   accent: "text-purple-600" },
  orange:  { card: "border-orange-200 bg-orange-50/40",   icon: "bg-orange-100 text-orange-600",   badge: "bg-orange-100 text-orange-700",   accent: "text-orange-600" },
};

function PembiayaanSection() {
  return (
    <div className="space-y-12">

      {/* ── JENIS PEMBIAYAAN ── */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Jenis Pembiayaan</h2>
          <p className="mt-1 text-slate-500">Pilih skema pembiayaan syariah yang paling sesuai dengan kebutuhan Anda.</p>
        </div>

        {/* Baris 1: 3 card */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          {jenisPembiayaan.slice(0, 3).map((item, idx) => {
            const c = pembiayaanColorMap[item.warna];
            return (
              <div key={item.nama} className={`rounded-2xl border p-5 transition-shadow hover:shadow-md ${c.card}`}>
                <div className="flex items-start gap-3">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold text-sm ${c.icon}`}>
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{item.nama}</h3>
                    <span className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${c.badge}`}>
                      {item.cocokUntuk}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Baris 2: 2 card di tengah */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 sm:w-2/3 sm:mx-auto mt-4">
          {jenisPembiayaan.slice(3).map((item, idx) => {
            const c = pembiayaanColorMap[item.warna];
            return (
              <div key={item.nama} className={`rounded-2xl border p-5 transition-shadow hover:shadow-md ${c.card}`}>
                <div className="flex items-start gap-3">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold text-sm ${c.icon}`}>
                    {idx + 4}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{item.nama}</h3>
                    <span className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${c.badge}`}>
                      {item.cocokUntuk}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── PERSYARATAN ── */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Persyaratan Pembiayaan</h2>
          <p className="mt-1 text-slate-500">Siapkan dokumen berikut sebelum mengajukan pembiayaan.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">

          {/* Pendaftaran Anggota */}
          <div className="rounded-2xl border border-[#1E5E3F]/20 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                <Users className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Pendaftaran Anggota</h3>
                <p className="text-xs text-slate-400">Total Rp 80.000</p>
              </div>
            </div>
            <ul className="space-y-2">
              {persyaratanPendaftaran.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-xl bg-emerald-50 px-4 py-2.5 text-center">
              <p className="text-xs text-slate-500">Jumlah Keseluruhan</p>
              <p className="text-lg font-bold text-emerald-700">Rp 80.000</p>
            </div>
          </div>

          {/* Syarat Pembiayaan */}
          <div className="rounded-2xl border border-blue-200/60 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Syarat Pembiayaan</h3>
                <p className="text-xs text-slate-400">Dokumen yang diperlukan</p>
              </div>
            </div>
            <ul className="space-y-2">
              {syaratPembiayaan.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-blue-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Jaminan */}
          <div className="rounded-2xl border border-orange-200/60 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100">
                <Shield className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Jaminan</h3>
                <p className="text-xs text-slate-400">Agunan yang diterima</p>
              </div>
            </div>
            <ul className="space-y-2">
              {jaminan.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <BadgeCheck size={14} className="mt-0.5 shrink-0 text-orange-500" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-xl bg-orange-50 p-3">
              <p className="text-xs text-orange-700 text-center">
                Jaminan disesuaikan dengan plafon dan jenis pembiayaan yang diajukan.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* CTA KECIL */}
      <div className="rounded-2xl border border-[#1E5E3F]/20 bg-gradient-to-r from-[#1E5E3F]/5 to-emerald-50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-bold text-slate-800">Siap mengajukan pembiayaan?</p>
          <p className="text-sm text-slate-500 mt-0.5">Daftarkan diri Anda terlebih dahulu sebagai anggota koperasi.</p>
        </div>
        <Link
          to="/daftar"
          className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-[#1E5E3F] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#174b32]"
        >
          Daftar Sekarang <ArrowRight size={15} />
        </Link>
      </div>

    </div>
  );
}
