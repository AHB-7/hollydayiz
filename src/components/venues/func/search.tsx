import React, { useState, useEffect, useRef } from "react";
import { useApi } from "../../../util/hooks/use-fetch";
import { Accommodation } from "../../../types/global";
import { SearchContainer, SearchInput } from "../../../styles";

interface SearchComponentProps {
    searchType: "venues" | "profiles";
    baseUrl: string;
    renderResult?: (result: any) => JSX.Element;
    onSearch: (results: any[]) => void;
}

export const SearchComponent: React.FC<SearchComponentProps> = ({
    searchType,
    baseUrl,
    onSearch,
}) => {
    const [query, setQuery] = useState<string>("");
    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const { loading, request } = useApi<Accommodation[]>(
        `${baseUrl}/${searchType}/search`
    );

    const handleSearch = async (searchQuery: string) => {
        if (!searchQuery.trim()) {
            onSearch([]);
            return;
        }
        try {
            const response = await request(
                "GET",
                {},
                { params: { q: searchQuery } }
            );

            if (response !== undefined) {
                onSearch(response);
            } else {
                onSearch([]);
            }
        } catch (err) {
            console.error("Search error:", err);
            onSearch([]);
        }
    };

    useEffect(() => {
        if (debounceTimer.current) clearTimeout(debounceTimer.current);

        debounceTimer.current = setTimeout(() => {
            if (query) {
                handleSearch(query);
            }
        }, 500);

        return () => {
            if (debounceTimer.current) clearTimeout(debounceTimer.current);
        };
    }, [query]);

    return (
        <SearchContainer>
            <SearchInput
                id="search"
                type="text"
                placeholder={`Search ${searchType}...`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={() => handleSearch(query)} disabled={loading}>
                <label htmlFor="search">
                    {loading ? "Searching..." : "Search"}
                </label>{" "}
            </button>
        </SearchContainer>
    );
};
