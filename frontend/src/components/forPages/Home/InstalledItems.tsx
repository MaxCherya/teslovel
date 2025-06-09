import { motion } from 'framer-motion';
import {
    FaBicycle,
    FaShieldAlt,
    FaTachometerAlt,
    FaBolt,
    FaCog,
    FaHandPaper,
    FaTools,
} from 'react-icons/fa';
import { BsDisplayFill } from 'react-icons/bs';
import { GiFlatTire, GiStoneWheel } from 'react-icons/gi';

const features = [
    { icon: <FaBicycle />, text: 'Якісні рами формула' },
    { icon: <FaShieldAlt />, text: 'Посилені ободи' },
    { icon: <GiFlatTire />, text: 'Антипрокольні покришки' },
    { icon: <GiStoneWheel />, text: 'Якісні дискові гальма' },
    { icon: <FaBolt />, text: 'Потужні електромотори' },
    { icon: <FaCog />, text: 'PAS-система' },
    { icon: <FaTachometerAlt />, text: 'Задній привод' },
    { icon: <FaTools />, text: 'Підсилювачі дропаутів' },
    { icon: <FaHandPaper />, text: 'Гальмівні електроручки' },
    { icon: <BsDisplayFill />, text: 'Універсальний дисплей' },
];

const InstalledItems: React.FC = () => {

    const groupedFeatures = [];
    for (let i = 0; i < features.length; i += 2) {
        groupedFeatures.push(features.slice(i, i + 2));
    }

    return (
        <div
            className="w-full bg-gray-100 flex flex-col items-center py-16 mt-10 mb-5"
            style={{
                clipPath: 'polygon(50% 1%, 100% 0, 100% 100%, 50% 99%, 0 100%, 0 0)',
            }}
        >
            <motion.h1
                className="text-xl md:text-2xl lg:text-4xl font-bold text-black text-center mb-12 px-4 tracking-tight"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
            >
                На наших велосипедах встановлено
            </motion.h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full md:max-w-5xl lg:max-w-5xl max-w-[95%]">
                {groupedFeatures.map((group, groupIndex) => (
                    <motion.div
                        key={groupIndex}
                        className="flex flex-col gap-6 col-span-2"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: false, amount: 0.3 }}
                    >
                        {group.map((feature) => (
                            <div
                                key={feature.text}
                                className="group flex items-center gap-4 p-4 bg-gray-300/50 rounded-sm hover:bg-gray-600/80 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="text-3xl md:text-4xl text-black group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <p className="text-base md:text-lg text-gray-900 font-medium group-hover:text-white transition-colors duration-300">
                                    {feature.text}
                                </p>
                            </div>
                        ))}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default InstalledItems;