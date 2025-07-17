import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchAdminBikePreviews, type BikeAdminPreview } from "../../endpoints/adminBikes";
import FullScreenLoader from "../../components/ui/loaders/FullScreenLoader";

const CatalogAdmin: React.FC = () => {
    const [bikes, setBikes] = useState<BikeAdminPreview[]>([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const loadBikes = async () => {
            try {
                const data = await fetchAdminBikePreviews();
                setBikes(data);
            } catch (err) {
                console.error("Failed to load bikes", err);
            } finally {
                setLoading(false);
            }
        };
        loadBikes();
    }, []);

    return (
        <div className="w-full min-h-screen bg-gray-50 text-gray-900">

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:pt-10 pt-25">
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
                {loading ? (
                    <FullScreenLoader />
                ) : (
                    <div className="grid cursor-pointer grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bikes.map((bike) => (
                            <div key={bike.id} onClick={() => navigate(`/bike-page-admin/${bike.id}`)} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <img
                                    src={bike.main_img}
                                    alt={bike.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4 flex flex-col items-center justify-center w-full">
                                    <h3 className="text-lg font-semibold text-gray-800">{bike.name}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default CatalogAdmin;