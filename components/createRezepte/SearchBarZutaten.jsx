import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import PlusSvg from '@/components/svg/PlusSvg';
import { useState } from 'react';

const SearchBarZutaten = ({ addZutat, setResults, input, setInput, zutaten, einheiten }) => {
    //! ON CLICK CHANGE LIST

    const [quantity, setQuantity] = useState(0)
    const [einheit, setEinheit] = useState("EL")

    const handleChange = (value) => {
        setInput(value);
        if(value === "") return setResults([])
        setResults(zutaten.filter(e => e.name.toLowerCase().includes(value.toLowerCase())))
    }


    const handleClick = async () => {
        if(input === "") return
        if(quantity === 0) return   
        
        addZutat({ name: input, quantity, einheit })
        setInput("")
        setQuantity("")
        setEinheit("Gramm")
        setResults([])
    }
    
    return (
        <div className='zutaten-add'>
            <Form.Control value={quantity} onChange={(e) => setQuantity(e.target.value)} type='number'  placeholder='Menge!'/>
            <Form.Select value={einheit} onChange={e => setEinheit(e.target.value)}>
                {einheiten.map(e => {
                    return <option value={e.name} key={e.id}>{e.name}</option>
                })}
            </Form.Select>
            <Form.Control className='h-100' type='text' placeholder='Gib Zutat-Name ein!' value={input} onChange={(e) => handleChange(e.target.value)}/>
            <Button variant='secondary' onClick={() => handleClick()}><PlusSvg /></Button>
        </div>
        
    );
};

export default SearchBarZutaten