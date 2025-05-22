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
                className="text-xl md:text-2xl lg:text-4xl font-bold text-teal-800 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
            >
                {t('homePage.mainInfo.header')}
            </motion.h1>
            <p className="max-w-[95%] text-sm">{t('homePage.mainInfo.description')}</p>
            <div className="flex flex-col md:flex-row gap-6 lg:gap-8 justify-center">
                <FeatureItem Icon={IoMdBicycle} text={t('homePage.mainInfo.feature_1')} />
                <FeatureItem Icon={BiSolidPackage} text={t('homePage.mainInfo.feature_2')} />
                <FeatureItem Icon={MdForest} text={t('homePage.mainInfo.feature_3')} />
            </div>
        </MainContainer>
    )
}

export default MainInfo;