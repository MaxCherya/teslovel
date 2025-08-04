import { Outlet } from 'react-router-dom'
import { useState } from "react";
import DesktopNav from '../forPages/Navs/DesktopNav';
import MobileNav from '../forPages/Navs/MobileNav';
import LanguageMenu from '../forPages/Navs/LanguageMenu';
import { useCachedBikes } from '../../lib/hooks/useCachedBikes';
import BikesMenu from '../forPages/Navs/BikesMenu';
import ContactsMenu from '../forPages/Navs/ContactsMenu';
import { useTranslation } from 'react-i18next';

export default function MainLayout() {

    const bikes = useCachedBikes();
    const { t } = useTranslation();

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
                <Outlet context={{ showContacts, setShowContacts }} />
            </main>

            <footer className="bg-white w-full border-t">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p className="mb-4 md:mb-0">© 2025 Teslovel. All rights reserved.</p>

                    <div className="flex space-x-6">
                        <a href="/models" className="hover:text-gray-800 transition">{t('nav.models')}</a>
                        <a href="/blog" className="hover:text-gray-800 transition">{t('nav.blog')}</a>
                        <a href="/about" className="hover:text-gray-800 transition">{t('nav.about')}</a>
                        <a href="/contact" className="hover:text-gray-800 transition">{t('nav.contacts')}</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}