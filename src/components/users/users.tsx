import { useEffect, useState } from "react";
import {
    SearchSortingContainer,
    SearchResult,
    SortButton,
    IoReload,
} from "../../styles";
import { baseUrl } from "../../util/global/variables";
import { SearchComponent } from "../venues/func/search";
import { UserCard } from "./user-card";
import { UsersSection } from "../../styles/users/users";
import { useApi } from "../../util/hooks/use-fetch";
import { ErrorMessage } from "../global/error-message";
import { Loading } from "../global/loading";
import { SortingComponent } from "../venues/func/sorting";
import { User } from "../../types/global";

export function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [searchResults, setSearchResults] = useState<User[] | null>(null);
    const accessToken = localStorage.getItem("accessToken");

    const {
        data: fetchedUsers,
        loading: usersLoading,
        error: userError,
        request: fetchUsers,
    } = useApi<User[]>(`${baseUrl}/profiles`);

    useEffect(() => {
        const fetchData = async () => {
            if (accessToken) {
                await fetchUsers("GET", undefined, undefined, accessToken);
            }
        };
        fetchData();
    }, [accessToken, fetchUsers]);

    useEffect(() => {
        if (fetchedUsers) {
            setUsers(fetchedUsers);
            setFilteredUsers(fetchedUsers);
            setSearchResults(fetchedUsers);
        }
    }, [fetchedUsers]);

    const handleSearch = (results: User[] | null) => {
        setSearchResults(results);
        setFilteredUsers(results ?? users);
    };

    const handleSortChange = (sort: string, sortOrder: string) => {
        const sortedUsers = [...filteredUsers].sort((a, b) => {
            let aValue = a[sort as keyof User];
            let bValue = b[sort as keyof User];

            if (sort === "name") {
                aValue = aValue.toString().toLowerCase();
                bValue = bValue.toString().toLowerCase();
            }

            if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
            if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });

        setFilteredUsers(sortedUsers);
    };

    // Clear search results
    const handleClearSearch = () => {
        setFilteredUsers(users);
        setSearchResults(null);
    };

    if (usersLoading) return <Loading />;
    if (userError) return <ErrorMessage message={userError.message} />;

    return (
        <UsersSection>
            <SearchSortingContainer>
                <SearchComponent
                    baseUrl={baseUrl}
                    onSearch={handleSearch}
                    onQueryChange={() => {}}
                    searchType="profiles"
                />
                <SortingComponent onSortChange={handleSortChange} />
                <SortButton
                    title="Clear the search results"
                    onClick={handleClearSearch}
                    disabled={!searchResults}
                >
                    <IoReload />
                </SortButton>
            </SearchSortingContainer>
            {filteredUsers.length === 0 ? (
                <SearchResult>No users found.</SearchResult>
            ) : (
                filteredUsers.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))
            )}
        </UsersSection>
    );
}
