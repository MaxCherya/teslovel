import React from "react";
import { useTranslation } from "react-i18next";

const HeaderAdmin: React.FC<{ toggleMenu: () => void }> = ({ toggleMenu }) => {
    const { t } = useTranslation();

    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-indigo-600">{t("admin.header")}</h1>
                <div className="flex items-center space-x-4">
                    <button className="md:hidden p-2 rounded-md hover:bg-gray-100" onClick={toggleMenu}>
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default HeaderAdmin;