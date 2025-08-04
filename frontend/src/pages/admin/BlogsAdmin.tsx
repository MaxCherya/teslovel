import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FullScreenLoader from "../../components/ui/loaders/FullScreenLoader";
import { check2FAStatus } from "../../endpoints/auth";
import { deleteAdminBlog, fetchAdminBlogs } from "../../endpoints/blogs";
import i18n from "../../locales";
import { useTranslation } from "react-i18next";

const BlogsAdmin: React.FC = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otpCode, setOtpCode] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);
    const [lang, setLang] = useState<'uk' | 'en' | 'ru'>(i18n.language as 'uk' | 'en' | 'ru');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const { t } = useTranslation("", { keyPrefix: "admin.bike_admin.blogs_admin" });

    useEffect(() => {
        const onLanguageChanged = (lng: string) => {
            setLang(lng as 'uk' | 'en' | 'ru');
        };

        i18n.on('languageChanged', onLanguageChanged);

        return () => {
            i18n.off('languageChanged', onLanguageChanged);
        };
    }, [i18n])

    useEffect(() => {
        const loadBlogs = async () => {
            setLoading(true);
            try {
                const data = await fetchAdminBlogs(currentPage);
                setBlogs(data.results || []);
                setTotalPages(Math.ceil(data.count / 10));
            } catch (err) {
                console.error("❌ Failed to load blogs:", err);
            } finally {
                setLoading(false);
            }
        };

        loadBlogs();
    }, [currentPage]);

    const handleAddBlog = () => {
        navigate("/blogs-admin/new/");
    };

    const handleRemoveBlog = async (blogId: number) => {
        setSelectedBlogId(blogId);
        try {
            setLoading(true);
            const needsOtp = await check2FAStatus();
            if (needsOtp) {
                setShowOtpModal(true);
            } else {
                await deleteAdminBlog(blogId);
                setBlogs(blogs.filter((blog) => blog.id !== blogId));
            }
        } catch (err: any) {
            setErrorMsg(err.message || "Failed to check 2FA");
        } finally {
            setLoading(false);
        }
    };

    const handleOtpSubmit = async () => {
        if (!selectedBlogId) return;
        try {
            setLoading(true);
            await deleteAdminBlog(selectedBlogId, otpCode);
            setBlogs(blogs.filter((blog) => blog.id !== selectedBlogId));
            setShowOtpModal(false);
            setOtpCode("");
            setSelectedBlogId(null);
        } catch (err: any) {
            setErrorMsg(err.message || "Failed to delete blog");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900">
            {loading && <FullScreenLoader />}
            <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 lg:pt-8 pt-25 pb-8">
                <div className="bg-white rounded-xl shadow-2xl p-4 sm:p-6 lg:p-8 max-w-full mx-auto border border-gray-100 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 tracking-tight">
                            {t("title")}
                        </h2>
                        <button
                            onClick={handleAddBlog}
                            className="bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700"
                        >
                            {t("add")}
                        </button>
                    </div>
                    <div className="space-y-4">
                        {blogs.length === 0 ? (
                            <p className="text-gray-600">{t("no_blogs")}</p>
                        ) : (
                            <ul className="space-y-4">
                                {blogs.map((blog) => {
                                    const title = blog[`title_${lang}`];
                                    return (
                                        <li
                                            key={blog.id}
                                            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                                        >
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                                {blog.poster && (
                                                    <img
                                                        src={blog.poster}
                                                        alt="Blog poster"
                                                        className="w-24 h-24 object-cover rounded-lg"
                                                    />
                                                )}
                                                <div>
                                                    <p className="text-gray-800 font-medium">
                                                        {title?.substring(0, 100)}
                                                        {title?.length > 100 ? "..." : ""}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {new Date(blog.created_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveBlog(blog.id)}
                                                className="mt-2 sm:mt-0 bg-red-600 text-white font-medium py-1 px-3 rounded-lg hover:bg-red-700"
                                            >
                                                {t("delete")}
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>

                        )}
                    </div>
                </div>
            </main>

            <div className="flex justify-center items-center space-x-2 pt-4">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    {t("pagination.prev")}
                </button>
                <span className="text-gray-700">
                    {t("pagination.page_info", { current: currentPage, total: totalPages })}
                </span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    {t("pagination.next")}
                </button>
            </div>

            {showOtpModal && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
                        <h3 className="text-lg font-bold mb-4">{t("otp_modal.title")}</h3>
                        <input
                            type="text"
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3"
                            placeholder={t("otp_modal.placeholder")}
                        />
                        {errorMsg && <p className="text-sm text-red-500 mb-2">{t("otp_modal.error")}</p>}
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => {
                                    setShowOtpModal(false);
                                    setOtpCode("");
                                    setErrorMsg("");
                                    setSelectedBlogId(null);
                                }}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-lg"
                            >
                                {t("otp_modal.cancel")}
                            </button>
                            <button
                                onClick={handleOtpSubmit}
                                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg"
                            >
                                {t("otp_modal.submit")}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogsAdmin;