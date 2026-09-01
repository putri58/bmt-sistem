import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Landmark, Menu, X, Phone, Mail, MapPin, Globe, MessageCircle, Tv2 } from "lucide-react";

const navLinks = [
  { label: "Beranda", to: "/" },
  { label: "Tentang Kami", to: "/#tentang" },
  { label: "Produk & Layanan", to: "/#produk" },
  { label: "Informasi", to: "/#informasi" },
  { label: "Kontak", to: "/#kontak" },
];

export default function GuestLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isDaftar = location.pathname === "/daftar";

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-6 py-4">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="https://ykpialittihad.or.id/wp-content/uploads/2025/01/logo-web-ykpi-al-ittihad.png"
              alt="Logo KSPPS BMT Al Ittihad"
              className="h-12 w-70 rounded-xl object-cover"
            />
            {/* <div>
              <p className="text-sm font-bold leading-tight text-slate-800">KSPPS BMT</p>
              <p className="text-xs font-semibold leading-tight text-emerald-600">Al Ittihad</p>
            </div> */}
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => (
              <a key={l.label} href={l.to}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-emerald-50 hover:text-emerald-700">
                {l.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden items-center gap-3 md:flex">
            <Link to="/admin/dashboard"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100">
              Login Admin
            </Link>
            <Link to="/daftar"
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700">
              Daftar Anggota
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 md:hidden">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="border-t border-slate-100 bg-white px-6 pb-4 md:hidden">
            {navLinks.map((l) => (
              <a key={l.label} href={l.to} onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-700">
                {l.label}
              </a>
            ))}
            <hr className="my-3 border-slate-100" />
            <div className="flex gap-3">
              <Link to="/admin/dashboard" onClick={() => setMenuOpen(false)}
                className="flex-1 rounded-lg border border-slate-200 py-2 text-center text-sm font-medium text-slate-600">
                Login Admin
              </Link>
              <Link to="/daftar" onClick={() => setMenuOpen(false)}
                className="flex-1 rounded-lg bg-emerald-600 py-2 text-center text-sm font-semibold text-white">
                Daftar Anggota
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* PAGE CONTENT */}
      <main>
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="bg-[#0a1f3c] text-slate-300">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4">

            {/* BRAND */}
            <div className="md:col-span-1">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-emerald-400">
                  <Landmark size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-white">KSPPS BMT Al Ittihad</p>
                  <p className="text-xs text-slate-400">Koperasi Simpan Pinjam & Pembiayaan Syariah</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-slate-400">
                Melayani dengan prinsip syariah, amanah, dan profesional untuk kesejahteraan anggota.
              </p>
              <div className="mt-5 flex gap-3">
                {[Globe, MessageCircle, Tv2].map((Icon, i) => (
                  <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-slate-300 transition hover:bg-emerald-500 hover:text-white">
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* LAYANAN */}
            <div>
              <h3 className="mb-4 font-semibold text-white">Layanan</h3>
              <ul className="space-y-2 text-sm">
                {["Simpanan Wadiah", "Simpanan Mudharabah", "Pembiayaan Murabahah", "Pembiayaan Mudharabah", "Pembiayaan Ijarah"].map((item) => (
                  <li key={item}><a href="#produk" className="transition hover:text-emerald-400">{item}</a></li>
                ))}
              </ul>
            </div>

            {/* INFORMASI */}
            <div>
              <h3 className="mb-4 font-semibold text-white">Informasi</h3>
              <ul className="space-y-2 text-sm">
                {["Tentang Kami", "Berita & Artikel", "Pengumuman", "FAQ", "Syarat & Ketentuan"].map((item) => (
                  <li key={item}><a href="#" className="transition hover:text-emerald-400">{item}</a></li>
                ))}
              </ul>
            </div>

            {/* KONTAK */}
            <div id="kontak">
              <h3 className="mb-4 font-semibold text-white">Kontak Kami</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-3">
                  <MapPin size={15} className="mt-0.5 shrink-0 text-emerald-400" />
                  <span>Jl. Raya Al Ittihad No. 1, Pekanbaru, Riau 28111</span>
                </li>
                <li className="flex gap-3">
                  <Phone size={15} className="shrink-0 text-emerald-400" />
                  <span>(0761) 123-4567</span>
                </li>
                <li className="flex gap-3">
                  <Mail size={15} className="shrink-0 text-emerald-400" />
                  <span>info@bmtalittihad.id</span>
                </li>
              </ul>
              <div className="mt-4 rounded-lg bg-white/5 px-4 py-3 text-xs">
                <p className="font-semibold text-white">Jam Operasional</p>
                <p className="mt-1 text-slate-400">Senin – Jumat: 08.00 – 16.00 WIB</p>
                <p className="text-slate-400">Sabtu: 08.00 – 12.00 WIB</p>
              </div>
            </div>

          </div>
        </div>
        <div className="border-t border-white/10 px-6 py-5">
          <p className="text-center text-xs text-slate-500">
            © 2026 KSPPS BMT Al Ittihad. Seluruh hak cipta dilindungi undang-undang.
          </p>
        </div>
      </footer>

    </div>
  );
}
