import React, { useState, FC } from 'react';
import { Button } from 'reactstrap';
import ConfirmModal from "./ConfirmModal";

interface Props {
    onConfirm: () => void; // The action to perform on confirmation
    buttonText: string; // Text to display on the button
    buttonColor: string; // Color of the button
    confirmText: string; // Text to display in the confirm modal
}

const ConfirmationButton: FC<Props> = ({ onConfirm, buttonText, buttonColor, confirmText }) => {
    const [modalShow, setModalShow] = useState(false);

    const handleOpenModal = () => setModalShow(true);
    const handleCloseModal = () => setModalShow(false);
    const handleConfirm = () => {
        onConfirm();
        handleCloseModal();
    };

    return (
        <>
            <Button color={buttonColor} onClick={handleOpenModal}>
                {buttonText}
            </Button>
            <ConfirmModal
                show={modalShow}
                question={confirmText}
                handleClose={handleCloseModal}
                handleConfirm={handleConfirm}
            />
        </>
    );
};

export default ConfirmationButton;
