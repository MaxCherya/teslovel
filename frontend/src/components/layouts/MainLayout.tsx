import { Outlet } from 'react-router-dom'
import { useState } from "react";
import DesktopNav from '../forPages/Navs/DesktopNav';
import MobileNav from '../forPages/Navs/MobileNav';
import LanguageMenu from '../forPages/Navs/LanguageMenu';
import { useCachedBikes } from '../../lib/hooks/useCachedBikes';

export default function MainLayout() {

    const bikes = useCachedBikes();

    const [showLanguageMenu, setShowLanguageMenu] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showBikes, setShowBikes] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
        setShowLanguageMenu(false);
    }

    const toggleLanguageMenu = () => {
        setShowLanguageMenu(!showLanguageMenu);
    }

    return (
        <div className='relative max-w-screen w-screen min-h-screen h-screen overflow-x-hidden'>

            {/* Desktop Nav */}
            <DesktopNav toggleLanguageMenu={toggleLanguageMenu} setShowBikes={setShowBikes} />

            {/*Bikes Menu */}
            {showBikes && (
                <div onMouseEnter={() => setShowBikes(true)} onMouseLeave={() => setShowBikes(false)} className='absolute top-16 left-0 w-full bg-white shadow-lg z-50'>
                    <ul className='flex flex-col p-4'>
                        {bikes.map((bike) => (
                            <li key={bike.id} className='py-2 px-4 hover:bg-gray-100'>
                                <a href={`/models/${bike.id}`} className='flex flex-col items-center gap-2'>
                                    <img src={bike.nav_photo} alt={bike.name} className='h-12 object-cover rounded' />
                                    <span>{bike.name}</span>
                                </a>
                            </li>
                        ))}
                        <li className='py-2 px-4 w-full hover:bg-gray-100'>
                            <a href='/models' className='text-center'>Всі моделі</a>
                        </li>
                    </ul>
                </div>
            )}

            {/* Language Menu */}
            <LanguageMenu showLanguageMenu={showLanguageMenu} toggleLanguageMenu={toggleLanguageMenu} toggleMenu={toggleMenu} />

            {/* Mobile Nav */}
            <MobileNav toggleLanguageMenu={toggleLanguageMenu} setShowLanguageMenu={setShowLanguageMenu} toggleMenu={toggleMenu} showMenu={showMenu} />

            <main>
                <Outlet />
            </main>

            <footer className='bg-white w-full'>
                {/* Footer will be added here */}
                <p>© 2025 Teslovel</p>
            </footer>
        </div>
    )
}