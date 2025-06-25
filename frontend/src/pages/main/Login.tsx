import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiPhoneCall, FiLock } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../lib/hooks/useAuth";

const Login: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { login } = useAuth();
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!phone || !password) {
            setError(t("login.errors.required"));
            return;
        }

        setError("");
        const success = await login(phone, password);

        if (success) {
            toast.success(t("login.success"));
            navigate("/");
        } else {
            toast.error(t("login.failure"));
        }
    };

    return (
        <div className="w-full min-h-screen bg-gray-100 text-gray-900 flex items-center justify-center py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full sm:max-w-md md:max-w-md lg:max-w-md max-w-[95%] bg-white rounded-lg shadow-lg p-8"
            >
                <h2 className="text-2xl font-bold text-center mb-6">{t("login.title")}</h2>
                {error && (
                    <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
                )}
                <div className="space-y-6">
                    <div className="relative">
                        <FiPhoneCall className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder={t("login.phonePlaceholder")}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black text-sm"
                        />
                    </div>
                    <div className="relative">
                        <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={t("login.passwordPlaceholder")}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black text-sm"
                        />
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSubmit}
                        className="w-full cursor-pointer py-3 bg-black text-white rounded-full font-medium text-sm hover:bg-gray-800 transition-colors"
                    >
                        {t("login.loginBtn")}
                    </motion.button>
                </div>
                <p className="text-center text-sm mt-6 text-gray-600">
                    {t("login.noAccount")}{" "}
                    <a href="/signup" className="text-black font-medium hover:underline">
                        {t("login.signUp")}
                    </a>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;