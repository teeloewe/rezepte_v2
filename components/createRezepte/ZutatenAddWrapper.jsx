import { useState } from 'react'
import SearchBarZutaten from './SearchBarZutaten'
import SearchResultsList from './SearchResultsList'

const ZutatenAddWrapper = ({ addZutat, zutaten, einheiten }) => {
    const [zutatenResults, setZutatenResults] = useState([])
    const [zutatenInput, setZutatenInput] = useState("")

    return (
        <>
            <SearchBarZutaten addZutat={addZutat} setResults={setZutatenResults} input={zutatenInput} setInput={setZutatenInput} zutaten={zutaten} einheiten={einheiten}/>
            {zutatenResults && zutatenResults.length > 0 && <SearchResultsList setInput={setZutatenInput} results={zutatenResults}></SearchResultsList>}
        </>
    )
}

export default ZutatenAddWrapper