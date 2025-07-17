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