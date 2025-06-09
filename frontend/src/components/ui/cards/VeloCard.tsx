import React from 'react';
import { useTranslation } from 'react-i18next';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { CTAButton } from '../btns';

interface Props {
    id: number;
    img: string;
    name: string;
    price_day: number;
}

const VeloCard: React.FC<Props> = ({ id, img, name, price_day }) => {

    const { t } = useTranslation();

    return (
        <div>
            <div
                style={{
                    height: '360px',
                    width: '100%',
                    backgroundImage: `url(${img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div key={id} className='h-[360px]' style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
                    <div className='absolute bottom-20 left-1/12 flex flex-col'>
                        <h3 className='text-white text-lg md:text-xl font-semibold'>{name}</h3>
                        <p className='text-white text-base md:text-sm mb-3'>Від {price_day} грн за день оренди</p>
                        <CTAButton type='order' label={t('homePage.catwalk.bookBtn')} />
                    </div>
                </div>
            </div>
            <div className='bg-white h-10' />
        </div>
    );
};

export default VeloCard;