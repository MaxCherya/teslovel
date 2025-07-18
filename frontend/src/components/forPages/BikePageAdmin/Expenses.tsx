import React from "react";

interface Expense {
    id: number;
    date: string;
    description: string;
    amount: number;
}

const Expenses: React.FC<{ expenses: Expense[] }> = ({ expenses }) => {
    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Expenses</h3>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left text-gray-600 font-medium">ID</th>
                            <th className="px-4 py-2 text-left text-gray-600 font-medium">Date</th>
                            <th className="px-4 py-2 text-left text-gray-600 font-medium">Description</th>
                            <th className="px-4 py-2 text-left text-gray-600 font-medium">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {expenses.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center py-4 text-gray-500">
                                    No expenses found.
                                </td>
                            </tr>
                        ) : (
                            expenses.map((expense) => (
                                <tr key={expense.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2">{expense.id}</td>
                                    <td className="px-4 py-2">{new Date(expense.date).toLocaleDateString()}</td>
                                    <td className="px-4 py-2">{expense.description}</td>
                                    <td className="px-4 py-2">{expense.amount} ₴</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Expenses;