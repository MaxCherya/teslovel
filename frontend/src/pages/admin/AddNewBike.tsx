import React, { useState, useEffect } from "react";
import { createBike } from "../../endpoints/adminBikes";
import { fetchBatteryTypes, fetchBrakesTypes, fetchEnginePositions } from "../../endpoints/specs";
import i18n from "../../locales";
import FullScreenLoader from "../../components/ui/loaders/FullScreenLoader";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

interface Option {
    id: number;
    name: string;
}

interface ImageError {
    [key: string]: string;
}

const AddNewBike: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        description_uk: "",
        description_en: "",
        description_ru: "",
        price_day: 0,
        max_speed: 0,
        range: 0,
        wheels_size: 0,
        power: 0,
        battery_current: 0,
        status: "",
        battery_type: "",
        brakes_type: "",
        engine_position: "",
        main_img: null as File | null,
        nav_photo: null as File | null,
        landscape_img: null as File | null,
        side_photo_left: null as File | null,
        side_photo_right: null as File | null,
        front_photo_view: null as File | null,
        rear_photo_view: null as File | null,
        top_photo_view: null as File | null,
        drive_train_closeup_photo: null as File | null,
        handlebar_controls_photo: null as File | null,
        suspension_fork_photo: null as File | null,
        wheel_tire_condition_photo: null as File | null,
        serial_number_or_branding_photo: null as File | null,
    });

    const { t } = useTranslation();
    const { t: setT } = useTranslation();

    const [statusOptions] = useState<any[]>([
        { id: 1, name: "1", label: setT("bikeCard.status.available") },
        { id: 2, name: "2", label: setT("bikeCard.status.onMaintenance") },
        { id: 3, name: "3", label: setT("bikeCard.status.notAvailable") },
    ]);

    const [imageErrors, setImageErrors] = useState<ImageError>({});
    const [batteryOptions, setBatteryOptions] = useState<Option[]>([]);
    const [brakesOptions, setBrakesOptions] = useState<Option[]>([]);
    const [engineOptions, setEngineOptions] = useState<Option[]>([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadOptions = async () => {
            try {
                setLoading(true);
                const [batteries, brakes, engines] = await Promise.all([
                    fetchBatteryTypes(),
                    fetchBrakesTypes(),
                    fetchEnginePositions(),
                ]);

                const lang = i18n.language || "en";
                const nameKey = `name_${lang}`;

                setBatteryOptions(
                    batteries.map((b: any) => ({
                        id: b.id,
                        name: b[nameKey] || b.name_en,
                    }))
                );
                setBrakesOptions(
                    brakes.map((b: any) => ({
                        id: b.id,
                        name: b[nameKey] || b.name_en,
                    }))
                );
                setEngineOptions(
                    engines.map((e: any) => ({
                        id: e.id,
                        name: e[nameKey] || e.name_en,
                    }))
                );
            } catch (err) {
                console.error("Failed to load select options:", err);
            } finally {
                setLoading(false);
            }
        };

        loadOptions();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validateImageDimensions = (file: File, requiredWidth: number, requiredHeight: number): Promise<boolean> => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                const isValid = img.width === requiredWidth && img.height === requiredHeight;
                URL.revokeObjectURL(img.src);
                resolve(isValid);
            };
            img.onerror = () => {
                URL.revokeObjectURL(img.src);
                resolve(false);
            };
        });
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            const file = files[0];
            let requiredWidth: number, requiredHeight: number;

            switch (name) {
                case "nav_photo":
                    requiredWidth = 160;
                    requiredHeight = 160;
                    break;
                case "landscape_img":
                    requiredWidth = 640;
                    requiredHeight = 360;
                    break;
                default:
                    requiredWidth = 1920;
                    requiredHeight = 1080;
                    break;
            }

            const isValid = await validateImageDimensions(file, requiredWidth, requiredHeight);

            if (isValid) {
                setFormData((prev) => ({ ...prev, [name]: file }));
                setImageErrors((prev) => ({ ...prev, [name]: "" }));
            } else {
                setImageErrors((prev) => ({
                    ...prev,
                    [name]: t("admin.bikeForm.imageError", { width: requiredWidth, height: requiredHeight }),
                }));
                e.target.value = "";
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (Object.values(imageErrors).some((error) => error !== "")) {
            console.warn("Cannot submit: Invalid image dimensions.");
            return;
        }

        try {

            setLoading(true);

            const data = new FormData();

            for (const key in formData) {
                const value = formData[key as keyof typeof formData];
                if (value !== null) {
                    data.append(key, value as string | Blob);
                }
            }

            const response = await createBike(data);
            console.log("Bike created successfully:", response);
            toast.success(t("admin.bikeForm.success"));
            window.location.reload();
        } catch (error: any) {
            console.error("Error creating bike:", error);
            toast.error(t("admin.bikeForm.error", { message: error.message }));
        } finally {
            setLoading(false);
        }
    };

    const previewMap: Record<string, string> = {
        main_img: "https://res.cloudinary.com/duqbc4nyo/image/upload/v1750243967/Main_Photo_e9deoc.png",
        nav_photo: "https://res.cloudinary.com/duqbc4nyo/image/upload/v1750244143/Nav_Photo_l2f1xf.png",
        landscape_img: "https://res.cloudinary.com/duqbc4nyo/image/upload/v1750244140/Landscape_xfgp9q.png",
        side_photo_left: "https://res.cloudinary.com/duqbc4nyo/image/upload/v1750243965/Left_View_xq71fr.png",
        side_photo_right: "https://res.cloudinary.com/duqbc4nyo/image/upload/v1750243971/Right_View_p6ndy3.png",
        front_photo_view: "https://res.cloudinary.com/duqbc4nyo/image/upload/v1750243958/Front_View_y6pjvv.png",
        rear_photo_view: "https://res.cloudinary.com/duqbc4nyo/image/upload/v1750243969/Rear_View_dfvsqz.png",
        top_photo_view: "https://res.cloudinary.com/duqbc4nyo/image/upload/v1750243976/Top_View_nw7dfc.png",
        drive_train_closeup_photo: "https://res.cloudinary.com/duqbc4nyo/image/upload/v1750243943/Drivetrain_closeup_pes5wf.png",
        handlebar_controls_photo: "https://res.cloudinary.com/duqbc4nyo/image/upload/v1750243963/Handlebar_controls_q9c8po.png",
        suspension_fork_photo: "https://res.cloudinary.com/duqbc4nyo/image/upload/v1750243975/Suspension_fork_c5ztgj.png",
        wheel_tire_condition_photo: "https://res.cloudinary.com/duqbc4nyo/image/upload/v1750243979/Wheel_tire_condition_kial5t.png",
        serial_number_or_branding_photo: "https://res.cloudinary.com/duqbc4nyo/image/upload/v1750243972/Serial_number_or_branding_mtztg5.png",
    };

    const dimensionMap: Record<string, string> = {
        nav_photo: "160×160",
        landscape_img: "640×360",
        main_img: "1920×1080",
        side_photo_left: "1920×1080",
        side_photo_right: "1920×1080",
        front_photo_view: "1920×1080",
        rear_photo_view: "1920×1080",
        top_photo_view: "1920×1080",
        drive_train_closeup_photo: "1920×1080",
        handlebar_controls_photo: "1920×1080",
        suspension_fork_photo: "1920×1080",
        wheel_tire_condition_photo: "1920×1080",
        serial_number_or_branding_photo: "1920×1080",
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900">

            {loading && <FullScreenLoader />}

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 pb-8 pt-23 lg:pt-10">
                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-2xl p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto border border-gray-100 space-y-6">
                    <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-6 tracking-tight">{t("admin.bikeForm.title")}</h2>

                    {/* Bike Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            {t("admin.bikeForm.name")}
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                            placeholder={t('admin.bikeForm.name')}
                        />
                    </div>

                    {/* Descriptions */}
                    <div>
                        <label htmlFor="description_uk" className="block text-sm font-medium text-gray-700 mb-2">
                            {t("admin.bikeForm.descriptionUk")}
                        </label>
                        <textarea
                            id="description_uk"
                            name="description_uk"
                            value={formData.description_uk}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                            placeholder={t("admin.bikeForm.descriptionUk")}
                            rows={4}
                        />
                    </div>
                    <div>
                        <label htmlFor="description_en" className="block text-sm font-medium text-gray-700 mb-2">
                            {t("admin.bikeForm.descriptionEn")}
                        </label>
                        <textarea
                            id="description_en"
                            name="description_en"
                            value={formData.description_en}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                            placeholder={t("admin.bikeForm.descriptionEn")}
                            rows={4}
                        />
                    </div>
                    <div>
                        <label htmlFor="description_ru" className="block text-sm font-medium text-gray-700 mb-2">
                            {t("admin.bikeForm.descriptionRu")}
                        </label>
                        <textarea
                            id="description_ru"
                            name="description_ru"
                            value={formData.description_ru}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                            placeholder={t("admin.bikeForm.descriptionRu")}
                            rows={4}
                        />
                    </div>

                    {/* Numeric Fields */}
                    <div>
                        <label htmlFor="price_day" className="block text-sm font-medium text-gray-700 mb-2">
                            {t("admin.bikeForm.pricePerDay")}
                        </label>
                        <input
                            type="number"
                            id="price_day"
                            name="price_day"
                            value={formData.price_day}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                            placeholder={t("admin.bikeForm.pricePerDay")}
                        />
                    </div>
                    <div>
                        <label htmlFor="max_speed" className="block text-sm font-medium text-gray-700 mb-2">
                            {t("admin.bikeForm.maxSpeed")}
                        </label>
                        <input
                            type="number"
                            id="max_speed"
                            name="max_speed"
                            value={formData.max_speed}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                            placeholder={t("admin.bikeForm.maxSpeed")}
                        />
                    </div>
                    <div>
                        <label htmlFor="range" className="block text-sm font-medium text-gray-700 mb-2">
                            {t("admin.bikeForm.range")}
                        </label>
                        <input
                            type="number"
                            id="range"
                            name="range"
                            value={formData.range}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                            placeholder={t("admin.bikeForm.range")}
                        />
                    </div>
                    <div>
                        <label htmlFor="wheels_size" className="block text-sm font-medium text-gray-700 mb-2">
                            {t("admin.bikeForm.wheelSize")}
                        </label>
                        <input
                            type="number"
                            id="wheels_size"
                            name="wheels_size"
                            value={formData.wheels_size}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                            placeholder={t("admin.bikeForm.wheelSize")}
                        />
                    </div>
                    <div>
                        <label htmlFor="power" className="block text-sm font-medium text-gray-700 mb-2">
                            {t("admin.bikeForm.power")}
                        </label>
                        <input
                            type="number"
                            id="power"
                            name="power"
                            value={formData.power}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                            placeholder={t("admin.bikeForm.power")}
                        />
                    </div>
                    <div>
                        <label htmlFor="battery_current" className="block text-sm font-medium text-gray-700 mb-2">
                            {t("admin.bikeForm.batteryCurrent")}
                        </label>
                        <input
                            type="number"
                            id="battery_current"
                            name="battery_current"
                            value={formData.battery_current}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                            placeholder={t("admin.bikeForm.batteryCurrent")}
                        />
                    </div>

                    {/* Select Fields */}
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                            {t("admin.bikeForm.status")}
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                        >
                            <option value="">{t("admin.bikeForm.selectStatus")}</option>
                            {statusOptions.map((opt) => (
                                <option key={opt.id} value={opt.name}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="battery_type" className="block text-sm font-medium text-gray-700 mb-2">
                            {t("admin.bikeForm.batteryType")}
                        </label>
                        <select
                            id="battery_type"
                            name="battery_type"
                            value={formData.battery_type}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                        >
                            <option value="">{t("admin.bikeForm.selectBattery")}</option>
                            {batteryOptions.map((opt) => (
                                <option key={opt.id} value={opt.id}>
                                    {opt.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="brakes_type" className="block text-sm font-medium text-gray-700 mb-2">
                            {t("admin.bikeForm.brakesType")}
                        </label>
                        <select
                            id="brakes_type"
                            name="brakes_type"
                            value={formData.brakes_type}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                        >
                            <option value="">{t("admin.bikeForm.selectBrakes")}</option>
                            {brakesOptions.map((opt) => (
                                <option key={opt.id} value={opt.id}>
                                    {opt.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="engine_position" className="block text-sm font-medium text-gray-700 mb-2">
                            {t("admin.bikeForm.enginePosition")}
                        </label>
                        <select
                            id="engine_position"
                            name="engine_position"
                            value={formData.engine_position}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                        >
                            <option value="">{t("admin.bikeForm.selectEngine")}</option>
                            {engineOptions.map((opt) => (
                                <option key={opt.id} value={opt.id}>
                                    {opt.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Image Inputs with Previews and Dimension Requirements */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">{t("admin.bikeForm.imagesSection")}</h3>

                        {Object.keys(previewMap).map((key) => {
                            const label = t(`admin.bikeForm.images.${key}`);
                            const preview = previewMap[key];
                            const dimensions = dimensionMap[key];

                            return (
                                <div key={key} className="mt-6">
                                    <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-2">
                                        {label}
                                    </label>
                                    <input
                                        type="file"
                                        id={key}
                                        name={key}
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-indigo-100 file:text-indigo-600 file:cursor-pointer hover:file:bg-indigo-200"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Required: {dimensions}</p>
                                    {imageErrors[key] && (
                                        <p className="text-xs text-red-600 mt-1">{imageErrors[key]}</p>
                                    )}
                                    <div className="mt-2">
                                        <img
                                            src={preview}
                                            alt={`${label} preview`}
                                            className="w-full max-w-xs sm:max-w-sm rounded-lg border border-gray-200 shadow-sm object-cover"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            {t("admin.bikeForm.example", { label })}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Form Actions */}
                    <div className="mt-8 flex justify-center space-x-3">
                        <button
                            type="submit"
                            className="px-4 sm:px-6 py-2 sm:py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-md font-medium text-sm sm:text-base"
                        >
                            {t("admin.bikeForm.addButton")}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default AddNewBike;