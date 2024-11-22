import { Link } from "react-router-dom";
import { OwnerNameImg } from "../../styles/venues/cards";
import { useStore } from "../../util/global/zustand-store";
type ProfileLinkProps = {
    name: string | null;
    url: string | null;
    alt: string | null;
};
export function PorfileLink({ name, url, alt }: ProfileLinkProps) {
    const setOtherUsersName = useStore((state) => state.setOtherUsersName);

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
