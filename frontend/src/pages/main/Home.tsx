import React, { useEffect, useState } from "react";
import type { catwalkContent } from "../../lib/types/product";
import HeaderCatwalk from "../../components/forPages/Home/HeaderCatwalk";
import MainInfo from "../../components/forPages/Home/MainInfo";
import InstalledItems from "../../components/forPages/Home/InstalledItems";

const Home: React.FC = () => {

    const tempData = [
        {
            id: 0,
            name: 'Teslovel Model 1',
            max_speed: 45,
            range: 90,
            wheels_size: 27,
            landscape_img: 'https://i.ibb.co/YBJJGQ9N/teslovel-Landscape.png'
        },
        {
            id: 1,
            name: 'Teslovel Model 3',
            max_speed: 35,
            range: 150,
            wheels_size: 29,
            landscape_img: 'https://i.ibb.co/YBJJGQ9N/teslovel-Landscape.png'
        },
        {
            id: 2,
            name: 'Teslovel TV01-05',
            max_speed: 45,
            range: 90,
            wheels_size: 29,
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

        </div>
    )
}

export default Home;