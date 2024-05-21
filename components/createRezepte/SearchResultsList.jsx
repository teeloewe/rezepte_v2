import SearchResult from "./SearchResult";

const SearchResultsList = ({ setInput, results }) => {
    return (
        <div className={`results-list`}>
            {results.map((result, id) => {
                return <SearchResult result={result.name} setInput={setInput} key={result.id} />;
            })}
    </div>
    );
};

export default SearchResultsList