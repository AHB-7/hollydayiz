import {
    ProfileAvatar,
    ProfileBannerContainer,
    ProfileBannerImage,
    ProfileBio,
    ProfileBioContainer,
    ProfileContainer,
    ProfileInfo,
    ProfileName,
    NotLogedInContainer,
    VenueBookingsButton,
    IoMdSettings,
} from "../../styles/index";
import { useApi } from "../../util/hooks/use-fetch";
import { SingleUser } from "../../types/global";
import { useEffect } from "react";
import { useStore } from "../../util/global/zustand-store";
import { UserBooking } from "./your-booking";
import { baseUrl } from "../../util/global/variables";

export function SingleProfile() {
    const apiToken = localStorage.getItem("accessToken");

    const userProfileName = localStorage.getItem("otherUsersName");
    const { setNavbarState, navbarState } = useStore();

    const {
        data: user,
        loading,
        error,
        request,
    } = useApi<SingleUser>(`${baseUrl}/profiles/${userProfileName}`);

    useEffect(() => {
        const fetchData = async () => {
            if (apiToken) {
                await request("GET", undefined, undefined, `${apiToken}`);
            }
        };

        fetchData();
    }, [apiToken]);

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === "accessToken" && event.newValue) {
                window.location.reload(); // Reload page when accessToken is set
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const toggleActiveState = () => {
        setNavbarState(!navbarState);
    };

    if (loading) return <p>Loading...</p>;
    if (!apiToken)
        return (
            <NotLogedInContainer>
                <p>Log in to view this profile</p>
                <VenueBookingsButton onClick={toggleActiveState}>
                    Log in
                </VenueBookingsButton>
            </NotLogedInContainer>
        );
    if (error) return <p>Error: {error.message}</p>;

    return (
        <ProfileContainer>
            <ProfileBannerContainer>
                <ProfileBannerImage
                    src={user?.banner?.url || "/default-banner.jpg"}
                    alt={user?.banner?.alt || "Default banner"}
                />
                <ProfileAvatar
                    src={user?.avatar?.url || "/default-avatar.jpg"}
                    alt={user?.avatar?.alt || "Default avatar"}
                />
            </ProfileBannerContainer>
            <ProfileInfo>
                <ProfileName>
                    {user?.name} <IoMdSettings />
                </ProfileName>
                <ProfileBioContainer>
                    <ProfileBio>{user?.bio}</ProfileBio>
                </ProfileBioContainer>
            </ProfileInfo>
            <UserBooking />
        </ProfileContainer>
    );
}
