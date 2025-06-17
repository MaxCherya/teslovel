import React from 'react';
import { useTranslation } from 'react-i18next';

const BikeDescription: React.FC<{ name: string; description: string }> = ({ description }) => {
    const { t } = useTranslation();

    return (
        <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-4">{t('bikeDescription.title')}</h2>
            <div
                className="prose max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: description }}
            />
        </section>
    );
};

export default BikeDescription;