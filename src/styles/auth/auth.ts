import styled from "styled-components";

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    padding: 1rem;
    @media screen and (${({ theme }) => theme.breakpoints.md}) {
        padding: 0;
    }
`;
export const RegistrationContainer = styled.section`
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    padding-top: 5rem;
    padding-bottom: 15rem;
    background-color: ${({ theme }) => theme.colors.text};
    border-radius: 0.8rem;
    color: ${({ theme }) => theme.colors.background};
    @media screen and (${({ theme }) => theme.breakpoints.md}) {
        padding: 6rem 0.5rem;
    }
`;
export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    max-width: 30rem;
    align-items: center;
    justify-content: center;
    height: 30rem;
    padding: 1rem;
    border-radius: 0.8rem;
    height: 100%;
    @media screen and (${({ theme }) => theme.breakpoints.md}) {
        padding: 0;
        padding: 4rem 0.5rem;
    }
    > h1 {
        color: ${({ theme }) => theme.colors.secondary};
        margin-bottom: 1rem;
        font-size: 4rem;
    }
    > label {
        width: 100%;
        text-align: start;
        font-size: 1rem;
        color: ${({ theme }) => theme.colors.background};
    }
`;
export const FormInput = styled.input`
    border: none;
    border-radius: 0.8rem;
    border: 0.05rem solid white;
    margin: 0 0 0.9rem 0;
    padding: 0.65rem;
    font-size: 1rem;
    width: 100%;
    background-color: transparent;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
    outline: none;
    transition: border 0.1s;
    &:focus {
        border: 0.1rem solid black;
    }
`;
export const SubmitBtn = styled.button`
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.text};
    border: none;
    border-radius: 0.8rem;
    padding: 0.5rem;
    font-size: 1.2rem;
    width: 100%;
    margin: 1rem 0;
    cursor: pointer;
    transition: background-color 0.2s;
    &:hover {
        background-color: ${({ theme }) => theme.colors.background};
    }
`;
export const LogOut = styled.a`
    font-size: 1rem;
    justify-self: end;
    cursor: pointer;
    background-color: transparent;
    border: none;
    transition: 0.2s;
    color: ${({ theme }) => theme.colors.dangerous};
    &:hover {
        color: grey;
    }
`;
export const RegBtn = styled(LogOut)`
    color: ${({ theme }) => theme.colors.secondary};
    cursor: pointer;
    aling-self: center;
    transition: 0.2s;
    font-weight: 900;
    &:hover {
        text-decoration: underline;
        color: ${({ theme }) => theme.colors.background};
    }
`;
export const Error = styled.p`
    color: ${({ theme }) => theme.colors.dangerous};
    font-weight: 400;
    font-size: 1rem;
    text-align: center;
`;
export const TwoInputsInRow = styled.div`
    display: flex;
    gap: 1rem;
    width: 100%;
    justify-content: space-between;
    > div {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    > div > label {
        width: 100%;
        text-align: start;
        font-size: 1rem;
        color: ${({ theme }) => theme.colors.background};
    }
`;
export const SuccessMessage = styled.div`
    > h2 {
        color: ${({ theme }) => theme.colors.background};
    }
    font-size: 1.2rem;
    font-weight: 900;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    align-items: center;
`;
export const NotLoggedInContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.4rem;
    width: 100%;
    height: 100vh;
    max-width: 30rem;
    margin: 0 auto;
    align-items: center;
`;
