import { GrLanguage } from "react-icons/gr";
import { PiPhoneCall } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import Logo from '../../../assets/imgs/icon.png';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface DesktopNavProps {
    toggleLanguageMenu: () => void;
    setShowBikes: (show: boolean) => void;
    setShowContacts: (show: boolean) => void;
}

const DesktopNav: React.FC<DesktopNavProps> = ({ toggleLanguageMenu, setShowBikes, setShowContacts }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <header className='bg-white sticky top-0 w-full p-4 flex-row justify-between align-middle items-center hidden lg:flex z-50'>
            <img src={Logo} className='h-[4svh] cursor-pointer' onClick={() => navigate(`/`)} />
            <div className='flex flex-row gap-4 font-semibold'>
                <a href='/models' onMouseEnter={() => setShowBikes(true)} className='text-black hover:text-gray-700'>
                    {t('nav.models')}
                </a>
                <a href='/blog' className='text-black hover:text-gray-700'>
                    {t('nav.blog')}
                </a>
                <a href='/about' className='text-black hover:text-gray-700'>
                    {t('nav.about')}
                </a>
                <a href='/contact' className='text-black hover:text-gray-700'>
                    {t('nav.contacts')}
                </a>
            </div>
            <div className='flex flex-row gap-4 font-semibold items-center'>
                <p onClick={toggleLanguageMenu} className='text-black text-lg hover:text-gray-700 cursor-pointer'>
                    <GrLanguage />
                </p>
                <a href='/login' className='text-black text-xl hover:text-gray-700 cursor-pointer'>
                    <CgProfile />
                </a>
                <a onClick={() => setShowContacts(true)} className='text-black text-xl hover:text-gray-700 cursor-pointer'>
                    <PiPhoneCall />
                </a>
            </div>
        </header>
    );
};

export default DesktopNav;