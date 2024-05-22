import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import PlusSvg from '@/components/svg/PlusSvg';
import { useState } from 'react';

const SearchBarZutaten = ({ addZutat, setResults, input, setInput }) => {
    const TEST = [
        {name: "Globi", id: 1},
        {name: "Globi1", id: 2},
        {name: "Globi12", id: 3},
        {name: "Globi123", id: 4},
        {name: "Globi1234", id: 5},
        {name: "Globi12345", id: 6},
    ]
    //! ON CLICK CHANGE LIST

    const [quantity, setQuantity] = useState(0)
    const [einheit, setEinheit] = useState("Gramm")

    const handleChange = (value) => {
        setInput(value);
        if(value === "") return setResults([])
        setResults(TEST.filter(e => e.name.includes(value)))
    }


    const handleClick = () => {
        if(input === "") return
        if(quantity === 0) return
        addZutat({
            name: input,
            quantity,
            einheit
        })
        setInput("")
        setQuantity("")
        setEinheit("Gramm")
        setResults([])
    }
    
    return (
        <div className='zutaten-add'>
            <Form.Control value={quantity} onChange={(e) => setQuantity(e.target.value)} type='number'  placeholder='Menge!'/>
            <Form.Select value={einheit} onChange={e => setEinheit(e.target.value)}>
                <option value={"Gramm"}>Gramm</option>
                <option value={"Liter"}>Liter</option>
                <option value={"Kilo"}>Kilo</option>
            </Form.Select>
            <Form.Control className='h-100' type='text' placeholder='Gib Zutat-Name ein!' value={input} onChange={(e) => handleChange(e.target.value)}/>
            <Button variant='secondary' onClick={() => handleClick()}><PlusSvg /></Button>
        </div>
        
    );
};

export default SearchBarZutaten