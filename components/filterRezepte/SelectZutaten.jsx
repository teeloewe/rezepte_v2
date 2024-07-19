import Form from 'react-bootstrap/Form'
import { useEffect, useState } from 'react'

const SelectZutaten = ({ zutaten, setFilter, filter }) => {
    const [checked, setChecked] = useState(new Array(zutaten.length).fill(false))

    useEffect(() => {
        setChecked(zutaten.map((zutat) => {
            if (filter.zutaten.some(filterZutat => filterZutat.name === zutat.name)) return true
            return false
        }))
    }, [filter])
    

    function handleCheck(e) {
        if (e.target.checked === true) {
            setFilter({...filter, zutaten: [...filter.zutaten, {name: e.target.id }]})
        }
        if (e.target.checked === false) {
            setFilter({...filter, zutaten: filter.zutaten.filter((zutat) => zutat.name !== e.target.id)})
        }
    }

    return (
        <div className='filter-select-zutaten'>
            {zutaten.map((zutat, index) => {
                return <Form.Check key={zutat.name} label={zutat.name} type='checkbox' id={zutat.name} onChange={handleCheck} checked={checked[index]} ></Form.Check>
            })}
        </div>
    )
}

export default SelectZutaten