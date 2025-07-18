import { fetcher } from "../lib/fetchers/fetcher";
import i18n from "../locales";

interface ContactsRequestUploadPayload {
    name: string;
    phone_number: string;
    notes: string;
    formRenderedAt: string;
}

export const uploadContactRequest = async ({
    payload,
}: {
    payload: ContactsRequestUploadPayload;
}) => {
    try {
        const response = await fetch("/api/support/upload-contact-request/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'X-Language': i18n.language || "uk",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("❌ Server responded with:", errorData);
            throw new Error("Failed to upload contact request");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error uploading contact request:", error);
        return null;
    }
};

export const fetchContactRequests = async (page: number = 1) => {
    const res = await fetcher(`/api/support/contact-requests/?page=${page}`);
    if (!res.ok) {
        const error = await res.json();
        console.error("❌ Failed to fetch contact requests:", error);
        throw new Error("Failed to fetch contact requests");
    }
    return await res.json();
};

export const markContactRequestContacted = async (id: number) => {
    const res = await fetcher(`/api/support/contact-request/${id}/mark-contacted/`, {
        method: "PATCH",
    });
    if (!res.ok) {
        const error = await res.json();
        console.error("❌ Failed to mark as contacted:", error);
        throw new Error("Failed to mark contact request as contacted");
    }
};

export const resetContactRequestStatus = async (id: number) => {
    const res = await fetcher(`/api/support/contact-request/${id}/reset-status/`, {
        method: "PATCH",
    });
    if (!res.ok) {
        const error = await res.json();
        console.error("❌ Failed to reset contact status:", error);
        throw new Error("Failed to reset contact request status");
    }
};