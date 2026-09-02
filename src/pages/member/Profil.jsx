import { useState } from "react";
import { User, Pencil, Check, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function formatDate(d) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

const inputCls = "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-[#1E5E3F] focus:bg-white transition";

export default function Profil() {
  const { currentUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    nama:        currentUser?.nama || "",
    email:       currentUser?.email || "",
    noHp:        currentUser?.noHp || "",
    alamat:      currentUser?.alamat || "",
    kota:        currentUser?.kota || "",
    kodePos:     currentUser?.kodePos || "",
  });

  const initials = currentUser?.nama
    ? currentUser.nama.split(" ").map((w) => w[0]).slice(0, 2).join("")
    : "AG";

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Profil Saya</h1>
        <p className="mt-1 text-sm text-slate-500">Informasi pribadi akun keanggotaan Anda.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">

        {/* KARTU PROFIL */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#1E5E3F] text-2xl font-bold text-white shadow-lg">
            {initials}
          </div>
          <h2 className="font-bold text-slate-800">{currentUser?.nama}</h2>
          <p className="mt-1 text-sm text-[#1E5E3F] font-semibold">{currentUser?.nomorAnggota || "KSP-00124"}</p>
          <span className="mt-2 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            {currentUser?.statusAnggota || "Aktif"}
          </span>

          <div className="mt-5 border-t border-slate-100 pt-5 space-y-2 text-sm text-left">
            <div className="flex justify-between">
              <span className="text-slate-500">Anggota sejak</span>
              <span className="font-medium text-slate-700">{formatDate(currentUser?.tglMasuk)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">NIK</span>
              <span className="font-mono text-xs text-slate-700">{currentUser?.noIdentitas || "-"}</span>
            </div>
          </div>
        </div>

        {/* DETAIL PROFIL */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-semibold text-slate-800">Data Pribadi</h2>
            {!editing ? (
              <button onClick={() => setEditing(true)}
                className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition">
                <Pencil size={13} /> Edit Profil
              </button>
            ) : (
              <div className="flex gap-2">
                <button onClick={() => setEditing(false)}
                  className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50">
                  <X size={13} /> Batal
                </button>
                <button onClick={() => setEditing(false)}
                  className="flex items-center gap-1 rounded-lg bg-[#1E5E3F] px-3 py-2 text-xs font-semibold text-white hover:bg-[#174d33]">
                  <Check size={13} /> Simpan
                </button>
              </div>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              { label: "Nama Lengkap",  key: "nama",    type: "text" },
              { label: "Email",         key: "email",   type: "email" },
              { label: "No. HP / WA",   key: "noHp",    type: "tel" },
              { label: "Kota",          key: "kota",    type: "text" },
              { label: "Kode Pos",      key: "kodePos", type: "text" },
            ].map(({ label, key, type }) => (
              <div key={key}>
                <label className="mb-1 block text-xs font-semibold text-slate-500">{label}</label>
                {editing ? (
                  <input type={type} value={form[key]} onChange={set(key)} className={inputCls} />
                ) : (
                  <p className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-2.5 text-sm text-slate-800">
                    {form[key] || "-"}
                  </p>
                )}
              </div>
            ))}

            <div className="md:col-span-2">
              <label className="mb-1 block text-xs font-semibold text-slate-500">Alamat Rumah</label>
              {editing ? (
                <textarea value={form.alamat} onChange={set("alamat")} rows={3} className={`${inputCls} resize-none`} />
              ) : (
                <p className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-2.5 text-sm text-slate-800">
                  {form.alamat || "-"}
                </p>
              )}
            </div>
          </div>

          {/* READONLY INFO */}
          <div className="mt-5 border-t border-slate-100 pt-5">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Informasi Keanggotaan</p>
            <div className="grid gap-3 md:grid-cols-3">
              {[
                { label: "Nomor Anggota",    value: currentUser?.nomorAnggota || "KSP-00124" },
                { label: "Tempat Lahir",     value: currentUser?.tempatLahir || "-" },
                { label: "Tanggal Lahir",    value: formatDate(currentUser?.tanggalLahir) },
                { label: "Jenis Kelamin",    value: currentUser?.jenisKelamin || "-" },
                { label: "Status Anggota",   value: currentUser?.statusAnggota || "Aktif" },
                { label: "Tanggal Masuk",    value: formatDate(currentUser?.tglMasuk) },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-xl bg-slate-50 p-3">
                  <p className="text-[10px] font-semibold text-slate-400">{label}</p>
                  <p className="mt-1 text-sm font-medium text-slate-700">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
