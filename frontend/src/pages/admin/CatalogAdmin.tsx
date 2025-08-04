import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchAdminBikePreviews, type BikeAdminPreview } from "../../endpoints/adminBikes";
import FullScreenLoader from "../../components/ui/loaders/FullScreenLoader";
import { useTranslation } from "react-i18next";

const CatalogAdmin: React.FC = () => {
    const [bikes, setBikes] = useState<BikeAdminPreview[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { t } = useTranslation();

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
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:pt-10 pt-25">
                <div className="mb-6 flex flex-wrap gap-4">
                    <Link
                        to="/add-new-bike-admin/"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                    >
                        {t("admin.bike_admin.catalog_admin.add_new_bike")}
                    </Link>
                    <Link
                        to="/motor-positions-admin/"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                    >
                        {t("admin.bike_admin.catalog_admin.manage_motor_positions")}
                    </Link>
                    <Link
                        to="/brake-types-admin/"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                    >
                        {t("admin.bike_admin.catalog_admin.manage_brake_types")}
                    </Link>
                    <Link
                        to="/battery-types-admin/"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                    >
                        {t("admin.bike_admin.catalog_admin.manage_battery_types")}
                    </Link>
                </div>

                {loading ? (
                    <FullScreenLoader />
                ) : (
                    <div className="grid cursor-pointer grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bikes.map((bike) => (
                            <div
                                key={bike.id}
                                onClick={() => navigate(`/bike-page-admin/${bike.id}`)}
                                className="bg-white rounded-lg shadow-md overflow-hidden"
                            >
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