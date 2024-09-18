import Button from 'react-bootstrap/Button'
import MinusSvg from '../svg/MinusSvg'

const TagItem = ({tagName, remove}) => {
    return (
        <div className="add-single-item create-add-item my-2 p-0" variant={'light'}>
            <span className="mx-2">{tagName}</span>
            <Button variant="secondary" onClick={() => remove(tagName)} className=""><MinusSvg /></Button>
        </div>
    )
}

export default TagItem