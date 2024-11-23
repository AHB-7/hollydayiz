import {
    ProfileAvatar,
    ProfileBannerContainer,
    ProfileBannerImage,
    ProfileBioContainer,
    ProfileContainer,
    ProfileInfo,
    ProfileName,
    NotLogedInContainer,
    VenueBookingsButton,
    IoMdSettings,
    EditContainer,
} from "../../styles/index";
import { useApi } from "../../util/hooks/use-fetch";
import { SingleUser } from "../../types/global";
import { useEffect, useState } from "react";
import { useStore } from "../../util/global/zustand-store";
import { UserBooking } from "./user-booking";
import { baseUrl } from "../../util/global/variables";
import { useParams } from "react-router-dom";

export function SingleProfile() {
    const apiToken = localStorage.getItem("accessToken");
    const { username } = useParams<{ username: string }>();
    const { setNavbarState, navbarState } = useStore();
    const [profileOwner, setProfileOwner] = useState<boolean>(false);
    const [editing, setEditing] = useState<boolean>(false);
    const [updatedProfile, setUpdatedProfile] = useState({
        bio: "",
        avatar: { url: "", alt: "" },
        banner: { url: "", alt: "" },
        venueManager: false,
    });

    const name = localStorage.getItem("name");

    const {
        data: user,
        loading,
        error,
        request,
    } = useApi<SingleUser>(`${baseUrl}/profiles/${username}`);
    const updateProfileRequest = useApi(`${baseUrl}/profiles/${username}`);

    useEffect(() => {
        const fetchData = async () => {
            if (apiToken && username) {
                await request(
                    "GET",
                    undefined,
                    undefined,
                    apiToken || undefined
                );
            }
        };

        fetchData();
    }, [apiToken, username]);

    useEffect(() => {
        if (name === username) {
            setProfileOwner(true);
        }
    }, [name, username]);

    useEffect(() => {
        if (user) {
            setUpdatedProfile({
                bio: user.bio || "",
                avatar: user.avatar || { url: "", alt: "" },
                banner: user.banner || { url: "", alt: "" },
                venueManager: user.venueManager || false,
            });
        }
    }, [user]);

    const handleSave = async () => {
        try {
            const response = await updateProfileRequest.request(
                "PUT",
                updatedProfile,
                undefined,
                apiToken || undefined
            );
            console.log("Profile updated successfully:", response);
            setEditing(false);
            await request("GET", undefined, undefined, apiToken || undefined);
        } catch (err) {
            console.error("Error updating profile:", err);
        }
    };

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
                {editing ? (
                    <div>
                        <label>Banner URL:</label>
                        <input
                            type="text"
                            title="Banner URL"
                            placeholder="Enter banner URL"
                            value={updatedProfile.banner.url}
                            onChange={(e) =>
                                setUpdatedProfile((prev) => ({
                                    ...prev,
                                    banner: {
                                        ...prev.banner,
                                        url: e.target.value,
                                    },
                                }))
                            }
                        />
                        <label>Banner Alt:</label>
                        <input
                            type="text"
                            title="Banner Alt"
                            placeholder="Enter banner alt text"
                            value={updatedProfile.banner.alt}
                            onChange={(e) =>
                                setUpdatedProfile((prev) => ({
                                    ...prev,
                                    banner: {
                                        ...prev.banner,
                                        alt: e.target.value,
                                    },
                                }))
                            }
                        />
                    </div>
                ) : (
                    <ProfileBannerImage
                        src={user?.banner?.url || "/default-banner.jpg"}
                        alt={user?.banner?.alt || "Default banner"}
                    />
                )}
                {editing ? (
                    <div>
                        <label>Avatar URL:</label>
                        <input
                            type="text"
                            title="Avatar URL"
                            placeholder="Enter avatar URL"
                            value={updatedProfile.avatar.url}
                            onChange={(e) =>
                                setUpdatedProfile((prev) => ({
                                    ...prev,
                                    avatar: {
                                        ...prev.avatar,
                                        url: e.target.value,
                                    },
                                }))
                            }
                        />
                        <label>Avatar Alt:</label>
                        <input
                            type="text"
                            title="Avatar Alt"
                            placeholder="Enter avatar alt text"
                            value={updatedProfile.avatar.alt}
                            onChange={(e) =>
                                setUpdatedProfile((prev) => ({
                                    ...prev,
                                    avatar: {
                                        ...prev.avatar,
                                        alt: e.target.value,
                                    },
                                }))
                            }
                        />
                    </div>
                ) : (
                    <ProfileAvatar
                        src={user?.avatar?.url || "/default-avatar.jpg"}
                        alt={user?.avatar?.alt || "Default avatar"}
                    />
                )}
            </ProfileBannerContainer>
            <ProfileInfo>
                <ProfileName>{user?.name}</ProfileName>
                <ProfileBioContainer>
                    <h2>Bio</h2>
                    {editing ? (
                        <textarea
                            title="Bio"
                            placeholder="Enter your bio"
                            value={updatedProfile.bio}
                            onChange={(e) =>
                                setUpdatedProfile((prev) => ({
                                    ...prev,
                                    bio: e.target.value,
                                }))
                            }
                        />
                    ) : (
                        <p>{user?.bio || "No bio available"}</p>
                    )}
                    {profileOwner && (
                        <span onClick={() => setEditing(!editing)}>
                            <IoMdSettings />
                        </span>
                    )}
                </ProfileBioContainer>
                {editing && (
                    <div>
                        <label>
                            Venue Manager:
                            <input
                                type="checkbox"
                                title="Venue Manager"
                                placeholder="Venue Manager"
                                checked={updatedProfile.venueManager}
                                onChange={(e) =>
                                    setUpdatedProfile((prev) => ({
                                        ...prev,
                                        venueManager: e.target.checked,
                                    }))
                                }
                            />
                        </label>
                    </div>
                )}
            </ProfileInfo>
            {editing && (
                <EditContainer>
                    <button onClick={() => setEditing(false)}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </EditContainer>
            )}
            <UserBooking />
        </ProfileContainer>
    );
}
