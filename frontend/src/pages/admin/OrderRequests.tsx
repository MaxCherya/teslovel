import React, { useState, useEffect } from "react";
import { fetchAdminOrders, updateOrderStatus } from "../../endpoints/BookPage";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

interface Order {
    id: number;
    bike: string;
    name: string;
    phone: string;
    amount: number;
    is_validated: boolean;
    is_rejected: boolean;
    comments: string;
    created_at: string;
    start_date: string;
    end_date: string;
}

const OrderRequests: React.FC = () => {
    const { t } = useTranslation("", { keyPrefix: "admin.bike_admin.order_requests" });
    const [orders, setOrders] = useState<Order[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchOrders = async (pageNum: number) => {
        try {
            const data = await fetchAdminOrders(pageNum);
            setOrders(data.results);
            setTotalPages(Math.ceil(data.count / 10));
        } catch (err) {
            console.error("Failed to fetch orders", err);
        }
    };

    useEffect(() => {
        fetchOrders(page);
    }, [page]);

    const handleValidate = async (id: number) => {
        try {
            await updateOrderStatus(id, "validate");
            setOrders((prev) =>
                prev.map((order) =>
                    order.id === id ? { ...order, is_validated: true, is_rejected: false } : order
                )
            );
            toast.success(t("toast.validated"));
        } catch (err: any) {
            toast.error(err.message || t("toast.failed_validate"));
        }
    };

    const handleReject = async (id: number) => {
        try {
            await updateOrderStatus(id, "reject");
            setOrders((prev) =>
                prev.map((order) =>
                    order.id === id ? { ...order, is_validated: false, is_rejected: true } : order
                )
            );
            toast.success(t("toast.rejected"));
        } catch (err: any) {
            toast.error(err.message || t("toast.failed_reject"));
        }
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900">
            <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 lg:pt-8 pt-25 pb-8">
                <div className="bg-white rounded-xl shadow-2xl p-4 sm:p-6 lg:p-8 max-w-full mx-auto border border-gray-100">
                    <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-6 tracking-tight">
                        {t("title")}
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px]">
                            <thead>
                                <tr className="text-left text-gray-600">
                                    <th className="px-4 py-3 text-sm font-medium">{t("columns.order_id")}</th>
                                    <th className="px-4 py-3 text-sm font-medium">{t("columns.bike")}</th>
                                    <th className="px-4 py-3 text-sm font-medium">{t("columns.name")}</th>
                                    <th className="px-4 py-3 text-sm font-medium">{t("columns.phone")}</th>
                                    <th className="px-4 py-3 text-sm font-medium">{t("columns.amount")}</th>
                                    <th className="px-4 py-3 text-sm font-medium">{t("columns.start")}</th>
                                    <th className="px-4 py-3 text-sm font-medium">{t("columns.end")}</th>
                                    <th className="px-4 py-3 text-sm font-medium">{t("columns.comments")}</th>
                                    <th className="px-4 py-3 text-sm font-medium">{t("columns.created_at")}</th>
                                    <th className="px-4 py-3 text-sm font-medium">{t("columns.status")}</th>
                                    <th className="px-4 py-3 text-sm font-medium">{t("columns.actions")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id} className="border-t border-gray-200">
                                        <td className="px-4 py-3 text-sm">{order.id}</td>
                                        <td className="px-4 py-3 text-sm">{order.bike}</td>
                                        <td className="px-4 py-3 text-sm">{order.name}</td>
                                        <td className="px-4 py-3 text-sm">{order.phone}</td>
                                        <td className="px-4 py-3 text-sm">{order.amount}</td>
                                        <td className="px-4 py-3 text-sm">{order.start_date}</td>
                                        <td className="px-4 py-3 text-sm">{order.end_date}</td>
                                        <td className="px-4 py-3 text-sm">{order.comments || t("none")}</td>
                                        <td className="px-4 py-3 text-sm">{new Date(order.created_at).toLocaleString()}</td>
                                        <td className="px-4 py-3 text-sm">
                                            {order.is_validated ? (
                                                <span className="text-green-600">{t("status.validated")}</span>
                                            ) : order.is_rejected ? (
                                                <span className="text-red-600">{t("status.rejected")}</span>
                                            ) : (
                                                <span className="text-yellow-600">{t("status.pending")}</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            {!order.is_validated && !order.is_rejected && (
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => handleValidate(order.id)}
                                                        className="bg-green-600 cursor-pointer text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                                                    >
                                                        {t("buttons.validate")}
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(order.id)}
                                                        className="bg-red-600 cursor-pointer text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                                                    >
                                                        {t("buttons.reject")}
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-end items-center mt-6 space-x-2">
                        <button
                            onClick={() => setPage((p) => Math.max(p - 1, 1))}
                            disabled={page === 1}
                            className="px-3 py-1 border rounded disabled:opacity-40"
                        >
                            {t("pagination.prev")}
                        </button>
                        <span className="text-sm">
                            {t("pagination.page")} {page} {t("pagination.of")} {totalPages}
                        </span>
                        <button
                            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                            disabled={page === totalPages}
                            className="px-3 py-1 border rounded disabled:opacity-40"
                        >
                            {t("pagination.next")}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default OrderRequests;