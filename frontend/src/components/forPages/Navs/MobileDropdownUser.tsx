import React from "react";
import { useTranslation } from "react-i18next";

interface MobileDropdownUserProps {
    user: {
        id: number;
        username: string;
        phone: string;
    };
}

const MobileDropdownUser: React.FC<MobileDropdownUserProps> = ({ user }) => {
    const { t } = useTranslation();

    return (
        <div className="w-full flex flex-col items-start px-4 py-2 border-t border-gray-200">
            <p className="text-gray-800 font-semibold text-base mb-1">
                {t("nav.welcome")}, {user.username}!
            </p>
            <p className="text-gray-600 text-sm mb-3">{t("nav.phone")}: {user.phone}</p>
            <a
                href={`/user/${user.id}`}
                className="text-blue-500 hover:text-blue-700 text-sm font-medium mb-2"
            >
                {t("nav.view_profile")}
            </a>
            <a
                href="/logout"
                className="text-red-500 hover:text-red-700 text-sm font-medium"
            >
                {t("nav.logout")}
            </a>
        </div>
    );
};

export default MobileDropdownUser;