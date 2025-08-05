import React, { useEffect, useState } from "react";
import type { catwalkContent } from "../../lib/types/product";
import HeaderCatwalk from "../../components/forPages/Home/HeaderCatwalk";
import MainInfo from "../../components/forPages/Home/MainInfo";
import InstalledItems from "../../components/forPages/Home/InstalledItems";
import CardsSwiper from "../../components/ui/swipers/CardsSwiper";
import { useOutletContext } from 'react-router-dom';
import FAQAccordion from "../../components/ui/accordions/FAQAccordion";
import CTACallMe from "../../components/forPages/Home/CTACallMe";
import { FiPhoneCall } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';
import { fetchCatwalkBikes } from "../../endpoints/HomePage";
import FullScreenLoader from "../../components/ui/loaders/FullScreenLoader";
import { FaTelegramPlane, FaInstagram } from 'react-icons/fa';

type ContextType = {
    showContacts?: boolean;
    setShowContacts?: React.Dispatch<React.SetStateAction<boolean>>;
};

const Home: React.FC = () => {
    const [catwalk, setCatwalk] = useState<catwalkContent[]>();
    const [isLoading, setIsLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const { showContacts, setShowContacts } = useOutletContext<ContextType>();

    useEffect(() => {
        const loadBikes = async () => {
            try {
                setIsLoading(true);
                const data = await fetchCatwalkBikes();
                if (data) setCatwalk(data);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        loadBikes();
    }, []);

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
                <div className="relative w-14 h-14">
                    {/* Anchor Button */}
                    <button
                        onClick={() => setShowPopup((prev) => !prev)}
                        className="absolute cursor-pointer left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center p-4 rounded-full bg-black text-white shadow-lg hover:bg-gray-800 transition-colors"
                    >
                        <FiPhoneCall className="w-6 h-6" />
                    </button>

                    {/* Popup icons around anchor */}
                    <AnimatePresence>
                        {showPopup && (
                            <>
                                {/* Instagram (top) */}
                                <motion.a
                                    href="https://www.instagram.com/teslovel"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1, x: 0, y: -80 }}
                                    exit={{ opacity: 0, scale: 0 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                    className="absolute cursor-pointer left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center p-3 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full shadow-lg hover:from-pink-600 hover:to-yellow-600"
                                >
                                    <FaInstagram className="w-5 h-5 text-white" />
                                </motion.a>

                                {/* Telegram (right) */}
                                <motion.a
                                    href="https://t.me/chergyk"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1, x: 80, y: 0 }}
                                    exit={{ opacity: 0, scale: 0 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                    className="absolute cursor-pointer left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center p-3 bg-blue-500 rounded-full shadow-lg hover:bg-blue-600"
                                >
                                    <FaTelegramPlane className="w-5 h-5 text-white" />
                                </motion.a>

                                {/* Phone (top-right diagonal) */}
                                <motion.a
                                    href="tel:+380630231663"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1, x: 56, y: -56 }}
                                    exit={{ opacity: 0, scale: 0 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                    className="absolute cursor-pointer left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center p-3 bg-white border border-gray-300 rounded-full shadow-lg hover:bg-gray-100"
                                >
                                    <FiPhoneCall className="w-5 h-5 text-black" />
                                </motion.a>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

export default Home;