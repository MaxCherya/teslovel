import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

const FAQAccordion: React.FC = () => {
    const [openSections, setOpenSections] = useState<number[]>([]);
    const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
    const { t } = useTranslation();

    const faqIndexes = Array.from({ length: 11 }, (_, i) => i); // 11 questions

    const toggleSection = (index: number) => {
        setOpenSections((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    useEffect(() => {
        contentRefs.current.forEach((ref, index) => {
            if (ref && openSections.includes(index)) {
                ref.style.maxHeight = `${ref.scrollHeight}px`;
            } else if (ref) {
                ref.style.maxHeight = "0px";
            }
        });
    }, [openSections]);

    return (
        <div className="w-full max-w-5xl mx-auto min-h-[150px] rounded-lg overflow-hidden">
            {faqIndexes.map((index) => (
                <div key={index} className="border-b border-gray-100 last:border-b-0 my-1">
                    <button
                        onClick={() => toggleSection(index)}
                        className="w-full flex justify-between cursor-pointer items-center py-3 xs:py-4 px-3 xs:px-4 sm:px-5 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 focus:outline-none min-h-[48px]"
                        aria-expanded={openSections.includes(index)}
                        aria-controls={`faq-content-${index}`}
                    >
                        <h2 className="text-left text-base md:text-lg font-semibold text-gray-800 flex-1 pr-2 xs:pr-3 break-words hyphens-auto">
                            {t(`faq.${index}.q`)}
                        </h2>
                        <span
                            className={`flex-shrink-0 text-gray-500 transform transition-transform duration-300 ${openSections.includes(index) ? "rotate-180" : ""
                                } w-6 h-6 flex items-center justify-center`}
                        >
                            <svg className="w-4 h-4 xs:w-5 xs:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </span>
                    </button>
                    <div
                        id={`faq-content-${index}`}
                        ref={(el: HTMLDivElement | null) => {
                            contentRefs.current[index] = el;
                        }}
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${openSections.includes(index) ? "opacity-100" : "max-h-0 opacity-0"
                            }`}
                    >
                        <div className="px-3 xs:px-4 sm:px-5 py-3 flex flex-row items-start gap-2 xs:gap-3 sm:gap-5 rounded-b-sm bg-white text-base md:text-lg text-gray-600 leading-relaxed max-h-[60vh] xs:max-h-[50vh] overflow-y-auto">
                            <div className="bg-blue-500 h-6 xs:h-8 w-[3px] flex-shrink-0" />
                            <p className="break-words hyphens-auto">{t(`faq.${index}.a`)}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FAQAccordion;