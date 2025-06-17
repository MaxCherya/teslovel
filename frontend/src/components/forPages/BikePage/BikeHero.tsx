import React from 'react';
import { useTranslation } from 'react-i18next';

interface BikeHeroProps {
    name: string;
    price_day: number;
    landscape_img: string;
    status: string;
}

const BikeHero: React.FC<BikeHeroProps> = ({ name, price_day, landscape_img, status }) => {
    const { t } = useTranslation();

    return (
        <section
            className="relative h-[60vh] w-full"
            style={{
                backgroundImage: `url("${landscape_img}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: '#000',
            }}
        >
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white text-center px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{name}</h1>
                <p className="text-lg md:text-xl">
                    {t('bikeHero.pricePerDay', { price: price_day })}
                </p>
                <button
                    disabled={status !== 'Available'}
                    className={`mt-6 py-3 px-6 rounded-lg font-semibold transition duration-300
                        ${status === 'Available'
                            ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                            : 'bg-gray-400 text-gray-700 cursor-not-allowed'}
                    `}
                >
                    {status === 'Available'
                        ? t('bikeHero.bookBtn')
                        : t('bikeHero.unavailableBtn')}
                </button>
            </div>
        </section>
    );
};

export default BikeHero;