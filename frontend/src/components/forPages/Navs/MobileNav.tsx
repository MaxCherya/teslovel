import React from "react";
import { TiThMenu } from "react-icons/ti";
import Logo from "../../../assets/imgs/icon.png";
import { GrLanguage } from "react-icons/gr";
import { PiPhoneCall } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MobileDropdownUser from "./MobileDropdownUser";
import { useAuth } from "../../../lib/hooks/useAuth";

interface MobileNavProps {
    toggleLanguageMenu: () => void;
    setShowLanguageMenu: (show: boolean) => void;
    toggleMenu: () => void;
    showMenu: boolean;
    showBikes: boolean;
    setShowBikes: (val: boolean) => void;
    setShowContacts: (val: boolean) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({
    toggleLanguageMenu,
    toggleMenu,
    showMenu,
    showBikes,
    setShowBikes,
    setShowContacts
}) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { user } = useAuth()

    return (
        <>
            <div className="fixed bg-white w-full top-0 z-50 flex flex-row lg:hidden justify-between items-center align-middle p-4 overflow-hidden">
                <img src={Logo} className="h-[4svh] cursor-pointer" onClick={() => navigate(`/`)} />
                <p className="text-black text-2xl" onClick={toggleMenu}>
                    {showMenu ? <IoClose /> : <TiThMenu />}
                </p>
            </div>

            <AnimatePresence>
                {showMenu && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ y: "-100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "-100%", opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed inset-0 bg-white z-40 overflow-y-auto flex flex-col items-center pt-20"
                    >
                        <div onClick={() => setShowBikes(!showBikes)} className="w-full flex flex-row justify-between items-center p-4">
                            <a className="text-black hover:text-gray-700">
                                {t("nav.models")}
                            </a>
                            <span>{">"}</span>
                        </div>
                        <div className="w-full flex flex-row justify-between items-center p-4">
                            <a href="/blog" className="text-black hover:text-gray-700">
                                {t("nav.blog")}
                            </a>
                            <span>{">"}</span>
                        </div>
                        <div className="w-full flex flex-row justify-between items-center p-4">
                            <a href="/about" className="text-black hover:text-gray-700">
                                {t("nav.about")}
                            </a>
                            <span>{">"}</span>
                        </div>
                        <div className="w-full flex flex-row justify-between items-center p-4">
                            <a href="/contact" className="text-black hover:text-gray-700">
                                {t("nav.contacts")}
                            </a>
                            <span>{">"}</span>
                        </div>
                        <div onClick={toggleLanguageMenu} className="w-full flex flex-row justify-between items-center p-4">
                            <div className="flex flex-row gap-4 items-center align-middle font-semibold">
                                <p className="text-black text-lg hover:text-gray-700 cursor-pointer">
                                    <GrLanguage />
                                </p>
                                <p>{t("nav.language")}</p>
                            </div>
                            <span>{">"}</span>
                        </div>
                        <div className="w-full flex flex-row justify-between items-center p-4" onClick={() => setShowContacts(true)}>
                            <div className="flex flex-row gap-4 items-center align-middle font-semibold">
                                <a className="text-black text-xl hover:text-gray-700">
                                    <PiPhoneCall />
                                </a>
                                <p>{t("nav.call")}</p>
                            </div>
                            <span>{">"}</span>
                        </div>
                        {user ? <MobileDropdownUser user={user} /> : (
                            <div className="w-full flex flex-row justify-between items-center p-4">
                                <div className="flex flex-row gap-4 items-center align-middle font-semibold">
                                    <a
                                        href="/login"
                                        className="text-black text-xl hover:text-gray-700"
                                    >
                                        <CgProfile />
                                    </a>
                                    <p>{t("nav.account")}</p>
                                </div>
                                <span>{">"}</span>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default MobileNav;