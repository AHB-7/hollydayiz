import React, { useState, useEffect, useRef } from "react";
import { useApi } from "../../../util/hooks/use-fetch";
import { SearchContainer, SearchInput } from "../../../styles";
interface SearchComponentProps {
    baseUrl: string;
    onSearch: (results: any[]) => void;
    onQueryChange: (query: string) => void;
    searchType: "venues" | "profiles"; // Pass searchType explicitly
}

export const SearchComponent: React.FC<SearchComponentProps> = ({
    baseUrl,
    onSearch,
    onQueryChange,
    searchType, // Use searchType from props
}) => {
    const [query, setQuery] = useState<string>("");
    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const accessToken = localStorage.getItem("accessToken");
    const { loading, request } = useApi(
        `${baseUrl}/${searchType}/search` // Use searchType from props in the URL
    );
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
