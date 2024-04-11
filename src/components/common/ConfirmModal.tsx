import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface ConfirmModalProps {
    show: boolean;
    question: string;
    handleClose: () => void;
    handleConfirm: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ show, question, handleClose, handleConfirm }) => {
    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>Підтвердження</Modal.Title>
        </Modal.Header>
        <Modal.Body>{question}</Modal.Body>
    <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
        Ні
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
        Так
        </Button>
        </Modal.Footer>
        </Modal>
);
};

export default ConfirmModal;
