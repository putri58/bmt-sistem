import { createContext, useContext, useState } from "react";

/* ─────────────────────────────────────────────────────────
   DUMMY CREDENTIALS
   Admin  : username "admin"    password "admin123"
   Anggota: username "anggota"  password "anggota123"
            username "sari"     password "sari123"
────────────────────────────────────────────────────────── */
const DUMMY_USERS = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    role: "admin",
    nama: "Admin Koperasi",
    email: "admin@bmtalittihad.id",
  },
  {
    id: 2,
    username: "anggota",
    password: "anggota123",
    role: "anggota",
    nama: "Putri Agustin",
    email: "putri@email.com",
    nomorAnggota: "KSP-00124",
    noIdentitas: "3201234567890001",
    tempatLahir: "Pekanbaru",
    tanggalLahir: "1995-06-20",
    jenisKelamin: "Wanita",
    alamat: "Jl. Tuanku Tambusai No. 5, Pekanbaru",
    kota: "Pekanbaru",
    kodePos: "28111",
    noHp: "081234567890",
    tglMasuk: "2024-01-15",
    statusAnggota: "Aktif",
  },
  {
    id: 3,
    username: "sari",
    password: "sari123",
    role: "anggota",
    nama: "Sari Wulandari",
    email: "sari@email.com",
    nomorAnggota: "KSP-00001",
    noIdentitas: "3201234567890002",
    tempatLahir: "Bandung",
    tanggalLahir: "1990-05-12",
    jenisKelamin: "Wanita",
    alamat: "Jl. Mawar No. 12, Bandung",
    kota: "Bandung",
    kodePos: "40111",
    noHp: "082345678901",
    tglMasuk: "2024-01-12",
    statusAnggota: "Aktif",
  },
];

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    // Cek localStorage untuk "ingat saya"
    const saved = localStorage.getItem("ksp_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [loginError, setLoginError] = useState("");

  /* Login — kembalikan role jika berhasil, null jika gagal */
  function login(username, password, remember = false) {
    const found = DUMMY_USERS.find(
      (u) =>
        u.username.toLowerCase() === username.toLowerCase() &&
        u.password === password
    );

    if (!found) {
      setLoginError("Username atau password salah.");
      return null;
    }

    // Jangan simpan password di state/storage
    const { password: _pw, ...safeUser } = found;
    setCurrentUser(safeUser);
    setLoginError("");

    if (remember) {
      localStorage.setItem("ksp_user", JSON.stringify(safeUser));
    }

    return safeUser.role;
  }

  function logout() {
    setCurrentUser(null);
    localStorage.removeItem("ksp_user");
  }

  function clearError() {
    setLoginError("");
  }

  const isAdmin   = currentUser?.role === "admin";
  const isAnggota = currentUser?.role === "anggota";

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAdmin,
        isAnggota,
        loginError,
        login,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth harus dipakai di dalam AuthProvider");
  return ctx;
}
