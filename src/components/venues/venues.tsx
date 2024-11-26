import { useState, useEffect } from "react";
import { SearchSortingContainer, VenuesContainer } from "../../styles/index";
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

    const {
        data: posts = [],
        loading,
        error,
        request,
    } = useApi<Accommodation[]>(
        `${baseUrl}/venues?sortOrder=${sortOrder}&sort=${sort}&_owner=true`
    );

    useEffect(() => {
        request("GET");
    }, [request, sort, sortOrder]);

    const handleSortChange = (newSort: string, newSortOrder: string) => {
        setSort(newSort);
        setSortOrder(newSortOrder);
    };

    const handleSearch = (results: Accommodation[]) => {
        setSearchResults(results);
    };

    const venuesToDisplay =
        Array.isArray(searchResults) && searchResults.length > 0
            ? searchResults
            : posts;

    if (loading) return <p>Loading...</p>;

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
                        <VenueCardComponent venue={result} />
                    )}
                    onSearch={handleSearch}
                />
                <SortingComponent onSortChange={handleSortChange} />
            </SearchSortingContainer>
            {searchResults && searchResults.length > 0 ? (
                <>
                    {venuesToDisplay.map((venue) => (
                        <VenueCardComponent
                            key={venue.id}
                            showOwner={false}
                            venue={venue}
                        />
                    ))}
                </>
            ) : (
                <>
                    {" "}
                    {venuesToDisplay.map((venue) => (
                        <VenueCardComponent key={venue.id} venue={venue} />
                    ))}
                </>
            )}
        </VenuesContainer>
    );
}
