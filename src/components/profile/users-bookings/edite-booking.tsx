import CalendarComponent from "../../global/calender";
import {
    EditContainer,
    GuestNumber,
    GuestNumberContainer,
} from "../../../styles/index";

export function EditBookingForm({
    editDateRange,
    setEditDateRange,
    editGuests,
    setEditGuests,
    handleSaveChanges,
    handleCancelEdit,
    isDateUnavailable,
}: {
    editDateRange: [Date, Date] | null;
    setEditDateRange: (range: [Date, Date] | null) => void;
    editGuests: number;
    setEditGuests: (guests: number) => void;
    handleSaveChanges: () => void;
    handleCancelEdit: () => void;
    isDateUnavailable: (date: Date) => boolean;
}) {
    return (
        <div>
            <h3>Edit Booking Details</h3>
            <CalendarComponent
                dateRange={editDateRange}
                setDateRange={setEditDateRange}
                isDateUnavailable={isDateUnavailable}
                getTileClassName={({ date }) =>
                    isDateUnavailable(date) ? "unavailable" : ""
                }
            />
            <div>
                <GuestNumberContainer>
                    <label>Guests: </label>
                    <GuestNumber
                        value={editGuests}
                        onChange={(e) => setEditGuests(Number(e.target.value))}
                    >
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(
                            (guest) => (
                                <option key={guest} value={guest}>
                                    {guest}
                                </option>
                            )
                        )}
                    </GuestNumber>
                </GuestNumberContainer>
            </div>
            <EditContainer>
                <span onClick={handleCancelEdit}>Cancel</span>
                <p onClick={handleSaveChanges}>Save Changes</p>
            </EditContainer>
        </div>
    );
}
