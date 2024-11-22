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
    VenueBookingsButton,
    Error,
    SuccessMessage,
    IoCheckmarkDoneCircleSharp,
} from "../../styles/index";
import { useApi } from "../../util/hooks/use-fetch";
import { baseUrl } from "../../util/global/variables";
import { calculateDays } from "../../util/global/calculator";
import { BookingProps } from "../../types/global";

export function Booking({ maxGuests, price, venueData }: BookingProps) {
    const { venueId } = useParams<{ venueId: string }>();
    const name = localStorage.getItem("name");
    const apiToken = localStorage.getItem("accessToken");
    const messageRef = useRef<HTMLDivElement>(null);
    const [dateRange, setDateRange] = useState<[Date, Date] | null>(null);
    const [guests, setGuests] = useState(1);
    const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);
    const [formError, setFormError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [bookingId, setBookingId] = useState<string | null>(null);

    // Separate hooks for creating and updating bookings
    const createBooking = useApi(`${baseUrl}/bookings`);
    const updateBooking = useApi("");

    useEffect(() => {
        if (
            createBooking.data ||
            createBooking.error ||
            updateBooking.data ||
            updateBooking.error
        ) {
            messageRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [
        createBooking.data,
        createBooking.error,
        updateBooking.data,
        updateBooking.error,
    ]);

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

        const requestBody = {
            dateFrom: dateFrom.toISOString(),
            dateTo: dateTo.toISOString(),
            guests,
            venueId: !isEditing ? venueId : undefined,
        };

        try {
            if (isEditing && bookingId) {
                // Update Booking
                await updateBooking.request(
                    "PUT",
                    requestBody,
                    { url: `${baseUrl}/bookings/${bookingId}` },
                    apiToken || ""
                );
            } else {
                // Create Booking
                await createBooking.request(
                    "POST",
                    requestBody,
                    undefined,
                    apiToken || ""
                );
            }

            setIsEditing(false);
            setBookingId(null);
        } catch (err) {
            console.error("Error submitting booking:", err);
        }
    };

    const handleEdit = (booking: {
        id: string;
        dateFrom: string;
        dateTo: string;
        guests: number;
    }) => {
        setDateRange([new Date(booking.dateFrom), new Date(booking.dateTo)]);
        setGuests(booking.guests);
        setBookingId(booking.id);
        setIsEditing(true);
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
                            <p>
                                {isEditing
                                    ? "Edit your booking:"
                                    : "Start your booking by selecting dates:"}
                            </p>
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
                                disabled={
                                    createBooking.loading ||
                                    updateBooking.loading
                                }
                            >
                                {createBooking.loading || updateBooking.loading
                                    ? isEditing
                                        ? "Updating..."
                                        : "Booking..."
                                    : isEditing
                                    ? "Update Booking"
                                    : "Book Now"}
                            </VenueBookingsButton>
                        </Loging>
                    </BookingInfo>
                </form>
                <div ref={messageRef}>
                    {(createBooking.data || updateBooking.data) && (
                        <StateMessage>
                            <SuccessMessage>
                                <h3>
                                    {isEditing
                                        ? "Your booking has been updated successfully!"
                                        : "Your booking has been placed successfully!"}
                                </h3>
                                <IoCheckmarkDoneCircleSharp
                                    fill="green"
                                    fontSize="4rem"
                                />
                                <VenueBookingsButton
                                    as={Link}
                                    to={`/holidaze/profiles/${name}`}
                                >
                                    View your bookings history
                                </VenueBookingsButton>
                            </SuccessMessage>
                        </StateMessage>
                    )}
                    {(createBooking.error || updateBooking.error) && (
                        <StateMessage>
                            <Error>
                                {createBooking.error?.message ||
                                    updateBooking.error?.message}
                            </Error>
                        </StateMessage>
                    )}
                </div>
            </ContainerForCalendar>
            {venueData?.bookings.map((booking) => (
                <div key={booking.id}>
                    <p>Booking ID: {booking.id}</p>
                    <button onClick={() => handleEdit(booking)}>
                        Edit This Booking
                    </button>
                </div>
            ))}
        </>
    );
}
