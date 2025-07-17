import { fetcher } from "../lib/fetchers/fetcher";

export interface LocalizedNameInput {
    name_uk: string;
    name_en: string;
    name_ru: string;
}

const BASE_URL = "/api/specs";

// --- BatteryType ---
export const createBatteryType = async (data: LocalizedNameInput) => {
    const res = await fetcher(`${BASE_URL}/battery-types/create/`, {
        method: "POST",
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create battery type");
    return await res.json();
};

export const deleteBatteryType = async (id: number) => {
    const res = await fetcher(`${BASE_URL}/battery-types/${id}/`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete battery type");
    return true;
};

export const fetchBatteryTypes = async () => {
    const res = await fetcher(`${BASE_URL}/battery-types/`);
    if (!res.ok) throw new Error("Failed to fetch battery types");
    return await res.json();
};

// --- BrakesType ---
export const createBrakesType = async (data: LocalizedNameInput) => {
    const res = await fetcher(`${BASE_URL}/brakes-types/create/`, {
        method: "POST",
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create brakes type");
    return await res.json();
};

export const deleteBrakesType = async (id: number) => {
    const res = await fetcher(`${BASE_URL}/brakes-types/${id}/`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete brakes type");
    return true;
};

export const fetchBrakesTypes = async () => {
    const res = await fetcher(`${BASE_URL}/brakes-types/`);
    if (!res.ok) throw new Error("Failed to fetch brakes types");
    return await res.json();
};

// --- EnginePosition ---
export const createEnginePosition = async (data: LocalizedNameInput) => {
    const res = await fetcher(`${BASE_URL}/engine-positions/create/`, {
        method: "POST",
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create engine position");
    return await res.json();
};

export const deleteEnginePosition = async (id: number) => {
    const res = await fetcher(`${BASE_URL}/engine-positions/${id}/`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete engine position");
    return true;
};

export const fetchEnginePositions = async () => {
    const res = await fetcher(`${BASE_URL}/engine-positions/`);
    if (!res.ok) throw new Error("Failed to fetch engine positions");
    return await res.json();
};