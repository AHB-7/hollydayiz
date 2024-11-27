import React from "react";
import styled from "styled-components";

// Styled container to center the error message
const CenteredContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh; /* Full viewport height */
    width: 100%; /* Full width */
    background-color: #f8f9fa; /* Optional background to emphasize the message */
`;

// Styled error container
const ErrorContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #f44336;
    border-radius: 5px;
    background-color: #ffebee;
    color: #d32f2f;
    font-size: 14px;
    font-weight: 500;
`;

// Error icon
const ErrorIcon = styled.span`
    margin-right: 8px;
    font-size: 16px;
`;

interface ErrorMessageProps {
    message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <CenteredContainer>
            <ErrorContainer>
                <ErrorIcon>⚠️</ErrorIcon>
                {message}
            </ErrorContainer>
        </CenteredContainer>
    );
};
