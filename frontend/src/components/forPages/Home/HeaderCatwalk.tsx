// icons
import { PiSpeedometerFill } from "react-icons/pi";
import { GiPathDistance } from "react-icons/gi";
import { GiCartwheel } from "react-icons/gi";

import ImgSwiper from "../../ui/swipers/ImgSwiper";
import { CTAButton } from "../../ui/btns";
import type { catwalkContent } from "../../../lib/types/product";
import { useState } from "react";

interface Props {
    catwalk: catwalkContent[]
}

const HeaderCatwalk: React.FC<Props> = ({ catwalk }) => {

    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="relative w-screen overflow-hidden">
            {/* Swiper images as background layer */}
            <ImgSwiper
                duration={9000}
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
                <div className="flex flex-col items-center w-full max-w-6xl mx-auto gap-6 sm:gap-8 md:gap-10 lg:gap-12 text-center">
                    {/* Bike Name */}
                    <h1 className="text-gray-200 text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-semibold">
                        {catwalk[activeIndex].name}
                    </h1>

                    {/* CTA Button */}
                    <div className="flex justify-center">
                        <CTAButton
                            type="order"
                            label="Забронювати"
                            className="text-sm sm:text-base md:text-xl lg:text-2xl px-6 sm:px-10 py-2 sm:py-3"
                        />
                    </div>

                    {/* Stats */}
                    <div className="flex flex-row gap-6 sm:gap-12 text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl">
                        <div className="flex flex-col items-center">
                            <PiSpeedometerFill className="text-2xl sm:text-3xl mb-1" />
                            <p>{catwalk[activeIndex].max_speed} km/h</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <GiCartwheel className="text-2xl sm:text-3xl mb-1" />
                            <p>{catwalk[activeIndex].wheels_size}'</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <GiPathDistance className="text-2xl sm:text-3xl mb-1" />
                            <p>{catwalk[activeIndex].range} km</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderCatwalk