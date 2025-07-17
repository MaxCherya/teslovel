import React, { useState, useEffect } from "react";
import ActionButtons from "../../components/forPages/BikePageAdmin/ActionButtons";
import Statistic from "../../components/forPages/BikePageAdmin/Statistic";
import RecentRides from "../../components/forPages/BikePageAdmin/RecentRides";
import Expenses from "../../components/forPages/BikePageAdmin/Expenses";
import { useParams } from "react-router-dom";
import { updateBikeStatus, deleteBikeWithOTP } from "../../endpoints/adminBikes";
import { check2FAStatus } from "../../endpoints/auth";
import FullScreenLoader from "../../components/ui/loaders/FullScreenLoader";

interface Ride {
    id: number;
    start_time: string;
    end_time: string;
    duration: string;
    cost: number;
}

interface Expense {
    id: number;
    date: string;
    description: string;
    amount: number;
}

const BikePageAdmin: React.FC = () => {
    const { bikeId } = useParams<{ bikeId: string }>();
    const [bikeStatus, setBikeStatus] = useState<string>("1");
    const [rides, setRides] = useState<Ride[]>([]);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [stats, setStats] = useState({
        totalRides: 0,
        ridesThisMonth: 0,
        ridesToday: 0,
        totalRevenue: 0,
        revenueThisMonth: 0,
        revenueToday: 0,
        totalExpenses: 0,
        expensesThisMonth: 0,
        expensesToday: 0,
    });

    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otpCode, setOtpCode] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch bike data, rides, and expenses (replace with real API calls)
        setRides([
            { id: 1, start_time: "2025-07-15 10:00", end_time: "2025-07-15 11:30", duration: "1h 30m", cost: 150 },
            { id: 2, start_time: "2025-07-14 14:00", end_time: "2025-07-14 15:00", duration: "1h", cost: 100 },
            { id: 3, start_time: "2025-07-13 09:00", end_time: "2025-07-13 10:45", duration: "1h 45m", cost: 175 },
        ]);
        setExpenses([
            { id: 1, date: "2025-07-15", description: "Tire replacement", amount: 500 },
            { id: 2, date: "2025-07-10", description: "Battery maintenance", amount: 300 },
        ]);
        setStats({
            totalRides: 50,
            ridesThisMonth: 10,
            ridesToday: 2,
            totalRevenue: 7500,
            revenueThisMonth: 1500,
            revenueToday: 300,
            totalExpenses: 1200,
            expensesThisMonth: 800,
            expensesToday: 500,
        });
    }, []);

    const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value;
        setBikeStatus(newStatus);
        try {
            setLoading(true);
            if (bikeId) {
                await updateBikeStatus(bikeId, parseInt(newStatus));
            }
        } catch (error) {
            console.error("Failed to update status", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveBike = async () => {
        try {
            setLoading(true);
            const needsOtp = await check2FAStatus();
            if (needsOtp) {
                setShowOtpModal(true);
            } else {
                if (!bikeId) return;
                await deleteBikeWithOTP(parseInt(bikeId));
                window.location.href = "/catalog-admin/";
            }
        } catch (err: any) {
            setErrorMsg(err.message || "Failed to check 2FA");
        } finally {
            setLoading(false);
        }
    };


    const handleOtpSubmit = async () => {
        if (!bikeId) return;
        try {
            setLoading(true);
            await deleteBikeWithOTP(parseInt(bikeId), otpCode);
            setShowOtpModal(false);
            window.location.href = "/catalog-admin/";
        } catch (err: any) {
            setErrorMsg(err.message || "Failed to delete");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900">
            {loading && <FullScreenLoader />}
            <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 lg:pt-8 pt-25 pb-8">
                <div className="bg-white rounded-xl shadow-2xl p-4 sm:p-6 lg:p-8 max-w-full mx-auto border border-gray-100 space-y-6">
                    <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 tracking-tight">Bike: City Cruiser</h2>
                    <ActionButtons bikeStatus={bikeStatus} handleRemoveBike={handleRemoveBike} handleStatusChange={handleStatusChange} />
                    <Statistic stats={stats} />
                    <RecentRides rides={rides} />
                    <Expenses expenses={expenses} />
                </div>
            </main>

            {showOtpModal && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
                        <h3 className="text-lg font-bold mb-4">Enter OTP to confirm deletion</h3>
                        <input
                            type="text"
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3"
                            placeholder="Enter OTP code"
                        />
                        {errorMsg && <p className="text-sm text-red-500 mb-2">{errorMsg}</p>}
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setShowOtpModal(false)}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleOtpSubmit}
                                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg"
                            >
                                Delete Bike
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BikePageAdmin;