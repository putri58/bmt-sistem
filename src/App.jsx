import { Routes, Route, Navigate } from "react-router-dom";

import { AnggotaProvider } from "./context/AnggotaContext";

import GuestLayout from "./layouts/GuestLayout";
import AdminLayout from "./layouts/AdminLayout";

import Home from "./pages/guest/Home";
import Daftar from "./pages/guest/Daftar";

import Dashboard from "./pages/admin/Dashboard";
import Anggota from "./pages/admin/Anggota";
import PendaftaranAnggota from "./pages/admin/PendaftaranAnggota";
import Simpanan from "./pages/admin/Simpanan";
import Pinjaman from "./pages/admin/Pinjaman";
import Transaksi from "./pages/admin/Transaksi";
import Pengajuan from "./pages/admin/Pengajuan";
import Informasi from "./pages/admin/Informasi";
import Pengumuman from "./pages/admin/Pengumuman";
import Laporan from "./pages/admin/Laporan";
import ManajemenAdmin from "./pages/admin/ManajemenAdmin";
import Pengaturan from "./pages/admin/Pengaturan";

function App() {
  return (
    <AnggotaProvider>
      <Routes>

        {/* GUEST */}
        <Route element={<GuestLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/daftar" element={<Daftar />} />
        </Route>

        {/* ADMIN */}
        <Route path="/admin" element={<AdminLayout />}>

          <Route path="dashboard"            element={<Dashboard />} />
          <Route index                        element={<Navigate to="pendaftaran-anggota" replace />} />
          <Route path="pendaftaran-anggota"  element={<PendaftaranAnggota />} />
          <Route path="anggota"              element={<Anggota />} />
          <Route path="simpanan"             element={<Simpanan />} />
          <Route path="pinjaman"             element={<Pinjaman />} />
          <Route path="transaksi"            element={<Transaksi />} />
          <Route path="pengajuan"            element={<Pengajuan />} />
          <Route path="informasi"            element={<Informasi />} />
          <Route path="pengumuman"           element={<Pengumuman />} />
          <Route path="laporan"              element={<Laporan />} />
          <Route path="manajemen-admin"      element={<ManajemenAdmin />} />
          <Route path="pengaturan"           element={<Pengaturan />} />

        </Route>

      </Routes>
    </AnggotaProvider>
  );
}

export default App;