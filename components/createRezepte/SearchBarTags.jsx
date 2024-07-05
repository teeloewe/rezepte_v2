import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import PlusSvg from '@/components/svg/PlusSvg';
import { useState } from 'react';
import TagAddModal from '@/components/createRezepte/TagAddModal';

const SearchBarTags = ({ addTag, setResults, input, setInput, tags }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //! ON CLICK CHANGE LIST

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
            <TagAddModal tag={input} show={show} handleClose={handleClose} />
        </>
        
    );
};

export default SearchBarTags