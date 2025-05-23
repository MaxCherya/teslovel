import React, { useState, useRef, useEffect } from "react";

const FAQAccordion: React.FC = () => {
    const [openSections, setOpenSections] = useState<number[]>([]);
    const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

    const faq = [
        {
            question:
                "Що мені потрібно для аренди? Дуже довге питання, яке може займати багато місця і потребує правильного відображення на екрані, щоб користувач міг легко прочитати весь текст без проблем із відображенням.",
            answer:
                "Для оренди потрібно пред’явити паспорт, закордонний паспорт або водійське посвідчення. Дуже довгий текст відповіді, який може містити багато деталей про процес оренди, вимоги до документів, додаткові умови, правила використання електровелосипеда, а також інструкції щодо повернення. Цей текст може бути настільки довгим, що потребує прокрутки або спеціального форматування, щоб залишатися читабельним і не порушувати макет сторінки."
        },
        {
            question: "Які є гарантії?",
            answer:
                "Ми цінуємо вашу безпеку та довіру, тому пропонуємо прозорі умови прокату з чітким заключенням договору. Договір оренди детально визначає правила користування, обов’язки сторін та умови повернення електровелосипеда, забезпечуючи захист інтересів обох сторін."
        },
        {
            question: "Чи є якісь обмеження?",
            answer: "Електровелосипед можуть орендувати особи старше 18 років."
        },
        {
            question: "Чи потрібно залишати заставу?",
            answer: "Встановлена застава у розмірі 500 грн. за один електровелосипед."
        },
        {
            question: "Чи доставляєте ви велосипеди?",
            answer:
                "Так, ми доставляємо/забираємо велосипеди з будь-якої точки Дніпра. Доставка здійснюється за попередньою домовленістю, і ми можемо організувати її в зручний для вас час і місце."
        }
    ];

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
            {faq.map((faq, index) => (
                <div key={index} className="border-b border-gray-100 last:border-b-0 my-1">
                    <button
                        onClick={() => toggleSection(index)}
                        className="w-full flex justify-between cursor-pointer items-center py-3 xs:py-4 px-3 xs:px-4 sm:px-5 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 focus:outline-none min-h-[48px]"
                        aria-expanded={openSections.includes(index)}
                        aria-controls={`faq-content-${index}`}
                    >
                        <h2 className="text-left text-base md:text-lg font-semibold text-gray-800 flex-1 pr-2 xs:pr-3 break-words hyphens-auto">
                            {faq.question}
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
                            <p className="break-words hyphens-auto">{faq.answer}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FAQAccordion;