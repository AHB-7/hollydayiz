import { useEffect } from "react";
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
} from "../../styles/index";

type UserBookingTypes = {
    id: string;
    dateFrom: string;
    dateTo: string;
    guests: number;
    created: string;
    updated: string;
    venue: {
        id: string;
        name: string;
        description: string;
        media: [
            {
                id: string;
                url: string;
            }
        ];
    };
};

export function UserBooking() {
    const apiToken = localStorage.getItem("accessToken");
    const userProfileName = localStorage.getItem("otherUsersName");
    const { setBookingIds } = useBookingStore();

    const {
        data: user,
        loading,
        error,
        request: apiRequest,
    } = useApi<UserBookingTypes[]>(
        `${baseUrl}/profiles/${userProfileName}/bookings?_venue=true`
    );

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

    const deleteRequest = useApi(`${baseUrl}/bookings`);
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

                if (user) {
                    const updatedIds = user.map((booking) => booking.id);
                    setBookingIds(updatedIds);
                }
            } catch (err) {
                console.error("Error deleting booking:", err);
            }
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    const formatDate = (isoString: string) => {
        if (!isoString) return "Unknown Date";
        return new Date(isoString).toLocaleString("en-US", {
            dateStyle: "medium",
        });
    };
    return (
        <BookingContainer>
            {user?.map((booking) => (
                <BookingCard key={booking.id}>
                    <CardInfo>
                        <BookingCardImage
                            src={booking.venue.media[0].url}
                            alt=""
                        />
                        <div>
                            <h2>{booking.venue.name}</h2>
                            <p>Created:{formatDate(booking?.updated)}</p>
                            <p>Date From:{formatDate(booking?.dateFrom)}</p>
                            <p>Date To:{formatDate(booking?.dateTo)}</p>
                            <BookingDelete
                                onClick={() => {
                                    handleDelete(booking.id);
                                }}
                            >
                                <MdDelete />
                            </BookingDelete>
                        </div>
                    </CardInfo>
                    <div>
                        <ViewVenue>
                            <GuestsNumber>
                                Gestes:{booking.guests}{" "}
                            </GuestsNumber>
                            <Link to={`/holidaze/venues/${booking.venue.id}`}>
                                View Venue
                            </Link>
                        </ViewVenue>
                    </div>
                </BookingCard>
            ))}
        </BookingContainer>
    );
}
