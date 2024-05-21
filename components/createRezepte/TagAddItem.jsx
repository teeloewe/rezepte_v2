import Button from "react-bootstrap/Button"
import MinusSvg from '../svg/MinusSvg'

const TagAddItem = ({ tagName, remove }) => {


    return (
        <div className="tag-add-item create-add-item my-2 p-0" variant={'light'}>
            <span className="mx-2">{tagName}</span>
            <Button variant="secondary" onClick={() => remove(tagName)} className=""><MinusSvg /></Button>
        </div>
    )
}

export default TagAddItem