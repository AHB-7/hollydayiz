import { useApi } from "../../util/hooks/use-fetch";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../util/global/variables";
import {
    ContainerForCalendar,
    GuestNumber,
    PriceAndDate,
    StyledCalendar,
} from "../../styles/single-venue/booking";

type BookingProps = {
    maxGuests?: number | undefined;
    price?: number | undefined;
};

export function Booking({ maxGuests, price }: BookingProps) {
    const { venueId } = useParams();
    const apiToken = localStorage.getItem("accessToken");

    const {
        data: bookingResponse,
        loading: bookingLoading,
        error: bookingError,
        request: createBooking,
    } = useApi(`${baseUrl}/bookings`);

    const {
        data: venueData,
        loading: venueLoading,
        error: venueError,
        request: fetchVenue,
    } = useApi(`${baseUrl}/venues/${venueId}?_bookings=true`);

    const [dateRange, setDateRange] = useState<[Date, Date] | null>(null);
    const [guests, setGuests] = useState(1);
    const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);

    useEffect(() => {
        fetchVenue("GET");
    }, [venueId]);

    useEffect(() => {
        if (venueData?.bookings) {
            const dates: Date[] = [];
            venueData.bookings.forEach(
                (booking: { dateFrom: string; dateTo: string }) => {
                    const start = new Date(booking.dateFrom);
                    const end = new Date(booking.dateTo);
                    let currentDate = start;
                    while (currentDate <= end) {
                        dates.push(new Date(currentDate));
                        currentDate.setDate(currentDate.getDate() + 1);
                    }
                }
            );
            setUnavailableDates(dates);
        }
    }, [venueData]);

    const calculateDays = (range: [Date, Date] | null) => {
        if (!range) return 0;
        const [start, end] = range;
        const difference = Math.abs(end.getTime() - start.getTime());
        return Math.ceil(difference / (1000 * 60 * 60 * 24));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!dateRange) {
            alert("Please select a date range.");
            return;
        }

        const [dateFrom, dateTo] = dateRange;

        await createBooking(
            "POST",
            {
                dateFrom: dateFrom.toISOString(),
                dateTo: dateTo.toISOString(),
                guests,
                venueId,
            },
            {},
            apiToken || ""
        );
    };

    const tileDisabled = ({ date }: { date: Date }) => {
        return unavailableDates.some(
            (unavailableDate) =>
                unavailableDate.toDateString() === date.toDateString()
        );
    };

    const tileClassName = ({ date }: { date: Date }) => {
        if (
            unavailableDates.some(
                (unavailableDate) =>
                    unavailableDate.toDateString() === date.toDateString()
            )
        ) {
            return "unavailable";
        }
        return null;
    };

    return (
        <>
            {venueLoading && <p>Loading venue...</p>}
            {venueError && <p>Error: {venueError.message}</p>}
            <ContainerForCalendar>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Select Dates:
                            <StyledCalendar
                                selectRange
                                onChange={(range: any) =>
                                    setDateRange(range as [Date, Date])
                                }
                                value={dateRange}
                                tileDisabled={tileDisabled}
                                tileClassName={tileClassName}
                            />
                        </label>
                    </div>
                    <div>
                     
                        {dateRange ? (
                            <PriceAndDate>
                                <p>
                                    Days:{" "}
                                    <strong>{calculateDays(dateRange)}</strong>
                                </p>

                                <p>
                                    Price: <strong>${price}</strong>
                                </p>
                            </PriceAndDate>
                        ) : (
                            <PriceAndDate>
                                <p>
                                    Days:{" "}
                                    <strong>{calculateDays(dateRange)}</strong>
                                </p>

                                <p>Price: select dates to calculate</p>
                            </PriceAndDate>
                        )}
                        <div>
                            <label>
                                Guests:
                                <GuestNumber
                                    type="number"
                                    min="1"
                                    max={maxGuests}
                                    value={guests}
                                    onChange={(e) =>
                                        setGuests(Number(e.target.value))
                                    }
                                    required
                                />
                            </label>
                        </div>
                        <button type="submit" disabled={bookingLoading}>
                            {bookingLoading ? "Booking..." : "Book Now"}
                        </button>
                    </div>
                </form>
            </ContainerForCalendar>
            {bookingResponse && (
                <div>
                    <h3>Booking Details</h3>
                    <p>Booking ID: {bookingResponse.id}</p>
                    <p>Date From: {bookingResponse.dateFrom}</p>
                    <p>Date To: {bookingResponse.dateTo}</p>
                    <p>Guests: {bookingResponse.guests}</p>
                </div>
            )}
            {bookingError && (
                <p style={{ color: "red" }}>{bookingError.message}</p>
            )}
        </>
    );
}
