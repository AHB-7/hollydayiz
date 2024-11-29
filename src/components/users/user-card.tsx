import { GiPlagueDoctorProfile } from "react-icons/gi";
import { FirstRow, SecondRow, SingleUserCard } from "../../styles/users/users";
import { ProfileLink } from "../global/link-to-profiles";

export function UserCard({ user }: { user: any }) {
    return (
        <SingleUserCard backgroundImage={`${user.banner.url}`}>
            <FirstRow>
                <ProfileLink
                    name={user.name}
                    url={user.avatar.url}
                    alt={user.name.alt}
                />{" "}
                {user.venueManager && (
                    <div>
                        <p>Manager</p>
                        <GiPlagueDoctorProfile />
                    </div>
                )}
            </FirstRow>
            <p>
                <strong>{user.email}</strong>
            </p>
            <SecondRow>
                <p>Venues: {user._count.venues}</p>
                <p>Bookings: {user._count.bookings}</p>
            </SecondRow>
        </SingleUserCard>
    );
}
