import { Outlet } from 'react-router-dom'
import { useState } from "react";
import DesktopNav from '../forPages/Navs/DesktopNav';
import MobileNav from '../forPages/Navs/MobileNav';
import LanguageMenu from '../forPages/Navs/LanguageMenu';

export default function MainLayout() {

    const [showLanguageMenu, setShowLanguageMenu] = useState(false);

    const toggleLanguageMenu = () => {
        setShowLanguageMenu(!showLanguageMenu);
    }

    return (
        <div className='relative max-w-screen w-screen min-h-screen h-screen overflow-x-hidden'>

            {/* Desktop Nav */}
            <DesktopNav toggleLanguageMenu={toggleLanguageMenu} />

            {/* Language Menu */}
            <LanguageMenu showLanguageMenu={showLanguageMenu} />

            {/* Mobile Nav */}
            <MobileNav />

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