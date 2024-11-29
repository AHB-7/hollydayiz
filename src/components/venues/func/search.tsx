import React, { useState, useEffect, useRef } from "react";
import { useApi } from "../../../util/hooks/use-fetch";
import { SearchContainer, SearchInput } from "../../../styles";

/**
 * A search component for querying and filtering either venues or profiles.
 * It supports debounce for optimized API calls and dynamic query updates.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {string} props.baseUrl - The base URL for the API endpoint.
 * @param {(results: any[]) => void} props.onSearch - Callback function to handle search results.
 * @param {(query: string) => void} props.onQueryChange - Callback function to handle changes to the search query.
 * @param {"venues" | "profiles"} props.searchType - Specifies the type of search (e.g., "venues" or "profiles").
 *
 * @example
 * <SearchComponent
 *   baseUrl="https://api.example.com"
 *   onSearch={(results) => console.log(results)}
 *   onQueryChange={(query) => console.log(query)}
 *   searchType="profiles"
 * />
 */

interface SearchComponentProps {
    baseUrl: string;
    onSearch: (results: any[]) => void;
    onQueryChange: (query: string) => void;
    searchType: "venues" | "profiles";
}

export const SearchComponent: React.FC<SearchComponentProps> = ({
    baseUrl,
    onSearch,
    onQueryChange,
    searchType,
}) => {
    const [query, setQuery] = useState<string>("");
    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const accessToken = localStorage.getItem("accessToken");
    const { loading, request } = useApi(`${baseUrl}/${searchType}/search`);
    const apiKey = import.meta.env.VITE_NOROFF_API_KEY;

    const handleSearch = async (searchQuery: string) => {
        onQueryChange(searchQuery);
        if (!searchQuery.trim()) {
            onSearch([]);
            return;
        }

        try {
            const headers = {
                "X-Noroff-API-Key": apiKey,
                ...(searchType === "profiles" && accessToken
                    ? { Authorization: `Bearer ${accessToken}` }
                    : {}),
            };

            const response = await request("GET", undefined, {
                params: { q: searchQuery },
                headers,
            }).catch((err) => {
                console.error("Search error:", err);
                return null;
            });

            if (response) {
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
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(() => {
            if (query) {
                handleSearch(query);
            }
        }, 500);

        return () => {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
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
                </label>
            </button>
        </SearchContainer>
    );
};
