import { VenuesContainer } from "../../styles/index";
import { useApi } from "../../util/hooks/use-fetch";
import { useEffect } from "react";
import { baseUrl } from "../../util/global/variables";
import { VenueCardComponent } from "./venue-card";
import { Accommodation } from "../../types/global";

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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <VenuesContainer>
            {posts?.map((post) => (
                <VenueCardComponent key={post.id} venue={post} />
            ))}
        </VenuesContainer>
    );
}
