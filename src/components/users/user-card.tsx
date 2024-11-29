import { GiPlagueDoctorProfile } from "react-icons/gi";
import {
    FirstRow,
    IfManager,
    SingleUserCard,
    UserImage,
    UserInfo,
} from "../../styles/users/users";
import { User } from "../../types/global";
import { Link } from "react-router-dom";

export function UserCard({ user }: { user: User }) {
    return (
        <SingleUserCard as={Link} to={`/holidaze/profiles/${user.name}`}>
            <UserImage src={`${user.avatar.url}`} alt={`${user.avatar.alt}`} />
            <FirstRow>
                <IfManager>
                    <h2>{user.name}</h2>
                    {user.venueManager && (
                        <div>
                            <GiPlagueDoctorProfile />
                            <p>Manager</p>
                        </div>
                    )}
                </IfManager>
                <UserInfo>
                    <p>
                        <strong>{user.email}</strong>
                    </p>
                    <p>Venues: {user._count.venues}</p>
                    <p>Bookings: {user._count.bookings}</p>
                </UserInfo>
            </FirstRow>
        </SingleUserCard>
    );
}
