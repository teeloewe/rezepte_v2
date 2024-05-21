import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import PlusSvg from '@/components/svg/PlusSvg';

export const SearchBarZutaten = ({ setResults, input, setInput }) => {
    const TEST = [
        {name: "Globi", id: 1},
        {name: "Globi1", id: 2},
        {name: "Globi12", id: 3},
        {name: "Globi123", id: 4},
        {name: "Globi1234", id: 5},
        {name: "Globi12345", id: 6},
    ]
    //! ON CLICK CHANGE LIST

    const handleChange = (value) => {
        setInput(value);
        if(value === "") return setResults([])
        setResults(TEST.filter(e => e.name.includes(value)))
    };
    
    return (
        <div className='zutaten-add'>
            <Form.Control type='number' placeholder='Menge!'/>
            <Form.Select>
                <option value={1}>Gramm</option>
                <option value={2}>Liter</option>
                <option value={3}>Kilo</option>
            </Form.Select>
            <Form.Control className='h-100' type='text' placeholder='Gib Zutat-Name ein!' value={input} onChange={(e) => handleChange(e.target.value)}/>
            <Button variant='secondary'><PlusSvg /></Button>
        </div>
        
    );
};