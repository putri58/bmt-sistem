import { useState, useEffect } from "react";
import { Receipt, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import api from "../../lib/api";

function formatRp(v) { return new Intl.NumberFormat("id-ID").format(v ?? 0); }
function formatDate(d) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

function getStatusAngsuran(item) {
  if (item.status === "Lunas") return "lunas";
  const today    = new Date();
  const jatuhTempo = new Date(item.jatuh_tempo);
  if (jatuhTempo < today) return "terlambat";
  return "belum";
}

export default function Angsuran() {
  const [angsuran, setAngsuran] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    async function fetchAngsuran() {
      try {
        const res = await api.get('/member/angsuran');
        setAngsuran(res.data);
      } catch (err) {
        console.error('Gagal ambil data angsuran', err);
      } finally {
        setLoading(false);
      }
    }
    fetchAngsuran();
  }, []);

  if (loading) return <div className="flex items-center justify-center py-32 text-slate-400">Memuat data...</div>;

  const lunas     = angsuran.filter((a) => a.status === "Lunas").length;
  const belumBayar = angsuran.filter((a) => a.status === "Belum Bayar").length;
  const terlambat = angsuran.filter((a) => getStatusAngsuran(a) === "terlambat").length;

  return (
    <div>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Angsuran Saya</h1>
        <p className="mt-1 text-sm text-slate-500">Jadwal dan riwayat pembayaran angsuran pinjaman Anda.</p>
      </div>

      {/* STAT */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5 text-center">
          <p className="text-2xl font-bold text-emerald-600">{lunas}</p>
          <p className="text-xs text-emerald-600 mt-1">Lunas</p>
        </div>
        <div className="rounded-2xl border border-orange-100 bg-orange-50 p-5 text-center">
          <p className="text-2xl font-bold text-orange-600">{belumBayar}</p>
          <p className="text-xs text-orange-600 mt-1">Belum Bayar</p>
        </div>
        <div className="rounded-2xl border border-red-100 bg-red-50 p-5 text-center">
          <p className="text-2xl font-bold text-red-600">{terlambat}</p>
          <p className="text-xs text-red-600 mt-1">Terlambat</p>
        </div>
      </div>

      {/* LIST ANGSURAN */}
      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="font-semibold text-slate-800">Jadwal Angsuran</h2>
        </div>

        {angsuran.length === 0 ? (
          <div className="py-16 text-center text-slate-400">Belum ada data angsuran.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <th className="px-5 py-3">Ke</th>
                  <th className="px-5 py-3">Kode Pinjaman</th>
                  <th className="px-5 py-3">Jumlah</th>
                  <th className="px-5 py-3">Jatuh Tempo</th>
                  <th className="px-5 py-3">Tgl Bayar</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {angsuran.map((item) => {
                  const statusKey = getStatusAngsuran(item);
                  return (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-4 font-semibold text-slate-700">
                        {item.ke}
                      </td>
                      <td className="px-5 py-4 font-mono text-xs text-slate-500">
                        {item.pinjaman?.kode_pinjaman || "-"}
                      </td>
                      <td className="px-5 py-4 font-semibold text-slate-700">
                        Rp {formatRp(item.jumlah)}
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        {formatDate(item.jatuh_tempo)}
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        {item.tgl_bayar ? formatDate(item.tgl_bayar) : "-"}
                      </td>
                      <td className="px-5 py-4">
                        {statusKey === "lunas" && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-600">
                            <CheckCircle size={11} /> Lunas
                          </span>
                        )}
                        {statusKey === "belum" && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-semibold text-orange-600">
                            <Clock size={11} /> Belum Bayar
                          </span>
                        )}
                        {statusKey === "terlambat" && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-600">
                            <AlertTriangle size={11} /> Terlambat
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
