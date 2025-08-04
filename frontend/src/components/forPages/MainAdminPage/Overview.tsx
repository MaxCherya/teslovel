import React from "react";
import { useTranslation } from "react-i18next";
import type { OverviewStats } from "../../../endpoints/adminUsers";

interface OverviewProps {
    stats: OverviewStats;
}

const Overview: React.FC<OverviewProps> = ({ stats }) => {
    const { t } = useTranslation();
    const now = new Date();

    const today = `${String(now.getDate()).padStart(2, "0")}.${String(now.getMonth() + 1).padStart(2, "0")}.${now.getFullYear()}`;
    const month = `${String(now.getMonth() + 1).padStart(2, "0")}.${now.getFullYear()}`;

    const net_total_income = stats.total_revenue - stats.total_expenses;
    const net_monthly_income = stats.monthly_revenue - stats.monthly_expenses;
    const net_today_income = stats.today_revenue - stats.today_expenses;

    return (
        <div className="space-y-8">
            <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">{t("admin.overview.revenue.title")}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card title={t("admin.overview.revenue.total")} value={stats.total_revenue} subtitle={t("admin.overview.allTime")} />
                    <Card title={t("admin.overview.revenue.monthly")} value={stats.monthly_revenue} subtitle={month} />
                    <Card title={t("admin.overview.revenue.today")} value={stats.today_revenue} subtitle={today} />
                </div>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">{t("admin.overview.expenses.title")}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card title={t("admin.overview.expenses.total")} value={stats.total_expenses} subtitle={t("admin.overview.allTime")} />
                    <Card title={t("admin.overview.expenses.monthly")} value={stats.monthly_expenses} subtitle={month} />
                    <Card title={t("admin.overview.expenses.today")} value={stats.today_expenses} subtitle={today} />
                </div>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">{t("admin.overview.net.title")}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card title={t("admin.overview.net.total")} value={net_total_income} subtitle={t("admin.overview.net.totalSubtitle")} isNet />
                    <Card title={t("admin.overview.net.monthly")} value={net_monthly_income} subtitle={t("admin.overview.net.monthlySubtitle", { month })} isNet />
                    <Card title={t("admin.overview.net.today")} value={net_today_income} subtitle={t("admin.overview.net.todaySubtitle", { today })} isNet />
                </div>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">{t("admin.overview.other.title")}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                    <Card title={t("admin.overview.other.rides")} value={stats.total_rides} subtitle={t("admin.overview.allTime")} />
                    <Card title={t("admin.overview.other.clients")} value={stats.total_clients} subtitle={t("admin.overview.allTime")} />
                </div>
            </section>
        </div>
    );
};

const Card: React.FC<{
    title: string;
    value: number;
    subtitle: string;
    isNet?: boolean;
}> = ({ title, value, subtitle, isNet = false }) => {
    const isCurrency = title.toLowerCase().includes("revenue") ||
        title.toLowerCase().includes("expense") ||
        title.toLowerCase().includes("income");

    const formattedValue = isCurrency
        ? `${value.toLocaleString("uk-UA")} ₴︎`
        : value.toLocaleString("uk-UA");

    const valueClass = isNet
        ? value > 0
            ? "text-green-600"
            : value < 0
                ? "text-red-600"
                : "text-gray-800"
        : isCurrency
            ? "text-indigo-600"
            : "text-gray-800";

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800">{title}</h3>
            <p className={`mt-2 text-2xl sm:text-3xl font-bold ${valueClass}`}>{formattedValue}</p>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">{subtitle}</p>
        </div>
    );
};

export default Overview;