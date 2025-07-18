import React, { useEffect, useState } from "react";
import { fetchBikeOptionFields, updateBikeDescriptions, updateBikeForeignKeys, updateBikeSpecs, type BikeOption, type BikeOptionFieldsResponse } from "../../endpoints/adminBikes";

interface BikeDetailsAdminProps {
    bike: any;
}

const ImageField: React.FC<{ label: string; url?: string }> = ({ label, url }) => {
    if (!url) return null;
    return (
        <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-1">{label}</p>
            <img src={url} alt={label} className="w-full max-w-md rounded-lg shadow border" />
        </div>
    );
};

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

    const handleChange = (lang: "uk" | "ru" | "en", value: string) => {
        setDescriptions(prev => ({ ...prev, [lang]: value }));
    };

    const getFKLabel = (key: keyof typeof fkValues): string => {
        const listKey = `${key}s` as keyof Omit<BikeOptionFieldsResponse, "current">;
        const list = fkOptions?.[listKey];

        if (Array.isArray(list)) {
            const valueId = fkValues[key];
            const found = list.find((opt) => opt.id === valueId);
            return found?.name || "Not selected";
        }

        return "Not selected";
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
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Descriptions</h3>
                    <button
                        onClick={() => setEditing(!editing)}
                        className="text-blue-600 text-sm font-medium hover:underline"
                    >
                        {editing ? "Cancel" : "Edit"}
                    </button>
                </div>

                <div className="space-y-4">
                    {["uk", "ru", "en"].map(lang => (
                        <div key={lang}>
                            <p className="text-sm font-medium text-gray-600 mb-1">
                                {lang === "uk" ? "🇺🇦 Ukrainian" : lang === "ru" ? "🇷🇺 Russian" : "🇬🇧 English"}
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
                            {saving ? "Saving..." : "Save"}
                        </button>
                    </div>
                )}

                {saveError && <p className="text-sm text-red-600 mt-2">{saveError}</p>}
            </div>

            {/* Bike specs */}
            <div>
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">Technical Specs</h3>
                    <button
                        onClick={() => setEditingSpecs(!editingSpecs)}
                        className="text-blue-600 text-sm font-medium hover:underline"
                    >
                        {editingSpecs ? "Cancel" : "Edit"}
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {([
                        { key: "price_day", label: "Price per day", unit: "₴" },
                        { key: "max_speed", label: "Max speed", unit: "km/h" },
                        { key: "range", label: "Range", unit: "km" },
                        { key: "wheels_size", label: "Wheels size", unit: '"' },
                        { key: "power", label: "Power", unit: "W" },
                        { key: "battery_current", label: "Battery current", unit: "Ah" },
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
                            {saving ? "Saving..." : "Save"}
                        </button>
                    </div>
                )}

                {saveError && <p className="text-sm text-red-600 mt-2">{saveError}</p>}
            </div>
            <div>
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">Bike Components</h3>
                    <button
                        onClick={() => setEditingFKs(!editingFKs)}
                        className="text-blue-600 text-sm font-medium hover:underline"
                    >
                        {editingFKs ? "Cancel" : "Edit"}
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                        { key: "battery_type", label: "Battery type" },
                        { key: "brakes_type", label: "Brakes type" },
                        { key: "engine_position", label: "Engine position" },
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
                                        <option value="">Not selected</option>
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
                            {saving ? "Saving..." : "Save"}
                        </button>
                    </div>
                )}
            </div>

            {/* Photos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <ImageField label="Main Image" url={bike.main_img} />
                <ImageField label="Landscape Image" url={bike.landscape_img} />
                <ImageField label="Side Photo Left" url={bike.side_photo_left} />
                <ImageField label="Side Photo Right" url={bike.side_photo_right} />
                <ImageField label="Front View" url={bike.front_photo_view} />
                <ImageField label="Rear View" url={bike.rear_photo_view} />
                <ImageField label="Top View" url={bike.top_photo_view} />
                <ImageField label="Drivetrain Close-up" url={bike.drive_train_closeup_photo} />
                <ImageField label="Handlebar & Controls" url={bike.handlebar_controls_photo} />
                <ImageField label="Suspension Fork" url={bike.suspension_fork_photo} />
                <ImageField label="Wheels & Tires" url={bike.wheel_tire_condition_photo} />
                <ImageField label="Serial Number / Branding" url={bike.serial_number_or_branding_photo} />
            </div>
        </div>
    );
};

export default BikeDetailsAdmin;