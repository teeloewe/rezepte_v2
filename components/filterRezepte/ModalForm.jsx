import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import SelectZutaten from './SelectZutaten'
import SelectTagsWrapper from './SelectTagsWrapper'

const ModalForm = ({ zutaten, tags, kategorien }) => {
    return (
        <Form>
            <Form.Group className='p-2'>
                <Form.Label>Schwierigkeit grösser als</Form.Label>
                <Form.Control type='number'></Form.Control>
            </Form.Group>
            <Form.Group className='p-2'>
                <Form.Label>Bewertung grösser als</Form.Label>
                <Form.Control type="number"></Form.Control>
            </Form.Group>
            <Form.Group className='p-2'>
                <Form.Label>Dauert weniger als ... Minuten</Form.Label>
                <Form.Control type='number'></Form.Control>
            </Form.Group>
            <Form.Group className='p-2'>
                <Form.Label>Beeinhaltet Folgende Zutaten</Form.Label>
                <SelectZutaten zutaten={zutaten}/>
            </Form.Group>
            <SelectTagsWrapper kategorien={kategorien} tags={tags}/>
        </Form>
    )
}

export default ModalForm