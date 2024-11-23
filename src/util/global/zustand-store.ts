import { create } from "zustand";
import { Store } from "../../types/global";

/**
 * Zustand store for managing global state with persistent localStorage integration.
 *
 * State variables:
 * - `accessToken`: Authentication token for the user.
 * - `navbarState`: Boolean indicating if the navbar is open or closed.
 * - `mail`: Email address of the user.
 * - `name`: Name of the user.
 * - `otherUsersName`: Stores the name of the profile being viewed.
 * - `venueManager`: Boolean indicating if the user is a venue manager.
 *
 * Methods:
 * - `setAccessToken`: Updates and persists the authentication token.
 * - `setNavbarState`: Updates and persists the navbar's visibility state.
 * - `setMail`: Updates and persists the user's email.
 * - `setName`: Updates and persists the user's name.
 * - `setOtherUsersName`: Updates the name of the profile being viewed.
 * - `setVenueManager`: Updates and persists the venue manager status.
 * - `initializeFromStorage`: Initializes the state from localStorage values.
 */
export const useUserPreferences = create<Store>((set) => ({
    accessToken: null,
    navbarState: false,
    mail: null,
    name: null,
    otherUsersName: null,
    venueManager: false,

    setAccessToken: (token: string | null) => {
        if (token) {
            localStorage.setItem("accessToken", token);
        } else {
            localStorage.removeItem("accessToken");
        }
        set({ accessToken: token });
    },

    setNavbarState: (state: boolean) => {
        localStorage.setItem("navbarState", JSON.stringify(state));
        set({ navbarState: state });
    },

    setMail: (mail: string | null) => {
        if (mail) {
            localStorage.setItem("mail", mail);
        } else {
            localStorage.removeItem("mail");
        }
        set({ mail });
    },

    setName: (name: string | null) => {
        if (name) {
            localStorage.setItem("name", name);
        } else {
            localStorage.removeItem("name");
        }
        set({ name });
    },

    setOtherUsersName: (name: string | null) => {
        if (name) {
            localStorage.setItem("otherUsersName", name);
        } else {
            localStorage.removeItem("otherUsersName");
        }
        set({ otherUsersName: name });
    },

    setVenueManager: (venueManager: boolean) => {
        localStorage.setItem("venueManager", JSON.stringify(venueManager));
        set({ venueManager });
    },

    initializeFromStorage: () => {
        set({
            accessToken: localStorage.getItem("accessToken"),
            navbarState:
                localStorage.getItem("navbarState") === "true" || false,
            mail: localStorage.getItem("mail"),
            name: localStorage.getItem("name"),
            otherUsersName: localStorage.getItem("otherUsersName"),
            venueManager: localStorage.getItem("venueManager") === "true",
        });
    },
}));
