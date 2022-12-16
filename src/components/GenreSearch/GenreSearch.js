  import { useEffect, useState, useContext } from "react";
import styles from "./GenreSearch.module.scss";
import className from "classnames/bind";

import * as request from "../../config";
import Pagination from "../Pagination/Pagination";
import MovieCards from "../MovieCards/MovieCards";
import { MovieIdContext } from "../../App";
import {  useParams } from "react-router-dom";

const cx = className.bind(styles);

function GenreSearch({ genreId, page, getPage }) {
  const context = useContext(MovieIdContext);
  
  context.genreId = useParams().genreIdURL
  context.page = useParams().pageURL
  context.type = useParams().typeURL

  const [genreApi, setGenreApi] = useState([]);
  const [genres, setGenre] = useState([]);
  useEffect(() => {
    request
      .get(`genre/${context.type}/list`, {
        params: {
          api_key: "19f84e11932abbc79e6d83f82d6d1045",
        },
      })
      .then((res) => {
        setGenre(res.genres);
      });

  }, [context.type]);

  useEffect(() => {
      request.get(`discover/${context.type}`,{
          params:{
              api_key: "19f84e11932abbc79e6d83f82d6d1045",
              with_genres: context.genreId,
              page: context.page
          }
      })
      .then(data => setGenreApi(data.results))
  },[context.genreId, context.page, context.type])
  return (

    <div className={cx("wrapper")}>
      <h3 className={cx("title")}>{genres.map((item,id) => {
        if(context.genreId == item.id){
          return `Result for ${item.name}`
        }})}
      </h3>
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
