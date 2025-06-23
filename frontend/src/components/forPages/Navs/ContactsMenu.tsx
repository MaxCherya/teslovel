import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import { PiTelegramLogo } from "react-icons/pi";
import { FiPhone } from "react-icons/fi";
import { PhoneInput } from "../../ui/inputs";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { uploadContactRequest } from "../../../endpoints/ContactsMenu";

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
    const { t } = useTranslation();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [notes, setNotes] = useState('');
    const [formRenderedAt, setFormRenderedAt] = useState<number>(0);

    useEffect(() => {
        setFormRenderedAt(Date.now() / 1000);
    }, []);

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const trap = (form.elements.namedItem('user_email') as HTMLInputElement)?.value;
        const renderedAt = parseFloat((form.elements.namedItem('formRenderedAt') as HTMLInputElement)?.value || "0");

        if (trap && trap.trim() !== '') {
            console.warn("🛑 Bot detected.");
            return;
        }

        const now = Date.now() / 1000;
        if (now - renderedAt < 3) {
            console.warn("⚠️ Submitted too quickly — possible bot.");
            toast.error(t("contactsMenu.tooFast"));
            return;
        }

        if (name.trim().length < 2) {
            toast.error(t("contactsMenu.invalidName") || "Please enter your name.");
            return;
        }

        if (phone.trim().length < 5) {
            toast.error(t("contactsMenu.invalidPhone") || "Please enter a valid phone number.");
            return;
        }

        const payload = {
            name: name.trim(),
            phone_number: phone.trim(),
            notes: notes.trim(),
            formRenderedAt: renderedAt.toString(),
        };

        try {
            const result = await uploadContactRequest({ payload });

            if (result?.success) {
                toast.success(t("contactsMenu.successAlert"));
                setName('');
                setPhone('');
                setNotes('');
                toggleContactsMenu();
            } else {
                toast.error(t("contactsMenu.errorAlert"));
            }
        } catch (error) {
            toast.error(t("contactsMenu.errorAlert"));
            console.error("❌ Upload error:", error);
        }
    };


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
                    <div className="fixed px-4 bottom-0 lg:top-0 lg:bottom-auto w-full bg-white flex flex-row justify-between items-center border-t lg:border-b lg:border-t-0 pt-2 py-4 z-50">
                        <span onClick={toggleContactsMenu} className="font-bold text-xl cursor-pointer">
                            {"<"}
                        </span>
                        <p className="text-base">{t("contactsMenu.title")}</p>
                        <span onClick={toggleMenu} className="font-bold text-xl cursor-pointer lg:hidden">
                            ×
                        </span>
                    </div>

                    <div className="flex flex-col items-center w-full max-w-md px-4 pt-4 pb-24 mt-20">
                        <div className="flex flex-col gap-3 w-full mt-4">
                            <h2 className="text-black text-lg font-bold mb-4 text-center">
                                {t("contactsMenu.header")}
                            </h2>

                            <a href="https://www.instagram.com/teslovel" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 border border-neutral-300 rounded-xl py-3 px-4 bg-white shadow-sm hover:bg-neutral-100 transition">
                                <FaInstagram className="w-6 h-6 text-pink-500" />
                                <div className="flex flex-col">
                                    <span className="font-medium text-base text-black">Instagram</span>
                                    <span className="text-sm text-neutral-500">@teslovel</span>
                                </div>
                            </a>

                            <a href="tel:+380630231663" className="flex items-center gap-4 border border-neutral-300 rounded-xl py-3 px-4 bg-white shadow-sm hover:bg-neutral-100 transition">
                                <FiPhone className="w-6 h-6 text-blue-500" />
                                <div className="flex flex-col">
                                    <span className="font-medium text-base text-black">{t("contactsMenu.callBtn")}</span>
                                    <span className="text-sm text-neutral-500">+380 63 023 1663</span>
                                </div>
                            </a>

                            <a href="https://t.me/chergyk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 border border-neutral-300 rounded-xl py-3 px-4 bg-white shadow-sm hover:bg-neutral-100 transition">
                                <PiTelegramLogo className="w-6 h-6 text-teal-500" />
                                <div className="flex flex-col">
                                    <span className="font-medium text-base text-black">Telegram</span>
                                    <span className="text-sm text-neutral-500">@chergyk</span>
                                </div>
                            </a>
                        </div>

                        <div className="flex items-center my-12 w-full">
                            <hr className="flex-grow border-t border-neutral-300" />
                            <span className="px-3 text-sm text-neutral-500 tracking-widest uppercase">
                                {t("contactsMenu.or")}
                            </span>
                            <hr className="flex-grow border-t border-neutral-300" />
                        </div>

                        <div className="flex flex-col items-center w-full mb-8">
                            <h2 className="text-black text-lg font-bold mb-4 text-center">{t("contactsMenu.leaveContact")}</h2>
                            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 w-full">

                                <input
                                    type="text"
                                    name="user_email"
                                    className="sr-only"
                                    tabIndex={-1}
                                    autoComplete="off"
                                    defaultValue=""
                                />

                                <input
                                    type="hidden"
                                    name="formRenderedAt"
                                    value={formRenderedAt}
                                />

                                <label className="text-sm text-black font-semibold">
                                    {t("contactsMenu.nameLabel")} <span className="text-red-500">*</span>
                                    <input
                                        type="text"
                                        placeholder={t("contactsMenu.namePlaceholder")}
                                        className="mt-1 w-full text-black text-lg border-b border-gray-300 px-2 py-1 focus:outline-none focus:border-gray-700 transition-colors duration-200"
                                        required
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </label>

                                <PhoneInput
                                    label={t("contactsMenu.phoneLabel")}
                                    value={phone}
                                    onChange={setPhone}
                                    required
                                    className="mt-1"
                                />

                                <label className="text-sm text-black font-semibold">
                                    {t("contactsMenu.additionalInfo")}
                                    <textarea
                                        placeholder={t("contactsMenu.additionalPlaceholder")}
                                        maxLength={300}
                                        onChange={(e) => setNotes(e.target.value)}
                                        rows={4}
                                        className="mt-1 w-full resize-none rounded-lg bg-white text-black text-base border border-gray-300 px-3 py-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200 placeholder:text-neutral-500"
                                    ></textarea>
                                </label>

                                <button
                                    type="submit"
                                    className="mt-6 bg-black text-white text-sm tracking-widest font-semibold uppercase py-3 rounded-lg w-full transition-colors duration-300 hover:bg-neutral-800 cursor-pointer"
                                >
                                    {t("contactsMenu.sendBtn")}
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