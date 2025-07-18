import { fetcher } from "../lib/fetchers/fetcher";

export interface AdminUser {
    id: number;
    username: string;
    phone: string;
    is_staff: boolean;
    has_2fa_enabled: boolean;
}

export interface PaginatedUsersResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: AdminUser[];
}

export const fetchPaginatedUsers = async (
    page: number = 1,
    searchQuery: string = ""
): Promise<PaginatedUsersResponse> => {
    const params = new URLSearchParams({ page: String(page) });
    if (searchQuery) params.append("q", searchQuery);

    const res = await fetcher(`/api/accounts/users/?${params.toString()}`);
    if (!res.ok) throw new Error("Failed to fetch users");
    return await res.json();
};

export const assignSuperuser = async (
    userId: number,
    otpCode?: string
): Promise<void> => {
    const res = await fetcher(`/api/accounts/assign-superuser/`, {
        method: "POST",
        body: JSON.stringify({ user_id: userId, otp_code: otpCode }),
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "Failed to assign superuser");
    }
};

export const removeSuperuser = async (
    userId: number
): Promise<void> => {
    const res = await fetcher(`/api/accounts/remove-superuser/`, {
        method: "POST",
        body: JSON.stringify({ user_id: userId }),
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "Failed to remove superuser");
    }
};

export interface OverviewStats {
    total_revenue: number;
    monthly_revenue: number;
    today_revenue: number;
    total_rides: number;
    total_clients: number;
    total_expenses: number;
    monthly_expenses: number;
    today_expenses: number;
}

export const fetchOverviewStats = async (): Promise<OverviewStats> => {
    const res = await fetcher("/api/orders/overview-stats/");
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "Failed to fetch overview stats");
    }
    return await res.json();
};