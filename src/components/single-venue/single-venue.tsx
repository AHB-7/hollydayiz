import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    CarouselComponent,
    Row,
    MainContainer,
    VenueDescription,
    VenueInfo,
    VenueTitle,
    VenuePrice,
    MetaInfo,
    MetaInfoItem,
    MetaTitle,
    RatingContainer,
    Loging,
    PriceAndDate,
    FaWifi,
    GrLocation,
    MdLocalParking,
    MdOutlineEmojiFoodBeverage,
    MdOutlinePets,
} from "../../styles/index";
import { useApi } from "../../util/hooks/use-fetch";
import { SingleVenueType } from "../../types/global";
import { baseUrl } from "../../util/global/variables";
import "react-calendar/dist/Calendar.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Booking, Stars, ProfileLink } from "../../components/index";
import { VenueBookingsButton } from "../../styles/venues/cards";
import { useUserPreferences } from "../../util/global/zustand-store";

export function SingleVenue() {
    const { venueId } = useParams();
    const { accessToken, setNavbarState, navbarState } = useUserPreferences();
    const verified = Boolean(accessToken);
    const toggleActiveState = () => {
        setNavbarState(!navbarState);
    };
    const {
        data: venue,
        loading: venueLoading,
        error: venueError,
        request: fetchVenue,
    } = useApi<SingleVenueType>(
        `${baseUrl}/venues/${venueId}?_owner=true&_bookings=true`
    );

    useEffect(() => {
        fetchVenue("GET");
    }, [venueId]);

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
                <RatingContainer>
                    <Stars rating={venue?.rating ?? 0} />
                </RatingContainer>
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
            <MetaTitle>
                <h3>This services are included in the price: </h3>
            </MetaTitle>
            <MetaInfo>
                {venue?.meta?.wifi && (
                    <MetaInfoItem>
                        <FaWifi />
                        <span>Wifi included</span>
                    </MetaInfoItem>
                )}
                {venue?.meta?.breakfast && (
                    <MetaInfoItem>
                        <MdOutlineEmojiFoodBeverage />
                        <span>Breakfast included</span>
                    </MetaInfoItem>
                )}
                {venue?.meta?.parking && (
                    <MetaInfoItem>
                        <MdLocalParking />
                        <span>Parking included</span>
                    </MetaInfoItem>
                )}

                {venue?.meta?.pets && (
                    <MetaInfoItem>
                        <MdOutlinePets />
                        <span>Pets allowed</span>
                    </MetaInfoItem>
                )}
            </MetaInfo>
            <Row>
                <ProfileLink
                    name={venue?.owner.name ?? null}
                    url={venue?.owner.avatar.url ?? null}
                    alt={venue?.owner.avatar.alt ?? null}
                />
                <div>
                    <GrLocation />
                    <p>
                        {venue?.location.address}, {venue?.location.city},{" "}
                        {venue?.location.zip}, {venue?.location.country}
                    </p>
                </div>
            </Row>
            <PriceAndDate>
                <h3>
                    Max Guests <strong>{venue?.maxGuests}</strong>
                </h3>
            </PriceAndDate>

            {verified ? (
                <Booking
                    maxGuests={venue?.maxGuests}
                    price={venue?.price}
                    venueData={venue}
                />
            ) : (
                <Loging>
                    <VenueBookingsButton onClick={toggleActiveState}>
                        Log in to book
                    </VenueBookingsButton>
                </Loging>
            )}
        </MainContainer>
    );
}
