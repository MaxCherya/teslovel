import { motion } from 'framer-motion';
import { FaBicycle, FaShieldAlt, FaTachometerAlt, FaBolt, FaCog, FaHandPaper, FaTools } from 'react-icons/fa';
import { BsDisplayFill } from "react-icons/bs";
import { GiFlatTire, GiStoneWheel } from "react-icons/gi";

const InstalledItems: React.FC = () => {
    return (
        <div
            className="w-full bg-gray-100 flex flex-col items-center py-16 mt-10 mb-10"
            style={{
                clipPath: 'polygon(50% 3%, 100% 0, 100% 100%, 50% 97%, 0 100%, 0 0)',
            }}
        >
            <motion.h1
                className="text-2xl md:text-3xl lg:text-5xl font-bold text-black text-center mb-12 px-4 tracking-tight"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
            >
                На наших велосипедах встановлено
            </motion.h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-5xl">
                {[
                    { icon: <FaBicycle />, text: 'Якісні рами формула', color: 'text-black' },
                    { icon: <FaShieldAlt />, text: 'Посилені ободи', color: 'text-black' },
                    { icon: <GiFlatTire />, text: 'Антипрокольні покришки', color: 'text-black' },
                    { icon: <GiStoneWheel />, text: 'Якісні дискові гальма', color: 'text-black' },
                    { icon: <FaBolt />, text: 'Потужні електромотори', color: 'text-black' },
                    { icon: <FaCog />, text: 'PAS-система', color: 'text-black' },
                    { icon: <FaTachometerAlt />, text: 'Задній привод', color: 'text-black' },
                    { icon: <FaTools />, text: 'Підсилювачі дропаутів', color: 'text-black' },
                    { icon: <FaHandPaper />, text: 'Гальмівні електроручки', color: 'text-black' },
                    { icon: <BsDisplayFill />, text: 'Універсальний дисплей', color: 'text-black' },
                ].map((feature, index) => (
                    <motion.div
                        key={index}
                        className="group flex items-center gap-4 p-4 bg-gray-300/50 rounded-sm hover:bg-gray-600/80 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: false, amount: 0.3 }}
                    >
                        <div className={`text-4xl md:text-5xl ${feature.color} transition-transform duration-300 group-hover:scale-110`}>
                            {feature.icon}
                        </div>
                        <p className="text-lg md:text-xl text-gray-900 font-medium group-hover:text-white transition-colors duration-300">
                            {feature.text}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default InstalledItems;