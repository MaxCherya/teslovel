import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Scrollbar, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

type Img = {
    alt: string,
    src: string,
}

interface Prop {
    imgs: Img[];
    duration?: number;
    onSlideChange?: () => void;
}

const ImgSwiper: React.FC<Prop> = ({ imgs, duration = 3000, onSlideChange }) => {
    return (
        <Swiper
            modules={[Autoplay, Pagination, Scrollbar, A11y]}
            spaceBetween={2}
            slidesPerView={1}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSlideChange={onSlideChange}
            onSwiper={(swiper) => console.log(swiper)}
            autoplay={{ delay: duration, disableOnInteraction: false }}
            loop={true}
        >
            {imgs.map((item, idx) => (
                <SwiperSlide key={idx}>
                    <div className="w-screen overflow-hidden">
                        <img
                            src={item.src}
                            alt={item.alt}
                            className="w-full object-contain"
                        />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default ImgSwiper;