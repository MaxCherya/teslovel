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