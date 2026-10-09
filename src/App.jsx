import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ScrollToTop from "./components/ScrollToTop";

/* ── LAYOUTS ── */
import GuestLayout  from "./layouts/GuestLayout";
import AdminLayout  from "./layouts/AdminLayout";
import MemberLayout from "./layouts/MemberLayout";

/* ── GUEST PAGES ── */
import Home       from "./pages/guest/Home";
import Tentang    from "./pages/guest/Tentang";
import Informasi  from "./pages/guest/Informasi";
import Kontak     from "./pages/guest/Kontak";
import Login      from "./pages/guest/Login";
import Daftar     from "./pages/guest/Daftar";

/* ── ADMIN PAGES ── */
import AdminDashboard     from "./pages/admin/Dashboard";
import PendaftaranAnggota from "./pages/admin/PendaftaranAnggota";
import Anggota            from "./pages/admin/Anggota";
import AdminSimpanan      from "./pages/admin/Simpanan";
import AdminPinjaman      from "./pages/admin/Pinjaman";
import AdminTransaksi     from "./pages/admin/Transaksi";
import AdminPengajuan     from "./pages/admin/Pengajuan";
import AdminInformasi     from "./pages/admin/Informasi";
import AdminPengumuman    from "./pages/admin/Pengumuman";
import AdminLaporan       from "./pages/admin/Laporan";
import ManajemenAdmin     from "./pages/admin/ManajemenAdmin";
import AdminPengaturan    from "./pages/admin/Pengaturan";

/* ── MEMBER PAGES ── */
import MemberDashboard from "./pages/member/Dashboard";
import Profil          from "./pages/member/Profil";
import MemberSimpanan  from "./pages/member/Simpanan";
import MemberPinjaman  from "./pages/member/Pinjaman";
import Angsuran        from "./pages/member/Angsuran";
import MemberTransaksi from "./pages/member/Transaksi";

/* ─────────────────────────────────────────────────────────
   GUARD — hanya admin kantor yang sesuai atau superadmin
───────────────────────────────────────────────────────── */
function AdminRoute({ kantor, children }) {
  const { currentUser } = useAuth();

  if (!currentUser) return <Navigate to="/login" replace />;

  // Superadmin boleh akses semua path
  if (currentUser.role === "superadmin") return children;

  // Admin hanya boleh akses kantornya sendiri
  if (currentUser.role === "admin" && currentUser.kantor === kantor) return children;

  // Salah kantor → redirect ke dashboard kantornya
  if (currentUser.role === "admin" && currentUser.kantor) {
    return <Navigate to={`/admin/${currentUser.kantor}`} replace />;
  }

  return <Navigate to="/login" replace />;
}

/* Redirect /admin atau /admin/dashboard → path yang benar */
function AdminRedirect() {
  const { currentUser, getDashboardPath } = useAuth();
  if (!currentUser) return <Navigate to="/login" replace />;
  return <Navigate to={getDashboardPath()} replace />;
}

/* ─────────────────────────────────────────────────────────
   Helper: buat route admin untuk satu kantor
───────────────────────────────────────────────────────── */
function makeAdminRoutes(kantor) {
  return (
    <Route
      key={kantor}
      path={`/admin/${kantor}`}
      element={<AdminRoute kantor={kantor}><AdminLayout /></AdminRoute>}
    >
      <Route index                      element={<AdminDashboard />} />
      <Route path="pendaftaran-anggota" element={<PendaftaranAnggota />} />
      <Route path="anggota"             element={<Anggota />} />
      <Route path="simpanan"            element={<AdminSimpanan />} />
      <Route path="pinjaman"            element={<AdminPinjaman />} />
      <Route path="transaksi"           element={<AdminTransaksi />} />
      <Route path="pengajuan"           element={<AdminPengajuan />} />
      <Route path="informasi"           element={<AdminInformasi />} />
      <Route path="pengumuman"          element={<AdminPengumuman />} />
      <Route path="laporan"             element={<AdminLaporan />} />
      <Route path="manajemen-admin"     element={<ManajemenAdmin />} />
      <Route path="pengaturan"          element={<AdminPengaturan />} />
    </Route>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Routes>

        {/* ── GUEST ── */}
        <Route element={<GuestLayout />}>
          <Route path="/"          element={<Home />} />
          <Route path="/tentang"   element={<Tentang />} />
          <Route path="/informasi" element={<Informasi />} />
          <Route path="/kontak"    element={<Kontak />} />
          <Route path="/login"     element={<Login />} />
          <Route path="/daftar"    element={<Daftar />} />
        </Route>

        {/* ── ADMIN: redirect lama ── */}
        <Route path="/admin"           element={<AdminRedirect />} />
        <Route path="/admin/dashboard" element={<AdminRedirect />} />

        {/* ── ADMIN: satu route per kantor ── */}
        {makeAdminRoutes("superadmin")}
        {makeAdminRoutes("pusat")}
        {makeAdminRoutes("rumbai")}
        {makeAdminRoutes("panam")}
        {makeAdminRoutes("duri")}
        {makeAdminRoutes("cibubur")}

        {/* ── MEMBER ── */}
        <Route path="/member" element={<MemberLayout />}>
          <Route index            element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<MemberDashboard />} />
          <Route path="profil"    element={<Profil />} />
          <Route path="simpanan"  element={<MemberSimpanan />} />
          <Route path="pinjaman"  element={<MemberPinjaman />} />
          <Route path="angsuran"  element={<Angsuran />} />
          <Route path="transaksi" element={<MemberTransaksi />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </AuthProvider>
  );
}
