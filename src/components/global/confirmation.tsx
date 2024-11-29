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
import { ConfirmationModalProps } from "../../types/global";
import { Actions, Button, Message, Modal, Overlay } from "../../styles";

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
