import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect } from "react";
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
import ConfirmationModal from "../../global/confirmation";

interface PostVenueProps {
    mode: "create" | "edit";
    defaultValues?: VenueFormData;
    onSubmit: SubmitHandler<VenueFormData>;
    loading?: boolean;
    error?: { message: string };
    onClose?: () => void;
    successMessage?: string;
}

export function PostVenue({
    mode,
    defaultValues,
    onSubmit,
    loading = false,
    error,
    onClose,
    successMessage,
}: PostVenueProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        reset,
    } = useForm<VenueFormData>({
        defaultValues: defaultValues || {
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
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [formData, setFormData] = useState<VenueFormData | null>(null);

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
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues, reset]);

    const handleFormSubmit = (data: VenueFormData) => {
        setFormData(data);
        setConfirmationOpen(true);
    };

    const confirmSubmit = () => {
        if (formData) {
            onSubmit(formData);
        }
        setConfirmationOpen(false);
    };

    return (
        <VenueContainer>
            <VenueForm onSubmit={handleSubmit(handleFormSubmit)}>
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
                                max: {
                                    value: 10000,
                                    message: "Price must be less than 100000",
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
                                max: {
                                    value: 100,
                                    message:
                                        "A venue cannot accommodate more than 100 guests",
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
                    {loading
                        ? `${
                              mode === "create" ? "Creating" : "Updating"
                          } Venue...`
                        : mode === "create"
                        ? "Create Venue"
                        : "Update Venue"}
                </SubmitBtnVenue>

                {onClose && <CloseButton onClick={onClose}>x</CloseButton>}
            </VenueForm>
            {error && <Error>{error.message}</Error>}
            {successMessage && (
                <SuccessMessageForPost>
                    <p>{successMessage}</p>
                    <IoCheckmarkDoneCircleSharp fill="green" />
                </SuccessMessageForPost>
            )}
            <ConfirmationModal
                isOpen={confirmationOpen}
                message={`Are you sure you want to ${
                    mode === "create" ? "create" : "update"
                } this venue?`}
                onConfirm={confirmSubmit}
                onCancel={() => setConfirmationOpen(false)}
            />
        </VenueContainer>
    );
}
