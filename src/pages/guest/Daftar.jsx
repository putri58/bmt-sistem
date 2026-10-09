import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import api from "../../lib/api";
import {
  User, MapPin, Upload, CheckCircle2, X, AlertCircle,
  Camera, FileText, ArrowRight, ArrowLeft, Landmark,
  ChevronRight,
} from "lucide-react";

/* ─────────────────────────────────────────
   HELPERS
───────────────────────────────────────── */
const inputCls =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/10";

const selectCls = inputCls + " cursor-pointer";

function Field({ label, required, error, hint, children }) {
  return (
    <div className="group">
      <label className="mb-1.5 block text-sm font-semibold text-slate-700">
        {label}{required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      {hint && <p className="mb-1.5 text-xs text-slate-400">{hint}</p>}
      {children}
      {error && (
        <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-500">
          <AlertCircle size={11} className="shrink-0" />{error}
        </p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   UPLOAD BOX
───────────────────────────────────────── */
function UploadBox({ label, required, hint, icon: Icon, accept = "image/*", value, onChange, onRemove, error, aspectRatio }) {
  const ref = useRef(null);
  const isImage = value && value.type?.startsWith("image/");
  const preview = isImage ? URL.createObjectURL(value) : null;

  return (
    <Field label={label} required={required} hint={hint} error={error}>
      <div
        onClick={() => !value && ref.current.click()}
        className={[
          "relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-200",
          aspectRatio === "square" ? "aspect-square" : "min-h-36",
          value
            ? "cursor-default border-emerald-300 bg-emerald-50/60"
            : "cursor-pointer border-slate-200 bg-slate-50 hover:border-emerald-400 hover:bg-emerald-50/30 hover:shadow-sm",
          error ? "border-red-300 bg-red-50/30" : "",
        ].join(" ")}
      >
        <input ref={ref} type="file" accept={accept} className="hidden"
          onChange={(e) => e.target.files[0] && onChange(e.target.files[0])} />

        {value ? (
          <>
            {isImage ? (
              <img src={preview} alt={label} className="h-full w-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-2 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                  <FileText size={24} className="text-emerald-600" />
                </div>
                <p className="text-center text-sm font-medium text-slate-700">{value.name}</p>
                <p className="text-xs text-slate-400">{(value.size / 1024).toFixed(0)} KB</p>
              </div>
            )}
            <button type="button" onClick={(e) => { e.stopPropagation(); onRemove(); }}
              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white shadow transition hover:bg-red-600">
              <X size={13} />
            </button>
            <div className="absolute bottom-0 left-0 right-0 bg-emerald-600/80 py-1.5 text-center text-xs font-medium text-white backdrop-blur-sm">
              <CheckCircle2 size={11} className="mr-1 inline" />File dipilih
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2.5 p-5 text-center">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${error ? "bg-red-100 text-red-400" : "bg-slate-100 text-slate-400 group-hover:bg-emerald-100 group-hover:text-emerald-500"}`}>
              <Icon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Klik untuk unggah</p>
              <p className="mt-0.5 text-xs text-slate-400">
                {accept.includes("pdf") ? "PNG, JPG, PDF" : "PNG, JPG"} — Maks. {accept.includes("pdf") ? "5" : "2"} MB
              </p>
            </div>
          </div>
        )}
      </div>
    </Field>
  );
}

/* ─────────────────────────────────────────
   STEP INDICATOR
───────────────────────────────────────── */
const STEPS = [
  { label: "Data Diri",    icon: User    },
  { label: "Alamat",       icon: MapPin  },
  { label: "Dokumen",      icon: Upload  },
  { label: "Konfirmasi",   icon: CheckCircle2 },
];

function StepIndicator({ current }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {STEPS.map((step, idx) => {
          const done    = idx < current;
          const active  = idx === current;
          const Icon    = step.icon;
          return (
            <div key={step.label} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-1.5">
                <div className={[
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300",
                  done   ? "border-emerald-500 bg-emerald-500 text-white"
                  : active ? "border-emerald-500 bg-white text-emerald-600 shadow-md shadow-emerald-100"
                           : "border-slate-200 bg-white text-slate-400",
                ].join(" ")}>
                  {done ? <CheckCircle2 size={18} /> : <Icon size={18} />}
                </div>
                <span className={`hidden text-xs font-semibold sm:block ${active ? "text-emerald-600" : done ? "text-emerald-500" : "text-slate-400"}`}>
                  {step.label}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div className={`mx-2 h-0.5 flex-1 rounded-full transition-all duration-500 ${done ? "bg-emerald-400" : "bg-slate-200"}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   FORM DATA & VALIDATE
───────────────────────────────────────── */
const emptyForm = {
  namaAnggota: "", noIdentitas: "", jenisIdentitas: "",
  tempatLahir: "", tanggalLahir: "", kewarganegaraan: "WNI",
  status: "", jenisKelamin: "", namaIbuKandung: "",
  alamatRumah: "", kota: "", kodePos: "", email: "", noTelp: "",
  kantorTujuan: "",
  fotoIdentitas: null, fotoNPWP: null, pasFoto: null,
};

function validateStep(form, step) {
  const e = {};
  if (step === 0) {
    if (!form.namaAnggota.trim())    e.namaAnggota    = "Nama wajib diisi";
    if (!form.noIdentitas.trim())    e.noIdentitas    = "Nomor identitas wajib diisi";
    else if (form.jenisIdentitas === "KTP" && !/^\d{16}$/.test(form.noIdentitas))
                                     e.noIdentitas    = "NIK harus 16 digit angka";
    if (!form.jenisIdentitas)        e.jenisIdentitas = "Pilih jenis identitas";
    if (!form.tempatLahir.trim())    e.tempatLahir    = "Tempat lahir wajib diisi";
    if (!form.tanggalLahir)          e.tanggalLahir   = "Tanggal lahir wajib diisi";
    if (!form.status)                e.status         = "Pilih status perkawinan";
    if (!form.jenisKelamin)          e.jenisKelamin   = "Pilih jenis kelamin";
    if (!form.namaIbuKandung.trim()) e.namaIbuKandung = "Nama ibu kandung wajib diisi";
    if (!form.kantorTujuan)          e.kantorTujuan   = "Pilih kantor tujuan";
  }
  if (step === 1) {
    if (!form.alamatRumah.trim())    e.alamatRumah    = "Alamat wajib diisi";
    if (!form.kota.trim())           e.kota           = "Kota wajib diisi";
    if (!form.kodePos.trim())        e.kodePos        = "Kode pos wajib diisi";
    else if (!/^\d{5}$/.test(form.kodePos)) e.kodePos = "Kode pos harus 5 digit";
    if (!form.email.trim())          e.email          = "Email wajib diisi";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Format email tidak valid";
    if (!form.noTelp.trim())         e.noTelp         = "Nomor telepon wajib diisi";
  }
  if (step === 2) {
    if (!form.fotoIdentitas)         e.fotoIdentitas  = "Foto KTP / SIM wajib diunggah";
    if (!form.pasFoto)               e.pasFoto        = "Pas foto wajib diunggah";
  }
  return e;
}

/* ─────────────────────────────────────────
   REVIEW ROW
───────────────────────────────────────── */
function ReviewRow({ label, value }) {
  return (
    <div className="flex items-start gap-3 rounded-xl px-4 py-3 odd:bg-slate-50">
      <span className="w-40 shrink-0 text-xs text-slate-400">{label}</span>
      <span className="flex-1 text-sm font-medium text-slate-700">{value || <span className="italic text-slate-300">—</span>}</span>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN
───────────────────────────────────────── */
export default function Daftar() {
  const [form, setForm]           = useState(emptyForm);
  const [errors, setErrors]       = useState({});
  const [step, setStep]           = useState(0);
  const [agreed, setAgreed]       = useState(false);
  const [loading, setLoading]     = useState(false);
  const [apiError, setApiError]   = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [noPendaftaran, setNoPendaftaran] = useState("");

  const set    = (key) => (e) => setForm(p => ({ ...p, [key]: e.target.value }));
  const setFile  = (key) => (file) => setForm(p => ({ ...p, [key]: file }));
  const rmFile   = (key) => ()     => setForm(p => ({ ...p, [key]: null }));

  function next() {
    const errs = validateStep(form, step);
    setErrors(errs);
    if (Object.keys(errs).length === 0) { setStep(s => s + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }
  }
  function back() { setStep(s => s - 1); window.scrollTo({ top: 0, behavior: "smooth" }); }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!agreed) { setErrors({ agreed: "Centang persetujuan terlebih dahulu" }); return; }
    setLoading(true); setApiError("");
    try {
      const fd = new FormData();
      fd.append("nama_anggota",      form.namaAnggota);
      fd.append("no_identitas",      form.noIdentitas);
      fd.append("jenis_identitas",   form.jenisIdentitas);
      fd.append("tempat_lahir",      form.tempatLahir);
      fd.append("tanggal_lahir",     form.tanggalLahir);
      fd.append("kewarganegaraan",   form.kewarganegaraan);
      fd.append("status_perkawinan", form.status);
      fd.append("jenis_kelamin",     form.jenisKelamin);
      fd.append("nama_ibu_kandung",  form.namaIbuKandung);
      fd.append("alamat_rumah",      form.alamatRumah);
      fd.append("kota",              form.kota);
      fd.append("kode_pos",          form.kodePos);
      fd.append("email",             form.email);
      fd.append("no_telp",           form.noTelp);
      fd.append("kantor_tujuan",     form.kantorTujuan);
      fd.append("foto_identitas",    form.fotoIdentitas);
      fd.append("pas_foto",          form.pasFoto);
      if (form.fotoNPWP) fd.append("foto_npwp", form.fotoNPWP);

      const res = await api.post("/daftar", fd, { headers: { "Content-Type": "multipart/form-data" } });
      setNoPendaftaran(res.data.pendaftar_id || "");
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      const msg = err.response?.data?.message || "Pendaftaran gagal, coba lagi.";
      setApiError(msg);
    } finally {
      setLoading(false);
    }
  }

  /* ── SUKSES ── */
  if (submitted) {
    const kantorLabel = {
      pusat: "Kantor Pusat", rumbai: "Cabang Rumbai",
      panam: "Cabang Panam", duri: "Cabang Duri", cibubur: "Cabang Cibubur"
    }[form.kantorTujuan] || form.kantorTujuan;

    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-6 py-20">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-xl">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 size={42} className="text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Pendaftaran Terkirim!</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            Terima kasih, <strong className="text-slate-700">{form.namaAnggota}</strong>.
            Pendaftaran Anda ke <strong className="text-slate-700">{kantorLabel}</strong> telah kami terima.
            Tim kami akan menghubungi Anda melalui WhatsApp di nomor{" "}
            <strong className="text-slate-700">+62{form.noTelp}</strong> dalam 1–2 hari kerja.
          </p>

          {/* Nomor Pendaftaran */}
          {noPendaftaran && (
            <div className="mt-4 rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50 px-5 py-4">
              <p className="text-xs text-slate-500">Nomor Pendaftaran Anda</p>
              <p className="mt-1 text-2xl font-black tracking-widest text-emerald-700">{noPendaftaran}</p>
              <p className="mt-1 text-xs text-slate-400">Simpan nomor ini untuk keperluan konfirmasi</p>
            </div>
          )}

          <div className="mt-4 rounded-2xl bg-slate-50 px-5 py-4 text-left">
            <p className="text-xs font-semibold text-slate-700">Langkah Selanjutnya:</p>
            <ul className="mt-2 space-y-1.5 text-xs text-slate-600">
              {[
                "Tunggu konfirmasi dari petugas melalui WhatsApp",
                "Siapkan dokumen asli untuk verifikasi lanjutan",
                "Lakukan pembayaran simpanan pokok setelah disetujui"
              ].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 size={12} className="mt-0.5 shrink-0 text-emerald-500" />{item}
                </li>
              ))}
            </ul>
          </div>
          <Link to="/" className="mt-6 block w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  /* ── FORM ── */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 py-12">
      <div className="mx-auto max-w-2xl px-6">

        {/* HEADER */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg shadow-emerald-200">
            <Landmark size={26} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Formulir Pendaftaran</h1>
          <p className="mt-1 text-sm text-slate-500">KSPPS BMT Al Ittihad — Lengkapi semua data dengan benar</p>
        </div>

        {/* STEP INDICATOR */}
        <StepIndicator current={step} />

        {/* CARD */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          {/* STEP HEADER */}
          <div className="border-b border-slate-100 bg-gradient-to-r from-emerald-600 to-emerald-700 px-8 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20">
                {step === 0 && <User size={18} className="text-white" />}
                {step === 1 && <MapPin size={18} className="text-white" />}
                {step === 2 && <Upload size={18} className="text-white" />}
                {step === 3 && <CheckCircle2 size={18} className="text-white" />}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-200">
                  Langkah {step + 1} dari {STEPS.length}
                </p>
                <h2 className="text-base font-bold text-white">{STEPS[step].label}</h2>
              </div>
            </div>
          </div>

          {/* ══ STEP 0: DATA DIRI ══ */}
          {step === 0 && (
            <div className="grid gap-5 px-8 py-7 md:grid-cols-2">

              <div className="md:col-span-2">
                <Field label="Nama Calon Anggota" required error={errors.namaAnggota}>
                  <input type="text" value={form.namaAnggota} onChange={set("namaAnggota")}
                    placeholder="Nama lengkap sesuai identitas" className={inputCls} />
                </Field>
              </div>

              <Field label="Jenis Identitas" required error={errors.jenisIdentitas}>
                <select value={form.jenisIdentitas} onChange={set("jenisIdentitas")} className={selectCls}>
                  <option value="">-- Pilih --</option>
                  <option value="KTP">KTP</option>
                  <option value="SIM">SIM</option>
                </select>
              </Field>

              <Field label="Nomor Identitas" required error={errors.noIdentitas}>
                <input type="text" value={form.noIdentitas} onChange={set("noIdentitas")}
                  placeholder="NIK 16 digit / Nomor SIM" maxLength={20} className={inputCls} />
              </Field>

              <Field label="Tempat Lahir" required error={errors.tempatLahir}>
                <input type="text" value={form.tempatLahir} onChange={set("tempatLahir")}
                  placeholder="Contoh: Pekanbaru" className={inputCls} />
              </Field>

              <Field label="Tanggal Lahir" required error={errors.tanggalLahir}>
                <input type="date" value={form.tanggalLahir} onChange={set("tanggalLahir")} className={inputCls} />
              </Field>

              <Field label="Kewarganegaraan" required>
                <select value={form.kewarganegaraan} onChange={set("kewarganegaraan")} className={selectCls}>
                  <option value="WNI">WNI</option>
                  <option value="WNA">WNA</option>
                </select>
              </Field>

              <Field label="Status Perkawinan" required error={errors.status}>
                <select value={form.status} onChange={set("status")} className={selectCls}>
                  <option value="">-- Pilih --</option>
                  <option value="Lajang">Lajang</option>
                  <option value="Menikah">Menikah</option>
                  <option value="Cerai Hidup">Cerai Hidup</option>
                  <option value="Cerai Mati">Cerai Mati</option>
                </select>
              </Field>

              <div className="md:col-span-2">
                <Field label="Jenis Kelamin" required error={errors.jenisKelamin}>
                  <div className="flex gap-3">
                    {["Pria", "Wanita"].map(jk => (
                      <label key={jk} className={[
                        "flex flex-1 cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 transition-all",
                        form.jenisKelamin === jk
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm shadow-emerald-100"
                          : "border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50",
                      ].join(" ")}>
                        <input type="radio" name="jenisKelamin" value={jk}
                          checked={form.jenisKelamin === jk} onChange={set("jenisKelamin")}
                          className="accent-emerald-600" />
                        <span className="text-sm font-semibold">{jk}</span>
                      </label>
                    ))}
                  </div>
                </Field>
              </div>

              <div className="md:col-span-2">
                <Field label="Nama Ibu Kandung" required error={errors.namaIbuKandung}>
                  <input type="text" value={form.namaIbuKandung} onChange={set("namaIbuKandung")}
                    placeholder="Nama ibu kandung sesuai akta lahir" className={inputCls} />
                </Field>
              </div>

              <div className="md:col-span-2">
                <Field label="Kantor Tujuan" required error={errors.kantorTujuan}
                  hint="Pilih kantor BMT AL-Ittihad yang ingin Anda tuju untuk menjadi anggota">
                  <select value={form.kantorTujuan} onChange={set("kantorTujuan")} className={selectCls}>
                    <option value="">-- Pilih Kantor Tujuan --</option>
                    <option value="pusat">Kantor Pusat</option>
                    <option value="rumbai">Cabang Rumbai</option>
                    <option value="panam">Cabang Panam</option>
                    <option value="duri">Cabang Duri</option>
                    <option value="cibubur">Cabang Cibubur</option>
                  </select>
                </Field>
              </div>
            </div>
          )}

          {/* ══ STEP 1: ALAMAT & KONTAK ══ */}
          {step === 1 && (
            <div className="grid gap-5 px-8 py-7 md:grid-cols-2">

              <div className="md:col-span-2">
                <Field label="Alamat Rumah" required error={errors.alamatRumah}>
                  <textarea value={form.alamatRumah} onChange={set("alamatRumah")} rows={3}
                    placeholder="Jalan, nomor rumah, RT/RW, Kelurahan, Kecamatan"
                    className={`${inputCls} resize-none`} />
                </Field>
              </div>

              <Field label="Kota" required error={errors.kota}>
                <input type="text" value={form.kota} onChange={set("kota")}
                  placeholder="Contoh: Pekanbaru" className={inputCls} />
              </Field>

              <Field label="Kode Pos" required error={errors.kodePos}>
                <input type="text" value={form.kodePos} onChange={set("kodePos")}
                  placeholder="5 digit" maxLength={5} className={inputCls} />
              </Field>

              <div className="md:col-span-2">
                <Field label="Email" required error={errors.email}>
                  <input type="email" value={form.email} onChange={set("email")}
                    placeholder="contoh@email.com" className={inputCls} />
                </Field>
              </div>

              <div className="md:col-span-2">
                <Field label="No. Telepon / HP" required error={errors.noTelp}>
                  <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-500/10">
                    <span className="flex items-center border-r border-slate-200 bg-slate-100 px-4 text-sm font-semibold text-slate-500">+62</span>
                    <input type="tel" value={form.noTelp} onChange={set("noTelp")}
                      placeholder="8123456789"
                      className="w-full bg-transparent px-4 py-2.5 text-sm text-slate-800 outline-none" />
                  </div>
                </Field>
              </div>
            </div>
          )}

          {/* ══ STEP 2: DOKUMEN ══ */}
          {step === 2 && (
            <div className="px-8 py-7 space-y-6">

              <div className="grid gap-5 md:grid-cols-2">
                {/* Foto KTP/SIM */}
                <UploadBox label="Foto KTP / SIM" required
                  hint="Tampak depan, jelas, tidak terpotong"
                  icon={Camera} accept="image/*,application/pdf"
                  value={form.fotoIdentitas}
                  onChange={setFile("fotoIdentitas")}
                  onRemove={rmFile("fotoIdentitas")}
                  error={errors.fotoIdentitas} />

                {/* Pas Foto */}
                <UploadBox label="Pas Foto 3×4" required
                  hint="1 lembar, background bebas, wajah jelas"
                  icon={Camera} accept="image/*"
                  value={form.pasFoto}
                  onChange={setFile("pasFoto")}
                  onRemove={rmFile("pasFoto")}
                  error={errors.pasFoto}
                  aspectRatio="square" />
              </div>

              {/* NPWP */}
              <UploadBox label="NPWP" hint="Opsional — unggah jika sudah memiliki NPWP"
                icon={FileText} accept="image/*,application/pdf"
                value={form.fotoNPWP}
                onChange={setFile("fotoNPWP")}
                onRemove={rmFile("fotoNPWP")} />

              <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
                <p className="text-xs font-semibold text-amber-700">⚠ Ketentuan Dokumen</p>
                <ul className="mt-1.5 space-y-1 text-xs text-amber-600">
                  <li>• Dokumen harus asli, valid, dan tidak kedaluwarsa</li>
                  <li>• Foto harus terang, fokus, dan tidak terpotong</li>
                  <li>• Format: PNG, JPG, PDF — maks. 5 MB (NPWP/KTP), maks. 2 MB (pas foto)</li>
                  <li>• Data Anda dijaga kerahasiaannya sesuai kebijakan privasi kami</li>
                </ul>
              </div>
            </div>
          )}

          {/* ══ STEP 3: KONFIRMASI ══ */}
          {step === 3 && (
            <form onSubmit={handleSubmit}>
              <div className="px-8 py-7 space-y-6">

                {/* RINGKASAN DATA DIRI */}
                <div>
                  <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                    <User size={13} /> Data Diri
                  </p>
                  <div className="overflow-hidden rounded-2xl border border-slate-100">
                    <ReviewRow label="Nama"             value={form.namaAnggota} />
                    <ReviewRow label="Jenis Identitas"  value={form.jenisIdentitas} />
                    <ReviewRow label="Nomor Identitas"  value={form.noIdentitas} />
                    <ReviewRow label="Tempat Lahir"     value={form.tempatLahir} />
                    <ReviewRow label="Tanggal Lahir"    value={form.tanggalLahir} />
                    <ReviewRow label="Kewarganegaraan"  value={form.kewarganegaraan} />
                    <ReviewRow label="Status"           value={form.status} />
                    <ReviewRow label="Jenis Kelamin"    value={form.jenisKelamin} />
                    <ReviewRow label="Nama Ibu Kandung" value={form.namaIbuKandung} />
                    <ReviewRow label="Kantor Tujuan"    value={
                      { pusat: "Kantor Pusat", rumbai: "Cabang Rumbai", panam: "Cabang Panam",
                        duri: "Cabang Duri", cibubur: "Cabang Cibubur" }[form.kantorTujuan] || "-"
                    } />
                  </div>
                </div>

                {/* RINGKASAN ALAMAT */}
                <div>
                  <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                    <MapPin size={13} /> Alamat &amp; Kontak
                  </p>
                  <div className="overflow-hidden rounded-2xl border border-slate-100">
                    <ReviewRow label="Alamat"    value={form.alamatRumah} />
                    <ReviewRow label="Kota"      value={form.kota} />
                    <ReviewRow label="Kode Pos"  value={form.kodePos} />
                    <ReviewRow label="Email"     value={form.email} />
                    <ReviewRow label="No. Telp"  value={`+62${form.noTelp}`} />
                  </div>
                </div>

                {/* RINGKASAN DOKUMEN */}
                <div>
                  <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                    <Upload size={13} /> Dokumen
                  </p>
                  <div className="overflow-hidden rounded-2xl border border-slate-100">
                    <ReviewRow label="Foto Identitas" value={form.fotoIdentitas ? `✅ ${form.fotoIdentitas.name}` : "—"} />
                    <ReviewRow label="Pas Foto 3×4"   value={form.pasFoto ? `✅ ${form.pasFoto.name}` : "—"} />
                    <ReviewRow label="NPWP"           value={form.fotoNPWP ? `✅ ${form.fotoNPWP.name}` : "Tidak diunggah"} />
                  </div>
                </div>

                {/* PERSETUJUAN */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <label className="flex cursor-pointer items-start gap-3">
                    <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)}
                      className="mt-0.5 h-4 w-4 accent-emerald-600" />
                    <span className="text-sm leading-relaxed text-slate-600">
                      Saya menyatakan bahwa semua data yang saya isi adalah{" "}
                      <strong>benar dan dapat dipertanggungjawabkan</strong>. Saya menyetujui{" "}
                      <a href="#" className="text-emerald-600 underline underline-offset-2 hover:text-emerald-700">Syarat &amp; Ketentuan</a>{" "}
                      dan{" "}
                      <a href="#" className="text-emerald-600 underline underline-offset-2 hover:text-emerald-700">Kebijakan Privasi</a>{" "}
                      KSPPS BMT Al Ittihad.
                    </span>
                  </label>
                  {errors.agreed && (
                    <p className="mt-2 flex items-center gap-1 text-xs font-medium text-red-500">
                      <AlertCircle size={11} />{errors.agreed}
                    </p>
                  )}
                </div>

                {apiError && (
                  <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    <AlertCircle size={16} className="shrink-0" />{apiError}
                  </div>
                )}
              </div>

              {/* SUBMIT BUTTON */}
              <div className="border-t border-slate-100 px-8 py-5 flex gap-3">
                <button type="button" onClick={back}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
                  <ArrowLeft size={16} /> Kembali
                </button>
                <button type="submit" disabled={loading}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-60">
                  {loading ? (
                    <><svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>Mengirim...</>
                  ) : <><CheckCircle2 size={17} />Kirim Pendaftaran</>}
                </button>
              </div>
            </form>
          )}

          {/* NAV BUTTON (step 0-2) */}
          {step < 3 && (
            <div className="border-t border-slate-100 px-8 py-5 flex justify-between">
              {step > 0 ? (
                <button onClick={back}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
                  <ArrowLeft size={16} /> Kembali
                </button>
              ) : (
                <Link to="/informasi"
                  className="flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-500 transition hover:bg-slate-50">
                  Lihat Syarat
                </Link>
              )}
              <button onClick={next}
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[.98]">
                Lanjut <ArrowRight size={16} />
              </button>
            </div>
          )}

        </div>

        <p className="mt-5 text-center text-xs text-slate-400">
          Sudah memiliki akun?{" "}
          <Link to="/login" className="font-semibold text-emerald-600 hover:underline">Login di sini</Link>
        </p>

      </div>
    </div>
  );
}
