import { Link } from "react-router-dom";
import {
    CardInfo,
    BookingCardImage,
    BookingDelete,
    ViewVenue,
    GuestsNumber,
} from "../../../styles/index";
import { MdDelete } from "react-icons/md";
import { UserBookingTypes } from "../../../types/global";

export function BookingCardComponent({
    booking,
    profileOwner,
    handleDelete,
    handleEdit,
    formatDate,
}: {
    booking: UserBookingTypes;
    profileOwner: boolean;
    handleDelete: (id: string) => void;
    handleEdit: (booking: UserBookingTypes) => void;
    formatDate: (isoString: string) => string;
}) {
    return (
        <CardInfo>
            <Link to={`/holidaze/venues/${booking.venue.id}`}>
                <BookingCardImage
                    src={booking.venue.media[0]?.url || ""}
                    alt={booking.venue.name || "Venue Image"}
                />
            </Link>
            <div>
                <h2>{booking.venue.name}</h2>
                <p>Created: {formatDate(booking.created)}</p>
                <p>Date From: {formatDate(booking.dateFrom)}</p>
                <p>Date To: {formatDate(booking.dateTo)}</p>
                {profileOwner && (
                    <BookingDelete onClick={() => handleDelete(booking.id)}>
                        <MdDelete />
                    </BookingDelete>
                )}
                <ViewVenue>
                    <GuestsNumber>Guests: {booking.guests}</GuestsNumber>
                    {profileOwner && (
                        <a onClick={() => handleEdit(booking)}>Edit</a>
                    )}
                </ViewVenue>
            </div>
        </CardInfo>
    );
}
