import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteBrakesType, fetchBrakesTypes } from "../../endpoints/specs";
import FullScreenLoader from "../../components/ui/loaders/FullScreenLoader";
import { useTranslation } from "react-i18next";

interface BrakesType {
    id: number;
    name_uk: string;
    name_en: string;
    name_ru: string;
}

const BrakesTypeAdmin: React.FC = () => {
    const [brakesTypes, setBrakesTypes] = useState<BrakesType[]>([]);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation("", { keyPrefix: "admin.bike_admin.brakes_type_admin" });

    const loadBrakesTypes = async () => {
        try {
            const data = await fetchBrakesTypes();
            setBrakesTypes(data);
        } catch (err) {
            console.error("Failed to fetch brake types:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBrakesTypes();
    }, []);

    const handleRemove = async (id: number) => {
        if (!window.confirm(t("confirm_delete"))) return;

        try {
            await deleteBrakesType(id);
            setBrakesTypes((prev) => prev.filter((type) => type.id !== id));
        } catch (err) {
            console.error("Failed to delete brake type:", err);
        }
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 lg:mt-0 mt-18">

            <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 pt-20 sm:pt-24 pb-8">
                <div className="bg-white rounded-xl shadow-2xl p-4 sm:p-6 lg:p-8 max-w-full mx-auto border border-gray-100">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6">
                        <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 tracking-tight mb-2 sm:mb-0">{t("title")}</h2>
                        <Link
                            to="/add-brake-type-admin/"
                            className="px-4 sm:px-6 py-2 sm:py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-md font-medium text-sm sm:text-base"
                        >
                            {t("add")}
                        </Link>
                    </div>

                    {loading ? (
                        <FullScreenLoader />
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[640px]">
                                <thead>
                                    <tr className="text-left text-gray-600">
                                        <th className="px-4 py-2">{t("table.name_uk")}</th>
                                        <th className="px-4 py-2">{t("table.name_en")}</th>
                                        <th className="px-4 py-2">{t("table.name_ru")}</th>
                                        <th className="px-4 py-2">{t("table.actions")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {brakesTypes.map((type) => (
                                        <tr key={type.id} className="border-t border-gray-200">
                                            <td className="px-4 py-3">{type.name_uk}</td>
                                            <td className="px-4 py-3">{type.name_en}</td>
                                            <td className="px-4 py-3">{type.name_ru}</td>
                                            <td className="px-4 py-3">
                                                <button
                                                    onClick={() => handleRemove(type.id)}
                                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 shadow-md text-sm"
                                                >
                                                    {t("remove")}
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

export default BrakesTypeAdmin;