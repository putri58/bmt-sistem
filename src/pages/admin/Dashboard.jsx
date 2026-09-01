import {
  Users,
  Wallet,
  CreditCard,
  ArrowLeftRight,
  Clock3,
  Calendar,
  FileText,
  DatabaseBackup,
  Activity,
} from "lucide-react";

import { Link } from "react-router-dom";

import StatCard from "../../components/admin/StatCard";

import {
  statistics,
  pengajuanTerbaru,
  aktivitasTerbaru,
} from "../../data/dashboardData";


function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID").format(value);
}


function Dashboard() {

  return (
    <div>

      {/* HEADER */}
      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-2xl font-bold text-slate-800">
            Dashboard Admin
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Selamat datang kembali, Admin 👋
            Pantau aktivitas koperasi hari ini.
          </p>

        </div>


        <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">

          <Calendar size={17} />

          1 September 2026

        </button>

      </div>


      {/* STATISTICS */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">

        <StatCard
          title="Total Anggota"
          value={statistics.anggota.toLocaleString("id-ID")}
          description="↑ 12 anggota baru bulan ini"
          icon={Users}
          iconBg="bg-indigo-100"
          iconColor="text-indigo-600"
        />


        <StatCard
          title="Total Simpanan"
          value={`Rp ${formatRupiah(statistics.simpanan)}`}
          description="↑ 8,45% dari bulan lalu"
          icon={Wallet}
          iconBg="bg-emerald-100"
          iconColor="text-emerald-600"
        />


        <StatCard
          title="Total Pinjaman"
          value={`Rp ${formatRupiah(statistics.pinjaman)}`}
          description="↑ 6,21% dari bulan lalu"
          icon={CreditCard}
          iconBg="bg-orange-100"
          iconColor="text-orange-600"
        />


        <StatCard
          title="Total Transaksi"
          value={statistics.transaksi.toLocaleString("id-ID")}
          description="↑ 15,73% dari bulan lalu"
          icon={ArrowLeftRight}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />


        <StatCard
          title="Pengajuan Menunggu"
          value={statistics.pengajuan}
          description="Perlu segera diverifikasi"
          icon={Clock3}
          iconBg="bg-pink-100"
          iconColor="text-pink-500"
        />

      </div>


      {/* MAIN CONTENT */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">


        {/* CHART */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 xl:col-span-2">

          <div className="mb-6 flex items-center justify-between">

            <div>

              <h2 className="font-semibold text-slate-800">
                Grafik Simpanan & Pinjaman
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Perkembangan 6 bulan terakhir
              </p>

            </div>


            <select className="rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-500 outline-none">

              <option>
                6 Bulan Terakhir
              </option>

              <option>
                1 Tahun
              </option>

            </select>

          </div>


          {/* SIMPLE CHART VISUAL */}
          <div className="flex h-64 items-end gap-5 rounded-xl bg-slate-50 p-6">

            {[35, 45, 52, 63, 75, 88].map(
              (height, index) => (

                <div
                  key={index}
                  className="flex-1 rounded-t-lg bg-gradient-to-t from-indigo-600 to-indigo-400 transition-all duration-500 hover:from-indigo-700 hover:to-indigo-500"
                  style={{
                    height: `${height}%`,
                  }}
                />

              )
            )}

          </div>


          <div className="mt-3 flex justify-between text-xs text-slate-400">

            <span>Apr</span>
            <span>Mei</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Agu</span>
            <span>Sep</span>

          </div>

        </div>


        {/* PENGAJUAN */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">

          <div className="mb-5 flex items-center justify-between">

            <h2 className="font-semibold text-slate-800">
              Pengajuan Terbaru
            </h2>

            <Link to="/admin/pengajuan" className="cursor-pointer text-xs font-medium text-indigo-600 hover:underline">
              Lihat Semua
            </Link>

          </div>


          <div className="space-y-5">

            {pengajuanTerbaru.map((item) => (

              <div
                key={item.id}
                className="flex items-center gap-3"
              >

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">

                  {item.nama
                    .split(" ")
                    .map((word) => word[0])
                    .slice(0, 2)
                    .join("")}

                </div>


                <div className="min-w-0 flex-1">

                  <p className="truncate text-sm font-medium text-slate-700">
                    {item.nama}
                  </p>

                  <p className="truncate text-xs text-slate-400">
                    {item.jenis}
                  </p>

                </div>


                <StatusBadge status={item.status} />

              </div>

            ))}

          </div>

        </div>

      </div>


      {/* BOTTOM */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">


        {/* ACTIVITY */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">

          <div className="mb-5 flex items-center justify-between">

            <h2 className="font-semibold text-slate-800">
              Aktivitas Terbaru
            </h2>

            <Link to="/admin/transaksi" className="text-xs font-medium text-indigo-600 hover:underline">
              Lihat Semua
            </Link>

          </div>


          <div className="space-y-5">

            {aktivitasTerbaru.map((item) => (

              <div
                key={item.id}
                className="flex gap-4"
              >

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-500">

                  <Activity size={16} />

                </div>


                <div>

                  <p className="text-sm text-slate-600">
                    {item.text}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Hari ini, {item.time}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>


        {/* INFORMATION */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">

          <div className="mb-5 flex items-center justify-between">

            <h2 className="font-semibold text-slate-800">
              Informasi Penting
            </h2>

            <Link to="/admin/informasi" className="text-xs font-medium text-indigo-600 hover:underline">
              Lihat Semua
            </Link>

          </div>


          <InformationCard
            icon={Calendar}
            title="Rapat Anggota Tahunan"
            description="Dijadwalkan pada 15 September 2026."
            type="green"
          />


          <InformationCard
            icon={FileText}
            title="Laporan Keuangan Bulanan"
            description="Laporan bulan Agustus telah tersedia."
            type="blue"
          />


          <InformationCard
            icon={DatabaseBackup}
            title="Backup Database"
            description="Backup terakhir dilakukan hari ini."
            type="orange"
          />

        </div>

      </div>

    </div>
  );
}


/* STATUS BADGE */

function StatusBadge({ status }) {

  const styles = {
    Menunggu:
      "bg-orange-50 text-orange-500",

    Disetujui:
      "bg-emerald-50 text-emerald-500",

    Ditolak:
      "bg-red-50 text-red-500",
  };

  return (
    <span
      className={`rounded-full px-2 py-1 text-[10px] font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}


/* INFORMATION CARD */

function InformationCard({
  icon: Icon,
  title,
  description,
  type,
}) {

  const styles = {

    green:
      "border-emerald-100 bg-emerald-50 text-emerald-500",

    blue:
      "border-blue-100 bg-blue-50 text-blue-500",

    orange:
      "border-orange-100 bg-orange-50 text-orange-500",
  };


  return (
    <div
      className={`mb-3 rounded-xl border p-4 ${styles[type]}`}
    >

      <div className="flex gap-3">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white">

          <Icon size={19} />

        </div>


        <div>

          <h3 className="text-sm font-semibold text-slate-700">
            {title}
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            {description}
          </p>

        </div>

      </div>

    </div>
  );
}


export default Dashboard;