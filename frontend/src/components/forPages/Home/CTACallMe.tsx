import React from "react"
import { GeneralButton } from "../../ui/btns"

const CTACallMe: React.FC = () => {
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

            <h1 className="text-white z-10 mb-5 text-center text-base sm:text-3xl">Виникли питання? Залишай заявку!</h1>
            <GeneralButton type="show" label="Подзвоніть мені" className="text-sm sm:text-lg" />
        </div>
    )
}

export default CTACallMe;