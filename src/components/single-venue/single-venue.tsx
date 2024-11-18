import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../../util/hooks/use-fetch";
import { SingleVenue as SingleVenueTypes } from "../../types/global";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

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

    const media = venue?.media ?? [];

    return (
        <div>
            <h1>{venue?.name}</h1>
            <p>{venue?.description}</p>

            {media.length > 0 ? (
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={10}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    loop
                >
                    {media.map((image, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={image.url}
                                alt={image.alt}
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    objectFit: "cover",
                                    borderRadius: "8px",
                                    marginBottom: "1rem",
                                    maxWidth: "3rem",
                                }}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <p>No images available</p>
            )}
        </div>
    );
}
