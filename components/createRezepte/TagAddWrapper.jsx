import { useState } from "react"
import SearchBarTags from "./SearchBarTags"
import SearchResultsList from "./SearchResultsList"

const TagAddWrapper = ({ addTag }) => {
    const [tagResults, setTagResults] = useState([])
    const [tagInput, setTagInput] = useState("")

    return (
        <>
            <SearchBarTags addTag={addTag} setResults={setTagResults} input={tagInput} setInput={setTagInput}/>
            {tagResults && tagResults.length > 0 && <SearchResultsList setInput={setTagInput} results={tagResults}></SearchResultsList>}
        </>
    )
}

export default TagAddWrapper