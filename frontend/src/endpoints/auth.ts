const BASE_URL = "/api/accounts";

export interface AuthCredentials {
    phone: string;
    password: string;
}

export const register = async (credentials: AuthCredentials): Promise<boolean> => {
    try {
        const response = await fetch(`${BASE_URL}/register/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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

export const login = async (credentials: AuthCredentials): Promise<boolean> => {
    try {
        const response = await fetch(`${BASE_URL}/login/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(credentials),
        });

        if (!response.ok) throw new Error("Login failed");
        return true;
    } catch (error) {
        console.error("Login error:", error);
        return false;
    }
};

export const logout = async (): Promise<void> => {
    try {
        await fetch(`${BASE_URL}/logout/`, {
            method: "POST",
            credentials: "include",
        });
    } catch (error) {
        console.error("Logout error:", error);
    }
};

export const refreshToken = async (): Promise<boolean> => {
    try {
        const res = await fetch(`${BASE_URL}/token/refresh/`, {
            method: "POST",
            credentials: "include",
        });

        if (!res.ok) throw new Error("Token refresh failed");
        return true;
    } catch (error) {
        console.error("Token refresh error:", error);
        return false;
    }
};