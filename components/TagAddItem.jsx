import Button from "react-bootstrap/Button"

const TagAddItem = ({ tagName }) => {
    return (
        <div className="tag-add-item my-2" variant={'light'}>
            {tagName}
            
        </div>
    )
}

export default TagAddItem