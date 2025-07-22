import React, { useState } from "react";
import { createBrakesType } from "../../endpoints/specs"; // adjust import path as needed
import { toast } from "react-toastify";
import FullScreenLoader from "../../components/ui/loaders/FullScreenLoader";
import { useTranslation } from "react-i18next";

const AddBrakesType: React.FC = () => {
    const [formData, setFormData] = useState({
        name_uk: "",
        name_en: "",
        name_ru: "",
    });

    const { t } = useTranslation();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await createBrakesType(formData);
            toast.success(t("admin.brakesType.success"));
            setFormData({ name_uk: "", name_en: "", name_ru: "" });
        } catch (error) {
            console.error(error);
            toast.error(t("admin.brakesType.error"));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 flex items-center justify-center py-8">
            {isSubmitting && <FullScreenLoader />}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-2xl p-8 max-w-lg mx-auto border border-gray-100 space-y-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 tracking-tight">{t("admin.brakesType.addTitle")}</h2>

                    {["name_uk", "name_en", "name_ru"].map((field) => (
                        <div key={field}>
                            <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-2">
                                {t(`admin.brakesType.name${field.split("_")[1].toUpperCase()}`)}
                            </label>
                            <input
                                type="text"
                                id={field}
                                name={field}
                                value={(formData as any)[field]}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                                placeholder={t(`admin.brakesType.placeholder${field.split("_")[1].toUpperCase()}`)}
                            />
                        </div>
                    ))}

                    <div className="mt-8 flex justify-center space-x-3">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`cursor-pointer px-6 py-3 text-white rounded-lg transition-all duration-200 shadow-md font-medium ${isSubmitting ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
                                }`}
                        >
                            {isSubmitting ? t("admin.brakesType.submitting") : t("admin.brakesType.submit")}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default AddBrakesType;