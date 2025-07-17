import React, { useState } from "react";
import HeaderAdmin from "../../components/forPages/MainAdminPage/HeaderAdmin";
import NavMenu from "../../components/forPages/MainAdminPage/NavMenu";
import Overview from "../../components/forPages/MainAdminPage/Overview";
import TopClients from "../../components/forPages/MainAdminPage/TopClients";
import TopBikes from "../../components/forPages/MainAdminPage/TopBikes";

const MainAdminPage: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="w-full min-h-screen bg-gray-50 text-gray-900 mt-18 lg:mt-0">
            {/* Header */}
            <HeaderAdmin toggleMenu={toggleMenu} />

            {/* Navigation Menu (Collapsible on Mobile) */}
            <NavMenu isMenuOpen={isMenuOpen} />

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Overview />

                {/* Top Clients Table */}
                <TopClients />
                <TopBikes />
            </main>
        </div>
    );
};

export default MainAdminPage;