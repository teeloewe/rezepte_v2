import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'

const TagAddModal = ({show, handleClose, tag, kategorien, kategorie, setKategorie}) => {
    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Tag <b>{tag}</b> hinzufügen</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label onClick={() => console.log(kategorie)}>Kategorie von Tag</Form.Label>
                        <Form.Select value={kategorie} onChange={e => setKategorie(e.target.value)}>
                            {kategorien.map(e => {
                                return <option value={e.name} key={e.id}>{e.name}</option>
                            })}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
                    
            <Modal.Footer>
                <Button onClick={handleClose} variant="secondary">Hinzufügen</Button>
            </Modal.Footer>
        </Modal>
            
    )
}

export default TagAddModal