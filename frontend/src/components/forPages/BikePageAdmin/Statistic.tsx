import React from "react";
import { useTranslation } from "react-i18next";

const formatUAH = (value: number) =>
    new Intl.NumberFormat("uk-UA", {
        style: "currency",
        currency: "UAH",
        minimumFractionDigits: 0,
    }).format(value);

const DiffLabel: React.FC<{ diff: number }> = ({ diff }) => {
    const style =
        diff === 0 ? "text-gray-500" : diff > 0 ? "text-green-600" : "text-red-600";
    const sign = diff > 0 ? "+" : diff < 0 ? "−" : "±";

    return <span className={`font-medium ${style}`}>{sign}{Math.abs(diff)}</span>;
};

const Statistic: React.FC<{ stats: any }> = ({ stats }) => {
    const netIncome = stats.totalRevenue - stats.totalExpenses;
    const { t } = useTranslation("", { keyPrefix: "admin.bike_admin.stats" });

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Rides */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600">{t("total_rides")}</h3>
                <p className="text-lg sm:text-xl font-semibold text-gray-800">{stats.totalRides}</p>
                <p className="text-xs text-gray-500">
                    {t("this_month")}: {stats.ridesThisMonth} (<DiffLabel diff={stats.ridesThisMonth - stats.totalRides} />)
                </p>
                <p className="text-xs text-gray-500">
                    {t("today")}: {stats.ridesToday} (<DiffLabel diff={stats.ridesToday - stats.totalRides} />)
                </p>
            </div>

            {/* Total Revenue */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600">{t("total_revenue")}</h3>
                <p className="text-lg sm:text-xl font-semibold text-gray-800">{formatUAH(stats.totalRevenue)}</p>
                <p className="text-xs text-gray-500">
                    {t("this_month")}: {formatUAH(stats.revenueThisMonth)} (<DiffLabel diff={stats.revenueThisMonth - stats.totalRevenue} />)
                </p>
                <p className="text-xs text-gray-500">
                    {t("today")}: {formatUAH(stats.revenueToday)} (<DiffLabel diff={stats.revenueToday - stats.totalRevenue} />)
                </p>
            </div>

            {/* Total Expenses */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600">{t("total_expenses")}</h3>
                <p className="text-lg sm:text-xl font-semibold text-gray-800">{formatUAH(stats.totalExpenses)}</p>
                <p className="text-xs text-gray-500">
                    {t("this_month")}: {formatUAH(stats.expensesThisMonth)} (<DiffLabel diff={stats.expensesThisMonth - stats.totalExpenses} />)
                </p>
                <p className="text-xs text-gray-500">
                    {t("today")}: {formatUAH(stats.expensesToday)} (<DiffLabel diff={stats.expensesToday - stats.totalExpenses} />)
                </p>
            </div>

            {/* Net Income */}
            <div className="bg-gray-100 p-4 rounded-lg shadow border border-gray-300">
                <h3 className="text-sm font-medium text-gray-700">{t("net_income")}</h3>
                <p className={`text-lg sm:text-xl font-semibold ${netIncome >= 0 ? "text-green-700" : "text-red-700"}`}>
                    {formatUAH(netIncome)}
                </p>
                <p className="text-xs text-gray-500">{t("revenue_minus_expenses")}</p>
            </div>
        </div>
    );
};

export default Statistic;