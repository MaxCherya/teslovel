import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import { PiTelegramLogo } from "react-icons/pi";
import { FiPhone } from "react-icons/fi";
import { PhoneInput } from "../../ui/inputs";

interface ContactsMenuProps {
    showContactsMenu: boolean;
    toggleContactsMenu: () => void;
    toggleMenu: () => void;
}

const ContactsMenu: React.FC<ContactsMenuProps> = ({
    showContactsMenu,
    toggleContactsMenu,
    toggleMenu,
}) => {
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert("Contact form submitted! We'll reach out soon.");
    };

    const [phone, setPhone] = useState('');

    return (
        <AnimatePresence>
            {showContactsMenu && (
                <motion.div
                    key="contacts-menu"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "100%", opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="fixed inset-0 bg-white z-50 flex flex-col items-center overflow-y-auto"
                >
                    {/* Bottom bar */}
                    <div className="fixed px-4 bottom-0 lg:top-0 lg:bottom-auto w-full bg-white flex flex-row justify-between items-center border-t lg:border-b lg:border-t-0 pt-2 py-4 z-50">
                        <span
                            onClick={toggleContactsMenu}
                            className="font-bold text-xl cursor-pointer"
                        >
                            {"<"}
                        </span>
                        <p className="text-base">Контакти</p>
                        <span
                            onClick={toggleMenu}
                            className="font-bold text-xl cursor-pointer lg:hidden"
                        >
                            ×
                        </span>
                    </div>

                    {/* Main content container with padding to avoid overlap with bottom bar */}
                    <div className="flex flex-col items-center w-full max-w-md px-4 pt-4 pb-24 mt-20">
                        {/* Contact Options */}
                        <div className="flex flex-col gap-3 w-full mt-4">
                            <h2 className="text-black text-lg font-bold mb-4 text-center">Зв'яжіться з нами</h2>

                            {/* Instagram */}
                            <a
                                href="https://www.instagram.com/teslovel/?igshid=MDM4ZDc5MmU%3D"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 border border-neutral-300 rounded-xl py-3 px-4 bg-white shadow-sm hover:bg-neutral-100 transition"
                            >
                                <FaInstagram className="w-6 h-6 text-pink-500" />
                                <div className="flex flex-col">
                                    <span className="font-medium text-base text-black">Instagram</span>
                                    <span className="text-sm text-neutral-500">@teslovel</span>
                                </div>
                            </a>

                            {/* Phone */}
                            <a
                                href="tel:+380630231663"
                                className="flex items-center gap-4 border border-neutral-300 rounded-xl py-3 px-4 bg-white shadow-sm hover:bg-neutral-100 transition"
                            >
                                <FiPhone className="w-6 h-6 text-blue-500" />
                                <div className="flex flex-col">
                                    <span className="font-medium text-base text-black">Зателефонувати</span>
                                    <span className="text-sm text-neutral-500">+380 63 023 1663</span>
                                </div>
                            </a>

                            {/* Telegram */}
                            <a
                                href="https://t.me/chergyk"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 border border-neutral-300 rounded-xl py-3 px-4 bg-white shadow-sm hover:bg-neutral-100 transition"
                            >
                                <PiTelegramLogo className="w-6 h-6 text-teal-500" />
                                <div className="flex flex-col">
                                    <span className="font-medium text-base text-black">Telegram</span>
                                    <span className="text-sm text-neutral-500">@chergyk</span>
                                </div>
                            </a>
                        </div>

                        <div className="flex items-center my-12 w-full">
                            <hr className="flex-grow border-t border-neutral-300" />
                            <span className="px-3 text-sm text-neutral-500 tracking-widest uppercase">Або</span>
                            <hr className="flex-grow border-t border-neutral-300" />
                        </div>

                        {/* Contact Form */}
                        <div className="flex flex-col items-center w-full mb-8">
                            <h2 className="text-black text-lg font-bold mb-4 text-center">Залиште свої контакти</h2>
                            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 w-full">
                                <label className="text-sm text-black font-semibold">
                                    Ім’я <span className="text-red-500">*</span>
                                    <input
                                        type="text"
                                        placeholder="Ваше ім’я"
                                        className="mt-1 w-full text-black text-lg border-b border-gray-300 px-2 py-1 focus:outline-none focus:border-gray-700 transition-colors duration-200"
                                        required
                                    />
                                </label>

                                <PhoneInput
                                    label="Телефон"
                                    value={phone}
                                    onChange={setPhone}
                                    required
                                    className="mt-1"
                                />

                                <label className="text-sm text-black font-semibold">
                                    Додаткова інформація
                                    <textarea
                                        placeholder="Наприклад: бажаний час зв’язку, тип велосипеда, тощо…"
                                        maxLength={300}
                                        rows={4}
                                        className="mt-1 w-full resize-none rounded-lg bg-white text-black text-base border border-gray-300 px-3 py-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200 placeholder:text-neutral-500"
                                    ></textarea>
                                </label>

                                <button
                                    type="submit"
                                    className="mt-6 bg-black text-white text-sm tracking-widest font-semibold uppercase py-3 rounded-lg w-full transition-colors duration-300 hover:bg-neutral-800 cursor-pointer"
                                >
                                    Надіслати
                                </button>
                            </form>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ContactsMenu;