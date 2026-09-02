import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";

export default function Kontak() {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    noHp: "",
    pesan: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSent(true);
  }

  const inputCls =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#1E5E3F] focus:bg-white";

  return (
    <div>
      {/* HERO */}
      <section
        className="relative bg-cover bg-center py-16 text-white"
        style={{
          backgroundImage: `url("https://ykpialittihad.or.id/wp-content/uploads/2025/02/bmt-alittihad.png")`,
        }}
      >
        {/* Gradasi overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a2e1a] via-[#0a2e1a]/60 to-transparent"></div>

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <span className="mb-3 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-green-300">
            Kontak
          </span>

          <h1 className="text-3xl font-bold md:text-4xl">Hubungi Kami</h1>

          <p className="mx-auto mt-4 max-w-xl text-green-100">
            Kami siap membantu anda. Hubungi kami melalui salah satu cara di
            bawah ini.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-14">
        <div className="mx-auto max-w-2xl px-6">

          {/* INFO KONTAK */}
          <h2 className="mb-8 text-center text-2xl font-bold text-slate-800">
            Informasi Kontak
          </h2>

          <div className="space-y-4">
            {[
              {
                icon: MapPin,
                title: "Kantor Pusat",
                lines: ["Jl. Raya Al Ittihad No. 1", "Pekanbaru, Riau 28111"],
              },
              {
                icon: Phone,
                title: "Telepon",
                lines: ["(0761) 123-4567", "WhatsApp: 0812-3456-7890"],
              },
              {
                icon: Mail,
                title: "Email",
                lines: ["info@bmtalittihad.id", "admin@bmtalittihad.id"],
              },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.title}
                  className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1E5E3F]/10 text-[#1E5E3F]">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{c.title}</p>
                    {c.lines.map((l) => (
                      <p key={l} className="mt-0.5 text-sm text-slate-500">{l}</p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* JAM OPERASIONAL */}
          <div className="mt-6 rounded-2xl border border-[#1E5E3F]/20 bg-[#1E5E3F]/5 p-5">
            <div className="mb-3 flex items-center gap-2">
              <Clock size={18} className="text-[#1E5E3F]" />
              <h3 className="font-bold text-slate-800">Jam Operasional</h3>
            </div>
            <div className="space-y-2 text-sm">
              {[
                { hari: "Senin – Jumat", jam: "08.00 – 16.00 WIB" },
                { hari: "Sabtu",         jam: "08.00 – 12.00 WIB" },
                { hari: "Minggu & Libur", jam: "Tutup" },
              ].map((j) => (
                <div key={j.hari} className="flex items-center justify-between">
                  <span className="text-slate-600">{j.hari}</span>
                  <span className={`font-semibold ${j.jam === "Tutup" ? "text-red-500" : "text-[#1E5E3F]"}`}>
                    {j.jam}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* FORM PESAN */}
          <div className="mt-10">
            <h2 className="mb-6 text-center text-2xl font-bold text-slate-800">Kirim Pesan</h2>

            {sent ? (
              <div className="flex flex-col items-center justify-center rounded-3xl border border-green-200 bg-green-50 p-10 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle2 size={36} className="text-[#1E5E3F]" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Pesan Terkirim!</h3>
                <p className="mt-2 text-sm text-slate-500">
                  Terima kasih, <strong>{form.nama}</strong>. Kami akan membalas secepatnya melalui{" "}
                  <strong>{form.email}</strong>.
                </p>
                <button
                  onClick={() => { setForm({ nama: "", email: "", noHp: "", pesan: "" }); setSent(false); }}
                  className="mt-5 rounded-xl bg-[#1E5E3F] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#174d33] transition"
                >
                  Kirim Pesan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input type="text" value={form.nama} onChange={set("nama")} placeholder="Nama Anda" required className={inputCls} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input type="email" value={form.email} onChange={set("email")} placeholder="email@domain.com" required className={inputCls} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">No. HP</label>
                    <input type="tel" value={form.noHp} onChange={set("noHp")} placeholder="08xxxxxxxxxx" className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Pesan <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={form.pesan}
                    onChange={set("pesan")}
                    rows={5}
                    placeholder="Tuliskan pesan, pertanyaan, atau saran Anda..."
                    required
                    className={`${inputCls} resize-none`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1E5E3F] py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#174d33] disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      Mengirim...
                    </>
                  ) : (
                    <><Send size={15} /> Kirim Pesan</>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
