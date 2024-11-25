import { Link } from "react-router-dom";
import {
    CardInfo,
    BookingCardImage,
    BookingDelete,
    ViewVenue,
    GuestsNumber,
    PastDate,
    NormalDate,
    MdDelete,
} from "../../../styles/index";
import { UserBookingTypes } from "../../../types/global";

export function BookingCardComponent({
    booking,
    profileOwner,
    handleDelete,
    handleEdit,
    formatDate,
    isPastDate,
}: {
    booking: UserBookingTypes;
    profileOwner: boolean;
    handleDelete: (id: string) => void;
    handleEdit: (booking: UserBookingTypes) => void;
    formatDate: (isoString: string) => string;
    isPastDate: (date: Date) => boolean;
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
                <p>
                    Date From:{" "}
                    {isPastDate(new Date(booking.dateFrom)) ? (
                        <PastDate>{formatDate(booking.dateFrom)}</PastDate>
                    ) : (
                        <NormalDate>{formatDate(booking.dateFrom)}</NormalDate>
                    )}
                </p>
                <p>
                    Date To:{" "}
                    {isPastDate(new Date(booking.dateTo)) ? (
                        <PastDate>{formatDate(booking.dateTo)}</PastDate>
                    ) : (
                        <NormalDate>{formatDate(booking.dateTo)}</NormalDate>
                    )}
                </p>
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
