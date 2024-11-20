import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../../util/hooks/use-fetch";
import { SingleVenue as SingleVenueTypes } from "../../types/global";

export function SingleVenue() {
    const { venueId } = useParams();
    const {
        data: venue,
        loading,
        error,
        request,
    } = useApi<SingleVenueTypes>(
        `https://v2.api.noroff.dev/holidaze/venues/${venueId}?_owner=true&_bookings=true`
    );

    useEffect(() => {
        request("GET");
    }, [venueId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>{venue?.name}</h1>
            <p>{venue?.description}</p>
        </div>
    );
}
