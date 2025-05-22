import { motion } from 'framer-motion';
import React from 'react';
import type { IconType } from 'react-icons/lib';

interface Props {
    Icon: IconType | string;
    text: string;
}

const FeatureItem: React.FC<Props> = ({ Icon, text }) => (

    <motion.div
        className="flex flex-col items-center text-center p-6 rounded-xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300 max-w-xs"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
    >
        <Icon className="w-12 h-12 text-teal-600 mb-4" />
        <p className="text-sm md:text-base lg:text-lg text-gray-700">{text}</p>
    </motion.div>
);

export default FeatureItem