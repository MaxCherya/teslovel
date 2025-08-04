import React, { useEffect, useState } from "react";
import type { catwalkContent } from "../../lib/types/product";
import HeaderCatwalk from "../../components/forPages/Home/HeaderCatwalk";
import MainInfo from "../../components/forPages/Home/MainInfo";
import InstalledItems from "../../components/forPages/Home/InstalledItems";
import CardsSwiper from "../../components/ui/swipers/CardsSwiper";
import { useOutletContext } from 'react-router-dom'
import FAQAccordion from "../../components/ui/accordions/FAQAccordion";
import CTACallMe from "../../components/forPages/Home/CTACallMe";
import { FiPhoneCall } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { fetchCatwalkBikes } from "../../endpoints/HomePage";
import FullScreenLoader from "../../components/ui/loaders/FullScreenLoader";

type ContextType = {
    showContacts?: boolean;
    setShowContacts?: React.Dispatch<React.SetStateAction<boolean>>;
};

const Home: React.FC = () => {

    const [catwalk, setCatwalk] = useState<catwalkContent[]>()

    useEffect(() => {
        const loadBikes = async () => {
            try {
                setIsLoading(true);
                const data = await fetchCatwalkBikes();
                if (data) setCatwalk(data);
            } catch (err) {
                console.error(err)
            } finally {
                setIsLoading(false);
            }
        };
        loadBikes();
    }, []);


    const { showContacts, setShowContacts } = useOutletContext<ContextType>();
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="w-full h-full flex flex-col items-center">

            {isLoading && <FullScreenLoader />}

            {/* Bikes Overview */}
            {catwalk && catwalk.length > 0 && (
                <HeaderCatwalk catwalk={catwalk} />
            )}

            {/* Main Info */}
            <MainInfo />

            {/* CTA Contact Me */}
            <CTACallMe setShowContacts={setShowContacts} showContacts={showContacts} />

            {/* Explicit features */}
            <InstalledItems />

            {catwalk && catwalk.length > 0 && <CardsSwiper content={catwalk} />}

            <div
                className="w-full bg-gray-100 flex flex-col items-center py-16 mt-10"
                style={{
                    clipPath: 'polygon(50% 1%, 100% 0, 100% 100%, 50% 100%, 0 100%, 0 0)',
                }}
            >
                <FAQAccordion />
            </div>

            <motion.div
                className="fixed bottom-6 left-6 z-20"
                animate={{ y: [0, -5, 0] }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            >
                {/* Mobile (callable) */}
                <a
                    href="tel:+380630231663"
                    className="lg:hidden flex items-center gap-2 p-3 rounded-full bg-black text-white shadow-lg"
                >
                    <FiPhoneCall className="w-6 h-6" />
                </a>

                {/* Desktop (show number) */}
                <div className="hidden lg:flex items-center gap-2 p-3 bg-white border border-gray-300 rounded-full shadow-lg">
                    <div className="p-2 bg-black text-white rounded-full">
                        <FiPhoneCall className="w-5 h-5" />
                    </div>
                    <span className="text-black font-medium text-sm">+380 (63) 023 1663</span>
                </div>
            </motion.div>

            {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d135292.82687010436!2d34.90397680762348!3d48.47980438746061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa6897b741c5cb7a3%3A0xbf41530246ab3a17!2sTeslovel!5e1!3m2!1sen!2sua!4v1748258851933!5m2!1sen!2sua" className="w-screen h-[30rem]" style={{ border: 0 }} allowFullScreen loading="lazy"></iframe> */}

        </div>
    )
}

export default Home;