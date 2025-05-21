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
    onIndexChange?: (index: number) => void;
}

const ImgSwiper: React.FC<Prop> = ({ imgs, duration = 3000, onSlideChange, onIndexChange }) => {
    return (
        <Swiper
            modules={[Autoplay, Pagination, Scrollbar, A11y]}
            spaceBetween={2}
            slidesPerView={1}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSlideChange={(swiper) => {
                onSlideChange && onSlideChange();
                onIndexChange && onIndexChange(swiper.realIndex);
            }}
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
                            className="w-auto h-[85vh] object-cover mx-auto sm:h-[85vh] sm:w-full sm:object-contain
                                md:h-[70vh] md:object-cover lg:h-[85vh]"
                        />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default ImgSwiper;