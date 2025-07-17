import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { confirmOtp, setupOtp } from "../../../endpoints/auth";
import { GeneralButton } from "../../ui/btns";
import FullScreenLoader from "../../ui/loaders/FullScreenLoader";

const Enable2FA: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
    const { t } = useTranslation();
    const [showModal, setShowModal] = useState(false);
    const [qrData, setQrData] = useState<{ qr_code_base64: string; otp_uri: string } | null>(null);
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSetup = async () => {
        setLoading(true);
        const result = await setupOtp();
        setLoading(false);
        if (result) {
            setQrData(result);
            setShowModal(true);
        }
    };

    const handleConfirm = async () => {
        setLoading(true);
        setError("");
        const success = await confirmOtp(otp);
        setLoading(false);
        if (success) {
            setShowModal(false);
            setOtp("");
            setQrData(null);
            onFinish();
        } else {
            setError(t("profile.invalid_otp"));
        }
    };

    return (
        <div className="mt-6 flex">

            {loading && <FullScreenLoader />}

            <GeneralButton type="show" label={t("profile.enable2fa")} onClick={handleSetup} className="px-4" />

            {showModal && qrData && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4 text-center">{t("profile.scan_qr")}</h3>
                        <img src={`data:image/png;base64,${qrData.qr_code_base64}`} alt="QR Code" className="mx-auto mb-4" />
                        <p className="text-sm text-center break-all mb-2">{qrData.otp_uri}</p>
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
                            <GeneralButton type="show" label={t("profile.confirm") || "Confirm"} onClick={handleConfirm} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Enable2FA;