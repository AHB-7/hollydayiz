import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BookingStore {
    bookingIds: string[];
    setBookingIds: (ids: string[]) => void;
}

export const useBookingStore = create<BookingStore>()(
    persist(
        (set) => ({
            bookingIds: [],
            setBookingIds: (ids) => set({ bookingIds: ids }),
        }),
        {
            name: "booking-storage",
        }
    )
);
