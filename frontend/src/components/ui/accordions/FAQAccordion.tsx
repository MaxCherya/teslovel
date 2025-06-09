import React, { useState, useRef, useEffect } from "react";

const FAQAccordion: React.FC = () => {
    const [openSections, setOpenSections] = useState<number[]>([]);
    const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

    const faq = [
        {
            question: "Що потрібно для оренди електровелосипеда?",
            answer:
                "Для оренди потрібно пред’явити паспорт, закордонний паспорт або водійське посвідчення. Також укладається офіційний договір оренди та акт приймання-передачі які визначають правила користування, відповідальність сторін та умови повернення. Це забезпечує прозорість процесу та безпеку для обох сторін."
        },
        {
            question: "Чи потрібно залишати заставу?",
            answer:
                "Так, передбачена застава у розмірі 500 грн за один електровелосипед. Вона повертається після завершення оренди за умови відсутності пошкоджень."
        },
        {
            question: "З якого віку можна орендувати велосипед?",
            answer:
                "Орендувати електровелосипед можуть лише особи віком від 18 років."
        },
        {
            question: "Який у вас сервіс підтримки?",
            answer:
                "Ми забезпечуємо технічну підтримку, швидкий зв'язок через телефон, месенджери чи соціальні мережі, а також оперативне реагування у разі поломки або інших ситуацій."
        },
        {
            question: "Які особливості у ваших електровелосипедів?",
            answer:
                "Наші велосипеди оснащені потужними мотор-колесами 500 Вт, акумуляторами великої ємності PAS-системою, якісними дисковими гальмами, антипрокольними шинами, дисплеєм з індикаторами та іншими елементами, що забезпечують комфортну й безпечну поїздку."
        },
        {
            question: "Який термін оренди доступний?",
            answer:
                "Можна орендувати велосипед від 1 доби до цілого сезону. Сезон оренди триває, коли температура повітря не нижче +5°C і не вище +40°C."
        },
        {
            question: "Чи можна протестувати велосипед перед орендою?",
            answer:
                "Так, ми пропонуємо безкоштовний тест-драйв до 30 хвилин після внесення застави, щоб ви могли переконатися в комфорті та якості транспорту."
        },
        {
            question: "Чи планується продаж велосипедів?",
            answer:
                "Так, у майбутньому буде можливість придбати електровелосипед з гарантійним обслуговуванням."
        },
        {
            question: "Які переваги електровелосипеда порівняно з іншими видами транспорту?",
            answer:
                "Це швидко, екологічно, зручно й дешево. Ви економите час, уникаєте пробок і отримуєте задоволення від їзди. Велосипеди підходять і для доставки, і для щоденних поїздок."
        },
        {
            question: "Чому обирають саме вас?",
            answer:
                "Ми єдині у місті з такою послугою, забезпечуємо повну підтримку, обслуговування, індивідуальний підхід і унікальні батареї з великим запасом ходу."
        },
        {
            question: "Як з вами зв’язатись?",
            answer:
                "Зв’яжіться з нами через Instagram, заповніть форму на сайті або зателефонуйте за вказаним номером. Ми передзвонимо вам протягом дня."
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