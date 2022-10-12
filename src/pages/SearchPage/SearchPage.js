import SearchResult from "../../components/SearchResult/SearchResult";

function SearchPage({movieName}) {
    return ( 
        <SearchResult movieName={movieName}/>
     );
}

export default SearchPage;