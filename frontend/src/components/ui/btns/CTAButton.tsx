import React from "react";

interface Props {
    label?: string;
    type: 'order' | 'learn';
    className?: string;
    onClick?: () => void;
}

const CTAButton: React.FC<Props> = ({ label = '', type, className = '', onClick }) => {

    const styles = {
        "order": "bg-white text-black hover:bg-blue-600 hover:text-white",
        "learn": "bg-gray-400 hover:bg-gray-700 text-gray-800 hover:text-white"
    }

    return (
        <button onClick={onClick}
            className={`${className} 
                     rounded-sm px-2 py-1 cursor-pointer
                     transition-all duration-500 ${styles[type]}`}>{
                label}
        </button>
    )
}

export default CTAButton;