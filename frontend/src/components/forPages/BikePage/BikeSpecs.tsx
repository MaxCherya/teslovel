import React from 'react';

interface BikeSpecsProps {
    max_speed: number;
    range: number;
    power: number;
    battery_type: string;
    battery_current: number;
    brakes_type: string;
    wheels_size: number;
    engine_position: string;
}

const BikeSpecs: React.FC<BikeSpecsProps> = ({
    max_speed,
    range,
    power,
    battery_type,
    battery_current,
    brakes_type,
    wheels_size,
    engine_position,
}) => (
    <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6">Specifications</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-gray-900">Performance</h3>
                <ul className="mt-4 space-y-2 text-gray-700">
                    <li><strong>Max Speed:</strong> {max_speed} km/h</li>
                    <li><strong>Range:</strong> {range} km</li>
                    <li><strong>Power:</strong> {power} W</li>
                </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-gray-900">Components</h3>
                <ul className="mt-4 space-y-2 text-gray-700">
                    <li><strong>Battery Type:</strong> {battery_type} {battery_current}V</li>
                    <li><strong>Brakes:</strong> {brakes_type}</li>
                    <li><strong>Wheel Size:</strong> {wheels_size} inches</li>
                    <li><strong>Engine Position:</strong> {engine_position}</li>
                </ul>
            </div>
        </div>
    </section>
);

export default BikeSpecs;