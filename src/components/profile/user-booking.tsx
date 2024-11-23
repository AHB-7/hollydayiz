import { useEffect, useState } from "react";
import { useApi } from "../../util/hooks/use-fetch";
import { baseUrl } from "../../util/global/variables";
import { Link } from "react-router-dom";
import { useBookingStore } from "../../util/global/arry-id";
import {
    BookingCard,
    BookingCardImage,
    BookingContainer,
    BookingDelete,
    CardInfo,
    GuestsNumber,
    MdDelete,
    ViewVenue,
    StyledCalendar,
    EditContainer,
} from "../../styles/index";
import { UserBookingTypes } from "../../types/global";

export function UserBooking() {
    const apiToken = localStorage.getItem("accessToken");
    const userProfileName = localStorage.getItem("otherUsersName");
    const { setBookingIds } = useBookingStore();

    const [editingBooking, setEditingBooking] =
        useState<UserBookingTypes | null>(null);
    const [editDateRange, setEditDateRange] = useState<[Date, Date] | null>(
        null
    );
    const [editGuests, setEditGuests] = useState<number>(1);

    const {
        data: user,
        loading,
        error,
        request: apiRequest,
    } = useApi<UserBookingTypes[]>(
        `${baseUrl}/profiles/${userProfileName}/bookings?_venue=true`
    );

    const deleteRequest = useApi(`${baseUrl}/bookings`);
    const updateRequest = useApi(`${baseUrl}/bookings`);

    useEffect(() => {
        const fetchData = async () => {
            if (apiToken) {
                await apiRequest("GET", undefined, undefined, apiToken);
            }
        };
        fetchData();
    }, [apiToken]);

    useEffect(() => {
        if (user) {
            const ids = user.map((booking) => booking.id);
            setBookingIds(ids);
        }
    }, [user, setBookingIds]);

    const handleDelete = async (bookingId: string) => {
        if (apiToken) {
            try {
                await deleteRequest.request(
                    "DELETE",
                    undefined,
                    {
                        url: `${baseUrl}/bookings/${bookingId}`,
                    },
                    apiToken
                );
                await apiRequest("GET", undefined, undefined, apiToken);
            } catch (err) {
                console.error("Error deleting booking:", err);
            }
        }
    };

    const handleEdit = (booking: UserBookingTypes) => {
        setEditingBooking(booking);
        setEditDateRange([
            new Date(booking.dateFrom),
            new Date(booking.dateTo),
        ]);
        setEditGuests(booking.guests); // Set the current guest count for editing
    };

    const handleSaveChanges = async () => {
        if (editingBooking && editDateRange && apiToken) {
            const [dateFrom, dateTo] = editDateRange;

            const updatedBooking = {
                dateFrom: dateFrom.toISOString(),
                dateTo: dateTo.toISOString(),
                guests: editGuests, // Updated guest count
            };

            try {
                await updateRequest.request(
                    "PUT",
                    updatedBooking,
                    {
                        url: `${baseUrl}/bookings/${editingBooking.id}`,
                    },
                    apiToken
                );
                setEditingBooking(null);
                await apiRequest("GET", undefined, undefined, apiToken); // Refresh bookings
            } catch (err) {
                console.error("Error updating booking:", err);
            }
        }
    };

    const handleCancelEdit = () => {
        setEditingBooking(null);
        setEditDateRange(null);
        setEditGuests(1);
    };

    const formatDate = (isoString: string) => {
        if (!isoString) return "Unknown Date";
        return new Date(isoString).toLocaleString("en-US", {
            dateStyle: "medium",
        });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <BookingContainer>
            {user?.map((booking) => (
                <BookingCard key={booking.id}>
                    <CardInfo>
                        <Link to={`/holidaze/venues/${booking.venue.id}`}>
                            <BookingCardImage
                                src={booking.venue.media[0]?.url || ""}
                                alt={booking.venue.name || "Venue Image"}
                            />{" "}
                        </Link>
                        <div>
                            <h2>{booking.venue.name}</h2>
                            <p>Created: {formatDate(booking.created)}</p>
                            <p>Date From: {formatDate(booking.dateFrom)}</p>
                            <p>Date To: {formatDate(booking.dateTo)}</p>
                            <BookingDelete
                                onClick={() => handleDelete(booking.id)}
                            >
                                <MdDelete />
                            </BookingDelete>
                            <ViewVenue>
                                <GuestsNumber>
                                    Guests: {booking.guests}
                                </GuestsNumber>
                                <a onClick={() => handleEdit(booking)}>Edit</a>
                            </ViewVenue>
                        </div>
                    </CardInfo>
                    {editingBooking?.id === booking.id && (
                        <div>
                            <h3>Edit Booking Details</h3>
                            <StyledCalendar
                                selectRange
                                onChange={(range) =>
                                    setEditDateRange(range as [Date, Date])
                                }
                                value={editDateRange}
                            />
                            <div>
                                <label>
                                    Guests:
                                    <select
                                        value={editGuests}
                                        onChange={(e) =>
                                            setEditGuests(
                                                Number(e.target.value)
                                            )
                                        }
                                    >
                                        {Array.from(
                                            { length: booking.guests },
                                            (_, i) => i + 1
                                        ).map((guest) => (
                                            <option key={guest} value={guest}>
                                                {guest}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                            <EditContainer>
                                <span onClick={handleCancelEdit}>Cancel</span>
                                <p onClick={handleSaveChanges}>Save Changes</p>
                            </EditContainer>
                        </div>
                    )}
                </BookingCard>
            ))}
        </BookingContainer>
    );
}
