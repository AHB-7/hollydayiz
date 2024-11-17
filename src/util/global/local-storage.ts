import { create } from "zustand";
import { Store } from "../../types/global.types";

export const useStore = create<Store>((set) => ({
    accessToken: null,
    navbarState: false,
    mail: null,

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

    initializeFromStorage: () => {
        set({
            accessToken: localStorage.getItem("accessToken"),
            navbarState: JSON.parse(
                localStorage.getItem("navbarState") || "false"
            ),
            mail: localStorage.getItem("mail"),
        });
    },
}));
