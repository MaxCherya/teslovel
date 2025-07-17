import React from "react";

const TopBikes: React.FC = () => {
    const bikes = [
        { id: 1, name: "Yamaha WR450F", rides: 124 },
        { id: 2, name: "KTM 690 Rally", rides: 103 },
        { id: 3, name: "Honda CRF300L", rides: 89 },
        { id: 4, name: "Suzuki DR-Z400S", rides: 78 },
        { id: 5, name: "Husqvarna FE 501", rides: 72 },
    ];

    return (
        <div className="bg-white shadow rounded-lg mt-8">
            <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Top Bikes</h2>
                <p className="text-sm text-gray-500">Most used bikes by number of rides</p>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bike Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rides</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {bikes.map((bike, index) => (
                            <tr key={bike.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{index + 1}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{bike.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{bike.rides}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TopBikes;