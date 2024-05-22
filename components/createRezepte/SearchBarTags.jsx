import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import PlusSvg from '@/components/svg/PlusSvg';

const SearchBarTags = ({ addTag, setResults, input, setInput, tags }) => {
    //! ON CLICK CHANGE LIST

    const handleChange = (value) => {
        setInput(value);
        if(value === "") return setResults([])
        setResults(tags.filter(e => e.name.includes(value)))
    };

    const handleClick = () => {
        if(input === "") return
        addTag(input)
        setInput("")
        setResults([])
    }
    
    return (
        <div className='flex gap-2'>
            <Form.Control type='text' placeholder='Gib Tag-Name ein!' value={input} onChange={(e) => handleChange(e.target.value)}/>
            <Button variant='secondary' onClick={(e) => handleClick()}><PlusSvg /></Button>
        </div>
    );
};

export default SearchBarTags