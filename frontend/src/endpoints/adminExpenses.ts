import { fetcher } from "../lib/fetchers/fetcher";

export interface Expense {
    id: number;
    bike: string;
    description: string;
    amount: string;
    date: string;
}

export interface UploadExpensePayload {
    bike: number;
    description: string;
    amount: string;
}

export const uploadBikeExpense = async (payload: UploadExpensePayload): Promise<void> => {
    const res = await fetcher("/api/admin-expenses/upload-expense/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const error = await res.json();
        console.error("❌ Failed to upload expense:", error);
        throw new Error("Failed to upload bike expense");
    }
};

export const fetchBikeExpenses = async (
    page: number = 1,
    bikeId?: number
): Promise<{
    results: Expense[];
    count: number;
    next: string | null;
    previous: string | null;
}> => {
    const query = new URLSearchParams({ page: String(page) });
    if (bikeId !== undefined) {
        query.append("bike", String(bikeId));
    }

    const res = await fetcher(`/api/admin-expenses/list-expenses/?${query.toString()}`);
    if (!res.ok) {
        const error = await res.json();
        console.error("❌ Failed to fetch expenses:", error);
        throw new Error("Failed to fetch expenses");
    }

    return await res.json();
};

export const deleteBikeExpense = async (expenseId: number): Promise<void> => {
    const res = await fetcher(`/api/admin-expenses/delete-expense/${expenseId}/`, {
        method: "DELETE",
    });

    if (!res.ok) {
        const error = await res.json();
        console.error("❌ Failed to delete expense:", error);
        throw new Error("Failed to delete expense");
    }
};