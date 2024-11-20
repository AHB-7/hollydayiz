import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../../util/hooks/use-fetch";
import { SingleVenue as SingleVenueTypes } from "../../types/global";
import { baseUrl } from "../../util/global/variables";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
    CarouselComponent,
    FirstRow,
    MainContainer,
    VenueDescription,
    VenueInfo,
    VenueTitle,
} from "../../styles/single-venue/single-venue-styles";

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

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <MainContainer>
            <CarouselComponent>
                {venue?.media && venue.media.length > 0 ? (
                    <Slider {...sliderSettings}>
                        {venue.media.map((image, index) => (
                            <div key={index}>
                                <img
                                    src={image.url}
                                    alt={`Venue image ${index + 1}`}
                                />
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <p>No images available</p>
                )}
            </CarouselComponent>
            <VenueInfo>
                <VenueTitle>{venue?.name}</VenueTitle>
                <VenueDescription>{venue?.description}</VenueDescription>
            </VenueInfo>
            <FirstRow></FirstRow>
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
        </MainContainer>
    );
}
