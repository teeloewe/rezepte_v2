import Form from 'react-bootstrap/Form'
import SelectTags from './SelectTags'

const SelectTagsWrapper = ({ kategorien, tags, filter, setFilter}) => {
    
    return (
        <>
            {kategorien.map(kategorie => {
                return <SelectTags key={kategorie.name} kategorie={kategorie.name} tags={tags} setFilter={setFilter} filter={filter}/>
            })}
        </>
    )
}

export default SelectTagsWrapper