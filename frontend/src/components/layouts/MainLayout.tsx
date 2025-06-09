import { Outlet } from 'react-router-dom'
import { useState } from "react";
import DesktopNav from '../forPages/Navs/DesktopNav';
import MobileNav from '../forPages/Navs/MobileNav';
import LanguageMenu from '../forPages/Navs/LanguageMenu';
import { useCachedBikes } from '../../lib/hooks/useCachedBikes';
import BikesMenu from '../forPages/Navs/BikesMenu';
import ContactsMenu from '../forPages/Navs/ContactsMenu';

export default function MainLayout() {

    const bikes = useCachedBikes();

    const [showLanguageMenu, setShowLanguageMenu] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showBikes, setShowBikes] = useState(false);
    const [showContacts, setShowContacts] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
        setShowLanguageMenu(false);
        setShowBikes(false);
        setShowContacts(false);
    }

    const toggleLanguageMenu = () => {
        setShowLanguageMenu(!showLanguageMenu);
    }

    return (
        <div className='relative max-w-screen w-screen min-h-screen h-screen overflow-x-hidden'>

            {/* Desktop Nav */}
            <DesktopNav setShowContacts={setShowContacts} toggleLanguageMenu={toggleLanguageMenu} setShowBikes={setShowBikes} />

            {/* Bikes Menu */}
            <BikesMenu toggleMenu={toggleMenu} bikes={bikes} setShowBikes={setShowBikes} showBikes={showBikes} />

            {/* Language Menu */}
            <LanguageMenu showLanguageMenu={showLanguageMenu} toggleLanguageMenu={toggleLanguageMenu} toggleMenu={toggleMenu} />

            {/* Contacts Menu */}
            <ContactsMenu
                showContactsMenu={showContacts}
                toggleContactsMenu={() => setShowContacts(!showContacts)}
                toggleMenu={toggleMenu}
            />

            {/* Mobile Nav */}
            <MobileNav setShowContacts={setShowContacts} setShowBikes={setShowBikes} showBikes={showBikes} toggleLanguageMenu={toggleLanguageMenu} setShowLanguageMenu={setShowLanguageMenu} toggleMenu={toggleMenu} showMenu={showMenu} />

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