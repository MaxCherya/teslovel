import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../../endpoints/UserProfilePage";

import Enable2FA from "../../components/forPages/UserProfilePage/Enable2FA";
import Header from "../../components/forPages/UserProfilePage/HeaderComp";
import Disable2FA from "../../components/forPages/UserProfilePage/Disable2FA";

const UserProfile: React.FC = () => {
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

    const onFinishEnable = () => {
        setCurrentUser((prev: any) => ({
            ...prev,
            has_2fa: true,
        }))
    }

    const onFinishDisable = () => {
        setCurrentUser((prev: any) => ({
            ...prev,
            has_2fa: false,
        }))
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 mt-12 lg:mt-0">
            <Header currentUser={currentUser} />
            {currentUser.is_user && (
                <div className="flex flex-col sm:flex-row sm:items-start sm:gap-8 lg:max-w-4xl mx-auto justify-center align-middle items-center">
                    {currentUser.has_2fa ? <Disable2FA onFinish={onFinishDisable} /> : <Enable2FA onFinish={onFinishEnable} />}

                </div>
            )}
        </div>
    );
};

export default UserProfile;