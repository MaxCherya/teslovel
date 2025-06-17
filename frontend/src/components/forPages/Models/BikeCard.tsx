import React from 'react';
import { GeneralButton } from '../../ui/btns';
import { useNavigate } from 'react-router-dom';

interface BikeCardProps {
    id: number;
    photo: string;
    header: string;
    price: number;
    status: string;
}

const getStatusStyle = (status: string): string => {
    switch (status.toLowerCase()) {
        case 'available':
            return 'bg-green-500 text-white';
        case 'on maintenance':
            return 'bg-yellow-500 text-white';
        case 'not available':
            return 'bg-red-500 text-white';
        default:
            return 'bg-gray-500 text-white';
    }
};

const BikeCard: React.FC<BikeCardProps> = ({ id, photo, header, price, status }) => {

    const navigate = useNavigate();

    return (
        <div className="relative w-full max-w-sm mx-auto bg-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden">
            <div className="relative w-full h-64 overflow-hidden rounded-t-2xl">
                <img
                    src={photo}
                    alt={header}
                    className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-110"
                />
                <div
                    className={`absolute top-4 right-4 px-4 py-1 rounded-full text-sm font-semibold ${getStatusStyle(status)} shadow-md`}
                >
                    {status}
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 truncate">{header}</h3>
                <p className="text-lg text-gray-600 mt-2 mb-4">{price} грн / день</p>
                <GeneralButton
                    type="show"
                    label="Забронювати"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:text-stone-300 hover:from-blue-700 hover:to-indigo-700 shadow-lg text-lg py-3 rounded-lg"
                    onClick={() => navigate(``)}
                />
            </div>
        </div>
    );
};

export default BikeCard;