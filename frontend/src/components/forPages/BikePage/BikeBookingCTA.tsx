import React from 'react';

const BikeBookingCTA: React.FC<{ status: string; name: string }> = ({ status, name }) => (
    <section className="text-center">
        <h2 className="text-3xl font-semibold mb-4">Ready to Ride?</h2>
        <p className="text-gray-700 mb-6">
            {status === 'Available'
                ? `The ${name} is available for booking!`
                : `The ${name} is currently unavailable.`}
        </p>
        <button
            className={`py-3 px-6 rounded-lg font-semibold transition duration-300 ${status === 'Available'
                ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
            disabled={status !== 'Available'}
        >
            {status === 'Available' ? 'Book Now' : 'Unavailable'}
        </button>
    </section>
);

export default BikeBookingCTA;