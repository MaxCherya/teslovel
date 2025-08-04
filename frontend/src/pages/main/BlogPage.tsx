import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import parse from "html-react-parser";

import { fetchBlogById, type AdminBlog } from "../../endpoints/blogs";
import FullScreenLoader from "../../components/ui/loaders/FullScreenLoader";

const BlogPage: React.FC = () => {
    const { blogId } = useParams<{ blogId: string }>();
    const { t, i18n } = useTranslation();
    const lang = i18n.language as "en" | "uk" | "ru";

    const [post, setPost] = useState<AdminBlog | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPost = async () => {
            try {
                if (!blogId) return;
                const blogData = await fetchBlogById(Number(blogId));
                setPost(blogData);
            } catch (err) {
                console.error("❌ Failed to load blog post:", err);
            } finally {
                setLoading(false);
            }
        };
        loadPost();
    }, [blogId]);

    if (loading) return <FullScreenLoader />;
    if (!post) return (
        <div className="text-center py-16 text-red-500">
            {t("blog.notFound")}
        </div>
    );

    const title = post[`title_${lang}`];
    const content = post[`content_${lang}`];
    const banner = post[`banner_${lang}`];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 px-4 lg:px-24 py-10">
            <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md overflow-hidden lg:mt-0 mt-15">
                <img src={banner} alt="Banner" className="w-full object-contain" />
                <div className="p-6 space-y-4">
                    <h1 className="text-3xl font-bold">{title}</h1>
                    <p className="text-sm text-gray-500">
                        {new Date(post.created_at).toLocaleDateString()}
                    </p>
                    <p className="flex items-center text-sm text-gray-600 gap-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-blue-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                        </svg>
                        {post.views_count?.toLocaleString()}
                    </p>
                    <div className="prose max-w-none ql-editor">
                        {parse(content)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPage;