import { createContext, useContext, useState } from "react";
import api from "../lib/api";

const AuthContext = createContext(null);

// Map kantor → path dashboard admin
export const KANTOR_DASHBOARD = {
  pusat:   "/admin/pusat",
  rumbai:  "/admin/rumbai",
  panam:   "/admin/panam",
  duri:    "/admin/duri",
  cibubur: "/admin/cibubur",
};

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(() => {
        const saved = localStorage.getItem("ksp_user");
        return saved ? JSON.parse(saved) : null;
    });

    const [loginError, setLoginError]     = useState("");
    const [loginLoading, setLoginLoading] = useState(false);

    async function login(username, password) {
        setLoginLoading(true);
        setLoginError("");

        try {
            const res = await api.post('/login', { username, password });
            const { user, token } = res.data;

            localStorage.setItem('token', token);
            localStorage.setItem('ksp_user', JSON.stringify(user));
            setCurrentUser(user);

            // Return redirect path berdasarkan role & kantor
            if (user.role === 'superadmin') return '/admin/superadmin';
            if (user.role === 'admin' && user.kantor) return KANTOR_DASHBOARD[user.kantor];
            if (user.role === 'anggota') return '/member/dashboard';
            return '/';

        } catch (err) {
            const msg = err.response?.data?.message || "Username atau password salah.";
            setLoginError(msg);
            return null;
        } finally {
            setLoginLoading(false);
        }
    }

    async function logout() {
        try { await api.post('/logout'); } catch (_) {}
        setCurrentUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('ksp_user');
    }

    function clearError() { setLoginError(""); }

    const isSuperAdmin = currentUser?.role === "superadmin";
    const isAdmin      = currentUser?.role === "admin";
    const isAnggota    = currentUser?.role === "anggota";

    // Dapatkan redirect path untuk user yang sudah login (misal akses /login lagi)
    function getDashboardPath() {
        if (!currentUser) return '/';
        if (currentUser.role === 'superadmin') return '/admin/superadmin';
        if (currentUser.role === 'admin' && currentUser.kantor) return KANTOR_DASHBOARD[currentUser.kantor];
        if (currentUser.role === 'anggota') return '/member/dashboard';
        return '/';
    }

    return (
        <AuthContext.Provider value={{
            currentUser,
            isSuperAdmin,
            isAdmin,
            isAnggota,
            loginError,
            loginLoading,
            login,
            logout,
            clearError,
            getDashboardPath,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth harus dipakai di dalam AuthProvider");
    return ctx;
}
