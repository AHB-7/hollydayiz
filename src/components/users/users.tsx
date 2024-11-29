import { useEffect, useState } from "react";
import {
    SearchSortingContainer,
    SearchResult,
    SortButton,
    IoReload,
    VenueBookingsButton,
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
import { Helmet } from "react-helmet-async";

export function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [searchResults, setSearchResults] = useState<User[] | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const accessToken = localStorage.getItem("accessToken");

    const {
        data: fetchedUsers,
        loading: usersLoading,
        error: userError,
        request: fetchUsers,
    } = useApi<User[]>(
        `${baseUrl}/profiles?limit=${usersPerPage}&page=${currentPage}`
    );

    useEffect(() => {
        const fetchData = async () => {
            if (accessToken) {
                const response = await fetchUsers(
                    "GET",
                    undefined,
                    undefined,
                    accessToken
                );
                if (Array.isArray(response) && response.length < usersPerPage) {
                    setHasMore(false);
                }
            }
        };
        fetchData();
    }, [accessToken, fetchUsers, currentPage]);

    useEffect(() => {
        if (fetchedUsers) {
            setUsers((prevUsers) => [...prevUsers, ...fetchedUsers]);
            setFilteredUsers((prevUsers) => [...prevUsers, ...fetchedUsers]);
        }
    }, [fetchedUsers]);

    const handleSearch = (results: User[] | null) => {
        setSearchResults(results);
        setFilteredUsers(results ?? users);
        setCurrentPage(1);
        setHasMore(false);
    };

    const handleSortChange = (sort: string, sortOrder: string) => {
        const sortedUsers = [...filteredUsers].sort((a, b) => {
            let aValue = a[sort as keyof User];
            let bValue = b[sort as keyof User];

            if (sort === "name") {
                aValue = aValue ? aValue.toString().toLowerCase() : "";
                bValue = bValue ? bValue.toString().toLowerCase() : "";
            }

            if ((aValue ?? "") < (bValue ?? ""))
                return sortOrder === "asc" ? -1 : 1;
            if ((aValue ?? "") > (bValue ?? ""))
                return sortOrder === "asc" ? 1 : -1;
            return 0;
        });

        setFilteredUsers(sortedUsers);
        setCurrentPage(1);
        setHasMore(true);
    };

    const handleClearSearch = () => {
        setFilteredUsers(users);
        setSearchResults(null);
        setCurrentPage(1);
        setHasMore(true);
    };

    const handleLoadMore = () => {
        if (hasMore) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    // Pagination logic
    const currentUsers = filteredUsers;

    if (usersLoading) return <Loading />;
    if (userError) return <ErrorMessage message={userError.message} />;

    return (
        <UsersSection>
            <Helmet>
                <title>Users - Explore Profiles</title>
                <meta
                    name="description"
                    content="Browse user profiles, connect with venue managers, and explore the profiles of our vibrant community. Find detailed user information tailored for your interactions."
                />
                <meta
                    name="keywords"
                    content="users, profiles, venue managers, community, travel connections, user information, social connections"
                />
                <meta name="author" content="Your Company Name" />
                <meta
                    property="og:title"
                    content="Users - Connect with Our Community"
                />
                <meta
                    property="og:description"
                    content="Explore user profiles and connect with venue managers for your travel plans. Discover a diverse community of users ready to assist you."
                />
                <meta
                    property="og:image"
                    content="/user-profile-placeholder.png"
                />
                <meta
                    property="og:url"
                    content="https://hollydays.netlify.app/users"
                />
                <meta property="og:type" content="website" />
                <meta property="twitter:card" content="summary_large_image" />
            </Helmet>
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
            {currentUsers.length === 0 ? (
                <SearchResult>No users found.</SearchResult>
            ) : (
                currentUsers.map((user, index) => (
                    <UserCard key={`${user.id}+${index}`} user={user} />
                ))
            )}
            <SearchSortingContainer>
                {hasMore && !searchResults ? (
                    <VenueBookingsButton
                        onClick={handleLoadMore}
                        disabled={usersLoading}
                    >
                        Load More
                    </VenueBookingsButton>
                ) : (
                    <VenueBookingsButton disabled={true}>
                        Nothing more to load
                    </VenueBookingsButton>
                )}
            </SearchSortingContainer>
        </UsersSection>
    );
}
