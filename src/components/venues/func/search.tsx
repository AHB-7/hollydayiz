import React, { useState } from "react";
import { useApi } from "../../../util/hooks/use-fetch";
import { Accommodation } from "../../../types/global";

interface SearchComponentProps {
    searchType: "venues" | "profiles";
    baseUrl: string;
    renderResult: (result: any) => JSX.Element;
    onSearch: (results: any[]) => void;
}

export const SearchComponent: React.FC<SearchComponentProps> = ({
    searchType,
    baseUrl,
    onSearch,
}) => {
    const [query, setQuery] = useState<string>("");
    const { data, loading, error, request } = useApi<Accommodation[]>(
        `${baseUrl}/${searchType}/search`
    );

    const handleSearch = async () => {
        if (!query.trim()) return;
        try {
            await request("GET", {}, { params: { q: query } });
            console.log("Search API response:", data); 
            if (data) {
                onSearch(data || []);
            } else {
                onSearch([]);
            }
        } catch (err) {
            console.error("Search error:", err);
        }
    };

    return (
        <div>
            <div
                style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}
            >
                <input
                    type="text"
                    placeholder={`Search ${searchType}...`}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{
                        flex: 1,
                        padding: "0.5rem",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                    }}
                />
                <button
                    onClick={handleSearch}
                    disabled={loading}
                    style={{ padding: "0.5rem 1rem" }}
                >
                    {loading ? "Searching..." : "Search"}
                </button>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error.message}</p>}
        </div>
    );
};
