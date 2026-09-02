import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAnggota } from "../../context/AnggotaContext";
import {
  Landmark,
  User,
  CreditCard,
  Upload,
  Camera,
  CheckCircle2,
  X,
  AlertCircle,
  Eye,
  EyeOff,
  FileText,
} from "lucide-react";

/* ─────────────────────────────────────────
   HELPER COMPONENTS
───────────────────────────────────────── */
function Field({ label, required, error, hint, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-slate-700">
        {label}{" "}
        {required && <span className="text-red-500">*</span>}
      </label>
      {hint && <p className="mb-1.5 text-xs text-slate-400">{hint}</p>}
      {children}
      {error && (
        <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
          <AlertCircle size={11} className="shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white";

/* ─────────────────────────────────────────
   IMAGE / FILE UPLOAD BOX
───────────────────────────────────────── */
function UploadBox({ label, required, hint, icon: Icon, accept = "image/*", value, onChange, onRemove, error }) {
  const ref = useRef(null);
  const isImage = value && value.type?.startsWith("image/");
  const preview = isImage ? URL.createObjectURL(value) : null;

  return (
    <Field label={label} required={required} hint={hint} error={error}>
      <div
        onClick={() => !value && ref.current.click()}
        className={[
          "relative flex min-h-40 flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed transition",
          value
            ? "cursor-default border-emerald-300 bg-emerald-50"
            : "cursor-pointer border-slate-200 bg-slate-50 hover:border-emerald-400 hover:bg-emerald-50/40",
        ].join(" ")}
      >
        <input
          ref={ref}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => e.target.files[0] && onChange(e.target.files[0])}
        />

        {value ? (
          <>
            {isImage ? (
              <img src={preview} alt={label} className="h-full w-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-2 p-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                  <FileText size={28} />
                </div>
                <p className="text-center text-sm font-medium text-slate-700">{value.name}</p>
                <p className="text-xs text-slate-400">
                  {(value.size / 1024).toFixed(0)} KB
                </p>
              </div>
            )}

            {/* REMOVE BUTTON */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onRemove(); }}
              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition hover:bg-red-600"
            >
              <X size={13} />
            </button>

            {/* FOOTER BADGE */}
            <div className="absolute bottom-0 left-0 right-0 bg-emerald-600/80 py-1.5 text-center text-xs font-medium text-white backdrop-blur-sm">
              <CheckCircle2 size={11} className="mr-1 inline" />
              File dipilih
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-3 p-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <Icon size={26} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Klik untuk unggah</p>
              <p className="mt-0.5 text-xs text-slate-400">PNG, JPG, PDF — Maks. 5 MB</p>
            </div>
          </div>
        )}
      </div>
    </Field>
  );
}

/* ─────────────────────────────────────────
   MAIN FORM
───────────────────────────────────────── */
const emptyForm = {
  // 1
  namaAnggota: "",
  // 2
  noIdentitas: "",
  // 3
  jenisIdentitas: "",
  // 4
  tempatLahir: "",
  // 5
  tanggalLahir: "",
  // 6
  kewarganegaraan: "WNI",
  // 7
  status: "",
  // 8
  jenisKelamin: "",
  // 9
  namaIbuKandung: "",
  // 10
  alamatRumah: "",
  // 11
  kota: "",
  // 12
  kodePos: "",
  // 13
  email: "",
  // 14
  noTelp: "",
  // akun
  username: "",
  password: "",
  konfirmasiPassword: "",
  // 15
  fotoIdentitas: null,
  // 16
  fotoNPWP: null,
};

function validate(form) {
  const e = {};
  if (!form.namaAnggota.trim())     e.namaAnggota    = "Nama wajib diisi";
  if (!form.noIdentitas.trim())     e.noIdentitas    = "Nomor identitas wajib diisi";
  if (!form.jenisIdentitas)         e.jenisIdentitas = "Pilih jenis identitas";
  if (!form.tempatLahir.trim())     e.tempatLahir    = "Tempat lahir wajib diisi";
  if (!form.tanggalLahir)           e.tanggalLahir   = "Tanggal lahir wajib diisi";
  if (!form.kewarganegaraan)        e.kewarganegaraan = "Kewarganegaraan wajib diisi";
  if (!form.status)                 e.status         = "Pilih status";
  if (!form.jenisKelamin)           e.jenisKelamin   = "Pilih jenis kelamin";
  if (!form.namaIbuKandung.trim())  e.namaIbuKandung = "Nama ibu kandung wajib diisi";
  if (!form.alamatRumah.trim())     e.alamatRumah    = "Alamat wajib diisi";
  if (!form.kota.trim())            e.kota           = "Kota wajib diisi";
  if (!form.kodePos.trim())         e.kodePos        = "Kode pos wajib diisi";
  if (!form.email.trim())           e.email          = "Email wajib diisi";
  else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Format email tidak valid";
  if (!form.noTelp.trim())          e.noTelp         = "Nomor telepon wajib diisi";
  if (!form.username.trim())        e.username       = "Username wajib diisi";
  else if (form.username.length < 4) e.username      = "Username minimal 4 karakter";
  else if (/\s/.test(form.username)) e.username      = "Username tidak boleh mengandung spasi";
  if (!form.password)               e.password       = "Password wajib diisi";
  else if (form.password.length < 8) e.password      = "Password minimal 8 karakter";
  if (form.password !== form.konfirmasiPassword) e.konfirmasiPassword = "Password tidak cocok";
  if (!form.fotoIdentitas)          e.fotoIdentitas  = "Unggah foto KTP / SIM";
  return e;
}

export default function Daftar() {
  const { tambahPendaftar } = useAnggota();
  const [form, setForm]           = useState(emptyForm);
  const [errors, setErrors]       = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [agreed, setAgreed]       = useState(false);
  const [showPass, setShowPass]   = useState(false);
  const [showKonfirm, setShowKonfirm] = useState(false);

  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const setFile = (key) => (file) =>
    setForm((prev) => ({ ...prev, [key]: file }));

  const removeFile = (key) => () =>
    setForm((prev) => ({ ...prev, [key]: null }));

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(form);
    if (!agreed) errs.agreed = "Anda harus menyetujui pernyataan di atas";
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      // Kirim data ke antrian pendaftaran admin
      // File object bisa disimpan di React state (in-memory, valid selama session)
      tambahPendaftar({
        namaAnggota:    form.namaAnggota,
        noIdentitas:    form.noIdentitas,
        jenisIdentitas: form.jenisIdentitas,
        tempatLahir:    form.tempatLahir,
        tanggalLahir:   form.tanggalLahir,
        kewarganegaraan: form.kewarganegaraan,
        status:         form.status,
        jenisKelamin:   form.jenisKelamin,
        namaIbuKandung: form.namaIbuKandung,
        alamatRumah:    form.alamatRumah,
        kota:           form.kota,
        kodePos:        form.kodePos,
        email:          form.email,
        noTelp:         form.noTelp,
        username:       form.username,
        fotoIdentitas:  form.fotoIdentitas,   // File object langsung
        fotoNPWP:       form.fotoNPWP,        // File object langsung (null jika tidak diisi)
      });
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  /* ── SUKSES ── */
  if (submitted) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-6 py-20">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-xl">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 size={42} className="text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Pendaftaran Terkirim!</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            Terima kasih, <strong className="text-slate-700">{form.namaAnggota}</strong>.
            Formulir Anda telah kami terima. Tim kami akan menghubungi Anda melalui{" "}
            <strong className="text-slate-700">{form.email}</strong> atau{" "}
            <strong className="text-slate-700">{form.noTelp}</strong> dalam 1–2 hari kerja.
          </p>
          <div className="mt-5 rounded-2xl bg-emerald-50 px-5 py-4 text-left">
            <p className="text-xs font-semibold text-emerald-700">Langkah Selanjutnya:</p>
            <ul className="mt-2 space-y-1.5 text-xs text-slate-600">
              {[
                "Tunggu konfirmasi verifikasi dari petugas kami",
                "Siapkan dokumen asli untuk verifikasi lanjutan",
                "Lakukan pembayaran simpanan pokok setelah disetujui",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 size={12} className="mt-0.5 shrink-0 text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <Link
            to="/"
            className="mt-6 block w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  /* ── FORM ── */
  return (
    <div className="bg-slate-50 py-12">
      <div className="mx-auto max-w-3xl px-6">

        {/* HEADER */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-lg">
            <Landmark size={26} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">
            Formulir Pendaftaran Anggota
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            KSPPS BMT Al Ittihad — Lengkapi semua data di bawah ini dengan benar dan jelas
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

            {/* ── SEKSI A: DATA DIRI ── */}
            <div className="border-b border-slate-100 px-8 py-5">
              <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-emerald-600">
                <User size={15} />
                Data Diri
              </h2>
            </div>
            <div className="grid gap-5 px-8 py-7 md:grid-cols-2">

              {/* 1. Nama */}
              <div className="md:col-span-2">
                <Field label="1. Nama Calon Anggota / Anggota" required error={errors.namaAnggota}>
                  <input
                    type="text"
                    value={form.namaAnggota}
                    onChange={set("namaAnggota")}
                    placeholder="Nama lengkap sesuai identitas"
                    className={inputCls}
                  />
                </Field>
              </div>

              {/* 2. No Identitas + 3. Jenis Identitas */}
              <Field label="2. Nomor Identitas" required error={errors.noIdentitas}>
                <input
                  type="text"
                  value={form.noIdentitas}
                  onChange={set("noIdentitas")}
                  placeholder="NIK atau nomor SIM"
                  maxLength={20}
                  className={inputCls}
                />
              </Field>

              <Field label="3. Jenis Identitas" required error={errors.jenisIdentitas}>
                <select value={form.jenisIdentitas} onChange={set("jenisIdentitas")} className={inputCls}>
                  <option value="">-- Pilih Jenis Identitas --</option>
                  <option value="KTP">KTP (Kartu Tanda Penduduk)</option>
                  <option value="SIM">SIM (Surat Izin Mengemudi)</option>
                </select>
              </Field>

              {/* 4. Tempat Lahir + 5. Tanggal Lahir */}
              <Field label="4. Tempat Lahir" required error={errors.tempatLahir}>
                <input
                  type="text"
                  value={form.tempatLahir}
                  onChange={set("tempatLahir")}
                  placeholder="Contoh: Pekanbaru"
                  className={inputCls}
                />
              </Field>

              <Field
                label="5. Tanggal Lahir"
                required
                hint="Format: DD/MM/YYYY"
                error={errors.tanggalLahir}
              >
                <input
                  type="date"
                  value={form.tanggalLahir}
                  onChange={set("tanggalLahir")}
                  className={inputCls}
                />
              </Field>

              {/* 6. Kewarganegaraan */}
              <Field label="6. Kewarganegaraan" required error={errors.kewarganegaraan}>
                <select value={form.kewarganegaraan} onChange={set("kewarganegaraan")} className={inputCls}>
                  <option value="WNI">WNI (Warga Negara Indonesia)</option>
                  <option value="WNA">WNA (Warga Negara Asing)</option>
                </select>
              </Field>

              {/* 7. Status */}
              <Field label="7. Status" required error={errors.status}>
                <select value={form.status} onChange={set("status")} className={inputCls}>
                  <option value="">-- Pilih Status --</option>
                  <option value="Lajang">Lajang</option>
                  <option value="Menikah">Menikah</option>
                  <option value="Cerai Hidup">Cerai Hidup</option>
                  <option value="Cerai Mati">Cerai Mati</option>
                </select>
              </Field>

              {/* 8. Jenis Kelamin */}
              <div className="md:col-span-2">
                <Field label="8. Jenis Kelamin" required error={errors.jenisKelamin}>
                  <div className="flex gap-4">
                    {["Pria", "Wanita"].map((jk) => (
                      <label
                        key={jk}
                        className={[
                          "flex flex-1 cursor-pointer items-center gap-3 rounded-xl border-2 px-5 py-3 transition",
                          form.jenisKelamin === jk
                            ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                            : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50",
                        ].join(" ")}
                      >
                        <input
                          type="radio"
                          name="jenisKelamin"
                          value={jk}
                          checked={form.jenisKelamin === jk}
                          onChange={set("jenisKelamin")}
                          className="accent-emerald-600"
                        />
                        <span className="text-sm font-medium">{jk}</span>
                      </label>
                    ))}
                  </div>
                </Field>
              </div>

              {/* 9. Nama Ibu Kandung */}
              <div className="md:col-span-2">
                <Field label="9. Nama Ibu Kandung" required error={errors.namaIbuKandung}>
                  <input
                    type="text"
                    value={form.namaIbuKandung}
                    onChange={set("namaIbuKandung")}
                    placeholder="Nama ibu kandung sesuai akta lahir"
                    className={inputCls}
                  />
                </Field>
              </div>

            </div>

            {/* ── SEKSI B: ALAMAT & KONTAK ── */}
            <div className="border-b border-t border-slate-100 bg-slate-50/50 px-8 py-5">
              <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-emerald-600">
                <CreditCard size={15} />
                Alamat &amp; Kontak
              </h2>
            </div>
            <div className="grid gap-5 px-8 py-7 md:grid-cols-2">

              {/* 10. Alamat Rumah */}
              <div className="md:col-span-2">
                <Field label="10. Alamat Rumah" required error={errors.alamatRumah}>
                  <textarea
                    value={form.alamatRumah}
                    onChange={set("alamatRumah")}
                    rows={3}
                    placeholder="Jalan, nomor rumah, RT/RW, Kelurahan, Kecamatan"
                    className={`${inputCls} resize-none`}
                  />
                </Field>
              </div>

              {/* 11. Kota */}
              <Field label="11. Kota" required error={errors.kota}>
                <input type="text" value={form.kota} onChange={set("kota")} placeholder="Contoh: Pekanbaru" className={inputCls} />
              </Field>

              {/* 12. Kode Pos */}
              <Field label="12. Kode Pos" required error={errors.kodePos}>
                <input type="text" value={form.kodePos} onChange={set("kodePos")} placeholder="Contoh: 28111" maxLength={5} className={inputCls} />
              </Field>

              {/* 13. Email */}
              <Field label="13. Email" required error={errors.email}>
                <input type="email" value={form.email} onChange={set("email")} placeholder="contoh@email.com" className={inputCls} />
              </Field>

              {/* 14. No Telp / HP */}
              <Field label="14. No. Telp / HP" required error={errors.noTelp}>
                <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50 focus-within:border-[#1E5E3F] focus-within:bg-white transition">
                  <span className="flex items-center border-r border-slate-200 bg-slate-100 px-3 text-sm font-medium text-slate-500">+62</span>
                  <input type="tel" value={form.noTelp} onChange={set("noTelp")} placeholder="8123456789"
                    className="w-full bg-transparent px-4 py-2.5 text-sm text-slate-800 outline-none" />
                </div>
              </Field>

            </div>

            {/* ── SEKSI AKUN ── */}
            <div className="border-b border-t border-slate-100 bg-slate-50/50 px-8 py-5">
              <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#1E5E3F]">
                <User size={15} />
                Data Akun
              </h2>
            </div>
            <div className="grid gap-5 px-8 py-7 md:grid-cols-2">

              {/* USERNAME */}
              <div className="md:col-span-2">
                <Field label="Username" required hint="Digunakan untuk login. Minimal 4 karakter, tanpa spasi." error={errors.username}>
                  <input
                    type="text"
                    value={form.username}
                    onChange={set("username")}
                    placeholder="Contoh: budi_santoso"
                    autoComplete="off"
                    className={inputCls}
                  />
                </Field>
              </div>

              {/* PASSWORD */}
              <Field label="Password" required hint="Minimal 8 karakter." error={errors.password}>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    value={form.password}
                    onChange={set("password")}
                    placeholder="Buat password"
                    className={`${inputCls} pr-11`}
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </Field>

              {/* KONFIRMASI PASSWORD */}
              <Field label="Konfirmasi Password" required error={errors.konfirmasiPassword}>
                <div className="relative">
                  <input
                    type={showKonfirm ? "text" : "password"}
                    value={form.konfirmasiPassword}
                    onChange={set("konfirmasiPassword")}
                    placeholder="Ulangi password"
                    className={`${inputCls} pr-11`}
                  />
                  <button type="button" onClick={() => setShowKonfirm(!showKonfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showKonfirm ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </Field>

            </div>

            {/* ── SEKSI C: DOKUMEN ── */}
            <div className="border-b border-t border-slate-100 bg-slate-50/50 px-8 py-5">
              <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-emerald-600">
                <Upload size={15} />
                Unggah Dokumen
              </h2>
            </div>
            <div className="grid gap-6 px-8 py-7 md:grid-cols-2">

              {/* 15. Foto KTP / SIM */}
              <UploadBox
                label="15. Foto KTP / SIM"
                required
                hint="Foto tampak depan, jelas, tidak terpotong, tidak buram"
                icon={Camera}
                accept="image/*,application/pdf"
                value={form.fotoIdentitas}
                onChange={setFile("fotoIdentitas")}
                onRemove={removeFile("fotoIdentitas")}
                error={errors.fotoIdentitas}
              />

              {/* 16. NPWP */}
              <UploadBox
                label="16. NPWP"
                hint="Unggah foto / scan NPWP (opsional jika belum memiliki)"
                icon={FileText}
                accept="image/*,application/pdf"
                value={form.fotoNPWP}
                onChange={setFile("fotoNPWP")}
                onRemove={removeFile("fotoNPWP")}
              />

              <div className="md:col-span-2 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
                <p className="text-xs font-semibold text-amber-700">⚠ Ketentuan Dokumen</p>
                <ul className="mt-1.5 space-y-1 text-xs text-amber-600">
                  <li>• Dokumen yang diunggah harus asli, valid, dan tidak kedaluwarsa</li>
                  <li>• Foto harus dalam kondisi terang, fokus, dan tidak terpotong</li>
                  <li>• Format yang diterima: PNG, JPG, JPEG, atau PDF — maksimal 5 MB</li>
                  <li>• Data Anda dijaga kerahasiaannya sesuai kebijakan privasi kami</li>
                </ul>
              </div>

            </div>

            {/* ── PERSETUJUAN & SUBMIT ── */}
            <div className="rounded-b-3xl border-t border-slate-100 bg-slate-50/50 px-8 py-7">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-emerald-600"
                />
                <span className="text-sm leading-relaxed text-slate-600">
                  Saya menyatakan bahwa semua data yang saya isi adalah{" "}
                  <strong>benar dan dapat dipertanggungjawabkan</strong>. Saya menyetujui{" "}
                  <a href="#" className="text-emerald-600 underline underline-offset-2 hover:text-emerald-700">
                    Syarat &amp; Ketentuan
                  </a>{" "}
                  dan{" "}
                  <a href="#" className="text-emerald-600 underline underline-offset-2 hover:text-emerald-700">
                    Kebijakan Privasi
                  </a>{" "}
                  KSPPS BMT Al Ittihad.
                </span>
              </label>
              {errors.agreed && (
                <p className="mt-2 flex items-center gap-1 text-xs text-red-500">
                  <AlertCircle size={11} /> {errors.agreed}
                </p>
              )}

              <button
                type="submit"
                className="mt-6 w-full rounded-xl bg-emerald-600 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[.98]"
              >
                Kirim Formulir Pendaftaran
              </button>

              <p className="mt-4 text-center text-xs text-slate-400">
                Sudah pernah mendaftar?{" "}
                <Link
                  to="/admin/dashboard"
                  className="font-medium text-emerald-600 hover:underline"
                >
                  Login ke akun Anda
                </Link>
              </p>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}
