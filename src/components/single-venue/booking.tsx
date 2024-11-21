import { useRef, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
    BookingInfo,
    ContainerForCalendar,
    GuestNumber,
    GuestNumberContainer,
    Loging,
    PriceAndDate,
    StateMessage,
    StyledCalendar,
} from "../../styles/single-venue/booking";
import { VenueBookingsButton } from "../../styles/venues/cards";
import { Error, SuccessMessage } from "../../styles/auth/auth";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { useApi } from "../../util/hooks/use-fetch";
import { baseUrl } from "../../util/global/variables";
import { calculateDays } from "../../util/global/calculater";
import { BookingProps } from "../../types/global";

export function Booking({ maxGuests, price, venueData }: BookingProps) {
    const { venueId } = useParams<{ venueId: string }>();
    const apiToken = localStorage.getItem("accessToken");
    const userName = localStorage.getItem("name");

    const messageRef = useRef<HTMLDivElement>(null);

    const [dateRange, setDateRange] = useState<[Date, Date] | null>(null);
    const [guests, setGuests] = useState(1);
    const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);
    const [formError, setFormError] = useState<string | null>(null);

    const {
        data: bookingResponse,
        loading: bookingLoading,
        error: bookingError,
        request: createBooking,
    } = useApi(`${baseUrl}/bookings`);

    useEffect(() => {
        if (bookingResponse || bookingError) {
            messageRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [bookingResponse, bookingError]);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!dateRange) {
            setFormError("Please select a date to book.");
            return;
        }

        setFormError(null);

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

    const isDateUnavailable = (date: Date): boolean => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return (
            unavailableDates.some(
                (unavailableDate) =>
                    unavailableDate.toDateString() === date.toDateString()
            ) || date < today
        );
    };

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
                                tileClassName={getTileClassName}
                            />
                        </label>
                    </div>
                    {formError && (
                        <StateMessage>
                            <Error>{formError}</Error>
                        </StateMessage>
                    )}
                    <BookingInfo>
                        <PriceAndDate>
                            <p>
                                Days:
                                <strong>{calculateDays(dateRange)}</strong>
                            </p>
                            <p>
                                Price:
                                <strong>
                                    {dateRange
                                        ? `$${
                                              calculateDays(dateRange) *
                                              (price ?? 0)
                                          }`
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
                        <Loging>
                            <VenueBookingsButton
                                type="submit"
                                disabled={bookingLoading}
                            >
                                {bookingLoading ? "Booking..." : "Book Now"}
                            </VenueBookingsButton>
                        </Loging>
                    </BookingInfo>
                </form>
                <div ref={messageRef}>
                    {bookingResponse && (
                        <StateMessage>
                            <SuccessMessage>
                                <h3>
                                    Your booking has been placed successfully!
                                </h3>
                                <IoCheckmarkDoneCircleSharp
                                    fill="green"
                                    fontSize="4rem"
                                />
                                <VenueBookingsButton
                                    as={Link}
                                    to={`/holidaze/profiles/${userName}`}
                                >
                                    View your bookings history
                                </VenueBookingsButton>
                            </SuccessMessage>
                        </StateMessage>
                    )}
                    {bookingError && (
                        <StateMessage>
                            <Error>{bookingError.message}</Error>
                        </StateMessage>
                    )}
                </div>
            </ContainerForCalendar>
        </>
    );
}
