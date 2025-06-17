import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { eachDayOfInterval, parseISO } from "date-fns";

import BookingHeader from "../../components/forPages/BookPage/BookingHeader";
import BookingForm from "../../components/forPages/BookPage/BookingForm";
import BookingCalendar from "../../components/forPages/BookPage/BookingCalendar";

interface BookingFormData {
    name: string;
    phone: string;
    comments: string;
    dateRange: { start: Date | null; end: Date | null };
}

const tempData = {
    id: 0,
    name: "Teslovel Model 1",
    busy_days: [
        { start: "2025-06-20", end: "2025-06-22" },
        { start: "2025-06-25", end: "2025-06-27" },
    ],
};

const BookPage: React.FC = () => {
    const { bikeId } = useParams<{ bikeId: string }>();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<BookingFormData>({
        name: "",
        phone: "",
        comments: "",
        dateRange: { start: null, end: null },
    });

    const disabledDates: Date[] = useMemo(() => {
        return tempData.busy_days.flatMap((range) =>
            eachDayOfInterval({
                start: parseISO(range.start),
                end: parseISO(range.end),
            })
        );
    }, []);

    const handleDateRangeChange = (range: { startDate: Date | null; endDate: Date | null }) => {
        const { startDate, endDate } = range;

        // If no start date, reset the range
        if (!startDate) {
            setFormData((prev) => ({
                ...prev,
                dateRange: { start: null, end: null },
            }));
            return;
        }

        // If only start date is selected, update without validation
        if (startDate && !endDate) {
            setFormData((prev) => ({
                ...prev,
                dateRange: { start: startDate, end: null },
            }));
            return;
        }

        // Validate full range (start and end dates)
        try {
            const selectedDates = eachDayOfInterval({ start: startDate, end: endDate! });
            const hasConflict = selectedDates.some((date) =>
                disabledDates.some((d) => d.toDateString() === date.toDateString())
            );

            if (hasConflict) {
                toast.error(t("bookPage.dateOverlapError"));
                setFormData((prev) => ({
                    ...prev,
                    dateRange: { start: null, end: null },
                }));
                return;
            }

            setFormData((prev) => ({
                ...prev,
                dateRange: { start: startDate, end: endDate },
            }));
        } catch (error) {
            console.error("Invalid date range:", error);
            toast.error(t("bookPage.dateErrorFallback"));
            setFormData((prev) => ({
                ...prev,
                dateRange: { start: null, end: null },
            }));
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePhoneChange = (value: string) => {
        setFormData((prev) => ({ ...prev, phone: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.dateRange.start || !formData.dateRange.end) {
            toast.error(t("bookPage.selectDateError"));
            return;
        }

        console.log("Booking Data:", {
            bikeId,
            ...formData,
            dateRange: {
                start: moment(formData.dateRange.start).format("YYYY-MM-DD"),
                end: moment(formData.dateRange.end).format("YYYY-MM-DD"),
            },
        });

        toast.success(t("bookPage.successMessage"));
        navigate("/");
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-gray-100 flex flex-col"
        >

            <div className="flex-grow flex flex-col max-w-5xl mx-auto px-4 sm:px-6 pt-20 pb-10">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-full bg-white rounded-2xl shadow-lg p-8 space-y-8"
                >
                    <BookingHeader title={t("bookPage.title", { bikeName: tempData.name })} />

                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="lg:w-1/2 w-full lg:min-w-0">
                            <BookingCalendar
                                selectedRange={formData.dateRange}
                                onChange={handleDateRangeChange}
                                disabledDates={disabledDates}
                            />
                        </div>

                        <div className="lg:w-1/2 w-full">
                            <BookingForm
                                formData={formData}
                                onChange={handleInputChange}
                                onPhoneChange={handlePhoneChange}
                                onSubmit={handleSubmit}
                                t={t}
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default BookPage;