import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { eachDayOfInterval, parseISO } from "date-fns";

import BookingHeader from "../../components/forPages/BookPage/BookingHeader";
import BookingForm from "../../components/forPages/BookPage/BookingForm";
import BookingCalendar from "../../components/forPages/BookPage/BookingCalendar";
import { fetchBikeBusyDays, uploadOrderRequest, type BikeBusyDaysResponse } from "../../endpoints/BookPage";
import FullScreenLoader from "../../components/ui/loaders/FullScreenLoader";

interface BookingFormData {
    name: string;
    phone: string;
    comments: string;
    formRenderedAt: number;
    user_email: string;
    bike: string | number | undefined;
    dateRange: { start: Date | null; end: Date | null };
}

const BookPage: React.FC = () => {
    const { bikeId } = useParams<{ bikeId: string }>();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState<BookingFormData>({
        name: "",
        phone: "",
        user_email: "",
        comments: "",
        bike: bikeId,
        formRenderedAt: 0,
        dateRange: { start: null, end: null },
    });

    const [bikeData, setBikeData] = useState<BikeBusyDaysResponse | null>(null);

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            formRenderedAt: Math.floor(Date.now() / 1000),
        }));
    }, []);

    useEffect(() => {
        if (!bikeId) return;

        const loadBusyDays = async () => {
            try {
                setLoading(true);
                const data = await fetchBikeBusyDays(Number(bikeId));
                if (data) setBikeData(data);
                else toast.error(t("bookPage.bikeNotFound"));
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false);
            }

        };

        loadBusyDays();
    }, [bikeId]);


    const disabledDates: Date[] = useMemo(() => {
        if (!bikeData) return [];
        return bikeData.busy_days.flatMap((range) =>
            eachDayOfInterval({
                start: parseISO(range.start),
                end: parseISO(range.end),
            })
        );
    }, [bikeData]);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.dateRange.start || !formData.dateRange.end) {
            toast.error(t("bookPage.selectDateError"));
            return;
        }

        if (
            !formData.name ||
            !formData.phone ||
            formData.phone.replace(/\D/g, "").length < 10
        ) {
            toast.error(t("bookPage.nameAndPhoneError"));
            return;
        }

        if (!bikeId) {
            toast.error("Bike ID is missing");
            return;
        }

        const payload = {
            bike: Number(bikeId),
            name: formData.name,
            phone: formData.phone,
            comments: formData.comments,
            start_date: moment(formData.dateRange.start).format("YYYY-MM-DD"),
            end_date: moment(formData.dateRange.end).format("YYYY-MM-DD"),
            formRenderedAt: formData.formRenderedAt.toString(),
            user_email: formData.user_email || "",
        };

        try {
            setLoading(true);
            const res = await uploadOrderRequest({ payload });

            if (res?.success) {
                toast.success(t("bookPage.successMessage"));
                navigate("/");
            } else {
                toast.error(t("bookPage.serverError") || "Помилка сервера");
            }
        } catch (err) {
            toast.error(t("bookPage.serverError") || "Помилка сервера");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen w-screen bg-gray-100 flex flex-col items-center justify-center py-4"
        >
            {loading && <FullScreenLoader />}

            <div className="w-full max-w-[95%] lg:max-w-7xl flex flex-col items-center bg-white rounded-2xl shadow-2xl p-8 mt-20">
                <div className="w-full mb-8 border-b-2 py-2 border-gray-200">
                    <BookingHeader title={t("bookPage.title", { bikeName: bikeData?.name || "..." })} />
                </div>
                <div className="flex flex-col w-full items-center lg:flex-row lg:gap-8">
                    <div className="flex flex-col gap-4 items-center">
                        <BookingCalendar
                            selectedRange={formData.dateRange}
                            onChange={handleDateRangeChange}
                            disabledDates={disabledDates}
                        />
                    </div>
                    <div className="w-full">
                        <BookingForm
                            formData={formData}
                            onChange={handleInputChange}
                            onPhoneChange={handlePhoneChange}
                            onSubmit={handleSubmit}
                            t={t}
                        />
                    </div>
                </div>
            </div>

        </motion.div>
    );
};

export default BookPage;