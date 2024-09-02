import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { use, useState } from 'react';
import AiModalData from './AiModalData';

const AiModal = ({show, handleClose, einheiten, addAiData}) => {
    const [file, setFile] = useState(null)
    const [rezeptData, setRezeptData] = useState(JSON.parse('{"name":"Focaccia","description":"1. Das Wasser und die Hefe miteinander auflösen. 2. Salz, Mehl und Olivenöl mit der Hefe ca. eine Minute verrühren, kurz verkneten und auf ein leicht geöltes Backblech verteilen. 20 Minuten gehen lassen. 3. Entweder am Stück backen oder kleine Brötchen formen. 4. Teig mit etwas Olivenöl bepinseln und mit fein gehacktem Zitronenthymian bestreuen. Nach Belieben kann man das Focaccia auch mit Tomatenscheiben, Kräutern, Zwiebel und/oder Speck belegen. 5. Bei 220 °C ca. 20 Minuten backen.","zutaten":[{"name":"Hefe","quantity":25,"einheit":"g"},{"name":"Wasser","quantity":175,"einheit":"ml"},{"name":"Salz","quantity":5,"einheit":"g"},{"name":"Mehl","quantity":250,"einheit":"g"},{"name":"Olivenöl","quantity":12,"einheit":"ml"},{"name":"Zitronenthymian","quantity":null,"einheit":"stück"}]}'))

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