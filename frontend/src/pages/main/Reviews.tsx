import React from "react";

import { useTranslation } from "react-i18next";

const Reviews: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="w-full min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center justify-center p-4 sm:p-8">
            <div className="max-w-5xl w-full">
                <h1 className="text-4xl sm:text-5xl font-bold text-center mb-8 animate-fade-in-down">
                    {t("reviews.title")}
                </h1>
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.01] transition-transform duration-300">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d208348.8210441316!2d35.000356450000005!3d48.462298499999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa6897b741c5cb7a3%3A0xbf41530246ab3a17!2sTeslovel!5e1!3m2!1sen!2sua!4v1754314701922!5m2!1sen!2sua"
                        width="100%"
                        height="450"
                        loading="lazy"
                        className="w-full"
                    ></iframe>
                </div>
                <div className="mt-8 text-center">
                    <p className="text-lg text-gray-600 animate-fade-in-up">
                        {t("reviews.description")}
                    </p>
                    <a
                        href="https://www.google.com/maps/place/Teslovel/@48.4622985,35.00035645,7z/data=!3m1!4b1!4m6!3m5!1s0xa6897b741c5cb7a3:0xbf41530246ab3a17!8m2!3d48.4622985!4d35.00035645!16s%2Fg%2F11l3dw3x60?entry=ttu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                        {t("reviews.leaveReview")}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Reviews;