/**
 * ProfileLink is a reusable component that renders a profile link with an image and name.
 * It supports hover actions to set the user's name in a global state using Zustand.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {string | null} props.name - The name of the user, displayed as a link text.
 * @param {string | null} props.url - The URL of the user's profile image.
 * @param {string | null} props.alt - The alt text for the user's profile image.
 *
 * @example
 * <ProfileLink
 *   name="John Doe"
 *   url="https://example.com/profile.jpg"
 *   alt="Profile picture of John Doe"
 * />
 */

import { Link } from "react-router-dom";
import { OwnerNameImg } from "../../styles/index";
import { useUserPreferences } from "../../util/global/zustand-store";
type ProfileLinkProps = {
    name: string | null;
    url: string | null;
    alt: string | null;
};
export function ProfileLink({ name, url, alt }: ProfileLinkProps) {
    const setOtherUsersName = useUserPreferences(
        (state) => state.setOtherUsersName
    );

    const handleMouseEnter = (name: string) => {
        setOtherUsersName(name);
    };

    const handleMouseLeave = () => {
        setOtherUsersName(null);
    };
    return (
        <OwnerNameImg
            as={Link}
            to={`/holidaze/profiles/${name}`}
            onMouseEnter={() => name && handleMouseEnter(name)}
            onMouseLeave={handleMouseLeave}
        >
            <img src={url || ""} alt={alt || ""} />
            <p>{name}</p>
        </OwnerNameImg>
    );
}
