import { useTranslation } from "react-i18next";

const WhyUs = () => {
    const { t } = useTranslation("", { keyPrefix: "about.why_us" });
    const reasons = t("reasons", { returnObjects: true }) as {
        emoji: string;
        text: string;
    }[];

    return (
        <section className="w-full bg-gradient-to-b from-gray-50 to-white py-20 px-6" id="why-us">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-16 tracking-tight">
                    {t("title")}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reasons.map((item, index) => (
                        <div
                            key={index}
                            className="relative bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-center overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative text-5xl mb-4 animate-pulse">{item.emoji}</div>
                            <p className="text-lg font-semibold text-gray-800 leading-relaxed">
                                {item.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyUs;