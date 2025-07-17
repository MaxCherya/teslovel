import React from "react";

const Expenses: React.FC<{ expenses: any }> = ({ expenses }) => {
    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Expenses</h3>
            <div className="overflow-x-auto">
                <table className="w-full min-w-[640px]">
                    <thead>
                        <tr className="text-left text-gray-600">
                            <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs sm:text-sm lg:text-base font-medium">Expense ID</th>
                            <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs sm:text-sm lg:text-base font-medium">Date</th>
                            <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs sm:text-sm lg:text-base font-medium">Description</th>
                            <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs sm:text-sm lg:text-base font-medium">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((expense: any) => (
                            <tr key={expense.id} className="border-t border-gray-200">
                                <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm lg:text-base">{expense.id}</td>
                                <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm lg:text-base">{expense.date}</td>
                                <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm lg:text-base">{expense.description}</td>
                                <td className="px-2 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm lg:text-base">{expense.amount} UAH</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Expenses;