import { useState, useEffect } from "react";
import {
    DisabledButton,
    Error,
    IoReload,
    SearchResult,
    SearchSortingContainer,
    SortButton,
    VenueBookingsButton,
    VenuesContainer,
} from "../../styles/index";
import { useApi } from "../../util/hooks/use-fetch";
import { baseUrl } from "../../util/global/variables";
import { VenueCardComponent } from "./venue-card";
import { Accommodation } from "../../types/global";
import { SortingComponent } from "./func/sorting";
import { SearchComponent } from "./func/search";
import { Loading } from "../global/loading";
import { Helmet } from "react-helmet-async";

export function Venues() {
    const [sort, setSort] = useState<string>("created");
    const [sortOrder, setSortOrder] = useState<string>("desc");
    const [searchResults, setSearchResults] = useState<Accommodation[] | null>(
        null
    );
    const [limit] = useState<number>(18);
    const [page, setPage] = useState<number>(1);
    const [venues, setVenues] = useState<Accommodation[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);

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
        setSearchResults(null);
    };

    const handleSearch = (results: Accommodation[]) => {
        if (results.length === 0) {
            setSearchResults([]);
        } else {
            setSearchResults(results);
        }
        setHasMore(false);
    };

    const handleClearSearch = () => {
        setSearchResults(null);
        setPage(1);
        setHasMore(true);
    };

    const handleLoadMore = () => {
        if (hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const venuesToDisplay =
        Array.isArray(searchResults) && searchResults.length >= 0
            ? searchResults
            : venues;

    if (loading && page === 1) return <Loading />;

    if (error) {
        console.error("Error fetching venues:", error);
        return <Error> {(error as Error).message} </Error>;
    }

    return (
        <VenuesContainer>
            <Helmet>
                <title>Venue's Home</title>
                <meta
                    name="description"
                    content="Discover the best venues for your next holiday, sorted by your preferences. Browse through an extensive collection of accommodations tailored to your needs."
                />
                <meta
                    name="keywords"
                    content="venues, holiday venues, accommodations, travel, bookings, vacation, holiday planning"
                />
                <meta name="author" content="Your Company Name" />
                <meta
                    property="og:title"
                    content="Venues - Perfect Accommodations for Your Holiday"
                />
                <meta
                    property="og:description"
                    content="Explore a wide range of venues and accommodations for your perfect holiday experience. Book now and make your travel hassle-free."
                />
                <meta property="og:image" content="/logo.svg" />
                <meta
                    property="og:url"
                    content="https://hollydays.netlify.app/"
                />
                <meta property="og:type" content="website" />
                <meta property="twitter:card" content="summary_large_image" />
            </Helmet>

            <SearchSortingContainer>
                <SearchComponent
                    searchType="venues"
                    baseUrl={baseUrl}
                    onSearch={handleSearch}
                    onQueryChange={(query: string) => console.log(query)}
                />
                <SortButton
                    title="clear the search results"
                    onClick={handleClearSearch}
                    disabled={!searchResults}
                >
                    <IoReload />
                </SortButton>
                <SortingComponent onSortChange={handleSortChange} />
            </SearchSortingContainer>

            {venuesToDisplay.length === 0 ? (
                <SearchResult>No results found.</SearchResult>
            ) : (
                venuesToDisplay.map((venue) => (
                    <VenueCardComponent
                        key={venue.id}
                        venue={venue}
                        showOwner={!searchResults || searchResults.length === 0}
                    />
                ))
            )}

            <SearchSortingContainer>
                {hasMore && !searchResults ? (
                    <VenueBookingsButton
                        onClick={handleLoadMore}
                        disabled={loading}
                    >
                        {loading ? "loading more..." : "Load More"}
                    </VenueBookingsButton>
                ) : (
                    <DisabledButton>Nothing more to load</DisabledButton>
                )}
            </SearchSortingContainer>
        </VenuesContainer>
    );
}
