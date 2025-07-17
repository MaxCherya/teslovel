import i18n from "../locales";

const BASE_URL = "/api/accounts";

export interface AuthCredentials {
    phone: string;
    password: string;
}

export const setupOtp = async (): Promise<{ qr_code_base64: string; otp_uri: string } | false> => {
    try {
        const response = await fetch(`${BASE_URL}/2fa/setup/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Language": i18n.language || "uk",
            },
            credentials: "include",
        });

        if (!response.ok) throw new Error("OTP setup failed");
        return await response.json();
    } catch (error) {
        console.error("OTP setup error:", error);
        return false;
    }
};

export const confirmOtp = async (otp_code: string): Promise<boolean> => {
    try {
        const response = await fetch(`${BASE_URL}/2fa/confirm/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Language": i18n.language || "uk",
            },
            credentials: "include",
            body: JSON.stringify({ otp_code }),
        });

        if (!response.ok) throw new Error("OTP confirmation failed");
        return true;
    } catch (error) {
        console.error("OTP confirmation error:", error);
        return false;
    }
};

export const register = async (credentials: AuthCredentials): Promise<boolean> => {
    try {
        const response = await fetch(`${BASE_URL}/register/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'X-Language': i18n.language || "uk",
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) throw new Error("Registration failed");
        return true;
    } catch (error) {
        console.error("Registration error:", error);
        return false;
    }
};

export const login = async (credentials: AuthCredentials): Promise<any> => {
    try {
        const response = await fetch(`${BASE_URL}/login/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'X-Language': i18n.language || "uk",
            },
            credentials: "include",
            body: JSON.stringify(credentials),
        });

        if (!response.ok) throw new Error("Login failed");
        return await response.json();
    } catch (error) {
        console.error("Login error:", error);
        return false;
    }
};

export const logout = async (): Promise<boolean> => {
    try {
        await fetch(`${BASE_URL}/logout/`, {
            headers: {
                'X-Language': i18n.language || "uk",
            },
            method: "POST",
            credentials: "include",
        });
        return true;
    } catch (error) {
        console.error("Logout error:", error);
        return false;
    }
};

export const refreshToken = async (): Promise<any> => {
    try {
        const res = await fetch(`${BASE_URL}/token/refresh/`, {
            headers: {
                'X-Language': i18n.language || "uk",
            },
            method: "POST",
            credentials: "include",
        });

        if (!res.ok) throw new Error("Token refresh failed");
        return await res.json();
    } catch (error) {
        console.error("Token refresh error:", error);
        return false;
    }
};

export const verifyOtpLogin = async (credentials: AuthCredentials & { otp_code: string }): Promise<any> => {
    try {
        const response = await fetch(`${BASE_URL}/2fa/verify-login/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Language": i18n.language || "uk",
            },
            credentials: "include",
            body: JSON.stringify(credentials),
        });

        if (!response.ok) throw new Error("OTP login failed");
        return await response.json();
    } catch (error) {
        console.error("OTP login error:", error);
        return false;
    }
};

export const disableOtp = async (otp_code: string): Promise<boolean> => {
    try {
        const response = await fetch(`${BASE_URL}/2fa/disable/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Language": i18n.language || "uk",
            },
            credentials: "include",
            body: JSON.stringify({ otp_code }),
        });

        if (!response.ok) throw new Error("OTP disable failed");
        return true;
    } catch (error) {
        console.error("OTP disable error:", error);
        return false;
    }
};

export const check2FAStatus = async (): Promise<boolean> => {
    const res = await fetch(`${BASE_URL}/2fa-status/`, {
        method: "GET",
        credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to fetch 2FA status");

    const data = await res.json();
    return data.has_2fa_enabled === true;
};
