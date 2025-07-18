import { fetcher } from "../lib/fetchers/fetcher";
import i18n from "../locales";

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

export const updateBikeName = async (bikeId: number, newName: string): Promise<void> => {
    const res = await fetcher(`/api/catalog/bike/${bikeId}/update-name/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newName }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "Failed to update bike name");
    }
};

export const updateBikeDescriptions = async (
    bikeId: number,
    payload: {
        description_uk?: string;
        description_en?: string;
        description_ru?: string;
    }
): Promise<void> => {
    const res = await fetcher(`/api/catalog/update-bike-descriptions/${bikeId}/`, {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "Failed to update descriptions");
    }
};

export const updateBikeSpecs = async (
    bikeId: number,
    data: {
        price_day?: number;
        max_speed?: number;
        range?: number;
        wheels_size?: number;
        power?: number;
        battery_current?: number;
    }
): Promise<void> => {
    const res = await fetcher(`/api/catalog/update-bike-specs/${bikeId}/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "Failed to update bike specs");
    }
};

export const updateBikeForeignKeys = async (
    bikeId: number,
    data: {
        battery_type?: number;
        brakes_type?: number;
        engine_position?: number;
    }
): Promise<void> => {
    const res = await fetcher(`/api/catalog/update-bike-fks/${bikeId}/`, {
        method: "PATCH",
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "Failed to update foreign key fields");
    }
};

export interface BikeOption {
    id: number;
    name: string;
}

export interface BikeOptionFieldsResponse {
    battery_types: BikeOption[];
    brakes_types: BikeOption[];
    engine_positions: BikeOption[];
    current: {
        battery_type: number | null;
        brakes_type: number | null;
        engine_position: number | null;
    } | null;
}

export const fetchBikeOptionFields = async (
    bikeId: number
): Promise<BikeOptionFieldsResponse> => {
    const res = await fetcher(`/api/catalog/bike-option-fields/?bike_id=${bikeId}`, {
        headers: {
            "X-Language": i18n.language || "uk",
        },
    });

    if (!res.ok) {
        const error = await res.json();
        console.error("❌ Failed to fetch bike option fields:", error);
        throw new Error("Failed to fetch bike option fields");
    }

    return await res.json();
};