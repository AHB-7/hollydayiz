import { create } from "zustand";
import { Store } from "../../types/global";

/**
 * Zustand store for managing global state with persistent localStorage integration.
 *
 * ### State Variables:
 *
 * - **`accessToken`**:
 *   - Description: Authentication token for the user.
 *   - Type: `string | null`
 *   - Example:
 *     ```typescript
 *     const { accessToken } = useUserPreferences();
 *     console.log(accessToken); // "abcd1234" or null
 *     ```
 *
 * - **`navbarState`**:
 *   - Description: Boolean indicating if the navbar is open or closed.
 *   - Type: `boolean`
 *   - Example:
 *     ```typescript
 *     const { navbarState } = useUserPreferences();
 *     console.log(navbarState); // true or false
 *     ```
 *
 * - **`mail`**:
 *   - Description: Email address of the user.
 *   - Type: `string | null`
 *   - Example:
 *     ```typescript
 *     const { mail } = useUserPreferences();
 *     console.log(mail); // "user@example.com" or null
 *     ```
 *
 * - **`name`**:
 *   - Description: Name of the user.
 *   - Type: `string | null`
 *   - Example:
 *     ```typescript
 *     const { name } = useUserPreferences();
 *     console.log(name); // "John Doe" or null
 *     ```
 *
 * - **`otherUsersName`**:
 *   - Description: Stores the name of the profile being viewed.
 *   - Type: `string | null`
 *   - Example:
 *     ```typescript
 *     const { otherUsersName } = useUserPreferences();
 *     console.log(otherUsersName); // "Jane Smith" or null
 *     ```
 *
 * - **`venueManager`**:
 *   - Description: Boolean indicating if the user is a venue manager.
 *   - Type: `boolean`
 *   - Example:
 *     ```typescript
 *     const { venueManager } = useUserPreferences();
 *     console.log(venueManager); // true or false
 *     ```
 *
 * ### Methods:
 *
 * - **`setAccessToken(token: string | null)`**:
 *   - Description: Updates and persists the authentication token in `localStorage`.
 *   - Example:
 *     ```typescript
 *     const { setAccessToken } = useUserPreferences();
 *     setAccessToken("abcd1234"); // Save token
 *     setAccessToken(null); // Remove token
 *     ```
 *
 * - **`setNavbarState(state: boolean)`**:
 *   - Description: Updates and persists the navbar's visibility state.
 *   - Example:
 *     ```typescript
 *     const { setNavbarState } = useUserPreferences();
 *     setNavbarState(true); // Navbar is open
 *     setNavbarState(false); // Navbar is closed
 *     ```
 *
 * - **`setMail(mail: string | null)`**:
 *   - Description: Updates and persists the user's email in `localStorage`.
 *   - Example:
 *     ```typescript
 *     const { setMail } = useUserPreferences();
 *     setMail("user@example.com"); // Save email
 *     setMail(null); // Remove email
 *     ```
 *
 * - **`setName(name: string | null)`**:
 *   - Description: Updates and persists the user's name in `localStorage`.
 *   - Example:
 *     ```typescript
 *     const { setName } = useUserPreferences();
 *     setName("John Doe"); // Save name
 *     setName(null); // Remove name
 *     ```
 *
 * - **`setOtherUsersName(name: string | null)`**:
 *   - Description: Updates the name of the profile being viewed.
 *   - Example:
 *     ```typescript
 *     const { setOtherUsersName } = useUserPreferences();
 *     setOtherUsersName("Jane Smith"); // Save other user's name
 *     setOtherUsersName(null); // Remove other user's name
 *     ```
 *
 * - **`setVenueManager(venueManager: boolean)`**:
 *   - Description: Updates and persists the venue manager status.
 *   - Example:
 *     ```typescript
 *     const { setVenueManager } = useUserPreferences();
 *     setVenueManager(true); // User is a venue manager
 *     setVenueManager(false); // User is not a venue manager
 *     ```
 *
 * - **`initializeFromStorage()`**:
 *   - Description: Initializes the state from `localStorage` values.
 *   - Example:
 *     ```typescript
 *     const { initializeFromStorage } = useUserPreferences();
 *     initializeFromStorage(); // Load initial state from localStorage
 *     ```
 */
export const useUserPreferences = create<Store>((set) => ({
    accessToken: null,
    navbarState: false,
    mail: null,
    name: null,
    otherUsersName: null,
    venueManager: false,
    venueContainer: false,

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

    setVenueContainer: (venueContainer: boolean) => {
        set({ venueContainer });
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
            venueContainer: localStorage.getItem("venueContainer") === "true",
        });
    },
}));
