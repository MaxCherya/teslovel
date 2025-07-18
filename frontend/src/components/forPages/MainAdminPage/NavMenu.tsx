import React from "react";
import { useTranslation } from "react-i18next";

const NavMenu: React.FC<{ isMenuOpen: boolean }> = ({ isMenuOpen }) => {
    const { t } = useTranslation();

    return (
        <nav className={`${isMenuOpen ? "block" : "hidden"} md:block bg-white md:bg-transparent shadow-md md:shadow-none md:flex md:items-center md:max-w-7xl md:mx-auto md:px-4 sm:px-6 lg:px-8 md:py-4`}>
            <ul className="md:flex md:space-x-4 md:space-y-0 space-y-2 p-4 md:p-0">
                <li>
                    <a href="/catalog-admin/" className="flex items-center px-4 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-md transition-colors">
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                        {t("admin.nav.catalog")}
                    </a>
                </li>
                <li>
                    <a href="/accounts-admin/" className="flex items-center px-4 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-md transition-colors">
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {t("admin.nav.users")}
                    </a>
                </li>
                <li>
                    <a href="/current-orders-admin/" className="flex items-center px-4 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-md transition-colors">
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        {t("admin.nav.orders")}
                    </a>
                </li>
                <li>
                    <a href="/contact-requests-admin/" className="flex items-center px-4 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-md transition-colors">
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {t("admin.nav.contactRequests")}
                    </a>
                </li>
                <li>
                    <a href="/orders-admin/" className="flex items-center px-4 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-md transition-colors">
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {t("admin.nav.orderRequests")}
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default NavMenu;