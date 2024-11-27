import { useEffect, useState } from "react";
import { useApi } from "../../../util/hooks/use-fetch";
import { BookingContainer, Error } from "../../../styles/index";
import { BookingList } from "./booking-list";
import { UserBookingTypes } from "../../../types/global";
import { baseUrl } from "../../../util/global/variables";
import { Loading } from "../../global/loading";
import ConfirmationModal from "../../global/confirmation";

export function UserBooking() {
    const apiToken = localStorage.getItem("accessToken");
    const userProfileName = localStorage.getItem("otherUsersName");
    const [profileOwner, setProfileOwner] = useState(false);
    const name = localStorage.getItem("name");
    const [editingBooking, setEditingBooking] =
        useState<UserBookingTypes | null>(null);
    const [editDateRange, setEditDateRange] = useState<[Date, Date] | null>(
        null
    );
    const [editGuests, setEditGuests] = useState(1);
    const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [bookingToDelete, setBookingToDelete] = useState<string | null>(null);

    const {
        data: user,
        loading,
        error,
        request: apiRequest,
    } = useApi<UserBookingTypes[]>(
        `${baseUrl}/profiles/${userProfileName}/bookings?_venue=true`
    );
    const deleteRequest = useApi(`${baseUrl}/bookings`);
    const updateRequest = useApi(`${baseUrl}/bookings`);

    useEffect(() => {
        if (name === userProfileName) {
            setProfileOwner(true);
        }
    }, [name, userProfileName]);

    useEffect(() => {
        const fetchData = async () => {
            if (apiToken) {
                await apiRequest("GET", undefined, undefined, apiToken);
            }
        };
        fetchData();
    }, [apiToken]);

    useEffect(() => {
        if (user) {
            const bookedDates = user.flatMap(({ dateFrom, dateTo }) => {
                const start = new Date(dateFrom);
                const end = new Date(dateTo);
                const dates = [];
                for (
                    let d = new Date(start);
                    d <= end;
                    d.setDate(d.getDate() + 1)
                ) {
                    dates.push(new Date(d));
                }
                return dates;
            });
            setUnavailableDates(bookedDates);
        }
    }, [user]);

    const confirmDelete = async () => {
        if (apiToken && bookingToDelete) {
            try {
                await deleteRequest.request(
                    "DELETE",
                    undefined,
                    {
                        url: `${baseUrl}/bookings/${bookingToDelete}`,
                    },
                    apiToken
                );
                setBookingToDelete(null);
                setDeleteConfirmationOpen(false);
                await apiRequest("GET", undefined, undefined, apiToken);
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleDelete = (bookingId: string) => {
        setBookingToDelete(bookingId);
        setDeleteConfirmationOpen(true);
    };

    const handleEdit = (booking: UserBookingTypes) => {
        setEditingBooking(booking);
        setEditDateRange([
            new Date(booking.dateFrom),
            new Date(booking.dateTo),
        ]);
        setEditGuests(booking.guests);
    };

    const handleSaveChanges = async () => {
        if (editingBooking && editDateRange && apiToken) {
            const [dateFrom, dateTo] = editDateRange;

            const updatedBooking = {
                dateFrom: dateFrom.toISOString(),
                dateTo: dateTo.toISOString(),
                guests: editGuests,
            };

            try {
                await updateRequest.request(
                    "PUT",
                    updatedBooking,
                    {
                        url: `${baseUrl}/bookings/${editingBooking.id}`,
                    },
                    apiToken
                );
                setEditingBooking(null);
                await apiRequest("GET", undefined, undefined, apiToken);
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleCancelEdit = () => {
        setEditingBooking(null);
        setEditDateRange(null);
        setEditGuests(1);
    };

    const isDateUnavailable = (date: Date): boolean => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return (
            unavailableDates.some(
                (unavailableDate) =>
                    unavailableDate.toDateString() === date.toDateString()
            ) || date < today
        );
    };

    const formatDate = (isoString: string) => {
        if (!isoString) return "Unknown Date";
        return new Date(isoString).toLocaleString("en-US", {
            dateStyle: "medium",
        });
    };
    const isPastDate = (date: Date): boolean => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    if (loading) return <Loading />;
    if (error) return <Error> {(error as Error).message} </Error>;

    return (
        <BookingContainer>
            <BookingList
                bookings={user || []}
                profileOwner={profileOwner}
                editingBooking={editingBooking}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handleSaveChanges={handleSaveChanges}
                handleCancelEdit={handleCancelEdit}
                editDateRange={editDateRange}
                setEditDateRange={setEditDateRange}
                editGuests={editGuests}
                setEditGuests={setEditGuests}
                isDateUnavailable={isDateUnavailable}
                formatDate={formatDate}
                isPastDate={isPastDate}
            />
            <ConfirmationModal
                isOpen={deleteConfirmationOpen}
                message="Are you sure you want to delete this booking?"
                onConfirm={confirmDelete}
                onCancel={() => setDeleteConfirmationOpen(false)}
            />
        </BookingContainer>
    );
}
