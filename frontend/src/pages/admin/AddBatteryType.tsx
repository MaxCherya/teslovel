import React, { useState } from "react";

const AddBatteryType: React.FC = () => {
    const [formData, setFormData] = useState({
        name_uk: "",
        name_en: "",
        name_ru: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // POST to API (e.g., /api/battery-types/)
        console.log("Submitting:", formData);
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 flex items-center justify-center py-8">

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-2xl p-8 max-w-lg mx-auto border border-gray-100 space-y-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 tracking-tight">Create a New Battery Type</h2>

                    {/* Name Fields */}
                    <div>
                        <label htmlFor="name_uk" className="block text-sm font-medium text-gray-700 mb-2">
                            Name (Ukrainian)
                        </label>
                        <input
                            type="text"
                            id="name_uk"
                            name="name_uk"
                            value={formData.name_uk}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                            placeholder="Enter name in Ukrainian"
                        />
                    </div>
                    <div>
                        <label htmlFor="name_en" className="block text-sm font-medium text-gray-700 mb-2">
                            Name (English)
                        </label>
                        <input
                            type="text"
                            id="name_en"
                            name="name_en"
                            value={formData.name_en}
                            onChange={handleChange}
                            className="w-full px-ストリーム4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                            placeholder="Enter name in English"
                        />
                    </div>
                    <div>
                        <label htmlFor="name_ru" className="block text-sm font-medium text-gray-700 mb-2">
                            Name (Russian)
                        </label>
                        <input
                            type="text"
                            id="name_ru"
                            name="name_ru"
                            value={formData.name_ru}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                            placeholder="Enter name in Russian"
                        />
                    </div>

                    {/* Form Actions */}
                    <div className="mt-8 flex justify-center space-x-3">
                        <button
                            type="submit"
                            className="cursor-pointer px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-md font-medium"
                        >
                            Add Battery Type
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default AddBatteryType;