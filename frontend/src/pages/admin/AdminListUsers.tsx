import React, { useEffect, useState } from "react";
import {
    fetchPaginatedUsers,
    assignSuperuser,
    removeSuperuser,
    type AdminUser,
} from "../../endpoints/adminUsers";
import { check2FAStatus } from "../../endpoints/auth";
import FullScreenLoader from "../../components/ui/loaders/FullScreenLoader";
import { useTranslation } from "react-i18next";

const AdminUserListPage: React.FC = () => {
    const { t } = useTranslation("", { keyPrefix: "admin.userList" });

    const [users, setUsers] = useState<AdminUser[]>([]);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [refreshKey, _setRefreshKey] = useState(0);
    const [otpModalOpen, setOtpModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedQuery(query), 400);
        return () => clearTimeout(handler);
    }, [query]);

    const loadUsers = async () => {
        setLoading(true);
        try {
            const data = await fetchPaginatedUsers(page, debouncedQuery);
            setUsers(data.results);
            setTotalPages(Math.ceil(data.count / 10));
        } catch (err) {
            console.error("❌ Error loading users:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, [page, debouncedQuery, refreshKey]);

    const handleMakeAdminClick = async (userId: number) => {
        const has2FA = await check2FAStatus();
        if (has2FA) {
            setSelectedUserId(userId);
            setOtpModalOpen(true);
        } else {
            try {
                await assignSuperuser(userId);
                await loadUsers();
            } catch (err) {
                alert(t("errors.assignFailed") + ": " + (err as any).message);
            }
        }
    };

    const handleOtpSubmit = async (otp: string) => {
        if (!selectedUserId) return;
        try {
            await assignSuperuser(selectedUserId, otp);
            await loadUsers();
        } catch (err) {
            alert(t("errors.assignFailed") + ": " + (err as any).message);
        } finally {
            setOtpModalOpen(false);
            setSelectedUserId(null);
        }
    };

    const handleRemove = async (id: number) => {
        try {
            await removeSuperuser(id);
            await loadUsers();
        } catch (err) {
            alert(t("errors.removeFailed") + ": " + (err as any).message);
        }
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900">
            <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 pb-8 lg:pt-0 pt-20">
                <h1 className="text-xl font-semibold mb-4">{t("title")}</h1>

                <input
                    type="text"
                    placeholder={t("searchPlaceholder")}
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setPage(1);
                    }}
                    className="border px-3 py-2 rounded w-full mb-4"
                />

                {loading ? (
                    <FullScreenLoader />
                ) : (
                    <div className="space-y-4">
                        {/* Desktop Table */}
                        <div className="hidden md:block">
                            <table className="w-full border text-sm">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="p-2 text-left">{t("username")}</th>
                                        <th className="p-2 text-left">{t("phone")}</th>
                                        <th className="p-2 text-left">{t("twoFA")}</th>
                                        <th className="p-2 text-left">{t("admin")}</th>
                                        <th className="p-2 text-left">{t("actions")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id} className="border-t">
                                            <td className="p-2">{user.username}</td>
                                            <td className="p-2">{user.phone}</td>
                                            <td className="p-2">{user.has_2fa_enabled ? "✅" : "❌"}</td>
                                            <td className="p-2">{user.is_staff ? "✅" : "❌"}</td>
                                            <td className="p-2">
                                                {user.is_staff ? (
                                                    <button
                                                        onClick={() => handleRemove(user.id)}
                                                        className="text-red-600 text-xs underline"
                                                    >
                                                        {t("removeAdmin")}
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleMakeAdminClick(user.id)}
                                                        className="text-green-600 text-xs underline"
                                                    >
                                                        {t("makeAdmin")}
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="md:hidden space-y-4">
                            {users.map((user) => (
                                <div
                                    key={user.id}
                                    className="p-4 border rounded-lg bg-white shadow-sm text-sm space-y-1"
                                >
                                    <div>
                                        <span className="font-medium">{t("username")}: </span>{user.username}
                                    </div>
                                    <div>
                                        <span className="font-medium">{t("phone")}: </span>{user.phone}
                                    </div>
                                    <div>
                                        <span className="font-medium">{t("twoFA")}: </span>
                                        {user.has_2fa_enabled ? "✅" : "❌"}
                                    </div>
                                    <div>
                                        <span className="font-medium">{t("admin")}: </span>
                                        {user.is_staff ? "✅" : "❌"}
                                    </div>
                                    <div className="pt-2">
                                        {user.is_staff ? (
                                            <button
                                                onClick={() => handleRemove(user.id)}
                                                className="text-red-600 text-xs underline"
                                            >
                                                {t("remove")}
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleMakeAdminClick(user.id)}
                                                className="text-green-600 text-xs underline"
                                            >
                                                {t("make")}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Pagination */}
                <div className="mt-4 flex justify-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <button
                            key={p}
                            className={`px-3 py-1 rounded border ${page === p ? "bg-blue-600 text-white" : ""}`}
                            onClick={() => setPage(p)}
                        >
                            {p}
                        </button>
                    ))}
                </div>

                <OTPModal
                    isOpen={otpModalOpen}
                    onClose={() => setOtpModalOpen(false)}
                    onConfirm={handleOtpSubmit}
                />
            </main>
        </div>
    );
};

export default AdminUserListPage;

interface OTPModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (otp: string) => void;
}

const OTPModal: React.FC<OTPModalProps> = ({ isOpen, onClose, onConfirm }) => {
    const { t } = useTranslation("admin", { keyPrefix: "userList.otpModal" });
    const [otp, setOtp] = useState("");

    useEffect(() => {
        if (!isOpen) setOtp("");
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
                <h2 className="text-lg font-semibold mb-4">{t("title")}</h2>
                <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder={t("placeholder")}
                    className="border px-3 py-2 rounded w-full mb-4"
                />
                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 rounded border">
                        {t("cancel")}
                    </button>
                    <button
                        onClick={() => onConfirm(otp)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        {t("confirm")}
                    </button>
                </div>
            </div>
        </div>
    );
};