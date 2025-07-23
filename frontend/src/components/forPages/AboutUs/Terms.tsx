import { useTranslation } from "react-i18next";

const Terms = () => {
    const { t } = useTranslation("", { keyPrefix: "about.terms" });
    const items = t("items", { returnObjects: true }) as {
        title: string;
        price: string;
        icon: string;
        bg: string;
    }[];

    return (
        <section className="w-full bg-gradient-to-b from-white to-gray-50 py-20 px-6" id="terms">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-16 tracking-tight">
                    {t("title")}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {items.map((term, index) => (
                        <div
                            key={index}
                            className={`${term.bg} text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative text-5xl mb-4 animate-pulse">{term.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{term.title}</h3>
                            <p className="text-base font-medium leading-relaxed">{term.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Terms;