import { useState, useEffect } from "react";
import { CreditCard, Clock, CheckCircle, XCircle, Award } from "lucide-react";
import api from "../../lib/api";

function formatRp(v) { return new Intl.NumberFormat("id-ID").format(v ?? 0); }
function formatDate(d) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

const statusStyle = {
  Pengajuan: { cls: "bg-orange-50 text-orange-600 border-orange-200", icon: Clock },
  Disetujui: { cls: "bg-emerald-50 text-emerald-600 border-emerald-200", icon: CheckCircle },
  Ditolak:   { cls: "bg-red-50 text-red-600 border-red-200", icon: XCircle },
  Lunas:     { cls: "bg-blue-50 text-blue-600 border-blue-200", icon: Award },
};

export default function MemberPinjaman() {
  const [pinjaman, setPinjaman] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    async function fetchPinjaman() {
      try {
        const res = await api.get('/member/pinjaman');
        setPinjaman(res.data);
      } catch (err) {
        console.error('Gagal ambil data pinjaman', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPinjaman();
  }, []);

  if (loading) return <div className="flex items-center justify-center py-32 text-slate-400">Memuat data...</div>;

  const aktif = pinjaman.filter((p) => p.status === "Disetujui").length;
  const lunas = pinjaman.filter((p) => p.status === "Lunas").length;

  return (
    <div>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Pinjaman Saya</h1>
        <p className="mt-1 text-sm text-slate-500">Riwayat pengajuan dan status pinjaman Anda.</p>
      </div>

      {/* STAT */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        {[
          { label: "Total Pinjaman", value: pinjaman.length, color: "text-slate-800" },
          { label: "Aktif",          value: aktif,           color: "text-emerald-600" },
          { label: "Lunas",          value: lunas,           color: "text-blue-600" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-5 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* LIST PINJAMAN */}
      {pinjaman.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center text-slate-400">
          Belum ada riwayat pinjaman.
        </div>
      ) : (
        <div className="space-y-4">
          {pinjaman.map((p) => {
            const style = statusStyle[p.status] || statusStyle.Pengajuan;
            const Icon  = style.icon;
            return (
              <div key={p.id}
                className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-[#1E5E3F]/30 hover:shadow-sm"
                onClick={() => setSelected(selected?.id === p.id ? null : p)}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
                      <CreditCard size={18} className="text-orange-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{p.kode_pinjaman}</p>
                      <p className="text-xs text-slate-400">Diajukan: {formatDate(p.tgl_pengajuan)}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${style.cls}`}>
                    <Icon size={11} />
                    {p.status}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                  {[
                    ["Jumlah Pinjaman",   `Rp ${formatRp(p.jumlah_pinjaman)}`],
                    ["Angsuran/Bulan",    `Rp ${formatRp(p.angsuran_per_bulan)}`],
                    ["Tenor",            `${p.tenor_bulan} bulan`],
                    ["Margin",           `${p.margin}%`],
                  ].map(([l, v]) => (
                    <div key={l} className="rounded-xl bg-slate-50 px-3 py-2">
                      <p className="text-[10px] text-slate-400">{l}</p>
                      <p className="mt-0.5 text-sm font-semibold text-slate-700">{v}</p>
                    </div>
                  ))}
                </div>

                {/* DETAIL EXPAND */}
                {selected?.id === p.id && (
                  <div className="mt-4 border-t border-slate-100 pt-4">
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        ["Tgl Disetujui",    formatDate(p.tgl_disetujui)],
                        ["Total Bayar",      `Rp ${formatRp(p.angsuran_per_bulan * p.tenor_bulan)}`],
                      ].map(([l, v]) => (
                        <div key={l} className="rounded-xl bg-slate-50 px-3 py-2">
                          <p className="text-[10px] text-slate-400">{l}</p>
                          <p className="mt-0.5 text-sm font-semibold text-slate-700">{v}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
