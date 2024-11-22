import { IoMdSettings } from "react-icons/io";
import {
    ProfileAvatar,
    ProfileBannerContainer,
    ProfileBannerImage,
    ProfileBio,
    ProfileBioContainer,
    ProfileContainer,
    ProfileInfo,
    ProfileName,
} from "../../styles/profile/profile";
import { useApi } from "../../util/hooks/use-fetch";
import { SingleUser } from "../../types/global";
import { useEffect, useState } from "react";
import { useStore } from "../../util/global/zustand-store";
import { NotLogedInContainer } from "../../styles/auth/auth";
import { VenueBookingsButton } from "../../styles/venues/cards";

export function SingleProfile() {
    const apiToken = localStorage.getItem("accessToken");

    const userProfileName = localStorage.getItem("otherUsersName");
    const { setNavbarState, navbarState } = useStore();

    const {
        data: user,
        loading,
        error,
        request,
    } = useApi<SingleUser>(
        `https://v2.api.noroff.dev/holidaze/profiles/${userProfileName}`
    );

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
        </ProfileContainer>
    );
}
