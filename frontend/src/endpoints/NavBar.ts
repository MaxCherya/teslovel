import i18n from "../locales";

export interface BikeNavBar {
    id: number;
    name: string;
    nav_photo: string;
}

export const fetchNavBarBikes = async (): Promise<BikeNavBar[] | null> => {
    try {
        const response = await fetch("/api/catalog/navbar-bikes/", {
            headers: {
                'X-Language': i18n.language || "uk",
            }
        });
        if (!response.ok) throw new Error("Failed to fetch navbar bikes");
        const data: BikeNavBar[] = await response.json();
        return data
    } catch (err) {
        console.error(err)
        return null
    }
}