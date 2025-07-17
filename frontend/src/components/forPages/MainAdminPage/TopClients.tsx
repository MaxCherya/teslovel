import React from "react";

const TopClients: React.FC = () => {
    return (
        <div className="mt-8 bg-white rounded-lg shadow-md">
            <div className="px-4 sm:px-6 py-4 border-b">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">Top Clients</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-left text-gray-600">
                            <th className="px-4 sm:px-6 py-3 text-sm sm:text-base">Client Name</th>
                            <th className="px-4 sm:px-6 py-3 text-sm sm:text-base">Total Rides</th>
                            <th className="px-4 sm:px-6 py-3 text-sm sm:text-base">Total Spent</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t">
                            <td className="px-4 sm:px-6 py-4 text-sm sm:text-base">Emma Thompson</td>
                            <td className="px-4 sm:px-6 py-4 text-sm sm:text-base">45</td>
                            <td className="px-4 sm:px-6 py-4 text-sm sm:text-base">$1,230</td>
                        </tr>
                        <tr className="border-t">
                            <td className="px-4 sm:px-6 py-4 text-sm sm:text-base">Liam Carter</td>
                            <td className="px-4 sm:px-6 py-4 text-sm sm:text-base">38</td>
                            <td className="px-4 sm:px-6 py-4 text-sm sm:text-base">$980</td>
                        </tr>
                        <tr className="border-t">
                            <td className="px-4 sm:px-6 py-4 text-sm sm:text-base">Olivia Brown</td>
                            <td className="px-4 sm:px-6 py-4 text-sm sm:text-base">32</td>
                            <td className="px-4 sm:px-6 py-4 text-sm sm:text-base">$870</td>
                        </tr>
                        <tr className="border-t">
                            <td className="px-4 sm:px-6 py-4 text-sm sm:text-base">Noah Wilson</td>
                            <td className="px-4 sm:px-6 py-4 text-sm sm:text-base">29</td>
                            <td className="px-4 sm:px-6 py-4 text-sm sm:text-base">$750</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TopClients;