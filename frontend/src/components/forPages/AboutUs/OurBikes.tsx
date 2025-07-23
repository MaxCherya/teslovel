import React from "react";

const OurBikes: React.FC = () => {
    const features = [
        { label: "Формула1 рами" },
        { label: "500 Вт мотор" },
        { label: "PAS-система (допомога у педалюванні)" },
        { label: "Дисплей, дискові гальма, гальмівні ручки" },
        { label: "60 А/рік батарея", highlight: true },
    ];

    return (
        <section className="w-full bg-gradient-to-b from-gray-50 to-white py-20 px-6" id="our-bikes">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl lg:text-5xl font-extrabold text-center text-gray-900 mb-12 tracking-tight">
                    Що всередині наших велосипедів?
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className={`flex items-start gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ${feature.highlight ? "border-l-4 border-yellow-500" : ""
                                }`}
                        >
                            <span className="text-3xl mt-1 animate-pulse">
                                {feature.highlight ? "⭐️" : "✔️"}
                            </span>
                            <span
                                className={`text-lg leading-relaxed ${feature.highlight
                                    ? "font-semibold text-yellow-800"
                                    : "text-gray-800 font-medium"
                                    }`}
                            >
                                {feature.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurBikes;