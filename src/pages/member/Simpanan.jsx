import { useState, useEffect } from "react";
import { Wallet, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import api from "../../lib/api";

function formatRp(v) { return new Intl.NumberFormat("id-ID").format(v ?? 0); }
function formatDate(d) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

const jenisBadge = {
  Wadiah:     "bg-blue-50 text-blue-600",
  Mudharabah: "bg-purple-50 text-purple-600",
  Wajib:      "bg-orange-50 text-orange-600",
  Pokok:      "bg-emerald-50 text-emerald-600",
};

export default function MemberSimpanan() {
  const [data, setData]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSimpanan() {
      try {
        const res = await api.get('/member/simpanan');
        setData(res.data);
      } catch (err) {
        console.error('Gagal ambil data simpanan', err);
      } finally {
        setLoading(false);
      }
    }
    fetchSimpanan();
  }, []);

  if (loading) return <div className="flex items-center justify-center py-32 text-slate-400">Memuat data...</div>;

  const total   = data?.total_simpanan ?? 0;
  const riwayat = data?.riwayat ?? [];

  return (
    <div>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Simpanan Saya</h1>
        <p className="mt-1 text-sm text-slate-500">Riwayat setoran dan penarikan simpanan Anda.</p>
      </div>

      {/* SALDO CARD */}
      <div className="mb-6 rounded-2xl bg-gradient-to-br from-[#1E5E3F] to-[#2E8B57] p-6 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <Wallet size={20} />
          <p className="text-sm font-medium opacity-80">Total Saldo Simpanan</p>
        </div>
        <p className="text-3xl font-bold">Rp {formatRp(total)}</p>
        <p className="mt-1 text-xs opacity-60">Semua jenis simpanan</p>
      </div>

      {/* TABEL RIWAYAT */}
      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="font-semibold text-slate-800">Riwayat Simpanan</h2>
        </div>

        {riwayat.length === 0 ? (
          <div className="py-16 text-center text-slate-400">Belum ada riwayat simpanan.</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {riwayat.map((item) => (
              <div key={item.id} className="flex items-center gap-4 px-6 py-4">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                  item.tipe === "Setor" ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"
                }`}>
                  {item.tipe === "Setor" ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-slate-700">{item.tipe} Simpanan</p>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${jenisBadge[item.jenis_simpanan] || "bg-slate-100 text-slate-500"}`}>
                      {item.jenis_simpanan}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{item.kode_simpanan} · {formatDate(item.tanggal)}</p>
                  {item.keterangan && <p className="text-xs text-slate-400">{item.keterangan}</p>}
                </div>
                <span className={`text-sm font-bold ${item.tipe === "Setor" ? "text-emerald-600" : "text-red-600"}`}>
                  {item.tipe === "Setor" ? "+" : "-"} Rp {formatRp(item.jumlah)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
