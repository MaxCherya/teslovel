import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const FullScreenLoader: React.FC = () => {

    const { t } = useTranslation();

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-95 z-50">
            <div className="flex flex-col items-center space-y-8">
                {/* Spinning bike wheel animation */}
                <motion.div
                    className="relative w-24 h-24"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                >
                    {/* Outer tire with glow effect */}
                    <motion.div
                        className="absolute inset-0 border-4 border-gray-300 rounded-full shadow-lg"
                        style={{ boxShadow: '0 0 15px rgba(34, 197, 94, 0.5)' }}
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    {/* Inner rim with green accent */}
                    <motion.div
                        className="absolute inset-2 border-3 border-t-3 border-t-green-500 border-gray-300 rounded-full"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
                    />
                    {/* Bike wheel SVG */}
                    <svg className="absolute inset-0 w-24 h-24 text-gray-700" fill="none" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.2" />
                        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1" />
                        {/* Spokes */}
                        <path
                            stroke="currentColor"
                            strokeWidth="1.2"
                            d="M12 1v4M12 19v4M1 12h4M19 12h4M5.5 5.5l2.5 2.5M18.5 18.5l-2.5-2.5M5.5 18.5l2.5-2.5M18.5 5.5l-2.5 2.5"
                        />
                    </svg>
                </motion.div>
                <motion.p
                    className="text-white text-xl font-medium tracking-wide text-center"
                    animate={{ opacity: [1, 0.6, 1], y: [0, -3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                    {t('loading.title')}
                </motion.p>
            </div>
        </div>
    );
};

export default FullScreenLoader;