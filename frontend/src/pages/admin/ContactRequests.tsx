import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchContactRequests, markContactRequestContacted, resetContactRequestStatus } from "../../endpoints/ContactsMenu";

interface ContactRequest {
    id: number;
    name: string;
    phone_number: string;
    notes: string;
    is_contacted: boolean;
    created_at: string;
}

const ContactRequests: React.FC = () => {
    const [contacts, setContacts] = useState<ContactRequest[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchContacts = async (pageNum: number) => {
        try {
            const data = await fetchContactRequests(pageNum);
            setContacts(data.results);
            setTotalPages(Math.ceil(data.count / 10));
        } catch (err) {
            toast.error("Failed to fetch contact requests");
        }
    };

    useEffect(() => {
        fetchContacts(page);
    }, [page]);

    const handleMarkContacted = async (id: number) => {
        try {
            await markContactRequestContacted(id);
            setContacts((prev) =>
                prev.map((c) => (c.id === id ? { ...c, is_contacted: true } : c))
            );
            toast.success("Marked as contacted.");
        } catch {
            toast.error("Failed to update status.");
        }
    };

    const handleResetContacted = async (id: number) => {
        try {
            await resetContactRequestStatus(id);
            setContacts((prev) =>
                prev.map((c) => (c.id === id ? { ...c, is_contacted: false } : c))
            );
            toast.success("Status reset.");
        } catch {
            toast.error("Failed to reset status.");
        }
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900">
            <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 lg:pt-8 pt-25 pb-8">
                <div className="bg-white rounded-xl shadow-2xl p-4 sm:p-6 lg:p-8 max-w-full mx-auto border border-gray-100">
                    <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-6 tracking-tight">
                        Contact Requests
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px]">
                            <thead>
                                <tr className="text-left text-gray-600">
                                    <th className="px-4 py-3 text-sm font-medium">ID</th>
                                    <th className="px-4 py-3 text-sm font-medium">Name</th>
                                    <th className="px-4 py-3 text-sm font-medium">Phone</th>
                                    <th className="px-4 py-3 text-sm font-medium">Notes</th>
                                    <th className="px-4 py-3 text-sm font-medium">Created</th>
                                    <th className="px-4 py-3 text-sm font-medium">Status</th>
                                    <th className="px-4 py-3 text-sm font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.map((c) => (
                                    <tr key={c.id} className="border-t border-gray-200">
                                        <td className="px-4 py-3 text-sm">{c.id}</td>
                                        <td className="px-4 py-3 text-sm">{c.name}</td>
                                        <td className="px-4 py-3 text-sm">
                                            <a href={`tel:${c.phone_number}`} className="text-blue-600 underline">
                                                {c.phone_number}
                                            </a>
                                        </td>
                                        <td className="px-4 py-3 text-sm">{c.notes || "—"}</td>
                                        <td className="px-4 py-3 text-sm">{new Date(c.created_at).toLocaleString()}</td>
                                        <td className="px-4 py-3 text-sm">
                                            {c.is_contacted ? (
                                                <span className="text-green-600">Contacted</span>
                                            ) : (
                                                <span className="text-yellow-600">Pending</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            {c.is_contacted ? (
                                                <button
                                                    onClick={() => handleResetContacted(c.id)}
                                                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
                                                >
                                                    Reset
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleMarkContacted(c.id)}
                                                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                                                >
                                                    Mark Contacted
                                                </button>
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
                            Prev
                        </button>
                        <span className="text-sm">Page {page} of {totalPages}</span>
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

export default ContactRequests;