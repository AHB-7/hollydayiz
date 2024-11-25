import { Link } from "react-router-dom";
import { OwnerNameImg } from "../../../styles/index";
import { useUserPreferences } from "../../../util/global/zustand-store";
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
