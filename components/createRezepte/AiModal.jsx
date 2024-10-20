import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { useState } from 'react';
import AiModalData from './AiModalData';
import Spinner from 'react-bootstrap/Spinner'

const AiModal = ({show, handleClose, einheiten, addAiData, setFileName}) => {
    const [file, setFile] = useState(null)
    const [rezeptData, setRezeptData] = useState(null)
    const [running, setRunning] = useState(false)
    const [error, setError] = useState(false)

    const handleFileChange = (e) =>  {
        setFile(e.target.files[0])
        setFileName(e.target.files[0].name)
    }

    async function submitAI() {
        if (!file) return
        const formData = new FormData()
        formData.append("file", file)
        setRunning(true)
        const res = await fetch(`/api/ai/upload`, {
            method: "POST",
            body: formData
        })
        setRunning(false)
        if (res.status !== 200) return setError(true)
        const data = await res.json()
        setRezeptData(data.data[0])
        setError(false)
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
                    <Form.Label>Datei in png/jpg</Form.Label>
                    <Form.Control type='file' onChange={handleFileChange}></Form.Control>
                </Form.Group>
                <Button onClick={submitAI}>Rezept Analysieren</Button>
                {rezeptData && !running && <AiModalData data={rezeptData} setData={setRezeptData} einheiten={einheiten}/>}
                {running && <div className='m-10'><Spinner animation='border' variant='primary'></Spinner></div>}
            </Modal.Body>
                    
            <Modal.Footer>
                <Button onClick={addData} variant="secondary">Hinzufügen</Button>
                {error && <span className='text-red-600'>Die KI konnte dieses Rezept nicht analysieren.</span>}
            </Modal.Footer>
        </Modal>
            
    )
}

export default AiModal