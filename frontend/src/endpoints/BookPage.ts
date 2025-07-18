import { fetcher } from "../lib/fetchers/fetcher";
import i18n from "../locales";

interface OrderUploadPayload {
    bike: number;
    name: string;
    phone: string;
    comments: string;
    start_date: string;
    end_date: string;
    formRenderedAt: string;
    user_email: string;
}

export const uploadOrderRequest = async ({
    payload,
}: {
    payload: OrderUploadPayload;
}) => {
    try {
        const response = await fetch("/api/orders/upload-order-request/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'X-Language': i18n.language || "uk",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("❌ Order request failed:", errorData);
            throw new Error("Failed to upload order request");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error uploading order request:", error);
        return null;
    }
};



export interface BusyDayRange {
    start: string;
    end: string;
}

export interface BikeBusyDaysResponse {
    id: number;
    name: string;
    busy_days: BusyDayRange[];
}

export const fetchBikeBusyDays = async (bikeId: number): Promise<BikeBusyDaysResponse | null> => {
    try {
        const response = await fetch(`/api/orders/${bikeId}/busy-days/`);
        if (!response.ok) {
            console.error("❌ Failed to fetch busy days:", await response.json());
            return null;
        }

        const data: BikeBusyDaysResponse = await response.json();
        return data;
    } catch (error) {
        console.error("❌ Network error fetching busy days:", error);
        return null;
    }
};

export interface AdminOrder {
    id: number;
    bike: string;
    name: string;
    phone: string;
    comments: string;
    is_validated: boolean;
    is_rejected: boolean;
    start_date: string;
    end_date: string;
    created_at: string;
}

export const fetchAdminOrders = async (page: number = 1): Promise<{
    results: AdminOrder[];
    count: number;
    next: string | null;
    previous: string | null;
}> => {
    const res = await fetcher(`/api/orders/admin-orders/?page=${page}`);
    if (!res.ok) {
        const error = await res.json();
        console.error("❌ Failed to fetch admin orders:", error);
        throw new Error("Failed to fetch admin orders");
    }
    return await res.json();
};

export const updateOrderStatus = async (
    orderId: number,
    action: "validate" | "reject"
): Promise<void> => {
    const res = await fetcher(`/api/orders/update-order-status/${orderId}/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
    });

    if (!res.ok) {
        const error = await res.json();
        console.error(`❌ Failed to ${action} order:`, error);
        throw new Error(`Failed to ${action} order`);
    }
};

export const resetOrderStatus = async (orderId: number): Promise<void> => {
    const res = await fetcher(`/api/orders/${orderId}/reset/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        const error = await res.json();
        console.error("❌ Failed to reset order status:", error);
        throw new Error("Failed to reset order status");
    }
};

export const fetchReviewedOrders = async (page: number = 1): Promise<{
    results: AdminOrder[];
    count: number;
    next: string | null;
    previous: string | null;
}> => {
    const res = await fetcher(`/api/orders/reviewed/?page=${page}`);
    if (!res.ok) {
        const error = await res.json();
        console.error("❌ Failed to fetch reviewed orders:", error);
        throw new Error("Failed to fetch reviewed orders");
    }
    return await res.json();
};