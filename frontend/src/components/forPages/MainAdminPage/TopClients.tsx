import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchTopClients, type TopClient } from "../../../endpoints/adminBikes";

const TopClients: React.FC = () => {
    const { t } = useTranslation();
    const [clients, setClients] = useState<TopClient[]>([]);

    useEffect(() => {
        fetchTopClients()
            .then(setClients)
            .catch((err) => console.error("Failed to fetch top clients:", err));
    }, []);

    return (
        <div className="mt-8 bg-white rounded-lg shadow-md">
            <div className="px-4 sm:px-6 py-4 border-b">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                    {t("admin.topClients.title")}
                </h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-left text-gray-600">
                            <th className="px-4 sm:px-6 py-3 text-sm sm:text-base">{t("admin.topClients.columns.name")}</th>
                            <th className="px-4 sm:px-6 py-3 text-sm sm:text-base">{t("admin.topClients.columns.phone")}</th>
                            <th className="px-4 sm:px-6 py-3 text-sm sm:text-base">{t("admin.topClients.columns.rides")}</th>
                            <th className="px-4 sm:px-6 py-3 text-sm sm:text-base">{t("admin.topClients.columns.spent")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client, idx) => (
                            <tr className="border-t" key={idx}>
                                <td className="px-4 sm:px-6 py-4 text-sm sm:text-base">{client.name}</td>
                                <td className="px-4 sm:px-6 py-4 text-sm sm:text-base">{client.phone}</td>
                                <td className="px-4 sm:px-6 py-4 text-sm sm:text-base">{client.total_rides}</td>
                                <td className="px-4 sm:px-6 py-4 text-sm sm:text-base">
                                    {client.total_spent.toLocaleString("uk-UA")} ₴︎
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TopClients;