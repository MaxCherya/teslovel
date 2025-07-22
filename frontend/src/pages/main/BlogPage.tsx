import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import parse from "html-react-parser";

import { fetchBlogById, type AdminBlog } from "../../endpoints/blogs";
import FullScreenLoader from "../../components/ui/loaders/FullScreenLoader";

const BlogPage: React.FC = () => {
    const { blogId } = useParams<{ blogId: string }>();
    const { i18n } = useTranslation();
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

    if (loading) {
        return <FullScreenLoader />;
    }

    if (!post) {
        return <div className="text-center py-16 text-red-500">Blog post not found.</div>;
    }

    const title = post[`title_${lang}`];
    const content = post[`content_${lang}`];
    const banner = post[`banner_${lang}`];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 px-4 lg:px-24 py-10">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden lg:mt-0 mt-15">
                <img src={banner} alt="Banner" className="w-full h-[300px] object-cover" />
                <div className="p-6 space-y-4">
                    <h1 className="text-3xl font-bold">{title}</h1>
                    <p className="text-sm text-gray-500">
                        {new Date(post.created_at).toLocaleDateString()}
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