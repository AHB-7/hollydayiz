import { create } from "zustand";
import { Store } from "../../types/global";

/**
 * Zustand store for managing user preferences and global application state.
 *
 * This store provides persistent state management by integrating `localStorage` to save and retrieve values.
 * The state includes user-specific data such as authentication, profile details, and application preferences.
 *
 * ### State Variables:
 * - **`accessToken`**: Authentication token for the user.
 *   - **Type**: `string | null`
 *   - **Description**: Stores the user's access token for API authentication.
 *   - **Persistence**: Saved to `localStorage` with key `"accessToken"`.
 *
 * - **`navbarState`**: Tracks the visibility of the navigation bar.
 *   - **Type**: `boolean`
 *   - **Description**: `true` if the navigation bar is open; otherwise, `false`.
 *   - **Persistence**: Saved to `localStorage` with key `"navbarState"`.
 *
 * - **`mail`**: The user's email address.
 *   - **Type**: `string | null`
 *   - **Description**: Email address of the authenticated user.
 *   - **Persistence**: Saved to `localStorage` with key `"mail"`.
 *
 * - **`name`**: The user's name.
 *   - **Type**: `string | null`
 *   - **Description**: Name of the authenticated user.
 *   - **Persistence**: Saved to `localStorage` with key `"name"`.
 *
 * - **`otherUsersName`**: Tracks the name of another user's profile being viewed.
 *   - **Type**: `string | null`
 *   - **Description**: Name of the profile currently being interacted with.
 *   - **Persistence**: Saved to `localStorage` with key `"otherUsersName"`.
 *
 * - **`venueManager`**: Indicates whether the user is a venue manager.
 *   - **Type**: `boolean`
 *   - **Description**: `true` if the user manages venues; otherwise, `false`.
 *   - **Persistence**: Saved to `localStorage` with key `"venueManager"`.
 *
 * - **`venueContainer`**: Tracks the state of the venue container.
 *   - **Type**: `boolean`
 *   - **Description**: Custom state for managing venue-related container visibility or logic.
 *   - **Persistence**: Saved to `localStorage` with key `"venueContainer"`.
 *
 * ### Methods:
 * - **`setAccessToken(token: string | null)`**:
 *   - **Description**: Updates and persists the user's authentication token.
 *   - **Parameters**: `token` - The access token or `null` to remove it.
 *   - **Example**:
 *     ```typescript
 *     const { setAccessToken } = useUserPreferences();
 *     setAccessToken("abcd1234"); // Save token
 *     setAccessToken(null); // Remove token
 *     ```
 *
 * - **`setNavbarState(state: boolean)`**:
 *   - **Description**: Updates and persists the navigation bar's visibility state.
 *   - **Parameters**: `state` - `true` to show the navbar; `false` to hide it.
 *   - **Example**:
 *     ```typescript
 *     const { setNavbarState } = useUserPreferences();
 *     setNavbarState(true); // Open navbar
 *     setNavbarState(false); // Close navbar
 *     ```
 *
 * - **`setMail(mail: string | null)`**:
 *   - **Description**: Updates and persists the user's email address.
 *   - **Parameters**: `mail` - The user's email address or `null` to remove it.
 *   - **Example**:
 *     ```typescript
 *     const { setMail } = useUserPreferences();
 *     setMail("user@example.com"); // Save email
 *     setMail(null); // Remove email
 *     ```
 *
 * - **`setName(name: string | null)`**:
 *   - **Description**: Updates and persists the user's name.
 *   - **Parameters**: `name` - The user's name or `null` to remove it.
 *   - **Example**:
 *     ```typescript
 *     const { setName } = useUserPreferences();
 *     setName("John Doe"); // Save name
 *     setName(null); // Remove name
 *     ```
 *
 * - **`setOtherUsersName(name: string | null)`**:
 *   - **Description**: Updates the name of another user's profile being viewed.
 *   - **Parameters**: `name` - The name of the other user or `null` to clear it.
 *   - **Example**:
 *     ```typescript
 *     const { setOtherUsersName } = useUserPreferences();
 *     setOtherUsersName("Jane Smith"); // Save name
 *     setOtherUsersName(null); // Clear name
 *     ```
 *
 * - **`setVenueManager(venueManager: boolean)`**:
 *   - **Description**: Updates and persists whether the user is a venue manager.
 *   - **Parameters**: `venueManager` - `true` if the user is a venue manager; otherwise, `false`.
 *   - **Example**:
 *     ```typescript
 *     const { setVenueManager } = useUserPreferences();
 *     setVenueManager(true); // User is a venue manager
 *     setVenueManager(false); // User is not a venue manager
 *     ```
 *
 * - **`setVenueContainer(venueContainer: boolean)`**:
 *   - **Description**: Updates the state of the venue container.
 *   - **Parameters**: `venueContainer` - `true` or `false`.
 *   - **Example**:
 *     ```typescript
 *     const { setVenueContainer } = useUserPreferences();
 *     setVenueContainer(true); // Update state
 *     ```
 *
 * - **`initializeFromStorage()`**:
 *   - **Description**: Initializes the store's state from `localStorage` values.
 *   - **Example**:
 *     ```typescript
 *     const { initializeFromStorage } = useUserPreferences();
 *     initializeFromStorage(); // Load initial state
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
