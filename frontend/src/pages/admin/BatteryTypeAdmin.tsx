import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchBatteryTypes, deleteBatteryType } from "../../endpoints/specs";
import { toast } from "react-toastify";
import FullScreenLoader from "../../components/ui/loaders/FullScreenLoader";

const BatteryTypeAdmin: React.FC = () => {
    const [batteryTypes, setBatteryTypes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchBatteryTypes();
                setBatteryTypes(data);
            } catch (err) {
                toast.error("Failed to load battery types");
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const handleRemove = async (id: number) => {
        try {
            await deleteBatteryType(id);
            setBatteryTypes((prev) => prev.filter((type) => type.id !== id));
            toast.success("Battery type removed");
        } catch (err) {
            toast.error("Failed to remove battery type");
        }
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 lg:mt-0 mt-18">
            {loading && <FullScreenLoader />}

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 pt-20 sm:pt-24 pb-8">
                <div className="bg-white rounded-xl shadow-2xl p-4 sm:p-6 lg:p-8 max-w-full mx-auto border border-gray-100">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6">
                        <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 tracking-tight mb-2 sm:mb-0">Current Battery Types</h2>
                        <Link
                            to="/add-battery-type-admin/"
                            className="px-4 sm:px-6 py-2 sm:py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-md font-medium text-sm sm:text-base"
                        >
                            Add New Battery Type
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[640px]">
                            <thead>
                                <tr className="text-left text-gray-600">
                                    <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs sm:text-sm lg:text-base font-medium">Name (Ukrainian)</th>
                                    <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs sm:text-sm lg:text-base font-medium">Name (English)</th>
                                    <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs sm:text-sm lg:text-base font-medium">Name (Russian)</th>
                                    <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs sm:text-sm lg:text-base font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {batteryTypes.map((type) => (
                                    <tr key={type.id} className="border-t border-gray-200">
                                        <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm lg:text-base">{type.name_uk}</td>
                                        <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm lg:text-base">{type.name_en}</td>
                                        <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm lg:text-base">{type.name_ru}</td>
                                        <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm lg:text-base">
                                            <button
                                                onClick={() => handleRemove(type.id)}
                                                className="px-3 sm:px-4 py-1 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 shadow-md font-medium text-xs sm:text-sm"
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BatteryTypeAdmin;