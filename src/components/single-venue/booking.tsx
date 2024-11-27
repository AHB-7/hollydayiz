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
    VenueBookingsButton,
    Error,
    SuccessMessage,
    IoCheckmarkDoneCircleSharp,
} from "../../styles/index";
import { useApi } from "../../util/hooks/use-fetch";
import { baseUrl } from "../../util/global/variables";
import { calculateDays } from "../../util/global/calculator";
import { BookingProps } from "../../types/global";
import CalendarComponent from "../global/calender";
import ConfirmationModal from "../global/confirmation";

export function Booking({ maxGuests, price, venueData }: BookingProps) {
    const { venueId } = useParams<{ venueId: string }>();
    const name = localStorage.getItem("name");
    const apiToken = localStorage.getItem("accessToken");
    const messageRef = useRef<HTMLDivElement>(null);
    const [dateRange, setDateRange] = useState<[Date, Date] | null>(null);
    const [guests, setGuests] = useState(1);
    const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);
    const [formError, setFormError] = useState<string | null>(null);
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [bookingData, setBookingData] = useState<null | {
        dateFrom: string;
        dateTo: string;
        guests: number;
        venueId: string;
    }>(null);

    const createBooking = useApi(`${baseUrl}/bookings`);

    useEffect(() => {
        if (createBooking.data || createBooking.error) {
            messageRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [createBooking.data, createBooking.error]);

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

    const handleSubmit = (e: React.FormEvent) => {
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
            venueId: venueId ?? "",
        };

        setBookingData(requestBody);
        setConfirmationOpen(true);
    };

    const confirmBooking = async () => {
        if (!bookingData) return;

        try {
            await createBooking.request(
                "POST",
                bookingData,
                undefined,
                apiToken || ""
            );
            setConfirmationOpen(false);
        } catch (err) {
            console.error(err);
        }
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
        <ContainerForCalendar>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        <p>Start your booking by selecting dates:</p>
                        <CalendarComponent
                            dateRange={dateRange}
                            setDateRange={setDateRange}
                            isDateUnavailable={isDateUnavailable}
                            getTileClassName={getTileClassName}
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
                            onChange={(e) => setGuests(Number(e.target.value))}
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
                            disabled={createBooking.loading}
                        >
                            {createBooking.loading ? "Booking..." : "Book Now"}
                        </VenueBookingsButton>
                    </Loging>
                </BookingInfo>
            </form>
            <ConfirmationModal
                isOpen={confirmationOpen}
                message="Are you sure you want to confirm this booking?"
                onConfirm={confirmBooking}
                onCancel={() => setConfirmationOpen(false)}
            />
            <div ref={messageRef}>
                {createBooking.data && (
                    <StateMessage>
                        <SuccessMessage>
                            <h3>Your booking has been placed successfully!</h3>
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
                {createBooking.error && (
                    <StateMessage>
                        <Error>{createBooking.error.message}</Error>
                    </StateMessage>
                )}
            </div>
        </ContainerForCalendar>
    );
}
