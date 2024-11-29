import { VenueCard, VenueInfoContainer } from "../../styles/index";
import { ProfileLink } from "../global/link-to-profiles";

export function ProfilesCardsLinks({
    profile,
}: {
    profile: {
        name: string;
        avatar: { url: string; alt: string };
        email: string;
    };
}) {
    const { name, avatar, email } = profile;

    return (
        <VenueCard>
            <VenueInfoContainer>
                <ProfileLink
                    name={name}
                    url={avatar?.url || "/default-avatar.jpg"}
                    alt={avatar?.alt || `Profile picture of ${name}`}
                />
                <p>{email}</p>
            </VenueInfoContainer>
        </VenueCard>
    );
}
