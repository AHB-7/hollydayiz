import React from "react";
import styled from "styled-components";
import { VenueFormData } from "../../types/global";

interface ConfirmationModalProps {
    isOpen: boolean;
    message: string;
    onConfirm: (formData?: VenueFormData) => void;
    onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    message,
    onConfirm,
    onCancel,
}) => {
    if (!isOpen) return null;

    return (
        <Overlay>
            <Modal>
                <Message>{message}</Message>
                <Actions>
                    <Button onClick={onCancel}>Cancel</Button>
                    <Button onClick={() => onConfirm()}>Confirm</Button>
                </Actions>
            </Modal>
        </Overlay>
    );
};

export default ConfirmationModal;

// Styled Components
const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
`;

const Modal = styled.div`
    background-color: ${({ theme }) => theme.colors.text};
    padding: 2rem;
    border-radius: 0.5rem;
    width: 300px;
    text-align: center;
`;

const Message = styled.p`
    font-size: 16px;
    color: ${({ theme }) => theme.colors.background};
`;

const Actions = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
`;

const Button = styled.button`
    background-color: ${({ theme }) => theme.colors.dangerous};
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
        background-color: #0056b3;
    }

    &:last-child {
        background-color: ${({ theme }) => theme.colors.primary};

        &:hover {
            background-color: #a71d2a;
        }
    }
`;
