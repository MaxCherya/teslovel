import React, { useEffect, useState } from "react";
import {
    fetchPaginatedUsers,
    assignSuperuser,
    removeSuperuser,
    type AdminUser,
} from "../../endpoints/adminUsers";
import { check2FAStatus } from "../../endpoints/auth";
import FullScreenLoader from "../../components/ui/loaders/FullScreenLoader";

const AdminUserListPage: React.FC = () => {
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
                alert("Failed to assign admin: " + (err as any).message);
            }
        }
    };

    const handleOtpSubmit = async (otp: string) => {
        if (!selectedUserId) return;
        try {
            await assignSuperuser(selectedUserId, otp);
            await loadUsers();
        } catch (err) {
            alert("Failed to assign admin: " + (err as any).message);
        } finally {
            setOtpModalOpen(false);
            setSelectedUserId(null);
        }
    };

    const handleRemove = async (id: number) => {
        try {
            await removeSuperuser(id)
            await loadUsers();
        } catch (err) {
            alert("Failed to remove admin: " + (err as any).message);
        }
    }

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 lg:mt-0 mt-18">
            <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 pt-20 sm:pt-24 pb-8">
                <h1 className="text-xl font-semibold mb-4">User Management</h1>

                <input
                    type="text"
                    placeholder="Search by phone or username..."
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
                    <table className="w-full border text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2 text-left">Username</th>
                                <th className="p-2 text-left">Phone</th>
                                <th className="p-2 text-left">2FA Enabled</th>
                                <th className="p-2 text-left">Admin</th>
                                <th className="p-2 text-left">Actions</th>
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
                                                Remove Admin
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleMakeAdminClick(user.id)}
                                                className="text-green-600 text-xs underline"
                                            >
                                                Make Admin
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <div className="mt-4 flex justify-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <button
                            key={p}
                            className={`px-3 py-1 rounded border ${page === p ? "bg-blue-600 text-white" : ""
                                }`}
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
    const [otp, setOtp] = useState("");

    useEffect(() => {
        if (!isOpen) setOtp("");
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
                <h2 className="text-lg font-semibold mb-4">Enter OTP</h2>
                <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter your OTP"
                    className="border px-3 py-2 rounded w-full mb-4"
                />
                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 rounded border">Cancel</button>
                    <button
                        onClick={() => onConfirm(otp)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};