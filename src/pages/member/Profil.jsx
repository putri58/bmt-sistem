import { useState, useEffect } from "react";
import { User, MapPin, Phone, Mail, CreditCard, Calendar, Shield } from "lucide-react";
import api from "../../lib/api";

function formatDate(d) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

function InfoRow({ label, value }) {
  return (
    <div className="flex gap-4 border-b border-slate-100 py-3 last:border-0">
      <span className="w-44 shrink-0 text-xs font-semibold text-slate-400">{label}</span>
      <span className="text-sm text-slate-700">{value || "-"}</span>
    </div>
  );
}

export default function Profil() {
  const [anggota, setAnggota] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfil() {
      try {
        const res = await api.get('/member/profil');
        setAnggota(res.data);
      } catch (err) {
        console.error('Gagal ambil profil', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfil();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center py-32 text-slate-400">Memuat data...</div>;
  }

  if (!anggota) {
    return <div className="flex items-center justify-center py-32 text-slate-400">Data profil tidak ditemukan.</div>;
  }

  const initials = anggota.nama_anggota?.split(" ").map((w) => w[0]).slice(0, 2).join("") || "?";

  return (
    <div>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Profil Saya</h1>
        <p className="mt-1 text-sm text-slate-500">Informasi data diri dan keanggotaan Anda.</p>
      </div>

      {/* CARD PROFIL UTAMA */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-center gap-5">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1E5E3F] to-[#2E8B57] text-2xl font-bold text-white shadow-lg">
            {initials}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">{anggota.nama_anggota}</h2>
            <p className="text-sm text-slate-500">{anggota.id_anggota}</p>
            <div className="mt-2 flex items-center gap-2">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                anggota.status_anggota === "Aktif"
                  ? "bg-emerald-100 text-emerald-600"
                  : "bg-slate-100 text-slate-500"
              }`}>
                {anggota.status_anggota}
              </span>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600">
                Anggota sejak {formatDate(anggota.tgl_disetujui)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        {/* DATA DIRI */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1E5E3F]/10">
              <User size={15} className="text-[#1E5E3F]" />
            </div>
            <h3 className="font-semibold text-slate-800">Data Diri</h3>
          </div>
          <InfoRow label="Nama Lengkap"     value={anggota.nama_anggota} />
          <InfoRow label="No. Identitas"    value={`${anggota.no_identitas} (${anggota.jenis_identitas})`} />
          <InfoRow label="Tempat Lahir"     value={anggota.tempat_lahir} />
          <InfoRow label="Tanggal Lahir"    value={formatDate(anggota.tanggal_lahir)} />
          <InfoRow label="Jenis Kelamin"    value={anggota.jenis_kelamin} />
          <InfoRow label="Status Pernikahan" value={anggota.status_perkawinan} />
          <InfoRow label="Kewarganegaraan"  value={anggota.kewarganegaraan} />
          <InfoRow label="Nama Ibu Kandung" value={anggota.nama_ibu_kandung} />
        </div>

        {/* ALAMAT & KONTAK */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
                <MapPin size={15} className="text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-800">Alamat</h3>
            </div>
            <InfoRow label="Alamat Rumah" value={anggota.alamat_rumah} />
            <InfoRow label="Kota"         value={anggota.kota} />
            <InfoRow label="Kode Pos"     value={anggota.kode_pos} />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50">
                <Phone size={15} className="text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-800">Kontak</h3>
            </div>
            <InfoRow label="No. Telepon / HP" value={anggota.no_telp} />
            <InfoRow label="Email"            value={anggota.email} />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50">
                <Shield size={15} className="text-emerald-600" />
              </div>
              <h3 className="font-semibold text-slate-800">Info Keanggotaan</h3>
            </div>
            <InfoRow label="ID Anggota"    value={anggota.id_anggota} />
            <InfoRow label="Status"        value={anggota.status_anggota} />
            <InfoRow label="Tgl Daftar"    value={formatDate(anggota.tgl_daftar)} />
            <InfoRow label="Tgl Disetujui" value={formatDate(anggota.tgl_disetujui)} />
          </div>
        </div>
      </div>
    </div>
  );
}
