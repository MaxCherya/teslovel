// icons
import { PiSpeedometerFill } from "react-icons/pi";
import { GiPathDistance } from "react-icons/gi";
import { GiCartwheel } from "react-icons/gi";

import ImgSwiper from "../../ui/swipers/ImgSwiper";
import { CTAButton } from "../../ui/btns";
import type { catwalkContent } from "../../../lib/types/product";
import { useState } from "react";
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next";

interface Props {
    catwalk: catwalkContent[]
}

const HeaderCatwalk: React.FC<Props> = ({ catwalk }) => {

    const duration = 9000 // ms
    const progressWidth = '8vw'
    const [activeIndex, setActiveIndex] = useState(0);
    const { t } = useTranslation();

    return (
        <div className="relative w-screen overflow-hidden">
            {/* Swiper images as background layer */}
            <ImgSwiper
                duration={duration}
                onIndexChange={setActiveIndex}
                imgs={catwalk?.map((item) => ({
                    src: item.landscape_img,
                    alt: item.name,
                }))}
            />

            {/* Overlay with semi-transparent background */}
            <div className="absolute inset-0 bg-black/60 z-10" />

            {/* Text content on top of the overlay */}
            <div className="absolute inset-0 z-20 flex items-center justify-center px-4">

                {/* Progress */}
                <div className="absolute bottom-1 flex flex-row gap-4">
                    {Array.from({ length: catwalk.length }).map((_, index) => (
                        <div
                            key={index}
                            style={{ width: progressWidth }}
                            className="relative bg-gray-400 h-[0.2rem] overflow-hidden"
                        >
                            {index === activeIndex && (
                                <motion.div
                                    key={activeIndex}
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: duration / 1000, ease: "linear" }}
                                    className="absolute h-[0.2rem] bg-white"
                                />
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex flex-col items-center w-full max-w-6xl mx-auto gap-6 sm:gap-8 md:gap-10 lg:gap-12 text-center">
                    {/* Bike Name */}
                    <h1 className="text-white text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-semibold">
                        {catwalk[activeIndex].name}
                    </h1>

                    {/* CTA Button */}
                    <div className="flex justify-center">
                        <CTAButton
                            type="order"
                            label={t('homePage.catwalk.bookBtn')}
                            className="text-sm sm:text-base md:text-xl lg:text-2xl px-6 sm:px-10 py-2 sm:py-3"
                        />
                    </div>

                    {/* Stats */}
                    <div className="flex flex-row gap-6 sm:gap-12 text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl">
                        <div className="flex flex-col items-center">
                            <PiSpeedometerFill className="text-2xl sm:text-3xl mb-1" />
                            <p>{catwalk[activeIndex].max_speed} {t('homePage.catwalk.kmH')}</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <GiCartwheel className="text-2xl sm:text-3xl mb-1" />
                            <p>{catwalk[activeIndex].wheels_size}'</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <GiPathDistance className="text-2xl sm:text-3xl mb-1" />
                            <p>{catwalk[activeIndex].range} {t('homePage.catwalk.km')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderCatwalk