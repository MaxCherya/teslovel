import React from "react";

const RecentRides: React.FC<{ rides: any }> = ({ rides }) => {
    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Rides</h3>
            <div className="overflow-x-auto">
                <table className="w-full min-w-[640px]">
                    <thead>
                        <tr className="text-left text-gray-600">
                            <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs sm:text-sm lg:text-base font-medium">Ride ID</th>
                            <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs sm:text-sm lg:text-base font-medium">Start Time</th>
                            <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs sm:text-sm lg:text-base font-medium">End Time</th>
                            <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs sm:text-sm lg:text-base font-medium">Duration</th>
                            <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs sm:text-sm lg:text-base font-medium">Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rides.map((ride: any) => (
                            <tr key={ride.id} className="border-t border-gray-200">
                                <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm lg:text-base">{ride.id}</td>
                                <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm lg:text-base">{ride.start_time}</td>
                                <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm lg:text-base">{ride.end_time}</td>
                                <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm lg:text-base">{ride.duration}</td>
                                <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm lg:text-base">{ride.cost} UAH</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RecentRides;