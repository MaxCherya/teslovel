import { useTranslation } from "react-i18next";

const Pros = () => {
    const { t } = useTranslation("", { keyPrefix: "about.rental_pros" });
    const items = t("items", { returnObjects: true }) as {
        icon: string;
        text: string;
    }[];

    return (
        <section className="w-full bg-gradient-to-b from-white to-gray-50 py-20 px-6" id="rental-pros">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl lg:text-5xl font-extrabold text-center text-gray-900 mb-16 tracking-tight">
                    {t("title")}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                        >
                            <div className="text-4xl mt-1 animate-pulse">{item.icon}</div>
                            <p className="text-lg font-medium text-gray-800 leading-relaxed">
                                {item.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pros;