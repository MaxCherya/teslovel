import MainContainer from "../../layouts/MainContainer";
import FeatureItem from "../../ui/cards/FeatureItem";
import { motion } from 'framer-motion';
import { useTranslation } from "react-i18next";

// icons
import { IoMdBicycle } from "react-icons/io";
import { MdForest } from "react-icons/md";
import { BiSolidPackage } from "react-icons/bi";

const MainInfo: React.FC = () => {
    const { t } = useTranslation();

    return (
        <MainContainer className="flex flex-col items-center mt-8 gap-6">
            <motion.h1
                className="text-xl md:text-2xl lg:text-4xl lg:max-w-none max-w-[90%] font-bold text-black text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
            >
                {t('homePage.mainInfo.header')}
            </motion.h1>

            <motion.p
                className="max-w-[95%] lg:max-w-none text-lg md:text-xl"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ duration: 0.6, delay: 0.1 }}
            >
                {t('homePage.mainInfo.description')}
            </motion.p>

            <motion.div
                className="flex flex-col md:flex-row gap-6 lg:gap-8 justify-center"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <FeatureItem Icon={IoMdBicycle} text={t('homePage.mainInfo.feature_1')} />
                <FeatureItem Icon={BiSolidPackage} text={t('homePage.mainInfo.feature_2')} />
                <FeatureItem Icon={MdForest} text={t('homePage.mainInfo.feature_3')} />
            </motion.div>
        </MainContainer>
    );
};

export default MainInfo;