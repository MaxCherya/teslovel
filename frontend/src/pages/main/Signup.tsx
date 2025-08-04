import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiPhoneCall, FiLock } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../lib/hooks/useAuth";

const Signup: React.FC = () => {
    const { t } = useTranslation();
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState<{
        phone?: string;
        password?: string;
        confirmPassword?: string;
    }>({});

    const navigate = useNavigate();
    const { register } = useAuth();

    const validatePhone = (phone: string): string | undefined => {
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        if (!phone) return t("signup.errors.requiredPhone");
        if (!phoneRegex.test(phone.replace(/\s/g, ""))) return t("signup.errors.invalidPhone");
        return undefined;
    };

    const validatePassword = (password: string): string | undefined => {
        if (!password) return t("signup.errors.requiredPassword");
        if (password.length < 8) return t("signup.errors.passwordLength");
        if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password))
            return t("signup.errors.passwordFormat");
        return undefined;
    };

    const validateConfirmPassword = (password: string, confirmPassword: string): string | undefined => {
        if (!confirmPassword) return t("signup.errors.requiredConfirm");
        if (password !== confirmPassword) return t("signup.errors.passwordMismatch");
        return undefined;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const phoneError = validatePhone(phone);
        const passwordError = validatePassword(password);
        const confirmPasswordError = validateConfirmPassword(password, confirmPassword);

        setErrors({
            phone: phoneError,
            password: passwordError,
            confirmPassword: confirmPasswordError,
        });

        if (!phoneError && !passwordError && !confirmPasswordError) {
            const success = await register(phone, password);

            if (success) {
                toast.success(t("signup.successMessage"));
                navigate("/login");
            } else {
                toast.error(t("signup.failureMessage"));
            }
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
                <h2 className="text-2xl font-bold text-center mb-6">{t("signup.title")}</h2>
                <div className="space-y-6">
                    <div className="relative flex flex-col">
                        <div className="relative flex items-center">
                            <FiPhoneCall className="absolute left-3 text-gray-400 w-5 h-5" />
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => {
                                    let val = e.target.value;

                                    // Always starts with +
                                    if (!val.startsWith("+")) {
                                        val = "+" + val.replace(/[^0-9]/g, "");
                                    }

                                    setPhone(val);
                                    setErrors((prev) => ({
                                        ...prev,
                                        phone: validatePhone(val),
                                    }));
                                }}
                                placeholder={t("signup.phonePlaceholder")}
                                className={`w-full pl-10 pr-4 py-3 border ${errors.phone ? "border-red-500" : "border-gray-300"
                                    } rounded-full focus:outline-none focus:ring-2 focus:ring-black text-sm`}
                            />
                        </div>
                        {errors.phone && (
                            <p className="text-red-500 text-xs mt-1 ml-4">{errors.phone}</p>
                        )}
                    </div>

                    <div className="relative flex flex-col">
                        <div className="relative flex items-center">
                            <FiLock className="absolute left-3 text-gray-400 w-5 h-5" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setErrors((prev) => ({
                                        ...prev,
                                        password: validatePassword(e.target.value),
                                    }));
                                }}
                                placeholder={t("signup.passwordPlaceholder")}
                                className={`w-full pl-10 pr-4 py-3 border ${errors.password ? "border-red-500" : "border-gray-300"
                                    } rounded-full focus:outline-none focus:ring-2 focus:ring-black text-sm`}
                            />
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1 ml-4">{errors.password}</p>
                        )}
                    </div>

                    <div className="relative flex flex-col">
                        <div className="relative flex items-center">
                            <FiLock className="absolute left-3 text-gray-400 w-5 h-5" />
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    setErrors((prev) => ({
                                        ...prev,
                                        confirmPassword: validateConfirmPassword(password, e.target.value),
                                    }));
                                }}
                                placeholder={t("signup.confirmPasswordPlaceholder")}
                                className={`w-full pl-10 pr-4 py-3 border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"
                                    } rounded-full focus:outline-none focus:ring-2 focus:ring-black text-sm`}
                            />
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-xs mt-1 ml-4">{errors.confirmPassword}</p>
                        )}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSubmit}
                        className="w-full py-3 cursor-pointer bg-black text-white rounded-full font-medium text-sm hover:bg-gray-800 transition-colors"
                    >
                        {t("signup.signupBtn")}
                    </motion.button>
                </div>

                <p className="text-center text-sm mt-6 text-gray-600">
                    {t("signup.hasAccount")}{" "}
                    <a href="/login" className="text-black font-medium hover:underline">
                        {t("signup.loginLink")}
                    </a>
                </p>
            </motion.div>
        </div>
    );
};

export default Signup;