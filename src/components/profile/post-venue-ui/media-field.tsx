import {
    Error,
    FormInputVenue,
    ImageReview,
    ImageReviewContainer,
    Label,
    MediaContainer,
    SubmitBtnVenue,
} from "../../../styles";
import { Media } from "../../../types/global";

export function MediaFields({
    media,
    register,
    errors,
    addMedia,
    removeMedia,
    watch,
}: {
    media: Media[];
    register: any;
    errors: any;
    addMedia: () => void;
    removeMedia: (index: number) => void;
    watch: any;
}) {
    return (
        <>
            {media.map((_, index) => {
                const currentUrl = watch(`media.${index}.url`);

                return (
                    <MediaContainer key={index}>
                        <Label>
                            Media URL:
                            <FormInputVenue
                                {...register(`media.${index}.url`, {
                                    required: "Media URL is required",
                                    pattern: {
                                        value: /^(https?:\/\/)([\w.-]+)\.([a-z]{2,})(\/.*)?$/,
                                        message:
                                            "Image URL must be a valid URL",
                                    },
                                })}
                                type="text"
                                placeholder="Enter media URL"
                            />
                            {errors?.media?.[index]?.url && (
                                <Error>{errors.media[index].url.message}</Error>
                            )}
                        </Label>
                        <Label>
                            Alt Text:
                            <FormInputVenue
                                {...register(`media.${index}.alt`, {
                                    validate: (value: string) =>
                                        !currentUrl || value.trim() !== ""
                                            ? true
                                            : "Alt text cannot be empty when a URL is provided",
                                })}
                                type="text"
                                placeholder="Enter alt text"
                                disabled={!currentUrl}
                            />
                            {errors?.media?.[index]?.alt && (
                                <Error>{errors.media[index].alt.message}</Error>
                            )}
                        </Label>
                        {media[index].url && (
                            <ImageReviewContainer>
                                <ImageReview
                                    src={`${media[index].url}`}
                                    alt={`${media[index].alt}`}
                                />
                            </ImageReviewContainer>
                        )}
                        <button
                            type="button"
                            onClick={() => removeMedia(index)}
                            title="Remove this media"
                            aria-label={`Remove media item ${index + 1}`}
                        >
                            Remove Media
                        </button>
                    </MediaContainer>
                );
            })}
            <SubmitBtnVenue type="button" onClick={addMedia}>
                Add Media
            </SubmitBtnVenue>
        </>
    );
}
