import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { fetchReviewedOrders, resetOrderStatus } from "../../endpoints/BookPage";

interface Order {
    id: number;
    bike: string;
    name: string;
    phone: string;
    is_validated: boolean;
    is_rejected: boolean;
    comments: string;
    created_at: string;
    start_date: string;
    end_date: string;
}

const CurrentOrders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchOrders = async (pageNum: number) => {
        try {
            const data = await fetchReviewedOrders(pageNum);
            setOrders(data.results);
            setTotalPages(Math.ceil(data.count / 10));
        } catch (err) {
            toast.error("Failed to fetch current orders");
        }
    };

    useEffect(() => {
        fetchOrders(page);
    }, [page]);

    const handleReset = async (id: number) => {
        try {
            await resetOrderStatus(id);
            setOrders((prev) => prev.filter((order) => order.id !== id));
            toast.success("Order status reset.");
        } catch (err: any) {
            toast.error(err.message || "Failed to reset order.");
        }
    };


    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900">
            <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 lg:pt-8 pt-25 pb-8">
                <div className="bg-white rounded-xl shadow-2xl p-4 sm:p-6 lg:p-8 max-w-full mx-auto border border-gray-100">
                    <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-6 tracking-tight">
                        Current Orders (Validated or Rejected)
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px]">
                            <thead>
                                <tr className="text-left text-gray-600">
                                    <th className="px-4 py-3 text-sm font-medium">Order ID</th>
                                    <th className="px-4 py-3 text-sm font-medium">Bike</th>
                                    <th className="px-4 py-3 text-sm font-medium">Customer Name</th>
                                    <th className="px-4 py-3 text-sm font-medium">Phone</th>
                                    <th className="px-4 py-3 text-sm font-medium">Start</th>
                                    <th className="px-4 py-3 text-sm font-medium">End</th>
                                    <th className="px-4 py-3 text-sm font-medium">Comments</th>
                                    <th className="px-4 py-3 text-sm font-medium">Created At</th>
                                    <th className="px-4 py-3 text-sm font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id} className="border-t border-gray-200">
                                        <td className="px-4 py-3 text-sm">{order.id}</td>
                                        <td className="px-4 py-3 text-sm">{order.bike}</td>
                                        <td className="px-4 py-3 text-sm">{order.name}</td>
                                        <td className="px-4 py-3 text-sm">{order.phone}</td>
                                        <td className="px-4 py-3 text-sm">{order.start_date}</td>
                                        <td className="px-4 py-3 text-sm">{order.end_date}</td>
                                        <td className="px-4 py-3 text-sm">{order.comments || "None"}</td>
                                        <td className="px-4 py-3 text-sm">{new Date(order.created_at).toLocaleString()}</td>
                                        <td className="px-4 py-3 text-sm">
                                            {order.is_validated ? (
                                                <span className="text-green-600">Validated</span>
                                            ) : order.is_rejected ? (
                                                <span className="text-red-600">Rejected</span>
                                            ) : (
                                                "-"
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            {(order.is_validated || order.is_rejected) && (
                                                <button
                                                    onClick={() => handleReset(order.id)}
                                                    className="bg-yellow-500 cursor-pointer text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
                                                >
                                                    Reset
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-end items-center mt-6 space-x-2">
                        <button
                            onClick={() => setPage((p) => Math.max(p - 1, 1))}
                            disabled={page === 1}
                            className="px-3 py-1 border rounded disabled:opacity-40"
                        >
                            Prev
                        </button>
                        <span className="text-sm">
                            Page {page} of {totalPages}
                        </span>
                        <button
                            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                            disabled={page === totalPages}
                            className="px-3 py-1 border rounded disabled:opacity-40"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CurrentOrders;