import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as authApi from "../../endpoints/auth";

interface AuthUser {
    phone: string;
}

export const useAuth = () => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const login = useCallback(async (phone: string, password: string) => {
        const success = await authApi.login({ phone, password });
        if (success) {
            setUser({ phone });
        }
        return success;
    }, []);

    const register = useCallback(async (phone: string, password: string) => {
        const success = await authApi.register({ phone, password });
        return success;
    }, []);

    const logout = useCallback(async () => {
        await authApi.logout();
        setUser(null);
        navigate("/login");
    }, [navigate]);

    const refreshSession = useCallback(async () => {
        const refreshed = await authApi.refreshToken();
        if (!refreshed) {
            setUser(null);
            navigate("/login");
        }
    }, [navigate]);

    useEffect(() => {
        const tryRefresh = async () => {
            const ok = await authApi.refreshToken();
            if (ok) {
                // Optionally, fetch actual user info from API
                setUser({ phone: "unknown" }); // Replace with actual fetch if needed
            }
            setLoading(false);
        };

        tryRefresh();
    }, []);

    return {
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        refreshSession,
    };
};