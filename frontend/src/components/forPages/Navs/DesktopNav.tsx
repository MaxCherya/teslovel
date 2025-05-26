import { GrLanguage } from "react-icons/gr";
import { PiPhoneCall } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import Logo from '../../../assets/imgs/icon.png'

interface DesktopNavProps {
    toggleLanguageMenu: () => void;
}

const DesktopNav: React.FC<DesktopNavProps> = ({ toggleLanguageMenu }) => {
    return (
        <header className='bg-white sticky top-0 w-full p-4 flex-row justify-between align-middle items-center hidden lg:flex z-50'>
            <img src={Logo} className='h-[4svh]' />
            <div className='flex flex-row gap-4 font-semibold'>
                <a href='/models' className='text-black hover:text-gray-700'>Моделі</a>
                <a href='/blog' className='text-black hover:text-gray-700'>Блог</a>
                <a href='/about' className='text-black hover:text-gray-700'>Про нас</a>
                <a href='/contact' className='text-black hover:text-gray-700'>Контакти</a>
            </div>
            <div className='flex flex-row gap-4 font-semibold items-center'>
                <p onClick={toggleLanguageMenu} className='text-black text-lg hover:text-gray-700 cursor-pointer'><GrLanguage /></p>
                <a href='/login' className='text-black text-xl hover:text-gray-700'><CgProfile /></a>
                <a href='/login' className='text-black text-xl hover:text-gray-700'><PiPhoneCall /></a>
            </div>
        </header>
    )
}

export default DesktopNav