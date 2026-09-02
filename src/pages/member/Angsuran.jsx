import { angsuranData, pinjamanData } from "../../data/memberData";

function formatRp(v) { return new Intl.NumberFormat("id-ID").format(v); }
function formatDate(d) {
  return new Date(d).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
}

const statusStyles = {
  Lunas:       "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Belum Bayar":"bg-orange-50 text-orange-700 border-orange-200",
  Terlambat:   "bg-red-50 text-red-700 border-red-200",
};

export default function Angsuran() {
  const p = pinjamanData.aktif;
  const lunas     = angsuranData.filter((a) => a.status === "Lunas").length;
  const belumBayar = angsuranData.filter((a) => a.status === "Belum Bayar").length;
  const terlambat = angsuranData.filter((a) => a.status === "Terlambat").length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Angsuran</h1>
        <p className="mt-1 text-sm text-slate-500">Riwayat dan jadwal pembayaran angsuran pinjaman Anda.</p>
      </div>

      {/* STAT */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        {[
          { label: "Sudah Lunas",  value: lunas,      color: "bg-emerald-600" },
          { label: "Belum Bayar",  value: belumBayar, color: "bg-orange-500" },
          { label: "Terlambat",    value: terlambat,  color: "bg-red-500" },
        ].map((s) => (
          <div key={s.label} className={`rounded-2xl ${s.color} p-5 text-white shadow-sm`}>
            <p className="text-3xl font-black">{s.value}</p>
            <p className="mt-1 text-xs opacity-80">{s.label}</p>
          </div>
        ))}
      </div>

      {/* TABEL */}
      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="font-semibold text-slate-800">
            Jadwal Angsuran — {p.jenis} ({p.id})
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-5 py-3 text-left">No.</th>
                <th className="px-5 py-3 text-left">Jatuh Tempo</th>
                <th className="px-5 py-3 text-right">Nominal</th>
                <th className="px-5 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {angsuranData.map((a) => (
                <tr key={a.id}
                  className={`transition-colors hover:bg-slate-50 ${a.ke === p.sudahBayar + 1 ? "bg-orange-50/50" : ""}`}>
                  <td className="px-5 py-3.5 text-slate-500">Ke-{a.ke}</td>
                  <td className="px-5 py-3.5 text-slate-700">{formatDate(a.tanggal)}</td>
                  <td className="px-5 py-3.5 text-right font-semibold text-slate-700">
                    Rp {formatRp(a.nominal)}
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${statusStyles[a.status]}`}>
                      {a.status}
                      {a.ke === p.sudahBayar + 1 ? " ← Berikutnya" : ""}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
