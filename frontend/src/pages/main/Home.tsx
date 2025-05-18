import React, { useEffect, useState } from "react";
import ImgSwiper from "../../components/ui/swipers/ImgSwiper";
import type { catwalkContent } from "../../lib/types/product";
import MainContainer from "../../components/layouts/MainContainer";

const Home: React.FC = () => {

    const tempData = [
        {
            id: 0,
            name: 'Teslovel Model 1',
            max_speed: 45,
            range: 90,
            wheels_size: 27,
            img: 'https://ideogram.ai/assets/progressive-image/balanced/response/7Cp-JXkYQY2SelfyMMZdTg'
        },
        {
            id: 1,
            name: 'Teslovel Model 3',
            max_speed: 35,
            range: 150,
            wheels_size: 29,
            img: 'https://ideogram.ai/assets/progressive-image/balanced/response/NisJKDW9ScSgAwA9Y3KLKA'
        },
        {
            id: 2,
            name: 'Teslovel TV01-05',
            max_speed: 45,
            range: 90,
            wheels_size: 29,
            img: 'https://ideogram.ai/assets/progressive-image/balanced/response/eiGBb2xtS_epGHOYXWBDyQ'
        }
    ]

    const [catwalk, setCatwalk] = useState<catwalkContent[]>()

    useEffect(() => {
        setCatwalk(tempData)
    }, [])

    return (
        <div className="w-screen h-screen">

            {/* Bikes Overview */}
            {catwalk ? (
                <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
                    <div className="absolute w-full h-full bg-black/50 z-10">

                    </div>
                    <ImgSwiper duration={9000} imgs={catwalk?.map((item) => ({
                        src: item.img,
                        alt: item.name
                    }))} />
                </div>
            ) : null}

        </div>
    )
}

export default Home;