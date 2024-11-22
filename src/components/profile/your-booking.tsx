import { useEffect } from "react";
import { useApi } from "../../util/hooks/use-fetch";
import { baseUrl } from "../../util/global/variables";
import { Link } from "react-router-dom";
import { useBookingStore } from "../../util/global/arry-id";

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

    return user?.map((booking) => (
        <div key={booking.id}>
            <h2>Venue: {booking.venue.name}</h2>
            <img src={booking.venue.media[0].url} alt="" />
            <Link to={`/holidaze/venues/${booking.venue.id}`}>View Venue</Link>
            <button
                onClick={() => {
                    handleDelete(booking.id);
                }}
            >
                Cancel Booking
            </button>

            <h3>Date From: {booking.dateFrom}</h3>
            <h3>Date To: {booking.dateTo}</h3>
            <h3>Guests: {booking.guests}</h3>
            <h3>Created: {booking.created}</h3>
            <h3>Updated: {booking.updated}</h3>
        </div>
    ));
}
