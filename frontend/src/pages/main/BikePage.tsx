import React, { useState } from 'react';
import BikeHero from '../../components/forPages/BikePage/BikeHero';
import BikeGallery from '../../components/forPages/BikePage/BikeGallery';
import BikeDescription from '../../components/forPages/BikePage/BikeDescription';
import BikeSpecs from '../../components/forPages/BikePage/BikeSpecs';
import BikeBookingCTA from '../../components/forPages/BikePage/BikeBookingCTA';

// Define the bike data interface
interface Bike {
    id: number;
    name: string;
    price_day: number;
    main_img: string;
    landscape_img: string;
    description: string;
    side_photo_left: string;
    side_photo_right: string;
    front_photo_view: string;
    rear_photo_view: string;
    top_photo_view: string;
    drive_train_closeup_photo: string;
    handlebar_controls_photo: string;
    suspension_fork_photo: string;
    wheel_tire_condition_photo: string;
    serial_number_or_branding_photo: string;
    max_speed: number;
    range: number;
    wheels_size: number;
    power: number;
    battery_type: string;
    battery_current: number;
    brakes_type: string;
    engine_position: string;
    status: string;
}

const tempData: Bike = {
    id: 0,
    name: 'Teslovel Model 1',
    price_day: 150,
    main_img: 'https://wallpapercat.com/w/full/f/9/9/296789-1920x1080-desktop-full-hd-bicycle-wallpaper-photo.jpg',
    landscape_img: 'https://i.ibb.co/YBJJGQ9N/teslovel-Landscape.png',
    description: `
    <p><strong>Teslovel Model 1</strong> — це втілення швидкості та стилю для справжніх поціновувачів електровелосипедів. Завдяки потужному двигуну на <strong>500 Вт</strong> та надійній батареї <strong>Li-lon 36 В</strong>, цей байк забезпечує вражаючий запас ходу до <strong>90 км</strong> та максимальну швидкість до <strong>45 км/год</strong>.</p>
    <p>Оснащений <strong>дисковими гальмами</strong> та колесами розміром <strong>27 дюймів</strong>, Teslovel Model 1 гарантує стабільність і контроль на будь-якій дорозі, від міських вулиць до заміських трас. Двигун, розташований у <strong>задньому колесі</strong>, забезпечує плавне прискорення та ефективну передачу потужності.</p>
    <p>Цей велосипед ідеально підходить для тих, хто шукає поєднання сучасних технологій, комфорту та елегантного дизайну. Забронюйте <strong>Teslovel Model 1</strong> вже сьогодні та відчуйте свободу руху!</p>
  `,
    side_photo_left: 'https://teslovel.com/wp-content/uploads/2024/03/20240304_171256-1.jpg',
    side_photo_right: 'https://teslovel.com/wp-content/uploads/2024/03/20240304_171357.jpg',
    front_photo_view: 'https://teslovel.com/wp-content/uploads/2024/03/20240304_172345.jpg',
    rear_photo_view: 'https://teslovel.com/wp-content/uploads/2024/03/tv01-053.jpg',
    top_photo_view: 'https://teslovel.com/wp-content/uploads/2024/03/tv01-053.jpg',
    drive_train_closeup_photo: 'https://teslovel.com/wp-content/uploads/2024/03/tv01-053.jpg',
    handlebar_controls_photo: 'https://teslovel.com/wp-content/uploads/2024/03/tv01-053.jpg',
    suspension_fork_photo: 'https://teslovel.com/wp-content/uploads/2024/03/tv01-053.jpg',
    wheel_tire_condition_photo: 'https://teslovel.com/wp-content/uploads/2024/03/tv01-053.jpg',
    serial_number_or_branding_photo: 'https://teslovel.com/wp-content/uploads/2024/03/tv01-053.jpg',
    max_speed: 45,
    range: 90,
    wheels_size: 27,
    power: 500,
    battery_type: 'Li-lon',
    battery_current: 36,
    brakes_type: 'disks',
    engine_position: 'rear wheel',
    status: 'Available',
};

const BikePage: React.FC = () => {
    const bike = tempData;
    const [selectedImage, setSelectedImage] = useState<string>(bike.main_img);

    const galleryImages = [
        bike.main_img,
        bike.side_photo_left,
        bike.side_photo_right,
        bike.front_photo_view,
        bike.rear_photo_view,
    ];

    return (
        <div className="w-full min-h-screen bg-gray-100 text-gray-900">
            <BikeHero status={bike.status} name={bike.name} price_day={bike.price_day} landscape_img={bike.landscape_img} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <BikeGallery
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage}
                    images={galleryImages}
                    name={bike.name}
                />
                <BikeDescription name={bike.name} description={bike.description} />
                <BikeSpecs
                    max_speed={bike.max_speed}
                    range={bike.range}
                    power={bike.power}
                    battery_type={bike.battery_type}
                    battery_current={bike.battery_current}
                    brakes_type={bike.brakes_type}
                    wheels_size={bike.wheels_size}
                    engine_position={bike.engine_position}
                />
                <BikeBookingCTA status={bike.status} name={bike.name} />
            </div>
        </div>
    );
};

export default BikePage;