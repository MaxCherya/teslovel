const advantages = [
    {
        icon: "⏱️",
        text: "Не чекай транспорт — катайся коли хочеш",
    },
    {
        icon: "🌿",
        text: "Легкий, зручний, екологічний",
    },
    {
        icon: "📦",
        text: "Ідеальний для доставки",
    },
    {
        icon: "🤫",
        text: "Тиша замість гулу мотора",
    },
];

const Pros = () => {
    return (
        <section className="w-full bg-gradient-to-b from-white to-gray-50 py-20 px-6" id="rental-pros">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl lg:text-5xl font-extrabold text-center text-gray-900 mb-16 tracking-tight">
                    Переваги оренди
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {advantages.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                        >
                            <div className="text-4xl mt-1 animate-pulse">{item.icon}</div>
                            <p className="text-lg font-medium text-gray-800 leading-relaxed">
                                {item.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pros;