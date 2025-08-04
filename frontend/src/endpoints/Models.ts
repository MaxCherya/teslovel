import i18next from "i18next";

export interface BikeModels {
    id: number;
    name: string;
    price_day: number;
    main_img: string;
    status: string;
    status_original: string;
}

export const fetchModelsBikes = async (): Promise<BikeModels[] | null> => {
    try {
        const response = await fetch("/api/catalog/models-bikes/", {
            headers: {
                "X-Language": i18next.language || "uk",
            }
        });
        if (!response.ok) {
            throw new Error("Failed to fetch models bikes");
        }
        const data: BikeModels[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching models bikes:", error);
        return null;
    }
};