import React, { useEffect, useState } from "react";

import banner1 from '../../assets/imgs/test-blog-banner-1.png';
import banner2 from '../../assets/imgs/test-blog-banner-2.png';
import banner3 from '../../assets/imgs/test-blog-banner-3.png';

import BannerSwiper from "../../components/ui/swipers/BannerSwiper";
import BikeCard from "../../components/forPages/Models/BikeCard";

const tempBlogBanners = [
    { id: 0, banner_url: banner1 },
    { id: 1, banner_url: banner2 },
    { id: 2, banner_url: banner3 },
];

const tempBikes = [
    {
        id: 0,
        name: 'Teslovel Model 1',
        price_day: 150,
        main_img: 'https://wallpapercat.com/w/full/f/9/9/296789-1920x1080-desktop-full-hd-bicycle-wallpaper-photo.jpg',
        status: 'Available'
    },
    {
        id: 1,
        name: 'Teslovel Model 3',
        price_day: 180,
        main_img: 'https://wallpapercat.com/w/full/6/8/5/296785-1920x1080-desktop-full-hd-bicycle-background-image.jpg',
        status: 'On Maintenance'
    },
    {
        id: 2,
        name: 'Teslovel TV01-05',
        price_day: 130,
        main_img: 'https://external-preview.redd.it/qZ16poIPtlly0Ecmb2p2zOqHND_I1tKRJYVSCM30cbw.jpg?auto=webp&s=9f863c7d731b8aa512ee61b23e17fe2330e0b377',
        status: 'Not Available'
    },
];

const Models: React.FC = () => {
    const [bikes, setBikes] = useState(tempBikes);

    return (
        <div className="w-full min-h-screen text-gray-900 bg-gray-50">
            <div className="flex flex-col items-center px-4">

                {/* Banner */}
                <div className="w-full max-w-7xl mt-16 mb-10">
                    <BannerSwiper banners={tempBlogBanners} />
                </div>

                {/* Stats/Intro */}
                <div className="w-full max-w-7xl flex flex-col items-center">
                    <h1 className="text-4xl font-bold uppercase tracking-tight text-gray-900 mb-2">
                        Наш парк велосипедів
                    </h1>
                    <p className="text-gray-600 text-lg mb-4 text-center">
                        Всього моделей: <span className="font-semibold">{bikes.length}</span> | Доступно:{" "}
                        <span className="font-semibold">
                            {bikes.filter(b => b.status === "Available").length}
                        </span>
                    </p>
                </div>

                {/* Bike Grid */}
                <div className="w-screen bg-gray-200 flex flex-col items-center py-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl" >
                        {bikes.map((bike) => (
                            <BikeCard
                                key={bike.id}
                                status={bike.status}
                                header={bike.name}
                                id={bike.id}
                                photo={bike.main_img}
                                price={bike.price_day}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Models;
