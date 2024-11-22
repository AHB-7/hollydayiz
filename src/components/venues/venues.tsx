import {
    VenueCard,
    VenueInfoContainer,
    VenueImageContainer,
    VenueMetaContainer,
    VenueMeta,
} from "../../styles/venues/cards";
import { VenuesContainer } from "../../styles/venues/container";
import { FaWifi } from "react-icons/fa6";
import { Stars } from "../../components/global/rating";
import {
    MdLocalParking,
    MdOutlineEmojiFoodBeverage,
    MdOutlinePets,
} from "react-icons/md";
import { IoPeopleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Accommodation } from "../../types/global";
import { useApi } from "../../util/hooks/use-fetch";
import { useEffect } from "react";
import { baseUrl } from "../../util/global/variables";
import { PorfileLink } from "./link-to-profiles";

export function Venues() {
    const {
        data: posts,
        loading,
        error,
        request,
    } = useApi<Accommodation[]>(
        `${baseUrl}/venues?sortOrder=desc&sort=created&_owner=true`
    );

    useEffect(() => {
        request("GET");
    }, []);
    useEffect(() => {}, [posts]);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <VenuesContainer>
            {posts?.map((post) => (
                <VenueCard key={post.id}>
                    <VenueInfoContainer>
                        <PorfileLink
                            name={post.owner.name}
                            url={post.owner.avatar.url}
                            alt={post.owner.avatar.alt}
                        />
                    </VenueInfoContainer>
                    <VenueImageContainer>
                        <Link
                            to={`/holidaze/venues/${post.id}?_owner=true&_bookings=true`}
                        >
                            <img
                                src={
                                    post.media?.length > 0
                                        ? post.media[0].url
                                        : "placeholder-image-url.jpg"
                                }
                                alt={
                                    post.media?.length > 0
                                        ? post.media[0].alt
                                        : "Image not available"
                                }
                            />
                        </Link>
                        <Stars rating={post.rating} />
                    </VenueImageContainer>
                    <VenueInfoContainer>
                        <h2>{post.name}</h2>
                        <div>
                            <p>{post.price} NOK</p>
                        </div>
                    </VenueInfoContainer>
                    <VenueMetaContainer>
                        <VenueMeta>
                            {post.meta?.wifi ? (
                                <FaWifi />
                            ) : (
                                <FaWifi fill="lightgrey" />
                            )}
                        </VenueMeta>
                        <VenueMeta>
                            {post.meta?.pets ? (
                                <MdOutlinePets />
                            ) : (
                                <MdOutlinePets fill="lightgrey" />
                            )}
                        </VenueMeta>
                        <VenueMeta>
                            {post.meta?.parking ? (
                                <MdLocalParking />
                            ) : (
                                <MdLocalParking fill="lightgrey" />
                            )}
                        </VenueMeta>
                        <VenueMeta>
                            {post.meta?.breakfast ? (
                                <MdOutlineEmojiFoodBeverage />
                            ) : (
                                <MdOutlineEmojiFoodBeverage fill="lightgrey" />
                            )}
                        </VenueMeta>
                        <VenueMeta>
                            <p>{post.maxGuests}</p>
                            <IoPeopleSharp />
                        </VenueMeta>
                    </VenueMetaContainer>
                    {/* <VenueBookingsButton>Book Now</VenueBookingsButton> */}
                </VenueCard>
            ))}
        </VenuesContainer>
    );
}
