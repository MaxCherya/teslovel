import React from "react";

interface Ride {
    id: number;
    name: string;
    phone: string;
    start_date: string;
    end_date: string;
    amount: number;
}

const RecentRides: React.FC<{ rides: Ride[] }> = ({ rides }) => {
    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Rides</h3>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left text-gray-600 font-medium">ID</th>
                            <th className="px-4 py-2 text-left text-gray-600 font-medium">Client</th>
                            <th className="px-4 py-2 text-left text-gray-600 font-medium">Phone</th>
                            <th className="px-4 py-2 text-left text-gray-600 font-medium">Start</th>
                            <th className="px-4 py-2 text-left text-gray-600 font-medium">End</th>
                            <th className="px-4 py-2 text-left text-gray-600 font-medium">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {rides.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-4 text-gray-500">
                                    No rides found.
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