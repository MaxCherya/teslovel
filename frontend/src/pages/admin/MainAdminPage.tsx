import React, { useState, useEffect } from "react";
import HeaderAdmin from "../../components/forPages/MainAdminPage/HeaderAdmin";
import NavMenu from "../../components/forPages/MainAdminPage/NavMenu";
import Overview from "../../components/forPages/MainAdminPage/Overview";
import TopClients from "../../components/forPages/MainAdminPage/TopClients";
import TopBikes from "../../components/forPages/MainAdminPage/TopBikes";
import { fetchOverviewStats, type OverviewStats } from "../../endpoints/adminUsers";
import FullScreenLoader from "../../components/ui/loaders/FullScreenLoader";

const MainAdminPage: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [overviewStats, setOverviewStats] = useState<OverviewStats | null>(null);
    const [loading, setLoading] = useState(true);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    useEffect(() => {
        const loadStats = async () => {
            try {
                const stats = await fetchOverviewStats();
                setOverviewStats(stats);
            } catch (err) {
                console.error("❌ Failed to fetch overview stats:", err);
            } finally {
                setLoading(false);
            }
        };
        loadStats();
    }, []);

    return (
        <div className="w-full min-h-screen bg-gray-50 text-gray-900 mt-18 lg:mt-0">
            <HeaderAdmin toggleMenu={toggleMenu} />
            <NavMenu isMenuOpen={isMenuOpen} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {loading ? (
                    <FullScreenLoader />
                ) : (
                    <>
                        {overviewStats && <Overview stats={overviewStats} />}
                        <TopClients />
                        <TopBikes />
                    </>
                )}
            </main>
        </div>
    );
};

export default MainAdminPage;