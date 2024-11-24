import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { useUserPreferences } from "../../../util/global/zustand-store";
import { useApi } from "../../../util/hooks/use-fetch";
import { baseUrl } from "../../../util/global/variables";
import {
    FormInputVenue,
    Error,
    IoCheckmarkDoneCircleSharp,
    VenueForm,
    VenueContainer,
    CloseButton,
    ToInputsInARow,
    Label,
    VenueDescriptionPost,
    SubmitBtnVenue,
    SuccessMessageForPost,
} from "../../../styles/index";
import { VenueFormData } from "../../../types/global";
import { MediaFields } from "./media-field";
import { MetaFields } from "./meta-field";
import { LocationFields } from "./location-field";

export function PostVenue() {
    const { accessToken, setVenueContainer, venueContainer } =
        useUserPreferences() || {};
    const { data, loading, error, request } = useApi(`${baseUrl}/venues`);

    const closeVenueContainer = () => {
        {
            venueContainer && setVenueContainer(false);
        }
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        reset,
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
        reset();
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
                <MediaFields
                    media={media}
                    register={register}
                    errors={errors}
                    addMedia={addMedia}
                    removeMedia={removeMedia}
                    watch={watch}
                />
                <ToInputsInARow>
                    {" "}
                    <Label htmlFor="price">
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
                    </Label>
                    <Label htmlFor="maxGuests">
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
                <MetaFields register={register} />
                <LocationFields register={register} errors={errors} />
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
