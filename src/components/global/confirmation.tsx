/**
 * ConfirmationModal is a reusable modal component for confirming or canceling an action.
 * It displays a message and provides buttons for "Cancel" and "Confirm".
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {boolean} props.isOpen - Controls whether the modal is displayed.
 * @param {string} props.message - The confirmation message to display in the modal.
 * @param {(formData?: VenueFormData) => void} props.onConfirm - Callback function triggered when the "Confirm" button is clicked.
 * @param {() => void} props.onCancel - Callback function triggered when the "Cancel" button is clicked.
 *
 * @example
 * const [isModalOpen, setIsModalOpen] = useState(false);
 * const handleConfirm = () => {
 *   console.log("Confirmed!");
 *   setIsModalOpen(false);
 * };
 * const handleCancel = () => {
 *   console.log("Canceled!");
 *   setIsModalOpen(false);
 * };
 *
 * <ConfirmationModal
 *   isOpen={isModalOpen}
 *   message="Are you sure you want to proceed?"
 *   onConfirm={handleConfirm}
 *   onCancel={handleCancel}
 * />
 */

import React from "react";
import styled from "styled-components";
import { ConfirmationModalProps } from "../../types/global";

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
