import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
    Error,
    Form,
    FormInput,
    RegistrationContainer,
    SubmitBtn,
    SuccessMessage,
    TwoInputsInRow,
    IoCheckmarkDoneCircleSharp,
} from "../../styles/index";
import { useApi } from "../../util/hooks/use-fetch";
import { ApiResponseRegister, RegistrationFormData } from "../../types/global";
import { useUserPreferences } from "../../util/global/zustand-store";
import { EditCheckbox } from "../profile/edit/checkbox";
import { Helmet } from "react-helmet-async";

export function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegistrationFormData>();

    const { data, loading, error, request } = useApi<ApiResponseRegister>(
        "https://v2.api.noroff.dev/auth/register"
    );

    const setMail = useUserPreferences((state) => state.setMail);
    const setNavbarState = useUserPreferences((state) => state.setNavbarState);

    const [isManager, setIsManager] = useState(false);

    useEffect(() => {
        if (data && data.email) {
            setMail(data.email);
            window.location.href = "/";
            setNavbarState(true);
        }
    }, [data, setMail]);

    const onSubmit: SubmitHandler<RegistrationFormData> = async (formData) => {
        const payload: Partial<RegistrationFormData> & {
            avatar?: { url: string; alt: string };
            banner?: { url: string; alt: string };
            venueManager: boolean;
        } = {
            ...formData,
            bio: formData.bio || "",
            avatar: {
                url: formData.avatarUrl || "",
                alt: formData.avatarAlt || "",
            },
            banner: {
                url: formData.bannerUrl || "",
                alt: formData.bannerAlt || "",
            },
            venueManager: isManager,
        };

        if (!formData.avatarUrl && !formData.avatarAlt) {
            delete payload.avatar;
        }
        if (!formData.bannerUrl && !formData.bannerAlt) {
            delete payload.banner;
        }

        await request("POST", payload);
    };

    return (
        <RegistrationContainer>
            <Helmet>
                <title>Register</title>
                <meta
                    name="description"
                    content="Create an account on our platform to explore venues, manage bookings, and enjoy a personalized experience. Registration is quick, easy, and secure."
                />
                <meta
                    name="keywords"
                    content="register, sign up, create account, venue registration, user registration, bookings, noroff stud registration"
                />
                <meta name="author" content="Venue's Home" />

                <meta
                    property="og:title"
                    content="Register - Create Your Account"
                />
                <meta
                    property="og:description"
                    content="Join our platform to access personalized features, explore venues, and manage your bookings. Register now for a secure and tailored experience."
                />
                <meta
                    property="og:url"
                    content="https://hollydays.netlify.app/register"
                />
                <meta property="og:image" content="/logo.svg" />
                <meta property="og:type" content="website" />

                {/* Twitter Meta */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:title"
                    content="Register - Create Your Account"
                />
                <meta
                    name="twitter:description"
                    content="Sign up to explore and book venues, manage your account, and access tailored features."
                />
                <meta name="twitter:image" content="/logo.svg" />

                {/* Canonical URL */}
                <link
                    rel="canonical"
                    href="https://hollydays.netlify.app/register"
                />
            </Helmet>

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

                <EditCheckbox
                    checked={isManager}
                    onChange={(e) => setIsManager(e.target.checked)}
                />

                {error && (
                    <Error>
                        {error.message || "An unknown error occurred."}
                    </Error>
                )}
                <SubmitBtn type="submit" disabled={loading}>
                    {loading ? "Just a sec!" : "Register"}
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
