import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Assuming react-router-dom is used for navigation

interface BatteryType {
    id: number;
    name_uk: string;
    name_en: string;
    name_ru: string;
}

const BatteryTypeAdmin: React.FC = () => {
    const [batteryTypes, setBatteryTypes] = useState<BatteryType[]>([]);

    useEffect(() => {
        // Fetch battery types (replace with real API call, e.g., /api/battery-types/)
        setBatteryTypes([
            { id: 1, name_uk: "Літій-іонний", name_en: "Li-Ion", name_ru: "Литий-ионный" },
            { id: 2, name_uk: "Нікель-метал-гідридний", name_en: "NiMH", name_ru: "Никель-металлогидридный" },
        ]);
    }, []);

    const handleRemove = (id: number) => {
        // Remove battery type (replace with real API call)
        setBatteryTypes((prev) => prev.filter((type) => type.id !== id));
        console.log(`Removing battery type with id: ${id}`);
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 lg:mt-0 mt-18">
            {/* Header */}
            <header className="bg-white shadow-lg rounded-b-lg fixed top-0 w-full z-10">
                <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-3 flex flex-col sm:flex-row justify-between items-center">
                    <h1 className="text-xl sm:text-2xl font-bold text-indigo-600 tracking-tight">Manage Battery Types</h1>
                    <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                        <img src="https://via.placeholder.com/32" alt="Profile" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-indigo-100" />
                        <span className="text-gray-600 font-medium hidden sm:inline text-sm sm:text-base">Admin</span>
                    </div>
                </div>
            </header>

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