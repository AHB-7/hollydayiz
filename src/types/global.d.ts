import { AxiosRequestConfig, Method } from "axios";

export type Accommodation = {
    id: string;
    name: string;
    description: string;
    media: {
        url: string;
        alt: string;
    }[];
    price: number;
    maxGuests: number;
    rating: number;
    created: string;
    updated: string;
    meta: {
        wifi: boolean;
        parking: boolean;
        breakfast: boolean;
        pets: boolean;
    };
    location: {
        address: string;
        city: string;
        zip: string;
        country: string;
        continent: string;
        lat: number;
        lng: number;
    };
    owner: {
        name: string;
        email: string;
        avatar: {
            url: string;
            alt: string;
        };
    };
    _count: {
        bookings: number;
    };
};
export type SingleVenue = {
    id: string;
    name: string;
    description: string;
    media: {
        url: string;
        alt: string;
    }[];
    price: number;
    maxGuests: number;
    rating: number;
    created: string;
    updated: string;
    meta: {
        wifi: boolean;
        parking: boolean;
        breakfast: boolean;
        pets: boolean;
    };
    location: {
        address: string;
        city: string;
        zip: string;
        country: string;
        continent: string;
        lat: number;
        lng: number;
    };
    owner: {
        name: string;
        email: string;
        avatar: string;
    };
    bookings: {
        id: string;
        dateFrom: string;
        dateTo: string;
        guests: number;
        created: string;
        updated: string;
    }[];
};

export interface StarsProps {
    rating: number;
}

export interface FetchResult<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
}

export interface FetchOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: Record<string, unknown>;
    accessToken?: string;
    apiKey?: string;
    config?: AxiosRequestConfig;
}
export type LoginFormData = {
    email: string;
    password: string;
};

export interface UseApiReturn<T> extends FetchResult<T> {
    request: (
        method: Method,
        body?: Record<string, unknown>,
        config?: AxiosRequestConfig,
        token?: string
    ) => Promise<void>;
}
export type ApiResponseLogin = {
    name: string;
    email: string;
    bio: string | null;
    avatar: {
        url: string;
        alt: string;
    };
    banner: {
        url: string;
        alt: string;
    };
    accessToken: string;
};
export type ApiResponseRegister = {
    name: string;
    email: string;
    bio: string | null;
    avatar: {
        url: string;
        alt: string;
    };
    banner: {
        url: string;
        alt: string;
    };
    venueManager: boolean;
    meta: any;
};
export interface Store {
    accessToken: string | null;
    navbarState: boolean;
    mail: string | null;
    name: string | null;
    setName: (name: string | null) => void;
    setMail: (mail: string | null) => void;
    setAccessToken: (token: string | null) => void;
    setNavbarState: (state: boolean) => void;
    initializeFromStorage: () => void;
}
export interface SingleUser {
    name: string;
    email: string;
    bio: string | null;
    avatar: {
        url: string;
        alt: string;
    };
    banner: {
        url: string;
        alt: string;
    };
    venueManager: boolean;
    meta: any;
}
