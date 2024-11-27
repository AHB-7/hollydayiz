import {
    ProfileAvatar,
    ProfileBannerContainer,
    ProfileBannerImage,
    ProfileBioContainer,
    ProfileContainer,
    ProfileInfo,
    ProfileName,
    NotLoggedInContainer,
    VenueBookingsButton,
    IoMdSettings,
    VenuesContainerStyled,
    ToggleDown,
    IoEye,
    IoEyeOff,
    Error,
} from "../../styles/index";
import { useApi } from "../../util/hooks/use-fetch";
import { SingleUser, VenueFormData } from "../../types/global";
import { useEffect, useState } from "react";
import { UserBooking } from "./users-bookings/main";
import { baseUrl } from "../../util/global/variables";
import { useParams } from "react-router-dom";
import { useUserPreferences } from "../../util/global/zustand-store";
import { PostVenue } from "./post-venue-ui/main";
import { VenueCardComponent } from "../venues/venue-card";
import { EditProfile } from "./edit/edit-profile";
import { Loading } from "../global/loading";
import { ErrorMessage } from "../global/error-message";

export function SingleProfile() {
    const {
        setNavbarState,
        navbarState,
        venueManager,
        accessToken,
        setVenueManager,
        name,
        venueContainer,
        setVenueContainer,
    } = useUserPreferences();

    const { username } = useParams<{ username: string }>();
    const [profileOwner, setProfileOwner] = useState<boolean>(false);
    const [editing, setEditing] = useState<boolean>(false);
    const [editingVenue, setEditingVenue] = useState<VenueFormData | null>(
        null
    );
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [updatedProfile, setUpdatedProfile] = useState({
        bio: "",
        avatar: { url: "", alt: "" },
        banner: { url: "", alt: "" },
        venueManager: false,
    });
    const [toggleVenue, setToggleVenue] = useState<boolean>(false);
    const [toggleBooking, setToggleBooking] = useState<boolean>(false);

    const toggleVenueHandler = () => setToggleVenue((prevState) => !prevState);
    const toggleBookingHandler = () =>
        setToggleBooking((prevState) => !prevState);
    const openVenueComponent = () => setVenueContainer(true);
    const closeVenueComponent = () => {
        setVenueContainer(false);
        setEditingVenue(null);
        setSuccessMessage(null);
    };

    const {
        data: user,
        loading,
        error,
        request,
    } = useApi<SingleUser>(`${baseUrl}/profiles/${username}?_venues=true`);

    const updateProfileRequest = useApi(`${baseUrl}/profiles/${username}`);
    const venueRequest = useApi(`${baseUrl}/venues`);

    useEffect(() => {
        const fetchData = async () => {
            if (accessToken && username) {
                await request(
                    "GET",
                    undefined,
                    undefined,
                    accessToken || undefined
                );
            }
        };

        fetchData();
    }, [accessToken, username]);

    useEffect(() => {
        if (name === username) setProfileOwner(true);
    }, [name, username]);

    useEffect(() => {
        if (user) {
            setUpdatedProfile({
                bio: user.bio || "",
                avatar: user.avatar || { url: "", alt: "" },
                banner: user.banner || { url: "", alt: "" },
                venueManager: user.venueManager || false,
            });
            setVenueManager(user.venueManager);
        }
    }, [user]);
    const handleSave = async (data: any) => {
        try {
            const updatedProfileData = {
                bio: data.bio,
                banner: { url: data.bannerUrl, alt: data.bannerAlt },
                avatar: { url: data.avatarUrl, alt: data.avatarAlt },
                venueManager: data.venueManager,
            };

            await updateProfileRequest.request(
                "PUT",
                updatedProfileData,
                undefined,
                accessToken || undefined
            );

            setEditing(false);
            await request(
                "GET",
                undefined,
                undefined,
                accessToken || undefined
            );
        } catch (err) {
            <ErrorMessage message={(err as Error).message} />;
        }
    };
    const handleCreateVenue = async (formData: VenueFormData) => {
        try {
            await venueRequest.request(
                "POST",
                formData,
                {},
                accessToken || undefined
            );
            setSuccessMessage("Venue created successfully!");
            closeVenueComponent();
            await request(
                "GET",
                undefined,
                undefined,
                accessToken || undefined
            );
        } catch (err) {
            <Error> {(err as Error).message} </Error>;
        }
    };

    const toggleActiveState = () => setNavbarState(!navbarState);

    if (loading) return <Loading />;
    if (!accessToken)
        return (
            <NotLoggedInContainer>
                <p>Log in to view this profile</p>
                <VenueBookingsButton onClick={toggleActiveState}>
                    Log in
                </VenueBookingsButton>
            </NotLoggedInContainer>
        );
    if (error) return <ErrorMessage message={error.message} />;
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
                <ProfileName>{user?.name}</ProfileName>
                <ProfileBioContainer>
                    <h2>Bio</h2>
                    <p>{user?.bio || "No bio available"}</p>
                    {profileOwner && (
                        <span
                            onClick={() => {
                                setEditing(!editing);
                                setVenueContainer(!true);
                            }}
                        >
                            <IoMdSettings />
                        </span>
                    )}
                </ProfileBioContainer>
                {profileOwner && (
                    <>
                        {venueContainer && !editingVenue
                            ? venueManager && (
                                  <PostVenue
                                      mode="create"
                                      onSubmit={handleCreateVenue}
                                      onClose={closeVenueComponent}
                                      loading={venueRequest.loading}
                                      error={
                                          venueRequest.error
                                              ? {
                                                    message:
                                                        venueRequest.error
                                                            .message,
                                                }
                                              : undefined
                                      }
                                      successMessage={
                                          successMessage || undefined
                                      }
                                  />
                              )
                            : venueManager && (
                                  <VenueBookingsButton
                                      onClick={() => {
                                          openVenueComponent();
                                          setEditing(false);
                                      }}
                                  >
                                      Start creating a venue
                                  </VenueBookingsButton>
                              )}
                    </>
                )}
                {venueManager && (
                    <>
                        {" "}
                        {toggleVenue ? (
                            <ToggleDown onClick={toggleVenueHandler}>
                                Hide Venues
                                <IoEyeOff />
                            </ToggleDown>
                        ) : (
                            <ToggleDown onClick={toggleVenueHandler}>
                                Show Venues
                                <IoEye />
                            </ToggleDown>
                        )}
                        {toggleVenue && (
                            <VenuesContainerStyled>
                                {Array.isArray(user?.venues) &&
                                user.venues.length > 0 ? (
                                    user.venues.map((venue) => (
                                        <VenueCardComponent
                                            key={venue.id}
                                            venue={venue}
                                            showOwner={false}
                                            onEdit={() => {
                                                setEditingVenue(venue);
                                                setVenueContainer(true);
                                            }}
                                        />
                                    ))
                                ) : (
                                    <p>No venues available for this user.</p>
                                )}
                            </VenuesContainerStyled>
                        )}
                    </>
                )}
                {toggleBooking ? (
                    <ToggleDown onClick={toggleBookingHandler}>
                        Hide Bookings
                        <IoEyeOff />
                    </ToggleDown>
                ) : (
                    <ToggleDown onClick={toggleBookingHandler}>
                        Show Bookings
                        <IoEye />
                    </ToggleDown>
                )}
                {toggleBooking && <UserBooking />}
            </ProfileInfo>
            {editing && (
                <EditProfile
                    initialData={{
                        bio: updatedProfile.bio,
                        bannerUrl: updatedProfile.banner.url,
                        bannerAlt: updatedProfile.banner.alt,
                        avatarUrl: updatedProfile.avatar.url,
                        avatarAlt: updatedProfile.avatar.alt,
                        venueManager: updatedProfile.venueManager,
                    }}
                    onSave={handleSave}
                    onCancel={() => setEditing(false)}
                />
            )}
        </ProfileContainer>
    );
}
