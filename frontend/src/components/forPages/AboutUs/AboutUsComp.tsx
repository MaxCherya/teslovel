import React from "react";
// import FoundersImage from "../../../assets/imgs/founders.jpg";

const AboutUsComp: React.FC = () => {
    return (
        <section className="w-full py-20 px-6 bg-gradient-to-b from-gray-50 to-white" id="about-us">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Text Section */}
                <div className="space-y-8">
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
                        Про нас
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                        Ми — <strong className="text-blue-600">Микола та Олександр Чергик</strong>.
                        З любов’ю та багаторічним досвідом створюємо електровелосипеди, які приносять радість і комфорт кожному клієнту.
                    </p>

                    <div className="space-y-6 text-gray-800 bg-white p-8 rounded-2xl shadow-xl max-w-md transform hover:scale-[1.02] transition-transform duration-300">
                        {/* Phone Numbers */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="text-3xl text-blue-600 animate-pulse">📞</span>
                                <span className="font-semibold text-lg text-gray-900">Телефон</span>
                            </div>
                            <a
                                href="tel:+380989703036"
                                className="block pl-12 text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 text-base font-medium"
                                title="Call +380 98 970 3036"
                            >
                                +380 98 970 3036
                            </a>
                            <a
                                href="tel:+38031005296"
                                className="block pl-12 text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 text-base font-medium"
                                title="Call +380 31 005 296"
                            >
                                +380 31 005 296
                            </a>
                        </div>

                        {/* Emails */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="text-3xl text-blue-600 animate-pulse">📧</span>
                                <span className="font-semibold text-lg text-gray-900">Електронна пошта</span>
                            </div>
                            <a
                                href="mailto:mykoleer@gmail.com"
                                className="block pl-12 text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 text-base font-medium"
                                title="Email mykoleer@gmail.com"
                            >
                                mykoleer@gmail.com
                            </a>
                            <a
                                href="mailto:sanich2000san@gmail.com"
                                className="block pl-12 text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 text-base font-medium"
                                title="Email sanich2000san@gmail.com"
                            >
                                sanich2000san@gmail.com
                            </a>
                        </div>

                        {/* Instagram */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="text-3xl text-blue-600 animate-pulse">📸</span>
                                <span className="font-semibold text-lg text-gray-900">Instagram</span>
                            </div>
                            <a
                                href="https://instagram.com/teslovel"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block pl-12 text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 text-base font-medium"
                                title="Visit @teslovel on Instagram"
                            >
                                @teslovel
                            </a>
                        </div>
                    </div>
                </div>

                {/* Image Section */}
                <div className="w-full relative">
                    {/* <img
            src={FoundersImage}
            alt="Микола та Олександр Чергик"
            className="rounded-2xl shadow-2xl object-cover w-full h-auto max-h-[600px] transform hover:scale-[1.03] transition-transform duration-300"
          /> */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent rounded-2xl"></div>
                </div>
            </div>
        </section>
    );
};

export default AboutUsComp;