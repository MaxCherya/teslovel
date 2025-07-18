import React from "react";
import type { OverviewStats } from "../../../endpoints/adminUsers";

interface OverviewProps {
    stats: OverviewStats;
}

const Overview: React.FC<OverviewProps> = ({ stats }) => {
    const today = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    const month = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
    });

    const net_total_income = stats.total_revenue - stats.total_expenses;
    const net_monthly_income = stats.monthly_revenue - stats.monthly_expenses;
    const net_today_income = stats.today_revenue - stats.today_expenses;

    return (
        <div className="space-y-8">
            {/* Revenue Section */}
            <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Revenue</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card title="Total Revenue" value={stats.total_revenue} subtitle="All time" />
                    <Card title="Monthly Revenue" value={stats.monthly_revenue} subtitle={month} />
                    <Card title="Today's Revenue" value={stats.today_revenue} subtitle={today} />
                </div>
            </section>

            {/* Expenses Section */}
            <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Expenses</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card title="Total Expenses" value={stats.total_expenses} subtitle="All time" />
                    <Card title="Monthly Expenses" value={stats.monthly_expenses} subtitle={month} />
                    <Card title="Today's Expenses" value={stats.today_expenses} subtitle={today} />
                </div>
            </section>

            {/* Net Income Section */}
            <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Net Income</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card title="Total Net Income" value={net_total_income} subtitle="Revenue - Expenses" isNet />
                    <Card title="Monthly Net Income" value={net_monthly_income} subtitle={`In ${month}`} isNet />
                    <Card title="Today's Net Income" value={net_today_income} subtitle={`On ${today}`} isNet />
                </div>
            </section>

            {/* Other Section */}
            <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Other Metrics</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                    <Card title="Total Rides" value={stats.total_rides} subtitle="All time" />
                    <Card title="Total Clients" value={stats.total_clients} subtitle="All time" />
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