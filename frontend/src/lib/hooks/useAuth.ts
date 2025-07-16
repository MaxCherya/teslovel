import { useCallback, useEffect, useState } from "react";
import * as authApi from "../../endpoints/auth";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

interface AuthUser {
    id: number;
    username: string;
    phone: string;
}

export const useAuth = () => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    const { t } = useTranslation();

    const login = useCallback(async (phone: string, password: string) => {
        const success = await authApi.login({ phone, password });
        if (success) {
            setUser(success);
        }
        return success;
    }, []);

    const register = useCallback(async (phone: string, password: string) => {
        const success = await authApi.register({ phone, password });
        return success;
    }, []);

    const logout = useCallback(async () => {
        const ok = await authApi.logout();
        setUser(null);
        if (ok) {
            window.location.href = "/";
        }
        else toast.error(t("logout.failure"));
    }, []);

    const refreshSession = useCallback(async () => {
        const refreshed = await authApi.refreshToken();
        if (!refreshed) {
            setUser(null);
            window.location.href = "/login";
        } else {
            setUser(refreshed);
        }
    }, []);

    useEffect(() => {
        const tryRefresh = async () => {
            const ok = await authApi.refreshToken();
            if (ok) {
                setUser(ok);
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