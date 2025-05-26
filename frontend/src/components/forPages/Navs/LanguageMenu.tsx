import React from "react";

const Languages = [
    {
        value: 'uk',
        Label: 'Українська'
    },
    {
        value: 'en',
        Label: 'English'
    }
    ,
    {
        value: 'ru',
        Label: 'Русский'
    }
]

interface LanguageMenuProps {
    showLanguageMenu: boolean;
}

const LanguageMenu: React.FC<LanguageMenuProps> = ({ showLanguageMenu }) => {

    const currentLanguage = localStorage.getItem('i18nextLng') || 'uk';

    if (!showLanguageMenu) return null;

    return (
        <div className="fixed w-screen min-w-screen min-h-screen h-screen bg-white z-50 flex flex-col items-center justify-center">
            {Languages.map((lang, index) => (
                <p
                    key={index}
                    className={`text-black text-lg cursor-pointer hover:text-gray-700 mb-4 *:hover:cursor-pointer ${currentLanguage === lang.value ? 'font-bold' : ''}`}
                    onClick={() => {
                        localStorage.setItem('i18nextLng', lang.value);
                        window.location.reload();
                    }}
                >
                    {lang.Label}
                </p>
            ))}
        </div>
    )
}

export default LanguageMenu;