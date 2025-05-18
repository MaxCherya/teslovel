import React from "react";

interface Props {
    label?: string,
    type: 'order' | 'learn' | 'contact',
    className?: string,
    onClick?: () => void;
}

const CTAButton: React.FC<Props> = ({ label = '', type, className = '', onClick }) => {

    const styles = {
        "order": "bg-blue-500 hover:bg-blue-600 text-white",
        "learn": "bg-white hover:bg-gray-50 text-gray-800",
        "contact": "bg-green-500 hover:bg-green-600 text-white"
    }

    return (
        <button onClick={onClick}
            className={`${className} 
                     rounded-sm px-2 py-1 cursor-pointer
                     transition-all duration-150 ${styles[type]}`}>{
                label}
        </button>
    )
}

export default CTAButton;