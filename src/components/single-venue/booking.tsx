import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    BookingInfo,
    ContainerForCalendar,
    GuestNumber,
    GuestNumberContainer,
    PriceAndDate,
    StyledCalendar,
} from "../../styles/single-venue/booking";
import { VenueBookingsButton } from "../../styles/venues/cards";
import { Error, SuccessMessage } from "../../styles/auth/auth";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { useApi } from "../../util/hooks/use-fetch";
import { baseUrl } from "../../util/global/variables";

type BookingProps = {
    maxGuests: number | undefined;
    price: number | undefined;
    venueData: {
        bookings: { dateFrom: string; dateTo: string }[];
    } | null;
};

export function Booking({ maxGuests, price, venueData }: BookingProps) {
    const { venueId } = useParams<{ venueId: string }>();
    const apiToken = localStorage.getItem("accessToken");

    const {
        data: bookingResponse,
        loading: bookingLoading,
        error: bookingError,
        request: createBooking,
    } = useApi(`${baseUrl}/bookings`);

    const [dateRange, setDateRange] = useState<[Date, Date] | null>(null);
    const [guests, setGuests] = useState(1);
    const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);

    // Generate unavailable dates from the provided venueData
    useEffect(() => {
        if (venueData?.bookings) {
            const bookedDates = venueData.bookings.flatMap(
                ({ dateFrom, dateTo }) => {
                    const start = new Date(dateFrom);
                    const end = new Date(dateTo);
                    const dates = [];
                    for (
                        let d = new Date(start);
                        d <= end;
                        d.setDate(d.getDate() + 1)
                    ) {
                        dates.push(new Date(d));
                    }
                    return dates;
                }
            );
            setUnavailableDates(bookedDates);
        }
    }, [venueData]);

    const calculateDays = (range: [Date, Date] | null): number =>
        range
            ? Math.ceil(
                  (range[1].getTime() - range[0].getTime()) /
                      (1000 * 60 * 60 * 24)
              )
            : 0;

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

    const isDateUnavailable = (date: Date): boolean =>
        unavailableDates.some(
            (unavailableDate) =>
                unavailableDate.toDateString() === date.toDateString()
        );

    const getTileClassName = ({ date }: { date: Date }) =>
        isDateUnavailable(date) ? "unavailable" : "";

    return (
        <>
            <ContainerForCalendar>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            <p>Start your booking by selecting dates:</p>
                            <StyledCalendar
                                selectRange
                                onChange={(range) =>
                                    setDateRange(range as [Date, Date])
                                }
                                value={dateRange}
                                tileDisabled={({ date }) =>
                                    isDateUnavailable(date)
                                }
                                tileClassName={getTileClassName} // Apply the unavailable class
                            />
                        </label>
                    </div>
                    <BookingInfo>
                        <PriceAndDate>
                            <p>
                                Days:{" "}
                                <strong>{calculateDays(dateRange)}</strong>
                            </p>
                            <p>
                                Price:{" "}
                                <strong>
                                    {dateRange
                                        ? `${calculateDays(dateRange) * (price ?? 0)}`
                                        : "Select dates"}
                                </strong>
                            </p>
                        </PriceAndDate>
                        <GuestNumberContainer>
                            <p>Guests:</p>
                            <GuestNumber
                                as="select"
                                value={guests}
                                onChange={(e) =>
                                    setGuests(Number(e.target.value))
                                }
                                required
                            >
                                {Array.from(
                                    { length: maxGuests ?? 0 },
                                    (_, i) => i + 1
                                ).map((guest) => (
                                    <option key={guest} value={guest}>
                                        {guest}
                                    </option>
                                ))}
                            </GuestNumber>
                        </GuestNumberContainer>
                        <VenueBookingsButton
                            type="submit"
                            disabled={bookingLoading}
                        >
                            {bookingLoading ? "Booking..." : "Book Now"}
                        </VenueBookingsButton>
                    </BookingInfo>
                </form>
                {bookingResponse && (
                    <SuccessMessage>
                        <h3>Your booking has been placed successfully!</h3>
                        <IoCheckmarkDoneCircleSharp
                            fill="green"
                            fontSize="4rem"
                        />
                    </SuccessMessage>
                )}
                {bookingError && <Error>{bookingError.message}</Error>}
            </ContainerForCalendar>
        </>
    );
}
