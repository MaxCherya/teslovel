import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../lib/hooks/useAuth";

interface DesktopDropdownUserProps {
    user: {
        username: string;
        phone: string;
    };
}

const DesktopDropdownUser: React.FC<DesktopDropdownUserProps> = ({ user }) => {
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();
    const { logout } = useAuth();

    return (
        <div className="relative">
            <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setOpen(prev => !prev)}
            >
                <div className="w-[20px] h-[20px] rounded-full bg-gradient-to-r from-blue-500 to-red-500 flex items-center justify-center text-white text-sm font-semibold">
                    {user.username.charAt(0).toUpperCase()}
                </div>
                <span className="text-black text-lg font-medium transition-colors">
                    {user.username}
                </span>
            </div>

            {open && (
                <div className="absolute right-0 mt-2 flex flex-col bg-white shadow-lg rounded-lg p-4 w-64 border border-gray-200 z-50">
                    <p className="text-gray-800 font-medium">{t("nav.welcome")}, {user.username}!</p>
                    <p className="text-gray-600 text-sm">{t("nav.phone")}: {user.phone}</p>
                    <a href="/profile" className="text-blue-500 hover:text-blue-700 text-sm font-medium">{t("nav.view_profile")}</a>
                    <a onClick={() => logout()} className="text-red-500 cursor-pointer hover:text-red-700 text-sm font-medium">{t("nav.logout")}</a>
                </div>
            )}
        </div>
    )
}

export default DesktopDropdownUser;