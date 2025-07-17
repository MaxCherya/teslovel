import { fetcher } from "../lib/fetchers/fetcher";

export interface BikeAdminPreview {
    id: number;
    name: string;
    main_img: string;
}

export const fetchAdminBikePreviews = async (): Promise<BikeAdminPreview[]> => {
    const res = await fetcher("/api/catalog/admin-bikes/");
    if (!res.ok) throw new Error("Failed to fetch admin bike previews");
    return await res.json();
};

export const createBike = async (formData: FormData): Promise<any> => {
    const res = await fetcher("/api/catalog/create-bike/", {
        method: "POST",
        body: formData,
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "Failed to create bike");
    }

    return await res.json();
};

export const updateBikeStatus = async (bikeId: string, statusId: number): Promise<void> => {
    const res = await fetcher(`/api/catalog/update-bike-status/${bikeId}/`, {
        method: "PATCH",
        body: JSON.stringify({ status: statusId }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "Failed to update bike status");
    }
};

export const deleteBikeWithOTP = async (bikeId: number, otpCode?: string): Promise<void> => {
    const res = await fetcher("/api/catalog/delete-bike/", {
        method: "POST",
        body: JSON.stringify({
            bike_id: bikeId,
            ...(otpCode && { otp_code: otpCode }),
        }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "Failed to delete bike");
    }
};