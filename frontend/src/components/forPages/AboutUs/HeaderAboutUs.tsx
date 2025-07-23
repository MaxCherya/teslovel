import React from "react";
import AboutUs from "../../../assets/imgs/about-us-header.png";
import { useNavigate } from "react-router-dom";

const HeaderAboutUs: React.FC<{ showContacts: any, setShowContacts: any }> = ({ showContacts, setShowContacts }) => {

    const navigate = useNavigate();

    return (
        <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
            {/* Background image */}
            <img
                src={AboutUs}
                alt="TESLOVEL header"
                className="w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                    Електровелосипеди TESLOVEL
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl mb-6 max-w-3xl drop-shadow">
                    Орендуй, тестуй, насолоджуйся — ми допоможемо тобі!
                </p>
                <div className="flex gap-4 flex-wrap justify-center">
                    <button onClick={() => navigate('/models')} className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition">
                        Орендувати зараз
                    </button>
                    <button onClick={() => setShowContacts(!showContacts)} className="bg-transparent border cursor-pointer border-white hover:bg-white hover:text-black text-white px-6 py-3 rounded-xl font-semibold shadow-md transition">
                        Зв'язок з нами
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeaderAboutUs;