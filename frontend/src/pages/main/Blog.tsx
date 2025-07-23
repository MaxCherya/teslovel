import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { fetchPaginatedBlogs } from "../../endpoints/blogs";
import { GeneralButton } from "../../components/ui/btns";
import { useNavigate } from "react-router-dom";

const Blog: React.FC = () => {
    const { i18n } = useTranslation();
    const [posts, setPosts] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const lang = i18n.language as "uk" | "en" | "ru";

    const { t } = useTranslation();

    const navigate = useNavigate();

    useEffect(() => {
        const loadInitial = async () => {
            setPosts([]);
            setPage(1);
            const newPosts = await fetchPaginatedBlogs(1);
            setHasMore(newPosts.next && newPosts.next > page);
            console.log(newPosts);
            setPosts(newPosts.results);
        };
        loadInitial();
    }, [lang]);

    const handleLoadMore = async () => {
        const nextPage = page + 1;
        const newPosts = await fetchPaginatedBlogs(nextPage);
        if (newPosts.results.length === 0) {
            setHasMore(false);
        } else {
            // Prevents duplicate IDs from being added (on lang switch)
            setPosts(prev => {
                const newUnique = newPosts.filter(
                    (post: any) => !prev.some(p => p.id === post.id)
                );
                return [...prev, ...newUnique];
            });
            setPage(nextPage);
        }
    };

    const getTitle = (post: any) => post[`title_${lang}`];
    const getBanner = (post: any) => post[`banner_${lang}`];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 px-4 lg:px-16 pt-8 pb-16">

            <div className="grid md:grid-cols-3 gap-6 lg:pt-0 pt-20">
                {posts.map((post, index) => {
                    const title = getTitle(post);
                    const image = index === 0 ? getBanner(post) : post.poster;

                    let className = "rounded-lg overflow-hidden shadow-lg bg-white";
                    if (index === 0) className += " md:col-span-3 h-full";
                    else if (index <= 2) className += " h-full";
                    else className += " h-full";

                    return (
                        <div key={post.id} className={className} onClick={() => navigate(`/blog/${post.id}`)}>
                            <img src={image} alt="" className="w-full object-cover cursor-pointer" />
                            <div className="p-4 cursor-pointer">
                                <h2 className="font-semibold text-lg">{title}</h2>
                                <p className="text-sm text-gray-500">
                                    {new Date(post.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {hasMore && (
                <div className="text-center mt-8">
                    <GeneralButton type="show" label={t("blog.load_more")} onClick={handleLoadMore} />
                </div>
            )}
        </div>
    );
};

export default Blog;