import React from 'react';
import { GeneralButton } from '../../ui/btns';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface BikeCardProps {
    id: number;
    photo: string;
    header: string;
    price: number;
    status: string;
    status_original: string;
}

const getStatusStyle = (status: string): string => {
    switch (status.toLowerCase()) {
        case 'available':
            return 'bg-green-100 text-green-800';
        case 'on maintenance':
            return 'bg-yellow-100 text-yellow-800';
        case 'not available':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

const BikeCard: React.FC<BikeCardProps> = ({ id, photo, header, price, status, status_original }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="w-full max-w-xs mx-auto bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="relative">
                <img
                    src={photo}
                    alt={header}
                    className="w-full h-48 object-cover"
                />
                <span
                    className={`absolute top-2 left-2 px-2 py-1 text-xs font-semibold rounded-md ${getStatusStyle(status_original)}`}
                >
                    {status}
                </span>
            </div>
            <div className="p-4">
                <h3 className="text-base font-semibold text-gray-900 truncate">{header}</h3>
                <p className="text-sm text-gray-600 mt-1">
                    {price} {t('bikeCard.priceSuffix')}
                </p>
                <GeneralButton
                    type="show"
                    label={t('bikeCard.bookBtn')}
                    className="mt-3 w-full bg-blue-600 text-white text-sm font-medium py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                    onClick={() => navigate(`/models/${id}`)}
                />
            </div>
        </div>
    );
};

export default BikeCard;