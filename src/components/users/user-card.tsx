import {
    FirstRow,
    IfManager,
    Manager,
    SingleUserCard,
    UserImage,
    UserInfo,
} from "../../styles/users/users";
import { User } from "../../types/global";
import { Link } from "react-router-dom";

export function UserCard({ user }: { user: User }) {
    return (
        <SingleUserCard as={Link} to={`/holidaze/profiles/${user.name}`}>
            {user.venueManager && <Manager>Manager</Manager>}
            <UserImage src={`${user.avatar.url}`} alt={`${user.avatar.alt}`} />
            <FirstRow>
                <IfManager>
                    <h2>{user.name}</h2>
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
