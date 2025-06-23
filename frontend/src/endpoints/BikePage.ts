import i18next from "i18next";

export interface BikePageType {
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
    status_original: string;
}

export const fetchBike = async ({ bike_id }: { bike_id: number }): Promise<BikePageType | null> => {
    try {
        const response = await fetch(`/api/catalog/bike/${bike_id}/`, {
            headers: {
                "X-Language": i18next.language || "en",
            }
        });
        if (!response.ok) {
            throw new Error("Failed to fetc bike");
        }
        const data: BikePageType = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching bike:", error);
        return null;
    }
};
