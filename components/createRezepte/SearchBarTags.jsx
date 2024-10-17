import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import PlusSvg from '@/components/svg/PlusSvg';
import { useState } from 'react';
import TagAddModal from '@/components/createRezepte/TagAddModal';

const SearchBarTags = ({ addTag, setResults, input, setInput, tags, kategorien }) => {
    const [show, setShow] = useState(false);
    const [kategorie, setKategorie] = useState(kategorien[0].name)

    const handleShow = () => setShow(true);
    const handleClose = async () => {
        if (input === "") return
        
        const res = await fetch('/api/tags', {
            method: "POST",
            body: JSON.stringify({
                name: input,
                kategorie,
            })
        })
        const data = await res.json()

        if (data.code !== 200) return console.log(data.error)
        
        tags.push(data.data)
        addTag(input)
        setInput("")
        setResults([])
        setShow(false)
    }

    const handleChange = (value) => {
        setInput(value);
        if(value === "") return setResults([])
        setResults(tags.filter(e => e.name.toLowerCase().includes(value.toLowerCase())))
    };

    const handleClick = () => {
        if (input === "") return
        if (tags.some(t => t.name.toLowerCase() === input.toLowerCase())) {
            addTag(input)
            setInput("")
            setResults([])
        } else {
            handleShow()
        }
    }
    
    return (
        <>
            <div className='flex gap-2'>
                <Form.Control type='text' placeholder='Gib Tag-Name ein!' value={input} onChange={(e) => handleChange(e.target.value)}/>
                <Button variant='secondary' onClick={(e) => handleClick()}><PlusSvg /></Button>
            </div>
            <TagAddModal kategorien={kategorien} tag={input} show={show} handleClose={handleClose} kategorie={kategorie} setKategorie={setKategorie} />
        </>
        
    );
};

export default SearchBarTags