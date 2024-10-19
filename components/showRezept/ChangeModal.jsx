import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { useState } from 'react';
import StarComp from '../createRezepte/StarComp';
import TagAddWrapper from '../createRezepte/TagAddWrapper';

const ChangeModal = ({show, handleClose, rezept, setRezept}) => {
    return (
        <Modal size='xl' show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Rezept Bearbeiten</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control value={rezept.name} onChange={e => setRezept({...rezept, name: e.target.value})} type='text'></Form.Control>
                </Form.Group>
                {<Form.Group>
                    <Form.Label>Beschreibung</Form.Label>
                    <Form.Control as={"textarea"} value={rezept.description || ""} onChange={e => setRezept({...rezept, description: e.target.value})} type='text'></Form.Control>
                </Form.Group>}
                <Form.Group>
                    <Form.Label>Dauer</Form.Label>
                    <Form.Control value={rezept.duration} onChange={e => setRezept({...rezept, duration: e.target.value ? parseInt(e.target.value) : 0})} type='number'></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Bewertung</Form.Label>
                    <StarComp stars={rezept.rating} setStars={num => setRezept({...rezept, rating: num})}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Schwierigkeit</Form.Label>
                    <StarComp stars={rezept.difficulty} setStars={num => setRezept({...rezept, difficulty: num})}/>
                </Form.Group>
                {/* <Form.Group className='p-2' controlid='formTag'>
                    <Form.Label>Tags:</Form.Label>
                    <TagAddWrapper addTag={"addTag"} tags={dataTags} kategorien={dataKategorien}/>
                    {tags.map((tag) => { 
                        return <TagAddItem remove={removeTag} key={tag} tagName={tag}/>
                    })}
                </Form.Group> */}
                
            </Modal.Body>
                    
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Schliessen</Button>
            </Modal.Footer>
        </Modal>
            
    )
}

export default ChangeModal