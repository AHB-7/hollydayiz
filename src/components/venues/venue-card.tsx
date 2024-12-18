import {
    VenueCard,
    VenueInfoContainer,
    VenueImageContainer,
    VenueMetaContainer,
    VenueMeta,
    FaWifi,
    MdLocalParking,
    MdOutlineEmojiFoodBeverage,
    MdOutlinePets,
} from "../../styles/index";
import { Stars } from "../global/rating";
import { IoPeopleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { ProfileLink } from "../global/link-to-profiles";
import { Accommodation } from "../../types/global";

export function VenueCardComponent({
    venue,
    showOwner = true,
}: {
    venue: Accommodation;
    showOwner?: boolean;
    onEdit?: () => void;
}) {
    const {
        id,
        name = "Unnamed Venue",
        price = 0,
        rating = 0,
        media = [],
        meta = { wifi: false, parking: false, breakfast: false, pets: false },
        maxGuests = 1,
        owner = {
            name: "Unknown Owner",
            avatar: { url: "/default-avatar.jpg", alt: "Default avatar" },
        },
    } = venue;

    return (
        <VenueCard key={id}>
            {showOwner && (
                <VenueInfoContainer>
                    <ProfileLink
                        name={owner.name}
                        url={owner.avatar?.url}
                        alt={
                            owner.avatar?.alt ||
                            `Profile picture of ${owner.name}`
                        }
                    />
                </VenueInfoContainer>
            )}
            <VenueImageContainer>
                <Link to={`/holidaze/venues/${id}?_owner=true&_bookings=true`}>
                    <img
                        src={
                            media.length > 0
                                ? media[0].url
                                : "placeholder-image-url.jpg"
                        }
                        alt={
                            media.length > 0 && media[0]?.alt
                                ? media[0].alt
                                : "Image not available"
                        }
                    />
                </Link>
                <Stars rating={rating} />
            </VenueImageContainer>
            <VenueInfoContainer>
                <h2>{name}</h2>
                <div>
                    <p>{price} NOK</p>
                </div>
            </VenueInfoContainer>
            <VenueMetaContainer>
                <VenueMeta>
                    {meta.wifi ? <FaWifi /> : <FaWifi fill="lightgrey" />}
                </VenueMeta>
                <VenueMeta>
                    {meta.pets ? (
                        <MdOutlinePets />
                    ) : (
                        <MdOutlinePets fill="lightgrey" />
                    )}
                </VenueMeta>
                <VenueMeta>
                    {meta.parking ? (
                        <MdLocalParking />
                    ) : (
                        <MdLocalParking fill="lightgrey" />
                    )}
                </VenueMeta>
                <VenueMeta>
                    {meta.breakfast ? (
                        <MdOutlineEmojiFoodBeverage />
                    ) : (
                        <MdOutlineEmojiFoodBeverage fill="lightgrey" />
                    )}
                </VenueMeta>
                <VenueMeta>
                    <p>{maxGuests}</p>
                    <IoPeopleSharp />
                </VenueMeta>
            </VenueMetaContainer>
        </VenueCard>
    );
}
