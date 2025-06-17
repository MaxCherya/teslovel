import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
    selectedRange: { start: Date | null; end: Date | null };
    onChange: (range: { startDate: Date | null; endDate: Date | null }) => void;
    disabledDates: Date[];
}

const BookingCalendar: React.FC<Props> = ({ selectedRange, onChange, disabledDates }) => {
    const [key, setKey] = useState(0);

    useEffect(() => {
        // When range is fully cleared, increment key to force remount
        if (!selectedRange.start && !selectedRange.end) {
            setKey((prev) => prev + 1);
        }
    }, [selectedRange.start, selectedRange.end]);

    const handleChange = (update: [Date | null, Date | null]) => {
        const [start, end] = update;

        // If both start and end are set, next click should clear
        if (selectedRange.start && selectedRange.end && start) {
            onChange({ startDate: null, endDate: null });
        } else {
            onChange({ startDate: start, endDate: end });
        }
    };

    return (
        <div className="w-full max-w-md">
            <DatePicker
                key={key} // Force remount when range is cleared
                selected={selectedRange.start || null} // Explicitly null when no selection
                onChange={handleChange}
                startDate={selectedRange.start}
                endDate={selectedRange.end}
                selectsRange
                inline
                excludeDates={disabledDates}
                minDate={new Date()}
                monthsShown={1}
                calendarStartDay={1}
                highlightDates={[]} // Prevent default highlighting of today
                openToDate={selectedRange.start || undefined} // Focus on start date or nothing
            />
        </div>
    );
};

export default BookingCalendar;