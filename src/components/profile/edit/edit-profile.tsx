// File path: src/components/profile/EditProfile.tsx

import React from "react";
import {
    CloseButton,
    EditInput,
    EditTextArea,
    InputContainerForProfile,
    TwoButtonsInARow,
    Error,
    VenueBookingsButton,
    EditProfileContainer,
    Form,
} from "../../../styles/index";
import { Controller, useForm } from "react-hook-form";
import { EditCheckbox } from "./checkbox";

interface EditProfileProps {
    initialData: {
        bio: string;
        bannerUrl: string;
        bannerAlt: string;
        avatarUrl: string;
        avatarAlt: string;
        venueManager: boolean;
    };
    onSave: (data: any) => Promise<void>;
    onCancel: () => void;
}

export const EditProfile: React.FC<EditProfileProps> = ({
    initialData,
    onSave,
    onCancel,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        defaultValues: initialData,
    });

    return (
        <EditProfileContainer>
            <CloseButton color="#fff" onClick={onCancel}>
                X
            </CloseButton>
            <Form onSubmit={handleSubmit(onSave)}>
                <InputContainerForProfile>
                    <label>Banner URL:</label>
                    <EditInput
                        {...register("bannerUrl", {
                            required: "Banner URL is required",
                            pattern: {
                                value: /^https?:\/\/.+$/,
                                message: "Invalid URL format",
                            },
                        })}
                        placeholder="Enter banner URL"
                    />
                    {errors.bannerUrl && (
                        <Error>{errors.bannerUrl.message}</Error>
                    )}
                    <label>Banner Alt:</label>
                    <EditInput
                        {...register("bannerAlt", {
                            maxLength: {
                                value: 120,
                                message:
                                    "Alt text must be 120 characters or less",
                            },
                        })}
                        placeholder="Enter banner alt text"
                    />
                    {errors.bannerAlt && (
                        <Error>{errors.bannerAlt.message}</Error>
                    )}
                </InputContainerForProfile>
                <InputContainerForProfile>
                    <label>Avatar URL:</label>
                    <EditInput
                        {...register("avatarUrl", {
                            required: "Avatar URL is required",
                            pattern: {
                                value: /^https?:\/\/.+$/,
                                message: "Invalid URL format",
                            },
                        })}
                        placeholder="Enter avatar URL"
                    />
                    {errors.avatarUrl && (
                        <Error>{errors.avatarUrl.message}</Error>
                    )}
                    <label>Avatar Alt:</label>
                    <EditInput
                        {...register("avatarAlt", {
                            maxLength: {
                                value: 160,
                                message:
                                    "Alt text must be 160 characters or less",
                            },
                        })}
                        placeholder="Enter avatar alt text"
                    />
                    {errors.avatarAlt && (
                        <Error>{errors.avatarAlt.message}</Error>
                    )}
                </InputContainerForProfile>
                <InputContainerForProfile>
                    <label>Bio:</label>
                    <EditTextArea
                        {...register("bio", {
                            maxLength: {
                                value: 160,
                                message: "Bio must be 160 characters or less",
                            },
                        })}
                        placeholder="Enter your bio"
                    />
                    {errors.bio && <Error>{errors.bio.message}</Error>}
                </InputContainerForProfile>
                <InputContainerForProfile>
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
                </InputContainerForProfile>
                <TwoButtonsInARow>
                    <VenueBookingsButton type="submit">
                        Save
                    </VenueBookingsButton>
                    <VenueBookingsButton onClick={onCancel}>
                        Cancel
                    </VenueBookingsButton>
                </TwoButtonsInARow>
            </Form>
        </EditProfileContainer>
    );
};
