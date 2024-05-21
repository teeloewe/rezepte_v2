export const SearchResult = ({ result, setInput }) => {
    return (
        <div
            className="search-result"
            onClick={(e) => setInput(result)}
        >
        {result}
        </div>
    );
};