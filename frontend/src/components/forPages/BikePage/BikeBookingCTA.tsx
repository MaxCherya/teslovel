import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const BikeBookingCTA: React.FC<{ id: any; status: string; name: string }> = ({ id, status, name }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const isAvailable = status === 'Available';

    return (
        <section className="text-center">
            <h2 className="text-3xl font-semibold mb-4">{t('bikeBooking.title')}</h2>
            <p className="text-gray-700 mb-6">
                {isAvailable
                    ? t('bikeBooking.available', { name })
                    : t('bikeBooking.unavailable', { name })}
            </p>
            <button
                className={`py-3 px-6 rounded-lg font-semibold transition duration-300 ${isAvailable
                    ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                    : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
                disabled={!isAvailable}
                onClick={() => navigate(`/book/${id}`)}
            >
                {isAvailable
                    ? t('bikeBooking.bookBtn')
                    : t('bikeBooking.unavailableBtn')}
            </button>
        </section>
    );
};

export default BikeBookingCTA;
