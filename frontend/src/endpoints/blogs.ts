import { fetcher } from "../lib/fetchers/fetcher";

export interface AdminBlog {
    id: number;
    title: string;
    content: string;
    created_at: string;
    banner: string;
    poster: string;
    views_counts: number;
}

export const fetchAdminBlogs = async (): Promise<AdminBlog[]> => {
    const res = await fetcher("/api/blogs/fetch/");

    if (!res.ok) {
        const error = await res.json();
        console.error("❌ Failed to fetch blogs:", error);
        throw new Error("Failed to fetch blogs");
    }

    const data = await res.json();
    return data.results;
};

export const deleteAdminBlog = async (blog_id: number, otp_code?: string): Promise<void> => {
    const res = await fetcher("/api/blogs/delete/", {
        method: "DELETE",
        body: JSON.stringify({ blog_id, otp_code }),
    });

    if (!res.ok) {
        const error = await res.json();
        console.error("❌ Failed to delete blog:", error);
        throw new Error(error.detail || "Failed to delete blog");
    }
};

export const uploadAdminBlog = async (formData: FormData): Promise<void> => {
    const res = await fetcher("/api/blogs/upload-blog/", {
        method: "POST",
        body: formData,
    });

    if (!res.ok) {
        const error = await res.json();
        console.error("❌ Failed to upload blog:", error);
        throw new Error(error.detail || "Failed to upload blog");
    }
};