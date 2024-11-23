import styled from "styled-components";
import { Form, FormContainer } from "../auth/auth";

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
export const ToInputsInARow = styled.div`
    display: flex;
    justify-content: space-between;

    > * {
        color: ${({ theme }) => theme.colors.background};
        width: 48%;
    }
`;
