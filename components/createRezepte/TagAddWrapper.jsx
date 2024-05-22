import { useState } from "react"
import SearchBarTags from "./SearchBarTags"
import SearchResultsList from "./SearchResultsList"

const TagAddWrapper = ({ addTag, tags }) => {
    const [tagResults, setTagResults] = useState([])
    const [tagInput, setTagInput] = useState("")

    return (
        <>
            <SearchBarTags tags={tags} addTag={addTag} setResults={setTagResults} input={tagInput} setInput={setTagInput}/>
            {tagResults && tagResults.length > 0 && <SearchResultsList setInput={setTagInput} results={tagResults}></SearchResultsList>}
        </>
    )
}

export default TagAddWrapper