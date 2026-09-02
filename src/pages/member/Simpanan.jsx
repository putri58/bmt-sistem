import { Wallet } from "lucide-react";
import { simpananData } from "../../data/memberData";

function formatRp(v) { return new Intl.NumberFormat("id-ID").format(v); }
function formatDate(d) {
  return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

const jenisBadge = {
  "Simpanan Wajib":   "bg-blue-50 text-blue-600",
  "Simpanan Sukarela":"bg-orange-50 text-orange-600",
  "Simpanan Pokok":   "bg-[#1E5E3F]/10 text-[#1E5E3F]",
};

export default function Simpanan() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Simpanan Saya</h1>
        <p className="mt-1 text-sm text-slate-500">Ringkasan dan riwayat simpanan keanggotaan Anda.</p>
      </div>

      {/* SUMMARY */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Simpanan Pokok",    value: simpananData.pokok,    color: "bg-[#1E5E3F]" },
          { label: "Simpanan Wajib",    value: simpananData.wajib,    color: "bg-blue-600" },
          { label: "Simpanan Sukarela", value: simpananData.sukarela, color: "bg-orange-500" },
          { label: "Total Simpanan",    value: simpananData.total,    color: "bg-slate-800", bold: true },
        ].map((s) => (
          <div key={s.label} className={`rounded-2xl p-5 text-white ${s.color} shadow-sm`}>
            <div className="flex items-center gap-2 mb-2">
              <Wallet size={16} className="opacity-70" />
              <p className="text-xs opacity-80">{s.label}</p>
            </div>
            <p className={`text-xl ${s.bold ? "font-black" : "font-bold"}`}>
              Rp {formatRp(s.value)}
            </p>
          </div>
        ))}
      </div>

      {/* RIWAYAT */}
      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="font-semibold text-slate-800">Riwayat Simpanan</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-5 py-3 text-left">Tanggal</th>
                <th className="px-5 py-3 text-left">Jenis</th>
                <th className="px-5 py-3 text-right">Nominal</th>
                <th className="px-5 py-3 text-left">Keterangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {simpananData.riwayat.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 text-slate-600">{formatDate(r.tanggal)}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${jenisBadge[r.jenis] || "bg-slate-100 text-slate-500"}`}>
                      {r.jenis}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right font-semibold text-emerald-600">
                    + Rp {formatRp(r.nominal)}
                  </td>
                  <td className="px-5 py-4 text-slate-500">{r.keterangan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
