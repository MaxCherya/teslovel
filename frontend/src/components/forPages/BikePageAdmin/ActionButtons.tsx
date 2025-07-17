import React from "react";
import { Link } from "react-router-dom";

const ActionButtons: React.FC<{ handleRemoveBike: () => void, bikeStatus: string | number | undefined, handleStatusChange: (e: any) => void }> = ({ handleRemoveBike, handleStatusChange, bikeStatus }) => {

    return (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <Link
                    to="/admin/add-expense"
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-md font-medium text-sm sm:text-base"
                >
                    Add Expense
                </Link>
                <button
                    onClick={handleRemoveBike}
                    className="cursor-pointer px-4 sm:px-6 py-2 sm:py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 shadow-md font-medium text-sm sm:text-base"
                >
                    Remove Bike
                </button>
            </div>
            <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                    Change Status
                </label>
                <select
                    id="status"
                    value={bikeStatus}
                    onChange={handleStatusChange}
                    className="px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 text-sm sm:text-base"
                >
                    <option value="1">Available</option>
                    <option value="2">On Maintenance</option>
                    <option value="3">Not Available</option>
                </select>
            </div>
        </div>
    )
}

export default ActionButtons;