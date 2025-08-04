import React from "react";

interface Props {
    label?: string;
    type: 'show' | 'cancel'
    className?: string,
    onClick?: () => void
}

const GeneralButton: React.FC<Props> = ({ label = '', type, className = '', onClick }) => {

    const types = {
        'show': 'backdrop-blur-xs border-3 border-white text-white bg-black/40 hover:bg-white hover:text-black',
        'cancel': 'backdrop-blur-xs border-3 border-white text-black bg-red-200 hover:bg-red-900 hover:text-white'
    }

    return (
        <button onClick={onClick} className={`${className}
            px-2 py-1 cursor-pointer transition-all
            duration-500 rounded-lg ${types[type]}
        `}>
            {label}
        </button>
    )
}

export default GeneralButton;