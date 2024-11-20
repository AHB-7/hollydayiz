import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../../util/hooks/use-fetch";
import { SingleVenue as SingleVenueTypes } from "../../types/global";
import { baseUrl } from "../../util/global/variables";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
    CarouselComponent,
    Row,
    MainContainer,
    VenueDescription,
    VenueInfo,
    VenueTitle,
    VenuePrice,
    MetaInfo,
} from "../../styles/single-venue/single-venue-styles";
import { OwnerNameImg, VenueInfoContainer } from "../../styles/venues/cards";

export function SingleVenue() {
    const { venueId } = useParams();
    const apiToken = localStorage.getItem("accessToken");

    const {
        data: venue,
        loading: venueLoading,
        error: venueError,
        request: fetchVenue,
    } = useApi<SingleVenueTypes>(
        `${baseUrl}/venues/${venueId}?_owner=true&_bookings=true`
    );

    const {
        data: bookingResponse,
        loading: bookingLoading,
        error: bookingError,
        request: createBooking,
    } = useApi(`${baseUrl}/bookings`);

    const [formData, setFormData] = useState({
        dateFrom: "",
        dateTo: "",
        guests: 1,
    });

    useEffect(() => {
        fetchVenue("GET");
    }, [venueId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await createBooking(
            "POST",
            {
                ...formData,
                venueId,
            },
            {},
            apiToken || ""
        );
    };

    if (venueLoading) return <p>Loading...</p>;
    if (venueError) return <p>Error: {venueError.message}</p>;

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <MainContainer>
            <Row>
                <OwnerNameImg>
                    <img
                        src={venue?.owner.avatar.url}
                        alt={venue?.owner.avatar.alt}
                    />
                    <h2>{venue?.owner.name}</h2>
                </OwnerNameImg>
            </Row>
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
            <Row>
                <VenuePrice>
                    <strong>Price:</strong>
                </VenuePrice>
                <VenuePrice>
                    <strong>${venue?.price}</strong>
                </VenuePrice>
            </Row>
            <VenueInfo>
                <VenueTitle>{venue?.name}</VenueTitle>
                <VenueDescription>{venue?.description}</VenueDescription>
            </VenueInfo>
            <MetaInfo>
                {venue?.meta?.wifi && (
                    <p>
                        <strong>Wifi:</strong> Available
                    </p>
                )}
                {venue?.meta?.pets && (
                    <p>
                        <strong>Kitchen:</strong> Available
                    </p>
                )}
                {venue?.meta?.parking && (
                    <p>
                        <strong>Parking:</strong> Available
                    </p>
                )}
                {venue?.meta?.breakfast && (
                    <p>
                        <strong>Pool:</strong> Available
                    </p>
                )}
                {venue?.meta?.parking && (
                    <p>
                        <strong>TV:</strong> Available
                    </p>
                )}
            </MetaInfo>
            {/* Booking Form */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Date From:
                        <input
                            type="date"
                            name="dateFrom"
                            value={formData.dateFrom}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Date To:
                        <input
                            type="date"
                            name="dateTo"
                            value={formData.dateTo}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Guests:
                        <input
                            type="number"
                            name="guests"
                            min="1"
                            max={venue?.maxGuests}
                            value={formData.guests}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                </div>
                <button type="submit" disabled={bookingLoading}>
                    {bookingLoading ? "Booking..." : "Book Now"}
                </button>
            </form>

            {/* Booking Response */}
            {bookingResponse && (
                <div>
                    <h3>Booking Details</h3>
                    <p>Booking ID: {bookingResponse.id}</p>
                    <p>Date From: {bookingResponse.dateFrom}</p>
                    <p>Date To: {bookingResponse.dateTo}</p>
                    <p>Guests: {bookingResponse.guests}</p>
                </div>
            )}

            {/* Booking Error */}
            {bookingError && (
                <p style={{ color: "red" }}>{bookingError.message}</p>
            )}
        </MainContainer>
    );
}
