import { create } from "zustand";
import { Store } from "../../types/global";
/**
 * Zustand store for managing global state with persistent localStorage integration.
 *
 * This store includes the following state variables:
 * - `accessToken`: The authentication token for the user.
 * - `navbarState`: Boolean indicating if the navbar is open or closed.
 * - `mail`: The email address of the user.
 * - `name`: The name of the user.
 *
 * The store also provides the following methods:
 * - `setAccessToken`: Sets the authentication token and persists it in localStorage.
 * - `setNavbarState`: Toggles or sets the navbar's visibility and saves it to localStorage.
 * - `setMail`: Stores the user's email in the state and localStorage.
 * - `setName`: Stores the user's name in localStorage.
 * - `initializeFromStorage`: Loads the state variables from localStorage into the store.
 *
 * Usage example:
 * ```javascript
 * import { useStore } from "./path/to/store";
 *
 * const Component = () => {
 *     const { accessToken, setAccessToken, initializeFromStorage } = useStore();
 *
 *     useEffect(() => {
 *         initializeFromStorage();
 *     }, []);
 *
 *     return <div>{accessToken ? "Logged in" : "Logged out"}</div>;
 * };
 * ```
 */
export const useStore = create<Store>((set) => ({
    accessToken: null,
    navbarState: false,
    mail: null,
    name: null,

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
        set({ mail: mail });
    },
    setName: (name: string | null) => {
        if (name) {
            localStorage.setItem("name", name);
        } else {
            localStorage.removeItem("name");
        }
    },

    initializeFromStorage: () => {
        set({
            accessToken: localStorage.getItem("accessToken"),
            navbarState: JSON.parse(
                localStorage.getItem("navbarState") || "false"
            ),
            mail: localStorage.getItem("mail"),
            name: localStorage.getItem("name"),
        });
    },
}));
