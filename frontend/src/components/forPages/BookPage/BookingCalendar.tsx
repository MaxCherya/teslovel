import React, { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import { enUS } from 'date-fns/locale'
import { uk } from 'date-fns/locale'
import { ru } from 'date-fns/locale'


interface Props {
    selectedRange: { start: Date | null; end: Date | null };
    onChange: (range: { startDate: Date | null; endDate: Date | null }) => void;
    disabledDates: Date[];
}

const localeMap: { [key: string]: Locale } = {
    en: enUS,
    uk,
    ua: uk,
    ru,
};

const BookingCalendar: React.FC<Props> = ({ selectedRange, onChange, disabledDates }) => {
    const [key, _setKey] = useState(0);
    const today = new Date();
    const { i18n } = useTranslation();
    const currentLocale = localeMap[i18n.language] || enUS;

    useEffect(() => {
        registerLocale(i18n.language, currentLocale);
    }, [i18n.language]);

    const handleChange = (update: [Date | null, Date | null]) => {
        const [start, end] = update;
        if (selectedRange.start && selectedRange.end && start) {
            onChange({ startDate: null, endDate: null });
        } else {
            onChange({ startDate: start, endDate: end });
        }
    };

    const isSameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString();

    const dayClassName = (date: Date) => {
        if (date < today) return "custom-day past-day";
        if (disabledDates.some((d) => isSameDay(d, date))) return "custom-day busy-day";
        return "custom-day available-day";
    };

    return (
        <div className="w-full max-w-md">
            <DatePicker
                key={key}
                selected={selectedRange.start || null}
                onChange={handleChange}
                startDate={selectedRange.start}
                endDate={selectedRange.end}
                selectsRange
                inline
                excludeDates={disabledDates}
                minDate={new Date()}
                monthsShown={1}
                calendarStartDay={1}
                highlightDates={[]}
                openToDate={selectedRange.start || undefined}
                dayClassName={dayClassName}
                locale={i18n.language}
            />
        </div>
    );
};

export default BookingCalendar;