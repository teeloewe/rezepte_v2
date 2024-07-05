import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

const TagAddModal = ({show, handleClose, tag}) => {
    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Hoi</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>{tag}</p>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={handleClose} variant="secondary">Hinzufügen</Button>
            </Modal.Footer>
        </Modal>
            
    )
}

export default TagAddModal