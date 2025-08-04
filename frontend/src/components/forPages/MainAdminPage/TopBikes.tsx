import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchTopBikes, type TopBike } from "../../../endpoints/adminBikes";

const TopBikes: React.FC = () => {
    const { t } = useTranslation();
    const [bikes, setBikes] = useState<TopBike[]>([]);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchTopBikes();
                setBikes(data);
            } catch (err) {
                console.error("Failed to load top bikes:", err);
            }
        };
        load();
    }, []);

    return (
        <div className="bg-white shadow rounded-lg mt-8">
            <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">
                    {t("admin.topBikes.title")}
                </h2>
                <p className="text-sm text-gray-500">
                    {t("admin.topBikes.subtitle")}
                </p>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                {t("admin.topBikes.columns.index")}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                {t("admin.topBikes.columns.name")}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                {t("admin.topBikes.columns.rides")}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {bikes.map((bike, index) => (
                            <tr key={bike.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {index + 1}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {bike.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {bike.rides}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TopBikes;