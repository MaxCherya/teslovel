import React from "react";
import PhoneInput from "react-phone-input-2";
import moment from "moment";
import "react-phone-input-2/lib/style.css";

interface Props {
    formData: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onPhoneChange: (val: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    t: (key: string, options?: any) => string;
}

const BookingForm: React.FC<Props> = ({
    formData,
    onChange,
    onPhoneChange,
    onSubmit,
    t,
}) => (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-700">
                {t("bookPage.nameLabel")} <span className="text-red-500">*</span>
            </span>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={onChange}
                placeholder={t("bookPage.namePlaceholder")}
                className="w-full text-base border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
            />
        </label>

        <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-700">
                {t("contactsMenu.phoneLabel")} <span className="text-red-500">*</span>
            </span>
            <PhoneInput
                country={"ua"}
                value={formData.phone}
                onChange={onPhoneChange}
                inputClass="!w-full"
            />
        </label>

        <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-700">
                {t("bookPage.commentsLabel")}
            </span>
            <textarea
                name="comments"
                value={formData.comments}
                onChange={onChange}
                placeholder={t("bookPage.commentsPlaceholder")}
                maxLength={300}
                rows={4}
                className="w-full text-base border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all"
            />
        </label>

        <div className="text-sm text-gray-600">
            {formData.dateRange.start && formData.dateRange.end ? (
                <p className="font-medium">
                    {t("bookPage.selectedDates", {
                        start: moment(formData.dateRange.start).format("MMM D, YYYY"),
                        end: moment(formData.dateRange.end).format("MMM D, YYYY"),
                    })}
                </p>
            ) : (
                <p className="text-gray-500 italic">{t("bookPage.noDatesSelected")}</p>
            )}
        </div>

        <button
            type="submit"
            className="mt-2 cursor-pointer bg-blue-600 text-white text-base font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
            {t("bookPage.submitButton")}
        </button>

        <style>{`
      :global(.phone-input-container .flag-dropdown) {
        background-color: #f9fafb;
      }
      :global(.phone-input-container .selected-flag:hover) {
        background-color: #e5e7eb;
      }
    `}</style>
    </form>
);

export default BookingForm;