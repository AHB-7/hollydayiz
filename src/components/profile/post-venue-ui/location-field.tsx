import {
    FormInputVenue,
    Label,
    ToInputsInARow,
    Error,
} from "../../../styles/index";

export function LocationFields({
    register,
    errors,
}: {
    register: any;
    errors: any;
}) {
    return (
        <>
            <Label>
                Address:
                <FormInputVenue
                    {...register("location.address")}
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
                        {...register("location.city", {
                            required: "City is required",
                            minLength: {
                                value: 2,
                                message: "City must be at least 2 characters long",
                            }
                        })}
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
                        {...register("location.zip")}
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
                        {...register("location.country")}
                        type="text"
                        placeholder="Country"
                    />
                </Label>
                <Label>
                    Continent:
                    <FormInputVenue
                        {...register("location.continent")}
                        type="text"
                        placeholder="Continent"
                    />
                </Label>
            </ToInputsInARow>
            <ToInputsInARow>
                <Label>
                    Latitude:
                    <FormInputVenue
                        {...register("location.lat", { valueAsNumber: true })}
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
                        {...register("location.lng", { valueAsNumber: true })}
                        type="number"
                        placeholder="Longitude"
                    />
                    {errors.location?.lng && (
                        <Error>{errors.location.lng.message}</Error>
                    )}
                </Label>
            </ToInputsInARow>
        </>
    );
}
