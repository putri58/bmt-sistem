import { pinjamanData } from "../../data/memberData";

function formatRp(v) { return new Intl.NumberFormat("id-ID").format(v); }
function formatDate(d) {
  return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

export default function Pinjaman() {
  const p = pinjamanData.aktif;
  const totalBayar  = p.angsuranBln * p.tenor;
  const totalBunga  = totalBayar - p.pokok;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Pinjaman Saya</h1>
        <p className="mt-1 text-sm text-slate-500">Detail informasi pinjaman aktif Anda.</p>
      </div>

      {/* PINJAMAN AKTIF */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2 className="font-bold text-slate-800">{p.jenis}</h2>
            <p className="text-sm text-slate-500">No. {p.id}</p>
          </div>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">{p.status}</span>
        </div>

        {/* DETAIL GRID */}
        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Jumlah Pinjaman",  value: `Rp ${formatRp(p.pokok)}` },
            { label: "Tenor",            value: `${p.tenor} bulan` },
            { label: "Bunga/Margin",     value: `${p.bunga}% per bulan` },
            { label: "Angsuran/Bulan",   value: `Rp ${formatRp(p.angsuranBln)}` },
            { label: "Total Pinjaman",   value: `Rp ${formatRp(totalBayar)}` },
            { label: "Total Bunga",      value: `Rp ${formatRp(totalBunga)}` },
            { label: "Sudah Dibayar",    value: `${p.sudahBayar} bulan` },
            { label: "Sisa Pinjaman",    value: `Rp ${formatRp(p.sisaPinjaman)}` },
            { label: "Tgl Mulai",        value: formatDate(p.tglMulai) },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-500">{label}</p>
              <p className="mt-1 text-sm font-bold text-slate-800">{value}</p>
            </div>
          ))}
        </div>

        {/* PROGRESS */}
        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-semibold text-slate-700">Progress Pembayaran</span>
            <span className="font-bold text-[#1E5E3F]">{p.progress}%</span>
          </div>
          <div className="h-4 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#1E5E3F] to-[#2E8B57] transition-all duration-700"
              style={{ width: `${p.progress}%` }}
            />
          </div>
          <div className="mt-1.5 flex justify-between text-xs text-slate-400">
            <span>{p.sudahBayar} bulan terbayar</span>
            <span>{p.tenor - p.sudahBayar} bulan tersisa</span>
          </div>
        </div>
      </div>

      {/* JIKA TIDAK ADA PINJAMAN */}
      <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
        <p className="text-sm text-slate-400">Tidak ada pinjaman lain yang aktif.</p>
      </div>
    </div>
  );
}
