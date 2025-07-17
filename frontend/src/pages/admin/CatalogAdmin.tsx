import React from "react";
import { Link } from "react-router-dom"; // Assuming react-router-dom is used for navigation

const CatalogAdmin: React.FC = () => {
    // Sample bike data (replace with actual data from API or state management)
    const bikes = [
        { id: 1, name: "City Cruiser", image: "https://via.placeholder.com/300x200?text=City+Cruiser" },
        { id: 2, name: "Mountain Blaze", image: "https://via.placeholder.com/300x200?text=Mountain+Blaze" },
        { id: 3, name: "Road Rocket", image: "https://via.placeholder.com/300x200?text=Road+Rocket" },
        { id: 4, name: "Electric Surge", image: "https://via.placeholder.com/300x200?text=Electric+Surge" },
    ];

    return (
        <div className="w-full min-h-screen bg-gray-50 text-gray-900">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-indigo-600">Bike Catalog</h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Navigation Buttons */}
                <div className="mb-6 flex flex-wrap gap-4">
                    <Link
                        to="/add-new-bike-admin/"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                    >
                        Add New Bike
                    </Link>
                    <Link
                        to="/motor-positions-admin/"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                    >
                        Manage Motor Positions
                    </Link>
                    <Link
                        to="/brake-types-admin/"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                    >
                        Manage Brake Types
                    </Link>
                    <Link
                        to="/battery-types-admin/"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                    >
                        Manage Battery Types
                    </Link>
                </div>

                {/* Bike Catalog Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bikes.map((bike) => (
                        <div key={bike.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img
                                src={bike.image}
                                alt={bike.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-800">{bike.name}</h3>
                                <button className="mt-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors">
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default CatalogAdmin;