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
import { SingleUser } from "../../types/global.types";
import { useEffect } from "react";

export function SingleProfile() {
    const profilename = localStorage.getItem("name");
    const apiToken = localStorage.getItem("accessToken");

    const {
        data: user,
        loading,
        error,
        request,
    } = useApi<SingleUser>(
        `https://v2.api.noroff.dev/holidaze/profiles/${profilename}`
    );

    useEffect(() => {
        const fetchData = async () => {
            await request("GET", undefined, undefined, `${apiToken}`);
        };

        fetchData();
    }, []);
    useEffect(() => {}, [user]);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return (
        <ProfileContainer>
            <ProfileBannerContainer>
                <ProfileBannerImage
                    src={user?.banner.url}
                    alt={user?.banner.alt}
                />
                <ProfileAvatar src={user?.avatar.url} alt={user?.avatar.alt} />
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
