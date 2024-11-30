import React, { useState, useEffect } from "react";
import {
    FormInputVenue as FormInput,
    Error,
    VenueForm,
    VenueContainer,
    CloseButton,
    Label,
    SubmitBtnVenue as SubmitButton,
    SuccessMessageForPost,
    EditTextArea,
    ImageReviewContainer,
    ImageReview,
    TwoInputsInRow,
    AvatarReview,
} from "../../../styles/index";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { EditCheckbox } from "./checkbox";
import ConfirmationModal from "../../global/confirmation";

interface EditProfileData {
    bio: string;
    bannerUrl: string;
    bannerAlt: string;
    avatarUrl: string;
    avatarAlt: string;
    venueManager: boolean;
}

interface EditProfileProps {
    initialData: EditProfileData;
    onSave: SubmitHandler<EditProfileData>;
    onCancel: () => void;
    loading?: boolean;
    error?: { message: string };
    successMessage?: string;
}

export const EditProfile: React.FC<EditProfileProps> = ({
    initialData,
    onSave,
    onCancel,
    loading = false,
    error,
    successMessage,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
        watch,
    } = useForm<EditProfileData>({
        defaultValues: initialData,
    });

    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [formData, setFormData] = useState<EditProfileData | null>(null);

    const [bannerError, setBannerError] = useState(false);
    const [avatarError, setAvatarError] = useState(false);

    useEffect(() => {
        reset(initialData);
    }, [initialData, reset]);

    const handleFormSubmit: SubmitHandler<EditProfileData> = (data) => {
        setFormData(data);
        setConfirmationOpen(true);
    };

    const confirmSave = () => {
        if (formData) {
            onSave(formData);
        }
        setConfirmationOpen(false);
    };

    const bannerUrl = watch("bannerUrl");
    const avatarUrl = watch("avatarUrl");

    return (
        <VenueContainer>
            <VenueForm onSubmit={handleSubmit(handleFormSubmit)}>
                <Label>
                    Banner URL:
                    <FormInput
                        {...register("bannerUrl", {
                            required: "Banner URL is required",
                            pattern: {
                                value: /^https?:\/\/.+$/,
                                message: "Invalid URL format",
                            },
                        })}
                        type="text"
                        placeholder="Enter banner URL"
                    />
                    {errors.bannerUrl && (
                        <Error>{errors.bannerUrl.message}</Error>
                    )}
                </Label>
                <Label>
                    Banner Alt:
                    <FormInput
                        {...register("bannerAlt", {
                            maxLength: {
                                value: 120,
                                message:
                                    "Alt text must be 120 characters or less",
                            },
                        })}
                        type="text"
                        placeholder="Enter banner alt text"
                    />
                    {errors.bannerAlt && (
                        <Error>{errors.bannerAlt.message}</Error>
                    )}
                </Label>
                <ImageReviewContainer>
                    <ImageReview
                        src={
                            bannerError
                                ? "/default-banner.jpg"
                                : bannerUrl || initialData.bannerUrl
                        }
                        alt={initialData.bannerAlt || "Banner Image"}
                        onError={() => setBannerError(false)}
                    />
                </ImageReviewContainer>
                <TwoInputsInRow>
                    <div>
                        {" "}
                        <Label>
                            Avatar URL:
                            <FormInput
                                {...register("avatarUrl", {
                                    required: "Avatar URL is required",
                                    pattern: {
                                        value: /^https?:\/\/.+$/,
                                        message: "Invalid URL format",
                                    },
                                })}
                                type="text"
                                placeholder="Enter avatar URL"
                            />
                            {errors.avatarUrl && (
                                <Error>{errors.avatarUrl.message}</Error>
                            )}
                        </Label>
                        <Label>
                            Avatar Alt:
                            <FormInput
                                {...register("avatarAlt", {
                                    maxLength: {
                                        value: 160,
                                        message:
                                            "Alt text must be 160 characters or less",
                                    },
                                })}
                                type="text"
                                placeholder="Enter avatar alt text"
                            />
                            {errors.avatarAlt && (
                                <Error>{errors.avatarAlt.message}</Error>
                            )}
                        </Label>
                    </div>
                    <ImageReviewContainer>
                        <AvatarReview
                            src={
                                avatarError
                                    ? "/default-avatar.jpg"
                                    : avatarUrl || initialData.avatarUrl
                            }
                            alt={initialData.avatarAlt || "Avatar Image"}
                            onError={() => setAvatarError(false)}
                        />
                    </ImageReviewContainer>
                </TwoInputsInRow>
                <Label>
                    Bio:
                    <EditTextArea
                        as="textarea"
                        {...register("bio", {
                            maxLength: {
                                value: 160,
                                message: "Bio must be 160 characters or less",
                            },
                        })}
                        placeholder="Enter your bio"
                    />
                    {errors.bio && <Error>{errors.bio.message}</Error>}
                </Label>
                <Label>
                    <Controller
                        name="venueManager"
                        control={control}
                        render={({ field }) => (
                            <EditCheckbox
                                {...field}
                                checked={field.value}
                                onChange={(e) =>
                                    field.onChange(e.target.checked)
                                }
                            />
                        )}
                    />
                </Label>
                <SubmitButton type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save Profile"}
                </SubmitButton>
                <CloseButton onClick={onCancel}>x</CloseButton>
            </VenueForm>

            {error && <Error>{error.message}</Error>}
            {successMessage && (
                <SuccessMessageForPost>
                    <p>{successMessage}</p>
                </SuccessMessageForPost>
            )}

            <ConfirmationModal
                isOpen={confirmationOpen}
                message="Are you sure you want to save these changes?"
                onConfirm={confirmSave}
                onCancel={() => setConfirmationOpen(false)}
            />
        </VenueContainer>
    );
};
