import React from "react";

const Overview: React.FC = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Total Revenue */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">Total Revenue</h3>
                <p className="mt-2 text-2xl sm:text-3xl font-bold text-indigo-600">$25,430</p>
                <p className="mt-1 text-xs sm:text-sm text-gray-500">All time</p>
            </div>
            {/* Today's Revenue */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">Today's Revenue</h3>
                <p className="mt-2 text-2xl sm:text-3xl font-bold text-indigo-600">$320</p>
                <p className="mt-1 text-xs sm:text-sm text-gray-500">July 17, 2025</p>
            </div>
            {/* Monthly Revenue */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">Monthly Revenue</h3>
                <p className="mt-2 text-2xl sm:text-3xl font-bold text-indigo-600">$4,870</p>
                <p className="mt-1 text-xs sm:text-sm text-gray-500">July 2025</p>
            </div>
            {/* Total Rides */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">Total Rides</h3>
                <p className="mt-2 text-2xl sm:text-3xl font-bold text-indigo-600">1,892</p>
                <p className="mt-1 text-xs sm:text-sm text-gray-500">All time</p>
            </div>
            {/* Total Clients */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">Total Clients</h3>
                <p className="mt-2 text-2xl sm:text-3xl font-bold text-indigo-600">645</p>
                <p className="mt-1 text-xs sm:text-sm text-gray-500">All time</p>
            </div>
        </div>
    )
}

export default Overview;