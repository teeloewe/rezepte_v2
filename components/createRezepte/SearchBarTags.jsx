import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import PlusSvg from '@/components/svg/PlusSvg';

const SearchBarTags = ({ addTag, setResults, input, setInput }) => {
    const TEST = [
        {name: "Test", id: 1},
        {name: "Test1", id: 2},
        {name: "Test12", id: 3},
        {name: "Test123", id: 4},
        {name: "Test1234", id: 5},
        {name: "Test12345", id: 6},
    ]
    //! ON CLICK CHANGE LIST

    const handleChange = (value) => {
        setInput(value);
        if(value === "") return setResults([])
        setResults(TEST.filter(e => e.name.includes(value)))
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