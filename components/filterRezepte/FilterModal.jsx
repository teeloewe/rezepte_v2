import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ModalForm from './ModalForm'

const FilterModal = ({ handleClose, show, zutaten, tags, kategorien }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Filter
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ModalForm zutaten={zutaten} tags={tags} kategorien={kategorien} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>Fertig!</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default FilterModal