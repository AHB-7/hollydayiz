// Shared Types
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

// User Types
export interface User {
    id: number;
    name: string;
    email: string;
    avatar: Media;
    banner: Media;
    venueManager: boolean;
    _count: {
        venues: number;
        bookings: number;
    };
    venues?: Accommodation[];
    bookings?: Booking[];
    bio?: string | null;
}

export interface SingleUser extends User {
    venues: Accommodation[];
    bookings?: Booking[];
    meta: Record<string, unknown>;
}

// Booking Types
export interface Customer {
    name: string;
    email: string;
    bio: string | null;
    avatar: Media;
    banner?: Media;
}

export type Booking = {
    id: string;
    dateFrom: string;
    dateTo: string;
    guests: number;
    created: string;
    updated: string;
    customer: Customer;
};

export type UserBookingTypes = Omit<Booking, "customer"> & {
    venue: Pick<
        Accommodation,
        "id" | "name" | "description" | "media" | "maxGuests"
    >;
};

export type BookingProps = {
    maxGuests: number | undefined;
    price: number | undefined;
    venueData: {
        bookings: Pick<Booking, "dateFrom" | "dateTo" | "id" | "guests">[];
    } | null;
};

// Venue Types
export interface Accommodation {
    id: string;
    name: string;
    description: string;
    media: Media[];
    price: number;
    maxGuests: number;
    rating: number;
    created: string;
    updated: string;
    meta: Meta;
    location: Location;
    owner: Pick<User, "name" | "email" | "avatar">;
    _count: {
        bookings: number;
    };
}

export type SingleVenue = Accommodation & {
    bookings: Booking[];
};

export type SingleVenueType = Accommodation & {
    bookings: Booking[];
};

// Form Data Types
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

export interface VenueFormData
    extends Omit<
        Accommodation,
        "id" | "owner" | "created" | "updated" | "_count"
    > {
    [key: string]: unknown;
}

// Props Interfaces
export interface ConfirmationModalProps {
    isOpen: boolean;
    message: string;
    onConfirm: (formData?: VenueFormData) => void;
    onCancel: () => void;
}

export interface SortingComponentProps {
    onSortChange: (
        sort: "created" | "name" | "price" | "rating",
        sortOrder: "asc" | "desc"
    ) => void;
    defaultSort?: "created" | "name" | "price" | "rating";
    defaultSortOrder?: "asc" | "desc";
}

export interface CalendarComponentProps {
    dateRange: [Date, Date] | null;
    setDateRange: (range: [Date, Date]) => void;
    isDateUnavailable: (date: Date) => boolean;
    getTileClassName: ({ date }: { date: Date }) => string;
}

export interface StarsProps {
    rating: number;
}

// API and Fetch Types
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

export type ApiResponseBase = {
    name: string;
    email: string;
    bio: string | null;
    avatar: Media;
    banner: Media;
    venueManager: boolean;
};

export type ApiResponseLogin = ApiResponseBase & { accessToken: string };
export type ApiResponseRegister = ApiResponseBase & {
    meta: Record<string, unknown>;
};

// Store Interface
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

// Default Values
export const defaultMedia: Media = { url: "", alt: "" };

export const defaultMeta: Meta = {
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
};

export const defaultLocation: Location = {
    address: "",
    city: "",
    zip: "",
    country: "",
    continent: "",
    lat: 0,
    lng: 0,
};

export const defaultVenueFormValues: VenueFormData = {
    name: "",
    description: "",
    media: [defaultMedia],
    price: 0,
    maxGuests: 0,
    rating: 0,
    meta: defaultMeta,
    location: defaultLocation,
};
