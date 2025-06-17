import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

interface BikesMenuProps {
    showBikes: boolean;
    setShowBikes: (val: boolean) => void;
    bikes: any;
    toggleMenu: () => void;
}

const BikesMenu: React.FC<BikesMenuProps> = ({ showBikes, setShowBikes, bikes, toggleMenu }) => {
    const { t } = useTranslation();

    return (
        <AnimatePresence>
            {showBikes && (
                <motion.div
                    key="bikes-menu"
                    initial={{ y: "-100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="fixed inset-0 bg-white shadow-xl z-50 flex flex-col items-center lg:w-full lg:max-h-max lg:rounded-b-lg lg:border-t lg:border-gray-200 overflow-y-auto pt-12 lg:pt-0"
                    onMouseEnter={() => window.innerWidth >= 1024 && setShowBikes(true)}
                    onMouseLeave={() => window.innerWidth >= 1024 && setShowBikes(false)}
                >
                    <div className="fixed px-4 bottom-4 w-full bg-white flex flex-row justify-between items-center border-t pt-2 lg:hidden">
                        <span
                            onClick={() => setShowBikes(false)}
                            className="font-bold text-xl cursor-pointer"
                        >
                            {"<"}
                        </span>
                        <p className="text-base">{t("bikesMenu.title")}</p>
                        <span
                            onClick={toggleMenu}
                            className="font-bold text-xl cursor-pointer"
                        >
                            ×
                        </span>
                    </div>
                    <ul className="flex flex-col gap-4 px-4 py-6 w-full max-w-7xl mx-auto overflow-y-auto lg:px-6">
                        {bikes.map((bike: any) => (
                            <li
                                key={bike.id}
                                className="w-full bg-gray-50 lg:bg-transparent lg:shadow-none rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                            >
                                <a
                                    href={`/models/${bike.id}`}
                                    className="flex flex-row justify-evenly w-full items-center gap-4 p-4 group"
                                >
                                    <img
                                        src={bike.nav_photo}
                                        alt={bike.name}
                                        className="w-20 object-cover rounded-md flex-shrink-0 group-hover:scale-105 transition-transform duration-200"
                                    />
                                    <div className="flex flex-col items-center">
                                        <span className="text-gray-800 font-medium text-base group-hover:text-blue-600 transition-colors duration-200">
                                            {bike.name}
                                        </span>
                                    </div>
                                </a>
                            </li>
                        ))}
                        <li className="py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                            <a
                                href="/models"
                                className="block text-center text-blue-600 font-semibold text-lg hover:text-blue-800 transition-colors duration-200"
                            >
                                {t("bikesMenu.allModels")}
                            </a>
                        </li>
                    </ul>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BikesMenu;