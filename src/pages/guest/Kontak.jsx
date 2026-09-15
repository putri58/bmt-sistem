import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ChevronRight,
  Info,
} from "lucide-react";

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
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-x-5xl px-6">
          {/* HEADER */}
          <div className="mb-10 text-center animate-[fadeIn_0.6s_ease-out]">
            <span className="mb-2 inline-block text-sm font-bold uppercase tracking-widest text-[#1E5E3F]">
              HUBUNGI KAMI
            </span>
            <h2 className="text-3xl font-bold text-slate-800">
              INFORMASI KONTAK
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-500">
              Silahkan hubungi kami melalui kontak yang tersedia untuk
              mendapatkan informasi lebih lanjut mengenai layanan BMT
              AL-ITTIHAD.
            </p>
          </div>
          {/* Content */}
          <div className="flex w-full justify-center">
            {/* Kontak */}
            <div className="space-y-4">
              {[
                {
                  icon: Mail,
                  title: "Kantor Pusat",
                  lines: ["bmt@al-ittihad.org"],
                },
                {
                  icon: Mail,
                  title: "Kantor Cabang Duri",
                  lines: ["bmtalittihadduri@yahoo.com"],
                },
                {
                  icon: Mail,
                  title: "Kantor Cabang Rumbai",
                  lines: ["bmtalittihadrbi@yahoo.com"],
                },
                {
                  icon: Mail,
                  title: "Kantor Cabang Cibubur",
                  lines: ["bmtalittihadcibb@gmail.com"],
                },
                {
                  icon: Mail,
                  title: "Kantor Cabang Panam",
                  lines: ["bmtalittihadpanam@yahoo.com"],
                },
              ].map((c, index) => {
                const Icon = c.icon;

                return (
                  <div
                    key={c.title}
                    className="group flex cursor-pointer gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1E5E3F]/30 hover:shadow-lg"
                    style={{
                      animation: `fadeUp 0.5s ease-out ${index * 0.1}s both`,
                    }}
                  >
                    {/* ICON */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1E5E3F]/10 text-[#1E5E3F] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#1E5E3F] group-hover:text-white">
                      <Icon
                        size={21}
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>

                    {/* TEXT */}
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-slate-800 transition-colors duration-300 group-hover:text-[#1E5E3F]">
                        {c.title}
                      </p>

                      {c.lines.map((l, i) => (
                        <p key={l} className="mt-1 text-sm text-slate-500">
                          {l}

                          {/* BADGE WHATSAPP */}
                          {c.title === "Telepon" && i === 1 && (
                            <span className="ml-2 inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
                              WhatsApp
                            </span>
                          )}
                        </p>
                      ))}
                    </div>

                    {/* ARROW */}
                    <div className="flex items-center text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#1E5E3F]">
                      <ChevronRight size={20} />
                    </div>
                  </div>
                );
              })}
              {/* Jam operasional */}
              <div
                className="relative overflow-hidden rounded-2xl border border-[#1E5E3F]/20 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  animation: "fadeUp 0.6s ease-out 0.3s both",
                }}
              >
                {/*Dekorasi*/}
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#1E5E3F]/5" />
                <div className="relative">
                  {/*Title*/}
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1E5E3F]/10 text-[#1E5E3F]">
                        <Clock size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800">
                          Jam Operasional
                        </h3>
                        <p className="text-xs text-slate-400">
                          Waktu Pelayanan Kantor
                        </p>
                      </div>
                    </div>
                    {/*Status*/}
                    <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                      Aktif
                    </span>
                  </div>
                  {/* Jadwal */}
                  <div className="space-y-3">
                    {[
                      {
                        hari: "Senin - Jumat",
                        jam: "08.00 - 16.00 WIB",
                        aktif: true,
                      },
                      {
                        hari: "Sabtu",
                        jam: "09.00 - 12.00 WIB",
                        aktif: true,
                      },
                      {
                        hari: "Minggu & Libur",
                        jam: "Tutup",
                        aktif: false,
                      },
                    ].map((j) => (
                      <div
                        key={j.hari}
                        className="group flex items-center justify-between rounded-xl border border-slare-100 bg-slate-50 px-4 py-3 transition-all duration-300 hover:border-[#1E5E3F]/20 hover:bg-[#1E5E3F]/5"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`h-2.5 w-2.5 rounded-full ${
                              j.aktif ? "bg-emerald-500" : "bg-red-400"
                            }`}
                          />
                          <span className="text-sm font-medium text-slate-600">
                            {j.hari}
                          </span>
                        </div>
                        <span
                          className={`text-sm font-semibold ${
                            j.aktif ? "text-[#1E5E3F]" : "text-red-500"
                          }`} 
                         >
                          {j.jam}
                        </span>
                      </div>
                    ))}
                  </div>
                  {/* INFO BAWAH */}
                  <div className="mt-6 rounded-xl bg-[#1E5E3F]/5 p-4">
                    <div className="flex gap-3">
                      <Info
                        size={18}
                        className="mt-0.5 shirk-0 text-[#1E5E3F]"
                      />
                      <p className="text-xs leading-relaxed text-slate-500">
                        Untuk Mendapatkan pelayanan terbaik, disarankan datang
                        sesuai dengan jam operasional yang telah di tentukan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Animasi */}
          <style>
            {`
      @keyframes fadeUp {
        from {
          opacity: 0;
          transform: translateY(15px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    `}
          </style>
        </div>
      </section>
    </div>
  );
}
