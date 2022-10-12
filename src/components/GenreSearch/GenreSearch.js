  import { useEffect, useState, useContext } from "react";
import styles from "./GenreSearch.module.scss";
import className from "classnames/bind";

import * as request from "../../config";
import Pagination from "../Pagination/Pagination";
import MovieCards from "../MovieCards/MovieCards";
import { MovieIdContext } from "../../App";
import {  useParams } from "react-router-dom";

const cx = className.bind(styles);

function GenreSearch({ genreId, page, getPage, type }) {
  const context = useContext(MovieIdContext);
  
  context.genreId = useParams().genreIdURL
  page = useParams().pageURL
  type = useParams().typeURL
  const [genreApi, setGenreApi] = useState([]);
  
  useEffect(() => {
      request.get(`discover/${type}`,{
          params:{
              api_key: "19f84e11932abbc79e6d83f82d6d1045",
              with_genres: context.genreId,
              page: page
          }
      })
      .then(data => setGenreApi(data.results))
  },[context.genreId, context.page, context.type])
  console.log(context.type);
  return (
    <div className={cx("wrapper")}>
      <h3 className={cx("title")}>{`Result for ${context.genreName}`}</h3>
      <div className={cx("container")}>
        {genreApi &&
          genreApi.map((item, id) => {
            return ( <MovieCards key={item.id} item={item}/> );
          })}
      </div>

      <Pagination getPage={getPage} page={page} genreId={genreId}/>
    </div>
  );
}

export default (GenreSearch);
