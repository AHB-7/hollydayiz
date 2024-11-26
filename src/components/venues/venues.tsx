import { useState, useEffect } from "react";
import {
    DisabledButton,
    SearchSortingContainer,
    VenueBookingsButton,
    VenuesContainer,
} from "../../styles/index";
import { useApi } from "../../util/hooks/use-fetch";
import { baseUrl } from "../../util/global/variables";
import { VenueCardComponent } from "./venue-card";
import { Accommodation } from "../../types/global";
import { SortingComponent } from "./func/sorting";
import { SearchComponent } from "./func/search";

export function Venues() {
    const [sort, setSort] = useState<string>("created");
    const [sortOrder, setSortOrder] = useState<string>("desc");
    const [searchResults, setSearchResults] = useState<Accommodation[] | null>(
        null
    );
    const [limit] = useState<number>(18);
    const [page, setPage] = useState<number>(1);
    const [venues, setVenues] = useState<Accommodation[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true); // Track if more venues are available

    const {
        data: posts = [],
        loading,
        error,
        request,
    } = useApi<Accommodation[]>(
        `${baseUrl}/venues?sort=${sort}&_owner=true&sortOrder=${sortOrder}&limit=${limit}&page=${page}`
    );

    useEffect(() => {
        const fetchData = async () => {
            const response = await request("GET");
            if (Array.isArray(response) && response.length === 0) {
                setHasMore(false);
            }
        };

        fetchData();
    }, [request, sort, sortOrder, page]);

    useEffect(() => {
        if (Array.isArray(posts) && posts.length > 0) {
            setVenues((prevVenues) =>
                [...prevVenues, ...posts].filter(
                    (venue, index, self) =>
                        self.findIndex((v) => v.id === venue.id) === index
                )
            );
        }
    }, [posts]);

    const handleSortChange = (newSort: string, newSortOrder: string) => {
        setSort(newSort);
        setSortOrder(newSortOrder);
        setPage(1);
        setVenues([]);
        setHasMore(true);
    };

    const handleSearch = (results: Accommodation[]) => {
        setSearchResults(results);
        setHasMore(false);
    };

    const handleLoadMore = () => {
        if (hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const venuesToDisplay =
        Array.isArray(searchResults) && searchResults.length > 0
            ? searchResults
            : venues;

    if (loading && page === 1) return <p>Loading...</p>;

    if (error) {
        console.error("Error fetching venues:", error);
        return <p>Error: {error.message}</p>;
    }

    if (!Array.isArray(venuesToDisplay) || venuesToDisplay.length === 0) {
        return <p>No venues available.</p>;
    }

    return (
        <VenuesContainer>
            <SearchSortingContainer>
                <SearchComponent
                    searchType="venues"
                    baseUrl={baseUrl}
                    renderResult={(result) => (
                        <VenueCardComponent venue={result} showOwner={false} />
                    )}
                    onSearch={handleSearch}
                />
                <SortingComponent onSortChange={handleSortChange} />
            </SearchSortingContainer>
            {venuesToDisplay.map((venue) => (
                <VenueCardComponent
                    key={venue.id}
                    venue={venue}
                    showOwner={!searchResults || searchResults.length === 0}
                />
            ))}
            <SearchSortingContainer>
                {hasMore ? (
                    <VenueBookingsButton
                        onClick={handleLoadMore}
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Load More"}
                    </VenueBookingsButton>
                ) : (
                    <DisabledButton>Nothing more to load</DisabledButton>
                )}
            </SearchSortingContainer>
        </VenuesContainer>
    );
}
