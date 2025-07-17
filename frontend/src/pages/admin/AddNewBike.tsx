import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Assuming react-router-dom is used for navigation

interface Option {
    id: number;
    name: string;
}

const AddNewBike: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        description_uk: "",
        description_en: "",
        description_ru: "",
        price_day: 0,
        max_speed: 0,
        range: 0,
        wheels_size: 0,
        power: 0,
        battery_current: 0,
        status: "",
        battery_type: "",
        brakes_type: "",
        engine_position: "",
        // Image fields will be handled as files, not URLs
        main_img: null as File | null,
        nav_photo: null as File | null,
        landscape_img: null as File | null,
        side_photo_left: null as File | null,
        side_photo_right: null as File | null,
        front_photo_view: null as File | null,
        rear_photo_view: null as File | null,
        top_photo_view: null as File | null,
        drive_train_closeup_photo: null as File | null,
        handlebar_controls_photo: null as File | null,
        suspension_fork_photo: null as File | null,
        wheel_tire_condition_photo: null as File | null,
        serial_number_or_branding_photo: null as File | null,
    });

    const [statusOptions, setStatusOptions] = useState<Option[]>([]);
    const [batteryOptions, setBatteryOptions] = useState<Option[]>([]);
    const [brakesOptions, setBrakesOptions] = useState<Option[]>([]);
    const [engineOptions, setEngineOptions] = useState<Option[]>([]);

    useEffect(() => {
        // Fetch options for selects (replace with real API calls)
        setStatusOptions([{ id: 1, name: "Available" }, { id: 2, name: "Maintenance" }]);
        setBatteryOptions([{ id: 1, name: "Li-Ion" }, { id: 2, name: "NiMH" }]);
        setBrakesOptions([{ id: 1, name: "Disc" }, { id: 2, name: "Drum" }]);
        setEngineOptions([{ id: 1, name: "Rear" }, { id: 2, name: "Front" }]);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            setFormData((prev) => ({ ...prev, [name]: files[0] }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // POST to API (e.g., /api/bikes/)
        console.log("Submitting:", formData);
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 flex items-center justify-center py-8">
            {/* Header */}
            <header className="bg-white shadow-lg rounded-lg absolute top-0 w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-indigo-600 tracking-tight">Add New Bike</h1>
                    <div className="flex items-center space-x-2">
                        <img src="https://via.placeholder.com/32" alt="Profile" className="w-8 h-8 rounded-full border-2 border-indigo-100" />
                        <span className="text-gray-600 font-medium hidden sm:inline">Admin</span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl mx-auto border border-gray-100 space-y-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 tracking-tight">Create a New Bike</h2>

                    {/* Bike Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Bike Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                            placeholder="Enter bike name"
                        />
                    </div>

                    {/* Descriptions */}
                    <div>
                        <label htmlFor="description_uk" className="block text-sm font-medium text-gray-700 mb-2">
                            Description (Ukrainian)
                        </label>
                        <textarea
                            id="description_uk"
                            name="description_uk"
                            value={formData.description_uk}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                            placeholder="Enter description in Ukrainian"
                            rows={4}
                        />
                    </div>
                    <div>
                        <label htmlFor="description_en" className="block text-sm font-medium text-gray-700 mb-2">
                            Description (English)
                        </label>
                        <textarea
                            id="description_en"
                            name="description_en"
                            value={formData.description_en}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                            placeholder="Enter description in English"
                            rows={4}
                        />
                    </div>
                    <div>
                        <label htmlFor="description_ru" className="block text-sm font-medium text-gray-700 mb-2">
                            Description (Russian)
                        </label>
                        <textarea
                            id="description_ru"
                            name="description_ru"
                            value={formData.description_ru}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                            placeholder="Enter description in Russian"
                            rows={4}
                        />
                    </div>

                    {/* Numeric Fields */}
                    <div>
                        <label htmlFor="price_day" className="block text-sm font-medium text-gray-700 mb-2">
                            Price per Day ($)
                        </label>
                        <input
                            type="number"
                            id="price_day"
                            name="price_day"
                            value={formData.price_day}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                            placeholder="Enter price per day"
                        />
                    </div>
                    <div>
                        <label htmlFor="max_speed" className="block text-sm font-medium text-gray-700 mb-2">
                            Max Speed (km/h)
                        </label>
                        <input
                            type="number"
                            id="max_speed"
                            name="max_speed"
                            value={formData.max_speed}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                            placeholder="Enter max speed"
                        />
                    </div>
                    <div>
                        <label htmlFor="range" className="block text-sm font-medium text-gray-700 mb-2">
                            Range (km)
                        </label>
                        <input
                            type="number"
                            id="range"
                            name="range"
                            value={formData.range}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                            placeholder="Enter range"
                        />
                    </div>
                    <div>
                        <label htmlFor="wheels_size" className="block text-sm font-medium text-gray-700 mb-2">
                            Wheel Size (inches)
                        </label>
                        <input
                            type="number"
                            id="wheels_size"
                            name="wheels_size"
                            value={formData.wheels_size}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                            placeholder="Enter wheel size"
                        />
                    </div>
                    <div>
                        <label htmlFor="power" className="block text-sm font-medium text-gray-700 mb-2">
                            Power (W)
                        </label>
                        <input
                            type="number"
                            id="power"
                            name="power"
                            value={formData.power}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                            placeholder="Enter power"
                        />
                    </div>
                    <div>
                        <label htmlFor="battery_current" className="block text-sm font-medium text-gray-700 mb-2">
                            Battery Current (Ah)
                        </label>
                        <input
                            type="number"
                            id="battery_current"
                            name="battery_current"
                            value={formData.battery_current}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                            placeholder="Enter battery current"
                        />
                    </div>

                    {/* Select Fields */}
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                            Status
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                        >
                            <option value="">Select Status</option>
                            {statusOptions.map((opt) => (
                                <option key={opt.id} value={opt.id}>
                                    {opt.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="battery_type" className="block text-sm font-medium text-gray-700 mb-2">
                            Battery Type
                        </label>
                        <select
                            id="battery_type"
                            name="battery_type"
                            value={formData.battery_type}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                        >
                            <option value="">Select Battery Type</option>
                            {batteryOptions.map((opt) => (
                                <option key={opt.id} value={opt.id}>
                                    {opt.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="brakes_type" className="block text-sm font-medium text-gray-700 mb-2">
                            Brakes Type
                        </label>
                        <select
                            id="brakes_type"
                            name="brakes_type"
                            value={formData.brakes_type}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                        >
                            <option value="">Select Brakes Type</option>
                            {brakesOptions.map((opt) => (
                                <option key={opt.id} value={opt.id}>
                                    {opt.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="engine_position" className="block text-sm font-medium text-gray-700 mb-2">
                            Engine Position
                        </label>
                        <select
                            id="engine_position"
                            name="engine_position"
                            value={formData.engine_position}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                        >
                            <option value="">Select Engine Position</option>
                            {engineOptions.map((opt) => (
                                <option key={opt.id} value={opt.id}>
                                    {opt.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Image Inputs */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Bike Images</h3>
                        {[
                            { name: "main_img", label: "Main Image" },
                            { name: "nav_photo", label: "Navigation Photo" },
                            { name: "landscape_img", label: "Landscape Image" },
                            { name: "side_photo_left", label: "Side Photo (Left)" },
                            { name: "side_photo_right", label: "Side Photo (Right)" },
                            { name: "front_photo_view", label: "Front Photo View" },
                            { name: "rear_photo_view", label: "Rear Photo View" },
                            { name: "top_photo_view", label: "Top Photo View" },
                            { name: "drive_train_closeup_photo", label: "Drive Train Closeup Photo" },
                            { name: "handlebar_controls_photo", label: "Handlebar Controls Photo" },
                            { name: "suspension_fork_photo", label: "Suspension Fork Photo" },
                            { name: "wheel_tire_condition_photo", label: "Wheel/Tire Condition Photo" },
                            { name: "serial_number_or_branding_photo", label: "Serial Number/Branding Photo" },
                        ].map((field) => (
                            <div key={field.name} className="mt-6">
                                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-2">
                                    {field.label}
                                </label>
                                <input
                                    type="file"
                                    id={field.name}
                                    name={field.name}
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-indigo-100 file:text-indigo-600 file:cursor-pointer hover:file:bg-indigo-200"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Form Actions */}
                    <div className="mt-8 flex justify-end space-x-3">
                        <Link
                            to="/admin/catalog"
                            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200 shadow-md font-medium"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-md font-medium"
                        >
                            Add Bike
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default AddNewBike;