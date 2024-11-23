import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { useUserPreferences } from "../../util/global/zustand-store";
import { useApi } from "../../util/hooks/use-fetch";
import { baseUrl } from "../../util/global/variables";
import {
    FormInput,
    Error,
    IoCheckmarkDoneCircleSharp,
    VenueBookingsButton,
    VenueForm,
    VenueContainer,
    CloseButton,
    ToInputsInARow,
} from "../../styles/index";

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

interface VenueFormData {
    name: string;
    description: string;
    media: Media[];
    price: number;
    maxGuests: number;
    rating: number;
    meta: Meta;
    location: Location;
}
interface VenueFormData extends Record<string, unknown> {
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
    const { accessToken, setVenueContainer } = useUserPreferences() || {};
    const { data, loading, error, request } = useApi(`${baseUrl}/venues`);

    const closeVenueContainer = () => {
        setVenueContainer(false);
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<VenueFormData>({
        defaultValues: {
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
        },
    });

    const media = watch("media");

    const onSubmit: SubmitHandler<VenueFormData> = async (formData) => {
        await request("POST", formData, {}, accessToken || undefined);
    };

    const addMedia = () => {
        setValue("media", [...media, { url: "", alt: "" }]);
    };

    const removeMedia = (index: number) => {
        setValue(
            "media",
            media.filter((_, i) => i !== index)
        );
    };

    useEffect(() => {
        if (data) {
            console.log("Venue created successfully:", data);
        }
    }, [data]);

    return (
        <VenueContainer>
            <VenueForm onSubmit={handleSubmit(onSubmit)}>
                {error && <Error>{error.message}</Error>}
                {data && <p>Venue created successfully!</p>}

                <label>
                    Name:
                    <FormInput
                        {...register("name", { required: "Name is required" })}
                        type="text"
                        placeholder="Name"
                    />
                    {errors.name && <Error>{errors.name.message}</Error>}
                </label>

                <label>
                    Description:
                    <textarea
                        {...register("description", {
                            required: "Description is required",
                        })}
                        placeholder="Description"
                    />
                    {errors.description && (
                        <Error>{errors.description.message}</Error>
                    )}
                </label>

                <h3>Media</h3>
                {media.map((_, index) => (
                    <div key={index}>
                        <label>
                            Media URL:
                            <FormInput
                                {...register(`media.${index}.url`, {
                                    required: "Media URL is required",
                                })}
                                type="text"
                                placeholder="Media URL"
                            />
                            {errors.media?.[index]?.url && (
                                <Error>
                                    {errors.media[index].url?.message}
                                </Error>
                            )}
                        </label>
                        <label>
                            Media Alt Text:
                            <FormInput
                                {...register(`media.${index}.alt`, {
                                    required: "Alt text is required",
                                })}
                                type="text"
                                placeholder="Alt Text"
                            />
                            {errors.media?.[index]?.alt && (
                                <Error>
                                    {errors.media[index].alt?.message}
                                </Error>
                            )}
                        </label>
                        <button
                            type="button"
                            onClick={() => removeMedia(index)}
                        >
                            Remove Media
                        </button>
                    </div>
                ))}
                <button type="button" onClick={addMedia}>
                    Add Media
                </button>
                <ToInputsInARow>
                    {" "}
                    <label>
                        Price:
                        <FormInput
                            {...register("price", {
                                required: "Price is required",
                                min: {
                                    value: 1,
                                    message: "Price must be greater than 0",
                                },
                            })}
                            type="number"
                            placeholder="Price"
                        />
                        {errors.price && <Error>{errors.price.message}</Error>}
                    </label>
                    <label>
                        Max Guests:
                        <FormInput
                            {...register("maxGuests", {
                                required: "Max guests is required",
                                min: {
                                    value: 1,
                                    message: "Must allow at least 1 guest",
                                },
                            })}
                            type="number"
                            placeholder="Max Guests"
                        />
                        {errors.maxGuests && (
                            <Error>{errors.maxGuests.message}</Error>
                        )}
                    </label>
                </ToInputsInARow>

                <h3>Meta</h3>
                <label>
                    WiFi:
                    <input type="checkbox" {...register("meta.wifi")} />
                </label>
                <label>
                    Parking:
                    <input type="checkbox" {...register("meta.parking")} />
                </label>
                <label>
                    Breakfast:
                    <input type="checkbox" {...register("meta.breakfast")} />
                </label>
                <label>
                    Pets:
                    <input type="checkbox" {...register("meta.pets")} />
                </label>

                <h3>Location</h3>
                <label>
                    Address:
                    <FormInput
                        {...register("location.address", {
                            required: "Address is required",
                        })}
                        type="text"
                        placeholder="Address"
                    />
                    {errors.location?.address && (
                        <Error>{errors.location.address.message}</Error>
                    )}
                </label>
                <label>
                    City:
                    <FormInput
                        {...register("location.city", {
                            required: "City is required",
                        })}
                        type="text"
                        placeholder="City"
                    />
                    {errors.location?.city && (
                        <Error>{errors.location.city.message}</Error>
                    )}
                </label>
                <label>
                    ZIP Code:
                    <FormInput
                        {...register("location.zip", {
                            required: "ZIP Code is required",
                        })}
                        type="text"
                        placeholder="ZIP Code"
                    />
                    {errors.location?.zip && (
                        <Error>{errors.location.zip.message}</Error>
                    )}
                </label>
                <label>
                    Country:
                    <FormInput
                        {...register("location.country", {
                            required: "Country is required",
                        })}
                        type="text"
                        placeholder="Country"
                    />
                    {errors.location?.country && (
                        <Error>{errors.location.country.message}</Error>
                    )}
                </label>
                <label>
                    Continent:
                    <FormInput
                        {...register("location.continent", {
                            required: "Continent is required",
                        })}
                        type="text"
                        placeholder="Continent"
                    />
                    {errors.location?.continent && (
                        <Error>{errors.location.continent.message}</Error>
                    )}
                </label>
                <label>
                    Latitude:
                    <FormInput
                        {...register("location.lat", {
                            required: "Latitude is required",
                            valueAsNumber: true,
                        })}
                        type="number"
                        placeholder="Latitude"
                    />
                    {errors.location?.lat && (
                        <Error>{errors.location.lat.message}</Error>
                    )}
                </label>
                <label>
                    Longitude:
                    <FormInput
                        {...register("location.lng", {
                            required: "Longitude is required",
                            valueAsNumber: true,
                        })}
                        type="number"
                        placeholder="Longitude"
                    />
                    {errors.location?.lng && (
                        <Error>{errors.location.lng.message}</Error>
                    )}
                </label>

                <VenueBookingsButton type="submit" disabled={loading}>
                    {loading ? "Creating Venue..." : "Create Venue"}
                </VenueBookingsButton>

                {data && <IoCheckmarkDoneCircleSharp fill="green" />}
                <CloseButton onClick={closeVenueContainer}>x</CloseButton>
            </VenueForm>
        </VenueContainer>
    );
}
