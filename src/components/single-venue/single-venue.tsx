import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
    Error,
} from "../../styles/index";
import { useApi } from "../../util/hooks/use-fetch";
import { SingleVenueType, VenueFormData } from "../../types/global";
import { baseUrl } from "../../util/global/variables";
import "react-calendar/dist/Calendar.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Booking, Stars } from "../../components/index";
import { ProfileLink } from "../../components/global/link-to-profiles";
import {
    VenueBookingsButton,
    VenueInfoContainer,
} from "../../styles/venues/cards";
import { useUserPreferences } from "../../util/global/zustand-store";
import { BookingCardComponent } from "../profile/users-bookings/booking-card";
import { PostVenue } from "../profile/post-venue-ui/main";
import { Loading } from "../global/loading";
import ConfirmationModal from "../global/confirmation";
import { Helmet } from "react-helmet-async";

export function SingleVenue() {
    const { venueId } = useParams();
    const navigate = useNavigate();
    const { accessToken, setNavbarState, navbarState, name } =
        useUserPreferences();
    const verified = Boolean(accessToken);

    const [isEditing, setIsEditing] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [editConfirmationOpen, setEditConfirmationOpen] = useState(false);
    const [pendingEditData, setPendingEditData] =
        useState<VenueFormData | null>(null);

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

    const toggleActiveState = () => setNavbarState(!navbarState);

    const confirmEdit = async (formData?: VenueFormData) => {
        const data = formData || pendingEditData; 
        if (!data || !venue) return;

        try {
            await venueRequest.request(
                "PUT",
                data,
                { url: `${baseUrl}/venues/${venue.id}` },
                accessToken || undefined
            );
            setSuccessMessage("Venue updated successfully!");
            setIsEditing(false);
            setEditConfirmationOpen(false);
            fetchVenue("GET");
        } catch (err) {
            console.error(err);
            setEditConfirmationOpen(false);
        }
    };

    const confirmDelete = async () => {
        try {
            await venueRequest.request(
                "DELETE",
                undefined,
                { url: `${baseUrl}/venues/${venueId}` },
                accessToken || undefined
            );
            navigate(`/holidaze/profiles/${name}`);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = () => {
        setModalOpen(true);
    };
    const handleEditVenue = (formData: VenueFormData) => {
        setPendingEditData(formData);
        setEditConfirmationOpen(true);
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

    if (venueLoading) return <Loading />;
    if (venueError) return <Error> {(venueError as Error).message} </Error>;

    return (
        <MainContainer>
            <Helmet>
                <title>{venue?.name || "Venue Details"}</title>
                <meta
                    name="description"
                    content={
                        venue?.description ||
                        "Explore venue details, amenities, pricing, and availability for your ideal accommodation."
                    }
                />
                <meta
                    name="keywords"
                    content={
                        venue?.name
                            ? `${venue.name}, accommodation, travel, booking, venues`
                            : "accommodation, travel, booking, venues"
                    }
                />
                <meta
                    name="author"
                    content={venue?.owner.name || "Venue Owner"}
                />

                {/* OpenGraph Meta */}
                <meta
                    property="og:title"
                    content={venue?.name || "Venue Details"}
                />
                <meta
                    property="og:description"
                    content={
                        venue?.description ||
                        "Find detailed information about this venue, including pricing, features, and location."
                    }
                />
                <meta
                    property="og:image"
                    content={
                        venue?.media && venue.media.length > 0
                            ? venue.media[0].url
                            : ""
                    }
                />
                <meta
                    property="og:url"
                    content={`https://yourwebsite.com/venues/${venueId}`}
                />
                <meta property="og:type" content="website" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:title"
                    content={venue?.name || "Venue Details"}
                />
                <meta
                    name="twitter:description"
                    content={
                        venue?.description ||
                        "Explore venue details, amenities, pricing, and availability."
                    }
                />
                <meta
                    name="twitter:image"
                    content={
                        venue?.media && venue.media.length > 0
                            ? venue.media[0].url
                            : ""
                    }
                />

                <link
                    rel="canonical"
                    href={`https://yourwebsite.com/venues/${venueId}`}
                />
            </Helmet>

            {isVenueOwner && (
                <>
                    <FunctionsContainer>
                        <div>
                            <p>Venue Owner</p>
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
                                    $btnColor="red"
                                    $hoverColor="darkred"
                                    $margin="0 0.5rem"
                                    onClick={handleDelete}
                                >
                                    Delete
                                </EditAndSaveBtn>
                                <ConfirmationModal
                                    isOpen={isModalOpen}
                                    message="Are you sure you want to delete this venue? This action cannot be undone."
                                    onConfirm={confirmDelete}
                                    onCancel={() => setModalOpen(false)}
                                />{" "}
                                <ConfirmationModal
                                    isOpen={editConfirmationOpen}
                                    message="Are you sure you want to save these changes?"
                                    onConfirm={() => confirmEdit()} 
                                    onCancel={() =>
                                        setEditConfirmationOpen(false)
                                    }
                                />
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
                <VenuePrice>{venue?.price} NOK</VenuePrice>
            </Row>
            <VenueInfo>
                <VenueTitle>{venue?.name}</VenueTitle>
                <VenueDescription>{venue?.description}</VenueDescription>
            </VenueInfo>
            <MetaTitle>
                <h3>This services are included in the price:</h3>
            </MetaTitle>
            <MetaInfo>
                {venue?.meta?.wifi === true ? (
                    <MetaInfoItem>
                        <FaWifi />
                        <span>Wifi included</span>
                    </MetaInfoItem>
                ) : (
                    <MetaInfoItem>
                        <FaWifi />
                        <strong>
                            <s>Wifi included</s>
                        </strong>
                    </MetaInfoItem>
                )}
                {venue?.meta?.breakfast === true ? (
                    <MetaInfoItem>
                        <MdOutlineEmojiFoodBeverage />
                        <span>Breakfast included</span>
                    </MetaInfoItem>
                ) : (
                    <>
                        <MetaInfoItem>
                            <MdOutlineEmojiFoodBeverage />
                            <strong>
                                <s>Breakfast included</s>
                            </strong>
                        </MetaInfoItem>
                    </>
                )}
                {venue?.meta?.parking === true ? (
                    <MetaInfoItem>
                        <MdLocalParking />
                        <span>Parking included</span>
                    </MetaInfoItem>
                ) : (
                    <MetaInfoItem>
                        <MdLocalParking />
                        <strong>
                            <s>Parking included</s>
                        </strong>
                    </MetaInfoItem>
                )}
                {venue?.meta?.pets === true ? (
                    <MetaInfoItem>
                        <MdOutlinePets />
                        <span>Pets allowed</span>
                    </MetaInfoItem>
                ) : (
                    <MetaInfoItem>
                        <MdOutlinePets />
                        <strong>
                            <s>Pets allowed</s>
                        </strong>
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
                    {venue?.location && (
                        <>
                            {venue?.location.address && (
                                <p>{venue?.location.address},</p>
                            )}
                            {venue?.location.city && (
                                <p>{venue?.location.city},</p>
                            )}
                            {venue?.location.zip && (
                                <p>{venue?.location.zip},</p>
                            )}
                            {venue?.location.country && (
                                <p>{venue?.location.country}.</p>
                            )}
                            {venue?.location.lat && (
                                <p>{venue?.location.lat}</p>
                            )}
                            {venue?.location.lng && (
                                <p>{venue?.location.lng}</p>
                            )}
                        </>
                    )}
                </div>
            </Row>
            <PriceAndDate>
                <h3>
                    Max Guests <strong>{venue?.maxGuests}</strong>
                </h3>
            </PriceAndDate>
            {!isVenueOwner &&
                (verified ? (
                    <Booking
                        maxGuests={venue?.maxGuests}
                        price={venue?.price}
                        venueData={venue}
                    />
                ) : (
                    <Loging>
                        <VenueBookingsButton
                            onClick={() => {
                                toggleActiveState();
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                        >
                            Log in to book
                        </VenueBookingsButton>
                    </Loging>
                ))}
            {isVenueOwner && venue?.bookings && venue.bookings.length > 0 && (
                <BookingContainer>
                    <h2>People booked your venues</h2>
                    {venue.bookings.map((booking) => (
                        <BookingCard key={booking.id}>
                            <VenueInfoContainer>
                                <ProfileLink
                                    name={booking.customer.name}
                                    url={booking.customer.avatar?.url}
                                    alt={
                                        booking.customer.avatar?.alt ||
                                        `Profile picture of ${booking.customer.name}`
                                    }
                                />
                            </VenueInfoContainer>
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
            )}
            {!venue?.bookings?.length && isVenueOwner && (
                <PriceAndDate>
                    <h3>No booking has been placed yet</h3>
                </PriceAndDate>
            )}
        </MainContainer>
    );
}
