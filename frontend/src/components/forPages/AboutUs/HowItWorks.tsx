import React from "react";
import { useTranslation } from "react-i18next";

const HowItWorks: React.FC = () => {
    const { t } = useTranslation("", { keyPrefix: "about.how_it_works" });

    const steps = t("steps", { returnObjects: true }) as { emoji: string; text: string }[];

    return (
        <section className="w-full bg-gradient-to-b from-white to-gray-50 py-20 px-6" id="how-it-works">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl lg:text-5xl font-extrabold text-center text-gray-900 mb-16 tracking-tight">
                    {t("title")}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="relative flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg max-w-[220px] mx-auto transform hover:scale-105 transition-all duration-300 group"
                        >
                            <div className="text-5xl mb-4 animate-bounce">{step.emoji}</div>
                            <div className="text-base font-semibold text-gray-800 leading-relaxed">
                                {step.text}
                            </div>
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-1 bg-blue-600 transform translate-x-full group-hover:bg-blue-800 transition-colors duration-300" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;