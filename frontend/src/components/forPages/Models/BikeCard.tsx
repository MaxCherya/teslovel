import React from "react";
import { GeneralButton } from "../../ui/btns";

interface BikeCardProps {
    id: number;
    photo: string;
    header: string;
    price: number;
    status: string;
}

const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
        case "available":
            return "bg-green-100 text-green-700";
        case "on maintenance":
            return "bg-yellow-100 text-yellow-800";
        case "not available":
            return "bg-red-100 text-red-700";
        default:
            return "bg-gray-200 text-gray-700";
    }
};

const BikeCard: React.FC<BikeCardProps> = ({ id, photo, header, price, status }) => {
    return (
        <div className="relative w-full max-w-md mx-auto bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
                <img
                    src={photo}
                    alt={header}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            <div className="p-5 text-gray-900">
                <h3 className="text-xl font-semibold tracking-tight truncate">{header}</h3>
                <p className="text-sm text-gray-600 mt-1 mb-4">{price} грн / день</p>

                <GeneralButton
                    type="show"
                    label="Забронювати"
                    className="w-full !font-semibold !border !border-blue-600 !bg-transparent !text-blue-600 hover:!bg-blue-600 hover:!text-white py-2 rounded-md uppercase transition-all duration-200"
                    onClick={() => alert(`Renting bike: ${header} (ID: ${id})`)}
                />
            </div>

            <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(status)} shadow-sm`}>
                {status}
            </div>
        </div>
    );
};

export default BikeCard;