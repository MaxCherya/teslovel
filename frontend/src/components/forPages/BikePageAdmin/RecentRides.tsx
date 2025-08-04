import React from "react";
import { useTranslation } from "react-i18next";

interface Ride {
    id: number;
    name: string;
    phone: string;
    start_date: string;
    end_date: string;
    amount: number;
}

const RecentRides: React.FC<{ rides: Ride[] }> = ({ rides }) => {
    const { t } = useTranslation("", { keyPrefix: "admin.bike_admin.rides" });

    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t("title")}</h3>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left text-gray-600 font-medium">{t("id")}</th>
                            <th className="px-4 py-2 text-left text-gray-600 font-medium">{t("client")}</th>
                            <th className="px-4 py-2 text-left text-gray-600 font-medium">{t("phone")}</th>
                            <th className="px-4 py-2 text-left text-gray-600 font-medium">{t("start")}</th>
                            <th className="px-4 py-2 text-left text-gray-600 font-medium">{t("end")}</th>
                            <th className="px-4 py-2 text-left text-gray-600 font-medium">{t("amount")}</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {rides.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-4 text-gray-500">
                                    {t("no_data")}
                                </td>
                            </tr>
                        ) : (
                            rides.map((ride) => (
                                <tr key={ride.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2">{ride.id}</td>
                                    <td className="px-4 py-2">{ride.name}</td>
                                    <td className="px-4 py-2">{ride.phone}</td>
                                    <td className="px-4 py-2">{new Date(ride.start_date).toLocaleDateString()}</td>
                                    <td className="px-4 py-2">{new Date(ride.end_date).toLocaleDateString()}</td>
                                    <td className="px-4 py-2">{ride.amount} ₴</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentRides;