import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteEnginePosition, fetchEnginePositions } from "../../endpoints/specs";
import FullScreenLoader from "../../components/ui/loaders/FullScreenLoader";

interface EnginePosition {
    id: number;
    name_uk: string;
    name_en: string;
    name_ru: string;
}

const EnginePositionAdmin: React.FC = () => {
    const [enginePositions, setEnginePositions] = useState<EnginePosition[]>([]);
    const [loading, setLoading] = useState(true);

    const loadEnginePositions = async () => {
        try {
            const data = await fetchEnginePositions();
            setEnginePositions(data);
        } catch (err) {
            console.error("Failed to fetch engine positions:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadEnginePositions();
    }, []);

    const handleRemove = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this engine position?")) return;

        try {
            await deleteEnginePosition(id);
            setEnginePositions((prev) => prev.filter((position) => position.id !== id));
        } catch (err) {
            console.error("Failed to delete engine position:", err);
        }
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 lg:mt-0 mt-18">

            <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 pt-20 sm:pt-24 pb-8">
                <div className="bg-white rounded-xl shadow-2xl p-4 sm:p-6 lg:p-8 max-w-full mx-auto border border-gray-100">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6">
                        <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 tracking-tight mb-2 sm:mb-0">Current Engine Positions</h2>
                        <Link
                            to="/add-engine-position-admin/"
                            className="px-4 sm:px-6 py-2 sm:py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-md font-medium text-sm sm:text-base"
                        >
                            Add New Engine Position
                        </Link>
                    </div>

                    {loading ? (
                        <FullScreenLoader />
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[640px]">
                                <thead>
                                    <tr className="text-left text-gray-600">
                                        <th className="px-4 py-2">Name (Ukrainian)</th>
                                        <th className="px-4 py-2">Name (English)</th>
                                        <th className="px-4 py-2">Name (Russian)</th>
                                        <th className="px-4 py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {enginePositions.map((position) => (
                                        <tr key={position.id} className="border-t border-gray-200">
                                            <td className="px-4 py-3">{position.name_uk}</td>
                                            <td className="px-4 py-3">{position.name_en}</td>
                                            <td className="px-4 py-3">{position.name_ru}</td>
                                            <td className="px-4 py-3">
                                                <button
                                                    onClick={() => handleRemove(position.id)}
                                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 shadow-md text-sm"
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default EnginePositionAdmin;