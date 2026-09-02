import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Landmark, AlertCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login, loginError, clearError } = useAuth();

  const [form, setForm]         = useState({ username: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading]   = useState(false);

  const set = (key) => (e) => {
    clearError();
    setForm((p) => ({ ...p, [key]: e.target.value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.username || !form.password) return;

    setLoading(true);
    // Simulasi network delay 600ms
    await new Promise((r) => setTimeout(r, 600));

    const role = login(form.username, form.password, remember);
    setLoading(false);

    if (role === "admin")   navigate("/admin/dashboard");
    if (role === "anggota") navigate("/member/dashboard");
  }

  const inputCls =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#1E5E3F] focus:bg-white";

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md">

        {/* CARD */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">

          {/* LOGO */}
          <div className="mb-7 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1E5E3F] to-[#2E8B57] shadow-lg">
              <Landmark size={26} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-800">Masuk ke Akun Anda</h1>
            <p className="mt-1 text-sm text-slate-500">KSPPS BMT Al Ittihad</p>
          </div>

          {/* ERROR */}
          {loginError && (
            <div className="mb-5 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              <AlertCircle size={16} className="shrink-0" />
              {loginError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* USERNAME */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Username
              </label>
              <input
                type="text"
                value={form.username}
                onChange={set("username")}
                placeholder="Masukkan username"
                autoComplete="username"
                required
                className={inputCls}
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={set("password")}
                  placeholder="Masukkan password"
                  autoComplete="current-password"
                  required
                  className={`${inputCls} pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* INGAT SAYA */}
            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 accent-[#1E5E3F]"
                />
                Ingat saya
              </label>
              <a href="#" className="text-sm font-medium text-[#1E5E3F] hover:underline">
                Lupa password?
              </a>
            </div>

            {/* TOMBOL LOGIN */}
            <button
              type="submit"
              disabled={loading || !form.username || !form.password}
              className="w-full rounded-xl bg-[#1E5E3F] py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#174d33] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Memproses...
                </span>
              ) : (
                "Login"
              )}
            </button>

          </form>

          {/* DIVIDER */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 border-t border-slate-200" />
            <span className="text-xs text-slate-400">atau</span>
            <div className="flex-1 border-t border-slate-200" />
          </div>

          {/* LINK DAFTAR */}
          <p className="text-center text-sm text-slate-500">
            Belum memiliki akun?{" "}
            <Link to="/daftar" className="font-semibold text-[#1E5E3F] hover:underline">
              Daftar Sekarang
            </Link>
          </p>

        </div>

        {/* DEMO CREDENTIALS */}
        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
          <p className="mb-2 text-xs font-bold text-slate-500">Demo Akun:</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-lg bg-slate-50 p-2">
              <p className="font-semibold text-slate-700">Admin</p>
              <p className="text-slate-500">admin / admin123</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-2">
              <p className="font-semibold text-slate-700">Anggota</p>
              <p className="text-slate-500">anggota / anggota123</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
