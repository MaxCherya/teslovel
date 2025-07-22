import React, { useEffect, useState } from "react";
import {
    fetchBikeOptionFields,
    updateBikeDescriptions,
    updateBikeForeignKeys,
    updateBikeImage,
    updateBikeSpecs,
    type BikeOption,
    type BikeOptionFieldsResponse
} from "../../endpoints/adminBikes";
import { useTranslation } from "react-i18next";

interface BikeDetailsAdminProps {
    bike: any;
}

const BikeDetailsAdmin: React.FC<BikeDetailsAdminProps> = ({ bike }) => {
    const [editing, setEditing] = useState(false);
    const [descriptions, setDescriptions] = useState({
        uk: bike.description_uk || "",
        ru: bike.description_ru || "",
        en: bike.description_en || "",
    });
    const [saving, setSaving] = useState(false);
    const [saveError, setSaveError] = useState("");
    const [editingSpecs, setEditingSpecs] = useState(false);
    const [specs, setSpecs] = useState({
        price_day: bike.price_day,
        max_speed: bike.max_speed,
        range: bike.range,
        wheels_size: bike.wheels_size,
        power: bike.power,
        battery_current: bike.battery_current,
    });
    const [editingFKs, setEditingFKs] = useState(false);
    const [fkOptions, setFkOptions] = useState<BikeOptionFieldsResponse | null>(null);
    const [fkValues, setFkValues] = useState({
        battery_type: bike.battery_type_id || null,
        brakes_type: bike.brakes_type_id || null,
        engine_position: bike.engine_position_id || null,
    });

    const { t } = useTranslation("", { keyPrefix: "admin.bike_admin.details" });

    const imageFields = [
        { key: "main_img", label: t("images.main_img") },
        { key: "landscape_img", label: t("images.landscape_img") },
        { key: "side_photo_left", label: t("images.side_photo_left") },
        { key: "side_photo_right", label: t("images.side_photo_right") },
        { key: "front_photo_view", label: t("images.front_photo_view") },
        { key: "rear_photo_view", label: t("images.rear_photo_view") },
        { key: "top_photo_view", label: t("images.top_photo_view") },
        { key: "drive_train_closeup_photo", label: t("images.drive_train_closeup_photo") },
        { key: "handlebar_controls_photo", label: t("images.handlebar_controls_photo") },
        { key: "suspension_fork_photo", label: t("images.suspension_fork_photo") },
        { key: "wheel_tire_condition_photo", label: t("images.wheel_tire_condition_photo") },
        { key: "serial_number_or_branding_photo", label: t("images.serial_number_or_branding_photo") },
        { key: "nav_photo", label: t("images.nav_photo") },
    ];

    const imageDimensions: Record<string, { width: number; height: number }> = {
        nav_photo: { width: 160, height: 160 },
        landscape_img: { width: 640, height: 360 },
        main_img: { width: 1920, height: 1080 },
        side_photo_left: { width: 1920, height: 1080 },
        side_photo_right: { width: 1920, height: 1080 },
        front_photo_view: { width: 1920, height: 1080 },
        rear_photo_view: { width: 1920, height: 1080 },
        top_photo_view: { width: 1920, height: 1080 },
        drive_train_closeup_photo: { width: 1920, height: 1080 },
        handlebar_controls_photo: { width: 1920, height: 1080 },
        suspension_fork_photo: { width: 1920, height: 1080 },
        wheel_tire_condition_photo: { width: 1920, height: 1080 },
        serial_number_or_branding_photo: { width: 1920, height: 1080 },
    };

    const [imageEditing, setImageEditing] = useState<{ [key: string]: boolean }>({});
    const [uploadingImage, setUploadingImage] = useState<{ [key: string]: boolean }>({});
    const [uploadErrors, setUploadErrors] = useState<{ [key: string]: string }>({});

    const handleImageChange = async (fieldKey: string, file: File) => {
        setUploadingImage(prev => ({ ...prev, [fieldKey]: true }));
        setUploadErrors(prev => ({ ...prev, [fieldKey]: "" }));

        try {
            await updateBikeImage(bike.id, fieldKey, file);
            window.location.reload();
        } catch (err: any) {
            setUploadErrors(prev => ({
                ...prev,
                [fieldKey]: err.message || t("upload_failed")
            }));
        } finally {
            setUploadingImage(prev => ({ ...prev, [fieldKey]: false }));
        }
    };

    const handleChange = (lang: "uk" | "ru" | "en", value: string) => {
        setDescriptions(prev => ({ ...prev, [lang]: value }));
    };

    const getFKLabel = (key: keyof typeof fkValues): string => {
        const listKey = `${key}s` as keyof Omit<BikeOptionFieldsResponse, "current">;
        const list = fkOptions?.[listKey];

        if (Array.isArray(list)) {
            const valueId = fkValues[key];
            const found = list.find((opt) => opt.id === valueId);
            return found?.name || t("not_selected");
        }

        return t("not_selected");
    };

    useEffect(() => {
        const loadFKOptions = async () => {
            try {
                const options = await fetchBikeOptionFields(bike.id);
                setFkOptions(options);
                if (options.current) {
                    setFkValues({
                        battery_type: options.current.battery_type,
                        brakes_type: options.current.brakes_type,
                        engine_position: options.current.engine_position,
                    });
                }
            } catch (err) {
                console.error("❌ Failed to load FK options", err);
            }
        };
        if (editingFKs) loadFKOptions();
    }, [editingFKs, bike.id]);

    const handleFKChange = (field: keyof typeof fkValues, value: number) => {
        setFkValues(prev => ({ ...prev, [field]: value }));
    };

    const handleFKSave = async () => {
        setSaving(true);
        setSaveError("");
        try {
            await updateBikeForeignKeys(bike.id, fkValues);
            setEditingFKs(false);
        } catch (err: any) {
            setSaveError(err.message || "Failed to update foreign keys");
        } finally {
            setSaving(false);
        }
    };



    const handleSave = async () => {
        setSaving(true);
        setSaveError("");
        try {
            await updateBikeDescriptions(bike.id, {
                description_uk: descriptions.uk,
                description_ru: descriptions.ru,
                description_en: descriptions.en,
            });
            setEditing(false);
        } catch (err: any) {
            setSaveError(err.message || "Failed to save descriptions.");
        } finally {
            setSaving(false);
        }
    };

    const handleSpecChange = (key: keyof typeof specs, value: string) => {
        setSpecs(prev => ({ ...prev, [key]: Number(value) }));
    };

    const handleSpecsSave = async () => {
        setSaving(true);
        setSaveError("");
        try {
            await updateBikeSpecs(bike.id, specs);
            setEditingSpecs(false);
        } catch (err: any) {
            setSaveError(err.message || "Failed to save specs.");
        } finally {
            setSaving(false);
        }
    };

    if (!bike) return null;

    return (
        <div className="space-y-6 mt-8">
            {/* Description and Info */}
            <div>
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{t("section.descriptions")}</h3>
                    <button
                        onClick={() => setEditing(!editing)}
                        className="text-blue-600 text-sm font-medium hover:underline"
                    >
                        {editing ? t("cancel") : t("edit")}
                    </button>
                </div>

                <div className="space-y-4">
                    {["uk", "ru", "en"].map(lang => (
                        <div key={lang}>
                            <p className="text-sm font-medium text-gray-600 mb-1">
                                {t(`lang.${lang}`)}
                            </p>
                            {editing ? (
                                <textarea
                                    rows={4}
                                    className="w-full border rounded-lg px-3 py-2 text-sm"
                                    value={descriptions[lang as "uk" | "ru" | "en"]}
                                    onChange={e => handleChange(lang as "uk" | "ru" | "en", e.target.value)}
                                />
                            ) : (
                                <p className="text-sm text-gray-700 whitespace-pre-line">{descriptions[lang as "uk" | "ru" | "en"]}</p>
                            )}
                        </div>
                    ))}
                </div>

                {editing && (
                    <div className="mt-3 flex justify-end">
                        <button
                            onClick={handleSave}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50"
                            disabled={saving}
                        >
                            {saving ? t("saving") : t("save")}
                        </button>
                    </div>
                )}

                {saveError && <p className="text-sm text-red-600 mt-2">{saveError}</p>}
            </div>

            {/* Bike specs */}
            <div>
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{t("section.specs")}</h3>
                    <button
                        onClick={() => setEditingSpecs(!editingSpecs)}
                        className="text-blue-600 text-sm font-medium hover:underline"
                    >
                        {editingSpecs ? t("cancel") : t("edit")}
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {([
                        { key: "price_day", label: t("specs.price_day"), unit: t("units.price_day") },
                        { key: "max_speed", label: t("specs.max_speed"), unit: t("units.max_speed") },
                        { key: "range", label: t("specs.range"), unit: t("units.range") },
                        { key: "wheels_size", label: t("specs.wheels_size"), unit: t("units.wheels_size") },
                        { key: "power", label: t("specs.power"), unit: t("units.power") },
                        { key: "battery_current", label: t("specs.battery_current"), unit: t("units.battery_current") },
                    ] as const).map(({ key, label, unit }) => (
                        <div key={key}>
                            {editingSpecs ? (
                                <>
                                    <label className="text-sm font-medium text-gray-600 block mb-1">{label}</label>
                                    <input
                                        type="number"
                                        value={specs[key]}
                                        onChange={(e) => handleSpecChange(key, e.target.value)}
                                        className="w-full border rounded-lg px-3 py-2 text-sm"
                                    />
                                </>
                            ) : (
                                <p className="text-sm text-gray-800">
                                    <span className="font-medium text-gray-600">{label}:</span>{" "}
                                    {specs[key]} {unit}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                {editingSpecs && (
                    <div className="mt-3 flex justify-end">
                        <button
                            onClick={handleSpecsSave}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50"
                            disabled={saving}
                        >
                            {saving ? t("saving") : t("save")}
                        </button>
                    </div>
                )}

                {saveError && <p className="text-sm text-red-600 mt-2">{saveError}</p>}
            </div>
            {/* Components */}
            <div>
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{t("section.components")}</h3>
                    <button
                        onClick={() => setEditingFKs(!editingFKs)}
                        className="text-blue-600 text-sm font-medium hover:underline"
                    >
                        {editingFKs ? t("cancel") : t("edit")}
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                        { key: "battery_type", label: t("components.battery_type") },
                        { key: "brakes_type", label: t("components.brakes_type") },
                        { key: "engine_position", label: t("components.engine_position") }
                    ].map(({ key, label }) => (
                        <div key={key}>
                            {editingFKs ? (
                                <>
                                    <label className="text-sm font-medium text-gray-600 block mb-1">{label}</label>
                                    <select
                                        className="w-full border rounded-lg px-3 py-2 text-sm"
                                        value={fkValues[key as keyof typeof fkValues] || ""}
                                        onChange={(e) => handleFKChange(key as keyof typeof fkValues, Number(e.target.value))}
                                    >
                                        <option value="">{t("not_selected")}</option>
                                        {
                                            Array.isArray(fkOptions?.[`${key}s` as keyof BikeOptionFieldsResponse]) &&
                                            (fkOptions?.[`${key}s` as keyof BikeOptionFieldsResponse] as BikeOption[]).map((opt) => (
                                                <option key={opt.id} value={opt.id}>
                                                    {opt.name}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </>
                            ) : (
                                <p className="text-sm text-gray-800">
                                    <span className="font-medium text-gray-600">{label}:</span>{" "}
                                    {getFKLabel(key as keyof typeof fkValues)}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                {editingFKs && (
                    <div className="mt-3 flex justify-end">
                        <button
                            onClick={handleFKSave}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50"
                            disabled={saving}
                        >
                            {saving ? t("saving") : t("save")}
                        </button>
                    </div>
                )}
            </div>

            {/* Photos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {imageFields.map(({ key, label }) => (
                    <div key={key} className="mb-6">
                        <p className="text-sm font-medium text-gray-700 mb-1">{label}</p>
                        {bike[key] && (
                            <img
                                src={bike[key]}
                                alt={label}
                                className="w-full max-w-md rounded-lg shadow border mb-2"
                            />
                        )}
                        {imageEditing[key] ? (
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;

                                    const img = new Image();
                                    img.onload = () => {
                                        const required = imageDimensions[key] || { width: 1920, height: 1080 };
                                        if (img.width !== required.width || img.height !== required.height) {
                                            setUploadErrors(prev => ({
                                                ...prev,
                                                [key]: `Image must be ${required.width}x${required.height}px`,
                                            }));
                                        } else {
                                            handleImageChange(key, file);
                                        }
                                    };

                                    const reader = new FileReader();
                                    reader.onload = (event) => {
                                        if (typeof event.target?.result === "string") {
                                            img.src = event.target.result;
                                        }
                                    };
                                    reader.readAsDataURL(file);
                                }}
                                className="text-sm"
                            />
                        ) : null}
                        <div className="flex gap-2 mt-1">
                            <button
                                onClick={() =>
                                    setImageEditing(prev => ({ ...prev, [key]: !prev[key] }))
                                }
                                className="text-blue-600 text-xs font-medium hover:underline"
                            >
                                {imageEditing[key] ? t("cancel_upload") : t("change")}
                            </button>
                            {uploadingImage[key] && <span className="text-gray-500 text-xs">{t("uploading")}</span>}
                        </div>
                        {uploadErrors[key] && (
                            <p className="text-xs text-red-600 mt-1">{uploadErrors[key]}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BikeDetailsAdmin;