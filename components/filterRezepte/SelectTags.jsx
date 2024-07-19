import Form from 'react-bootstrap/Form'
import { useState, useEffect } from 'react'


const SelectTags = ({ tags, kategorie, filter, setFilter }) => {
    const [checked, setChecked] = useState(new Array(tags.length).fill(false))

    useEffect(() => {
        setChecked(tags.map((tag) => {
            if (filter.tags.some(filterTag => filterTag.name === tag.name)) return true
            return false
        }))
    }, [filter])

    function handleCheck(e) {
        if (e.target.checked === true) {
            setFilter({...filter, tags: [...filter.tags, {name: e.target.id} ]})
        }
        if (e.target.checked === false) {
            setFilter({...filter, tags: filter.tags.filter((tag) => tag.name !== e.target.id)})
        }
    }
    return (
        <Form.Group className='p-2'>
            <Form.Label>Beeinhaltet Tags von Kategorie {kategorie}</Form.Label>
            <div className='filter-select-tags'>
                {tags.map((tag, index) => {
                    if (tag.kategorie.name !== kategorie) return ""
                    return <Form.Check key={tag.name} label={tag.name} type="checkbox" id={tag.name} onChange={handleCheck} checked={checked[index]}></Form.Check>
                })}
            </div>
        </Form.Group>
    )
}

export default SelectTags