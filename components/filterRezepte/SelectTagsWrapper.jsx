import Form from 'react-bootstrap/Form'
import SelectTags from './SelectTags'

const SelectTagsWrapper = ({ kategorien, tags}) => {
    return (
        <>
            {kategorien.map(kategorie => {
                return <SelectTags key={kategorie.name} kategorie={kategorie.name} tags={tags} />
            })}
        </>
    )
}

export default SelectTagsWrapper