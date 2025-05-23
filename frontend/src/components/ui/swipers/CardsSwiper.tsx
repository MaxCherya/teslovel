import React from "react";
import type { catwalkContent } from "../../../lib/types/product";
import VeloCard from "../cards/VeloCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y, Pagination } from "swiper/modules";
import { motion } from 'framer-motion';

interface Props {
    content: catwalkContent[]
}

const CardsSwiper: React.FC<Props> = ({ content }) => {
    return (
        <div className="w-full max-w-5xl">
            <motion.h1
                className="text-xl md:text-2xl lg:text-4xl font-bold text-black text-center mb-12 px-4 tracking-tight"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: false, amount: 0.3 }}
            >
                Останні моделі
            </motion.h1>
            <Swiper
                modules={[Autoplay, A11y, Pagination]}
                spaceBetween={5}
                pagination={{ clickable: true }}
                slidesPerView={2}
                loop={true}
                autoplay={{ delay: 9000 }}
                breakpoints={{
                    0: {
                        slidesPerView: 1, // mobile
                    },
                    768: {
                        slidesPerView: 2, // tablets and up
                    },
                }}
            >
                {content.map((vel) => (
                    <SwiperSlide key={vel.id}>
                        <VeloCard id={vel.id} img={vel.landscape_img} name={vel.name} price_day={vel.price_day} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CardsSwiper;