import React from "react";
import { motion } from "framer-motion";

const NotFound: React.FC = () => {

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-6">
            <div className="flex items-center gap-4 text-6xl font-extrabold text-blue-600">
                <span>4</span>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                    className="w-16 h-16"
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full text-blue-500 fill-current">
                        <path d="M94.3,55.8c0.2-1.9,0.3-3.8,0.3-5.8s-0.1-3.9-0.3-5.8l8.3-6.5c0.7-0.6,0.9-1.6,0.5-2.4l-8-13.9c-0.4-0.8-1.3-1.1-2.1-0.9
                            l-9.8,2.6c-2.9-2.2-6.1-4.1-9.5-5.5l-1.5-10.1C71.8,6.7,71,6,70.1,6h-16c-0.9,0-1.6,0.6-1.8,1.5L50.7,17c-3.4,0.5-6.7,1.5-9.7,2.9
                            l-8.7-6.4c-0.7-0.5-1.7-0.5-2.3,0.1l-11.3,11c-0.7,0.7-0.8,1.7-0.2,2.5l6.4,8.6c-1.4,3-2.4,6.3-2.9,9.7l-9.5,1.5
                            c-0.9,0.1-1.5,0.9-1.5,1.8v16c0,0.9,0.6,1.6,1.5,1.8l9.5,1.5c0.5,3.4,1.5,6.7,2.9,9.7l-6.4,8.6c-0.6,0.8-0.5,1.8,0.2,2.5l11.3,11
                            c0.7,0.7,1.6,0.7,2.3,0.1l8.7-6.4c3,1.4,6.3,2.4,9.7,2.9l1.5,9.5c0.1,0.9,0.9,1.5,1.8,1.5h16c0.9,0,1.7-0.7,1.8-1.6l1.5-10.1
                            c3.4-1.4,6.6-3.2,9.5-5.5l9.8,2.6c0.8,0.2,1.7-0.1,2.1-0.9l8-13.9c0.4-0.8,0.2-1.8-0.5-2.4L94.3,55.8z M50,70c-11,0-20-9-20-20
                            s9-20,20-20s20,9,20,20S61,70,50,70z"/>
                    </svg>
                </motion.div>
                <span>4</span>
            </div>
        </div>
    );
};

export default NotFound;