import TagItem from "./TagItem"

const TagWrapper = ({ tags, remove }) => {
    return (
        <div className="p-2 wrapper" >
            {tags.map(t => {
                return  <TagItem remove={remove} key={t.id} tagName={t.name}/>
            })}
        </div>
    )
}

export default TagWrapper