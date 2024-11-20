import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../../util/hooks/use-fetch";
import { SingleVenue as SingleVenueTypes } from "../../types/global";
import { baseUrl } from "../../util/global/variables";
import CustomPaging from "./custtom-paging";

export function SingleVenue() {
    const { venueId } = useParams();
    const {
        data: venue,
        loading,
        error,
        request,
    } = useApi<SingleVenueTypes>(
        `${baseUrl}/venues/${venueId}?_owner=true&_bookings=true`
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

            {venue?.media?.length ? (
                <CustomPaging media={venue.media} />
            ) : (
                <p>No media available.</p>
            )}

            <p>
                <strong>Price:</strong> ${venue?.price}
            </p>
            <p>
                <strong>Max Guests:</strong> {venue?.maxGuests}
            </p>
            <p>
                <strong>Rating:</strong>{" "}
                {venue?.rating || "No rating available"}
            </p>
            <p>
                <strong>Created:</strong>{" "}
                {venue?.created
                    ? new Date(venue.created).toLocaleDateString()
                    : "Not available"}
            </p>
            <p>
                <strong>Updated:</strong>{" "}
                {venue?.updated
                    ? new Date(venue.updated).toLocaleDateString()
                    : "Not available"}
            </p>
            <div>
                <h2>Meta</h2>
                <pre>{JSON.stringify(venue?.meta, null, 2)}</pre>
            </div>
            <div>
                <h2>Location</h2>
                <p>
                    <strong>Address:</strong>{" "}
                    {venue?.location?.address || "Not provided"}
                </p>
                <p>
                    <strong>City:</strong>{" "}
                    {venue?.location?.city || "Not provided"}
                </p>
                <p>
                    <strong>Country:</strong>{" "}
                    {venue?.location?.country || "Not provided"}
                </p>
                <p>
                    <strong>Zip Code:</strong>{" "}
                    {venue?.location?.zip || "Not provided"}
                </p>
            </div>
        </div>
    );
}
