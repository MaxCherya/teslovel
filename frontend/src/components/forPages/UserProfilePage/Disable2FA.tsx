import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { disableOtp } from "../../../endpoints/auth";
import { GeneralButton } from "../../ui/btns";
import FullScreenLoader from "../../ui/loaders/FullScreenLoader";

const Disable2FA: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
    const { t } = useTranslation();
    const [showModal, setShowModal] = useState(false);
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleDisable = async () => {
        setLoading(true);
        setError("");
        const success = await disableOtp(otp);
        setLoading(false);
        if (success) {
            setShowModal(false);
            setOtp("");
            onFinish();
        } else {
            setError(t("profile.invalid_otp"));
        }
    };

    return (
        <div className="mt-6 flex">
            {loading && <FullScreenLoader />}
            <GeneralButton type="cancel" label={t("profile.disable2fa")} onClick={() => setShowModal(true)} />

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4 text-center">{t("profile.enter_otp_to_disable")}</h3>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder={t("profile.otp_placeholder")}
                            className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
                        />
                        {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}
                        <div className="flex justify-between">
                            <GeneralButton type="cancel" label={t("profile.cancel") || "Cancel"} onClick={() => setShowModal(false)} />
                            <GeneralButton type="show" label={t("profile.confirm") || "Confirm"} onClick={handleDisable} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Disable2FA;