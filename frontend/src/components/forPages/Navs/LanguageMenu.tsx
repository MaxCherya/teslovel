import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const Languages = [
    { value: "uk", Label: "Українська" },
    { value: "en", Label: "English" },
    { value: "ru", Label: "Русский" },
];

interface LanguageMenuProps {
    showLanguageMenu: boolean;
    toggleLanguageMenu: () => void;
    toggleMenu: () => void;
}

const LanguageMenu: React.FC<LanguageMenuProps> = ({
    showLanguageMenu,
    toggleLanguageMenu,
    toggleMenu,
}) => {
    const { i18n, t } = useTranslation();
    const currentLanguage = i18n.language;

    const changeLanguage = (lang: string) => {
        if (lang !== currentLanguage) {
            i18n.changeLanguage(lang);
        }
        toggleLanguageMenu(); // Optional: auto-close menu after selection
    };

    return (
        <AnimatePresence>
            {showLanguageMenu && (
                <motion.div
                    key="language-menu"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "100%", opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center overflow-y-auto pt-12"
                >
                    <div className="fixed px-4 bottom-0 lg:top-0 lg:bottom-auto w-full bg-white flex flex-row justify-between items-center border-t lg:border-b lg:border-t-0 pt-2 py-4">
                        <span
                            onClick={toggleLanguageMenu}
                            className="font-bold text-xl cursor-pointer"
                        >
                            {"<"}
                        </span>
                        <p className="text-base">{t("languageMenu.title")}</p>
                        <span
                            onClick={toggleMenu}
                            className="font-bold text-xl cursor-pointer lg:hidden"
                        >
                            ×
                        </span>
                    </div>

                    {Languages.map((lang) => (
                        <p
                            key={lang.value}
                            className={`text-black text-lg cursor-pointer hover:text-gray-700 mb-4 ${currentLanguage === lang.value ? "font-bold" : ""
                                }`}
                            onClick={() => changeLanguage(lang.value)}
                        >
                            {lang.Label}
                        </p>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LanguageMenu;