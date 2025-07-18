import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchBikeRides, type Ride } from "../../endpoints/BookPage";
import FullScreenLoader from "../../components/ui/loaders/FullScreenLoader";

const RidesPage: React.FC = () => {
    const { bikeId } = useParams<{ bikeId: string }>();
    const [rides, setRides] = useState<Ride[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const loadRides = async (pageNum: number) => {
        if (!bikeId) return;
        setLoading(true);
        try {
            const data = await fetchBikeRides(parseInt(bikeId), pageNum);
            setRides(data.results);
            setTotalPages(Math.ceil(data.count / 10));
        } catch {
            toast.error("Failed to load rides.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadRides(page);
    }, [page, bikeId]);

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900">
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:pt-10 pt-20">
                <div className="bg-white shadow-lg rounded-xl p-6 relative">
                    <h2 className="text-xl font-bold mb-6">Rides for Bike #{bikeId}</h2>

                    {loading ? (
                        <FullScreenLoader />
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[800px] text-sm">
                                <thead>
                                    <tr className="text-left text-gray-600 border-b">
                                        <th className="px-4 py-2">ID</th>
                                        <th className="px-4 py-2">Client</th>
                                        <th className="px-4 py-2">Phone</th>
                                        <th className="px-4 py-2">Start</th>
                                        <th className="px-4 py-2">End</th>
                                        <th className="px-4 py-2">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rides.map((ride) => (
                                        <tr key={ride.id} className="border-b hover:bg-gray-50">
                                            <td className="px-4 py-2">{ride.id}</td>
                                            <td className="px-4 py-2">{ride.name}</td>
                                            <td className="px-4 py-2">{ride.phone}</td>
                                            <td className="px-4 py-2">{new Date(ride.start_date).toLocaleDateString()}</td>
                                            <td className="px-4 py-2">{new Date(ride.end_date).toLocaleDateString()}</td>
                                            <td className="px-4 py-2">{ride.amount} ₴</td>
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
                </div>
            </main>
        </div>
    );
};

export default RidesPage;