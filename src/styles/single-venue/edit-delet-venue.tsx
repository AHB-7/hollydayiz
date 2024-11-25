import styled from "styled-components";

export const FunctionsContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0rem 1rem;
    > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        max-width: 24.5rem;
        border-radius: 1.4rem;
        padding: 0.5rem;
        background: ${({ theme }) => theme.colors.text};
        p {
            color: ${({ theme }) => theme.colors.background};
            padding-left: 0.5rem;
        }
    }
    &:last-child {
        display: flex;
        justify-content: center;
        align-items: center;
        button:nth-child(2) {
            margin: 0 1rem; /* Margin specifically for the second button */
        }
    }
`;
export const EditAndSaveBtn = styled.button<{
    btnColor?: string;
    hoverColor?: string;
    margin?: string;
}>`
    background: ${({ theme, btnColor }) => btnColor || theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    border: none;
    margin: ${({ margin }) => margin || "0"};
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
        background: ${({ theme, hoverColor }) =>
            hoverColor || theme.colors.secondary};
        color: ${({ theme }) => theme.colors.text};
    }
`;
