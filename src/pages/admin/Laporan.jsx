import { useState, useEffect } from "react";
import { Download, TrendingUp, TrendingDown, Users, CreditCard, Wallet, ArrowLeftRight } from "lucide-react";
import api from "../../lib/api";

function formatRp(v) { return new Intl.NumberFormat("id-ID").format(v ?? 0); }

const bulanList = [
  "Januari","Februari","Maret","April","Mei","Juni",
  "Juli","Agustus","September","Oktober","November","Desember"
];
const tahunList = ["2026","2025","2024"];

export default function Laporan() {
  const [bulan,     setBulan]     = useState(bulanList[new Date().getMonth()]);
  const [tahun,     setTahun]     = useState(String(new Date().getFullYear()));
  const [activeTab, setActiveTab] = useState("ringkasan");
  const [data,      setData]      = useState(null);
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [anggotaRes, simpananRes, pinjamanRes, transaksiRes, pendaftarRes] = await Promise.all([
          api.get('/anggota'),
          api.get('/simpanan'),
          api.get('/pinjaman'),
          api.get('/transaksi'),
          api.get('/pendaftar'),
        ]);

        const bulanIndex = bulanList.indexOf(bulan) + 1;
        const tahunNum   = Number(tahun);

        // Filter by bulan & tahun
        const filterByPeriod = (list, dateField) =>
          list.filter((item) => {
            const d = new Date(item[dateField]);
            return d.getMonth() + 1 === bulanIndex && d.getFullYear() === tahunNum;
          });

        const simpananPeriod  = filterByPeriod(simpananRes.data,  'tanggal');
        const pinjamanPeriod  = filterByPeriod(pinjamanRes.data,  'tgl_pengajuan');
        const transaksiPeriod = filterByPeriod(transaksiRes.data, 'tanggal');
        const pendaftarPeriod = filterByPeriod(pendaftarRes.data, 'tgl_daftar');

        setData({
          // Statistik umum
          totalAnggota:    anggotaRes.data.length,
          anggotaBaru:     filterByPeriod(anggotaRes.data, 'tgl_disetujui').length,
          // Simpanan
          totalSimpanan:   anggotaRes.data.reduce((s, a) => s + Number(a.simpanan), 0),
          simpananMasuk:   simpananPeriod.filter((s) => s.tipe === 'Setor').reduce((s, x) => s + Number(x.jumlah), 0),
          simpananKeluar:  simpananPeriod.filter((s) => s.tipe === 'Tarik').reduce((s, x) => s + Number(x.jumlah), 0),
          simpananList:    simpananPeriod,
          // Pinjaman
          totalPinjaman:   pinjamanRes.data.filter((p) => p.status === 'Disetujui').reduce((s, p) => s + Number(p.jumlah_pinjaman), 0),
          pinjamanBaru:    pinjamanPeriod.filter((p) => p.status === 'Disetujui').reduce((s, p) => s + Number(p.jumlah_pinjaman), 0),
          angsuranDiterima: transaksiPeriod.filter((t) => t.jenis === 'Angsuran').reduce((s, t) => s + Number(t.jumlah), 0),
          pinjamanList:    pinjamanPeriod,
          // Transaksi
          totalTransaksi:  transaksiRes.data.length,
          transaksiMasuk:  transaksiPeriod.filter((t) => t.tipe === 'Kredit').reduce((s, t) => s + Number(t.jumlah), 0),
          transaksiKeluar: transaksiPeriod.filter((t) => t.tipe === 'Debit').reduce((s, t) => s + Number(t.jumlah), 0),
          transaksiList:   transaksiPeriod,
          // Pendaftar
          pengajuanMasuk:     pendaftarPeriod.length,
          pengajuanDisetujui: pendaftarPeriod.filter((p) => p.status_pendaftaran === 'Disetujui').length,
          pengajuanDitolak:   pendaftarPeriod.filter((p) => p.status_pendaftaran === 'Ditolak').length,
        });
      } catch (err) {
        console.error('Gagal ambil data laporan', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [bulan, tahun]);

  return (
    <div>
      {/* HEADER */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Laporan</h1>
          <p className="mt-1 text-sm text-slate-500">Laporan operasional dan keuangan koperasi per periode.</p>
        </div>
        <div className="flex items-center gap-3">
          <select value={bulan} onChange={(e) => setBulan(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-indigo-400 shadow-sm">
            {bulanList.map((b) => <option key={b}>{b}</option>)}
          </select>
          <select value={tahun} onChange={(e) => setTahun(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-indigo-400 shadow-sm">
            {tahunList.map((t) => <option key={t}>{t}</option>)}
          </select>
          <button onClick={() => alert('Fitur export PDF dalam pengembangan')}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition-colors">
            <Download size={15} /> Export PDF
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="mb-6 flex gap-1 rounded-xl border border-slate-200 bg-white p-1 w-fit">
        {["ringkasan","simpanan","pinjaman","transaksi"].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors ${
              activeTab === tab ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-50"
            }`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl bg-slate-100" />
          ))}
        </div>
      ) : !data ? (
        <div className="py-16 text-center text-slate-400">Gagal memuat data laporan.</div>
      ) : (
        <>
          {/* RINGKASAN */}
          {activeTab === "ringkasan" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {[
                  { label: "Total Anggota",   value: data.totalAnggota.toLocaleString("id-ID"),     sub: `+${data.anggotaBaru} baru bulan ini`,          icon: Users,          color: "indigo" },
                  { label: "Total Simpanan",  value: `Rp ${formatRp(data.totalSimpanan)}`,          sub: `Masuk Rp ${formatRp(data.simpananMasuk)}`,      icon: Wallet,         color: "emerald" },
                  { label: "Total Pinjaman",  value: `Rp ${formatRp(data.totalPinjaman)}`,          sub: `Baru Rp ${formatRp(data.pinjamanBaru)}`,        icon: CreditCard,     color: "orange" },
                  { label: "Total Transaksi", value: data.totalTransaksi.toLocaleString("id-ID"),   sub: `Periode ${bulan} ${tahun}`,                     icon: ArrowLeftRight, color: "blue" },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs text-slate-500">{s.label}</p>
                        <p className="mt-1 text-xl font-bold text-slate-800">{s.value}</p>
                        <p className="mt-1 text-xs text-emerald-500">{s.sub}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* PENGAJUAN */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="mb-4 font-semibold text-slate-800">Ringkasan Pendaftaran — {bulan} {tahun}</h2>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Pendaftaran Masuk",  value: data.pengajuanMasuk,     color: "text-slate-800" },
                    { label: "Disetujui",           value: data.pengajuanDisetujui, color: "text-emerald-600" },
                    { label: "Ditolak",             value: data.pengajuanDitolak,   color: "text-red-600" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                      <p className="text-xs text-slate-500">{s.label}</p>
                      <p className={`mt-1 text-3xl font-bold ${s.color}`}>{s.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ARUS KAS */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="mb-4 font-semibold text-slate-800">Arus Kas — {bulan} {tahun}</h2>
                <div className="space-y-3">
                  {[
                    { label: "Simpanan Masuk",      value: data.simpananMasuk,      icon: TrendingUp,   color: "emerald", tipe: "masuk" },
                    { label: "Simpanan Keluar",      value: data.simpananKeluar,     icon: TrendingDown, color: "red",     tipe: "keluar" },
                    { label: "Angsuran Diterima",    value: data.angsuranDiterima,   icon: TrendingUp,   color: "emerald", tipe: "masuk" },
                    { label: "Pencairan Pinjaman",   value: data.pinjamanBaru,       icon: TrendingDown, color: "red",     tipe: "keluar" },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-${s.color}-50 text-${s.color}-600`}>
                          <s.icon size={15} />
                        </div>
                        <span className="text-sm text-slate-700">{s.label}</span>
                      </div>
                      <span className={`font-semibold text-${s.color}-600`}>
                        {s.tipe === "masuk" ? "+" : "-"} Rp {formatRp(s.value)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between rounded-xl bg-indigo-50 px-4 py-3">
                  <span className="text-sm font-semibold text-indigo-800">Net Cash Flow</span>
                  <span className="font-bold text-indigo-800">
                    {(data.simpananMasuk + data.angsuranDiterima - data.simpananKeluar - data.pinjamanBaru) >= 0 ? "+" : ""}
                    Rp {formatRp(data.simpananMasuk + data.angsuranDiterima - data.simpananKeluar - data.pinjamanBaru)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* SIMPANAN */}
          {activeTab === "simpanan" && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="mb-5 font-semibold text-slate-800">Laporan Simpanan — {bulan} {tahun}</h2>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Total Saldo Simpanan", value: `Rp ${formatRp(data.totalSimpanan)}` },
                  { label: "Simpanan Masuk",       value: `Rp ${formatRp(data.simpananMasuk)}` },
                  { label: "Simpanan Keluar",      value: `Rp ${formatRp(data.simpananKeluar)}` },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <p className="text-xs text-slate-500">{s.label}</p>
                    <p className="mt-1 text-lg font-bold text-slate-800">{s.value}</p>
                  </div>
                ))}
              </div>
              {data.simpananList.length === 0 ? (
                <p className="py-8 text-center text-sm text-slate-400">Tidak ada transaksi simpanan pada periode ini.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500">
                        <th className="px-4 py-3">Kode</th>
                        <th className="px-4 py-3">Anggota</th>
                        <th className="px-4 py-3">Jenis</th>
                        <th className="px-4 py-3">Tipe</th>
                        <th className="px-4 py-3">Jumlah</th>
                        <th className="px-4 py-3">Tanggal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {data.simpananList.map((s) => (
                        <tr key={s.id}>
                          <td className="px-4 py-3 font-mono text-xs text-slate-400">{s.kode_simpanan}</td>
                          <td className="px-4 py-3 text-slate-700">{s.anggota?.nama_anggota || "-"}</td>
                          <td className="px-4 py-3 text-slate-600">{s.jenis_simpanan}</td>
                          <td className="px-4 py-3">
                            <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${s.tipe === "Setor" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
                              {s.tipe}
                            </span>
                          </td>
                          <td className={`px-4 py-3 font-semibold ${s.tipe === "Setor" ? "text-emerald-600" : "text-red-600"}`}>
                            Rp {formatRp(s.jumlah)}
                          </td>
                          <td className="px-4 py-3 text-xs text-slate-400">{s.tanggal}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* PINJAMAN */}
          {activeTab === "pinjaman" && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="mb-5 font-semibold text-slate-800">Laporan Pinjaman — {bulan} {tahun}</h2>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Total Pinjaman Aktif",  value: `Rp ${formatRp(data.totalPinjaman)}` },
                  { label: "Pinjaman Baru",         value: `Rp ${formatRp(data.pinjamanBaru)}` },
                  { label: "Angsuran Diterima",     value: `Rp ${formatRp(data.angsuranDiterima)}` },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <p className="text-xs text-slate-500">{s.label}</p>
                    <p className="mt-1 text-lg font-bold text-slate-800">{s.value}</p>
                  </div>
                ))}
              </div>
              {data.pinjamanList.length === 0 ? (
                <p className="py-8 text-center text-sm text-slate-400">Tidak ada pengajuan pinjaman pada periode ini.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500">
                        <th className="px-4 py-3">Kode</th>
                        <th className="px-4 py-3">Anggota</th>
                        <th className="px-4 py-3">Jumlah</th>
                        <th className="px-4 py-3">Tenor</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {data.pinjamanList.map((p) => (
                        <tr key={p.id}>
                          <td className="px-4 py-3 font-mono text-xs text-slate-400">{p.kode_pinjaman}</td>
                          <td className="px-4 py-3 text-slate-700">{p.anggota?.nama_anggota || "-"}</td>
                          <td className="px-4 py-3 font-semibold text-slate-700">Rp {formatRp(p.jumlah_pinjaman)}</td>
                          <td className="px-4 py-3 text-slate-600">{p.tenor_bulan} bln</td>
                          <td className="px-4 py-3">
                            <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                              p.status === "Disetujui" ? "bg-emerald-50 text-emerald-600" :
                              p.status === "Ditolak"   ? "bg-red-50 text-red-600" :
                              "bg-orange-50 text-orange-600"
                            }`}>{p.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TRANSAKSI */}
          {activeTab === "transaksi" && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="mb-5 font-semibold text-slate-800">Laporan Transaksi — {bulan} {tahun}</h2>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Total Transaksi", value: data.transaksiList.length.toLocaleString("id-ID") },
                  { label: "Total Masuk",     value: `Rp ${formatRp(data.transaksiMasuk)}` },
                  { label: "Total Keluar",    value: `Rp ${formatRp(data.transaksiKeluar)}` },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <p className="text-xs text-slate-500">{s.label}</p>
                    <p className="mt-1 text-lg font-bold text-slate-800">{s.value}</p>
                  </div>
                ))}
              </div>
              {data.transaksiList.length === 0 ? (
                <p className="py-8 text-center text-sm text-slate-400">Tidak ada transaksi pada periode ini.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500">
                        <th className="px-4 py-3">Kode</th>
                        <th className="px-4 py-3">Anggota</th>
                        <th className="px-4 py-3">Jenis</th>
                        <th className="px-4 py-3">Jumlah</th>
                        <th className="px-4 py-3">Tipe</th>
                        <th className="px-4 py-3">Tanggal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {data.transaksiList.map((t) => (
                        <tr key={t.id}>
                          <td className="px-4 py-3 font-mono text-xs text-slate-400">{t.kode_transaksi}</td>
                          <td className="px-4 py-3 text-slate-700">{t.anggota?.nama_anggota || "-"}</td>
                          <td className="px-4 py-3 text-slate-600">{t.jenis}</td>
                          <td className={`px-4 py-3 font-semibold ${t.tipe === "Kredit" ? "text-emerald-600" : "text-red-600"}`}>
                            {t.tipe === "Kredit" ? "+" : "-"} Rp {formatRp(t.jumlah)}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${t.tipe === "Kredit" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
                              {t.tipe}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-xs text-slate-400">{t.tanggal}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
