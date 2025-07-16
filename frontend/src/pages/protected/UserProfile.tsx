import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { getUser } from "../../endpoints/UserProfilePage";

const UserProfile: React.FC = () => {
    const { t } = useTranslation();
    const { userId } = useParams<{ userId: string }>();

    const [currentUser, setCurrentUser] = useState<any>([]);

    useEffect(() => {
        const fetchUser = async () => {
            if (userId) {
                const data = await getUser(userId);
                if (data) setCurrentUser(data)
            }
        }
        fetchUser();
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center sm:text-left">
                    {t("profile.title")}
                </h2>

                <div className="flex flex-col sm:flex-row sm:items-start sm:gap-8">
                    <div className="flex justify-center sm:block mb-6 sm:mb-0">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-red-500 text-white flex items-center justify-center text-3xl font-bold">
                            {currentUser?.username?.charAt(0).toUpperCase()}
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600">
                                    {t("profile.username")}
                                </label>
                                <p className="text-lg text-gray-800 font-semibold">{currentUser?.username}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">
                                    {t("profile.phone")}
                                </label>
                                <p className="text-lg text-gray-800 font-semibold">{currentUser?.phone}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;