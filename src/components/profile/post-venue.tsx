import React, { useState } from "react";
import { useUserPreferences } from "../../util/global/zustand-store";
import { useApi } from "../../util/hooks/use-fetch";
import { baseUrl } from "../../util/global/variables";

// Define types for the form data
interface Media {
    url: string;
    alt: string;
}

interface Meta {
    wifi: boolean;
    parking: boolean;
    breakfast: boolean;
    pets: boolean;
}

interface Location {
    address: string;
    city: string;
    zip: string;
    country: string;
    continent: string;
    lat: number;
    lng: number;
}

interface FormData {
    name: string;
    description: string;
    media: Media[];
    price: number;
    maxGuests: number;
    rating: number;
    meta: Meta;
    location: Location;
}
interface FormData extends Record<string, unknown> {
    name: string;
    description: string;
    media: Media[];
    price: number;
    maxGuests: number;
    rating: number;
    meta: Meta;
    location: Location;
}

export function PostVenue() {
    const { accessToken } = useUserPreferences() || {};
    const { data, loading, error, request } = useApi(`${baseUrl}/venues`);

    // Initialize form data with proper types
    const [formData, setFormData] = useState<FormData>({
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
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev: FormData) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleNestedChange = <T extends keyof FormData>(
        field: T,
        subfield: keyof FormData[T],
        value: any
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: {
                ...(typeof prev[field] === "object" && prev[field] !== null
                    ? prev[field]
                    : {}),
                [subfield]: value,
            },
        }));
    };

    const handleMediaChange = (
        index: number,
        field: keyof Media,
        value: string
    ) => {
        setFormData((prev) => {
            const mediaCopy = [...prev.media];
            mediaCopy[index] = { ...mediaCopy[index], [field]: value };
            return { ...prev, media: mediaCopy };
        });
    };

    const addMedia = () => {
        setFormData((prev) => ({
            ...prev,
            media: [...prev.media, { url: "", alt: "" }],
        }));
    };

    const removeMedia = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            media: prev.media.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic client-side validation
        if (
            !formData.name ||
            !formData.description ||
            formData.price <= 0 ||
            formData.maxGuests <= 0
        ) {
            alert("Please fill in all required fields.");
            return;
        }

        try {
            await request("POST", formData, {}, accessToken || undefined);
        } catch (err) {
            console.error("Submission failed:", err);
        }
    };

    return (
        <div>
            <h1>Create Venue</h1>
            {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
            {loading && <p>Loading...</p>}
            {data && <p>Venue created successfully!</p>}

            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <h3>Media</h3>
                {formData.media.map((media, index) => (
                    <div key={index}>
                        <label>
                            Media URL:
                            <input
                                type="text"
                                value={media.url}
                                onChange={(e) =>
                                    handleMediaChange(
                                        index,
                                        "url",
                                        e.target.value
                                    )
                                }
                            />
                        </label>
                        <label>
                            Media Alt Text:
                            <input
                                type="text"
                                value={media.alt}
                                onChange={(e) =>
                                    handleMediaChange(
                                        index,
                                        "alt",
                                        e.target.value
                                    )
                                }
                            />
                        </label>
                        <button
                            type="button"
                            onClick={() => removeMedia(index)}
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button type="button" onClick={addMedia}>
                    Add Media
                </button>
                <br />
                <label>
                    Price:
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={(e) =>
                            setFormData({ ...formData, price: +e.target.value })
                        }
                        required
                    />
                </label>
                <br />
                <label>
                    Max Guests:
                    <input
                        type="number"
                        name="maxGuests"
                        value={formData.maxGuests}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                maxGuests: +e.target.value,
                            })
                        }
                        required
                    />
                </label>
                <br />
                <h3>Meta</h3>
                <label>
                    WiFi:
                    <input
                        type="checkbox"
                        checked={formData.meta.wifi}
                        onChange={(e) =>
                            handleNestedChange("meta", "wifi", e.target.checked)
                        }
                    />
                </label>
                <label>
                    Parking:
                    <input
                        type="checkbox"
                        checked={formData.meta.parking}
                        onChange={(e) =>
                            handleNestedChange(
                                "meta",
                                "parking",
                                e.target.checked
                            )
                        }
                    />
                </label>
                <label>
                    Breakfast:
                    <input
                        type="checkbox"
                        checked={formData.meta.breakfast}
                        onChange={(e) =>
                            handleNestedChange(
                                "meta",
                                "breakfast",
                                e.target.checked
                            )
                        }
                    />
                </label>
                <label>
                    Pets:
                    <input
                        type="checkbox"
                        checked={formData.meta.pets}
                        onChange={(e) =>
                            handleNestedChange("meta", "pets", e.target.checked)
                        }
                    />
                </label>
                <br />
                <h3>Location</h3>
                {Object.entries(formData.location).map(([key, value]) => (
                    <label key={key}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                        <input
                            type={typeof value === "number" ? "number" : "text"}
                            value={value}
                            onChange={(e) =>
                                handleNestedChange(
                                    "location",
                                    key as keyof Location,
                                    e.target.value
                                )
                            }
                        />
                    </label>
                ))}
                <br />
                <button type="submit" disabled={loading}>
                    Create Venue
                </button>
            </form>
        </div>
    );
}
