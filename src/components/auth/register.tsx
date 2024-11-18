import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
    Error,
    Form,
    FormInput,
    RegistrationContainer,
    SubmitBtn,
    SuccessMessage,
    TwoInputsInRow,
} from "../../styles/auth/auth";
import { useApi } from "../../util/hooks/use-fetch";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { ApiResponseRegister } from "../../types/global.types";
import { useStore } from "../../util/global/zustand-store";

type RegistrationFormData = {
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

export function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegistrationFormData>();

    const { data, loading, error, request } = useApi<ApiResponseRegister>(
        "https://v2.api.noroff.dev/auth/register"
    );

    const setMail = useStore((state) => state.setMail);

    // Redirect after successful registration
    useEffect(() => {
        if (data && data.email) {
            setMail(data.email); // Update the global store
            window.location.href = "/"; // Redirect to the desired page
        }
    }, [data, setMail]); // Runs only when `data` changes

    const onSubmit: SubmitHandler<RegistrationFormData> = async (formData) => {
        await request("POST", formData); // Send the registration request
    };

    return (
        <RegistrationContainer>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <h1>Register</h1>
                <FormInput
                    {...register("name", {
                        required: "Name is required.",
                        minLength: {
                            value: 8,
                            message:
                                "Name must be at least 8 characters and can not contain punctuation symbols apart from underscore(_).",
                        },
                    })}
                    type="text"
                    name="name"
                    placeholder="Name"
                />
                {errors.name && <Error>{errors.name.message}</Error>}
                <FormInput
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/,
                            message: "Email must be a stud.noroff.no address",
                        },
                    })}
                    type="text"
                    name="email"
                    placeholder="Email"
                />
                {errors.email && <Error>{errors.email.message}</Error>}
                <FormInput
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message:
                                "Password must be at least 8 characters long",
                        },
                    })}
                    type="password"
                    name="password"
                    placeholder="Password"
                />
                {errors.password && <Error>{errors.password.message}</Error>}
                <FormInput
                    {...register("bio", {
                        validate: (value) =>
                            !value ||
                            value.length <= 160 ||
                            "Bio must be 160 characters or less",
                    })}
                    type="text"
                    placeholder="Bio"
                />
                {errors.bio && <Error>{errors.bio.message}</Error>}
                <TwoInputsInRow>
                    <FormInput
                        {...register("avatarUrl", {
                            validate: (value) =>
                                !value ||
                                /^https?:\/\/.+$/.test(value) ||
                                "Avatar URL must be a valid URL.",
                        })}
                        type="text"
                        placeholder="Avatar URL"
                    />
                    <FormInput
                        {...register("avatarAlt", {
                            validate: (value, { avatarUrl }) =>
                                !value ||
                                (avatarUrl && value.length <= 120) ||
                                "Avatar Alt Text must be less than 120 characters and requires Avatar URL.",
                        })}
                        type="text"
                        placeholder="Avatar Alt Text"
                    />
                </TwoInputsInRow>
                {errors.avatarUrl && <Error>{errors.avatarUrl.message}</Error>}
                {errors.avatarAlt && <Error>{errors.avatarAlt.message}</Error>}
                <TwoInputsInRow>
                    <FormInput
                        {...register("bannerUrl", {
                            validate: (value) =>
                                !value ||
                                /^https?:\/\/.+$/.test(value) ||
                                "Banner URL must be a valid URL.",
                        })}
                        type="text"
                        placeholder="Banner URL"
                    />
                    <FormInput
                        {...register("bannerAlt", {
                            validate: (value, { bannerUrl }) =>
                                !value ||
                                (bannerUrl && value.length <= 120) ||
                                "Banner Alt Text must be less than 120 characters and requires Banner URL.",
                        })}
                        type="text"
                        placeholder="Banner Alt Text"
                    />
                </TwoInputsInRow>
                {errors.bannerUrl && <Error>{errors.bannerUrl.message}</Error>}
                {errors.bannerAlt && <Error>{errors.bannerAlt.message}</Error>}
                {/* Display API error message */}
                {error && (
                    <Error>
                        {error.message || "An unknown error occurred."}
                    </Error>
                )}
                <SubmitBtn type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </SubmitBtn>
                {data && (
                    <SuccessMessage>
                        <h2>Registration successful!</h2>
                        <IoCheckmarkDoneCircleSharp
                            fill="green"
                            fontSize="4rem"
                        />
                    </SuccessMessage>
                )}
            </Form>
        </RegistrationContainer>
    );
}
