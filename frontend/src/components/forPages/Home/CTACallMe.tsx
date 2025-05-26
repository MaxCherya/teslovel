import React from "react"
import { GeneralButton } from "../../ui/btns"
import { useTranslation } from "react-i18next"

const CTACallMe: React.FC = () => {

    const { t } = useTranslation();

    return (
        <div className="relative mt-8 flex flex-col items-center justify-center align-middle" style={
            {
                backgroundImage: `url('https://ideogram.ai/assets/image/lossless/response/wW1T4UZQSbm6c4vXo8nWYg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '100%',
                height: '400px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }
        }>
            <div className="bg-black/40 w-full h-full absolute" />

            <h1 className="text-white z-10 mb-5 text-center text-base sm:text-3xl">{t('homePage.CTACallMe.header')}</h1>
            <GeneralButton type="show" label={t('homePage.CTACallMe.btn')} className="text-sm sm:text-lg" />
        </div>
    )
}

export default CTACallMe;