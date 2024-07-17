import Form from 'react-bootstrap/Form'

const SelectZutaten = ({ zutaten }) => {
    return (
        <div className='filter-select-zutaten'>
            {zutaten.map(zutat => {
                return <Form.Check key={zutat.name} label={zutat.name} type='checkbox' id={zutat.name}></Form.Check>
            })}
        </div>
    )
}

export default SelectZutaten