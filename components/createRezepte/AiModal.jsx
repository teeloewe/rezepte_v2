import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { use, useState } from 'react';
import AiModalData from './AiModalData';

const AiModal = ({show, handleClose, einheiten, addAiData}) => {
    const [file, setFile] = useState(null)
    const [rezeptData, setRezeptData] = useState(null)

    const handleFileChange = (e) =>  {
        setFile(e.target.files[0])
    }

    async function submitAI() {
        if (!file) return
        const formData = new FormData()
        formData.append("file", file)

        const res = await fetch(`/api/ai/upload`, {
            method: "POST",
            body: formData
        })
        const data = await res.json()
        setRezeptData(data.data[0])
    }

    async function addData() {
        addAiData(rezeptData)
        handleClose()
    }

    return (
        <Modal size='xl' show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>AI</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Group>
                    <Form.Label>Datei in pngggg/jpg</Form.Label>
                    <Form.Control type='file' onChange={handleFileChange}></Form.Control>
                </Form.Group>
                <Button onClick={submitAI}>Rezept Analysieren</Button>
                {rezeptData && <AiModalData data={rezeptData} setData={setRezeptData} einheiten={einheiten}/>}
            </Modal.Body>
                    
            <Modal.Footer>
                <Button onClick={addData} variant="secondary">Hinzufügen</Button>
            </Modal.Footer>
        </Modal>
            
    )
}

export default AiModal