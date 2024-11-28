import { useState } from "react";
import { SearchSortingContainer, SearchResult } from "../../styles";
import { baseUrl } from "../../util/global/variables";
import { SearchComponent } from "../venues/func/search";
import { UserCard } from "./user-card";

export function Users() {
    const [users, setUsers] = useState<any[]>([]); // State to hold search results

    const handleSearch = (results: any[]) => {
        setUsers(results); // Update users with search results
    };

    return (
        <div style={{ marginTop: "10rem" }}>
            <SearchSortingContainer>
                <SearchComponent
                    baseUrl={baseUrl}
                    onSearch={handleSearch} // Pass handleSearch to capture results
                    onQueryChange={() => {}} // Optional: Handle query updates if needed
                    searchType="profiles" // Add searchType property
                />
            </SearchSortingContainer>

            {/* Display User Cards */}
            {users.length === 0 ? (
                <SearchResult>No users found.</SearchResult>
            ) : (
                users.map((user, index) => <UserCard key={index} user={user} />)
            )}
        </div>
    );
}
