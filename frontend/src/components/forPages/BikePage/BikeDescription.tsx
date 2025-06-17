import React from 'react';

const BikeDescription: React.FC<{ name: string; description: string }> = ({ name, description }) => (
    <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">About</h2>
        <div
            className="prose max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: description }}
        />
    </section>
);

export default BikeDescription;