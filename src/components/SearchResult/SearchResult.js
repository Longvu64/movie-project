import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import * as request from "../../config";
import styles from "./SearchResult.module.scss";
import className from "classnames/bind";
import MovieCards from "../MovieCards/MovieCards";
import { MovieIdContext } from "../../App";

const cx = className.bind(styles);

function SearchResult({movieName}) {
  const context = useContext(MovieIdContext);
  context.type = useParams().typeURL
  context.movieName = useParams().searchURL
  const [searchApi, setSearchApi] = useState([]);

  useEffect(() => {
    request
      .get(`search/${context.type}`, {
        params: {
            api_key: "19f84e11932abbc79e6d83f82d6d1045",
          query: context.movieName,
        },
      })
      .then((data) => setSearchApi(data.results));
  }, [context.movieName, context.type]);
  
  return (
    <div className={cx("wrapper")}>
      <h1 className={cx("title")}>Result for {context.movieName}</h1>
      <div className={cx("container")}>
        {searchApi &&
          searchApi.map((item, id) => {
            return (<MovieCards key={id} item={item}/>);
          })}
      </div>
    </div>
  );
}

export default SearchResult;
