import { createContext, useContext, useState } from "react";
import api from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(() => {
        const saved = localStorage.getItem("ksp_user");
        return saved ? JSON.parse(saved) : null;
    });

    const [loginError, setLoginError] = useState("");
    const [loginLoading, setLoginLoading] = useState(false);

    async function login(username, password, remember = false) {
        setLoginLoading(true);
        setLoginError("");

        try {
            const res = await api.post('/login', { username, password });
            const { user, token } = res.data;

            // Simpan token dan data user
            localStorage.setItem('token', token);
            localStorage.setItem('ksp_user', JSON.stringify(user));

            setCurrentUser(user);
            return user.role;

        } catch (err) {
            const msg = err.response?.data?.message || "Username atau password salah.";
            setLoginError(msg);
            return null;        } finally {
            setLoginLoading(false);
        }
    }

    async function logout() {
        try {
            await api.post('/logout');
        } catch (_) {
            // tetap logout meski request gagal
        }
        setCurrentUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('ksp_user');
    }

    function clearError() {
        setLoginError("");
    }

    const isAdmin   = currentUser?.role === "admin";
    const isAnggota = currentUser?.role === "anggota";

    return (
        <AuthContext.Provider value={{
            currentUser,
            isAdmin,
            isAnggota,
            loginError,
            loginLoading,
            login,
            logout,
            clearError,
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
