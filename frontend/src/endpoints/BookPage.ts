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