import { useForm, SubmitHandler } from "react-hook-form";
import {
    Error,
    Form,
    FormContainer,
    FormInput,
    RegBtn,
    SubmitBtn,
    IoCheckmarkDoneCircleSharp,
} from "../../styles/index";
import { useApi } from "../../util/hooks/use-fetch";
import { ApiResponseLogin, LoginFormData } from "../../types/global";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useUserPreferences } from "../../util/global/zustand-store";
import { Helmet } from "react-helmet-async";

export function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();

    const { data, loading, error, request } = useApi<ApiResponseLogin>(
        "https://v2.api.noroff.dev/auth/login"
    );

    const setAccessToken = useUserPreferences((state) => state.setAccessToken);
    const setName = useUserPreferences((state) => state.setName);
    const savedMail = useUserPreferences((state) => state.mail);
    const setNavbarState = useUserPreferences((state) => state.setNavbarState);

    useEffect(() => {
        if (data && data.accessToken) {
            setAccessToken(data.accessToken);
            setName(data.name);
            setNavbarState(false);
        }
    }, [data, setAccessToken]);

    const onSubmit: SubmitHandler<LoginFormData> = async (formData) => {
        await request("POST", formData);
    };

    return (
        <FormContainer>
            <Helmet>
                <title>Login - Access Your Account</title>
                <meta
                    name="description"
                    content="Login to your account on our platform to access your personalized dashboard, manage your bookings, and more. Secure and easy login for users."
                />
                <meta
                    name="keywords"
                    content="login, user login, account access, secure login, noroff stud login"
                />
                <meta name="author" content="Venue's Home" />

                <meta
                    property="og:title"
                    content="Login - Access Your Account"
                />
                <meta
                    property="og:description"
                    content="Securely login to your account to access personalized features, manage bookings, and more."
                />
                <meta
                    property="og:url"
                    content="https://hollydays.netlify.app/"
                />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:title"
                    content="Login - Access Your Account"
                />
                <meta
                    name="twitter:description"
                    content="Log in securely to access your personalized dashboard and manage your account."
                />
                <meta
                    name="twitter:image"
                    content="/images/login-preview.jpg"
                />
                <link rel="canonical" href="https://hollydays.netlify.app" />
            </Helmet>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <h1>Login</h1>

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
                    defaultValue={savedMail || ""}
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

                {error && <Error>{error.message}</Error>}

                <SubmitBtn type="submit" disabled={loading}>
                    {loading ? "Working on it..." : "Login"}
                </SubmitBtn>

                {data && <IoCheckmarkDoneCircleSharp fill="green" />}
                <RegBtn
                    as={Link}
                    to="/register"
                    onClick={() => {
                        setNavbarState(false);
                    }}
                >
                    Register
                </RegBtn>
            </Form>
        </FormContainer>
    );
}
