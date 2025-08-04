import { fetcher } from "../lib/fetchers/fetcher";

const BASE_URL = "/api/accounts";

export const getUser = async (pk: string | number): Promise<boolean> => {
    try {
        const response = await fetcher(`${BASE_URL}/user/${pk}`, {
            method: "GET",
        });

        if (!response.ok) throw new Error("Failed to fetch user");
        return await response.json();
    } catch (error) {
        console.error("User fetch error:", error);
        return false;
    }
};