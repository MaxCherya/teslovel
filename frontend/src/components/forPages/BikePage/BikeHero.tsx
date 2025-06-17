import React from 'react';

interface BikeHeroProps {
    name: string;
    price_day: number;
    landscape_img: string;
}

const BikeHero: React.FC<BikeHeroProps> = ({ name, price_day, landscape_img }) => (
    <section
        className="relative h-[60vh] w-full"
        style={{
            backgroundImage: `url("${landscape_img}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#000', // fallback color
        }}
    >
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{name}</h1>
            <p className="text-lg md:text-xl">Starting at ${price_day}/day</p>
            <button className="mt-6 bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
                Book Now
            </button>
        </div>
    </section>
);

export default BikeHero;