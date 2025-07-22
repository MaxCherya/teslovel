import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import BannerSwiper from "../../components/ui/swipers/BannerSwiper";
import BikeCard from "../../components/forPages/Models/BikeCard";
import { fetchModelsBikes } from "../../endpoints/Models";
import { fetchPaginatedBlogs } from "../../endpoints/blogs";
import FullScreenLoader from "../../components/ui/loaders/FullScreenLoader";

const Models: React.FC = () => {
    const [bikes, setBikes] = useState<any>([]);
    const [dynamicBanners, setDynamicBanners] = useState<any[]>([]);
    const { t, i18n } = useTranslation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                const bikesData = await fetchModelsBikes();
                setBikes(bikesData);

                const blogData = await fetchPaginatedBlogs(1);
                const langKey = i18n.language as "en" | "uk" | "ru";
                const bannerKey = `banner_${langKey}`;

                const banners = blogData.results.map((item: any) => ({
                    id: `${item.id}`,
                    banner_url: item[bannerKey],
                }));

                setDynamicBanners(banners);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [i18n.language]);

    const allBanners = [...dynamicBanners];

    return (
        <div className="w-full min-h-screen text-gray-900 bg-gray-100">
            {isLoading && <FullScreenLoader />}
            <div className="flex flex-col items-center px-4">

                {/* Banner */}
                <div className="w-full max-w-7xl mt-25 lg:mt-16 mb-10">
                    <BannerSwiper banners={allBanners} />
                </div>

                {/* Stats/Intro */}
                <div className="w-full max-w-7xl flex flex-col items-center">
                    <h1 className="text-4xl font-bold uppercase tracking-tight text-gray-900 mb-2">
                        {t("models.title")}
                    </h1>
                    <p className="text-gray-600 text-lg mb-4 text-center">
                        {t("models.totalLabel")}:{" "}
                        <span className="font-semibold">{bikes.length}</span> | {t("models.availableLabel")}:{" "}
                        <span className="font-semibold">
                            {bikes.filter((b: any) => b.status_original === "Available").length}
                        </span>
                    </p>
                </div>

                {/* Bike Grid */}
                <div className="w-full bg-gray-100 max-w-7xl flex flex-col items-center py-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-7xl">
                        {bikes.map((bike: any) => (
                            <BikeCard
                                key={bike.id}
                                status={bike.status}
                                status_original={bike.status_original}
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