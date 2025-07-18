import React, { useState, useEffect } from "react";
import ActionButtons from "../../components/forPages/BikePageAdmin/ActionButtons";
import Statistic from "../../components/forPages/BikePageAdmin/Statistic";
import RecentRides from "../../components/forPages/BikePageAdmin/RecentRides";
import Expenses from "../../components/forPages/BikePageAdmin/Expenses";
import { useParams } from "react-router-dom";
import { updateBikeStatus, deleteBikeWithOTP, updateBikeName } from "../../endpoints/adminBikes";
import { check2FAStatus } from "../../endpoints/auth";
import FullScreenLoader from "../../components/ui/loaders/FullScreenLoader";
import { fetchBikeExpenses, fetchBikeStats } from "../../endpoints/adminExpenses";
import { fetchBikeRides } from "../../endpoints/BookPage";
import { fetchBike } from "../../endpoints/BikePage";
import BikeDetailsAdmin from "./BikeDetailsAdmin";

const BikePageAdmin: React.FC = () => {
    const { bikeId } = useParams<{ bikeId: string }>();
    const [bikeStatus, setBikeStatus] = useState<string>("1");
    const [bike, setBike] = useState<any>(null);
    const [editingName, setEditingName] = useState(false);
    const [nameInput, setNameInput] = useState("");
    const [rides, setRides] = useState<any[]>([]);
    const [expenses, setExpenses] = useState<any[]>([]);
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
        const loadData = async () => {
            if (!bikeId) return;
            setLoading(true);
            try {
                const bikeIntId = parseInt(bikeId);
                const [bikeData, expensesData, ridesData, statsData] = await Promise.all([
                    fetchBike({ bike_id: bikeIntId }),
                    fetchBikeExpenses(1, bikeIntId),
                    fetchBikeRides(bikeIntId, 1),
                    fetchBikeStats(bikeIntId),
                ]);
                setBike(bikeData);
                if (bikeData) setNameInput(bikeData.name);
                setExpenses(expensesData.results);
                setRides(ridesData.results);
                setStats(statsData);

                const statusMap: Record<string, string> = {
                    "Available": "1",
                    "On maintainance": "2",
                    "Unavailable": "3",
                };

                if (bikeData?.status_original && statusMap[bikeData.status_original]) {
                    setBikeStatus(statusMap[bikeData.status_original]);
                }
            } catch (err) {
                console.error("❌ Failed to load bike data:", err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [bikeId]);

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
                    <div className="flex items-center gap-3">
                        {editingName ? (
                            <>
                                <input
                                    value={nameInput}
                                    onChange={(e) => setNameInput(e.target.value)}
                                    className="text-lg sm:text-2xl font-semibold text-gray-800 border border-gray-300 rounded px-2 py-1"
                                />
                                <button
                                    onClick={async () => {
                                        if (!bike || !bikeId) return;
                                        setLoading(true);
                                        try {
                                            await updateBikeName(parseInt(bikeId), nameInput);
                                            setBike({ ...bike, name: nameInput });
                                            setEditingName(false);
                                        } catch (err) {
                                            console.error("❌ Failed to update name:", err);
                                        } finally {
                                            setLoading(false);
                                        }
                                    }}
                                    className="text-sm bg-blue-600 text-white rounded px-3 py-1 hover:bg-blue-700"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => {
                                        setNameInput(bike.name);
                                        setEditingName(false);
                                    }}
                                    className="text-sm text-gray-600 hover:text-gray-800"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 tracking-tight">
                                    Bike: {bike?.name || "Loading..."}
                                </h2>
                                <button
                                    onClick={() => setEditingName(true)}
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    Edit
                                </button>
                            </>
                        )}
                    </div>
                    {bikeId && (
                        <ActionButtons
                            bikeId={bikeId}
                            bikeStatus={bikeStatus}
                            handleRemoveBike={handleRemoveBike}
                            handleStatusChange={handleStatusChange}
                        />
                    )}
                    <Statistic stats={stats} />
                    {bike && <BikeDetailsAdmin bike={bike} />}
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