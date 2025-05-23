import React, { useEffect, useState } from "react";
import type { catwalkContent } from "../../lib/types/product";
import HeaderCatwalk from "../../components/forPages/Home/HeaderCatwalk";
import MainInfo from "../../components/forPages/Home/MainInfo";
import InstalledItems from "../../components/forPages/Home/InstalledItems";
import CardsSwiper from "../../components/ui/swipers/CardsSwiper";

import { motion } from 'framer-motion';
import FAQAccordion from "../../components/ui/accordions/FAQAccordion";

const Home: React.FC = () => {

    const tempData = [
        {
            id: 0,
            name: 'Teslovel Model 1',
            max_speed: 45,
            range: 90,
            wheels_size: 27,
            price_day: 150,
            landscape_img: 'https://i.ibb.co/YBJJGQ9N/teslovel-Landscape.png'
        },
        {
            id: 1,
            name: 'Teslovel Model 3',
            max_speed: 35,
            range: 150,
            wheels_size: 29,
            price_day: 180,
            landscape_img: 'https://i.ibb.co/YBJJGQ9N/teslovel-Landscape.png'
        },
        {
            id: 2,
            name: 'Teslovel TV01-05',
            max_speed: 45,
            range: 90,
            wheels_size: 29,
            price_day: 130,
            landscape_img: 'https://i.ibb.co/YBJJGQ9N/teslovel-Landscape.png'
        }
    ]

    const [catwalk, setCatwalk] = useState<catwalkContent[]>()

    useEffect(() => {
        setCatwalk(tempData)
    }, [])

    return (
        <div className="w-full h-full flex flex-col items-center">

            {/* Bikes Overview */}
            {catwalk ? (
                <HeaderCatwalk catwalk={catwalk} />
            ) : null}

            {/* Main Info */}
            <MainInfo />

            {/* Explicit features */}
            <InstalledItems />

            {catwalk && <CardsSwiper content={catwalk} />}

            <div
                className="w-full bg-gray-100 flex flex-col items-center py-16 mt-10 mb-10"
                style={{
                    clipPath: 'polygon(50% 1%, 100% 0, 100% 100%, 50% 100%, 0 100%, 0 0)',
                }}
            >
                <FAQAccordion />
            </div>

        </div>
    )
}

export default Home;