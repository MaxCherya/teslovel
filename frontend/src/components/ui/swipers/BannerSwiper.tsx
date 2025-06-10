import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface Props {
    banners: { id: number; banner_url: string }[];
}

const BannerSwiper: React.FC<Props> = ({ banners }) => {
    return (
        <div className="w-full bg-black">
            <Swiper
                modules={[Autoplay, A11y, Pagination]}
                loop={true}
                autoplay={{ delay: 5000 }}
                pagination={{ clickable: true }}
                slidesPerView={1}
                className="w-full"
            >
                {banners.map((banner) => (
                    <SwiperSlide key={banner.id}>
                        <div className="w-full">
                            <img
                                src={banner.banner_url}
                                alt={`Banner ${banner.id}`}
                                className="object-contain"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default BannerSwiper;
