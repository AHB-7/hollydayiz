import { useForm, SubmitHandler } from "react-hook-form";
import {
    Error,
    Form,
    FormContainer,
    FormInput,
    RegBtn,
    SubmitBtn,
} from "../../styles/auth/auth";
import { useApi } from "../../util/hooks/use-fetch";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { ApiResponseLogin, LoginFormData } from "../../types/global.types";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../util/global/local-storage";

export function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();

    const { data, loading, error, request } = useApi<ApiResponseLogin>(
        "https://v2.api.noroff.dev/auth/login"
    );

    const setAccessToken = useStore((state) => state.setAccessToken);
    const savedMail = useStore((state) => state.mail); // Retrieve saved email

    useEffect(() => {
        if (data && data.accessToken) {
            setAccessToken(data.accessToken);
            window.location.href = "/";
        }
    }, [data, setAccessToken]);

    const onSubmit: SubmitHandler<LoginFormData> = async (formData) => {
        await request("POST", formData);
    };

    const setNavbarState = useStore((state) => state.setNavbarState);

    return (
        <FormContainer>
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
                    defaultValue={savedMail || ""} // Pre-fill with saved email if available
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

                {error && (
                    <Error>Something went wrong. Please try again.</Error>
                )}

                <SubmitBtn type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
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
