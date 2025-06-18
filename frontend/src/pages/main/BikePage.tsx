import React, { useEffect, useState } from 'react';
import BikeHero from '../../components/forPages/BikePage/BikeHero';
import BikeGallery from '../../components/forPages/BikePage/BikeGallery';
import BikeDescription from '../../components/forPages/BikePage/BikeDescription';
import BikeSpecs from '../../components/forPages/BikePage/BikeSpecs';
import BikeBookingCTA from '../../components/forPages/BikePage/BikeBookingCTA';
import { fetchBike } from '../../endpoints/BikePage';
import type { BikePageType } from '../../endpoints/BikePage';
import { useParams } from 'react-router-dom';
import FullScreenLoader from '../../components/ui/loaders/FullScreenLoader';

const BikePage: React.FC = () => {
    const [bike, setBike] = useState<BikePageType | null>()
    const [selectedImage, setSelectedImage] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);

    const { bikeId } = useParams<{ bikeId: string }>();
    const bike_id = Number(bikeId);

    const galleryImages = [
        bike?.main_img,
        bike?.side_photo_left,
        bike?.side_photo_right,
        bike?.front_photo_view,
        bike?.rear_photo_view,
        bike?.top_photo_view,
        bike?.drive_train_closeup_photo,
        bike?.handlebar_controls_photo,
        bike?.suspension_fork_photo,
        bike?.wheel_tire_condition_photo,
        bike?.serial_number_or_branding_photo,
    ].filter((url): url is string => typeof url === "string");

    useEffect(() => {
        const fetchB = async () => {
            try {
                setIsLoading(true);
                const bike = await fetchBike({ bike_id });
                if (bike) {
                    setBike(bike);
                    setSelectedImage(bike.main_img || "")
                }
            } catch (err) {
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }
        fetchB();
    }, [])

    return (
        <div className="w-full min-h-screen bg-gray-100 text-gray-900">
            {isLoading && <FullScreenLoader />}
            {bike && (
                <>
                    <BikeHero id={bike.id} status={bike.status_original} name={bike.name} price_day={bike.price_day} landscape_img={bike.landscape_img} />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        {galleryImages.length > 0 && <BikeGallery
                            selectedImage={selectedImage}
                            setSelectedImage={setSelectedImage}
                            images={galleryImages}
                            name={bike.name}
                        />}

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
                        <BikeBookingCTA id={bike.id} status={bike.status_original} name={bike.name} />
                    </div>
                </>
            )}
        </div>
    );
};

export default BikePage;