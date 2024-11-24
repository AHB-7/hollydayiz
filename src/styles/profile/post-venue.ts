import styled from "styled-components";
import { FormInput, Form, FormContainer } from "../auth/auth";
import { SubmitBtn } from "../auth/auth";

export const CloseButton = styled.a`
    position: absolute;
    top: 0;
    right: 0;
    padding: 1rem;
    cursor: pointer;
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.text};
`;
export const VenueContainer = styled(FormContainer)`
    background: ${({ theme }) => theme.colors.text};
    border-radius: 1rem;
    position: absolute;
    top: 4rem;
    z-index: 5;
    display: flex;
    width: 100%;
    max-width: 40rem;
`;
export const VenueForm = styled(Form)`
    background: ${({ theme }) => theme.colors.text};
    > * {
        color: ${({ theme }) => theme.colors.background};
    }
`;
export const VenueDescriptionPost = styled.textarea`
    width: 100%;
    height: 10rem;
    resize: none;
    font-size: 1.1rem;
    border-radius: 1rem;
    padding: 0.7rem;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    outline: none;
`;
export const ToInputsInARow = styled.div`
    display: flex;
    justify-content: space-between;
    > * {
        color: ${({ theme }) => theme.colors.background};
        width: 48%;
    }
    gap: 1rem;
`;
export const FormInputVenue = styled(FormInput)`
    width: 100%;
    font-size: 1.1rem;
`;
export const Label = styled.label`
    color: ${({ theme }) => theme.colors.background};
    font-size: 1.1rem;
    width: 100%;
    > input {
        margin: 0.5rem 0;
    }
    > p {
        text-align: end;
    }
`;
export const MediaContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    > button {
        margin-left: auto;
        background: none;
        outline: none;
        border: none;
        padding-right: 0.5rem;
        color: yellow;
        cursor: pointer;
        transition: color 0.2s ease;
        &:hover {
            color: grey;
        }
    }
`;
export const SubmitBtnVenue = styled(SubmitBtn)`
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
    :hover {
        color: ${({ theme }) => theme.colors.background};
    }
`;

export const MetaContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    margin: 0 auto;
    width: 100%;
    gap: 1rem;

    > label {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border: 0.1rem solid ${({ theme }) => theme.colors.background};
        padding: 1rem;
        border-radius: 0.8rem;
        > p {
            color: ${({ theme }) => theme.colors.background};
        }

        input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
            &:checked + svg {
                fill: lightgreen;
            }
            &:checked ~ p {
                color: lightgreen;
            }
        }

        > svg {
            fill: ${({ theme }) => theme.colors.background};
            transition: fill 0.3s ease; /* Smooth transition for color change */
            width: 24px;
            height: 24px;
        }
    }
`;
export const SuccessMessageForPost = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem 0;
    > p {
        font-size: 1.3rem;
        color: ${({ theme }) => theme.colors.background};
    }
    > svg {
        font-size: 5rem;
    }
`;
