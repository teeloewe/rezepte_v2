import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { useState } from 'react';

const AiModal = ({show, handleClose}) => {
    const [file, setFile] = useState(null)

    const handleFileChange = (e) =>  {
        setFile(e.target.files[0])
    }

    async function submitAI() {
        const formData = new FormData()
        formData.append("file", file)

        const res = await fetch(`/api/ai/upload`, {
            method: "POST",
            body: formData
        })
        const data = await res.json()
        console.log(data)
    }

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>AI</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Group>
                    <Form.Label>Datei in pngggg/jpg</Form.Label>
                    <Form.Control type='file' onChange={handleFileChange}></Form.Control>
                </Form.Group>
                <Button onClick={submitAI}>Rezept Analysieren</Button>
            </Modal.Body>
                    
            <Modal.Footer>
                <Button onClick={handleClose} variant="secondary">Hinzufügen</Button>
            </Modal.Footer>
        </Modal>
            
    )
}

export default AiModal