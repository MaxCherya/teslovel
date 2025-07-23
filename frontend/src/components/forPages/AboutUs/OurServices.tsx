import { useTranslation } from "react-i18next";

const OurServices = () => {
    const { t } = useTranslation("", { keyPrefix: "about.our_services" });
    const services = t("items", { returnObjects: true }) as {
        icon: string;
        title: string;
        description: string;
    }[];

    return (
        <section className="w-full bg-gradient-to-b from-gray-50 to-white py-20 px-6" id="our-services">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl lg:text-5xl font-extrabold text-center text-gray-900 mb-16 tracking-tight">
                    {t("title")}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="relative bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-center overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative text-5xl mb-4 animate-pulse">{service.icon}</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {service.title}
                            </h3>
                            <p className="text-gray-600 text-base leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurServices;