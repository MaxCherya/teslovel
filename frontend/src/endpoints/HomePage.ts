import i18n from "../locales";

export interface BikeCatwalk {
    id: number;
    name: string;
    max_speed: number;
    range: number;
    wheels_size: number;
    price_day: number;
    landscape_img: string;
    main_img: string;
}

export const fetchCatwalkBikes = async (): Promise<BikeCatwalk[] | null> => {
    try {
        const response = await fetch("/api/catalog/home-bikes/", {
            headers: {
                'X-Language': i18n.language || "uk",
            }
        });
        if (!response.ok) {
            throw new Error("Failed to fetch catwalk bikes");
        }
        const data: BikeCatwalk[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching catwalk bikes:", error);
        return null;
    }
};
