import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { useUserPreferences } from "../../util/global/zustand-store";
import { useApi } from "../../util/hooks/use-fetch";
import { baseUrl } from "../../util/global/variables";
import {
    FormInputVenue,
    Error,
    IoCheckmarkDoneCircleSharp,
    VenueBookingsButton,
    VenueForm,
    VenueContainer,
    CloseButton,
    ToInputsInARow,
    Label,
    VenueDescriptionPost,
    MediaContainer,
    SubmitBtn,
    MetaContainer,
    MdLocalParking,
    MdOutlineEmojiFoodBeverage,
    MdOutlinePets,
    SubmitBtnVenue,
    SuccessMessageForPost,
} from "../../styles/index";
import { FaWifi } from "react-icons/fa";

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
                <Label>
                    Name:
                    <FormInputVenue
                        {...register("name", { required: "Name is required" })}
                        type="text"
                        placeholder="Name"
                    />
                    {errors.name && <Error>{errors.name.message}</Error>}
                </Label>
                <Label>
                    Description:
                    <VenueDescriptionPost
                        as="textarea"
                        {...register("description", {
                            required: "Description is required",
                        })}
                        placeholder="Description"
                    />
                    {errors.description && (
                        <Error>{errors.description.message}</Error>
                    )}
                </Label>
                {media.map((_, index) => (
                    <MediaContainer key={index}>
                        <Label>
                            Media
                            <FormInputVenue
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
                        </Label>
                        <Label>
                            Media Alt Text:
                            <FormInputVenue
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
                        </Label>
                        <a type="button" onClick={() => removeMedia(index)}>
                            Remove Media
                        </a>
                    </MediaContainer>
                ))}
                <SubmitBtnVenue type="button" onClick={addMedia}>
                    Add Media
                </SubmitBtnVenue>
                <ToInputsInARow>
                    {" "}
                    <Label>
                        Price:
                        <FormInputVenue
                            id="price"
                            {...register("price", {
                                required: "Price is required",
                                min: {
                                    value: 1,
                                    message: "Price must be greater than 0",
                                },
                                valueAsNumber: true,
                            })}
                            type="number"
                            placeholder="Price"
                        />
                        {errors.price && <Error>{errors.price.message}</Error>}
                        Max Guests:
                        <FormInputVenue
                            id="maxGuests"
                            {...register("maxGuests", {
                                required: "Max guests is required",
                                min: {
                                    value: 1,
                                    message: "Max guests must be at least 1",
                                },
                                valueAsNumber: true,
                            })}
                            type="number"
                            placeholder="Max Guests"
                        />
                        {errors.maxGuests && (
                            <Error>{errors.maxGuests.message}</Error>
                        )}
                    </Label>
                </ToInputsInARow>
                <MetaContainer>
                    <Label>
                        <input type="checkbox" {...register("meta.wifi")} />
                        <FaWifi />
                        <p>WiFi</p>
                    </Label>
                    <Label>
                        <input type="checkbox" {...register("meta.parking")} />
                        <MdLocalParking />
                        <p>Parking</p>
                    </Label>
                    <Label>
                        <input
                            type="checkbox"
                            {...register("meta.breakfast")}
                        />
                        <MdOutlineEmojiFoodBeverage />
                        <p> Breakfast</p>
                    </Label>
                    <Label>
                        <input type="checkbox" {...register("meta.pets")} />
                        <MdOutlinePets />
                        <p>Pets</p>
                    </Label>
                </MetaContainer>
                <Label>
                    Address:
                    <FormInputVenue
                        {...register("location.address", {})}
                        type="text"
                        placeholder="Address"
                    />
                    {errors.location?.address && (
                        <Error>{errors.location.address.message}</Error>
                    )}
                </Label>
                <ToInputsInARow>
                    <Label>
                        City:
                        <FormInputVenue
                            {...register("location.city", {})}
                            type="text"
                            placeholder="City"
                        />
                        {errors.location?.city && (
                            <Error>{errors.location.city.message}</Error>
                        )}
                    </Label>
                    <Label>
                        ZIP Code:
                        <FormInputVenue
                            {...register("location.zip", {})}
                            type="text"
                            placeholder="ZIP Code"
                        />
                        {errors.location?.zip && (
                            <Error>{errors.location.zip.message}</Error>
                        )}
                    </Label>
                </ToInputsInARow>
                <ToInputsInARow>
                    <Label>
                        Country:
                        <FormInputVenue
                            {...register("location.country", {})}
                            type="text"
                            placeholder="Country"
                        />
                        {errors.location?.country && (
                            <Error>{errors.location.country.message}</Error>
                        )}
                    </Label>
                    <Label>
                        Continent:
                        <FormInputVenue
                            {...register("location.continent", {})}
                            type="text"
                            placeholder="Continent"
                        />
                        {errors.location?.continent && (
                            <Error>{errors.location.continent.message}</Error>
                        )}
                    </Label>
                </ToInputsInARow>
                <ToInputsInARow>
                    <Label>
                        Latitude:
                        <FormInputVenue
                            {...register("location.lat", {
                                valueAsNumber: true,
                            })}
                            type="number"
                            placeholder="Latitude"
                        />
                        {errors.location?.lat && (
                            <Error>{errors.location.lat.message}</Error>
                        )}
                    </Label>
                    <Label>
                        Longitude:
                        <FormInputVenue
                            {...register("location.lng", {
                                valueAsNumber: true,
                            })}
                            type="number"
                            placeholder="Longitude"
                        />
                        {errors.location?.lng && (
                            <Error>{errors.location.lng.message}</Error>
                        )}
                    </Label>
                </ToInputsInARow>

                <SubmitBtnVenue type="submit" disabled={loading}>
                    {loading ? "Creating Venue..." : "Create Venue"}
                </SubmitBtnVenue>

                {data && (
                    <SuccessMessageForPost>
                        <p>Venue been successfully created</p>
                        <IoCheckmarkDoneCircleSharp fill="green" />
                    </SuccessMessageForPost>
                )}
                <CloseButton onClick={closeVenueContainer}>x</CloseButton>
            </VenueForm>
        </VenueContainer>
    );
}
