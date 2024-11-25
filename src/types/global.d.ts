import { AxiosRequestConfig, Method } from "axios";

export type RegistrationFormData = {
    name: string;
    email: string;
    password: string;
    bio: string;
    avatarUrl?: string;
    avatarAlt?: string;
    bannerUrl?: string;
    bannerAlt?: string;
    venueManager: boolean;
};
export type LoginFormData = Pick<RegistrationFormData, "email" | "password">;

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
        avatar: {
            url: string;
            alt: string;
        };
    };
    created: string;
    updated: string;
    bookings: {
        id: string;
        dateFrom: string;
        dateTo: string;
        guests: number;
        created: string;
        updated: string;
    }[];
};
export type SingleVenueType = {
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
    created: string;
    updated: string;
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
    venueManager: boolean;
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
    otherUsersName: string | null;
    venueManager: boolean;
    venueContainer: boolean;
    setName: (name: string | null) => void;
    setVenueManager: (venueManager: boolean) => void;
    setMail: (mail: string | null) => void;
    setAccessToken: (token: string | null) => void;
    setNavbarState: (state: boolean) => void;
    setOtherUsersName: (name: string | null) => void;
    initializeFromStorage: () => void;
    setVenueContainer: (venueContainer: boolean) => void;
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
    venues: Accommodation[];
    _count: {
        bookings: number;
        venues: number;
    };
    meta: any;
}
export type BookingProps = {
    maxGuests: number | undefined;
    price: number | undefined;
    venueData: {
        bookings: {
            dateFrom: string;
            dateTo: string;
            id: string;
            guests: number;
        }[];
    } | null;
};
export type UserBookingTypes = {
    id: string;
    dateFrom: string;
    dateTo: string;
    guests: number;
    created: string;
    updated: string;
    venue: {
        id: string;
        name: string;
        description: string;
        media: { url: string; alt: string }[];
    };
};
export interface Media {
    url: string;
    alt: string;
}

export interface Meta {
    wifi: boolean;
    parking: boolean;
    breakfast: boolean;
    pets: boolean;
}

export interface Location {
    address: string;
    city: string;
    zip: string;
    country: string;
    continent: string;
    lat: number;
    lng: number;
}

export interface VenueFormData {
    name: string;
    description: string;
    media: Media[];
    price: number;
    maxGuests: number;
    rating: number;
    meta: Meta;
    location: Location;
    [key: string]: unknown;
}

export const defaultVenueFormValues: VenueFormData = {
    name: "",
    description: "",
    media: [{ url: "", alt: "" }],
    price: 0,
    maxGuests: 0,
    rating: 0,
    meta: {
        wifi: false,
        parking: false,
        breakfast: false,
        pets: false,
    },
    location: {
        address: "",
        city: "",
        zip: "",
        country: "",
        continent: "",
        lat: 0,
        lng: 0,
    },
};
