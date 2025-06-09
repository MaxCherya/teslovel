import React, { useEffect, useState } from "react";
import type { catwalkContent } from "../../lib/types/product";
import HeaderCatwalk from "../../components/forPages/Home/HeaderCatwalk";
import MainInfo from "../../components/forPages/Home/MainInfo";
import InstalledItems from "../../components/forPages/Home/InstalledItems";
import CardsSwiper from "../../components/ui/swipers/CardsSwiper";
import { useOutletContext } from 'react-router-dom'
import FAQAccordion from "../../components/ui/accordions/FAQAccordion";
import CTACallMe from "../../components/forPages/Home/CTACallMe";

type ContextType = {
    showContacts?: boolean;
    setShowContacts?: React.Dispatch<React.SetStateAction<boolean>>;
};

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


    const { showContacts, setShowContacts } = useOutletContext<ContextType>();

    return (
        <div className="w-full h-full flex flex-col items-center">

            {/* Bikes Overview */}
            {catwalk ? (
                <HeaderCatwalk catwalk={catwalk} />
            ) : null}

            {/* Main Info */}
            <MainInfo />

            {/* CTA Contact Me */}
            <CTACallMe setShowContacts={setShowContacts} showContacts={showContacts} />

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

            {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d135292.82687010436!2d34.90397680762348!3d48.47980438746061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa6897b741c5cb7a3%3A0xbf41530246ab3a17!2sTeslovel!5e1!3m2!1sen!2sua!4v1748258851933!5m2!1sen!2sua" className="w-screen h-[30rem]" style={{ border: 0 }} allowFullScreen loading="lazy"></iframe> */}

        </div>
    )
}

export default Home;