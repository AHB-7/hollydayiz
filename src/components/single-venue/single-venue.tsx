import { useEffect, useState } from "react";
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
    FunctionsContainer,
    EditAndSaveBtn,
    BookingCard,
    BookingContainer,
} from "../../styles/index";
import { useApi } from "../../util/hooks/use-fetch";
import { SingleVenueType, VenueFormData } from "../../types/global";
import { baseUrl } from "../../util/global/variables";
import "react-calendar/dist/Calendar.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Booking, Stars, ProfileLink } from "../../components/index";
import { VenueBookingsButton } from "../../styles/venues/cards";
import { useUserPreferences } from "../../util/global/zustand-store";
import { BookingCardComponent } from "../profile/users-bookings/booking-card";
import { PostVenue } from "../profile/post-venue-ui/main";
export function SingleVenue() {
    const { venueId } = useParams();
    const { accessToken, setNavbarState, navbarState, name } =
        useUserPreferences();
    const verified = Boolean(accessToken);
    const toggleActiveState = () => setNavbarState(!navbarState);

    const [isEditing, setIsEditing] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const {
        data: venue,
        loading: venueLoading,
        error: venueError,
        request: fetchVenue,
    } = useApi<SingleVenueType>(
        `${baseUrl}/venues/${venueId}?_owner=true&_bookings=true`
    );

    const venueRequest = useApi(`${baseUrl}/venues`);

    useEffect(() => {
        fetchVenue("GET");
    }, [venueId]);

    const handleEditVenue = async (formData: VenueFormData) => {
        if (!venue) return;

        try {
            await venueRequest.request(
                "PUT",
                formData,
                { url: `${baseUrl}/venues/${venue.id}` },
                accessToken || undefined
            );
            setSuccessMessage("Venue updated successfully!");
            setIsEditing(false);
            fetchVenue("GET");
        } catch (err) {
            console.error("Error updating venue:", err);
        }
    };

    const handleDelete = async (venueId: string) => {
        if (!accessToken) {
            console.error("No access token found.");
            return;
        }

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this venue? This action cannot be undone."
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await venueRequest.request(
                "DELETE",
                undefined,
                { url: `${baseUrl}/venues/${venueId}` },
                accessToken
            );
            console.log("Venue deleted successfully.");
            window.location.href = `/holidaze/profiles/${name}`;
        } catch (err) {
            console.error("Error deleting venue:", err);
        }
    };

    const formatDate = (isoString: string) =>
        new Date(isoString).toLocaleString("en-US", {
            dateStyle: "medium",
        });

    const isPastDate = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const isVenueOwner = venue?.owner.name === name;

    if (venueLoading) return <p>Loading...</p>;
    if (venueError) return <p>Error: {venueError.message}</p>;

    return (
        <MainContainer>
            {isVenueOwner && (
                <>
                    <FunctionsContainer>
                        <div>
                            <div>
                                <p>Venue Owner</p>
                            </div>
                            <div>
                                {isEditing ? (
                                    <EditAndSaveBtn
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Cancel
                                    </EditAndSaveBtn>
                                ) : (
                                    <EditAndSaveBtn
                                        onClick={() => setIsEditing(true)}
                                    >
                                        Edit
                                    </EditAndSaveBtn>
                                )}
                                <EditAndSaveBtn
                                    btnColor="red"
                                    hoverColor="darkred"
                                    margin="0 0.5rem"
                                    onClick={() =>
                                        venueId && handleDelete(venueId)
                                    }
                                >
                                    Delete
                                </EditAndSaveBtn>
                            </div>
                        </div>
                    </FunctionsContainer>

                    {isEditing && venue && (
                        <PostVenue
                            mode="edit"
                            defaultValues={{
                                name: venue.name,
                                description: venue.description,
                                media: venue.media,
                                price: venue.price,
                                maxGuests: venue.maxGuests,
                                rating: venue.rating,
                                meta: venue.meta,
                                location: venue.location,
                            }}
                            onSubmit={handleEditVenue}
                            onClose={() => setIsEditing(false)}
                            loading={venueRequest.loading}
                            error={
                                venueRequest.error
                                    ? { message: venueRequest.error.message }
                                    : undefined
                            }
                            successMessage={successMessage || undefined}
                        />
                    )}
                </>
            )}
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
            {!isVenueOwner && (
                <>
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
                </>
            )}

            {isVenueOwner ? (
                venue?.bookings && venue.bookings.length > 0 ? (
                    <BookingContainer>
                        {venue.bookings.map((booking) => (
                            <BookingCard key={booking.id}>
                                <BookingCardComponent
                                    booking={{
                                        ...booking,
                                        venue: {
                                            ...venue,
                                            media: venue.media.length
                                                ? [venue.media[0]]
                                                : [],
                                        },
                                    }}
                                    profileOwner={false}
                                    handleDelete={() => {}}
                                    handleEdit={() => {}}
                                    formatDate={formatDate}
                                    isPastDate={isPastDate}
                                />
                            </BookingCard>
                        ))}
                    </BookingContainer>
                ) : (
                    <PriceAndDate>
                        <h3>No booking has been placed yet</h3>
                    </PriceAndDate>
                )
            ) : null}
        </MainContainer>
    );
}
