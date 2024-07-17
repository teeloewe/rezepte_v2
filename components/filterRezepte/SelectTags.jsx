import Form from 'react-bootstrap/Form'


const SelectTags = ({ tags, kategorie }) => {

    return (
        <Form.Group className='p-2'>
            <Form.Label>Beeinhaltet Tags von Kategorie {kategorie}</Form.Label>
            <div className='filter-select-tags'>
                {tags.map(tag => {
                    if (tag.kategorie.name !== kategorie) return ""
                    return <Form.Check key={tag.name} label={tag.name} type="checkbox" id={tag.name}></Form.Check>
                })}
            </div>
        </Form.Group>
    )
}

export default SelectTags