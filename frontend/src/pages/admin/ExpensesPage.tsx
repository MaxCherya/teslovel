import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
    deleteBikeExpense,
    fetchBikeExpenses,
    uploadBikeExpense,
    type Expense,
} from "../../endpoints/adminExpenses";
import FullScreenLoader from "../../components/ui/loaders/FullScreenLoader";

const ExpensesPage: React.FC = () => {
    const { bikeId } = useParams<{ bikeId: string }>();
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");

    const loadExpenses = async (pageNum: number) => {
        if (!bikeId) return;
        setLoading(true);
        try {
            const data = await fetchBikeExpenses(pageNum, parseInt(bikeId));
            setExpenses(data.results);
            setTotalPages(Math.ceil(data.count / 10));
        } catch {
            toast.error("Failed to load expenses.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadExpenses(page);
    }, [page, bikeId]);

    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this expense?")) return;
        try {
            await deleteBikeExpense(id);
            setExpenses((prev) => prev.filter((exp) => exp.id !== id));
            toast.success("Expense deleted successfully.");
        } catch (err: any) {
            toast.error(err.message || "Failed to delete expense.");
        }
    };

    const handleAddExpense = async () => {
        if (!bikeId || !description || !amount) return toast.error("Fill all fields.");

        try {
            await uploadBikeExpense({
                bike: parseInt(bikeId),
                description,
                amount,
            });
            toast.success("Expense added.");
            setIsModalOpen(false);
            setDescription("");
            setAmount("");
            loadExpenses(1);
            setPage(1);
        } catch {
            toast.error("Failed to add expense.");
        }
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900">
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:pt-10 pt-20">
                <div className="bg-white shadow-lg rounded-xl p-6 relative">
                    <h2 className="text-xl font-bold mb-6">Expenses for Bike #{bikeId}</h2>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                    >
                        ➕ Add Expense
                    </button>

                    {loading ? (
                        <FullScreenLoader />
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[800px] text-sm">
                                <thead>
                                    <tr className="text-left text-gray-600 border-b">
                                        <th className="px-4 py-2">ID</th>
                                        <th className="px-4 py-2">Bike</th>
                                        <th className="px-4 py-2">Description</th>
                                        <th className="px-4 py-2">Amount</th>
                                        <th className="px-4 py-2">Date</th>
                                        <th className="px-4 py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {expenses.map((exp) => (
                                        <tr key={exp.id} className="border-b hover:bg-gray-50">
                                            <td className="px-4 py-2">{exp.id}</td>
                                            <td className="px-4 py-2">{exp.bike}</td>
                                            <td className="px-4 py-2">{exp.description}</td>
                                            <td className="px-4 py-2">{exp.amount} ₴</td>
                                            <td className="px-4 py-2">{new Date(exp.date).toLocaleString()}</td>
                                            <td className="px-4 py-2">
                                                <button
                                                    onClick={() => handleDelete(exp.id)}
                                                    className="bg-red-600 cursor-pointer text-white px-3 py-1 rounded hover:bg-red-700 text-xs"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Pagination */}
                    <div className="flex justify-end items-center mt-6 space-x-2">
                        <button
                            onClick={() => setPage((p) => Math.max(p - 1, 1))}
                            disabled={page === 1}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            Prev
                        </button>
                        <span className="text-sm">Page {page} of {totalPages}</span>
                        <button
                            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                            disabled={page === totalPages}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>

                    {/* Modal */}
                    {isModalOpen && (
                        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
                            <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
                                <h3 className="text-lg font-semibold mb-4">Add Expense</h3>

                                <div className="mb-4">
                                    <label className="block mb-1 text-sm font-medium">Description</label>
                                    <input
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="w-full border px-3 py-2 rounded"
                                        placeholder="What was the expense for?"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block mb-1 text-sm font-medium">Amount (₴)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="w-full border px-3 py-2 rounded"
                                        placeholder="0.00"
                                    />
                                </div>

                                <div className="flex justify-end space-x-2">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 cursor-pointer py-2 rounded border"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleAddExpense}
                                        className="px-4 cursor-pointer py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ExpensesPage;