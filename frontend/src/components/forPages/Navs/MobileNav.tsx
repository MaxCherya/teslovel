import React, { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import Logo from '../../../assets/imgs/icon.png'
import { GrLanguage } from "react-icons/gr";
import { PiPhoneCall } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";

const MobileNav: React.FC = () => {

    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    return (
        <>
            <header className="sticky bg-white w-full top-0 z-50 flex flex-row lg:hidden justify-between items-center align-middle p-4">
                <img src={Logo} className='h-[4svh]' />
                <p className="text-black text-2xl" onClick={toggleMenu}><TiThMenu /></p>
            </header>

            {showMenu && (
                <div className="fixed inset-0 bg-white z-40 overflow-y-auto flex flex-col items-center pt-20">

                    <div className="w-full flex flex-row justify-between items-center p-4">
                        <a href='/models' className='text-black hover:text-gray-700'>Моделі</a><span>{'>'}</span>
                    </div>
                    <div className="w-full flex flex-row justify-between items-center p-4">
                        <a href='/blog' className='text-black hover:text-gray-700'>Блог</a><span>{'>'}</span>
                    </div>
                    <div className="w-full flex flex-row justify-between items-center p-4">
                        <a href='/about' className='text-black hover:text-gray-700'>Про нас</a><span>{'>'}</span>
                    </div>
                    <div className="w-full flex flex-row justify-between items-center p-4">
                        <a href='/contact' className='text-black hover:text-gray-700'>Контакти</a><span>{'>'}</span>
                    </div>
                    <div className="w-full flex flex-row justify-between items-center p-4">
                        <div className="flex flex-row gap-4 items-center align-middle font-semibold">
                            <p className='text-black text-lg hover:text-gray-700 cursor-pointer'><GrLanguage /></p><p>Мова</p>
                        </div>
                        <span>{'>'}</span>
                    </div>
                    <div className="w-full flex flex-row justify-between items-center p-4">
                        <div className="flex flex-row gap-4 items-center align-middle font-semibold">
                            <a href='/login' className='text-black text-xl hover:text-gray-700'><CgProfile /></a><p>Аккаунт</p>
                        </div>
                        <span>{'>'}</span>
                    </div>
                    <div className="w-full flex flex-row justify-between items-center p-4">
                        <div className="flex flex-row gap-4 items-center align-middle font-semibold">
                            <a href='/login' className='text-black text-xl hover:text-gray-700'><PiPhoneCall /></a><p>Зателефонувати</p>
                        </div>
                        <span>{'>'}</span>
                    </div>
                </div>
            )}
        </>
    )
}

export default MobileNav;