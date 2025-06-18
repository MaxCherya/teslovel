export interface BikeNavBar {
    id: number;
    name: string;
    nav_photo: string;
}

export const fetchNavBarBikes = async (): Promise<BikeNavBar[] | null> => {
    try {
        const response = await fetch("/api/navbar-bikes/");
        if (!response.ok) throw new Error("Failed to fetch navbar bikes");
        const data: BikeNavBar[] = await response.json();
        return data
    } catch (err) {
        console.error(err)
        return null
    }
}