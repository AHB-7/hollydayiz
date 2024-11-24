import { BookingCard } from "../../../styles/index";
import { BookingCardComponent } from "./booking-card";
import { EditBookingForm } from "./edite-booking";
import { UserBookingTypes } from "../../../types/global";

export function BookingList({
    bookings,
    profileOwner,
    editingBooking,
    handleDelete,
    handleEdit,
    handleSaveChanges,
    handleCancelEdit,
    editDateRange,
    setEditDateRange,
    editGuests,
    setEditGuests,
    isDateUnavailable,
    formatDate,
}: {
    bookings: UserBookingTypes[];
    profileOwner: boolean;
    editingBooking: UserBookingTypes | null;
    handleDelete: (id: string) => void;
    handleEdit: (booking: UserBookingTypes) => void;
    handleSaveChanges: () => void;
    handleCancelEdit: () => void;
    editDateRange: [Date, Date] | null;
    setEditDateRange: (range: [Date, Date] | null) => void;
    editGuests: number;
    setEditGuests: (guests: number) => void;
    isDateUnavailable: (date: Date) => boolean;
    formatDate: (isoString: string) => string;
}) {
    return (
        <>
            {bookings.map((booking) => (
                <BookingCard key={booking.id}>
                    <BookingCardComponent
                        booking={booking}
                        profileOwner={profileOwner}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        formatDate={formatDate}
                    />
                    {editingBooking?.id === booking.id && (
                        <EditBookingForm
                            editDateRange={editDateRange}
                            setEditDateRange={setEditDateRange}
                            editGuests={editGuests}
                            setEditGuests={setEditGuests}
                            handleSaveChanges={handleSaveChanges}
                            handleCancelEdit={handleCancelEdit}
                            isDateUnavailable={isDateUnavailable}
                        />
                    )}
                </BookingCard>
            ))}
        </>
    );
}
