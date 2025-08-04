import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
    title: string;
}

const BookingHeader: React.FC<Props> = ({ title }) => {
    const navigate = useNavigate();
    return (
        <div className="w-full bg-white z-10">
            <div className="flex flex-row justify-between w-full">
                <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">{title}</h1>
                <button
                    onClick={() => navigate(-1)}
                    className="text-gray-500 hover:text-gray-700 text-2xl font-medium transition-colors duration-200"
                    aria-label="Close"
                >
                    ×
                </button>
            </div>
        </div>
    );
};

export default BookingHeader;