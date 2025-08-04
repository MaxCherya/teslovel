import React from 'react';
import { useTranslation } from 'react-i18next';

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
}) => {
    const { t } = useTranslation();

    return (
        <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-6">{t('bikeSpecs.title')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-medium text-gray-900">{t('bikeSpecs.performance')}</h3>
                    <ul className="mt-4 space-y-2 text-gray-700">
                        <li><strong>{t('bikeSpecs.maxSpeed')}:</strong> {max_speed} {t('units.kmh')}</li>
                        <li><strong>{t('bikeSpecs.range')}:</strong> {range} {t('units.km')}</li>
                        <li><strong>{t('bikeSpecs.power')}:</strong> {power} {t('units.watt')}</li>
                    </ul>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-medium text-gray-900">{t('bikeSpecs.components')}</h3>
                    <ul className="mt-4 space-y-2 text-gray-700">
                        <li><strong>{t('bikeSpecs.batteryType')}:</strong> {battery_type} {battery_current}{t('units.volt')}</li>
                        <li><strong>{t('bikeSpecs.brakes')}:</strong> {brakes_type}</li>
                        <li><strong>{t('bikeSpecs.wheelSize')}:</strong> {wheels_size} {t('units.inch')}</li>
                        <li><strong>{t('bikeSpecs.enginePosition')}:</strong> {engine_position}</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default BikeSpecs;