/**
 * ErrorMessage is a reusable component that displays an error message
 * inside a styled container with an accompanying icon.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {string} props.message - The error message to display.
 *
 * @example
 * <ErrorMessage message="An unexpected error occurred." />
 */

import React from "react";
import { CenteredContainer, ErrorContainer, ErrorIcon } from "../../styles";

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
