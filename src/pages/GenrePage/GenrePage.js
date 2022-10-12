import { Fragment } from "react";
import Header from "../../components/Header/Header";
import GenreSearch from "../../components/GenreSearch/GenreSearch";
// import MovieCards from "../../components/MovieCards/MovieCards";

function GenrePage({genreId, page, getPage, type}) {
    return ( 
        <Fragment>
            {/* <Header/> */}
            <GenreSearch type={type} page={page} getPage={getPage} genreId={genreId}/>
        </Fragment> 
    );
}

export default GenrePage;