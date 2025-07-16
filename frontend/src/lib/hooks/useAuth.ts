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
        const res = await authApi.login({ phone, password });

        if (res?.otp_required) {
            return { otp_required: true };
        }

        if (res) {
            setUser(res);
            return res;
        }

        return false;
    }, []);

    const loginWithOtp = useCallback(async (phone: string, password: string, otp_code: string) => {
        const res = await authApi.verifyOtpLogin({ phone, password, otp_code });
        if (res) {
            setUser(res);
            return true;
        }
        return false;
    }, []);

    const register = useCallback(async (phone: string, password: string) => {
        return await authApi.register({ phone, password });
    }, []);

    const logout = useCallback(async () => {
        const ok = await authApi.logout();
        setUser(null);
        if (ok) {
            window.location.href = "/";
        } else {
            toast.error(t("logout.failure"));
        }
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
        loginWithOtp,
        register,
        logout,
        refreshSession,
    };
};